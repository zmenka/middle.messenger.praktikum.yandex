import { Block } from '../../../block/block.ts';
import { Input } from '../../input/input.ts';
import { Icon } from '../../icon/icon.ts';
import { IconTypes } from '../../icon/icon-resourses.ts';
import './form-field-image.css';

const fieldImageTemplate = `
{{{icon}}}
{{{input}}}
<label class="form-field-image__label" for={{ name }}>Change avatar</label>
`;

export type FormFieldImageProps = {
  name: string;
  onChange?: () => void;
};

export class FormFieldImage extends Block<FormFieldImageProps> {
  _input: Input;

  constructor(props: FormFieldImageProps ) {
    const { name } = props;

    const input = new Input({
      attributes: {
        'class': 'form-field-image__input',
        'type': 'file',
        'accept': 'image/png, image/jpeg',
        'name': name,
        'id': name
      }
    });

    const icon = new Icon({
      type: IconTypes.AVATAR,
      className: 'form-field-image__icon'
    });

    super("div", { props, children: { input, icon }, attributes: { class: 'form-field-image' } });

    this._input = input;
  }

  render() {
    return this.compile(fieldImageTemplate, { name: this.props.name });
  }

  checkIsValid() {
    return true;
  }

  getValue() {
    const input = this._input._element as HTMLInputElement;
    if (!input.files || !input.files.length) return null;

    return input.files[0];
  }
}
