import { isWebkit } from '../../utils/browser';
import checkerGroup from '../checker-group';
import { DevtoolsChecker } from '../devtools-checker';
import depRegToStringChecker from './common/dep-reg-to-string';
import elementIdChecker from './common/element-id';
import functionToStringChecker from './common/function-to-string';
import regToStringChecker from './common/reg-to-string';

const webkitChecker: DevtoolsChecker = {
  ...checkerGroup([
    elementIdChecker,
    functionToStringChecker,
    regToStringChecker,
    depRegToStringChecker
  ]),
  name: 'webkit-checker',
  async skip() {
    return !isWebkit();
  }
};

export default webkitChecker;
