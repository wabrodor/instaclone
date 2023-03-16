import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import styles from "@/styles/Sidebar.module.css"
import Followers from "./Followers";

export default function Suggetions() {

  const [suggestions, setSuggetions] = useState([]);

  function createRandomUser() {
    return {
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      work: faker.company.bs(),
    };
  }


  useEffect(() => {
   if (suggestions.length) return;

  const generatedUser = () => {
    let users = [];
    while (users.length < 10) {
      users.push(createRandomUser());
    }
    return users;
  };
  
    return setSuggetions(generatedUser());

  }, [suggestions]);

  return (
    <div className= {styles.suggestions}>
      {suggestions.map(profile =>{
        return  <Followers key={profile.userId } img={profile.avatar} username={profile.username} work={profile.work}/>
      })}
    </div>
  )
}
