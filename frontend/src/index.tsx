import '@lynx-js/preact-devtools'
import '@lynx-js/react/debug'
import { root } from '@lynx-js/react'

import { MainView } from './views/MainView.tsx';
import { ImageAnalysisProvider } from './contexts/ImageAnalysisContext.tsx';
import { TextAnalysisProvider } from './contexts/TextAnalysisContext.tsx';
import { ThemeProvider } from './theme/ThemeProvider.tsx';
import { ToastProvider } from './contexts/ToastContext.tsx';
import { GlobalToast } from './components/GlobalToast.tsx';

root.render(
  <ThemeProvider>
    <ToastProvider>
      <TextAnalysisProvider>
        <ImageAnalysisProvider>
          <MainView />
          <GlobalToast />
        </ImageAnalysisProvider>
      </TextAnalysisProvider>
    </ToastProvider>
  </ThemeProvider>
)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
