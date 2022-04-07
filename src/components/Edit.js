import { format, intervalToDuration, lightFormat } from "date-fns";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData, useSigninCheck } from "reactfire";


export const Edit = () => {
     const firestore = useFirestore();
     const { data: signinResult, status: signInStatus } = useSigninCheck();
     const { user } = signinResult;
    let [searchParams] = useSearchParams();
    const navigate = useNavigate()
    let document = searchParams.get("id")

    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [date, setDate] = useState("")
    const [employer, setEmployer] = useState("")

    const documentRef =  doc(firestore, "users", user.email, "worklist", document);
    const { status, data } = useFirestoreDocData(documentRef);
    
    useEffect(() => {
        console.log(data)
        if (data) {
            setEmployer(data.employer)
            setDate(lightFormat(new Date(data.date), 'yyyy-MM-dd'))
            setEndTime(data.endTime)
            setStartTime(data.startTime)
        }
    }, [data])
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const timeworked = intervalToDuration({ start: new Date(`${format(new Date(date), "P")}  ${endTime}`), end: new Date(`${format(new Date(date), "P")}  ${startTime}`) })
    
        const newWorkSession = {
          date: date,
          startTime: startTime,
          endTime: endTime,
          timeworked,
          employer
    
        };
        setDoc(documentRef, newWorkSession, { merge: true });
        console.log(newWorkSession)
        navigate("/");
      };
    
    

    
  if (signInStatus === 'loading') {
    return <p>Loading...</p>}
  
  
  if (!user) {
    navigate("/")
    } 
    
    if (status === 'loading') {
        return <p>Loading...</p>}
    
    return (
        <div className="grid rounded-md relative shadow-lg w-64 h-32 content-center justify-center p-20 bg-emerald-50 text-emerald-700">
            <form onSubmit={handleSubmit}>
                <Link to={`/`} className="absolute top-2 right-2 text-sm">X</Link>
                <label htmlFor="employer">Arbeidsgiver:</label>
        <select id="employer" name="employer" value={employer} onChange={(e) => { setEmployer(e.target.value) }}>
  <option value="Troens Bevis">Troens Bevis</option>
  <option value="Sarons Dal AS">Sarons Dal AS</option>
  
</select>
        
            <input type="date" value={date} onChange={(e) => setDate(e.target.value) }/>
       
       <div className="flex ">
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} /> <p className="px-1">  -  </p> <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
                <div className="w-full grid grid-cols-2 gap-1 content-end pt-2">
                    <button onClick={(event) => { event.preventDefault(); deleteDoc(documentRef); navigate("/"); } }  className=" bg-red-500 text-center mt-1  p-1 text-red-50 rounded-md self-center">Slett</button>
                <button type="submit" className="bg-emerald-700 text-center mt-1  p-1 text-emerald-50 rounded-md self-center">Bekreft</button>
                </div>
            </form>
        </div>

)


}