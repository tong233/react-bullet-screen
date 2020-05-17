import React, { useState } from 'react'
import Bullet from '../../src/index'
import './app.css'

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
    <Bullet data={data} renderItem={renderBulletItem} speed={50} row={3} rowHeight={40} spacing={120} />
  ) : null
}

export default App
