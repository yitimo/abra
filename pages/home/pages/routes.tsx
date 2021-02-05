import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import PageTaskList from './TaskList'
import PageTaskDetail from './Taskdetail'
import PageNotFound from './NotFound'

export default function Routes() {
  return (
    <Switch>
      <Route path="/task" exact component={PageTaskList} />
      <Route path="/task/:id" exact component={PageTaskDetail} />
      <Redirect path="/" exact to="/task" />
      <Redirect path="" exact to="/task" />
      <Route path="*" exact component={PageNotFound} />
    </Switch>
  )
}
