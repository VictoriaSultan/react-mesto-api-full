import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = (props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="edit-profile"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText="Сохранить"
        >
            <input className="popup__textinput" id="name-input" placeholder="Имя" name="name" minLength="2"
                maxLength="40" required="" onChange={handleChangeName} value={name} />
            <span className="popup__text-error name-input-error"></span>
            <input className="popup__textinput" id="about-input" placeholder="О себе" name="about" minLength="2"
                maxLength="200" required="" onChange={handleChangeDescription} value={description} />
            <span className="popup__text-error about-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;