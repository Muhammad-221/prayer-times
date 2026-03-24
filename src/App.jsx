import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import ErrorPage from "./pages/ErrorPage"

function App() {
  return(
    <Routes>
      <Route path="*" element={<HomePage/>} />
      <Route path="/" element={<ErrorPage/>} />
    </Routes>
  )
}

export default App
