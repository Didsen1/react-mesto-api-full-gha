import React from "react"
import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopup(props) {

    return (
        <PopupWithForm
            name='delete'
            buttonText='Да'
            title='Вы уверены?'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={props.onSubmit} />

    )
}