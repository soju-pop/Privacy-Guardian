import '@lynx-js/preact-devtools'
import '@lynx-js/react/debug'
import { root } from '@lynx-js/react'


import { MainView } from './views/MainView.tsx';
root.render(<MainView />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
