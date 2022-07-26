

const useAuthenticationApi = () => {

    const login = (username, password) => {
        return fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}),
        })
        .then((response) => response.json())
    }

    const register = (username, password) => {
        return fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username, password: password}),
        })
        .then((response) => response.json())
    }
            
    return {login, register};
}

export default useAuthenticationApi;