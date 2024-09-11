import { createContext, useState } from "react";
import USER_TYPE from "../constants/UserType";

interface UserTypeContextType {
    type: (typeof USER_TYPE)[keyof typeof USER_TYPE];
    changeUserType: (userType: (typeof USER_TYPE)[keyof typeof USER_TYPE]) => void;
}

export const UserTypeContext = createContext<UserTypeContextType>({
    type: USER_TYPE.NORMAL,
    changeUserType: () => {},
});

const UserTypeProvider = ({ children }) => {
    const [userType, setUserType] = useState<(typeof USER_TYPE)[keyof typeof USER_TYPE]>(USER_TYPE.NORMAL);

    const changeUserType = (type: (typeof USER_TYPE)[keyof typeof USER_TYPE]) => {
        setUserType(type);
    };

    return <UserTypeContext.Provider value={{ type: userType, changeUserType }}>{children}</UserTypeContext.Provider>;
};

export default UserTypeProvider;
