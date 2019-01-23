import { clear, log } from '../../utils/console';
import { DevtoolsChecker } from '../devtools-checker';

const ele = document.createElement('div');
let tempStatus = false;

Object.defineProperty(ele, 'id', {
  get() {
    tempStatus = true;
    return '';
  },
  configurable: true
});

const chromeIeEdgeChecker: DevtoolsChecker = {
  name: 'ie-edge-checker',
  async getDevtoolsDetail() {
    tempStatus = false;
    log(ele);
    clear();
    return {
      isOpen: tempStatus,
      checkerName: this.name
    };
  }
};

export default chromeIeEdgeChecker;
