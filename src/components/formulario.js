import img from '../img/img.jpg'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Formulario({data, setData}) {
  const[show, setShow] = useState({
    connection1: true,
    connection2: true,
    uno: false,
    dos: false
  })

  const [escuela, setEscuela] = useState({
    escuelas: []
  })

// let get = true;
if(show.connection1){
  axios.get('http://localhost:3001/schools')
  .then(res => {
      setEscuela({escuelas: res.data})
      // console.log(service.servicios);
      setTimeout(() => {
        show.connection1 = false
      }, 500);
  })
}

  const [grado, setGrado] = useState({
    grados: []
  })

  // if(show.dos){
  //   show.connection2 = true
  // }
  if(show.connection2) {
    axios.get('http://localhost:3001/grados')
    .then(res => {
        setGrado({grados: res.data})
        // console.log(service.servicios);
        setTimeout(() => {
          show.connection2 = false
        }, 500);
    })
  }


  return (
    <div>
        <div className="img">
          <img className='imgPruebas' src={img} alt="Pruebas"></img>
        </div>
        <form className='frmReg'>
            {/* <p className='par'><span>Introduzca Email</span><span className='obliga'> * </span></p><br/>
                <input className='email' type="email" name="email" value={data.email} onChange={(e)=>{
                setData({...data, email: e.target.value})
            }} placeholder="Tu respuesta" required></input> */}

        {/* <p class="obliga">Dé click en Continuar hasta terminar esta sección</p>
        <button onClick={()=>setShow({...show, uno: true})} className='btncont' >Continuar</button> */}

            {/* <div> */}
              {/* <div className='separador'></div> ESTO ES UN DIV SEPARADOR */}
              <p className='par'><span>Escuela</span><span className='obliga'> * </span></p>
                  <select className='select' name="escuela" value={data.escuela} onChange={(e)=>{
                  setData({...data, escuela: e.target.value})
              }} required>
                <option value="">Elige</option>
                {escuela.escuelas.map(elemento => (
                    <option key={elemento.IdEscuela} value={elemento.IdEscuela}>{elemento.NombreE}</option>
                ))}
              </select>

              <p class="obliga">Dé click en Continuar hasta terminar esta sección</p>
              {/* <button onClick={()=>setShow({...show, uno: false})} className='btncont' >Regresar</button> */}
              <button onClick={()=>{data.escuela === "3" ? setShow({...show, uno: true}) : setShow({...show, dos: true})}} className='btncont' >Continuar</button>

              {show.uno?<div>
                <div className='separador'></div> {/* ESTO ES UN DIV SEPARADOR */}
                <p className='par'><span>Indique Otra Escuela</span><span className='obliga'> * </span></p>
                <input className='inpText' type="text" name="otraEscuela" value={data.otraEscuela} onChange={(e)=>{
                    setData({...data, otraEscuela: e.target.value})
                }} placeholder="Otro" required></input>

              <p class="obliga">Dé click en Continuar hasta terminar esta sección</p>
              <button onClick={()=>setShow({...show, uno: false})} className='btncont' >Regresar</button>
              <button onClick={()=>setShow({...show, dos: true})} className='btncont' >Continuar</button>
            </div>:null}

            {show.dos?<div>
            <div className='separador'></div> {/* ESTO ES UN DIV SEPARADOR */}
            <p className='par'><span>Grado a cursar</span><span className='obliga'> * </span></p>
            <select className='select'  name="grado" value={data.grado} onChange={(e) => {
                setData({...data, grado: e.target.value})
            }} required>
                <option value="">Elige</option>
                {grado.grados.map(elemento => (
                    <option key={elemento.IdGrado} value={elemento.IdGrado}>{elemento.NombreG}</option>
                ))}

            </select><br/>
          </div>:null}
          {/* </div>:null} */}
        </form>
    </div>
  )
}
