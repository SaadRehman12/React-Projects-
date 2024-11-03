import { useEffect, useState } from "react"
import Routing from "./routing/Routing"
import { useDispatch } from "react-redux"
import { currentUser } from "./store/slices/authSlice"
import Loading from "./components/loading/Loading"


function App() {
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(currentUser(setLoading))
  }, [])
  

  return (

    <>
   {loading ? <Loading/>:  <Routing />}
    </>
  )
}

export default App
