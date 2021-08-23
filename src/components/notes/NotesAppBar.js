import React from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUpLoadng } from '../../actions/notes'

export const NotesAppBar = () => {

   const inputArchivo = useRef(null);  // De inicio no se asigna a nada.

   const dispatch = useDispatch();
   const { active } = useSelector(state => state.notes)

   const handleSave = () => {
      dispatch(startSaveNote(active))
   }

   const handlePictureClick = () => {
      inputArchivo.current.click(); // La referencia se usa y se "ejecuta" su click
   }

   const handleFileChange = (e) => {
      const file = e.target.files[0];

      if (file) {
         dispatch(startUpLoadng(file));
      }

   }

   return (
      <div className="notes__appbar">
         <span>28 de agosto 2020</span>

         <input
            /*Se usa el atributo "ref" para asignar la referencia*/
            name="file"
            ref={inputArchivo}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
         />

         <div>
            <button
               className="btn"
               onClick={handlePictureClick}
            >
               Picture
            </button>

            <button
               className="btn"
               onClick={handleSave}
            >
               Save
            </button>
         </div>
      </div>
   )
}
