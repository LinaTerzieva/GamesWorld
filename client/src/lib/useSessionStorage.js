import { useState } from "react";

const useSessionStorage = (key, defaultValue) => {

    const [value, setValue] = useState(() => {

        const storedData = sessionStorage.getItem(key);

        if (storedData != null) {

            const now = new Date();
            let expiration = JSON.parse(storedData).expiration;

            if (now.getTime() > expiration) {
                sessionStorage.removeItem(key);
                return defaultValue;
            }

        }

        return storedData ? JSON.parse(storedData) : defaultValue;
    });

    const setSessionStorageValue = (newValue) => {
        sessionStorage.setItem(key, JSON.stringify(newValue));

        setValue(newValue);
    }

    return [
        value,
        setSessionStorageValue
    ]

}

export default useSessionStorage;