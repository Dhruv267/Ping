import { useState } from "react";
import "./list.css";

function List() {
  const [addImage, setAddImage] = useState(true);
  return (
    <div className="list">
      <div className="search">
        <div className="searchbar">
          <img src="./search.png" alt=" "></img>
          <input placeholder="Search Contacts..."></input>
        </div>
        <img
          src={addImage ? "./plus.png" : "./minus.png"}
          className="add"
          onClick={() => setAddImage(!addImage)}
        ></img>
      </div>
      <div className="items">
        <div className="item">
          <img src="./avatar.png"></img>
          <div className="texts">
            <span>Shweta Shah</span>
            <p>Hello World!</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png"></img>
          <div className="texts">
            <span>Shweta Shah</span>
            <p>Hello World!</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png"></img>
          <div className="texts">
            <span>Shweta Shah</span>
            <p>Hello World!</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png"></img>
          <div className="texts">
            <span>Shweta Shah</span>
            <p>Hello World!</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png"></img>
          <div className="texts">
            <span>Shweta Shah</span>
            <p>Hello World!</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png"></img>
          <div className="texts">
            <span>Shweta Shah</span>
            <p>Hello World!</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png"></img>
          <div className="texts">
            <span>Shweta Shah</span>
            <p>Hello World!</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png"></img>
          <div className="texts">
            <span>Shweta Shah</span>
            <p>Hello World!</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png"></img>
          <div className="texts">
            <span>Shweta Shah</span>
            <p>Hello World!</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png"></img>
          <div className="texts">
            <span>Shweta Shah</span>
            <p>Hello World!</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png"></img>
          <div className="texts">
            <span>Shweta Shah</span>
            <p>Hello World!</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png"></img>
          <div className="texts">
            <span>Shweta Shah</span>
            <p>Hello World!</p>
          </div>
        </div>
        <div className="item">
          <img src="./avatar.png"></img>
          <div className="texts">
            <span>Shweta Shah</span>
            <p>Hello World!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
