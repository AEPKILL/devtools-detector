export function now() {
  if (typeof performance !== 'undefined') {
    return performance.now();
  } else {
    return Date.now();
  }
}
