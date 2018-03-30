import zoomDetail from './zoom-detail';

const threshold = 160;

export function devtoolsIsDocked() {
  const zoom = zoomDetail().zoom;
  return (
    window.outerWidth - window.innerWidth * zoom > threshold ||
    window.outerHeight - window.innerHeight * zoom > threshold
  );
}

export default {
  devtoolsIsDocked
};
