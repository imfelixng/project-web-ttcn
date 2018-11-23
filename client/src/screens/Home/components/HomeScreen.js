import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom';
import NewfeedContainer from './../../Newfeed/containers/NewfeedContainer';
import Error404Screen from './../../Error404/components/Error404Screen';
import QuestionDetail from '../../QuestionDetail/components/QuestionDetail';
import LoginContainer from '../../Login/containers/LoginContainer';
import HeaderContainer from '../../../commons/Header/containers/HeaderContainer';
import CategoryContainer from '../../Category/Containers/CategoryContainer';
import TagContainer from '../../Tag/containers/TagContainer';
export default class HomeScreen extends Component {
  
  render() {
    return (
      <React.Fragment>
          <HeaderContainer />
          <Switch>
              <Route path = "/" component = {NewfeedContainer} exact/>
              <Route path = "/categories" component = {CategoryContainer} exact/>
              <Route path = "/tags" component = {TagContainer} exact/>
              <Route path = "/questions/:idQuestion" component = {QuestionDetail}/>
              <Route path = "/sign-in" component = {LoginContainer}/>
              <Route component = {Error404Screen} />
          </Switch>
      </React.Fragment>
    )
  }
}
