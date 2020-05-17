
# React-Bullet-Screen

🚀一个轻量的可自定义的React无限循环弹幕组件. [live demo](https://tong233.github.io/react-bullet-screen/)

## Installation

```bash
npm install react-bullet-screen --save
```

## Usage

```javascript
import React, { useState } from 'react'
import Bullet from 'react-bullet-screen'

const text = [
  '我是第一条弹幕',
  '我是第二条弹幕啊',
  '我是第三条弹幕啊啊',
  '我是第四条弹幕啊啊啊',
  '我是第五条弹幕啊啊啊啊',
]

const App = () => {
  const [data] = useState(text)

  const renderBulletItem = (item) => {
    return <div className="item">{item}</div>
  }

  return data.length ? (
    <Bullet
      data={data}
      renderItem={renderBulletItem}
      speed={50}
      row={3}
      rowHeight={40}
      spacing={120}
    />
  ) : null
}
```

## API

| Prop | Description | Type | Default | 必须
| --- | --- | --- | -- | -- |
| data | 弹幕数据 | Array<T> | [] | true
| renderItem | 渲染每条弹幕 | (item: T) => React.ReactElement | () => undefined  | true
| speed | 弹幕运动速度(px/s) | number | 50  | false
| rowHeight | 轨道高度(px) | number | 200 | false
| spacing | 弹幕水平间隔(px) | string | 120 | false

## License
MIT
