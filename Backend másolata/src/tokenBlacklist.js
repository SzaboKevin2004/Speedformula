class TokenBlacklist {
    constructor() {
        this.blacklist = new Map();
        this.cleanupInterval = 1000 * 60 * 60; 
        setInterval(() => this.cleanupExpired(), this.cleanupInterval);
    }

    add(token) {
        const expirationTime = Date.now() + 1000 * 60 * 60 * 12; // 12 hours from now
        this.blacklist.set(token, expirationTime);
    }

    has(token) {
        if (!this.blacklist.has(token)) {
            return false;
        }
        const expirationTime = this.blacklist.get(token);
        if (Date.now() > expirationTime) {
            this.blacklist.delete(token);
            return false;
        }
        return true;
    }

    remove(token) {
        this.blacklist.delete(token);
    }

    clear() {
        this.blacklist.clear();
    }

    cleanupExpired() {
        const now = Date.now();
        for (const [token, expirationTime] of this.blacklist.entries()) {
            if (now > expirationTime) {
                this.blacklist.delete(token);
            }
        }
    }
}

export const tokenBlacklist = new TokenBlacklist();