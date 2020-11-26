import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

interface BulletProps {
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
class Bullet extends PureComponent<BulletProps, {}> {
  static defaultProps = {
    speed: 50,
    row: 3,
    rowHeight: 40,
    spacing: 120,
    renderItem: () => undefined,
  }

  launchedCount: number

  bulletRef: HTMLDivElement

  srollWidth: number

  timer: number

  constructor(props) {
    super(props)
    this.launchedCount = 0 // 已经发射的弹幕数
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
      this.srollWidth = this.bulletRef ? this.bulletRef.offsetWidth : document.body.clientWidth

      while (this.launchedCount < row) {
        const bullet = data[this.launchedCount]
        const count = this.launchedCount
        setTimeout(() => {
          this.launchBarrge(bullet, count)
        }, count * 1500)
        this.launchedCount++
      }
    }, 20)
  }

  /**
   * 发射弹幕
   */
  launchBarrge(bullet, rowIndex) {
    if (!bullet) return
    const bulletEle = this.createBulletEle(bullet, rowIndex)
    if (this.bulletRef) this.bulletRef.appendChild(bulletEle)
    const { data, speed, spacing } = this.props
    let bulletWidth = bulletEle.offsetWidth
    // 拿不到宽度按一屏处理
    if (bulletWidth === 0) bulletWidth = this.srollWidth
    // 全程滚动距离
    const distance = this.srollWidth + bulletWidth

    const duration = distance / speed
    // 弹幕滚动至spacing所需时间
    const time = (bulletWidth + spacing) / speed

    bulletEle.style.transform = `translateX(${-distance}px)`
    bulletEle.style.transition = `transform ${duration}s linear`

    // 当弹幕拉开距离spacing时发射下一个弹幕
    this.timer = window.setTimeout(() => {
      const nextBullet = data[this.launchedCount % data.length]
      this.launchBarrge(nextBullet, rowIndex)
      this.launchedCount++
    }, time * 1000)
  }

  /**
   * 创建弹幕元素
   * @param {*} bullet
   * @param {*} rowIndex // 所在行
   */
  createBulletEle(bullet, rowIndex: number) {
    const { renderItem, rowHeight } = this.props
    const div = document.createElement('div')

    div.classList.add('bullet-item')
    div.style.top = `${rowIndex * rowHeight}px`
    div.style.left = `${this.srollWidth}px`
    div.style.position = 'absolute'
    div.style.whiteSpace = 'nowrap'

    const handleTransitionEnd = () => {
      // 弹幕运动完成后移除监听，清除弹幕
      div.removeEventListener('transitionend', handleTransitionEnd)
      this.bulletRef.removeChild(div)
    }
    div.addEventListener('transitionend', handleTransitionEnd)

    ReactDOM.render(renderItem(bullet), div)
    return div
  }

  render() {
    const { row, rowHeight } = this.props
    return (
      <div
        className="react-bullet-screen"
        style={{ position: 'relative', overflow: 'hidden', minHeight: `${row * rowHeight}px` }}
        ref={(ref) => {
          this.bulletRef = ref
        }}
      />
    )
  }
}

export default Bullet
