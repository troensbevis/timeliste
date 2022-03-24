import { useEffect, useState } from "react";
import { doc, collection, setDoc } from 'firebase/firestore';
import { useFirestoreCollectionData, useSigninCheck } from 'reactfire';
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from 'reactfire';



export const Home = () => { 
    const firestore = useFirestore();
  const { data: signinResult } = useSigninCheck();
  const { user } = signinResult;
    let navigate = useNavigate();
    const userRef = doc(firestore, "users", user.email);
    console.log(user)
    const userData = {
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL,
        uid: user.uid,
        

    }
    setDoc(userRef, userData,   { merge: true });
    const worklistCollection = collection(firestore, "users", user.email, "worklist");
    const { data: userFirestoreData, status } = useFirestoreCollectionData(worklistCollection)
    if (status === "loading") {
        return(<p>Loading...</p>)
    }
    return (
        <div>
            {userFirestoreData.map(d => <p>{d.date}</p>)}
            <Link to="/add">Add</Link>
            <Link to="/track">Track</Link>
        </div>
    )
}


