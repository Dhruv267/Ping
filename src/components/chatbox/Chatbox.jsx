import { useState, useEffect, useRef } from "react";
import "./chatbox.css";
import EmojiPicker from "emoji-picker-react";

function Chatbox() {
  const [showPicker, setShowPicker] = useState(false);
  const [position, setPosition] = useState({ x: 850, y: 400 });
  const pickerRef = useRef(null);
  const dragRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [inputText, setInputText] = useState("");
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

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
          <img src="./avatar.png"></img>
          <div className="texts">
            <span className="UserName">Monil Shah</span>
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
        <div className="message">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <div className="texts">
            <p>
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
              commodo consequat.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="message">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://img.freepik.com/premium-photo/colorful-flower-with-green-leaf_1028782-202406.jpg"></img>
            <p>Lorem ipsum dolor sit amet.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <div className="texts">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png"></img>
          <img src="./camera.png"></img>
          <img src="./mic.png"></img>
        </div>
        <input
          className="inputText"
          placeholder="Type here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
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
        <button className="sendButton">Send ➤</button>
      </div>
    </div>
  );
}

export default Chatbox;
