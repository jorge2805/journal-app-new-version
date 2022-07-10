import {GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, } from 'firebase/auth'
import { FirebaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    
    try {
        
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        // console.log({ credentials });

        const {displayName, email, photoURL, uid} = result.user;

        return {
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid
        }
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const signInDirect = async({email, password}) => {
    
    try {
        
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        // console.log({ credentials });

        const {displayName, photoURL, uid} = result.user;

        return {
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid
        }
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const directRegister = async({email,password,displayName}) => {
    
    try {
        
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL} = result.user;

        updateProfile( FirebaseAuth.currentUser, {displayName});

        return {
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid
        }
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const logoutFirebase = async() => {
    
    try {
        
        await FirebaseAuth.signOut();
        return {
            ok: true,
        }
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}