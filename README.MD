# devtools-detector [![devtools-detector](https://img.shields.io/npm/v/devtools-detector.svg?colorB=green&label=devtools-detector)](https://www.npmjs.com/package/devtools-detector)

## Installation

`npm install devtools-detector --save`

## Usage

**[DEMO](http://blog.aepkill.com/demos/devtools-detector/)**

## How it works

[How it works](./HOW_IT_WORKS.md)

### ES6 & TypeScript

```javascript
import { addListener, launch } from 'devtools-detector';

const view = document.createElement('div');
document.body.appendChild(view);

// 1. Add listener
addListener((isOpen) => {
  view.innerText = isOpen ? 'DevTools status: open' : 'DevTools status: closed';
});

// 2. Launch detection
launch();
```

### AMD

```javascript
require(['devtools-detector'], function (devtoolsDetector) {
  const view = document.createElement('div');
  document.body.appendChild(view);

  devtoolsDetector.addListener(function (isOpen) {
    view.innerText = isOpen
      ? 'DevTools status: open'
      : 'DevTools status: closed';
  });
  devtoolsDetector.launch();
});
```

### No Module System

```html
<script src="node_modules/devtools-detector/lib/devtools-detector.js"></script>
<script>
  const view = document.createElement('div');
  document.body.appendChild(view);

  devtoolsDetector.addListener(function (isOpen) {
    view.innerText = isOpen
      ? 'DevTools status: open'
      : 'DevTools status: closed';
  });
  devtoolsDetector.launch();
</script>
```

## Browser Support

- IE9+ (requires Promise polyfill)
- Edge
- Chrome
- Firefox
- Safari
- Opera

## Types & API

### DevtoolsDetail

```typescript
interface DevtoolsDetail {
  isOpen: boolean;
  checkerName: string;
}
```

### Listener

```typescript
type DevtoolsDetectorListener = (
  isOpen: boolean,
  detail?: DevtoolsDetail
) => void;
```

### Methods

- `launch()`: Start detection
- `isLaunch()`: Returns `true` if detection is active, `false` otherwise
- `stop()`: Stop detection
- `addListener(listener: DevtoolsDetectorListener)`: Add a listener
- `removeListener(listener: DevtoolsDetectorListener)`: Remove a listener
- `setDetectDelay(value: number)`: Set detection loop delay time. If `value <= 0`, detection stops.
- `crashBrowserCurrentTab()`: Crash the current browser tab (tested only on Chrome)

  ```typescript
  // Example: crash the current browser tab 2 seconds after DevTools is opened
  import { addListener, crashBrowserCurrentTab } from 'devtools-detector';

  addListener(function (isOpen) {
    if (isOpen) {
      setTimeout(crashBrowserCurrentTab, 2000);
    }
  });
  ```

- `crashBrowser()`: Crash all browser tabs (tested only on Chrome)

## Caveats

1. In Firefox, if DevTools is undocked, it's only detected when switching to the **Console Panel**.
2. Ensure that `devtools-detector` is loaded before other scripts.

## References

- [sindresorhus/**devtools-detect**](https://github.com/sindresorhus/devtools-detect)
- [zswang/**jdetects**](https://github.com/zswang/jdetects)
- [How to detect if browser DevTools is open in JavaScript?](https://www.zhihu.com/question/24188524) (Chinese)

## License

MIT © [AEPKILL](mailto:a@aepkill.com)