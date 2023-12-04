import { Block } from '../../../block/block.ts';
import { Input } from '../../input/input.ts';
import { getFullImgPath } from '../../../utils/path.ts';
import './form-field-image.css';

const fieldImageTemplate = `
<div class="form-field-image__cover" >
  {{#if currentPath}}
    <img class="form-field-image__img" src="{{ currentPath }}" width="90" height="90"/>
  {{/if}}
</div>
{{{input}}}
<label class="form-field-image__label" for={{ name }}>Change avatar</label>
`;

export type FormFieldImageProps = {
  name: string;
  value?: FormData;
  currentPath?: string | null;
};

export class FormFieldImage extends Block<FormFieldImageProps> {
  _input: Input;

  constructor(props: FormFieldImageProps ) {
    const { name } = props;

    const currentPath = getFullImgPath(props.currentPath);
    // const currentPath = '';

    const input = new Input({
      events: {
        change: () =>{
          const file = this.getFile()
          if (file ) {
            this.setPropsAndChildren({ currentPath: URL.createObjectURL(file) })
          }
        },
      },
      attributes: {
        'class': 'form-field-image__input',
        'type': 'file',
        'accept': 'image/png, image/jpeg',
        'name': name,
        'id': name,
      }
    });

    super({ ...props, currentPath, children: { input }, attributes: { class: 'form-field-image' } }, fieldImageTemplate);

    this._input = input;
  }

  isValid() {
    return true;
  }

  setError(_isError: boolean) {
    return;
  }

  getValue() {
    const file = this.getFile();

    if (!file) return null;

    const fd = new FormData();
    fd.append('avatar', file);

    return fd;
  }

  getFile() {
    const input = this._input._element as HTMLInputElement;

    if (!input.files || !input.files.length) return null;

    return input.files[0]

  }
}
