import {Route, Navigate, Routes } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import ChatPage from './pages/ChatPage/ChatPage';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/Profile/ProfilePage";
import Payment from "./pages/PaymentPage/Payment";



function App() {
  const [authUser] = useAuthState(auth);
  return (
    <PageLayout>
      <Routes>
      <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
			<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
      <Route path='/:username' element={<ProfilePage/>} />
      <Route path='/chat' element={<ChatPage/>} />
      <Route path='/payment' element={<Payment/>}/>
      </Routes>
    </PageLayout>
  );
}

export default App;

