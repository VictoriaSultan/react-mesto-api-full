const BASE_URL = "https://api.mesto.gramr.ru";

const _checkResponse = (res) => {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then(_checkResponse);
};

const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
  .then(_checkResponse);
};

const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        }
    })
    .then(_checkResponse);
};

export { BASE_URL, register, authorize, checkToken };