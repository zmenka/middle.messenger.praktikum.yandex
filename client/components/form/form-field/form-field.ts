import { Block } from '../../../block/block.ts';
import {
  InputTypes,
  InputWithValidation,
} from '../../../components/input/input.ts';
import { ValidationTypes } from '../../../utils/validation.ts';
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
  value?: string;
  name: string;
  type: InputTypes;
  error: string;
  isError: boolean;
  validationType: ValidationTypes;
  onChange?: (value: string, isValid: boolean) => void;
};

export class FormField extends Block<FormFieldProps> {
  _input: InputWithValidation;

  constructor(props: FormFieldProps) {
    const { name, type, validationType, value, onChange } = props;

    const input = new InputWithValidation({
      validationType,
      onChange: (value: string, isValid: boolean) => {
        this.setError(!isValid);
        onChange && onChange(value, isValid);
      },
      attributes: {
        class: 'form-field__input',
        type: type,
        name: name,
        id: name,
        value: value || '',
      },
    });

    super(
      { ...props, children: { input }, attributes: { class: 'form-field' } },
      fieldTemplate
    );

    this._input = input;
  }

  setError(isError: boolean) {
    this.setPropsAndChildren({ isError });
  }

  isValid() {
    return this._input.checkIsValid().isValid;
  }

  getValue() {
    return this._input.getValue();
  }
}
