# devtools-detector [![devtools-detector](https://img.shields.io/npm/v/devtools-detector.svg?colorB=green&label=devtools-detector)](https://www.npmjs.com/package/devtools-detector)

## Install

`npm install devtools-detector --save`

## Usage

[DEMO](http://blog.aepkill.com/demos/devtools-detector/)

### ES6 & TypeScript

```javascript
import { addListener , launch } from 'devtools-detector';
// 1. add listener
addListener(status => console.log(status));
// 2. launch detect
launch();
```

### AMD

```javascript
require(['devtools-detector'],function(devtoolsDetector){
  devtoolsDetector.addListener(function(status){
    console.log(status);
  });
  devtoolsDetector.launch();
})
```

### No Module System

```html
<script src="node_modules/devtools-detector/lib/devtools-detector.js"></script>
<script>
  devtoolsDetector.addListener(function(status){
    console.log(status);
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
