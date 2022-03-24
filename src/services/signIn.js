import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export const signIn = async (auth) => {
  const provider = new GoogleAuthProvider();

await signInWithPopup(auth, provider);


  
};
