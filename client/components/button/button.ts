import { Block } from '../../block/block.ts'
import './button.css';

export type ButtonProps = {
	title: string;
	isDisabled?: boolean;
	events?: { [key: string]: EventListener };
};

export class Button extends Block {
  constructor({ title, isDisabled, events }: ButtonProps) {
		const attributes = { 'class': 'button' };
		if (isDisabled) {
			attributes['disabled'] = '';
		}
    super("button", { props: { title }, events, attributes  });
  }

  render() {
    const fragment = document.createElement('span');

    fragment.innerHTML = this.props.title;
    return fragment;
  }

	setDisabled(isDisabled: boolean) {
		console.log('SET DISABLED', isDisabled)
		isDisabled ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
	}
}
