document.documentElement.setAttribute('darkMode', '')

import './App.scss'

import Toast from './components/Toast'
import AppRoutes from './containers/AppRoutes'
import Header from './containers/Header'
import store from './redux-store'
import reportWebVitals from './reportWebVitals'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const startWorker = async () => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { worker } = require('./mocks/browser')
    worker.start()
  }
}

startWorker()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <BrowserRouter>
          <Header />
          <AppRoutes />
          <Toast />
        </BrowserRouter>
      </RecoilRoot>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
