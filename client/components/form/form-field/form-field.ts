import { Block } from '../../../block/block.ts'
import { Input, InputTypes, InputWithValidation } from '../../../components/input/input.ts'
import { ValidationTypes, ValidationFunc, getValidateionFunc } from '../../../services/validation.ts'
import './form-field.css'

const fieldTemplate = `
<label class="form-field__label" for={{ name }}>{{ title }}</label>
{{{input}}}
<p class="form-field__error">
	{{#if isError}}
		{{error}}
	{{/if}}
</p>
`;

export type FormFieldProps = {
	title: string;
	name: string;
	type: InputTypes;
	error: string;
	isError: boolean;
	validateType: ValidationTypes;
	onChange?: () => void;
};

export class FormField extends Block {
	_input: Input;
	_checkIsValid: ValidationFunc;

  constructor({ title, name, type, error, isError, validateType, onChange }: FormFieldProps ) {
		const checkIsValid = getValidateionFunc(validateType);

		const input = new Input({
      events: {
        blur: (event: Event) => {
					event.preventDefault();
          console.log('blur event', event, (event.target as HTMLInputElement).value);
					this.checkIsValid();
					if (onChange) {
						onChange();
					}
        },
      },
			attributes: {
				'class': 'form-field__input',
				'type': type,
				'name': name,
				'id': name
			}
    })

    super("div", { props: { title, name, isError, error }, children: { input }, attributes: { class: 'form-field' } });

		this._input = input;
		this._checkIsValid = checkIsValid;
  }

  render() {
		const { title, name, isError, error } = this.props;
		return this.compile(fieldTemplate, { title, name, isError, error });
  }

	setError(isError: boolean) {
		this.setProps({
			props: { isError },
    });
	}

	checkIsValid() {
		console.log('validate field')
		const isValid = this._checkIsValid(this._input.getValue());
		this.setError(!isValid);
		return isValid;
	}

	getValue() {
		return this._input.getValue();
	}
}
