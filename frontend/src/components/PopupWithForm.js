import React from "react";

const PopupWithForm = (props) => {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup__opened" : ""}`} >
            <div className="popup__container">
                <button className="popup__close" onClick={props.onClose}></button>
                <form id={props.name} name={props.name} className="popup__form" noValidate onSubmit={props.onSubmit}>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children ? props.children : null}
                    <button type="submit" className="popup__button">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;