import { createContext } from "react";
import { AuthContextType } from "./types";

const AuthenticationContext = createContext<AuthContextType | null>(null);

export default AuthenticationContext;