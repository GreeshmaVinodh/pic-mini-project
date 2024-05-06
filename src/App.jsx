import {Route, Navigate, Routes } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import Chat from './pages/ChatPage/Chat';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import Test from "./components/Sidebar/Test";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/Profile/ProfilePage";
import { useContext } from "react";
import {AuthContext} from "./context/AuthContext";


function App() {
  const [authUser] = useAuthState(auth);
  const { currentUser }  = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };
  return (
    <PageLayout>
      <Routes>
      <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
			<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
      <Route path='/:username' element={<ProfilePage/>} />
      <Route path='/test' element={<Test/>} />
      <Route path='/chat' element={
              <ProtectedRoute>
                <Chat/>
              </ProtectedRoute>
            }
          />
      </Routes>
    </PageLayout>
  );
}

export default App;

