const { getConnection,sql} = require("../database/connection");
 const principal ={}

principal.iniciarPagina = async(req,res)=>{
    res.render('../src/views/index.ejs')
}

principal.testimonios = async (req,res) =>{
    res.render('../src/views/testimony.ejs')
}

principal.login = async (req,res)=>{
    res.render('../src/views/login.ejs')
}

module.exports = principal