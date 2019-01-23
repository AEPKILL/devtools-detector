import { isEdge, isIE } from '../../utils/browser';
import zoomDetail from '../../utils/zoom-detail';
import { DevtoolsChecker } from '../devtools-checker';

const threshold = 160;

const devtoolsDockedChecker: DevtoolsChecker = {
  name: 'devtools-docked-checker',
  async getDevtoolsDetail() {
    let isOpen = false;
    // 获取 zoom 是一个稍微耗时的操作，先预判一次再获取
    if (
      window.outerWidth - window.innerWidth > threshold ||
      window.outerHeight - window.innerHeight > threshold
    ) {
      const zoom = zoomDetail().zoom;
      if (isIE || isEdge) {
        isOpen =
          (window.outerHeight - window.innerHeight) * zoom > threshold ||
          (window.outerWidth - window.outerWidth) * zoom > threshold;
      } else {
        isOpen =
          window.outerHeight - window.innerHeight * zoom > threshold ||
          window.outerWidth - window.outerWidth * zoom > threshold;
      }
    }
    return {
      checkerName: this.name,
      isOpen
    };
  }
};

export default devtoolsDockedChecker;
