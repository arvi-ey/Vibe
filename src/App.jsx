import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Layout from './Components/Layout/Layout';
import SignUp from './Components/Auth/SignUp';
import Signin from './Components/Auth/Signin';
import Home from './Components/Home/Home';
import Friendrequest from './Components/FriendRequest/Friendrequest';
import Error from './Components/Error/Error';
function App() {


  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "signin", element: <Signin /> },
        { path: "signup", element: <SignUp /> },
        { path: "friends", element: <Friendrequest /> },
        { path: "*", element: <Error /> }
      ]
    },
  ]);




  return (
    <RouterProvider router={router} />
  )
}

export default App
