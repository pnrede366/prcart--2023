import { useEffect } from "react";
import { getCookie } from "./Helper/utility";
import { Router } from "./Router/Router";
import "./style/style.scss"
import { useDispatch } from "react-redux";
import { addToken } from "./Redux/Slice/auth";

function App() {
  const dispatch = useDispatch()
  const token = getCookie('token')
  useEffect(() => {
    dispatch(addToken({ token: token }))
  }, [token])


  return (
    <>
      <Router />
    </>
  );
}

export default App;
