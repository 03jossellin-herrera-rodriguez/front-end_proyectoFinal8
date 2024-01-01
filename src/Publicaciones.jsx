import { Button, Box, TextField ,DialogContentText, Divider} from "@mui/material"
import axios from "axios"
import {useEffect,useState } from "react"
import './Publicaciones.css'
import { useNavigate } from 'react-router-dom'

function Publicaciones(props) {
    const navigate = useNavigate();
    const [publicacionesData, setPublicacionesData] = useState([]);
    const [Cargando, setCargando] = useState (false)
    const [datosID, setDatosID] = useState( {idPublicacion:''} )
    const nombreUsuario = window.localStorage.getItem("ID");

    const cambiosID = (evento) => {
        const {name, value} = evento.target
        setDatosID( { ...datosID, [name] : value })
    }

    const regresarPrincipal = () => {
        navigate('/Principal');
    }

    const cerrarSesion = () => {
        navigate('/');
    }

    const obtenerListaMisPublicaciones = async () => {
        try {
            const response = await axios.get("https://back-endproyectofinal8-production-a397.up.railway.app/MisPublicaciones", { params: { idUsuario: nombreUsuario } });
            console.log(response.data)
            console.log(nombreUsuario)
            setPublicacionesData(response.data);
        } catch (error) {
            console.error('Error al obtener el id del usuario:', error);
        }
    };
    obtenerListaMisPublicaciones()

    const peticionEliminar=async()=>{
        try {
            const respuesta= await axios.post("https://back-endproyectofinal8-production-a397.up.railway.app/eliminarPublicacion",{params:{idPublicacion:window.localStorage.getItem("idePublicacion")}});
            return respuesta;
        } catch (error) {
            console.log(error);
        }
    }

    const procesarEliminacion=async()=>{
        setCargando(true);
        try {
            const respuesta=await peticionEliminar();
            console.log("Respuesta de publicacion a eliminar", respuesta.data);
            alert("Publicacion eliminada",respuesta.data);
            setCargando(false);
        } catch (error) {
            console.log(error);
            setCargando(false);
        }
    }

    return (
        <>
            <h1 id="headerFacultad">Facultad de Estadistica e Informatica</h1>
            <nav id="divPublicaciones">
                <h1 id="headerPublicaciones">Mis publicaciones</h1>
                <div id="divBotones">
                <Box id="box1" m={0}>
                <Button id="regresarMenu" variant="contained" type="submit" color="warning" onClick={regresarPrincipal}>Regresar al Menu</Button>
                </Box>
                <Box id="box2" m={0}>
                <Button id="cerrarSesion" variant="contained" type="submit" color="warning" onClick={cerrarSesion}>Cerrar sesion</Button>
                </Box>
                </div>
            </nav>
            <div id="divLeyenda">
                <p id="leyendaPublicacion">Visualiza o elimina una publicacion.</p>
            </div>
            <div id="listaEliminar">
            <div id="divLista2">
                {publicacionesData.map((elemento) => (
                            <div id="divsPublicaciones2" key={elemento.contenido} className='publicaciones'>
                        <div className='informacionPublicacion'>
                                    <p id="parrafoNum">Identificador de Publicacion({elemento.idPublicacion})</p>
                                    <DialogContentText id="dialog" key={elemento.contenido} variant="contained" name='contenidoText'>{elemento.contenido}</DialogContentText>
                                    <p id="parrafoFecha"className='parrafoFecha'>{elemento.fechaPub}</p>
                                    <Divider id="division" color="primary"/>
                        </div>
                        </div>
                ))}
                </div>
                <Box m={5}>
                    <TextField label="ID de publicacion" variant="standard" fullWidth onChange={cambiosID} name="idPublicacion" ></TextField>
                </Box>
                <Box m={5}>
                <Button id="botonEliminar" variant="contained" color="primary" disabled={Cargando} onClick={procesarEliminacion}>Eliminar publicacion</Button>
                </Box>
            </div>
        </>
    )
}

export default Publicaciones