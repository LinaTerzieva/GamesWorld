import useHeaders from "./useHeaders";

const useUserApi = () => {

    const { getHeaders } = useHeaders();

    const login = (username, password) => {
        return fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password }),
        })
            .then((response) => response.json())
    }

    const register = (username, password, firstName, lastName) => {
        return fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password: password, firstName: firstName, lastName: lastName }),
        })
            .then((response) => response.json())
    }

    const logout = (token) => {
        return fetch('http://localhost:3030/users/logout', {
            method: 'GET',
            headers: getHeaders({})
        })
    }

    const getUserInfo = (token) => {
        return fetch('http://localhost:3030/users/me', {
            method: 'GET',
            headers: getHeaders(
                {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            )
        })
            .then(response => response.json())
    }

    return { login, register, logout, getUserInfo };
}

export default useUserApi;