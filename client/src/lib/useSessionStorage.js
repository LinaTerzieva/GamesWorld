import { useState } from "react";

const useSessionStorage = (key, defaultValue) => {

    const [value, setValue] = useState(() => {

        const storedData = sessionStorage.getItem(key);

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