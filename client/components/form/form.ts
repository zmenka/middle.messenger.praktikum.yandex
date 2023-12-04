import { Block } from '../../block/block.ts';
import { Button, ButtonProps } from '../button/button.ts';
import { Link, LinkProps } from '../link/link.ts';
import { FormField, FormFieldProps } from './form-field/form-field.ts';
import {
  FormFieldImage,
  FormFieldImageProps,
} from './form-field-image/form-field-image.ts';
import {
  FormFieldGroup,
  FormFieldGroupProps,
} from './form-field-group/form-field-group.ts';
import './form.css';

export type FormProps = {
  title?: string;
  fields: (FormFieldImageProps | FormFieldProps | FormFieldGroupProps)[];
  button: ButtonProps;
  link?: LinkProps;
  withBorder?: boolean;
  onSubmit: (data: any) => void;
  className?: string;
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

export class Form extends Block<FormProps> {
  _button: Button;
  _link: Link;
  _fields: (FormField | FormFieldImage | FormFieldGroup)[];

  constructor(props: FormProps) {
    const button = new Button({
      title: props.button.title,
      click: (event) => {
        event.preventDefault();

        if (this.checkIfError()) {
          this._button.setDisabled(true);
          return;
        }
        this._button.setDisabled(false);

        const data: { [key: string]: any } = {};

        this._fields.reduce((result, field) => {
          result[field.props.name] = field.getValue();
          return result;
        }, data);

        props.onSubmit(data);
      },
    });

    const onFieldChanged = () => this.onFieldChanged();

    const fields = props.fields.map((fieldProps) => {
      if ((fieldProps as FormFieldProps).type) {
        return new FormField({
          ...(fieldProps as FormFieldProps),
          onChange: onFieldChanged,
        });
      }
      if ((fieldProps as FormFieldGroupProps).options) {
        return new FormFieldGroup(fieldProps as FormFieldGroupProps);
      } else {
        return new FormFieldImage(fieldProps as FormFieldImageProps);
      }
    });

    const children: { [key: string]: Block | Block[] } = { fields, button };

    if (props.link) {
      children['link'] = new Link(props.link);
    }

    super(
      {
        ...props,
        children,
        attributes: {
          class: `form ${props.withBorder ? 'form_with-border' : ''} ${
            props.className || ''
          }`,
        },
      },
      formTemplate
    );

    this._button = button;
    this._fields = fields;
  }

  onFieldChanged() {
    this._button.setDisabled(false);
  }

  checkIfError() {
    let somewhereIsError = false;
    this._fields.map((field) => {
      const isValid = field.isValid();
      
      if (!isValid) {
        somewhereIsError = true;
        field.setError(true);
      }
    });

    return somewhereIsError;
  }

  setPropsAndChildren(
    nextProps: Partial<FormProps> & {
      children: { fields: (FormField | FormFieldImage | FormFieldGroup)[] };
    }
  ) {
    if (nextProps.fields) {
      const fields = nextProps.fields.map((fieldProps) => {
        if ((fieldProps as FormFieldProps).type) {
          return new FormField({
            ...(fieldProps as FormFieldProps),
            onChange: () => {
              this.onFieldChanged();
            },
          });
        }
        if ((fieldProps as FormFieldGroupProps).options) {
          return new FormFieldGroup(fieldProps as FormFieldGroupProps);
        } else {
          return new FormFieldImage(fieldProps as FormFieldImageProps);
        }
      });

      this._fields = fields;

      nextProps.children = { fields };
    }
    return super.setPropsAndChildren(nextProps);
  }
}
