import React, { useEffect, useState } from "react";
import API from '../../axiosconfig';

function EditProfile() {
  const [userData, setUserData] = useState(null);

  const [fullName, setFullName] = useState("");
  const [profilepic, setProfilepic] = useState("");
  const [tags, setTags] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/auth/me', { withCredentials: true });
        const user = res.data.user;
        setUserData(user);
        setFullName(user.fullName || "");
        setProfilepic(user.profilePic || "");
        setTags(user.tags || "");
        setGender(user.gender || "");
        setBio(user.bio || "");
        setLocation(user.location || "");
        setAge(user.age || "");
      }catch (err) {
            if (err.response && (err.response.status === 400 || err.response.status === 401 || err.response.status === 402 || err.response.status === 403)) {
              alert("Invalid : " + err.response.data.message);
          } 
          else {
            alert("Something went wrong. Please try again.");
            console.error("Server error:", err);
          }
        }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      fullName,
      gender,
      location,
      age,
      profilePic: profilepic,
      tags,
      bio,
    };

    try {
      const res = await API.post("/auth/editme", formData);
      alert("Profile updated successfully!");
      console.log("Updated user:", res.data.users);
    }catch (err) {
            if (err.response && (err.response.status === 400 || err.response.status === 401 || err.response.status === 402 || err.response.status === 403)) {
              alert("Invalid : " + err.response.data.message);
          } 
          else {
            alert("Something went wrong. Please try again.");
            console.error("Server error:", err);
          }
        }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '600px',
        margin: '5vh auto',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#EF0D00',
          fontWeight: 'bold',
          fontSize: '1.8rem',
        }}
      >
        Edit Profile
      </h2>

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="form-control"
        style={{ marginBottom: '1rem' }}
      />

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        required
        className="form-control"
        style={{ marginBottom: '1rem' }}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
        className="form-control"
        style={{ marginBottom: '1rem' }}
      />

      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
        className="form-control"
        style={{ marginBottom: '1rem' }}
        onWheel={(e) => e.target.blur()}
      />

      <input
        type="text"
        placeholder="Profile Picture URL"
        value={profilepic}
        onChange={(e) => setProfilepic(e.target.value)}
        className="form-control"
        style={{ marginBottom: '1rem' }}
      />

      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="form-control"
        style={{ marginBottom: '1rem' }}
      />

      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows="3"
        className="form-control"
        style={{ marginBottom: '1.5rem', resize: 'none' }}
      />

      <button
        type="submit"
        className="btn btn-danger btn-block"
        style={{
          width: '100%',
          padding: '0.75rem',
          fontWeight: 'bold',
          fontSize: '1rem',
          borderRadius: '8px',
        }}
      >
        Update Profile
      </button>
    </form>
  );
}

export default EditProfile;