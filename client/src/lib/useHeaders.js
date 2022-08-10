import useLocalStorage from "./useLocalStorage"

const useHeaders = () => {

    const [user] = useLocalStorage("auth");    

    const getHeaders = (headers) => {

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