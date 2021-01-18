import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import AboutScreen from '../screens/AboutScreen'
import BossesScreen from '../screens/BossesScreen'
import CollaborationScreen from '../screens/CollaborationScreen'
import ContactScreen from '../screens/ContactScreen'
import GuideScreen from '../screens/GuideScreen'
import RulesScreen from '../screens/RulesScreen'
import ServiceScreen from '../screens/ServiceScreen'
import NewsScreen from '../screens/NewsScreen'
import PeopleScreen from '../screens/PeopleScreen'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SinglePost from '../screens/SinglePost'
import ScrollToTop from '../components/ScrollToTop'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import UserPanel from '../screens/UserPanel'
import { Route } from 'react-router-dom'


const publicLayout = () => {
    return (
        <div>
            <Header/>
            <ScrollToTop/>
                <Route path="/" component={HomeScreen} exact />
                <Route path="/about" component={AboutScreen} exact />
                <Route path="/bosses" component={BossesScreen} exact />
                <Route path="/collaboration" component={CollaborationScreen} exact />
                <Route path="/contact" component={ContactScreen} exact />
                <Route path="/guides" component={GuideScreen} exact />
                {/* <Route path="/guides/:help" component={singleGuideScreen} exact /> */}
                <Route path="/news" component={NewsScreen} exact />
                <Route path="/news/search/:keyword" component={NewsScreen} exact/>
                <Route path="/news/page/:page" component={NewsScreen} exact/>
                <Route path='/news/:keyword/page/:pageNumber' component={NewsScreen} exact/>
                <Route path="/news/:id" component={SinglePost} exact/>
                <Route path="/rules" component={RulesScreen} exact />
                <Route path="/services" component={ServiceScreen} exact />
                <Route path="/people" component={PeopleScreen} exact />
                <Route path="/login" component={LoginScreen} exact/>
                <Route path="/register" component={RegisterScreen} exact />
                <Route path="/user/panel" component={UserPanel} exact/>
                <Footer/>
        </div>
    )
}

export default publicLayout
