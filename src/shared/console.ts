import { isEdge, isIE } from './browser-info';

/**
 * 缓存 console.log 等方法，防止第三方代码 hook console.log 等方法
 * 但是 ie 浏览器下不能缓存 console.log 之类的方法, 因为每次打开浏览器都是不同的 console, 调用缓存后的方法则会异常
 *
 */
function cacheConsoleMethod<K extends keyof Console>(name: K): Console[K] {
  if (console) {
    if (isIE || isEdge) {
      // IE 没有 console.table
      if (name === 'log' || name === 'clear') {
        return (...args: any[]) => {
          console[name].apply(console, args);
        };
      }
    } else {
      return console[name];
    }
  }

  return (..._args: any[]) => {};
}

export const log = cacheConsoleMethod('log');

export const table = cacheConsoleMethod('table');

export const clear = cacheConsoleMethod('clear');

