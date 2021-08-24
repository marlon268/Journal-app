import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

   const dispatch = useDispatch();

   const { active: note } = useSelector(state => state.notes);
   const [formValues, handledInputChange, reset] = useForm(note);
   const { title, body, id } = formValues;

   // Ejecutar el useEffect solo si el id de la nota cambia para evitar un ciclo infinito
   const activeId = useRef(note.id);

   useEffect(() => {

      if (note.id !== activeId.current) {
         reset(note);
         activeId.current = note.id
      }

   }, [note, reset])

   useEffect(() => {

      dispatch(activeNote(formValues.id, { ...formValues }))

   }, [formValues, dispatch])

   const handleDelete = () => {
      dispatch(startDeleting(id));
   }

   return (
      <div className="notes__main-content animate__animated animate__zoomIn">
         <NotesAppBar />

         <div className="notes__content">

            <input
               type="text"
               name="title"
               placeholder="Some awesome title"
               className="notes__title-input"
               autoComplete="off"
               value={title}
               onChange={handledInputChange}

            />


            <textarea
               placeholder="What happened today?"
               name="body"
               className="notes__textarea"
               autoComplete="off"
               value={body}
               onChange={handledInputChange}

            /* name=""
               id=""
               cols="30"
               rows="10" */
            >

            </textarea>

            {
               (note.url)
               &&
               (<div className="notes__image">
                  <img
                     src={note.url}
                     alt="Imagen" />
               </div>)
            }

         </div>

         <button
            className="btn btn-danger"
            onClick={handleDelete}
         >
            delete
         </button>

      </div>
   )
}
