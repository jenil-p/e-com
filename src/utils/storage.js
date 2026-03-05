// auth
export const getUsers = () => {
    const users = localStorage.getItem("users");
    if (users) {
        return JSON.parse(users);
    } else {
        return [];
    }
};

export const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};

export const saveSession = (session) => {
    localStorage.setItem("session", JSON.stringify(session));
};

export const getSession = () => {
    const session = localStorage.getItem("session");
    if (session) {
        return JSON.parse(session);
    } else {
        return null;
    }
};

export const clearSession = () => {
    localStorage.removeItem("session");
};


