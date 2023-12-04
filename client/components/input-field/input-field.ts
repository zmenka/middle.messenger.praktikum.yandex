import { Block } from '../../block/block.ts';
import {  InputWithValidation } from '../../components/input/input.ts';
import { Icon } from '../../components/icon/icon.ts';
import { IconTypes } from '../icon/icon-resourses.ts';
import { ValidationTypes } from '../../utils/validation.ts';
import './input-field.css';

export type InputFieldProps = {
  className?: string;
  name: string;
  onChange?: (value: string) => void;
  iconType: IconTypes;
  placeholder?: string;
};

const inputFieldTemplate = `
{{{ input }}}
{{{ icon }}}
`;

export class InputField extends Block<InputFieldProps> {
  _input: InputWithValidation;

  constructor(props: InputFieldProps) {
    const { className, name, iconType, onChange, placeholder = '' } = props;
    const input = new InputWithValidation({
      validationType: ValidationTypes.MESSAGE,
      attributes: {
        'class': 'input-field__input',
        'type': 'text',
        'name': name,
        'id': name,
        'placeholder': placeholder,
      }
    });

    const icon = new Icon({
      type: iconType,
      className: 'input-field__icon',
      click: event => {
        event.preventDefault();

        const { value, isValid} = this._input.checkIsValid();
        if (isValid && onChange) {
          onChange(value);
        }
      }
    });

    super({
      ...props,
      children: { input, icon },
      attributes: { 'class': `input-field ${className || ''}`, 'autocomplete': 'off' }
    },
    inputFieldTemplate,
    'form'
    );

    this._input = input;
  }

  setValue(value: string) {
    this._input.setValue(value);
  }
}
