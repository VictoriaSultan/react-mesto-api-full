import React, { useState, useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = (props) => {
    const [avatar, setAvatar] = useState("");
    const avatarRef = useRef();
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setAvatar(currentUser.avatar);
    }, [currentUser, props.isOpen]);

    const handleChangeAvatar = (e) => {
        setAvatar(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="edit-avatar"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            buttonText="Сохранить"
        >
            <input className="popup__textinput" id="avatar-link-input" type="url" placeholder="Ссылка на аватар"
                name="avatar" minLength="2" required="" onChange={handleChangeAvatar} value={avatar} ref={avatarRef} />
            <span className="popup__text-error avatar-link-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;