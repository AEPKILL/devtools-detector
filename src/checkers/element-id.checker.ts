import { isEdge, isIE, isFirefox } from '../shared/browser-info'
import { clear, log } from '../shared/console'
import { DevtoolsStatusChecker } from '../types/devtools-status-checker.type'
import { match } from '../shared/utils'

let isOpen = false

let ele: HTMLDivElement | null = null

function getCheckerEle() {
  if (ele) {
    return ele
  }
  const _ele = document.createElement('div')
  ele = _ele
  let isOpen = false

  Object.defineProperty(ele, 'id', {
    get() {
      isOpen = true
      return elementIdChecker.name
    },
    configurable: true,
  })

  return ele
}

export const elementIdChecker: DevtoolsStatusChecker = {
  name: 'element-id',
  async isOpen(): Promise<boolean> {
    isOpen = false
    const ele = getCheckerEle()
    log(ele)
    clear()

    return isOpen
  },
  async isEnable(): Promise<boolean> {
    return match({
      /** 匹配所有浏览器 */
      includes: [true],
      excludes: [isIE, isEdge, isFirefox],
    })
  },
}
