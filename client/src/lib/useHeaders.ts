import { Auth } from "./types";
import useLocalStorage from "./useLocalStorage"

const useHeaders = () => {

    const [user] = useLocalStorage<Auth>("auth", {
        id: '',
        username: '',
        accessToken: '',
    });    

    const getHeaders = (headers: {}) => {
        
        if(user.accessToken) {
            return {
                ...headers,
                'X-Authorization': `${user.accessToken}`
            }
        }
    
        return headers;
    }

    return { getHeaders }
}

export default useHeaders;