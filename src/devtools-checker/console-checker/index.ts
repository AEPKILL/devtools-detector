import checkerGroup from '../checker-group';
import { DevtoolsChecker } from '../devtools-checker';
import firefoxChecker from './firefox';
import ieEdgeChecker from './ie-edge';
import webkitChecker from './webkit';

const consoleChecker: DevtoolsChecker = checkerGroup(
  [firefoxChecker, ieEdgeChecker, webkitChecker],
  'console-checker'
);

export default consoleChecker;
