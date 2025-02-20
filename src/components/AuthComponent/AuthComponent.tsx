'use client';

import { useState } from "react";
import styles from './AuthComponent.module.css';

const AuthComponent = ({ onLogin }: { onLogin: (username: string, password: string) => void }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setError("Заповніть всі поля");
            return;
        }
        setError("");
        onLogin(username, password);
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.inputField}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputField}
                />
                {error && <p className={styles.errorMessage}>{error}</p>}
                <button type="submit" className={styles.button}>
                    Увійти
                </button>
            </form>
        </div>
    );
};

export default AuthComponent;