import { useEffect, useState } from "react";
import { doc, collection, setDoc } from 'firebase/firestore';
import { useSigninCheck } from 'reactfire';
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from 'reactfire';
import format from "date-fns/format";
import { differenceInMinutes, differenceInSeconds, lightFormat, setHours, add, intervalToDuration } from "date-fns";

const TimeTracker = ({user}) => {
    // eslint-disable-next-line no-unused-vars
    const firestore = useFirestore();
  
   
      const userRef = doc(firestore, "users", user.email);
    let navigate = useNavigate();
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [trackingActive, setTrackingActive] = useState(true)
    
    
      const [totalTime, setTotalTime] = useState(0)
      const stratTimeFirebase = useFirestoreDocData(userRef)
  
    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (trackingActive) {
                setEndTime(add(endTime, { seconds: 1 }))
          
                setStartTime(stratTimeFirebase.data.trackingStart.toDate())
                setTotalTime(intervalToDuration({ start: new Date(startTime), end: new Date(endTime) }))
            }
            
          
  
          }, 1000)
          return ()=> {
              clearInterval(myInterval);
            };
      }, );
  
      
        
        
     
    
    
  
  
  
  
   
    const handleClick = () => {
        setStartTime(new Date());
        setEndTime(new Date())
      
  
      
      setDoc(userRef, {trackingStart: new Date()},  { merge: true });
      
    }; 
  
  
  
  
  
    
  
    
      
      

        
    
      
      
      
      
      
  
  
  
      return (
        
      <div className='w-72 h-96 self-center m-auto grid shadow-xl rounded-lg bg-white content-center justify-center relative'>
      <Link to="/" className='font-bold text-lg absolute top-3 left-3'> X </Link>
        
        
              <button onClick={() => { handleClick() }}>Start tracking</button>
              <button onClick={() => {setTrackingActive(false)}}>Stop tracking</button>
            <p>{totalTime.hours} timer {totalTime.minutes} minutter {totalTime.seconds} sekunder</p>
            
  
            
          
  
  
  
        
  
  
  
  
  
      </div>
  
    );
  }


export const StartTracking = () => {
    let navigate = useNavigate();
  
    const { data: signinResult, status: signInStatus } = useSigninCheck();

    if (signInStatus === 'loading') {
        return <p>Loading...</p>
    }
    
    if (signInStatus !== "loading" && !signinResult) {
        navigate("/")
    }
    const { user } = signinResult;

    return (
        <TimeTracker user={user }/>
    )

}
