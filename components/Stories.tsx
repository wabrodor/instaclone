import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import Story from "./Story";
import styles from "@/styles/Stories.module.css"

export default function Stories() {
  const [suggestions, setSuggetions] = useState([]);

  function createRandomUser() {
    return {
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    };
  }


  useEffect(() => {

    if (suggestions.length) return;
      const generatedUser = () => {
        let users = [];
        while (users.length < 15) {
          users.push(createRandomUser());
        }
        return users;
      };
    setSuggetions(generatedUser());
  }, []);

  

  return (
    <div>
      <div className= {styles.wrapper}>

      {suggestions.map((profile) => {
        return (
          <Story 
          key={profile.userId}
          img={profile.avatar}
          username={profile.username}
          />
          );
        })}
        </div>
    </div>
  );
}
