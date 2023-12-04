import { Block } from '../../block/block.ts';
import { Icon } from '../../components/icon/icon';
import { IconTypes } from '../../components/icon/icon-resourses.ts';
import './modal-error.css';

const errorTemplate = `
<div class="modal-error__container">
  <div class="modal-error__content">
    {{{ icon }}}
    {{ message }}
  </div>
</div>
`;

export type ModalErrorProps = {
  message: string;
};

export class ModalError extends Block<ModalErrorProps> {
  constructor() {
    const icon = new Icon({
      type: IconTypes.CLOSE,
      className: 'modal-error__icon',
      click: () => {
        this.hide();
      }
    });

    super({ message: 'Something went wrong' , children: { icon }, attributes: { 'class': 'modal-error' }}, errorTemplate);
    this.hide();
  }

  showError(msg: string) {
    this.setPropsAndChildren({
      message: msg || 'Somterhing went wrong',
    });

    this.show();
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

export default new ModalError();

