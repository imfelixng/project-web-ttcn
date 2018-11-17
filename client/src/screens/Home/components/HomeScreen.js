import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom';
import NewfeedContainer from './../../Newfeed/containers/NewfeedContainer';
import CategoryScreen from './../../Category/components/CategoryScreen';
import TagScreen from './../../Tag/components/TagScreen';
import Error404Screen from './../../Error404/components/Error404Screen';
import Header from '../../../commons/Header/components/Header';
import QuestionDetail from '../../QuestionDetail/components/QuestionDetail';
import LoginContainer from '../../Login/containers/LoginContainer';
export default class HomeScreen extends Component {
  
  render() {
    return (
      <React.Fragment>
          <Header />
          <Switch>
              <Route path = "/" component = {NewfeedContainer} exact/>
              <Route path = "/categories" component = {CategoryScreen}/>
              <Route path = "/tags" component = {TagScreen}/>
              <Route path = "/questions/:idQuestion" component = {QuestionDetail}/>
              <Route path = "/sign-in" component = {LoginContainer}/>
              <Route component = {Error404Screen} />
          </Switch>
      </React.Fragment>
    )
  }
}
