import {IUser} from "@/models/IUser";
import {FC} from "react";
import {IRecipe} from "@/models/IRecipe";
import styles from "./UserComponent.module.css";


type UserPropsType = {
    user: IUser | null,
    recipes: IRecipe[]
}

const UserComponent: FC<UserPropsType> = ({user}) => {
    return (
        <div className={styles.userContainer}>
            <h4>User#{user?.id}</h4>
            <h4>{user?.firstName} {user?.lastName}</h4>
            <h4>{user?.username}</h4>
            <p className={styles.userInfo}>{user?.email}</p>
            <p className={styles.userInfo}>{user?.phone}</p>
            <p>Age: {user?.age}</p>
            <p>BirthDate: {user?.birthDate}</p>
            <p>Height: {user?.height}</p>
            <p>Weight: {user?.weight}</p>
            <p>Gender: {user?.gender}</p>

        </div>
    );
};

export default UserComponent;