import { DevtoolsChecker } from './devtools-checker';
export default function checkerGroup(
  checkers: DevtoolsChecker[],
  groupName?: string
): DevtoolsChecker {
  return {
    name: groupName ? groupName : 'unknow group',
    async getDevtoolsDetail() {
      for (const checker of checkers) {
        if (checker.skip && (await checker.skip())) {
          continue;
        }

        const devtoolsDetail = await checker.getDevtoolsDetail();
        if (devtoolsDetail.isOpen || devtoolsDetail.directReturn) {
          if (groupName) {
            devtoolsDetail.checkerName = `${groupName}.${
              devtoolsDetail.checkerName
            }`;
          }
          return devtoolsDetail;
        }
      }
      return {
        checkerName: this.name,
        isOpen: false
      };
    }
  };
}
