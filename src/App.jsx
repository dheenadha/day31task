import { BrowserRouter } from 'react-router-dom'
import './App.css'
import MainApp from './components/MainApp'

function App() {

  return (
    <>
      <BrowserRouter>
        <MainApp/>
      </BrowserRouter>
    </>
  )
}

export default App
