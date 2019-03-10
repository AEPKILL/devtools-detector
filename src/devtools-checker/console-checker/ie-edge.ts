import { isEdge, isIE } from '../../utils/browser';
import { DevtoolsChecker } from '../devtools-checker';
import elementIdChecker from './common/element-id';

const ieEdgeChecker: DevtoolsChecker = {
  ...elementIdChecker,
  name: 'ie-edge-checker',
  async skip() {
    return !(isIE() || isEdge());
  }
};

export default ieEdgeChecker;
