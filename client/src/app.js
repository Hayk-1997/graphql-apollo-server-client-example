import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import routes  from './routes';
import './assets/styles/main.css';

export default () => {

    const renderComponent = () => {
        return routes.map((route, index) => {
              const Component = route.component;
              return (
                  <Route
                      key={index}
                      path={route.path}
                      render={(props) => {
                          return (
                              <Component {...props} />
                          )
                      }}
                  />
              );
        });
    };

    return (
        <div className="App">
            <div className="d-flex">

                <div className="left-section">
                    <div className="NavBar">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <Link to="/list" className="nav-link">
                                            Items<span className="sr-only">(current)</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/add" className="nav-link">
                                            Add Item
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>

                    <div className="mt-5">
                        { renderComponent() }
                    </div>
                </div>
                <div className="main-section">
                    <div className="right-background">
                        <div className="logo-background">
                            <img src="../assets/static/media/newlogonobgwhite.2a74f711.png" alt=""/>
                        </div>
                    </div>
                    <footer>
                        <p>
                            &copy;
                            <a href="https://www.weconstruct.am/">
                                We Construct
                            </a>
                            GraphQl presentation
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    )
};

