
import useAuthenticationApi from './useAuthenticationApi';
import AuthenticationContext from './AuthenticationContext'
import useLocalStorage from './useLocalStorage';

export const AuthenticationProvider = ({ children }) => {
    const [auth, setAuth] = useLocalStorage("auth", {
        id: '',
        username: '',
        accessToken: '',
        errorCode: '',
        errorMessage: '',
        isError: false
    });

    const { login, logout } = useAuthenticationApi();

    const loginUser = (username, password) => login(username, password)
        .then((data) => {
            if (data.code === 403) {
                setAuth({
                    errorCode: 403,
                    errorMessage: data.message,
                    isError: true
                });
            } else {
                setAuth({
                    id: data._id,
                    username: data.username,
                    accessToken: data.accessToken
                });
            }
        })
        .catch((error) => {
            setAuth({
                isError: true
            })
        });

    const logoutUser = () => logout(auth.accessToken)
        .then((data) => {
            setAuth({
                id: '',
                username: '',
                accessToken: '',
                errorCode: '',
                errorMessage: '',
                isError: false
            });
        })
        .catch((error) => {
            setAuth({
                isError: true
            })
        });

    return (
        <AuthenticationContext.Provider value={{ auth, loginUser, logoutUser }}>
            {children}
        </AuthenticationContext.Provider>
    );
};