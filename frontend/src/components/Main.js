import React, { useContext } from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import iconEditDefault from "../images/edit-icon-default.svg";
import iconAddDefault from "../images/add-icon-default.svg";

const Main = (props) => {
    const { name, about, avatar } = useContext(CurrentUserContext);
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__columns">
                    <div className="profile__avatar" id="profile-avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
                    <div className="profile__avatar-pen" onClick={props.onEditAvatar}></div>
                    <div className="profile__info">
                        <h1 className="profile__title" id="profile-name">{name}</h1>
                        <button className="profile__edit" onClick={props.onEditProfile}>
                            <img className="profile__icon-edit" src={iconEditDefault} alt="Редактировать" />
                        </button>
                        <p className="profile__subtitle" id="profile-about">{about}</p>
                    </div>
                </div>
                <button className="profile__add" onClick={props.onAddPlace}>
                    <img className="profile__icon-add" src={iconAddDefault} alt="Добавить" />
                </button>
            </section>
            <section className="elements">
                {
                    props.cards.map(card => {
                        return (<Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />)
                    })
                }
            </section>
        </main>
    );
};

export default Main;
