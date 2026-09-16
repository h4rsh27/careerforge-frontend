import { createContext, useContext, useEffect, useState } from "react";
import {
    getCurrentUser,
    loginUser,
    registerUser,
} from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("careerforge_token");

        if (!token) {
            setLoading(false);
            return;
        }

        getCurrentUser()
            .then((data) => {
                setUser(data);
            })
            .catch(() => {
                localStorage.removeItem("careerforge_token");
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    const login = async (email, password) => {

        const data = await loginUser({
            email,
            password,
        });

        localStorage.setItem(
            "careerforge_token",
            data.token
        );

        setUser(data.user);

        return data;
    };

    const register = async (userData) => {
        return await registerUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("careerforge_token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};