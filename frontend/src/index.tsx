import '@lynx-js/preact-devtools'
import '@lynx-js/react/debug'
import { root } from '@lynx-js/react'

import { MainView } from './views/MainView.tsx';
import { ImageAnalysisProvider } from './contexts/ImageAnalysisContext.tsx';
import { TextAnalysisProvider } from './contexts/TextAnalysisContext.tsx';
import { ThemeProvider } from './theme/ThemeProvider.tsx';

root.render(
  <ThemeProvider>
    <TextAnalysisProvider>
      <ImageAnalysisProvider>
        <MainView />
      </ImageAnalysisProvider>
    </TextAnalysisProvider>
  </ThemeProvider>
)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
}
