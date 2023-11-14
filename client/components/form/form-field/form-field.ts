import { Block } from '../../../block/block.ts';
import { InputTypes, InputWithValidation } from '../../../components/input/input.ts';
import { ValidationTypes } from '../../../services/validation.ts';
import './form-field.css';

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
  validationType: ValidationTypes;
  onChange: (value: string, isValid: boolean) => void;
};

export class FormField extends Block {
  _input: InputWithValidation;

  constructor({ title, name, type, error, isError, validationType, onChange }: FormFieldProps ) {

    const input = new InputWithValidation({
      validationType,
      onChange: (value: string, isValid: boolean) =>{
        this.setError(!isValid);
        onChange(value, isValid);
      },
      attributes: {
        'class': 'form-field__input',
        'type': type,
        'name': name,
        'id': name
      }
    });

    super("div", { props: { title, name, isError, error }, children: { input }, attributes: { class: 'form-field' } });

    this._input = input;
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
    const { isValid } =  this._input.checkIsValid();

    return isValid;
  }

  getValue() {
    return this._input.getValue();
  }
}
