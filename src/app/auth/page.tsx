'use client';

import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";
import AuthComponent from "@/components/AuthComponent/AuthComponent";

const AuthPage = () => {
    const router = useRouter();

    const handleLogin = async (username: string, password: string) => {
        try {
            await login(username, password);  // Не зберігаємо користувача, якщо він не потрібен
            router.push("/users");
        } catch (error) {
            console.log(error);
            alert("Помилка входу");
        }
    };
    return (
        <div>
            <AuthComponent onLogin={handleLogin} />
        </div>
    );
    };
export default AuthPage;