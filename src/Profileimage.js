const ProfileImage = (props) => {
  return (
    <div className="image-container">
      <div className="image-cropper">
        <img className="profile-image" src={props.image} />
        <p className="name">{props.name}</p>
      </div>
    </div>
  );
};

export default ProfileImage;
