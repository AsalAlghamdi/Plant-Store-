import React from 'react'
import Header from './pages/Header';
import Home from './pages/Home';
import About from './pages/About';
import { Row, Col } from 'antd';
import { Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

export default function layout() {
    const history = createBrowserHistory()
    return (
        <Fragment>
          <Router history={history}>
            <Row className="App">
              <Col span={22} xxl={23}>
                <Header />
                <Switch>
                  <Route exact path={'/'} component={Home} />
                  <Route exact path={'/faq'} component={About} />
                  {/* <Route exact path={'/blogs'} component={blogs} />
                  <Route exact path={'/cart'} component={cart} /> */}
                </Switch>
              </Col>
            </Row>
    
          </Router>
        </Fragment>
    )
}
