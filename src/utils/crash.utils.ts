/**
 * @overview
 * @author AEPKILL
 * @created 2024-07-17 09:47:08
 */

/**
 * This function will crash the browser current tab
 *
 * only tested on Chrome
 */
export function crashBrowserCurrentTab() {
  new Array(2 ** 32 - 1).fill(0);
}

/**
 * This function will crash the browser all tabs
 *
 * only tested on Chrome
 */
export function crashBrowser() {
  const array: number[] = [];
  while (true) {
    array.push(0);
    location.reload();
  }
}
