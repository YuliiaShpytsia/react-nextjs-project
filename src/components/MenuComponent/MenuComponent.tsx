'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import styles from './MenuComponent.module.css';
import { getAuthUser } from '@/services/api.service'; // Імпортуємо ваш сервіс
import { logout } from '@/services/auth.service';

const Menu: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [userImage, setUserImage] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuthentication = () => {
            const token = localStorage.getItem("token");
            setIsAuthenticated(!!token); // Якщо токен є, то аутентифікований
            if (token) {
                fetchUserData();
            } else {
                setUsername(null);
                setUserImage(null);
            }
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

    const fetchUserData = async () => {
        try {
            const userData = await getAuthUser();
            setUsername(userData.username);
            setUserImage(userData.image);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
        setUsername(null);
        setUserImage(null);
        router.push('/');
    };

    return (
        <nav className={styles.menu}>
            <ul>
                {isAuthenticated ? (
                    <>
                        <li><Link href="/">Головна</Link></li>
                        <li><Link href="/recipes">Рецепти</Link></li>
                        <li><Link href="/users">Користувачі</Link></li>
                        <li>
                            <div className={styles["user-logo"]}>
                                {userImage ? (
                                    <img src={userImage} alt={username || 'Користувач'} />
                                ) : (
                                    <div className={styles.placeholder}>Логотип</div>
                                )}
                                <span>{username}</span>
                            </div>
                        </li>
                        <li>
                            <button onClick={handleLogout} className={styles.logoutButton}>Вийти</button>
                        </li>
                    </>
                ) : (
                    <li><Link href="/auth">Аутентифікація</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Menu;
