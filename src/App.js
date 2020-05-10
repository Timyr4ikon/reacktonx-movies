import React, { Component,Suspense } from 'react'
import {Header} from './components/Header/Header';
import { Switch,Route, Redirect } from 'react-router-dom';
import {Home} from './components/Home/Home';

const Film = React.lazy(() => import('./components/Film/Film'));
const Movies = React.lazy(() => import('./components/Movies/Movies'));
const Netyda = React.lazy(() => import('./components/Netyda/Netyda'));


export default class App extends Component {
  render() {
    return (
      <>
          <Header/>
          <Suspense fallback={<></>}>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/movies/:id" component={Film}/>
                <Route path="/movies" component={Movies}/>
                <Route path="/wow" component={Netyda}/>
                <Redirect to="/wow" />
            </Switch>
          </Suspense>
      </>
    )
  }
};

