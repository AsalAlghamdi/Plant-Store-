import React, { useState, useMemo } from 'react'
import './App.scss';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import PlantPage from './pages/PlantPage';
import CartPage from './pages/CartPage';
import { Row, Col } from 'antd';
import { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

export const Context = React.createContext();

function App() {
  const [cart, setCart] = useState([2, 3])
  const value = useMemo(
    () => ({ cart, setCart }),
    [cart]
  );

  const updateCart = (items) => {
    setCart(items)
  }
  const history = createBrowserHistory()
  return (
    <Fragment>
      <Context.Provider value={value}>
        <Router history={history}>
          <Row className="App">
            <Col span={22} xxl={23}>
              <Header />
              <Switch>
                <Route exact path={'/'} component={Home} />
                <Route exact path={'/faq'} component={FAQ} />
                <Route exact path={'/plant/:id'} component={PlantPage} />
                <Route exact path={'/cart'} render={() => (
                  <CartPage updateCart={updateCart} />
                )} />
              </Switch>
            </Col>
          </Row>
          <Footer />
        </Router>
      </Context.Provider>
    </Fragment>
  );
}

export default App;
