import checkerGroup from '../checker-group';
import { DevtoolsChecker } from '../devtools-checker';
import chromeChecker from './chrome';
import firefoxChecker from './firefox';
import ieEdgeChecker from './ie-edge';

const consoleChecker: DevtoolsChecker = checkerGroup(
  [firefoxChecker, ieEdgeChecker, chromeChecker],
  'console-checker'
);

export default consoleChecker;
