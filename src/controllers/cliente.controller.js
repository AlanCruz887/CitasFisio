const {getConnection,sql} = require ("../database/connection")

const clienteController={};

clienteController.obtenerUnCliente = async (req, res) => {
    try {
      const { CLIENTEID } = req.params.ci;
  
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("CLIENTEID", CLIENTEID)
        .query("SELECT * FROM CLIENTE WHERE CLIENTEID = @CLIENTEID");
  
      res.json(result.recordset[0]);
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      res.status(500).json({ error: "Ocurrió un error al obtener el cliente" });
    }
  };
  
  clienteController.insertarCliente = async (req, res) => {
    try {
      const { CLIENTEID, NOMBRE, APELLIDO, FECHANACIMIENTO, DIRECCION, TELEFONO } = req.body;
  
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("CLIENTEID", CLIENTEID)
        .input("NOMBRE", NOMBRE)
        .input("APELLIDO", APELLIDO)
        .input("FECHANACIMIENTO", FECHANACIMIENTO)
        .input("DIRECCION", DIRECCION)
        .input("TELEFONO", TELEFONO)
        .query(
          "INSERT INTO CLIENTE (CLIENTEID, NOMBRE, APELLIDO, FECHANACIMIENTO, DIRECCION, TELEFONO) VALUES (@CLIENTEID, @NOMBRE, @APELLIDO, @FECHANACIMIENTO, @DIRECCION, @TELEFONO)"
        );
  
      res.json({ message: "Cliente insertado correctamente" });
    } catch (error) {
      console.error("Error al insertar el cliente:", error);
      res.status(500).json({ error: "Ocurrió un error al insertar el cliente" });
    }
  };

  
  clienteController.actualizarCliente = async (req, res) => {
    try {
      const { CLIENTEID } = req.params.ci;
      const { NOMBRE, APELLIDO, FECHANACIMIENTO, DIRECCION, TELEFONO } = req.body;
  
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("CLIENTEID", CLIENTEID)
        .input("NOMBRE", NOMBRE)
        .input("APELLIDO", APELLIDO)
        .input("FECHANACIMIENTO", FECHANACIMIENTO)
        .input("DIRECCION", DIRECCION)
        .input("TELEFONO", TELEFONO)
        .query(
          "UPDATE CLIENTE SET NOMBRE = @NOMBRE, APELLIDO = @APELLIDO, FECHANACIMIENTO = @FECHANACIMIENTO, DIRECCION = @DIRECCION, TELEFONO = @TELEFONO WHERE CLIENTEID = @CLIENTEID"
        );
  
      res.json({ message: "Cliente actualizado correctamente" });
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      res.status(500).json({ error: "Ocurrió un error al actualizar el cliente" });
    }
  };

  clienteController.eliminarCliente = async (req, res) => {
    try {
      const { CLIENTEID } = req.params.ci;
  
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("CLIENTEID", CLIENTEID)
        .query("DELETE FROM CLIENTE WHERE CLIENTEID = @CLIENTEID");
  
      res.json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      res.status(500).json({ error: "Ocurrió un error al eliminar el cliente" });
    }
  };
  

  clienteController.obtenerTodosLosClientes = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query("SELECT * FROM CLIENTE");
  
      res.json(result.recordset);
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      res.status(500).json({ error: "Ocurrió un error al obtener los clientes" });
    }
  };


  module.exports = clienteController
  
