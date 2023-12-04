import { Block, BlockProps } from '../../block/block.ts';
import { ValidationTypes, ValidationFunc, getValidateionFunc } from '../../utils/validation.ts';

export enum InputTypes {
  'TEXT' = 'text',
  'PASSWORD' = 'password',
  'EMAIL' = 'email',
  'TEL' = 'tel'
}

type InputProps = Record<string, any>;

export class Input extends Block<InputProps> {
  constructor(props: BlockProps<InputProps>) {
    super(props, undefined, 'input');
  }

  getValue() {
    return (this._element as HTMLInputElement).value;
  }

  setValue(value: string) {
    (this._element as HTMLInputElement).value = value;
  }
}

export interface InputWithValidationProps extends BlockProps<InputProps> {
  validationType: ValidationTypes,
  onChange?(value: string, isValid: boolean): void;
}

export class InputWithValidation extends Input {
  _checkIsValid: ValidationFunc;

  constructor({ validationType, onChange, events = {}, ...props }: InputWithValidationProps) {
    const checkIsValid = getValidateionFunc(validationType);

    const blur = (event: Event) => {
      event.preventDefault();

      const { value, isValid } = this.checkIsValid();
      onChange && onChange(value, isValid);
    };

    Object.assign(events, { blur });

    super({...props, events });

    this._checkIsValid = checkIsValid;
  }

  checkIsValid() {
    const value = this.getValue();
    const isValid = this._checkIsValid(value);

    return { value, isValid };
  }
}
