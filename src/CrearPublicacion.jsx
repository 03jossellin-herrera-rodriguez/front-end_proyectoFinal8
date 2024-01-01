import { Button, Box, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import './CrearPublicacion.css'
import { useNavigate } from 'react-router-dom'

function CrearPublicacion(props) {
    const fechaActual = new Date();
    const mes = fechaActual.getMonth()+1;
    const nombreUsuario = window.localStorage.getItem('ID');

    const navigate = useNavigate();
    const [Cargando, setCargando] = useState (false)
    const [datosPublicacion, setDatosPublicacion] = useState( {fechaPub:fechaActual.getDate()+"/"+mes+"/"+fechaActual.getFullYear(),contenido:'',idUsuario:nombreUsuario} )
    
    const hacerPeticion=async()=>{
        try{
            const respuesta= await axios.post("https://back-endproyectofinal8-production-a397.up.railway.app/realizarPublicacion",datosPublicacion);
            console.log(respuesta.data);
            return respuesta.data;
        }catch(error){
            throw error;
        }
    }

    const procesarFormulario= async (evento)=>{
        evento.preventDefault();
        console.log("Datos recuperados del evento: ", datosPublicacion);
        setCargando(true);
        try{
            const respuesta=await hacerPeticion();
            setCargando(false);
            if(respuesta==='Publicacion realizada'){
                alert("Se realizo la publicacion :)")
                abrirPopup();
            }else{
                alert("La publicacion no se realizo :(");
                console.log("La publicacion no se realizo");
                abrirPopUpError();
            }
        }catch(error){
            setCargando(false);
        }
    }

    const cambiosFormulario=(evento)=>{
        const {name,value} =evento.target;
        setDatosPublicacion({
            ...datosPublicacion,  
            [name]: value 
        })
    }

    const regresarPrincipal = () => {
        navigate('/Principal');
    }

    const cerrarSesion = () => {
        navigate('/');
    }

    return (
        <>
            <h1 id="headerFacultad">Facultad de Estadistica e Informatica</h1>
            <nav id="divCrearPublicacion">
                <h1 id="headerCrearPublicacion">Crear Publicacion</h1>
                <div id="divBotones">
                <Box m={1} >
                <Button id="regresarMenu" variant="contained" type="submit" color="warning" onClick={regresarPrincipal}>Regresar al Menu</Button>
                </Box>
                <Box m={1} >
                <Button id="cerrarSesion" variant="contained" type="submit" color="warning" onClick={cerrarSesion}>Cerrar sesion</Button>
                </Box>
                </div>
            </nav>
            <div id="divLeyenda">
                <p id="leyendaPublicacion">Crear una nueva publicacion.</p>
            </div>
            <div id="texto">
                <textarea type="text" variant="filled" id="textPublicacion" name="contenido" onChange={cambiosFormulario}></textarea>
            </div>
            <div id="texto2">
            <Button id="crearPublicacion" variant="contained" type="submit" color="primary" disabled={Cargando} onClick={procesarFormulario}>Subir publicacion</Button>
            </div>
        </>
    )
}

export default CrearPublicacion
