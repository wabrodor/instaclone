import Stories from "./Stories";
import Posts from "./Posts"
import Sidebar from "./Sidebar";
import styles from "@/styles/Feed.module.css"
export default function Feed({data : session}) {
  return (
    <div>
      <main className={styles.wrapper}>
        <div className={styles.item1}>
          <Stories />
          <Posts key="2" data={session} />
        </div>
        <div className={styles.item2}>
          <Sidebar key="1" data={session} />
        </div>
      </main>
    </div>
  );
}
