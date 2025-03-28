import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { proyectos as data } from "./proyectos.json";

class Proyectos extends React.Component {
  constructor(props) {
    super(props);
    this.data = data;
    this.state = {
      data: this.data,
      modalActualizar: false,
      modalInsertar: false,
      form: {
        id_proyecto: "",
        nombre: "",
        descripcion: "",
        fecha_inicio: "",
        fecha_fin_estimada: "",
        fecha_fin_real: "",
        estado: "",
        prioridad: "",
      },
    };
  }

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id_proyecto === registro.id_proyecto) {
        arreglo[contador].nombre = dato.nombre;
        arreglo[contador].descripcion = dato.descripcion;
        arreglo[contador].fecha_inicio = dato.fecha_inicio;
        arreglo[contador].fecha_fin_estimada = dato.fecha_fin_estimada;
        arreglo[contador].fecha_fin_real = dato.fecha_fin_real;
        arreglo[contador].estado = dato.estado;
        arreglo[contador].prioridad = dato.prioridad;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm(
      "¿Estás seguro que deseas eliminar el proyecto " + dato.nombre + "?"
    );
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id_proyecto === registro.id_proyecto) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = { ...this.state.form };
    var newId =
      this.state.data.length > 0
        ? Math.max(...this.state.data.map((item) => item.id_proyecto)) + 1
        : 1;
    valorNuevo.id_proyecto = newId;
    var lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>
            Crear Nuevo Proyecto
          </Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin Estimada</th>
                <th>Fecha Fin Real</th>
                <th>Estado</th>
                <th>Prioridad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id_proyecto}>
                  <td>{dato.id_proyecto}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.descripcion}</td>
                  <td>{dato.fecha_inicio}</td>
                  <td>{dato.fecha_fin_estimada}</td>
                  <td>{dato.fecha_fin_real}</td>
                  <td>{dato.estado}</td>
                  <td>{dato.prioridad}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Proyecto</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>ID: </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={
                  this.state.data.length > 0
                    ? Math.max(
                        ...this.state.data.map((item) => item.id_proyecto)
                      ) + 1
                    : 1
                }
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre: </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Descripción: </label>
              <textarea
                className="form-control"
                name="descripcion"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha Inicio: </label>
              <Input
                className="form-control"
                name="fecha_inicio"
                type="date"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha Fin Estimada: </label>
              <Input
                className="form-control"
                name="fecha_fin_estimada"
                type="date"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha Fin Real: </label>
              <Input
                className="form-control"
                name="fecha_fin_real"
                type="date"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Estado: </label>
              <Input
                className="form-control"
                name="estado"
                type="select"
                onChange={this.handleChange}
              >
                <option value="">Seleccione...</option>
                <option value="Planificado">Planificado</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completado">Completado</option>
                <option value="Cancelado">Cancelado</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <label>Prioridad: </label>
              <Input
                className="form-control"
                name="prioridad"
                type="select"
                onChange={this.handleChange}
              >
                <option value="">Seleccione...</option>
                <option value="1">Alta</option>
                <option value="2">Media</option>
                <option value="3">Baja</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>
              Insertar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalInsertar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Proyecto</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>ID:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id_proyecto}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label>Descripción:</label>
              <textarea
                className="form-control"
                name="descripcion"
                onChange={this.handleChange}
                value={this.state.form.descripcion}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha Inicio:</label>
              <Input
                className="form-control"
                name="fecha_inicio"
                type="date"
                onChange={this.handleChange}
                value={this.state.form.fecha_inicio}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha Fin Estimada:</label>
              <Input
                className="form-control"
                name="fecha_fin_estimada"
                type="date"
                onChange={this.handleChange}
                value={this.state.form.fecha_fin_estimada}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha Fin Real:</label>
              <Input
                className="form-control"
                name="fecha_fin_real"
                type="date"
                onChange={this.handleChange}
                value={this.state.form.fecha_fin_real}
              />
            </FormGroup>
            <FormGroup>
              <label>Estado:</label>
              <Input
                className="form-control"
                name="estado"
                type="select"
                onChange={this.handleChange}
                value={this.state.form.estado}
              >
                <option value="">Seleccione...</option>
                <option value="Planificado">Planificado</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completado">Completado</option>
                <option value="Cancelado">Cancelado</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <label>Prioridad:</label>
              <Input
                className="form-control"
                name="prioridad"
                type="select"
                onChange={this.handleChange}
                value={this.state.form.prioridad}
              >
                <option value="">Seleccione...</option>
                <option value="1">Alta</option>
                <option value="2">Media</option>
                <option value="3">Baja</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Proyectos;
