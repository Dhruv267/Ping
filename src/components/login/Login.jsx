import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, storage } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

function Login() {
  const [formEntry, setFormEntry] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleEntry = (e) => {
    const { name, value } = e.target;
    setFormEntry({ ...formEntry, [name]: value });
  };

  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    if (email == "") {
      setLoading(false);
      toast.error("Please Enter Email");
    } else if (password == "") {
      setLoading(false);
      toast.error("Please Enter Password");
    } else {
      try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login Sucessful.");
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    if (username == "") {
      setLoading(false);
      toast.error("Please Enter valid Username.");
    } else if (email == "") {
      toast.error("Please Enter Email");
      setLoading(false);
    } else if (password == "") {
      toast.error("Please Enter Password");
    } else if (avatar.url == "") {
      setLoading(false);
      toast.error("Please upload a profile picture.");
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const imgUrl = await upload(avatar.file);
        await setDoc(doc(db, "users", res.user.uid), {
          username,
          email,
          avatar: imgUrl,
          id: res.user.uid,
          blocked: [],
        });
        await setDoc(doc(db, "userChats", res.user.uid), {
          chats: [],
        });
        toast.success("Account Successfully Created! You can Log  In now.");
        setFormEntry({
          avatar: "./avatar.png",
          username: "",
          email: "",
          password: "",
        });
        setAvatar({
          file: null,
          url: "",
        });
        await auth.signOut();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="login">
      <div className="item">
        <div className="heading">
          <h4>Welcome Back!</h4>
          <h1>Log In Here 👇</h1>
        </div>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" name="password" placeholder="Password" />
          <button disabled={loading}>{loading ? "Loading" : "Log In"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <div className="heading">
          <h4>New to Ping? </h4>
          <h1>Sign Up here 👇</h1>
        </div>
        <form onSubmit={handleSignUp}>
          <label htmlFor="file">
            <img src={avatar.url ? avatar.url : "./avatar.png"} alt="" />
            Upload Profile Picture
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formEntry.username}
            onChange={handleEntry}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formEntry.email}
            onChange={handleEntry}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleEntry}
            value={formEntry.password}
          />
          <button disabled={loading}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
