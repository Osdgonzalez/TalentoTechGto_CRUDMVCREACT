﻿import { useEffect, useState } from "react";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap"

const ModalContacto = ({ mostrarModal, setMostrarModal, guardarContacto, editar, editarContacto }) => {

    const modeloContacto = {
        idContacto: 0,
        nombre: "",
        correo: "",
        telefono: ""
    }

    const [contacto, setContacto] = useState(modeloContacto);

    const actualizaDato = (e) => {
        setContacto({
            ...contacto,
            [e.target.name]: e.target.value
        })
    }

    const enviarDatos = () => {
        if (contacto.idContacto == 0) {
            console.log("enviarDatos - ModalComponent");
            guardarContacto(contacto);
            reiniciarModal();
        }
        else {
            editarContacto(contacto);
        }
    }

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal);
        reiniciarModal();
    }

    const reiniciarModal = () => {
        setContacto(modeloContacto);
    }

    useEffect(() => {
        if (editar != null) {
            setContacto(editar);
        }
        else {
            setContacto(modeloContacto);
        }
    }, [editar])

    return (
        <Modal isOpen={ mostrarModal}>
            <ModalHeader>
                {contacto.idContacto == 0 ? "Nuevo Contacto" : "Editar Contacto"}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizaDato(e)} value={ contacto.nombre} />
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizaDato(e)} value={contacto.correo} />
                        <Label>Teléfono</Label>
                        <Input name="telefono" onChange={(e) => actualizaDato(e)} value={contacto.telefono} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" className="me-2" onClick={enviarDatos}>Guardar</Button>
                <Button color="default" size="sm" onClick={cerrarModal}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalContacto;