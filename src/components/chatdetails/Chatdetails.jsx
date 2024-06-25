import "./chatdetails.css";
import { auth } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { db } from "../../lib/firebase";
import { doc, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore";

function Chatdetails() {
  const { chatId, user, isCurrentUserBlocked, isRecieverBlocked, changeBlock } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isRecieverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="chatdetails">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Urgent Calls Only!</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowDown.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowDown.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowUp.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoitem">
              <div className="photodetail">
                <img src="https://img.freepik.com/premium-photo/colorful-flower-with-green-leaf_1028782-202406.jpg"></img>
                <span> IMG_2020.jpg</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoitem">
              <div className="photodetail">
                <img src="https://img.freepik.com/premium-photo/colorful-flower-with-green-leaf_1028782-202406.jpg"></img>
                <span> IMG_2020.jpg</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoitem">
              <div className="photodetail">
                <img src="https://img.freepik.com/premium-photo/colorful-flower-with-green-leaf_1028782-202406.jpg"></img>
                <span> IMG_2020.jpg</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoitem">
              <div className="photodetail">
                <img src="https://img.freepik.com/premium-photo/colorful-flower-with-green-leaf_1028782-202406.jpg"></img>
                <span> IMG_2020.jpg</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowDown.png" alt="" />
          </div>
        </div>

        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isRecieverBlocked
            ? "Unblock " + user?.username
            : "Block " + user?.username}
        </button>
        <button className="logoutBtn" onClick={() => auth.signOut()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Chatdetails;
