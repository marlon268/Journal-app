/* este archido me trae las notas de la base de datos de firestore mediante 
   el metodo forEach pasandole un callback el cual me regresa un hijo con los datos  */

import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) => {

   // .get me trae informacion de mi base de datos
   const notesSnap = await db.collection(`${uid}/journal/notes`).get();
   const notes = []

   notesSnap.forEach((snapHijo) => {
      notes.push({
         id: snapHijo.id,
         ...snapHijo.data(),
      })
   });

   return notes;

}