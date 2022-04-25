import React from 'react'
import axios from 'axios'
import { useState } from 'react';

export default function Formulario2({data, setData}) {

  const[show, setShow] = useState({
    connection: true,
    uno: false,
    dos: false,
    tres: false,
    cuatro: false
  })

  const [genero, setGenero] = useState({
    generos: []
  })

  if(show.connection){
    axios.get('http://localhost:3001/genero')
    .then(res => {
      setGenero({generos: res.data})
      setTimeout(() => {
        show.connection = false
      }, 500);
    })
  }


    const fecha = new Date();
    const fechaActual = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
    const fActSep = fechaActual.split('-');
    const falumno = data.fechaNacim.split('-')

    const diferencia = [fActSep[0] - falumno[0], fActSep[1] - falumno[1], fActSep[2] - falumno[2]]

    if(diferencia[1]<0 ){
      diferencia[0]--
    }else if (diferencia[1]===0){
      if(diferencia[2]<0){
        diferencia[0]--
      }
    }

    data.edad = diferencia[0]


  return (
    <div>
      <form className='frmReg'>
            <div>
                <div className='seccion'>
                    <p className='psec'>Datos del Alumno</p>
                </div>
                <p className='par'><span>Nombre Completo del Alumno</span><span class='obliga'> * </span></p><br />
                <p className='aclaracion'>Escriba el nombre completo del alumno conforme al documento oficial.</p>
                <input className='inpText' type="text" name="alumno" value={data.alumno} onChange={(e) => {
                  setData({...data, alumno: e.target.value.toUpperCase()})
                }} required placeholder="Tu respuesta"></input><br />

                <p class="obliga">Dé click en Continuar hasta terminar esta sección</p>
                <button onClick={()=>{setShow({...show, uno: true})}} className='btncont' >Continuar</button>
                
                {show.uno?<div>
                <div className='separador'></div> {/* ESTO ES UN DIV SEPARADOR */}
                <p className='par'><span>Fecha de Nacimiento</span><span className='obliga'> * </span></p><br />
                <p className='aclaracion'>Escriba DD/MM/AAAA Ej. 24/01/2022</p>
                <input className='inpDate' type="date" name="fechaNacim" value={data.fechaNacim} onChange={(e) => {
                  setData({...data, fechaNacim: e.target.value})
                }} placeholder="Tu Respuesta" required></input><br />
                
                <div className='separador'></div> {/* ESTO ES UN DIV SEPARADOR */}

                <p className='par'><span>Edad</span><span className='obliga'> * </span></p>  {/*NO TIENE <br/> */}
                <input className='inpNum' type="number" name="edad" value={data.edad} onChange={(e) => {
                  setData({...data, edad: e.target.value})
                }} required placeholder=""></input><br />

                <p class="obliga">Dé click en Continuar hasta terminar esta sección</p>
                <button onClick={()=>setShow({...show, uno: false})} className='btncont' >Regresar</button>
                <button onClick={()=>setShow({...show, dos: true})} className='btncont' >Continuar</button>
                
                {show.dos?<div className="genero">
                <div className='separador'></div> {/* ESTO ES UN DIV SEPARADOR */}
                    <p className='par'><span>Género</span><span className='obliga'> * </span></p>
                    <select className='select' name="genero" value={data.genero} onChange={(e) => {
                  setData({...data, genero: e.target.value})
                }} required>
                        <option value="">Elige</option>
                        {genero.generos.map(elemento => (
                          <option key={elemento.IdGenero} value={elemento.IdGenero}>{elemento.DescripcionGenero}</option>
                        ))}
                    </select><br/>                

                  <p class="obliga">Dé click en Continuar hasta terminar esta sección</p>
                <button onClick={()=>setShow({...show, dos: false})} className='btncont' >Regresar</button>
                <button onClick={()=>{setShow({...show, tres: true})}} className='btncont' >Continuar</button>

                {show.tres?<div>
                <div className='separador'></div> {/* ESTO ES UN DIV SEPARADOR */}
                <p className='par'><span>CURP del Alumno</span><span className='obliga'> * </span></p><br />
                <input className='inpText' type="text" name="curp" value={data.curp} onChange={(e) => {
                  setData({...data, curp: e.target.value.toUpperCase()})
                }} required placeholder="Tu respuesta"></input><br />

                  <p class="obliga">Dé click en Continuar hasta terminar esta sección</p>
                  <button onClick={()=>setShow({...show, tres: false})} className='btncont' >Regresar</button>
                  <button onClick={()=>setShow({...show, cuatro: true})} className='btncont' >Continuar</button>

                {show.cuatro?<div>
                <div className='separador'></div> {/* ESTO ES UN DIV SEPARADOR */}
                <p className='par'><span>Observaciones</span></p><br />
                <textarea className='textarea' name="observaciones" value={data.observaciones} onChange={(e) => {
                  setData({...data, observaciones: e.target.value})
                }} placeholder="Tu respuesta" required></textarea><br />
                </div>:null}
                </div>:null}
                </div>:null}
                </div>:null}
            </div>
          </form>
    </div>
  )
}
