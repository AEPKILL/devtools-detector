import { DevtoolsChecker } from './devtools-checker';

export default function makeCheckerDirectReturn(
  checker: DevtoolsChecker
): DevtoolsChecker {
  return {
    ...checker,
    async getDevtoolsDetail() {
      const detail = await checker.getDevtoolsDetail();
      detail.directReturn = true;
      return detail;
    }
  };
}
