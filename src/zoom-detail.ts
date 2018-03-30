/**
 * Ref: https://github.com/tombigel/detect-zoom
 */

// tslint:disable no-any

/**
 * Use devicePixelRatio if supported by the browser
 * @return {Number}
 * @private
 */
function devicePixelRatio() {
  return window.devicePixelRatio || 1;
}

/**
 * IE 8 and 9: no trick needed!
 * TODO: Test on IE10 and Windows 8 RT
 * @return {Object}
 * @private
 */
function ie8() {
  const zoom = Math.round(screen.deviceXDPI / screen.logicalXDPI * 100) / 100;
  return {
    zoom,
    devicePxPerCssPx: zoom * devicePixelRatio()
  };
}

/**
 * For IE10 we need to change our technique again...
 * thanks https://github.com/stefanvanburen
 * @return {Object}
 * @private
 */
function ie10() {
  const zoom =
    Math.round(
      document.documentElement.offsetHeight / window.innerHeight * 100
    ) / 100;
  return {
    zoom,
    devicePxPerCssPx: zoom * devicePixelRatio()
  };
}

/**
 * For chrome
 *
 */
function chrome() {
  const zoom = Math.round(window.outerWidth / window.innerWidth * 100) / 100;
  return {
    zoom,
    devicePxPerCssPx: zoom * devicePixelRatio()
  };
}

/**
 * For safari (same as chrome)
 *
 */
function safari() {
  const zoom =
    Math.round(document.documentElement.clientWidth / window.innerWidth * 100) /
    100;
  return {
    zoom,
    devicePxPerCssPx: zoom * devicePixelRatio()
  };
}

/**
 * Mobile WebKit
 * the trick: window.innerWIdth is in CSS pixels, while
 * screen.width and screen.height are in system pixels.
 * And there are no scrollbars to mess up the measurement.
 * @return {Object}
 * @private
 */
function webkitMobile() {
  const deviceWidth =
    Math.abs(window.orientation as number) == 90 ? screen.height : screen.width;
  const zoom = deviceWidth / window.innerWidth;
  return {
    zoom,
    devicePxPerCssPx: zoom * devicePixelRatio()
  };
}

/**
 * Desktop Webkit
 * the trick: an element's clientHeight is in CSS pixels, while you can
 * set its line-height in system pixels using font-size and
 * -webkit-text-size-adjust:none.
 * device-pixel-ratio: http://www.webkit.org/blog/55/high-dpi-web-sites/
 *
 * Previous trick (used before http://trac.webkit.org/changeset/100847):
 * documentElement.scrollWidth is in CSS pixels, while
 * document.width was in system pixels. Note that this is the
 * layout width of the document, which is slightly different from viewport
 * because document width does not include scrollbars and might be wider
 * due to big elements.
 * @return {Object}
 * @private
 */
function webkit() {
  const important = (str: string) => {
    return str.replace(/;/g, ' !important;');
  };

  const div = document.createElement('div');
  div.innerHTML = '1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0';
  div.setAttribute(
    'style',
    important(
      'font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'
    )
  );

  // the container exists so that the div will be laid out in its own flow
  // while not impacting the layout, viewport size, or display of the
  // webpage as a whole.
  // add !important and relevant CSS rule resets
  // so that other rules cannot affect the results.
  const container = document.createElement('div');
  container.setAttribute(
    'style',
    important(
      'width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'
    )
  );
  container.appendChild(div);

  document.body.appendChild(container);
  let zoom = 1000 / div.clientHeight;
  zoom = Math.round(zoom * 100) / 100;
  document.body.removeChild(container);

  return {
    zoom,
    devicePxPerCssPx: zoom * devicePixelRatio()
  };
}

/**
 * no real trick; device-pixel-ratio is the ratio of device dpi / css dpi.
 * (Note that this is a different interpretation than Webkit's device
 * pixel ratio, which is the ratio device dpi / system dpi).
 *
 * Also, for Mozilla, there is no difference between the zoom factor and the device ratio.
 *
 * @return {Object}
 * @private
 */
function firefox4() {
  let zoom = mediaQueryBinarySearch(
    'min--moz-device-pixel-ratio',
    '',
    0,
    10,
    20,
    0.0001
  );
  zoom = Math.round(zoom * 100) / 100;
  return {
    zoom,
    devicePxPerCssPx: zoom
  };
}

/**
 * Firefox 18.x
 * Mozilla added support for devicePixelRatio to Firefox 18,
 * but it is affected by the zoom level, so, like in older
 * Firefox we can't tell if we are in zoom mode or in a device
 * with a different pixel ratio
 * @return {Object}
 * @private
 */
function firefox18() {
  return {
    zoom: firefox4().zoom,
    devicePxPerCssPx: devicePixelRatio()
  };
}

/**
 * works starting Opera 11.11
 * the trick: outerWidth is the viewport width including scrollbars in
 * system px, while innerWidth is the viewport width including scrollbars
 * in CSS px
 * @return {Object}
 * @private
 */
function opera11() {
  let zoom = window.top.outerWidth / window.top.innerWidth;
  zoom = Math.round(zoom * 100) / 100;
  return {
    zoom,
    devicePxPerCssPx: zoom * devicePixelRatio()
  };
}

/**
 * Use a binary search through media queries to find zoom level in Firefox
 * @param property
 * @param unit
 * @param a
 * @param b
 * @param maxIter
 * @param epsilon
 * @return {Number}
 */
function mediaQueryBinarySearch(
  property: string,
  unit: string,
  a: number,
  b: number,
  maxIter: number,
  epsilon: number
) {
  let matchMedia: any;
  let head: any;
  let style: any;
  let div: any;
  if (window.matchMedia) {
    matchMedia = window.matchMedia;
  } else {
    head = document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    head.appendChild(style);

    div = document.createElement('div');
    div.className = 'mediaQueryBinarySearch';
    div.style.display = 'none';
    document.body.appendChild(div);

    matchMedia = (query: string) => {
      style.sheet.insertRule(
        '@media ' +
          query +
          '{.mediaQueryBinarySearch ' +
          '{text-decoration: underline} }',
        0
      );
      const matched = getComputedStyle(div, null).textDecoration == 'underline';
      style.sheet.deleteRule(0);
      return { matches: matched };
    };
  }
  const ratio = binarySearch(a, b, maxIter);
  if (div) {
    head.removeChild(style);
    document.body.removeChild(div);
  }
  return ratio;

  function binarySearch(
    aValue: number,
    bValue: number,
    maxIterValue: number
  ): number {
    const mid = (aValue + bValue) / 2;
    if (maxIterValue <= 0 || bValue - aValue < epsilon) {
      return mid;
    }
    const query = '(' + property + ':' + mid + unit + ')';
    if (matchMedia(query).matches) {
      return binarySearch(mid, bValue, maxIterValue - 1);
    } else {
      return binarySearch(aValue, mid, maxIterValue - 1);
    }
  }
}

/**
 * Generate detection function
 * @private
 */
const zoomDetail = (() => {
  let func = () => {
    return {
      zoom: 1,
      devicePxPerCssPx: 1
    };
  };
  // iE8+
  if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
    func = ie8;
  } else if (window.navigator.msMaxTouchPoints) {
    // iE10+ / Touch
    func = ie10;
  } else if (
    !!(window as any).chrome &&
    !(!!(window as any).opera || navigator.userAgent.indexOf(' Opera') >= 0)
  ) {
    // chrome
    func = chrome;
  } else if (
    Object.prototype.toString
      .call((window as any).HTMLElement)
      .indexOf('Constructor') > 0
  ) {
    // safari
    func = safari;
  } else if (
    'orientation' in window &&
    'webkitRequestAnimationFrame' in window
  ) {
    // mobile Webkit
    func = webkitMobile;
  } else if ('webkitRequestAnimationFrame' in window) {
    // webKit
    func = webkit;
  } else if (navigator.userAgent.indexOf('Opera') >= 0) {
    // opera
    func = opera11;
  } else if ((window as any).devicePixelRatio) {
    // last one is Firefox
    // fF 18.x
    func = firefox18;
  } else if (firefox4().zoom > 0.001) {
    // fF 4.0 - 17.x
    func = firefox4;
  }
  return func;
})();

// tslint:enable no-any
export default zoomDetail;
