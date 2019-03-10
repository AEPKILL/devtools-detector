import { isWebkit } from '../../utils/browser';
import checkerGroup from '../checker-group';
import { DevtoolsChecker } from '../devtools-checker';
import depRegToStringChecker from './common/dep-reg-to-string';
import elementIdChecker from './common/element-id';
import functionToStringChecker from './common/function-to-string';

const webkitChecker: DevtoolsChecker = {
  ...checkerGroup([
    elementIdChecker,
    functionToStringChecker,
    depRegToStringChecker
  ]),
  name: 'webkit-checker',
  async skip() {
    return !isWebkit();
  }
};

export default webkitChecker;
