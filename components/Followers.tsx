import styles from "@/styles/Sidebar.module.css"

export default function Followers({img, username, work}) {
  return (
    <div className= {styles.followers}>
        <img src={img} alt="" />
        <p className= {styles.username}>{username} 
        <span>works @ {work}</span></p>
        <button>follow</button>
    </div>
  )
}
