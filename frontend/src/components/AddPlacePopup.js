import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = (props) => {

    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        setName("");
        setLink("");
    }, [props.isOpen]);

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeLink = (e) => {
        setLink(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onCreateCard({
            name,
            link,
        });
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="add-card"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText="Создать"
        >
            <input className="popup__textinput" id="card-name-input" placeholder="Название" name="name" minLength="2"
                maxLength="30" required="" onChange={handleChangeName} value={name} />
            <span className="popup__text-error card-name-input-error"></span>
            <input className="popup__textinput" id="card-link-input" type="url" placeholder="Ссылка на картинку"
                name="link" minLength="2" required="" onChange={handleChangeLink} value={link} />
            <span className="popup__text-error card-link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;