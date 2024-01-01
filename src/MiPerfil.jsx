import { Button, Box,DialogContentText, Divider} from "@mui/material"
import axios from "axios"
import {useEffect,useState } from "react"
import './MiPerfil.css'
import { useNavigate } from 'react-router-dom'

function MiPerfil(props) {
    const navigate = useNavigate();
    const [Cargando, setCargando] = useState (false)

    //const [miPerfilData, setMiPerfilData] = useState({idUsuario:window.localStorage.getItem("ID"),correo:window.localStorage.getItem("Usuario"),contraseña:window.localStorage.getItem("Contraseña")});

    const regresarPrincipal = () => {
        navigate('/Principal');
    }

    const cerrarSesion = () => {
        navigate('/');
    }

    return (
        <>
            <h1 id="headerFacultad">Facultad de Estadistica e Informatica</h1>
            <nav id="divMiPerfil">
                <h1 id="headerMiPerfil">Mi Perfil</h1>
                <div id="divBotones">
                <Box m={1}>
                <Button id="regresarMenu" variant="contained" type="submit" color="warning" onClick={regresarPrincipal}>Regresar al Menu</Button>
                </Box>
                <Box m={1}>
                <Button id="cerrarSesion" variant="contained" type="submit" color="warning" onClick={cerrarSesion}>Cerrar sesion</Button>
                </Box>
                </div>
            </nav>
            <div id="divLeyenda">
                <p id="leyendaPublicacion">Visualiza tu datos como Usuario, Correo y Contraseña.</p>
            </div>
            <div id="divLista">
                <leyend id="leyendas">Nombre de Usuario</leyend>
                <DialogContentText id="dialogUsuario" variant="contained" className='contenidoText'>{window.localStorage.getItem("ID")}</DialogContentText>
                <Divider color="primary"/>
                <leyend id="leyendas">Correo</leyend>
                <DialogContentText id="dialogCorreo" variant="contained" className='contenidoText'>{window.localStorage.getItem("Usuario")}</DialogContentText>
                <Divider color="primary"/>
                <leyend id="leyendas">Contraseña</leyend>
                <DialogContentText id="dialogContraseña" variant="contained" className='contenidoText'>{window.localStorage.getItem("Contraseña")}</DialogContentText>
                <Divider color="primary"/>
            </div>
        </>
    )
}

export default MiPerfil