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
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import Input from "./Input";

export const showDashboard = atom(false);
export default function TabsDemo({}) {
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
  const [passwordShow, setPasswordShow] = useState(false);
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
        setUser(data);
        setDashboardAtom(data.isAdmin);
        localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
        dispatch(signInSuccess(data));
        // localStorage.setItem("userData", JSON.stringify(data));
        setErrorWarn("");
      }

      setDetails({
        password: "",
        username: "",
      });
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
        setUser(data);
        setDashboardAtom(data.isAdmin);
        localStorage.setItem("isAdmin", JSON.stringify(data.isAdmin));
        // localStorage.setItem("userData", JSON.stringify(data));
        dispatch(signInSuccess(data));
        setErrorWarn("");
      }
      setDetails({
        password: "",
        username: "",
      });
      setUpdateNotificationAtom((prev) => !prev);
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };

  // console.log("user", user);
  return (
    <Tabs defaultValue="register" className="w-[300px] md:w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="register">Register</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Fill the details as per mentioned</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input
                label="username"
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
                label={"password"}
                value={details.password}
                onChange={(e) =>
                  setDetails((prev) => ({
                    ...prev,
                    [e.target.id]: e.target.value,
                  }))
                }
              />
            </div>
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
                label="username"
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
                label={"password"}
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
    </Tabs>
  );
}
