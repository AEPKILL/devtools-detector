const status = document.getElementById('status');
const checker = document.getElementById('checker');
const ua = document.getElementById('ua');
const versionMap = document.getElementById('versionMap');

devtoolsDetector.addListener(function (isOpen, detail) {
  console.log('isOpen', isOpen);

  if (isOpen) {
    status.innerText = 'devtools status: open';
    checker.innerText = detail.checkerName;
  } else {
    status.innerText = 'devtools status: close';
    checker.innerText = '';
  }
});

devtoolsDetector.launch();

ua.innerText = 'UserAgent: ' + navigator.userAgent;
versionMap.innerText = Object.keys(devtoolsDetector.versionMap)
  .map(function (key) {
    return key + ' : ' + devtoolsDetector.versionMap[key];
  })
  .join('\n');
