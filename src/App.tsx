import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Homepage } from "./Pages/Homepage"
import { Signin } from "./Pages/Signin"
import { Signup } from "./Pages/Signup"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/dashboard" element={<Homepage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
