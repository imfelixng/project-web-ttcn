import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom';
import NewfeedContainer from './../../Newfeed/containers/NewfeedContainer';
import Error404Screen from './../../Error404/components/Error404Screen';
import LoginContainer from '../../Login/containers/LoginContainer';
import HeaderContainer from '../../../commons/Header/containers/HeaderContainer';
import CategoryContainer from '../../Category/Containers/CategoryContainer';
import TagContainer from '../../Tag/containers/TagContainer';
import QuestionDetailContainer from '../../QuestionDetail/containers/QuestionDetailContainer';
import CategoryItemContainer from '../../Category/Containers/CategoryItemContainer';
import SearchScreen from '../../Search/components/SearchScreen';
import NotificationScreen from '../../Notification/components/NotificationScreen';
export default class HomeScreen extends Component {
  
  render() {
    return (
      <React.Fragment>
          <HeaderContainer />
          <Switch>
              <Route path = "/" component = {NewfeedContainer} exact/>
              <Route path = "/categories" component = {CategoryContainer} exact/>
              <Route path = "/tags" component = {TagContainer} exact/>
              <Route path = "/questions/:idQuestion" component = {QuestionDetailContainer}/>
              <Route path = "/categories/:idCategory" component = {CategoryItemContainer}/>
              <Route path = "/tags/:idTag" component = {CategoryItemContainer}/>
              <Route path = "/search" component = {SearchScreen}/>
              <Route path = "/notifications" component = {NotificationScreen}/>
              <Route path = "/sign-in" component = {LoginContainer}/>
              <Route component = {Error404Screen} />
          </Switch>
      </React.Fragment>
    )
  }
}
