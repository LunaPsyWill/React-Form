const db = require('./dbData');
const sql = require('mssql');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

//------------VALIDACION ------------------

const config = {
    user: db.user,
    password: db.password,
    server: db.server, 
    database: db.database,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

app.get('/datos', (req,res)=>{
    async function getDatos(){
        try{
            const pool = await sql.connect(config)
            const result = await pool.request().query('SELECT idCertificado, IdEnfermero, Nombre,  ApMaterno, ApPaterno, Cliente, Edad, FechaNacimiento, FechaToma, HoraToma, IdCliente, IdResultado,  NumEnvioCertificado, NumeroPasaporte, OtroTipoCliente, OtroTipoConvenio, OtroTipoPrueba, Telefono, TipoCliente FROM TblCertificadoCovid WHERE idCertificado = (SELECT MAX(idCertificado) from TblCertificadoCovid)')
            const resp = result.recordset
            res.send(resp)
    
        } catch(error) {
            console.error(error)
        }
    }

    getDatos()
})


app.get('/schools', (req,res)=>{
    async function getSchool(){
        try{
            // const pool = await sql.connect(config)
            // const result = await pool.request().query('SELECT IdEnfermero, NombreE FROM TblEnfermeros')
            // const resp = result.recordset
            const escuelas = [
                {IdEscuela: 1, NombreE: "Escuela 1"},
                {IdEscuela: 2, NombreE: "Escuela 2"},
                {IdEscuela: 3, NombreE: "Otra"}
            ]
            res.send(escuelas)
            
        } catch(error) {
            console.error(error)
        }
    }
    
    getSchool()
})

app.get('/grados', (req,res)=>{
    async function getGrade(){
        try{
            // const pool = await sql.connect(config)
            // const result = await pool.request().query('SELECT IdEnfermero, NombreE FROM TblEnfermeros')
            // const resp = result.recordset
            const grados = [
                {IdGrado: 1, NombreG: "Primero"},
                {IdGrado: 2, NombreG: "Segundo"},
                {IdGrado: 3, NombreG: "Tercero"},
                {IdGrado: 4, NombreG: "Cuarto"},
                {IdGrado: 5, NombreG: "Quinto"},
                {IdGrado: 6, NombreG: "Sexto"}
            ]
            res.send(grados)
    
        } catch(error) {
            console.error(error)
        }
    }

    getGrade()
})

app.get('/genero', (req,res)=>{
    async function getGender(){
        try{
            // const pool = await sql.connect(config)
            // const result = await pool.request().query('SELECT IdEnfermero, NombreE FROM TblEnfermeros')
            // const resp = result.recordset
            const generos = [
                {IdGenero: 1, DescripcionGenero: "Femenino"},
                {IdGenero: 2, DescripcionGenero: "Masculino"}
            ]
            res.send(generos)
    
        } catch(error) {
            console.error(error)
        }
    }

    getGender()
})

app.get('/exams', (req,res)=>{
    async function getTE(){
        try{
            // const pool = await sql.connect(config)
            // const result = await pool.request().query('SELECT IdTipoPrueba, NombreTP FROM CatTipoPrueba')
            // const resp = result.recordset
            const examenes = [
                {IdTipoExamen: 1, NombreTE: "Tipo de Examen 1"},
                {IdTipoExamen: 2, NombreTE: "Tipo de Examen 2"},
                {IdTipoExamen: 3, NombreTE: "Otro"}
            ]
            res.send(examenes)
    
        } catch(error) {
            console.error(error)
        }
    }

    getTE()
})

app.get('/resultados', (req,res)=>{
    async function getResultados(){
        try{
            // const pool = await sql.connect(config)
            // const result = await pool.request().query('SELECT IdFormaPago, NombreFP FROM CatFormaPago')
            // const resp = result.recordset
            const resultados = [
                {IdResultado: 1, DescripcionR: "Aprobado"},
                {IdResultado: 2, DescripcionR: "Reprobado"},
                {IdResultado: 3, DescripcionR: "No Presentó"}
            ]
            res.send(resultados)
    
        } catch(error) {
            console.error(error)
        }
    }

    getResultados()
})

app.get('/profiles', (req,res)=>{
    async function getPerfil(){
        try{
            // const pool = await sql.connect(config)
            // const result = await pool.request().query('SELECT IdConvenio, NombreEmpresa FROM CatConvenios')
            // const resp = result.recordset
            const perfiles = [
                {IdPerfil: 1, NombrePerfil: "Social-Humanístico"},
                {IdPerfil: 2, NombrePerfil: "Físico-Matemático"},
                {IdPerfil: 3, NombrePerfil: "Químico-Biológico"},
                {IdPerfil: 4, NombrePerfil: "Económico-Contable"}
            ]
            res.send(perfiles)
    
        } catch(error) {
            console.error(error)
        }
    }

    getPerfil()
})

app.post('/register', (req, res) => {
    async function insert(){
        const datos = {
                escuela: req.body.escuela,
                otraEscuela: req.body.otraEscuela,
                grado: req.body.grado,
                nombre: req.body.nombre,
                apPaterno: req.body.apPaterno,
                apMaterno: req.body.apMaterno,
                edad: req.body.edad,
                fechaNacim: req.body.fechaNacim,
                genero: req.body.genero,
                curp: req.body.curp,
                observaciones: req.body.observaciones,
                examen: req.body.examen,
                otroExamen: req.body.otroExamen,
                fechaAplic: req.body.fechaAplic,
                horaAplic: req.body.horaAplic,
                resultado: req.body.resultado,
                perfil: req.body.perfil,
                numTel: req.body.numTel,
                email: req.body.email
        }

        try{
            // let pool = await sql.connect(config)
            // await pool.request().input('IdEscuela', sql.Int, escuela) //cada input es un campo a llenar
            // .input('OtraEscuela', sql.VarChar, `${otraEscuela}`)
            // .input('Grado', sql.VarChar, `${grado}`)
            // .input('Nombre', sql.VarChar, `${nombre}`)
            // .input('ApPaterno', sql.VarChar, `${apPaterno}`)
            // .input('ApMaterno', sql.VarChar, `${apMaterno}`)
            // .input('Edad', sql.Int, edad)
            // .input('FechaNacimiento', sql.VarChar, `${fechaNacim}`)
            // .input('Genero', sql.Int, genero)
            // .input('RequiereCertificado', sql.Bit, antigeno)
            // .input('NumeroPasaporte', sql.VarChar, `${pasaporte}`)
            // .input('Observaciones', sql.VarChar, `${observaciones}`)
            // .input('IdTipoPrueba', sql.Int, prueba)
            // .input('OtroTipoPrueba', sql.VarChar, `${otraprueba}`)
            // .input('FechaToma', sql.VarChar, `${fechaToma}`)
            // .input('HoraToma', sql.VarChar, `${horaToma}`)
            // .input('MostroComprobantePago', sql.Bit, comprobantePago)
            // .input('OtroComprobantePago', sql.VarChar, `${otrocomp}`)
            // .input('MontoPagado', sql.Decimal, monto)
            // .input('IdFormaPago', sql.Int, formaPago)
            // .input('FolioTransferencia', sql.VarChar, `${digitosPago}`)
            // .input('IdResultado', sql.Int, resultado)
            // .input('TipoCliente', sql.VarChar, `${tipoCliente}`)
            // .input('OtroTipoCliente', sql.VarChar, `${otrotipoCliente}`)
            // .input('IdConvenio', sql.Int, convenio)
            // .input('NumEnvioCertificado', sql.VarChar, numWa)
            // .input('Email', sql.VarChar, `${email}`)
            // .query(`INSERT INTO TblCertificadoCovid (IdEnfermero, Nombre, ApPaterno, ApMaterno, Edad, FechaNacimiento, Genero, RequiereCertificado,
            //      NumeroPasaporte, Observaciones, IdTipoPrueba, OtroTipoPrueba, FechaToma, HoraToma, MostroComprobantePago, OtroComprobantePago, MontoPagado, 
            //      IdFormaPago, FolioTransferencia, IdResultado, TipoCliente, OtroTipoCliente, IdConvenio, NumEnvioCertificado) VALUES 
            // (@IdEnfermero, @Nombre, @ApPaterno, @ApMaterno, @Edad, @FechaNacimiento, @Genero, @RequiereCertificado, @NumeroPasaporte, 
            //     @Observaciones, @IdTipoPrueba, @OtroTipoPrueba, @FechaToma, @HoraToma, @MostroComprobantePago, @OtroComprobantePago, @MontoPagado, @IdFormaPago, 
            //     @FolioTransferencia, @IdResultado, @TipoCliente, @OtroTipoCliente, @IdConvenio, @NumEnvioCertificado)`)
    
            // console.log('User inserted')

            res.send(datos)
            
        } catch(error) {
            console.error(error)
        }
    }

    insert()
})

app.listen(3001, () => {
    console.log('Server running on port 3001');
})
