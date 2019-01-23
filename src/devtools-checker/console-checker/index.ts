import { isFirefox } from '../../utils/browser';
import { DevtoolsChecker } from '../devtools-checker';
import chromeCanaryChecker from './chrome';
import firebugChecker from './firebug';
import firefoxChecker from './firefox';
import ieEdgeChecker from './ie-edge';

async function getDevtoolsDetail() {
  let devtoolsDetail = await firebugChecker.getDevtoolsDetail();
  // firebug
  if (devtoolsDetail.isOpen) {
    return devtoolsDetail;
  }
  // firefox
  if (isFirefox) {
    return firefoxChecker.getDevtoolsDetail();
  }
  // chrome ie edge
  devtoolsDetail = await ieEdgeChecker.getDevtoolsDetail();
  if (devtoolsDetail.isOpen) {
    return devtoolsDetail;
  }
  // chrome-canary
  devtoolsDetail = await chromeCanaryChecker.getDevtoolsDetail();
  return devtoolsDetail;
}

const consoleChecker: DevtoolsChecker = {
  name: 'console-checker',
  async getDevtoolsDetail() {
    const devtoolsDetail = await getDevtoolsDetail();

    // tslint:disable-next-line:prefer-conditional-expression
    if (devtoolsDetail.isOpen) {
      // add namespace
      devtoolsDetail.checkerName = `${this.name}.${devtoolsDetail.checkerName}`;
    } else {
      devtoolsDetail.checkerName = this.name;
    }

    return devtoolsDetail;
  }
};

export default consoleChecker;
