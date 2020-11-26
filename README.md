
# React-Bullet-Screen

🚀 A lightweight customizable React infinite loop bullet screen component. [live demo](https://tong233.github.io/react-bullet-screen/)
一个轻量的可自定义的React无限循环弹幕组件. 

## Installation

```bash
npm install react-bullet-screen --save
```

## Usage

```javascript
import React, { useState } from 'react'
import Bullet from 'react-bullet-screen'

const text = [
  'I am the first',
  'I am the second ha',
  'I am the third haha',
  'I am the fourth hahaha',
  'I am the fifth hahahahaha',
]

const App = () => {
  const [data] = useState(text)

  const renderItem = (item) => {
    return <div className="item">{item}</div>
  }

  return data.length ? (
    <Bullet
      data={data}
      renderItem={renderItem}
      speed={50}
      row={3}
      rowHeight={40}
      spacing={120}
    />
  ) : null
}
```

## API

| Prop | Description | Type | Default | required
| --- | --- | --- | -- | -- |
| data | Barrage datas | T[] | [] | true
| renderItem | Render every barrage | (item: T) => React.ReactElement | () => undefined  | true
| speed | Barrage movement speed (px/s) | number | 50  | false
| row | Number of tracks | number | 3  | false
| rowHeight | Movement track height (px) | number | 200 | false
| spacing | Barrage Horizontal spacing (px) | number | 120 | false

## License
MIT
