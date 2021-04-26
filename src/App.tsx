import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.scss';
import HomeComponent from './components/home';
import ProductDetails from './components/products/ProductDetails';

const App: React.FC<any> = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/product-details/:slug" component={ProductDetails} />

          <Route path="/" component={HomeComponent} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
