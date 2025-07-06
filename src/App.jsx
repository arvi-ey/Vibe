import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; // ✅ use 'react-router-dom'
import Layout from './Components/Layout/Layout';
import SignUp from './Components/Auth/SignUp';
import Signin from './Components/Auth/Signin';
import Home from './Components/Home/Home';
import Friendrequest from './Components/FriendRequest/Friendrequest';
import Error from './Components/Error/Error';
import UserProfile from './Components/Profile/UserProfile';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ProtectedRoute><Home /></ProtectedRoute>
        },
        {
          path: "friends",
          element: <ProtectedRoute><Friendrequest /></ProtectedRoute>
        },
        {
          path: "profile/:userId",
          element: <ProtectedRoute><UserProfile /></ProtectedRoute>
        },
        {
          path: "*",
          element: <Error />
        }
      ]
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
