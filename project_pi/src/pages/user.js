import React from "react";
import "./user.css";
import ProfilePicture from "./sample_user.jpg";

// sample user data
const userData = {
//   avatar: "https://bootdey.com/img/Content/avatar/avatar7.png",
  avatar: ProfilePicture,
  name: "John Doe",
  title: "Full Stack Developer",
  location: "Bay Area, San Francisco, CA",
  website: "https://bootdey.com",
  github: "bootdey",
  twitter: "@bootdey",
  instagram: "bootdey",
  facebook: "bootdey",
  email: "fip@jukmuh.al",
  phone: "(239) 816-9029",
  mobile: "(320) 380-4539",
  address: "Bobst Library, New York, NY 10012",
  assignments: [
    { name: "Web Design", value: 70 },
    { name: "Website Markup", value: 50 },
    { name: "One Page", value: 60 },
    { name: "Mobile Template", value: 40 },
    { name: "Backend API", value: 30 },
  ],
};

function UserProfile() {
  return (
    <div className="user-container">
      {/* page title */}
      <div className="breadcrumb">
        <h2>Home / User / User Profile</h2>
      </div>

      <div className="user-main">
        {/* left side */}
        <div className="user-left">
          <div className="user-avatar-section">
            <img
            //   src={userData.avatar}
              src={ProfilePicture}
              alt="User Avatar"
              className="user-avatar"
            />
            <h3>{userData.name}</h3>
            <p>{userData.title}</p>
            <p>{userData.location}</p>
            <div className="user-actions">
              <button className="btn-follow">Follow</button>
              <button className="btn-message">Message</button>
            </div>
          </div>

          <div className="user-social">
            <div>
              <strong>Website</strong>
              <p>{userData.website}</p>
            </div>
            <div>
              <strong>Github</strong>
              <p>{userData.github}</p>
            </div>
            <div>
              <strong>Twitter</strong>
              <p>{userData.twitter}</p>
            </div>
            <div>
              <strong>Instagram</strong>
              <p>{userData.instagram}</p>
            </div>
            <div>
              <strong>Facebook</strong>
              <p>{userData.facebook}</p>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="user-right">
          <div className="user-info">
            <h4>Full Name</h4>
            <p>{userData.name}</p>
            <h4>Email</h4>
            <p>{userData.email}</p>
            <h4>Phone</h4>
            <p>{userData.phone}</p>
            <h4>Mobile</h4>
            <p>{userData.mobile}</p>
            <h4>Address</h4>
            <p>{userData.address}</p>
          </div>

          <div className="user-projects">
            <h3> Project Path Status</h3>
            {userData.assignments.map((item, idx) => (
              <div className="progress-container" key={idx}>
                <div className="progress-header">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
