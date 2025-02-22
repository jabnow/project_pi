import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solidrgb(0, 0, 0);
`;

const UploadButton = styled.input`
  margin-top: 10px;
`;

const ProfilePicture = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProfileContainer>
        {/* this is the sample_user.jpg, change at your own will */}
      <Image src={image || "./sample_user.jpg"} alt="Profile" />
      <UploadButton type="file" accept="image/jpeg" onChange={handleImageChange} />
    </ProfileContainer>
  );
};

export default ProfilePicture;
