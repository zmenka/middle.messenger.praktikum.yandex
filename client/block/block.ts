import { v4 as makeUUID } from 'uuid';
import Handlebars from "handlebars";
import { EventBus } from '../services/event-bus.ts'


export type BlockProps = {
	props?: { [key: string]: any },
	children?: { [key: string]: Block | Block[] },
	events?: { [key: string]: EventListener },
	attributes?: { [key: string]: string }
};


export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  _element: HTMLElement;
  _meta: {
		tagName: string;
	};
  _id: string;
  _setUpdate = false;
	_children: { [key: string]: Block | Block[] };
	_props: { [key: string]: any };
	_events:  { [key: string]: EventListener };
	_attributes: { [key: string]: string };
	eventBus: EventBus;

  constructor(tagName: string = "div", allProps: BlockProps = {}) {

		this._meta = {
      tagName
    };

    const { children = {}, props = {}, events = {}, attributes = {} } = allProps;

    this._children = this._makePropsProxy(children);
		this._events = events;
		this._attributes = attributes;

    this._generateId();

    this._props = this._makePropsProxy({ ...props, __id: this._id });

		this.eventBus = new EventBus();

    this._registerEvents(this.eventBus);

    this.eventBus.emit(Block.EVENTS.INIT);

    // console.log('constructor DONE', this );
  }

  compile(template: string, props?: BlockProps["props"]) {
      const propsAndStubs = props ? { ...props } : {};

      Object.entries(this._children).forEach(([key, child]) => {
					if (Array.isArray(child)) {
						const listStub: string[] = [];
						child.forEach(item => {
							listStub.push(`<div data-id="${item._id}"></div>`)
						})
						propsAndStubs[key] = listStub;
					} else {
						propsAndStubs[key] = `<div data-id="${child._id}"></div>`
					}
      });

      const fragment = document.createElement('template');

      fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

      Object.values(this._children).forEach(child => {
				if (Array.isArray(child)) {
					child.forEach(item => {
						const stub = fragment.content.querySelector(`[data-id="${item._id}"]`);
          	stub?.replaceWith(item.getContent());
					})
				} else {
					const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
          stub?.replaceWith(child.getContent());
				}

      });

      // console.log('compile DONE', "fragment", fragment.innerHTML, "propsAndStubs", propsAndStubs, this);

      return fragment.content;
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _generateId() {
    this._id = makeUUID();
  }

  init() {
    this._createResources();

    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this._children).forEach(child => {
			if (Array.isArray(child)) {
				child.forEach(item => {
					item.dispatchComponentDidMount();
				})
			} else {
				child.dispatchComponentDidMount();
			}
  });
  }

  componentDidMount() {}

	dispatchComponentDidMount() {
		this.eventBus.emit(Block.EVENTS.FLOW_CDM);
	}

  _componentDidUpdate(oldProps: BlockProps["props"], newProps: BlockProps["props"]) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }

    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps: BlockProps["props"], newProps: BlockProps["props"]) {
    return true;
  }

  setProps = (nextProps: BlockProps) => {
    if (!nextProps) {
      return;
    }

    this._setUpdate = false;
    const oldProps = {...this._props};
    const { props = {}, children = {} } = nextProps;

    if (Object.values(props).length)
      Object.assign(this._props, props);

		if (Object.values(children).length)
      Object.assign(this._children, children);

		if (this._setUpdate) {
			this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this._props);
			this._setUpdate = false;
		}
  };

  get element() {
    return this._element;
  }

  get props() {
    return this._props;
  }

  get children() {
    return this._children;
  }

  _render() {
    const block = this.render();

    this._removeEvents();

    this._element.innerHTML = ''; // удаляем предыдущее содержимое

		if( block){
			this._element.appendChild(block);
		}

    this._addEvents();
  }

  render(): HTMLElement | DocumentFragment | null {
		return null;
	};

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: any) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {

        if (target[prop] !== value) {
          target[prop] = value;

          self._setUpdate = true;

          console.log('SET', target, prop, value)
        }
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);

    if (this._id) {
      element.setAttribute('data-id', this._id);
    }

		Object.keys(this._attributes).forEach(key => {
			element.setAttribute(key, this._attributes[key])
    });

    return element;
  }

	setAttribute(attribute: string, value: string) {
		this._element.setAttribute(attribute, value);
	}

	removeAttribute(attribute: string) {
		this._element.removeAttribute(attribute);
	}

	addClass(classNames: string[]) {
		this._element.classList.add(...classNames);
	}

	removeClass(classNames: string[]) {
		this._element.classList.remove(...classNames);
	}

  _addEvents() {
    Object.keys(this._events).forEach(eventName => {
      console.log('addEventListener', eventName);
      this._element.addEventListener(eventName, this._events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach(eventName => {
      console.log('removeEventListener', eventName);
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }
}
