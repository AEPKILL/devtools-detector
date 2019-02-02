import checkerGroup from '../checker-group';
import { DevtoolsChecker } from '../devtools-checker';
import firefoxChecker from './firefox';
import ieEdgeChecker from './ie-edge';
import webkitChecker from './webkit';
import webkit2Checker from './webkit2';

const consoleChecker: DevtoolsChecker = checkerGroup(
  [firefoxChecker, ieEdgeChecker, webkitChecker, webkit2Checker],
  'console-checker'
);

export default consoleChecker;
