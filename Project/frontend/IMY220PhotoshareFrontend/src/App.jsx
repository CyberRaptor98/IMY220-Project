import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import './App.css'
import SplashPage from './pages/SplashPage.jsx'
import Navigation from './components/Navigation.jsx'
import NotFound from './pages/NotFound.jsx'
import HomePage from './pages/HomePage.jsx'
import PostPage from './pages/PostPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'


function App() {

  return (
    <>
    <BrowserRouter>
            <Navigation/>
            <Routes>
              <Route path="/" element={<SplashPage />} />
              <Route path="*" element={<NotFound/>}/>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/post" element = {<PostPage/>}/>
              <Route path="/profile" element= {<ProfilePage/>}/>
              <Route path="/profile/:id" element= {<ProfilePage/>}/>
          </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
