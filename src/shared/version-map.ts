const ua = navigator.userAgent;

const versions = ua.match(/\w+\/(\d|\.)+(\s|$)/gi) || [];
const versionMap: { [key: string]: string } = {};

for (const version of versions) {
  const [versionSpec, versionNumber] = version.split('/');
  versionMap[versionSpec] = versionNumber;
}

export { versionMap };
