import UserService from "@/services/user.service.js";
import { useEffect, useState } from "react";

function useUserInfo() {
    const [userInfo, setUserInfo] = useState(null);

    const isAuthenticated = UserService.isAuthenticated();

    useEffect(() => {
        UserService.getUserInfo().then(result => {
            setUserInfo(result.data)
        })
    }, [isAuthenticated])

    return userInfo
}

export default useUserInfo