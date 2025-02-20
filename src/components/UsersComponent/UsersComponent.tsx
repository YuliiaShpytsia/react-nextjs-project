'use client'
import { useEffect, useState } from "react";
import { getUsers } from "@/services/api.service";
import { IResponseUsers } from "@/models/IResponseUser";
import { IUser } from "@/models/IUser";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import styles from "./UsersComponent.module.css"; // Імпортуємо модуль CSS

const UsersComponent = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [page] = useState<number>(1);
    const [error, setError] = useState<string>("");

    const fetchUsers = async (page: number) => {
        setLoading(true);
        try {
            const data: IResponseUsers = await getUsers(String(page));
            setUsers(data.users);
            setTotalUsers(data.total);
            setError("");
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Error fetching users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Users List</h1>
            {error && <p className={styles.error}>{error}</p>}
            {loading ? (
                <p className={styles.loading}>Loading...</p>
            ) : (
                <>
                    <ul className={styles.userList}>
                        {users.map((user) => (
                            <li key={user.id} className={styles.userItem}>
                                <a href={`/users/${user.id}`}>{user.firstName} {user.lastName}</a>
                                <p>{user.email}</p>
                                <hr />
                            </li>
                        ))}
                    </ul>
                    <PaginationComponent total={totalUsers} />
                </>
            )}
        </div>
    );
};

export default UsersComponent;
