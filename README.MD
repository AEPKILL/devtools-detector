# devtools-detector [![devtools-detector](https://img.shields.io/npm/v/devtools-detector.svg?colorB=green&label=devtools-detector)](https://www.npmjs.com/package/devtools-detector)

## Install

`npm install devtools-detector --save`

## Usage

**Play this [DEMO](http://blog.aepkill.com/demos/devtools-detector/)**

### ES6 & TypeScript

```javascript
import { addListener, launch } from 'devtools-detector';
const view = document.createElement('div');
document.body.appendChild(view);

// 1. add listener
addListener(
  status =>
    (view.innerText = status
      ? 'devtools status: open'
      : 'devtools status: close')
);
// 2. launch detect
launch();
```

### AMD

```javascript
require(['devtools-detector'], function(devtoolsDetector) {
  var view = document.createElement('div');
  document.body.appendChild(view);

  devtoolsDetector.addListener(function(status) {
    view.innerText = status
      ? 'devtools status: open'
      : 'devtools status: close';
  });
  devtoolsDetector.launch();
});
```

### No Module System

```html
<script src="node_modules/devtools-detector/lib/devtools-detector.js"></script>
<script>
  var view = document.createElement('div');
  document.body.appendChild(view);

  devtoolsDetector.addListener(function (status) {
    view.innerText = status
      ? 'devtools status: open'
      : 'devtools status: close'
  });
  devtoolsDetector.launch();
</script>
```

## Support

* IE9+
* Edge
* Chrome
* Firefox
* Safari
* Opera

## API

* lanuch()

  lanuch detect

* isLanuch()

  if detect is lanuch then returen `true` , else return `false`

* stop()

  stop detect

* addListener(listener)

* removeListener(listener)

* setDetectDelay(value)

  set detect loop delay time , if **value =< 0** then stop detect.

## Caveats

1. In Firefox, if DevTools is undocked, detected only when switching to the **Console Panel**.
2. Make sure `devtools-detector` is the frist one to load

## Reference

> [sindresorhus/**devtools-detect**](https://github.com/sindresorhus/devtools-detect)
>
> [zswang/**jdetects**](https://github.com/zswang/jdetects)
>
> [前端开发中如何在JS文件中检测用户浏览器是否打开了调试面板](https://www.zhihu.com/question/24188524)

## License

MIT © [AEPKILL](mailto:a@aepkill.com)
