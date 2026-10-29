import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import SplashPage from './pages/SplashPage.jsx'
import Navigation from './components/Navigation.jsx'
import NotFound from './pages/NotFound.jsx'
import HomePage from './pages/HomePage.jsx'
import PostPage from './pages/PostPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import LogoutButton from './components/LogoutButton.jsx'
import CreatePostPage from "./pages/CreatePostPage.jsx"
import CreateAlbumPage from "./pages/CreateAlbumPage.jsx"
import {UserProvider} from "./components/UserContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import EditProfilePage from "./pages/EditProfilePage.jsx";


function App() {

  return (
    <UserProvider>
      <LogoutButton/>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/" element={<SplashPage />} />

          <Route path="/home" element={
                      <ProtectedRoute>
                          <HomePage />
                      </ProtectedRoute>
                    }/>

          <Route path="/album" element = {
                      <ProtectedRoute>
                          <PostPage />
                      </ProtectedRoute>
                      }/>

          <Route path="/post" element = {
                      <ProtectedRoute>
                          <PostPage />
                      </ProtectedRoute>
                      }/>

          <Route path="/ablum" element= {
                      <ProtectedRoute>
                          <CreateAlbumPage/>
                      </ProtectedRoute>
                      }/>

          <Route path="/create/post" element= {
                      <ProtectedRoute>
                          <CreatePostPage/>
                      </ProtectedRoute>
                      }/>

          <Route path="/profile" element= {
                      <ProtectedRoute>
                          <ProfilePage/>
                      </ProtectedRoute>
                      }/>

          <Route path="/profile/user" element= {
                      <ProtectedRoute>
                          <EditProfilePage/>
                      </ProtectedRoute>
                      }/>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
