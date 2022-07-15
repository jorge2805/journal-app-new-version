import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseFirestoreLite } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, savingNote, setActiveNote, setNotes, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        dispatch(savingNote());

        const newDoc = doc( collection( FirebaseFirestoreLite, `${uid}/journal/notes`) );
        await setDoc(newDoc, newNote);
        
        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSavingNote = () => {
    return async( dispatch, getState ) => {
        
        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const newNote = {...note};
        delete newNote.id;        
        
        const noteToUpdateRef = doc( FirebaseFirestoreLite, `${uid}/journal/notes/${note.id}`);
        await setDoc(noteToUpdateRef, newNote, {merge: true});       

        dispatch(updateNote(note));
    }
}