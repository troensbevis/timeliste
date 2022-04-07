import { doc, collection, setDoc } from 'firebase/firestore';
import { useFirestoreCollectionData, useSigninCheck } from 'reactfire';
import { Link } from "react-router-dom";
import { useFirestore } from 'reactfire';
import { formatDuration } from "date-fns";
import nb from "date-fns/locale/nb";


export const Home = () => { 
    const firestore = useFirestore();
  const { data: signinResult } = useSigninCheck();
  const { user } = signinResult;
    
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
    console.log(userFirestoreData)
    return (
        <div>
        <div className="grid gap-2">
            {userFirestoreData.map(d =>
                <div className="grid rounded-md relative shadow-lg w-56 h-32 content-center justify-center bg-emerald-50 text-emerald-700">
                    <Link to={`/edit?id=${d.NO_ID_FIELD}`} className="absolute top-2 right-2 text-sm">Rediger</Link>
                    <p>{d.employer }</p>
                    <p>{d.date}</p>
                    <p>{d.startTime} - {d.endTime}</p>
                    <p>{formatDuration(d.timeworked, { locale: nb})}</p>
                    </div>
            
            
            )}
            </div>
            <div className="grid grid-cols-2 content-center justify-center  place-items-center pt-3">
            <Link to="/add"  className="bg-emerald-700 text-center w-14 py-2 text-emerald-100 rounded-md">Legg til timer</Link> 
                
                </div>
            </div>
    )
}


