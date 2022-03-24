import { useEffect, useState } from "react";
import { doc, collection, setDoc } from 'firebase/firestore';
import { useSigninCheck } from 'reactfire';
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from 'reactfire';
import format from "date-fns/format";
import { differenceInMinutes, lightFormat } from "date-fns";

export const AddWorkForm = () => {
  // eslint-disable-next-line no-unused-vars
  
  const { data: signinResult, status: signInStatus } = useSigninCheck();
  const { user } = signinResult;
  let navigate = useNavigate();
  const [startTime, setStartTime] = useState("08:00")
  const [endTime, setEndTime] = useState(lightFormat(new Date(), 'HH:mm'))
  const [date, setDate] = useState(lightFormat(new Date(), 'yyyy-MM-dd'))


 


  const firestore = useFirestore();
  const userRef = doc(firestore, "users", user.email);
  




  const worklistCollection = collection(firestore, "users", user.email, "worklist");
  const handleSubmit = (event) => {
    event.preventDefault();
    const timeworked = differenceInMinutes(new Date(`${format(new Date(date), "P")}  ${endTime}`), new Date(`${format(new Date(date), "P")}  ${startTime}`))

    const newWorkSession = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      minutesworked: timeworked,
      userId: user.uid,
      user: user.email
    };
    setDoc(doc(worklistCollection, `${date} ${startTime}-${endTime}`), newWorkSession);
    console.log(newWorkSession)
    navigate("/");
  };





  if (signInStatus === 'loading') {
    return <p>Loading...</p>}
  
  
  if (!user) {
    navigate("/")
  } 



  return (
    <div className='w-72 h-96 self-center m-auto grid shadow-xl rounded-lg bg-white content-center justify-center relative'>
    <Link to="/" className='font-bold text-lg absolute top-3 left-3'> X </Link>
      <form onSubmit={handleSubmit} className="w-full pt-10 grid content-center justify-center">
      <label>
          Dato
          <br/>
          <input type="date" value={date} onChange={(e) => { setDate(e.target.value); console.log(e.target.value) }} />
        </label>
        <label>
          Startet
          <br/>
          <input type="time" value={startTime} onChange={(e) => { setStartTime(e.target.value)}} />
        </label>
        <label>
          Sluttet
          <br/>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value) }/>
        </label>
          

          <p className="text-sm text-right">{user.displayName}</p>
        <button type="submit" className="bg-black text-white p-2 w-20 justify-self-center rounded-2xl text-sm font-medium">Submit</button>



      </form>





    </div>

  );
};
