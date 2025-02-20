'use client';
import { useState, useEffect } from "react";
import styles from "./HomeComponent.module.css";

// Функція для перевірки аутентифікації
const checkAuth = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token") !== null;
    }
    return false;
};

const HomeComponent: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuthentication = () => {
            setIsAuthenticated(checkAuth());
        };

        checkAuthentication();

        const handleStorageChange = () => {
            checkAuthentication();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div
            className={`${styles.message} ${
                isAuthenticated ? styles.authenticated : styles.unauthenticated
            }`}
        >
            {isAuthenticated
                ? "Ласкаво просимо, ви успішно залогінені!"
                : "Вам потрібно аутентифікуватися, щоб отримати доступ до всіх функцій."}
        </div>
    );
};

export default HomeComponent;