import { render } from 'preact'
import { App } from './app.tsx'
import './index.scss'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

render(<App />, document.getElementById('app') as HTMLElement)
