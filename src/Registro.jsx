import { useState } from 'react';
import './Registro.css';
import { TextField,Button,Box } from '@mui/material';
import axios from 'axios';
import { Link} from 'react-router-dom'

function Registro() {
    const[cargando, setCargando]=useState(false);
    const [datosFormulario, setDatosFormulario]=useState({idUsuario:'',correo:'',contraseña:''});

    const hacerPeticion=async()=>{
        try{
            const respuesta= await axios.post("https://back-endproyectofinal8-production-a397.up.railway.app/registro",datosFormulario);
            console.log(respuesta.data);
            return respuesta.data;
        }catch(error){
            throw error;
        }
    }

    const [mostrarPopup, setMostrarPopup]=useState(false);
    const abrirPopup=()=>{
        setMostrarPopup(true);
    }
    
    const[mostrarErrorPopup, setMostrarErrorPopup]=useState(false);
    const abrirPopUpError=()=>{
        setMostrarErrorPopup(true);
    }

    const procesarFormulario= async (evento)=>{
        evento.preventDefault();
        console.log("Datos recuperados del formulario: ", datosFormulario);
        setCargando(true);
        try{
            const respuesta=await hacerPeticion();
            setCargando(false);
            if(respuesta==='Usuario agregado'){
                abrirPopup();
            }else{
                console.log("Error al agregar el usuario");
                alert("Error al registrarse. Intentalo de nuevo porfavor :)");
            }
        }catch(error){
            setCargando(false);
        }
    }

    const cambiosFormulario=(evento)=>{
        const {name,value} =evento.target;
        setDatosFormulario({
            ...datosFormulario,  
            [name]: value 
        })
    }

    return (
    <>
    <div>
        <div>

        </div>
        <div>
             <h1 id="header">Registrate</h1>
                <p id="headerRegistro">Escribe tu correo nombre de usuario,correo electronico y contraseña.</p>
            <form id="entradas" action="" onSubmit={procesarFormulario}>
                <Box m={5}>
                <TextField type="name" variant="standard" fullWidth label="Nombre de Usuario" name='idUsuario' onChange={cambiosFormulario}></TextField>        
                </Box>
                <Box m={5}>
                <TextField type="email" variant="standard" fullWidth label="Correo Electrónico" name='correo' onChange={cambiosFormulario}></TextField>
                </Box>
                <Box m={5}>
                <TextField type="password" variant="standard" fullWidth name="contraseña" id="contraseña" required label="Contraseña" className='textFieldDatos' onChange={cambiosFormulario}></TextField>
                </Box>
                <Button id="botonEnviar" variant="contained" type="submit" color="primary"  disabled={cargando}>Registrarse</Button>
                <p id="parrafo">¿Ya tienes una cuenta? <Link to="/" className="link_SingUp">Iniciar Sesión</Link></p>
            </form> 
        </div>

    </div>
   
        
    </>

    )
}
export default Registro;