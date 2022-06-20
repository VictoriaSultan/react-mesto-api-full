import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import Footer from "./Footer";

import ProtectedRoute from "./ProtectedRoute";
import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoToolTip from "./InfoToolTip";

import { api } from "../utils/api";
import * as auth from "../auth";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

const App = () => {

    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const history = useHistory();

    const [currentUser, setCurrentUser] = useState({
        _id: "",
        name: "",
        about: "",
        avatar: ""
    });

    useEffect(() => {
        if(isLoggedIn){
            api.getUserInfo().then((userData) => {
                setCurrentUser(userData);
            }).catch((err) => {
                console.log(err);
            });
            api.getInitialCards().then((initialCardsData) => {
                setCards(initialCardsData);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [isLoggedIn]);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            auth.checkToken(jwt).then((res) => {
                setIsLoggedIn(true);
                setEmail(res.data.email);
                history.push("/");
            })
            .catch((err) => {
                console.log('checkToken err', err)
                if (err.status === 401) {
                    console.log("401 — Токен не передан или передан не в том формате");
                }
                console.log("401 — Переданный токен некорректен");
            });
        } else {
            setIsLoggedIn(false);
            history.push("/sign-in");
        }
    }, [history]);

    const handleRegister = (email, password) => {
        auth.register(email, password).then((res) => {
            setIsSuccess(true);
            setInfoToolTipPopupOpen(true);
            history.push("/sign-in");
        })
            .catch((err) => {
                if (err.status === 400) {
                    console.log("400 - некорректно заполнено одно из полей");
                }
                setIsSuccess(false);
                setInfoToolTipPopupOpen(true);
            });
    }

    const handleLogin = (email, password) => {
        auth.authorize(email, password).then((res) => {
            localStorage.setItem("jwt", res.token);
            setIsLoggedIn(true);
            setEmail(email);
            history.push("/");
        })
        .catch((err) => {
            console.log('handleLogin err', err)
            if (err.status === 400) {
                console.log("400 - не передано одно из полей");
            } else if (err.status === 401) {
                console.log("401 - пользователь с email не найден");
            }
            setIsSuccess(false);
            setInfoToolTipPopupOpen(true);
        });
    }

    const handleEditAvatarClick = () => {
        setEditAvatarPopupOpen(true);
    }

    const handleEditProfileClick = () => {
        setEditProfilePopupOpen(true);
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id === card._id ? null : c));
        }).catch((err) => {
            console.log(err);
        });
    }

    const closeAllPopups = () => {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setImagePopupOpen(false);
        setInfoToolTipPopupOpen(false);
    }

    const handleUpdateAvatar = (userData) => {
        api.setUserAvatar(userData).then((userData) => {
            setCurrentUser(userData);
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleUpdateUser = (userData) => {
        api.setUserInfo(userData).then((userData) => {
            setCurrentUser(userData);
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleAddPlaceSubmit = (cardData) => {
        api.addCard(cardData).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleSignOut = () => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        history.push("/sign-in");
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Header email={email} onSignOut={handleSignOut} />
            <Switch>
                <ProtectedRoute exact path="/"
                    isLoggedIn={isLoggedIn}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                    component={Main}
                />
                <Route path="/sign-in">
                    <Login onLogin={handleLogin} />
                </Route>
                <Route path="/sign-up">
                    <Register onRegister={handleRegister} />
                </Route>
                <Route>
                    {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                </Route>
            </Switch>
            <Footer />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
            />
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onCreateCard={handleAddPlaceSubmit}
            />
            <PopupWithForm
                title="Вы уверены?"
                name="remove-card"
                onClose={closeAllPopups}
                buttonText="Да"
            >
            </PopupWithForm>
            <ImagePopup
                card={selectedCard}
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
            />
            <InfoToolTip
                isOpen={isInfoToolTipPopupOpen}
                onClose={closeAllPopups}
                isSuccess={isSuccess}
            />
        </CurrentUserContext.Provider>
    );
};

export default App;
