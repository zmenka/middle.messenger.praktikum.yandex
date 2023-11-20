import { Block } from '../../block/block.ts';
import {  InputWithValidation } from '../../components/input/input.ts';
import { Icon } from '../../components/icon/icon.ts';
import { IconTypes } from '../icon/icon-resourses.ts';
import { ValidationTypes } from '../../services/validation.ts';
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

export class InputField extends Block<InputFieldProps> {
  _input: InputWithValidation;

  constructor(props: InputFieldProps) {
    const { className, name, iconType } = props;
    const input = new InputWithValidation({
      validationType: ValidationTypes.MESSAGE,
      attributes: {
        'class': 'input-field__input',
        'type': 'text',
        'name': name,
        'id': name
      }
    });

    const icon = new Icon({
      type: iconType,
      isButton: true,
      className: 'input-field__icon',
      click: event => {
        event.preventDefault();

        const { value, isValid} = this._input.checkIsValid();
        if (isValid) {
          console.log({ [name]: value });
        }
      }
    });

    super("form", {
      props,
      children: { input, icon },
      attributes: { 'class': `input-field ${className || ''}` }
    });

    this._input = input;
  }

  render() {
    return this.compile(inputFieldTemplate);
  }
}
