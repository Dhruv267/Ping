import { useEffect, useState } from "react";
import "./list.css";
import { db } from "../../../lib/firebase";
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import AddUser from "./adduser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { useChatStore } from "../../../lib/chatStore";
import { update } from "firebase/database";

function List() {
  const [chats, setChats] = useState([]);
  const [addImage, setAddImage] = useState(true);
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();

          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex((c) => c.chatId === chat.chatId);
    userChats[chatIndex].isSeen = true;
    const userChatsRef = doc(db, "userChats", currentUser.id);
    try {
      changeChat(chat.chatId, chat.user);
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="list">
      <div className="search">
        <div className="searchbar">
          <img src="./search.png" alt=" "></img>
          <input
            placeholder="Search Contacts..."
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
        </div>
        <img
          src={addImage ? "./plus.png" : "./minus.png"}
          className="add"
          onClick={() => setAddImage(!addImage)}
          alt="Add User to chatList"
        ></img>
      </div>
      <div className="items">
        {filteredChats.map((chat) => (
          <div
            className="item"
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            style={{ backgroundColor: chat.isSeen ? "transparent" : "#5183fe" }}
          >
            <img
              src={
                chat.user.blocked.includes(currentUser.id)
                  ? "./avatar.png"
                  : chat.user.avatar || "./avatar.png"
              }
            ></img>
            <div className="texts">
              <span>
                {chat.user.blocked.includes(currentUser.id)
                  ? "User"
                  : chat.user.username}
              </span>
              <p>
                {chat.lastMessage.length > 29
                  ? chat.lastMessage.substring(0, 29) + "..."
                  : chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
      {!addImage && <AddUser />}
    </div>
  );
}

export default List;
