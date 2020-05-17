module.exports = {
  extends: ['alloy', 'alloy/react', 'alloy/typescript'],
  env: {
    // 你的环境变量（包含多个预定义的全局变量）
    browser: true,
    node: true,
  },
  globals: {
    // 你的全局变量（设置为 false | readonly 表示它不允许被重新赋值）
  },
  rules: {
    // 自定义你的规则
    // class修饰符 不写默认public
    '@typescript-eslint/explicit-member-accessibility': ['warn', { accessibility: 'no-public' }],
    'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
    'no-param-reassign': ['warn', { props: true }], // 不允许2次赋值参数, 允许a.props = 1
    'max-params': ['error', 4], // 最多传4个参
  },
}