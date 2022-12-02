/**
 * @description
 * version-map 方便以后根据浏览器各种特征的版本选择 checker
 * 现在暂时还未用到
 */

import { userAgent } from "./context";


const versions = (userAgent || '').match(/\w+\/(\d|\.)+(\s|$)/gi) || [];
const versionMap: { [key: string]: string } = {};

for (const version of versions) {
  const [versionSpec, versionNumber] = version.split('/');
  versionMap[versionSpec] = versionNumber;
}

export { versionMap };
