import React from "react";
import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";

export default function Sidebar() {
  const {
    user: { username, userId, fullName, following, docId },
  } = useUser();

  return (
    <div className="px-4">
      <User username={username} fullName={fullName} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}
