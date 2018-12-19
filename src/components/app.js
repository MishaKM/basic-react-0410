import React, { Component } from 'react'
import { Route, NavLink, Switch } from 'react-router-dom'
import ArticlesPage from './routes/articles-page'
import UserForm from './user-form'
import Filters from './filters'
import Counter from './counter'

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <div>
            <NavLink to="/articles" activeStyle={{ color: 'red' }}>
              articles
            </NavLink>
          </div>
          <div>
            <NavLink to="/filters" activeStyle={{ color: 'red' }}>
              filters
            </NavLink>
          </div>
          <div>
            <NavLink to="/counter" activeStyle={{ color: 'red' }}>
              counter
            </NavLink>
          </div>
        </nav>
        <UserForm />

        <Switch>
          <Route path="/counter" component={Counter} exact />
          <Route path="/filters" component={Filters} />
          <Route
            path="/articles/new"
            render={() => <h1>New Article Page</h1>}
          />
          <Route path="/articles" component={ArticlesPage} />
          <Route path="*" render={() => <h1>Not Found Page</h1>} />
        </Switch>
      </div>
    )
  }
}

export default App
