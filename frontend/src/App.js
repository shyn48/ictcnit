import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import AboutScreen from './screens/AboutScreen'
import BossesScreen from './screens/BossesScreen'
import CollaborationScreen from './screens/CollaborationScreen'
import ContactScreen from './screens/ContactScreen'
import GuideScreen from './screens/GuideScreen'
import PersonnelScreen from './screens/PersonnelScreen'
import RulesScreen from './screens/RulesScreen'
import ServiceScreen from './screens/ServiceScreen'
import NewsScreen from './screens/NewsScreen'
// import adminScreen from './screens/admin/adminScreen'
// import adminCollaborationScreen from './screens/admin/CollaborationScreen'
// import adminContactScreen from './screens/admin/ContactScreen'
// import adminGuideScreen from './screens/admin/GuideScreen'
// import adminPostScreen from './screens/admin/postScreen'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
    return (
        <Router>
            <Header/>
            <main>
                <Route path="/" component={HomeScreen} exact />
                <Route path="/about" component={AboutScreen} exact />
                <Route path="/bosses" component={BossesScreen} exact />
                <Route path="/collaboration" component={CollaborationScreen} exact />
                <Route path="/contact" component={ContactScreen} exact />
                <Route path="/guides" component={GuideScreen} exact />
                <Route path="/personnel" component={PersonnelScreen} exact />
                <Route path="/news" component={NewsScreen} exact />
                <Route path="/rules" component={RulesScreen} exact />
                <Route path="/services" component={ServiceScreen} exact />
                {/* <Route path="/admin" component={adminScreen} exact />
                <Route path="/admin/collaboration" component={adminCollaborationScreen} exact />
                <Route path="/admin/contact" component={adminContactScreen} exact />
                <Route path="/admin/guides" component={adminGuideScreen} exact />
                <Route path="/admin/posts" component={adminPostScreen} exact /> */}
            </main>
            <Footer/>
        </Router>
    )
}

export default App