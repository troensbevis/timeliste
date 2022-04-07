import { useEffect, useState } from "react";
import { doc, setDoc } from 'firebase/firestore';
import { useSigninCheck } from 'reactfire';
import { useNavigate, Link } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { add, intervalToDuration, formatDuration} from "date-fns";
import { nb } from "date-fns/locale";
import { BiStopwatch, BiStopCircle } from "react-icons/bi";

const TimeTracker = ({user}) => {
    // eslint-disable-next-line no-unused-vars
    const firestore = useFirestore();
  
   
      const userRef = doc(firestore, "users", user.email);
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
      setTrackingActive(true)
      
  
      
      setDoc(userRef, {trackingStart: new Date()},  { merge: true });
      
    }; 
  
  
  return (
        
      <div className='w-72 h-96 self-center m-auto grid shadow-xl rounded-lg bg-white content-center justify-center relative'>
      <Link to="/" className='font-bold text-lg absolute top-3 left-3'> X </Link>
        
        
          
          <div className="pt-10">
          <p className="text-center font-semibold text-2xl text-emerald-600"> {formatDuration(totalTime, { locale: nb, format: ['hours'] })}</p>
          <p className="text-center font-semibold text-2xl text-emerald-600"> {formatDuration(totalTime, { locale: nb, format: ['minutes'] })}</p>
          <p className="text-center font-semibold text-2xl text-emerald-500 "> {formatDuration(totalTime, { locale: nb, format: ['seconds'] })}</p>
          </div>  
          <div className="pt-5 grid w-full content-center justify-center">
          {!trackingActive ? <button onClick={() => { handleClick() }} className="self-center"><BiStopwatch  className="text-emerald-700 text-center self-center text-6xl"/></button> :
            <button onClick={() => { setTrackingActive(false) }} className="self-center"><BiStopCircle  className="text-emerald-700 text-center self-center text-6xl"/></button>}
          </div>
            
          
  
  
  
        
  
  
  
  
  
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
