import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Header from "../components/header";
import UserProfile from "../components/profile";
import * as ROUTES from "../constants/routes";
import { getUserByUsername } from "../services/firebase";

export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const doesUserExists = await getUserByUsername(username);
      if (doesUserExists.length > 0) {
        setUser(doesUserExists[0]);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
  }, [history, username]);

  console.log(user);
  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
