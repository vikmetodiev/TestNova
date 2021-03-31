import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Link from "next/link";

const BookPageModal = (props) => {
    const {
        className
    } = props;

    return (
        <div>
            <Modal isOpen={props.modal} toggle={props.toggle} className={props.modalClass}>
                <ModalHeader toggle={props.toggle}>
                    <div className="modal-picture"></div>
                    <div className="text-center">{props.title}</div>
                </ModalHeader>
                <ModalBody>
                    {props.message}
                </ModalBody>
                <ModalFooter>
                    <Link href={'/'}><a className="light-blue-text px-2"><small>{props.backToHomepage}</small></a></Link>{' '}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default BookPageModal;