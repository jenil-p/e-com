export const SESSION_DURATION = 5 * 60 * 1000; // 5 minutes

export const createSession = (user) => {
    return {
        user,
        expiresAt: Date.now() + SESSION_DURATION
    };
};

export const isSessionValid = (session) => {
    if (!session) return false;
    return Date.now() < session.expiresAt;
};