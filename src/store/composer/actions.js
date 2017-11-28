import createAction from '../createAction'

export const setMessage = createAction('set message')

export const setFocused = createAction('composer is focused')

export const unsetFocused = createAction('composer is unfocused')
