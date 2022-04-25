import './App.css';
import Formulario from './components/formulario'
import Formulario2 from './components/formulario2'
import Formulario3 from './components/formulario3'
import Axios from 'axios'
import { useState } from 'react'

function App() {

  const [page, setPage] = useState(0)

  /* Validacion de datos y submit */
    let [data, setData] = useState({
      escuela: "",
      otraEscuela: "",
      grado: "",
      alumno: "",
      nombre: '',
      apPaterno: "",
      apMaterno: "",
      fechaNacim: "",
      edad: "",
      genero: "",
      curp: "",
      observaciones: "",
      examen: "",
      otroExamen: "",
      fechaAplic: "", // devuelve string: "AAAA-MM-DD"
      horaAplic: "",
      resultado: "",
      perfil: "",
      numTel: "",
      email: ""
    })

    let NSeparado = data.alumno.split(" ");
    console.log(NSeparado);
    if(NSeparado.length < 3){ //se agregó este caso
      data.nombre = data.alumno
    } else if(NSeparado.length === 3){
      data.nombre = NSeparado[0]
      data.apPaterno = NSeparado[1]
      data.apMaterno = NSeparado[2]
    }else if(NSeparado.length === 4){
      data.nombre = NSeparado[0]+' '+NSeparado[1]
      data.apPaterno = NSeparado[2]
      data.apMaterno = NSeparado[3]
    }

    const Submit = (e) => {
      // if(data.email === ""){
      //   alert('llena el campo email')
      //   return
      // } else if ( data.sucursal === ''){
      //   alert('selecciona sucursal')
      //   return
      // } else if ( data.enfermero === ''){
      //   alert('selecciona flebotomista')
      //   return
      // }else if (data.paciente === ""){
      //   alert('Introduce tu nombre completo')
      //   return
      // }else if(data.fechaNacim === ""){
      //   alert('Introduce tu fecha de nacimiento')
      //   return
      // }else if(data.genero === ""){
      //   alert('Introduce tu género')
      //   return
      // }else if(data.pasaporte === ""){
      //   alert('Llena el campo: Número de Pasaporte')
      //   return
      // }else if(data.prueba === ""){
      //   alert('Introduce el tipo de prueba realizada')
      //   return
      // }else if(data.fechaToma === ""){
      //   alert('Especifica la fecha de la toma')
      //   return
      // }else if(data.horaToma === ""){
      //   alert('Especifica la hora de la toma')
      //   return
      // }else if(data.comprobantePago === ""){
      //   alert('Llena el campo: ¿Mostró Comprobante de Pago?')
      //   return
      // }else if(data.monto === ""){
      //   alert('Introduzca el monto pagado')
      //   return
      // }else if (data.resultado === "") {
      //   alert('Ingresa el resultado de tu prueba')
      //   return
      // }else if (data.tipoCliente === "") {
      //   alert('Llena el campo: Tipo de Cliente')
      //   return
      // }else if (data.convenio === "") {
      //   alert('Especifica el convenio')
      //   return
      // }else if (data.numWa === null) {
      //   alert('Especifica el número de WhatsApp')
      //   return
      // }

    Axios.post('http://localhost:3001/register', {...data})
    .then(res => {
      res.redirect('http://localhost:3001/register')
    })

    }

    //CAMBIO DE PAGINA
  function nextPage(){
    setPage(page => page+1)
    if(page === 2) return
  }

  function goBack(){
    setPage(page => page-1)
    if(page === 0) return
  }

  return (
    <div className="App">
      <div class="titulo">
        <h1>Formulario de Registro de Alumnos</h1>
        <p>Esta es una plantilla de formulario</p>
      </div>

        {page === 0 && <Formulario data={data} setData={setData}/>}
        {page === 1 && <Formulario2 data={data} setData={setData}/>}
        {page === 2 && <Formulario3 data={data} setData={setData}/>}

        {page !== 0 && <button className='btn' onClick={() => {goBack(); window.scrollTo(0,0)}}>Atrás</button>}
        {page !== 2 && <button className='btn' onClick={() => {nextPage(); window.scrollTo(0,0)}}>Siguiente</button>}
        {page === 2 && <button className='btn enviar' type="submit" onClick={Submit}>Enviar</button>}
    </div>
  );
}

export default App;
