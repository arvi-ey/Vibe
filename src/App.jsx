import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; // ✅ use 'react-router-dom'
import SignUp from './Components/Auth/SignUp';
import Signin from './Components/Auth/Signin';
import Home from './Components/Home/Home';
import Error from './Components/Error/Error';
import UserProfile from './Components/Profile/UserProfile';
import ProtectedRoute from './Components/ProtectedRoute';
import About from './Components/Profile/About';
import Friends from './Components/Profile/Friends';
import Photos from './Components/Profile/Photos';
import HomeFriends from './Components/Friends/HomeFriends';
import AllFriends from './Components/Friends/AllFriends';
import FriendRequests from './Components/Friends/FriendRequests';
import SentFriendRequests from './Components/Friends/SentFriendRequests';
import Birthdays from './Components/Friends/Birthdays';
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "friends/",
          element: <HomeFriends />,
          children: [
            { index: true, element: <AllFriends /> },
            { path: "request", element: <FriendRequests /> },
            { path: "sent", element: <SentFriendRequests /> },
            { path: "birthday", element: <Birthdays /> }
          ]
        },
        {
          path: "profile/:userId/",
          element: <UserProfile />,
          children: [
            { index: true, element: <About /> },
            { path: "photos", element: <Photos /> },
            { path: "friends", element: <Friends /> }
          ]
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
