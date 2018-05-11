import { isEdge, isIE } from './browser';

// tslint:disable:no-any no-empty
const FUNCTION_TYPE_STRING = typeof cacheConsoleMethod;

const isFunction = (fn: any) => typeof fn === FUNCTION_TYPE_STRING;

/**
 * 缓存 console.log 等方法，防止第三方代码 hook console.log 等方法
 * 但是 ie 浏览器下不能缓存 console.log 之类的方法, 因为每次打开浏览器都是不同的 console, 调用缓存后的方法则会异常
 *
 */
function cacheConsoleMethod<K extends keyof Console>(name: K): Console[K] {
  if (console) {
    const method = console[name];
    if (isFunction(method)) {
      if (isIE || isEdge) {
        return (...args: any[]) => {
          console[name](...args);
        };
      }
      return console[name];
    }
  }
  return (...args: any[]) => {};
}

export const log = cacheConsoleMethod('log');

export const table = cacheConsoleMethod('table');

export const clear = cacheConsoleMethod('clear');

// tslint:enable:no-any no-empty
