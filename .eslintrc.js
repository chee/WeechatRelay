module.exports = {
  globals: {
    fetch: false,
    WebSocket: false,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017,
    ecmaFeatures: {
      classes: true,
      jsx: true
    }
  },
  extends: ['standard', 'standard-react'],
  rules: {
    'react/prop-types': ['off'],
    'no-console': ['warn', {allow: ['warn', 'error', 'info']}],
    'no-debugger': ['warn'],
    'object-curly-spacing': ['error', 'never'],
    'no-fallthrough': ['error', {commentPattern: 'fallthrough'}]
  },
  plugins: ['babel']
}
