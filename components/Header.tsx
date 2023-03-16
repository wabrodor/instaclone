import styles from "@/styles/Header.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { BiMessageAltAdd } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {useRecoilState} from "recoil"
import { modalState } from "@/atoms/modalAtom";

export default function Header({ data }) {
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState)
 

  return (
    <section className={styles.wrapper}>
      {/* logo */}
      <div className={styles.logo}>
        <h3>HELTICA</h3>
      </div>

      {/* searchbar */}

      <div className={styles.searchbar}>
        <AiOutlineSearch className={styles.searchIcon} />
        <input type="text" placeholder="Search.." />
      </div>

      <div className={styles.iconBar}>
        <AiFillHome className={styles.icons} onClick={() => router.push("/")} />

        <>
          <BiMessageAltAdd  onClick={() => setOpen(true)}
          className={`${styles.icons} ${styles.active}`} />
          <AiOutlineHeart className={styles.icons} />
          <img
            src={data.user.image}
            alt="logo"
            className={styles.profile}
            width="30"
            height="30"
            onClick={() => signOut()}
          />
        </>
      </div>
    </section>
  );
}
