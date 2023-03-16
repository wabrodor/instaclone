import MiniProfile from "./MiniProfile"
import Suggestions from "./Suggestions"
import styles from"@/styles/Sidebar.module.css"

export default function Sidebar({data : session}) {
  return (
    <div className={styles.wrapper}>
      <MiniProfile key={1} data = {session} />
      <h3>Suggestion for you</h3>
      <Suggestions />
    </div>
  );
}
