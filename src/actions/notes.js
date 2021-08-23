import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpLoad } from "../helpers/fileUpLoad";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {

   // Debemos cambiar la configuracion de fireStore para que solo sea posible
   // modificar la base de datos si se esta logiado

   // El segundo argumento es una funcion para obteber el state
   // parecido al useSelector
   return async (dispatch, getState) => {

      const { uid } = getState().auth;

      // Este es el que enviamos a un path especifico de firestore para gravarlo
      const newNote = {
         title: '',
         body: '',
         date: new Date().getTime()
      }

      // .add me añade una nuva nota en mi base de datos
      const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);

      dispatch(activeNote(docRef.id, newNote))
      dispatch(addNewNote(docRef.id, newNote))

   }
}

// Cambia el estado del JournalScreen a activo para mostrar dicha nota
export const activeNote = (id, note) => ({
   type: types.notesActive,
   payload: {
      id,
      ...note,
   }
});

export const addNewNote = (id, note) => ({
   type: types.notesAddNew,
   payload: {
      id,
      ...note
   }
})

// Trae mis notas de la base de datos de fireBase es por esto que es asincrono
export const startLoadingNotes = (uid) => {

   return async (dispatch) => {

      const notes = await loadNotes(uid);
      dispatch(setNotes(notes))

   }

}

// Cuando ya son traidos los datos de fireStore
// esta funcion los pocisiona en mi reducer 
export const setNotes = (notes) => ({

   type: types.notesLoad,
   payload: notes,

});

// Guardar la modificacion de una nota en mi fireStore
export const startSaveNote = (note) => {
   return async (dispatch, getState) => {

      const { uid } = getState().auth;

      if (!note.url) {
         delete note.url;
      }

      const noteToFirestore = { ...note };
      delete noteToFirestore.id;

      await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

      const notes = await loadNotes(uid);
      dispatch(setNotes(notes))
      Swal.fire("Saved", note.title, "success")
   }
}

export const startUpLoadng = (file) => {
   return async (dispatch, getState) => {

      const { active: activeNote } = getState().notes;

      Swal.fire({
         title: "Uploading...",
         text: "Please wait...",
         allowOutsideClick: false,
         showConfirmButton: false,
         willOpen: () => {
            Swal.showLoading();
         }
      });

      const fileUrl = await fileUpLoad(file)
      activeNote.url = fileUrl;

      dispatch(startSaveNote(activeNote))

      Swal.close();

   }
}

export const startDeleting = (id) => {
   return async (dispatch, getState) => {

      const { uid } = getState().auth;
      await db.doc(`${uid}/journal/notes/${id}`).delete();

      dispatch(deleteNote(id));

   }
}

export const deleteNote = (id) => ({
   type: types.notesDelete,
   payload: id
});

export const noteLogout = () => ({
   type: types.notesLogoutCleaning,
   payload: [],
})

// Creamos una cuenta en cloudinary para almacenar las imagenes react-journal