import "./chatlist.css";
import List from "./list/List";
import UserInfo from "./userInfo/UserInfo";

function Chatlist() {
  return (
    <div className="chatlist">
      <UserInfo />
      <List />
    </div>
  );
}

export default Chatlist;
