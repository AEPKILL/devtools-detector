/**
 * @description
 * version-map 方便以后根据浏览器各种特征的版本选择 checker
 * 现在暂时还未用到
 */

const ua = typeof window == 'undefined' ? '' : navigator.userAgent

const versions = ua.match(/\w+\/(\d|\.)+(\s|$)/gi) || []
const versionMap: { [key: string]: string } = {}

for (const version of versions) {
  const [versionSpec, versionNumber] = version.split('/')
  versionMap[versionSpec] = versionNumber
}

export { versionMap }
