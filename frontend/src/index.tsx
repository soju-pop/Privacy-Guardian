import '@lynx-js/preact-devtools'
import '@lynx-js/react/debug'
import { root } from '@lynx-js/react'

import { ThemeProvider } from './theme/ThemeProvider.tsx';


import { MainView } from './views/MainView.tsx';
root.render(<ThemeProvider><MainView /></ThemeProvider>)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
