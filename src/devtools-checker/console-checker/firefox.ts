import { isFirefox } from '../../utils/browser';
import checkerGroup from '../checker-group';
import debuggerChecker from '../debugger-checker';
import { DevtoolsChecker } from '../devtools-checker';
import makeCheckerDirectReturn from '../make-checker-direct-return';
import regToStringChecker from './common/reg-to-string';

const firefoxChecker: DevtoolsChecker = {
  ...makeCheckerDirectReturn(
    checkerGroup([regToStringChecker, debuggerChecker])
  ),
  name: 'firefox-checker',
  async skip() {
    return !isFirefox();
  }
};

export default firefoxChecker;
