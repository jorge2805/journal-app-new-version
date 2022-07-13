import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseFirestoreLite } from "../firebase/config";


export const loadNotes = async (uid = '') => {
    console.log(uid);
    if ( !uid ) throw new Error('El UID del usuario no existe');

    const collectionRef = collection(FirebaseFirestoreLite, `${ uid }/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes = [];

    docs.forEach( doc => {
        notes.push({ id: doc.id, ...doc.data()});
    });

    return notes;
}