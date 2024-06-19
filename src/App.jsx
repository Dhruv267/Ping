import Chatbox from "./components/chatbox/Chatbox";
import Chatlist from "./components/chatlist/Chatlist";
import Chatdetails from "./components/chatdetails/Chatdetails";
const App = () => {
  return (
    <div className="container">
      <Chatlist />
      <Chatbox />
      <Chatdetails />
    </div>
  );
};

export default App;
