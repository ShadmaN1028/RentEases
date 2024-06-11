import React from 'react'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import SignIn from './signin';
import SignUp from './signup';
import PostingApartment from './postingApartment'
import EditPostingApartment from './editPostingApartment';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/posting_apartment' element={<PostingApartment/>}/>
        <Route path='/edit_post' element={<EditPostingApartment/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
