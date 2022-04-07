import { initializeFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { Routes, Route } from "react-router-dom";

import { FirestoreProvider, useFirebaseApp, useInitFirestore, AuthProvider } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { Auth } from './components/Auth';
import { AddWorkForm } from './components/AddWorkForm';
import { StartTracking } from './components/StartTracking';
import { Edit } from './components/Edit';

function App() {
  const firebaseApp = useFirebaseApp();
  const auth = getAuth(firebaseApp);
  
  const {  data: firestoreInstance } = useInitFirestore(async (firebaseApp) => {
    const db = initializeFirestore(firebaseApp, {});
    await enableIndexedDbPersistence(db);
    return db;
  });

 
  

  
 
  

  if (!firestoreInstance) {
    return <p>Loading...</p>
  }

  
 
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <AuthProvider sdk={auth}>
        <div className=" w-screen h-full min-h-screen content-center grid justify-center bg-gray-50 pb-10">
        <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/add" element={<AddWorkForm />} />
            <Route path="/track" element={<StartTracking />} />
            <Route path="/edit" element={<Edit />}/>
            
      </Routes>
     
      </div>
      </AuthProvider>
    </FirestoreProvider>
  );
}


export default App;
