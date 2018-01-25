const threshold = 160;

export function devtoolsIsDocked() {
  return (
    window.outerWidth - window.innerWidth > threshold ||
    window.outerHeight - window.innerHeight > threshold
  );
}

export default {
  devtoolsIsDocked
};
