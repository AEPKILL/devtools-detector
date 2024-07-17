# devtools-detector [![devtools-detector](https://img.shields.io/npm/v/devtools-detector.svg?colorB=green&label=devtools-detector)](https://www.npmjs.com/package/devtools-detector)

## Install

`npm install devtools-detector --save`

## Usage

**[DEMO](http://blog.aepkill.com/demos/devtools-detector/)**

### ES6 & TypeScript

```javascript
import { addListener, launch } from 'devtools-detector';
const view = document.createElement('div');
document.body.appendChild(view);

// 1. add listener
addListener(
  (isOpen) =>
    (view.innerText = isOpen
      ? 'devtools status: open'
      : 'devtools status: close')
);
// 2. launch detect
launch();
```

### AMD

```javascript
require(['devtools-detector'], function (devtoolsDetector) {
  var view = document.createElement('div');
  document.body.appendChild(view);

  devtoolsDetector.addListener(function (isOpen) {
    view.innerText = isOpen
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

  devtoolsDetector.addListener(function (isOpen) {
    view.innerText = isOpen
      ? 'devtools status: open'
      : 'devtools status: close';
  });
  devtoolsDetector.launch();
</script>
```

## Support

- IE9+ (required Promise polyfill)
- Edge
- Chrome
- Firefox
- Safari
- Opera

## Type & API

- DevtoolsDetail

```typescript
interface DevtoolsDetail {
  isOpen: boolean;
  checkerName: string;
}
```

- Listener

```typescript
type DevtoolsDetectorListener = (
  isOpen: boolean,
  detail?: DevtoolsDetail
) => void;
```

- launch()

  launch detect

- isLaunch()

  if detect is launched then return `true`, else return `false`

- stop()

  stop detect

- addListener(listener: DevtoolsDetectorListener)

- removeListener(listener: DevtoolsDetectorListener)

- setDetectDelay(value: number)

  Set detect loop delay time, if **value =< 0** then stop detecting.

- crashBrowserCurrentTab

  Crash the browser current tab, only tested on Chrome

  example:

  ```ts
  // Crash browser current tab after 2 seconds

  addListener((isOpen) => setTimeout(crashBrowserCurrentTab, 2000));
  ```

- crashBrowser

  Crash the browser all tabs, **only tested on Chrome**

## Caveats

1. In Firefox, if DevTools is undocked, detected only when switching to the **Console Panel**.
2. Make sure `devtools-detector` is the first one to load

## Reference

> [sindresorhus/**devtools-detect**](https://github.com/sindresorhus/devtools-detect)
>
> [zswang/**jdetects**](https://github.com/zswang/jdetects)
>
> [前端开发中如何在 JS 文件中检测用户浏览器是否打开了调试面板](https://www.zhihu.com/question/24188524)

## License

MIT © [AEPKILL](mailto:a@aepkill.com)
