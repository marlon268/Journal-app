import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
   return (
      <div className="notes__main-content">
         <NotesAppBar />

         <div className="notes__content">

            <input
               type="text"
               placeholder="Some awesome title"
               className="notes__title-input"
               autoComplete="off"
            />

            <textarea
               placeholder="What happened today?"
               className="notes__textarea"
               autoComplete="off"
            /* name=""
               id=""
               cols="30"
               rows="10" */
            >

            </textarea>

            <div className="notes__image">
               <img
                  src="https://www.xtrafondos.com/descargar.php?id=3963&resolucion=1280x768"
                  alt="Imagen" />
            </div>

         </div>

      </div>
   )
}
