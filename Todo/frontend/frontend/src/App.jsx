
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min';

import Signup from './Componant/Signup'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Signin from './Componant/Signin';
import Todo from './Componant/Todo';

function App() {
  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/",
      element: <Signin />
    },
    {
      path: "/todo",
      element: <Todo />

    }
  ]);


  return (
    <>
      <RouterProvider router={router} />

    </>

  )

}

export default App
