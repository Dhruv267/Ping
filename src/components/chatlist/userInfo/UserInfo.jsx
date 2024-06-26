import "./userInfo.css";
import { useUserStore } from "../../../lib/userStore";

function UserInfo() {
  const { currentUser } = useUserStore();

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"}></img>
        <h3>{currentUser.username}</h3>
      </div>
      <div className="icon">
        <img src="./more.png"></img>
        <img src="./video.png"></img>
        <img src="./edit.png"></img>
      </div>
    </div>
  );
}

export default UserInfo;
