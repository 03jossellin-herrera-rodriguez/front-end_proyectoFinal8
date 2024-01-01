import { Button, Box, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'

function Login(props) {
    const navigate = useNavigate();
    const [Cargando, setCargando] = useState (false)
    const [datosLogin, setDatosLogin] = useState( {correo:'', contraseña:''} )

    const hacerPeticion = async () => {
        try {
            const response = await axios.post('https://back-endproyectofinal8-production-a397.up.railway.app/validacion',datosLogin)
            console.log("hacerPeticion", response)
            return response;
        } catch (error) {
            throw error
        }
    }
    window.localStorage.clear();

    const cambiosLogin = (evento) => {
        const {name, value} = evento.target
        setDatosLogin( { ...datosLogin, [name] : value })
    }

    const procesarLogin = async (evento) => {
        evento.preventDefault()
        console.log("datos recuperados en el form: ", datosLogin)
        setCargando(true)
        try {
            const response = await hacerPeticion()
            setCargando(false)
            if (response.data === 'Usuario Correcto') {
                navigate('/Principal');
                window.localStorage.setItem('Usuario',datosLogin.correo);
            } else {
                alert("Credenciales incorrectas, revisa tu correo o contraseña");
            }
        } catch (error) {
            console.log("error", error)
            setCargando(false)
        }
    }

    return (
        <>
            <h1>ForUV - Universidad Veracruzana</h1>
            <p id="p1">"Espacio de comunicacion entre miembros de las facultades"</p>
            <form id="formLogin" onSubmit={ procesarLogin }>
                <h1 id="headerForm">Inicia sesion para continuar</h1>
                <Box m={5}>
                    <TextField label="Correo" variant="standard" fullWidth onChange={cambiosLogin} name="correo" value={datosLogin.correo}></TextField>
                </Box>
                <Box m={5}>
                    <TextField label="Contraseña" variant="standard" fullWidth onChange={cambiosLogin} name="contraseña" value={datosLogin.contraseña}></TextField>
                </Box>
                    <Button id="botonEnviar" variant="contained" type="submit" color="primary"  disabled={Cargando}>Iniciar Sesión</Button>

                <p id="p2">¿Aun no tienes una cuenta? {<Link to="/Registro" className="link_SingUp">Registrarme</Link>}</p>
            </form>
        </>
    )
}

export default Login