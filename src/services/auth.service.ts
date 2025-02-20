import {IAuthUser} from "@/models/IAuthUser";
import {baseUrl} from "@/constants/urls";


export const login = async (username: string, password: string): Promise<IAuthUser> => {
    try {
        const res = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) throw new Error("Невірний логін або пароль");

        const data: IAuthUser = await res.json();

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("Помилка авторизації:", error);
        throw error;
    }
};

export const refreshToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refreshToken");
    const token = localStorage.getItem("token"); // Треба передати у заголовок

    try {
        const response = await fetch(`${baseUrl}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            }),
        });

        const data = await response.json();
        console.log("🔄 Refresh token response:", data);

        if (!response.ok || !data.accessToken || !data.refreshToken) {
            console.error("Failed to refresh token. Server response:", data);
            return null;
        }

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        console.log("✅ Token refreshed successfully");

        return data.token;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};


export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
};
