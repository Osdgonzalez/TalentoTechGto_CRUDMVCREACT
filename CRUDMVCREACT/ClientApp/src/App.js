import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import TablaContacto from "./components/TablaContacto";
import { useEffect, useState } from "react";
import ModalContacto from "./components/ModalContacto";


const App = () => {

    const [contactos, setContactos] = useState([]);

    const [mostrarModal, setMostrarModal] = useState(false);

    const [editar, setEditar] = useState(null);

    /**
     * Servicios API
     */

    //Devuelve los valores de la tabla Contacto
    const mostrarContactos = async () => {
        const response = await fetch("api/contacto/lista");

        if (response.ok) {
            const data = await response.json();
            setContactos(data);
        }
    }

    //Guarda un nuevo registro en la tabla Contacto
    const guardarContacto = async (contacto) => {
        console.log("guardarContacto - App");
        console.log(contacto);
        const response = await fetch("api/contacto/guardar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(contacto)
        });

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    }

    //Editar registro en la tabla Contacto
    const editarContacto = async (contacto) => {

        const response = await fetch("api/contacto/editar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(contacto)
        });

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    }

    //Eliminar registro en la tabla Contacto
    const eliminarContacto = async (id) => {

        var respuesta = window.confirm("¿Desea eliminar el contacto?");

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/contacto/eliminar/" + id, {
            method: "DELETE",
        });

        if (response.ok) {
            mostrarContactos();
        }
    }

    useEffect(() => {
        mostrarContactos();
    } , [])

    return (
    
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Contactos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)}>Nuevo Contacto</Button>
                            <hr></hr>
                            <TablaContacto
                                data={contactos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarContacto={eliminarContacto}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalContacto
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}
                editar={editar}
                editarContacto={editarContacto}
            />
        </Container>
    
    )
}

export default App;