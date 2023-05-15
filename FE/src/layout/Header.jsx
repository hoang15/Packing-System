import headerStyle from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import useUserInfo from "@/hooks/useUserInfo.js";
import UserService from "@/services/user.service.js";
import avt from "../assets/img_avatar.png";
function Header() {
  const navigate = useNavigate();
  const userInfo = useUserInfo();

  const goToSignIn = () => {
    navigate("/sign-in");
  };

  const goToSignUp = () => {
    navigate("/sign-up");
  };

  const signOut = async () => {
    await UserService.signOut();
    location.reload();
  };

  return (
    <div className={headerStyle["Header"]}>
      <div className={headerStyle["header-inner"]}>
        <div>
          <NavLink to={"/"} style={{ textDecoration: "none" }}>
            Parking System
          </NavLink>
        </div>
        {userInfo ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div class={headerStyle["profile-details"]}>
              <img src={avt} alt="" />
              <span class={headerStyle["admin_name"]}>{userInfo.email}</span>
            </div>
            <button
              className={headerStyle["out"]}
              onClick={signOut}
              style={{ marginLeft: "10px" }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div>
            <button
              className={headerStyle["reg"]}
              style={{ marginRight: "10px" }}
              onClick={goToSignUp}
            >
              Sign up
            </button>
            <button className={headerStyle["log"]} onClick={goToSignIn}>
              Sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
