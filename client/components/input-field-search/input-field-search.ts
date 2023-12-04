import { Block } from '../../block/block.ts';
import {  InputField } from '../../components/input-field/input-field.ts';
import { Icon } from '../../components/icon/icon.ts';
import { IconTypes } from '../icon/icon-resourses.ts';
import { ValidationTypes } from '../../utils/validation.ts';
import './input-field-search.css';

export type InputFieldSearchProps = {
  className?: string;
  onSearch: (search: string) => Promise<{title: string, id: any}[]>;
  onSelect: (data: {title: string, id: any}) => void;
  iconType?: IconTypes;
  placeholder?: string;
};

const inputFieldSearchTemplate = `
{{{ input }}}
{{#if options }}
  <div class="input-field-search__options">
    {{#each options }}
      {{{ this }}}
    {{/each}}
  </div>
{{/if}}
`;

export class InputFieldSearch extends Block<InputFieldSearchProps> {
  _input: InputField;
  _options: Option[];

  constructor(props: InputFieldSearchProps) {
    const { className, onSearch, onSelect, iconType = IconTypes.ENTER, placeholder = '' } = props;
    const input = new InputField({
      className: 'input-field-search__input',
      name: 'search',
      iconType,
      placeholder,
      onChange: (value: string) => {
        onSearch(value).then(options => {
          console.log('options', options)
          const optionsControls = options.map(({title, id}) => {
            return new Option({
              title,
              id,
              onClick: () => {
                onSelect({id, title})
                this.setPropsAndChildren({ children: { options: [] }})
                this._input.setValue('')
              }
            });
          });
          this.setPropsAndChildren({children: { options: optionsControls }})
        });
      }
    });

    // const optionsControls = options.map(({title, id}) => {
    //   return new Option({
    //     title,
    //     id,
    //     onClick: () => onSelect({ id, title })
    //   });
    // });
    super({
        ...props,
        children: { input },
        attributes: { 'class': `input-field-search ${className || ''}` }
      },
      inputFieldSearchTemplate
    );

    this._input = input;
    // this._options = optionsControls;
  }
}

type OptionProps = {
  className?: string;
  title: string;
  id: any;
  onClick: () => void;
};

const optionTemplate = `
  {{ title }}
`;

class Option extends Block<OptionProps> {
  constructor(props: OptionProps) {
    const { className, onClick } = props;

    super({
      ...props,
      events: {
        click: onClick
      },
      attributes: { 'class': `input-field-search__option ${className || ''}` }
    },
    optionTemplate
    );
  }
}
