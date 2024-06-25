import { useState, useEffect, useRef } from "react";
import "./chatbox.css";
import EmojiPicker from "emoji-picker-react";
import {
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";

function Chatbox() {
  const [chat, setChat] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [position, setPosition] = useState({ x: 850, y: 400 });
  const pickerRef = useRef(null);
  const dragRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [inputText, setInputText] = useState("");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const endRef = useRef(null);
  const { chatId, user, isCurrentUserBlocked, isRecieverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unsub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setInputText((prev) => prev + e.emoji);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSend = async (e) => {
    if (inputText === "" && img.file == null) return;

    let imgUrl = null;

    try {
      if (img.url) {
        imgUrl = await upload(img.file);
      }
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          inputText,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userChats", id);
        const useChatsSnapshot = await getDoc(userChatsRef);
        if (useChatsSnapshot.exists()) {
          const userChatsData = useChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          (userChatsData.chats[chatIndex].lastMessage = inputText),
            (userChatsData.chats[chatIndex].isSeen =
              id === currentUser.id ? true : false),
            (userChatsData.chats[chatIndex].updatedAt = Date.now()),
            await updateDoc(userChatsRef, {
              chats: userChatsData.chats,
            });
        }
      });
    } catch (err) {
      console.log(err);
    }
    setImg({
      img: null,
      url: "",
    });
    setInputText("");
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div className="chatbox">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"}></img>
          <div className="texts">
            <span className="UserName">{user?.username}</span>
            <p>Available.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png"></img>
          <img src="./video.png"></img>
          <img src="./info.png"></img>
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map((message, index) => (
          <div
            className={
              message.senderId === currentUser.id ? "message own" : "message"
            }
            key={index}
          >
            <div className="texts">
              {message.img && <img src={message.img}></img>}
              {message.inputText && <p>{message.inputText}</p>}
              {/*<span>1 min ago</span>*/}
            </div>
          </div>
        ))}

        {img.url && (
          <div className="message own">
            <div className="text">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}

        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png"></img>
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img src="./camera.png"></img>
          <img src="./mic.png"></img>
        </div>
        <input
          className="inputText"
          placeholder="Type here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isCurrentUserBlocked || isRecieverBlocked}
        ></input>
        <div className="emoji">
          <img
            src="./emoji.png"
            onClick={() => setShowPicker((prev) => !prev)}
          ></img>
          {showPicker && (
            <div
              ref={pickerRef}
              className="emoji-picker-wrapper"
              style={{ top: position.y, left: position.x }}
            >
              <div
                ref={dragRef}
                className="emoji-picker-drag"
                onMouseDown={handleMouseDown}
              >
                Drag Here
              </div>
              <EmojiPicker open={showPicker} onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
        <button
          className="sendButton"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isRecieverBlocked}
        >
          Send ➤
        </button>
      </div>
    </div>
  );
}

export default Chatbox;
