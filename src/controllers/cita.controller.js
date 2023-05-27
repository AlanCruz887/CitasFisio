const { getConnection,sql} = require("../database/connection");
 const citaController ={}

 citaController.obtenerTodasCitas = async(req,res)=>{
    const pool = await getConnection();
    const citas = await pool.request().query("select TOP(4)CONCAT(FISIOTERAPIA.NOMBRE,' ',FISIOTERAPIA.APELLIDOS) AS ENCARGADO,CONCAT(CLIENTE.NOMBRE ,' ', CLIENTE.APELLIDO) AS NOMBRE,CONCAT(DAY(CITAS.FECHAHORA),'-',MONTH(CITAS.FECHAHORA),'-',YEAR(CITAS.FECHAHORA)) AS FECHA from citas,CLIENTE,FISIOTERAPIA WHERE CITAS.CLIENTEID = CLIENTE.CLIENTEID AND CITAS.FISIOTERAPIAID = FISIOTERAPIA.FISIOTERAPIAID")
    const citas1 = citas.recordset
    res.render('../src/views/pendientes.ejs',{citas1})
    console.log(citas1);
 }

 

 citaController.obtenerUnaCita = async (req,res)=>{
    const pool = await getConnection();
    const {id} = req.params.ic;
    const result = await pool.request()
    .input("CITAID",id)
    .query("SELECT * FROM CITAS  WHERE CITAID = @CITAID");
    res.json(result.recordset[0]);

 }

 citaController.insertarCita = async (req, res) => {
    try {
      const { CITAID, FISIOTERAPIAID, FECHAHORA, DURACION } = req.body; // Obtener los datos del cuerpo de la solicitud
  
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("CITAID", CITAID)
        .input("FISIOTERAPIAID", FISIOTERAPIAID)
        .input("FECHAHORA", FECHAHORA)
        .input("DURACION", DURACION)
        .query(
          "INSERT INTO CITAS (CITAID, FISIOTERAPIAID, FECHAHORA, DURACION) VALUES (@CITAID, @FISIOTERAPIAID, @FECHAHORA, @DURACION)"
        );
  
      res.json({ message: "Cita insertada correctamente" });
    } catch (error) {
      console.error("Error al insertar la cita:", error);
      res.status(500).json({ error: "Ocurrió un error al insertar la cita" });
    }
  };
  
  citaController.eliminarCita = async (req, res) => {
    try {
      const { CITAID } = req.params.ic; // Obtener el parámetro CITAID de la URL
  
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("CITAID", CITAID)
        .query("DELETE FROM CITAS WHERE CITAID = @CITAID");
  
      res.json({ message: "Cita eliminada correctamente" });
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
      res.status(500).json({ error: "Ocurrió un error al eliminar la cita" });
    }
  };

  citaController.actualizarCita = async (req, res) => {
    try {
      const { CITAID } = req.params.ic; // Obtener el parámetro CITAID de la URL
      const { FISIOTERAPIAID, FECHAHORA, DURACION } = req.body; // Obtener los datos del cuerpo de la solicitud
  
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("CITAID", CITAID)
        .input("FISIOTERAPIAID", FISIOTERAPIAID)
        .input("FECHAHORA", FECHAHORA)
        .input("DURACION", DURACION)
        .query(
          "UPDATE CITAS SET FISIOTERAPIAID = @FISIOTERAPIAID, FECHAHORA = @FECHAHORA, DURACION = @DURACION WHERE CITAID = @CITAID"
        );
  
      res.json({ message: "Cita actualizada correctamente" });
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
      res.status(500).json({ error: "Ocurrió un error al actualizar la cita" });
    }
  };
  
  


 module.exports = citaController;
