import "./chatdetails.css";

function Chatdetails() {
  return (
    <div className="chatdetails">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Monil Shah</h2>
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

        <button>Block User</button>
        <button className="logoutBtn">Logout</button>
      </div>
    </div>
  );
}

export default Chatdetails;
