import { createContext, useState, useEffect } from "react";
import { getUsers, saveUsers, saveSession, getSession, clearSession } from "../utils/storage";
import { createSession, isSessionValid } from "../utils/session";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const session = getSession();

        if (session && isSessionValid(session)) {
            setUser(session.user);
        } else {
            clearSession();
        }

        setLoading(false);

    }, []);

    const register = (name, email, password) => {

        const users = getUsers();

        const exists = users.find(u => u.email === email);

        if (exists) {
            return { success: false, message: "this user already exists!" };
        }

        const newUser = { name, email, password };

        users.push(newUser);

        saveUsers(users);

        return { success: true };
    };

    const login = (email, password) => {

        const users = getUsers();

        const found = users.find(
            u => u.email === email && u.password === password
        );

        if (!found) {
            return { success: false, message: "Invalid creds...!" };
        }

        const session = createSession(found);

        saveSession(session);

        setUser(found);

        return { success: true };
    };

    const logout = () => {
        clearSession();
        setUser(null);
    };

    const updateProfile = (name, email, password) => {

        const users = getUsers();

        const updatedUsers = users.map(u => {
            if (u.email === user.email) {
                return {
                    name,
                    email,
                    password
                };
            }
            return u;
        });

        saveUsers(updatedUsers);

        const updatedUser = { name, email, password };

        const session = createSession(updatedUser);
        saveSession(session);

        setUser(updatedUser);

        return { success: true };
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                updateProfile,
                register,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};