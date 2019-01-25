import { DevtoolsChecker } from './devtools-checker';

function now() {
  if (performance) {
    return performance.now();
  } else {
    return Date.now();
  }
}
const debuggerChecker: DevtoolsChecker = {
  name: 'debugger-checker',
  async getDevtoolsDetail() {
    const startTime = now();
    // tslint:disable-next-line:no-empty only-arrow-functions
    (function() {}.constructor('debugger')());
    return {
      isOpen: now() - startTime > 500,
      checkerName: this.name
    };
  }
};

export default debuggerChecker;
