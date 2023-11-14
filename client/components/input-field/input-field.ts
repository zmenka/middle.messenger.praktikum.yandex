import { Block, BlockProps } from '../../block/block.ts'
import { Input, InputTypes } from '../../components/input/input.ts'
import { Icon } from '../../components/icon/icon.ts'
import { IconTypes } from '../icon/icon-resourses.ts';
import { ValidationTypes, ValidationFunc, getValidateionFunc } from '../../services/validation.ts'
import './input-field.css';

export type InputFieldProps = {
	className?: string;
	name: string;
	onChange?: () => void;
	iconType: IconTypes;
};

const inputFieldTemplate = `
{{{ input }}}
{{{ icon }}}
`;

export class InputField extends Block {
	_input: Input;
	__icon: Icon;
	_checkIsValid: ValidationFunc;

  constructor({ className, name, iconType }: InputFieldProps) {
		const input = new Input({
			attributes: {
				'class': 'input-field__input',
				'type': 'text',
				'name': name,
				'id': name
			}
    })

		const icon = new Icon({
			type: iconType,
			isButton: true,
			className: 'input-field__icon',
			click: event => {
				event.preventDefault();

			}
		});

    super("form", {
			children: { input, icon },
			attributes: { 'class': `input-field ${className || ''}` }
		});

		this._input = input;
		this.__icon = icon;
		this._checkIsValid = getValidateionFunc(ValidationTypes.MESSAGE);
  }

	render() {
		return this.compile(inputFieldTemplate);
  }

	checkIsValid() {
		console.log('validate input-field')
		const isValid = this._checkIsValid(this._input.getValue());
		return isValid;
	}
}
