import ProfileImage from "./Profileimage";
//import Profile from "./Profile";
import Title from "./Title";

import "./styles.css";

const App = () => {
  return (
    <div>
      <div className="profile-image-container">
        <ProfileImage
          image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          name=""
        />
      </div>
      <Title>Vivek Budithi</Title>
    </div>
  );
};

export default App;
