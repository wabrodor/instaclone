
import styles from "@/styles/Stories.module.css"
export default function Story({img, username}) {
  return (
    <div>
      <div className= {styles.userList}>
        <img src= {img} alt= {img} />
        <p>{username}</p>
      </div>
    </div>
  )
}
