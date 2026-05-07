import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/appStore.js";
import App from "./App.jsx"
import './index.css'
import Login from './component/Login.jsx';
import Feed from "./component/feed.jsx";
import Profile from "./component/Profile.jsx";



const router = createBrowserRouter([{
  path: "/", element: <App />, children: [{ path: "/login", element: <Login /> }, { path: "/feed", element: <Feed /> },{path: "/profile", element: <Profile/>}]
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router = {router}/>
    </Provider>
  </StrictMode>,
)
