import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

interface BullteProps {
  data: any[]
  renderItem: (item: any) => React.ReactElement
  speed?: number // px/s
  row?: number
  rowHeight?: number
  spacing?: number
}
/**
 * 水平无限循环弹幕
 */
class Bullte extends PureComponent<BullteProps, {}> {
  static defaultProps = {
    speed: 50,
    row: 3,
    rowHeight: 40,
    spacing: 120,
    renderItem: () => undefined,
  }

  launchedCount: number

  bullteRef: HTMLDivElement

  srollWidth: number

  timer: number

  constructor(props) {
    super(props)
    this.launchedCount = 0 // 已经发射的弹幕数
    this.srollWidth = document.body.clientWidth
  }

  componentDidMount() {
    this.init()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  init() {
    const { data, row } = this.props
    // 设定时器避免初始化拿不到宽度
    setTimeout(() => {
      if (this.bullteRef) {
        this.srollWidth = this.bullteRef.offsetWidth
      }

      while (this.launchedCount < row) {
        const bullte = data[this.launchedCount]
        const count = this.launchedCount
        setTimeout(() => {
          this.launchBarrge(bullte, count)
        }, count * 1500)
        this.launchedCount++
      }
    }, 20)
  }

  /**
   * 发射弹幕
   */
  launchBarrge(bullte, rowIndex) {
    if (!bullte) return
    const bullteEle = this.createBullteEle(bullte, rowIndex)
    if (this.bullteRef) this.bullteRef.appendChild(bullteEle)
    const { data, speed, spacing } = this.props
    let bullteWidth = bullteEle.offsetWidth
    // 拿不到宽度按一屏处理
    if (bullteWidth === 0) bullteWidth = this.srollWidth
    // 全程滚动距离
    const distance = this.srollWidth + bullteWidth

    const duration = distance / speed
    // 弹幕滚动至spacing所需时间
    const time = (bullteWidth + spacing) / speed

    bullteEle.style.transform = `translateX(${-distance}px)`
    bullteEle.style.transition = `transform ${duration}s linear`

    // 当弹幕拉开距离spacing时发射下一个弹幕
    this.timer = window.setTimeout(() => {
      const nextBullte = data[this.launchedCount % data.length]
      this.launchBarrge(nextBullte, rowIndex)
      this.launchedCount++
    }, time * 1000)
  }

  /**
   * 创建弹幕元素
   * @param {*} bullte
   * @param {*} rowIndex // 所在行
   */
  createBullteEle(bullte, rowIndex: number) {
    const { renderItem, rowHeight } = this.props
    const div = document.createElement('div')

    div.classList.add('bullte-item')
    div.style.top = `${rowIndex * rowHeight}px`
    div.style.left = `${this.srollWidth}px`

    const handleTransitionEnd = () => {
      // 弹幕运动完成后移除监听，清除弹幕
      div.removeEventListener('transitionend', handleTransitionEnd)
      this.bullteRef.removeChild(div)
    }
    div.addEventListener('transitionend', handleTransitionEnd)

    ReactDOM.render(renderItem(bullte), div)
    return div
  }

  render() {
    const { row, rowHeight } = this.props
    return (
      <div
        className="react-bullte-screen"
        style={{ minHeight: `${row * rowHeight}px` }}
        ref={(ref) => {
          this.bullteRef = ref
        }}
      />
    )
  }
}

export default Bullte
