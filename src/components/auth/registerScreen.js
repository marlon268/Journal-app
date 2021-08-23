import React from 'react'
import validator from "validator";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm'
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {

   const dispatch = useDispatch()
   // useSelector me regresa el state del redux
   const { msgError } = useSelector((state) => state.ui)

   const [formValues, handleInputChange] = useForm({
      name: "Estiben",
      email: "estiben@gmail.com",
      password: "123456",
      password2: "123456"
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

            <input
               type="text"
               placeholder="Name"
               name="name"
               className="auth__input"
               autoComplete="off"
               value={name}
               onChange={handleInputChange}
            />

            <input
               type="text"
               placeholder="Email"
               name="email"
               className="auth__input"
               autoComplete="off"
               value={email}
               onChange={handleInputChange}
            />



            <input
               type="password"
               placeholder="Password"
               name="password"
               className="auth__input"
               value={password}
               onChange={handleInputChange}
            />

            <input
               type="password"
               placeholder="Confirm password"
               name="password2"
               className="auth__input"
               autoComplete="off"
               value={password2}
               onChange={handleInputChange}
            />

            <button
               className="btn btn-primary btn-block mb-5"
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
