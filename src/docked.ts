import zoomDetail from './zoom-detail';

const threshold = 160;

export function devtoolsIsDocked() {
  // 获取 zoom 是一个稍微耗时的操作，先预判一次再获取
  if (
    window.outerWidth - window.innerWidth > threshold ||
    window.outerHeight - window.innerHeight > threshold
  ) {
    const zoom = zoomDetail().zoom;
    return (
      window.outerWidth - window.innerWidth * zoom > threshold ||
      window.outerHeight - window.innerHeight * zoom > threshold
    );
  }
  return false;
}

export default {
  devtoolsIsDocked
};
