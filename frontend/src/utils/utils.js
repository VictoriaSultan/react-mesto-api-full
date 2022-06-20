const avatarEditSelector = ".popup_type_edit-avatar";
const profileEditSelector = ".popup_type_edit-profile";
const profileNameSelector = "#profile-name";
const profileAboutSelector = "#profile-about";
const profileAvatarSelector = "#profile-avatar";
const cardAddSelector = ".popup_type_add-card";
const cardRemoveSelector = ".popup_type_remove-card";
const popupShowImageSelector = "#popup-show-image";
const sectionSelector = ".elements";
const elementTemplateSelector = "#element";

const validationSettings = {
    inputSelector: ".popup__textinput",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__textinput_invalid",
    textErrorClass: "popup__text-error_active",
};

const optionsApi = {
    baseUrl: "https://victoria-mesto.nomoreparties.sbs",
    //headers: {
    //  authorization: "30d141e7-4c15-4471-802b-f050ee898489",
    //},
};

export {
    profileEditSelector,
    profileNameSelector,
    profileAboutSelector,
    profileAvatarSelector,
    avatarEditSelector,
    cardAddSelector,
    cardRemoveSelector,
    popupShowImageSelector,
    sectionSelector,
    elementTemplateSelector,
    validationSettings,
    optionsApi
}