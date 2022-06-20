import React from "react";

import iconSuccess from "../images/success.svg";
import iconCross from "../images/cross.svg";

const InfoToolTip = (props) => {

  const { onClose, isOpen } = props;
  
  return (
    <div className={`popup ${isOpen ? "popup__opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={onClose}></button>
        {props.isSuccess ? (
          <>
            <img className="popup__tooltip-image" src={iconSuccess} alt="Вы успешно зарегистрировались"/>
            <p className="popup__tooltip-text">Вы успешно зарегистрировались!</p>
          </>
        ) : (
          <>
            <img className="popup__tooltip-image" src={iconCross} alt="Что-то пошло не так"/>
            <p className="popup__tooltip-text">Что-то пошло не так. Попробуйте ещё раз!</p>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoToolTip;