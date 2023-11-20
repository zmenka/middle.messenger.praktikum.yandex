import { Block } from '../../block/block.ts';
import './button.css';

export type ButtonProps = {
  title: string;
  isDisabled?: boolean;
  click?: EventListener;
};

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    const { isDisabled, click } = props;
    const attributes: { [key: string]: string } = { 'class': 'button' };

    if (isDisabled) {
      attributes['disabled'] = '';
    }

    const events: { [key: string]: EventListener } = {};
    if (click) {
      events['click'] = click;
    }

    super("button", { props, events, attributes  });
  }

  render() {
    const fragment = document.createElement('span');

    fragment.innerHTML = this.props.title;
    return fragment;
  }

  setDisabled(isDisabled: boolean) {
    isDisabled ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }
}
