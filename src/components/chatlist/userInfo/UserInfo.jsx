import "./userInfo.css";

function UserInfo() {
  return (
    <div className="userInfo">
      <div className="user">
        <img src="./avatar.png"></img>
        <h3>Dhruv Parmar</h3>
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
