import { Block } from '../../../block/block.ts';
import { InputTypes, Input } from '../../../components/input/input.ts';
import { InputFieldSearch } from '../../../components/input-field-search/input-field-search.ts';
import { Icon } from '../../../components/icon/icon.ts';
import { IconTypes } from '../../../components/icon/icon-resourses.ts';
import { ValidationTypes } from '../../../utils/validation.ts';
import { FormField, FormFieldProps } from '../form-field/form-field.ts';
import './form-field-group.css';

const fieldGroupTemplate = `
<div class="form-field-group__title">{{ title }}</div>
{{#each controls }}
  {{{ this }}}
{{/each}}
{{{ search}}}
`;

export type FormFieldGroupProps = {
  title: string;
  name: string;
  options: { title: string, id: any }[];
  onSearch: (search: string) => Promise<{title: string, id: any}[]>;
};

export class FormFieldGroup extends Block<FormFieldGroupProps> {
  controls: Option[];

  constructor(props: FormFieldGroupProps ) {
    const { options, onSearch } = props;

    let controls: Option[] = [];
    options.reduce((accum, { title, id }) => {
      accum.push(new Option({
        title,
        id,
        onDelete: (id: any) => {
          const deletedOption = controls.find(control => control.props.id === id);
          this.controls = this.controls.filter(control => control.props.id !== id);

          deletedOption?.remove();

          this.setPropsAndChildren({ children: { controls: this.controls }});
        }
      }));

      return accum;
    }, controls)

    const search = new InputFieldSearch({
      onSearch,
      onSelect: ({ title, id }: {title: string, id: any}) => {
        console.log('SELECT', { title, id })
        this.addOption({ title, id });
      },
      iconType: IconTypes.PLUS,
      placeholder: 'Введите логин пользователя'
     });

    super({ ...props, children: { controls, search}, attributes: { class: 'form-field-group' } }, fieldGroupTemplate);

    this.controls = controls;
  }

  addOption({ title, id }: { title: string, id: any }) {
    const option = new Option({
      title,
      id,
      onDelete: (id: any) => {
        const deletedOption = this.controls.find(control => control.props.id === id);
        this.controls = this.controls.filter(control => control.props.id !== id);

        deletedOption?.remove();

        this.setPropsAndChildren({ children: { controls: this.controls }});
      }
    })
    const controls = [...this.controls, option]
    this.controls = controls;

    this.setPropsAndChildren({ children: { controls }});
  }

  render(): HTMLElement | DocumentFragment | null {
    console.log('RENDER', this)
    return super.render();
  }

  setError(_isError: boolean) {
  }

  isValid() {
    return true;
  }

  getValue() {
    return this.controls.map(control => control.getValue());
  }
}

type OptionProps = {
  className?: string;
  title: string;
  id: any;
  onDelete: (id: any) => void;
};

const optionTemplate = `
  <div class="form-field-group__option-title">{{ title }}</div>
  {{{ icon }}}
`;

class Option extends Block<OptionProps> {
  constructor(props: OptionProps) {
    const { className, onDelete, id } = props;

    const icon = new Icon({
        type: IconTypes.CLOSE,
        className: 'form-field-group__close-icon',
        click: event => {
          event.preventDefault();

          onDelete(id);
        }
      });

    super({
      ...props,
      children: { icon },
      attributes: { 'class': `form-field-group__option ${className || ''}` }
    },
    optionTemplate
    );
  }

  getValue() {
    return this.props.id;
  }
}
