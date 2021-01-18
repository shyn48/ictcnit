import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import './my_bootstrap.scss'
import './screens/admin/admin.scss'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <App/> 
    </Provider>,
    document.getElementById('root')
)