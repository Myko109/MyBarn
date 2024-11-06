import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Button,
} from "@nextui-org/react";
import { useAuth } from "../../auth/AuthProvider";
import { supabase } from "../../utils/SupaClient";
import { Link, useNavigate } from "react-router-dom";

export default function DropdownUser() {
  const { username, email, user, role } = useAuth();

  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Failed to logged Out!");
    } else {
      alert("Logged Out!");
      window.location.reload();
    }
  };

  // authorizations
  // const { user, role } = useAuth();

  return (
    <div className="flex items-center gap-4">
      {user?.id ? (
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              className="transition-transform"
              description="myko@gmail.com"
              name="Brent Peterson"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Signed in as</p>
              <p className="font-bold">@fufufafa</p>
            </DropdownItem>
            <DropdownItem color="primary" onClick={handleViewProfile}>
              View Profile
            </DropdownItem>

            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <>
          <Link to={"/login"}>
            <Button color="default">Login</Button>
          </Link>
        </>
      )}
    </div>
  );
}
