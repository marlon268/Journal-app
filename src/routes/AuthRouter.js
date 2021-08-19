import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { registerScreen } from '../components/auth/registerScreen'




export const AuthRouter = () => {

   let match = useRouteMatch();

   return (
      <div className="auth__main">
         <div className="auth__box-container">
            <Switch>
               <Route
                  exact
                  path={`${match.path}/login`}
                  component={LoginScreen}
               />

               <Route
                  exact
                  path={`${match.path}/register`}
                  component={registerScreen}
               />

               <Redirect to={`${match.path}/login`} />
            </Switch>
         </div>

      </div>
   )
}
