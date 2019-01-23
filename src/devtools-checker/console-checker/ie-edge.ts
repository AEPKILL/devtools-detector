import { isEdge, isIE } from '../../utils/browser';
import { clear, log } from '../../utils/console';
import { DevtoolsChecker } from '../devtools-checker';

const ele = document.createElement('div');
let isOpen = false;

Object.defineProperty(ele, 'id', {
  get() {
    isOpen = true;
    return '';
  },
  configurable: true
});

const IeEdgeChecker: DevtoolsChecker = {
  name: 'ie-edge-checker',
  async getDevtoolsDetail() {
    isOpen = false;
    log(ele);
    clear();
    return {
      isOpen,
      checkerName: this.name
    };
  },
  async skip() {
    return !(isEdge || isIE);
  }
};

export default IeEdgeChecker;
