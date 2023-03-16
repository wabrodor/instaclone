import styles from "@/styles/Sidebar.module.css";
import { signOut } from "next-auth/react";

export default function MiniProfile({data}) {

  const username:string = data?.user.name
          .split(" ")
          .join("")
          .toLowerCase()

  return (
    <div className={styles.miniprofile}>
      <img src={data.user.image} alt="" />
      <div className={styles.miniText}>
        <p className={styles.userHeader}>{`@${username}`}</p>
        <p>{`Welcome to ${"Hveltica".toUpperCase() + " " + username}`}</p>
      </div>
      <span onClick={() => signOut()}>Sign out</span>
    </div>
  );
}
