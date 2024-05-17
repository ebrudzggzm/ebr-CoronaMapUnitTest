import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import Main from './pages/Main'
import Detail from './pages/Detail'

const App = () => {
  
  return (
    <BrowserRouter>
    <div className='flex flex-col min-h-screen'>
    <Header/>
    <Routes>
      <Route path={'/'} element={<Main/>}/>
      <Route path={'/detail/'} element={<Detail/>}/>

    </Routes>
    </div>
    
    </BrowserRouter>
  )
}

export default App
