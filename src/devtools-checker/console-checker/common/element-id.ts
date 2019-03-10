import { clear, log } from '../../../utils/console';
import { DevtoolsChecker } from '../../devtools-checker';

const ele = document.createElement('div');
let isOpen = false;

Object.defineProperty(ele, 'id', {
  get() {
    isOpen = true;
    return elementIdChecker.name;
  },
  configurable: true
});

const elementIdChecker: DevtoolsChecker = {
  name: 'element-id-chekcer',
  async getDevtoolsDetail() {
    isOpen = false;
    log(ele);
    clear();
    return {
      isOpen,
      checkerName: this.name
    };
  }
};

export default elementIdChecker;
