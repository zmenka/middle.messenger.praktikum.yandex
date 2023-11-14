import { Block } from '../../block/block.ts';
import { Button, ButtonProps } from '../button/button.ts';
import { Link, LinkProps } from '../link/link.ts';
import { FormField, FormFieldProps } from './form-field/form-field.ts';
import { FormFieldImage, FormFieldImageProps } from './form-field-image/form-field-image.ts';
import './form.css';

type FormProps = {
  title?: string;
  fields: (FormFieldImageProps | FormFieldProps)[];
  button: ButtonProps;
  link: LinkProps;
  withBorder?: boolean;
};

const formTemplate = `
  <div class="form__inner">
		{{#if title}}
			<div class="form__title">{{ title }}</div>
		{{/if}}
		<form class="form__fields">
			{{#each fields }}
				{{{ this }}}
			{{/each}}
		</form>
		<div class="form__buttons">
			{{{ button }}}
			{{{ link }}}
		</div>
  </div>
`;

export class Form extends Block {
  _button: Button;
  _link: Link;
  _fields: (FormField | FormFieldImage)[];

  constructor(props: FormProps) {
    const button = new Button({
      title: props.button.title,
      click: event => {
        event.preventDefault();

        if (this.checkIfError()) {
          this._button.setDisabled(true);
        } else {
          this._button.setDisabled(false);

          const log: {[key: string]: any} = {};

          console.log(this._fields.reduce((result, field) => {
            result[field.props.name] = field.getValue();
            return result;
          }, log));
        }
      },
    });

    const onFieldChanged = () => {
      this._button.setDisabled(false);
    };

    const link = new Link(props.link);

    const fields = props.fields.map(fieldProps => {
      if( (fieldProps as FormFieldProps).type) {
        return new FormField({ ...(fieldProps as FormFieldProps), onChange: onFieldChanged });
      } else {
        return new FormFieldImage({ ...fieldProps, onChange: onFieldChanged });
      }
    });

    super("div", {
      props: { title: props.title },
      children: { fields, button, link },
      attributes: {
        class: `form ${props.withBorder ? 'form_with-border' : ''}`
      }});

    this._button = button;
    this._link = link;
    this._fields = fields;
  }

  checkIfError() {
    const somewhereIsError = this._fields.reduce((isError, field) => {
      const currentFieldIsValid = field.checkIsValid();
      return isError ? isError : !currentFieldIsValid;
    }, false);

    return somewhereIsError;
  }

  render() {

    return  this.compile(formTemplate, { title: this.props.title });
  }
}
