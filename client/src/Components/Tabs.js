import { useEffect, useState } from "react";
import { Button } from "../Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import { Label } from "../Components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../Components/ui/tabs";
import { atom, useAtom } from "jotai";
import { updateNotification } from "./Popover";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess, signOut } from "../redux/user/userSlice";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const showDashboard = atom(false);
export default function TabsDemo({ turnOffSettings }) {
  const [user, setUser] = useState();
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const [dashboardAtom, setDashboardAtom] = useAtom(showDashboard);
  const [errorWarn, setErrorWarn] = useState("");
  const [updateNotificationAtom, setUpdateNotificationAtom] =
    useAtom(updateNotification);
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // console.log("currentUser", currentUser);

  useEffect(() => {
    setUserProfile(currentUser);
  }, [currentUser]);

  // console.log(details);

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      setUser(data);
      if (!res.ok) {
        setErrorWarn(data.message);
      } else {
        toast.success("Registered Successfully");
        turnOffSettings();
        setUser(data);
        setDashboardAtom(data.isAdmin);
        localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
        dispatch(signInSuccess(data));
        // localStorage.setItem("userData", JSON.stringify(data));
        setErrorWarn("");
        setDetails({
          password: "",
          username: "",
        });
      }

      setUpdateNotificationAtom((prev) => !prev);
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorWarn(data.message);
      } else {
        toast.success("Successfully logged in");
        turnOffSettings();
        setUser(data);
        setDashboardAtom(data.isAdmin);
        localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
        // localStorage.setItem("userData", JSON.stringify(data));
        dispatch(signInSuccess(data));
        setErrorWarn("");
        setDetails({
          password: "",
          username: "",
        });
      }

      setUpdateNotificationAtom((prev) => !prev);
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };

  function handleLogout() {
    navigate("/");
    toast.success("Successfully logged out");
    dispatch(signOut());
  }

  // console.log("user", user);
  return (
    <Tabs
      defaultValue={currentUser ? "account" : "register"}
      className=" w-[300px] md:w-[400px] shadow-md rounded-md"
    >
      <TabsList
        onClick={() => {
          setDetails({
            password: "",
            username: "",
          });
          setErrorWarn("");
        }}
        className={`grid w-full ${currentUser ? "grid-cols-1" : "grid-cols-2"}`}
      >
        {!currentUser && <TabsTrigger value="register">Register</TabsTrigger>}
        {!currentUser && <TabsTrigger value="login">Login</TabsTrigger>}
        {currentUser && <TabsTrigger value="account">Account</TabsTrigger>}
      </TabsList>
      <TabsContent value="register" className="">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Fill the details as per mentioned</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input
                label="Username"
                id="username"
                type={"text"}
                value={details.username}
                onChange={(e) =>
                  setDetails((prev) => ({
                    ...prev,
                    [e.target.id]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-1">
              <Input
                id="password"
                type="password"
                label={"Password"}
                value={details.password}
                onChange={(e) =>
                  setDetails((prev) => ({
                    ...prev,
                    [e.target.id]: e.target.value,
                  }))
                }
              />
            </div>
            {errorWarn && (
              <h1 className="text-red-600 bg-red-500/30 p-2 rounded-md">
                {errorWarn}
              </h1>
            )}
          </CardContent>
          <CardFooter>
            <Button className="" onClick={handleRegister}>
              Register
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Already a registered User, Login</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input
                label="Username"
                id="username"
                type={"text"}
                value={details.username}
                onChange={(e) =>
                  setDetails((prev) => ({
                    ...prev,
                    [e.target.id]: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-1">
              <Input
                id="password"
                type="password"
                label={"Password"}
                value={details.password}
                onChange={(e) =>
                  setDetails((prev) => ({
                    ...prev,
                    [e.target.id]: e.target.value,
                  }))
                }
              />
            </div>
            {errorWarn && (
              <h1 className="text-red-600 bg-red-500/30 p-2 rounded-md">
                {errorWarn}
              </h1>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      {currentUser && (
        <TabsContent value="account" className="">
          <Card>
            <CardHeader>
              <CardTitle>Hello, {userProfile?.username}</CardTitle>
              <CardDescription>Hope to see you again!</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="" onClick={handleLogout}>
                Log Out
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      )}
    </Tabs>
  );
}
