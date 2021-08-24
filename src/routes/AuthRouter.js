import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/registerScreen'
import { Loading } from '../components/loading/Loading'




export const AuthRouter = () => {

   const { loading } = useSelector((state) => state.ui)

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
                  component={RegisterScreen}
               />

               <Redirect to={`${match.path}/login`} />
            </Switch>
         </div>

         {loading && <Loading />}

      </div>
   )
}
