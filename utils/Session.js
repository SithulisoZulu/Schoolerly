import { route } from "../routers/router.js";
export const user = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    if(!user)
    {
        sessionStorage.clear();
        window.location.href = route.loginPageUrl;
        throw new Error("No User Found");
    };

    return user.email;
}

export const userData = () => {
    
    const user = JSON.parse(sessionStorage.getItem('user'));

    if(!user)
    {
        sessionStorage.clear();
        window.location.href = route.loginPageUrl;
        throw new Error("No User Found");
    };

    return user;
}