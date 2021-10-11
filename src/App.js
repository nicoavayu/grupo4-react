import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, ListGroupItemHeading } from 'reactstrap';
import axios from 'axios';



const data = [
  { id: 1, producto: "pantalon", talle: "S", color: "Rojo", precio: "1500" },
  { id: 2, producto: "pantalon", talle: "M", color: "Azul", precio: "1500" },
  { id: 3, producto: "pantalon", talle: "L", color: "Verde", precio: "1500" },
  { id: 4, producto: "pantalon", talle: "XL", color: "Amarillo", precio: "1500" },
]

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: "",
      producto: "",
      talle: "",
      color: "",
      precio: "",
      imagen:"",
    },
    modalInsertar: false,
    modalEditar:false,
  };


  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }

    })
  }
  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  }

  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  }

  mostrarModalEditar = (registro) => {
    this.setState({
      form: registro,
      modalEditar: true,
    });
  };

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  };
  

//Insertar nuevo producto en modal  
insertar=()=> {
  var valorNuevo={...this.state.form};
  valorNuevo.id=this.state.data.length+1;
  var lista=this.state.data;
  lista.push(valorNuevo);
  this.setState({data:lista, modalInsertar:false});
}

editar=(dato)=>{
  var contador=0;
  var lista= this.state.data;
  lista.map((registro)=>{
    if (dato.id==registro.id){
      lista[contador].producto=dato.producto;
      lista[contador].talle=dato.talle;
      lista[contador].color=dato.color;
      lista[contador].precio=dato.precio;
    }
    contador++;
  });
  this.setState({data:lista, modalEditar:false});
}


eliminar=(dato)=>{
  var opcion=window.confirm("Esta seguro que desea eliminar el producto " + dato.id);
  if(opcion){
    var contador=0;
    var lista=this.state.data;
    lista.map ((registro)=>{
      if (registro.id==dato.id) {
        lista.splice(contador,1);
      }
      contador++;
    });
    this.setState({data:lista});
  }
}



  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Insertar Nuevo Producto</Button>
          <br /> <br />

          <Table>
            <thead><tr>
              <th>Id  </th>
              <th>Producto</th>
              <th>Talle</th>
              <th>Color</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
            </thead>

            <tbody>
              {this.state.data.map((elemento) => (
                <tr>
                  <td>{elemento.id} </td>
                  <td>{elemento.producto} </td>
                  <td>{elemento.talle} </td>
                  <td>{elemento.color} </td>
                  <td>{elemento.precio} </td>
                  <td>{elemento.imagen}  </td>
                  <td><Button className="editar" onClick={() => this.mostrarModalEditar(elemento)}> Editar</Button> {"  "}
                    <Button color="danger"onClick={() => this.eliminar(elemento)}> Borrar</Button>
                  </td>
                </tr>


              ))} </tbody>

          </Table>

        </Container>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar Personaje</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Producto:
              </label>
              <input
                className="form-control"
                name="producto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.producto}
              />
            </FormGroup>

            <FormGroup>
              <label>
                talle:
              </label>
              <input
                className="form-control"
                name="talle"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.talle}
              />
            </FormGroup>

            <FormGroup>
              <label>
                color:
              </label>
              <input
                className="form-control"
                name="color"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.color}
              />
            </FormGroup>

            <FormGroup>
              <label>
                precio:
              </label>
              <input
                className="form-control"
                name="precio"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.precio}
              />
            </FormGroup>




          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              color="danger"
              onClick={() => this.ocultarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>













                  
                
              <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div><h3>Editar Producto</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id:
              </label>

              <input
                className="form-control"
                readOnly
                type="text" value={this.state.form.id}/>
            </FormGroup>

            <FormGroup>
              <label>
                Producto:
              </label>
              <input
                className="form-control"
                name="producto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.producto} />
            </FormGroup>

            <FormGroup>
              <label>
                talle:
              </label>
              <input
                className="form-control"
                name="talle"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.talle} 
              />
            </FormGroup>

            <FormGroup>
              <label>
                color:
              </label>
              <input
                className="form-control"
                name="color"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.color} 
              />
            </FormGroup>

            <FormGroup>
              <label>
                precio:
              </label>
              <input
                className="form-control"
                name="precio"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.precio} 
              />
            </FormGroup>




          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"onClick={() => this.editar(this.state.form)}>Editar </Button>
            <Button color="danger" onClick={() => this.ocultarModalEditar()}>Cancelar </Button>
          </ModalFooter>
        </Modal>


      </>
      //
    )
  }
}


export default App;
