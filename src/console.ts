// tslint:disable:no-any no-empty
const FUNCTION_TYPE_STRING = typeof empty;

const isFunction = (fn: any) => typeof fn === FUNCTION_TYPE_STRING;

export function empty(...args: any[]) {}

export let log = empty;

export let table = empty;

export let clear = empty;

export function patch() {
  if (typeof console !== 'undefined') {
    if (isFunction(console.log)) {
      log = console.log;
    }
    if (isFunction(console.clear)) {
      clear = console.clear;
    }
    if (isFunction(console.table)) {
      table = console.table;
    }
  }
}

// tslint:enable:no-any no-empty
