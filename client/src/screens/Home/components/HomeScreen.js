import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom';
import NewfeedScreen from './../../Newfeed/components/NewfeedScreen';
import CategoryScreen from './../../Category/components/CategoryScreen';
import TagScreen from './../../Tag/components/TagScreen';
import Error404Screen from './../../Error404/components/Error404Screen';
import Header from '../../../commons/Header/components/Header';
import QuestionDetail from '../../QuestionDetail/components/QuestionDetail';
import LoginScreen from '../../Login/components/LoginScreen';

export default class HomeScreen extends Component {
  render() {
    return (
      <React.Fragment>
          <Header />
          <Switch>
              <Route path = "/" component = {NewfeedScreen} exact/>
              <Route path = "/categories" component = {CategoryScreen}/>
              <Route path = "/tags" component = {TagScreen}/>
              <Route path = "/questions/:idQuestion" component = {QuestionDetail}/>
              <Route path = "/sign-in" component = {LoginScreen}/>
              <Route component = {Error404Screen} />
          </Switch>
      </React.Fragment>
    )
  }
}
