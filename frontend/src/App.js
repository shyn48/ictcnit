import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import publicLayout from './layouts/publicLayout'
import adminLayout from './layouts/adminLayout'

const App = () => {
    return (
        <Router>
                <Switch>
                <Route path="/admin" component={adminLayout} />
                <Route path="/" component={publicLayout} />
                </Switch>
        </Router>
    )
}

export default App