import { useState } from "react";

function useLocalStorage<T>(key: string, defaultValue: T): [T, (newValue: T) => void]{

    const [value, setValue] = useState<T>(() => {

        const storedData = localStorage.getItem(key);

        return storedData ? JSON.parse(storedData) : defaultValue;
    });

    const setLocalStorageValue = (newValue: T): void => {
        localStorage.setItem(key, JSON.stringify(newValue));

        setValue(newValue);
    };

    
    return [
        value,
        setLocalStorageValue
    ]
}

export default useLocalStorage;