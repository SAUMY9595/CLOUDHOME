import { useDispatch } from "react-redux";
import { appLogin } from "../store/slices/authSlice";

const useLogin = () => {
    const dispatch = useDispatch();

    const login = async ({ email, password }) => {
        try {
            const res = await fetch(`http://localhost:1400/api/v1/auth/login`, {
                //whenever we are copying 
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "content-type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);
            if (data.status === "success") {
                dispatch(appLogin(data));
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Login error: " + err.message);
        }
    };
    return { login };
};

export default useLogin;