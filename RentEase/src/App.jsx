import React from 'react'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import SignIn from './signin';
import SignUp from './signup';
import PostingApartment from './postingApartment'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/posting_apartment' element={<PostingApartment/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
