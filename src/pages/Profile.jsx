import React from "react";
import { supabase } from "../utils/SupaClient";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { Button, Spinner } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [imagePreview, setImagePreview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const Profile = () => {
    const [formProfile, setFormProfile] = useState({
      username: "",
      avatar_url: "",
      role: "",
      email: "",
      telephone: 0,
    });
  };

  const handleChange = (e) => {
    setFormEdit({
      ...setImagePreview,
      [e.target.name]: e.target.value,
    });
  };

  const getIdProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", "56e62647-2b67-425e-978d-a8082acb85ea")
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfileData(data);
        console.log(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIdProfile();
    document.getElementById("title").innerHTML = "Profile";
  });

  const handleImage = (e) => {
    setFormEdit({
      ...setImagePreview(e.target.files(0)),
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoadingButton(true);
  };

  return (
    <Layout>
      {loading ? (
        <Spinner className="m-auto" label="Plase Wait..." />
      ) : (
        <section className="py-10 px-40">
          <div className="flex flex-col gap-8 md:flex-row md:gap-16">
            <img
              src={profileData.avatar_url}
              width={400}
              className="object-cover rounded-full"
            />
            <form className="flex flex-col" onSubmit={updateProfile}>
              <label className="mt-3 text-center">
                Username
                <input
                  type="text"
                  name="username"
                  className="form-input rounded-lg w-full"
                  value={profileData.username}
                  onChange={handleChange}
                />
              </label>
              <label className="mt-3 text-center">
                Email
                <input
                  type="email"
                  name="email"
                  className="form-input rounded-lg w-full"
                  value={profileData.email}
                  onChange={handleChange}
                />
              </label>
              <label className="mt-3 text-center">
                Phone Number
                <input
                  type="number"
                  name="telephone"
                  className="form-input rounded-lg w-full"
                  value={profileData.telephone}
                  onChange={handleChange}
                />
              </label>
              <label className="mt-3 text-center">
                Role
                <select
                  name="type"
                  className="form-select rounded-lg w-full"
                  value={profileData.role}
                  onChange={handleChange}
                >
                  <option value="role">Admin</option>
                  <option value="role">User</option>
                </select>
              </label>
              <label className="mt-3 text-center">
                Profile Picture
                <input
                  type="file"
                  name="avatar_url"
                  className="form-input rounded-lg w-full mt-1 "
                  onChange={handleImage}
                />
              </label>
              <div className="flex flex-col gap-2 w-full mt-2 text-center">
                <Button onClick={() => navigate("/")} color="default">
                  Back to Dashboard
                </Button>
                {loadingButton ? (
                  <Button color="warning" disabled>
                    Progress...
                  </Button>
                ) : (
                  <Button color="primary" type="submit">
                    Reupdate
                  </Button>
                )}
              </div>
            </form>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Profile;
