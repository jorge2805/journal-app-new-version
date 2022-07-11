import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseFirestoreLite } from "../../firebase/config";
import { addNewEmptyNote, savingNote, setActiveNote } from "./journalSlice";

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        dispatch(savingNote());

        const newDoc = doc( collection( FirebaseFirestoreLite, `${uid}/journal/notes`) );
        const setDocResp =  await setDoc(newDoc, newNote);
        
        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}