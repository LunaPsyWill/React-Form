import React, { useState } from 'react'
import axios from 'axios'

export default function Formulario3({data, setData}) {

    const [show, setShow] = useState({
        connection1: true,
        connection2: true,
        connection3: true,
        cero: false,
        uno: false,
        dos: false,
        tres: false,
        cuatro: false
    })

    const [examen, setExamen] = useState({
        examenes: []
    })

    if(show.connection1){
    axios.get('http://localhost:3001/exams')
    .then(res => {
        setExamen({examenes: res.data})
        // console.log(service.servicios);
        setTimeout(() => {
            show.connection1 = false
        }, 500);
    })
    }

    const [resultado, setResultado] = useState({
        resultados: []
    })

    if(show.connection2){
        axios.get('http://localhost:3001/resultados')
        .then(res => {
            setResultado({resultados: res.data})
            // console.log(service.servicios);
            setTimeout(() => {
                show.connection2 = false
            }, 500);
        })
    }

    const [perfil, setPerfil] = useState({
        perfiles: []
    })

    if(show.connection3) {
        axios.get('http://localhost:3001/profiles')
        .then(res => {
            setPerfil({perfiles: res.data})
            // console.log(service.servicios);
            setTimeout(() => {
                show.connection3 = false
            }, 500);
        })
    }

  return (
    <div>
        <form className='frmReg'>
            <div className='seccion'>
                <p className='psec'>Examen de Admisión</p>
            </div>
            <p className='par'><span>Tipo de Examen Realizado</span><span className='obliga'> * </span></p>
            <select className='select' name="examen" value={data.examen} onChange={(e)=>{
                setData({...data, examen: e.target.value})
            }} required>
                <option value="">Elige</option>
                {examen.examenes.map(elemento => (
                    <option key={elemento.IdTipoExamen} value={elemento.IdTipoExamen}>{elemento.NombreTE}</option>
                ))}
            </select>

            <p class="obliga">Dé click en Continuar hasta terminar esta sección</p>
            <button onClick={()=>{ data.examen ==="9" ? setShow({...show, cero: true}) : setShow({...show, uno: true})}} className='btncont' >Continuar</button>
            
            {show.cero?<div>
            <div className='separador'></div> {/* ESTO ES UN DIV SEPARADOR */}
            <p className='par'><span>Indique Otro Tipo de Examen</span><span className='obliga'> * </span></p>
                <input className='inpText' type="text" name="otroExamen" value={data.otroExamen} onChange={(e)=>{
                    setData({...data, otroExamen: e.target.value})
                }} placeholder="Otro" required></input>

            <p class="obliga">Dé click en Continuar hasta terminar esta sección</p>
            <button onClick={()=>setShow({...show, cero: false})} className='btncont' >Regresar</button>
            <button onClick={()=>{ setShow({...show, uno: true}) }} className='btncont' >Continuar</button>
            </div>:null}

            {show.uno?<div>
            <div className='separador'></div> {/* ESTO ES UN DIV SEPARADOR */}
            <p className='par'><span>Fecha y Hora de Aplicación del Examen</span><span className='obliga'> * </span></p>
            <div>
            <input className='inpDate' type="date" name='fechaAplic' value={data.fechaAplic} onChange={(e)=>{
                    setData({...data, fechaAplic: e.target.value})
                }} required></input>
            <input className='inpText' type="time" min="00:00" max="23:59" name="horaAplic" value={data.horaAplic}  onChange={(e)=>{
                    setData({...data, horaAplic: e.target.value})
                }} placeholder="Tu respuesta" required></input>
                </div>
                
                <p class="obliga">Dé click en Continuar hasta terminar esta sección</p>
                <button onClick={()=>setShow({...show, uno: false})} className='btncont' >Regresar</button>
                <button onClick={()=>{setShow({...show, dos: true})}} className='btncont' >Continuar</button>
            
                {show.dos?<div>
                <div className='separador'></div> {/* ESTO ES UN DIV SEPARADOR */}
                <p className='par'><span>Resultado del Examen</span><span className='obliga'> * </span></p>
                <div className="resultado">
                <select className='select' name="resultado" value={data.resultado} onChange={(e)=>{
                setData({...data, resultado: e.target.value})
            }} required>
                        <option value="">Elige</option>
                        {resultado.resultados.map(elemento => (
                          <option key={elemento.IdResultado} value={elemento.IdResultado}>{elemento.DescripcionR}</option>
                        ))}
                    </select><br/>
                </div><br />

                <p class="obliga">Dé click en Continuar hasta terminar esta sección</p>
                <button onClick={()=>{ setShow({...show, dos: false})}} className='btncont' >Regresar</button>
                <button onClick={()=>{ setShow({...show, tres: true})}} className='btncont' >Continuar</button>

                {show.tres?<div>
                <div className='separador'></div> {/* ESTO ES UN DIV SEPARADOR */}
                <p className='par'><span>Perfil del Alumno</span><span className='obliga'> * </span></p>
            <select className='select' name="perfil" value={data.perfil} onChange={(e)=>{
                setData({...data, perfil: e.target.value})
            }} required>
                    <option value="" selected>Elige</option>
                        {perfil.perfiles.map(elemento => (
                    <option key={elemento.IdPerfil} value={elemento.IdPerfil}>{elemento.NombrePerfil}</option>
                ))}
                    </select><br/>

                <p class="obliga">Dé click en Continuar hasta terminar esta sección</p>
                <button onClick={()=>{ setShow({...show, tres: false})}} className='btncont' >Regresar</button>
                <button onClick={()=>{setShow({...show, cuatro: true})}} className='btncont' >Continuar</button>
                
                {show.cuatro?<div>
                <div className='separador'></div> {/* ESTO ES UN DIV SEPARADOR */}
            <p className='par'><span>Número de Telefono</span><span className='obliga'> * </span></p><br/>
                <input className='inpNum' type="number" name="numTel" value={data.numTel} onChange={(e)=>{
                setData({...data, numTel: e.target.value})
            }} placeholder="Tu respuesta" required></input>

            <div className='separador'></div> {/* ESTO ES UN DIV SEPARADOR */}
            <p className='par'><span>Introduzca Email</span><span className='obliga'> * </span></p><br/>
                <input className='email' type="email" name="email" value={data.email} onChange={(e)=>{
                setData({...data, email: e.target.value})
            }} placeholder="Tu respuesta" required></input>
            </div>:null}
            </div>:null}
            </div>:null}
            </div>:null}
          </form>
    </div>
  )
}
