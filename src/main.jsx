import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './Login.jsx'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Principal from './Principal.jsx'
import CrearPublicacion from './CrearPublicacion.jsx'
import Publicaciones from './Publicaciones.jsx'
import Registro from './Registro.jsx'
import MiPerfil from './MiPerfil.jsx'

  const router = createHashRouter([
    {
      path: "/",
      element:<Login/>
    },
    {
      path: "/Registro",
      element: <Registro/>
    },
    {
      path: "/Principal",
      element: <Principal/>
    },
    {
      path: "/CrearPublicacion",
      element:<CrearPublicacion/>
    },
    {
      path: "/Publicaciones",
      element:<Publicaciones/>
    },
    {
      path: "/MiPerfil",
      element:<MiPerfil/>
    }
  ])

  ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
