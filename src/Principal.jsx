import { Button, Box, TextField, DialogContentText, Divider } from "@mui/material"
import axios from "axios"
import {useEffect,useState } from "react"
import './Principal.css'
import { useNavigate } from 'react-router-dom'
function Principal(props) {
    const navigate = useNavigate();
    const [publicacionesData, setPublicacionesData] = useState([]);
    const [Cargando, setCargando] = useState (false)
    const correoUsuario = window.localStorage.getItem('Usuario');

    const datosUsuario=async()=>{
        try {
            const respuesta=await axios.get("https://back-endproyectofinal8-production-a397.up.railway.app/datosUsuario",{params:{correo: correoUsuario}});
            return respuesta.data;
        } catch (error) {
        console.log(error);
        }
    }

    const UsuarioData=async()=>{
            try {
                const respuesta=await datosUsuario();
                const nombreUsuarioSesion=respuesta.idUsuario;
                const contraseñaUsuarioSesion=respuesta.contraseña;
                window.localStorage.setItem("ID",nombreUsuarioSesion);
                window.localStorage.setItem("Contraseña",contraseñaUsuarioSesion);
            } catch (error) {
                console.log("holaa");
                console.log(error);
            }
    }
    UsuarioData();

    const cerrarSesion = () => {
        navigate('/');
    }

    const miPerfil = () => {
        navigate('/MiPerfil');
    }

    const publicaciones = () => {
        navigate('/Publicaciones')
    }

    const crearPublicacion = () => {
        navigate('/CrearPublicacion');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://back-endproyectofinal8-production-a397.up.railway.app/Publicaciones");
                console.log("Publicaciones data: ",res.data);
                setPublicacionesData(res.data);
            } catch (error) {
                throw error;
            }
        };
        fetchData();
    }, []);
    
    const usuarioSesion = window.localStorage.getItem('ID');

    return (

        <>
            <div>
                <h1 id="headerFacultad">Facultad de Estadistica e Informatica</h1>
                <Divider/>
                <div id="divPublicaciones">
                    <h1 id="headerPublicaciones">Publicaciones</h1>
                    <Box id="boxCerrar" m={0}>
                        <Button id="cerrarSesion" variant="contained" type="submit" color="warning" onClick={cerrarSesion}>Cerrar sesion</Button>
                    </Box>
                </div>
                <Divider/>
                <div id="divBotones">
                <div id="divLista">
                    {publicacionesData.map((elemento) => (
                        <div id="divsPublicaciones" key={elemento.contenido} className='publicaciones'>
                        <div className='informacioPublicacion'>
                                <p id="parrafoId" className='parrafoId'>{elemento.idUsuario}</p>
                                <Divider/>
                                <DialogContentText id="dialog" key={elemento.contenido} variant="contained" className='contenidoText'>{elemento.contenido}</DialogContentText>
                                <Divider/>
                                <p id="parrafoFecha"className='parrafoFecha'>{elemento.fechaPub}</p>
                                <Divider fullWidth color="primary"/>
                        </div>
                        </div>
                    ))}
                </div>
                <div id="divMenu">
                <h1 id="bienvenidoUsuario">¡Hola {usuarioSesion}! </h1>
                    <Box m={5}>
                        <Button id="botonMiPerfil" variant="contained" fullWidth type="submit" color="primary"  disabled={Cargando} onClick={miPerfil}>Mi perfil</Button>
                    </Box>
                    <Box m={5}>
                        <Button id="botonMisPublicaciones" variant="contained" type="submit" color="primary"  disabled={Cargando} onClick={publicaciones}>Mis publicaciones</Button>
                    </Box>
                    <Box m={5}>
                        <Button id="botonNuevaPublicacion" variant="contained" type="submit" color="primary"  disabled={Cargando} onClick={crearPublicacion}>Nueva publicacion</Button>
                    </Box>
                </div>
                </div>
            </div>
        </>
    )
}

export default Principal