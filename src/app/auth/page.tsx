'use client';

import { useRouter } from "next/navigation";

import { login } from "@/services/auth.service";
import AuthComponent from "@/components/AuthComponent/AuthComponent";

const AuthPage = () => {
    const router = useRouter();

    const handleLogin = async (username: string, password: string) => {
        try {
            const user = await login(username, password);
            router.push("/users");
        } catch (error) {
            alert("Помилка входу");
        }
    };

    return <AuthComponent onLogin={handleLogin} />;
};

export default AuthPage;