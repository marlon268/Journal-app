import React, { useEffect } from 'react'
import validator from "validator";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm'
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {
   const dispatch = useDispatch()

   useEffect(() => {

      dispatch(removeError())

   }, [dispatch])


   // useSelector me regresa el state del redux
   const { msgError } = useSelector((state) => state.ui)

   const [formValues, handleInputChange] = useForm({
      name: "",
      email: "",
      password: "",
      password2: ""
   })

   const { name, email, password, password2 } = formValues;

   const handleRegister = (e) => {
      e.preventDefault()

      if (isFormValid()) {
         dispatch(startRegisterWithEmailPasswordName(email, password, name))
      }

   }

   const isFormValid = () => {

      // npm i validator:  Nos ayuda a hacer validaciones de formularios

      if (name.trim().length === 0) {

         dispatch(setError("Name is required"))
         return false

      } else if (!validator.isEmail(email)) {

         dispatch(setError("Email is not valid"))
         return false;

      } else if (password !== password2 || password.length < 5) {

         dispatch(setError("password should be at least 6 characters an mach eacht other"))
         return false

      } else {

         dispatch(removeError())
         return true;

      }


   }


   return (
      <>
         <h3 className="auth__title">Register</h3>

         <form
            onSubmit={handleRegister}
            className="auth__form animate__animated animate__fadeIn animate-faster"
         >

            {
               msgError &&
               (
                  <div className="auth__alert-error">
                     {msgError}
                  </div>
               )
            }

            <label className="auth_label mb-1" htmlFor="Name">Name</label>
            <input
               id="Name"
               type="text"
               name="name"
               className="auth__input"
               autoComplete="off"
               value={name}
               onChange={handleInputChange}
            />

            <label className="auth_label mb-1" htmlFor="Email">Email</label>
            <input
               id="Email"
               type="text"
               name="email"
               className="auth__input"
               autoComplete="off"
               value={email}
               onChange={handleInputChange}
            />


            <label className="auth_label mb-1" htmlFor="password">Password</label>
            <input
               id="password"
               type="password"
               name="password"
               className="auth__input"
               value={password}
               onChange={handleInputChange}
            />

            <label className="auth_label mb-1" htmlFor="password2">Repeat Password</label>
            <input
               id="password2"
               type="password"
               name="password2"
               className="auth__input"
               autoComplete="off"
               value={password2}
               onChange={handleInputChange}
            />

            <button
               className="btn btn-primary btn-block bnt-register mb-5"
               type="submit"
            >
               Register
            </button>

            <Link className="link" to="/auth/login">
               Already register?
            </Link>

         </form>
      </>
   )
}