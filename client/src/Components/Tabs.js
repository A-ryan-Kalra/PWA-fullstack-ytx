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
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../Components/ui/tabs";
import { atom, useAtom } from "jotai";
import { updateNotification } from "./Popover";

export const showDashboard = atom(false);
export default function TabsDemo() {
  const [user, setUser] = useState();
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const [dashboardAtom, setDashboardAtom] = useAtom(showDashboard);
  const [errorWarn, setErrorWarn] = useState("");
  const [updateNotificationAtom, setUpdateNotificationAtom] =
    useAtom(updateNotification);
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
        localStorage.setItem("userData", JSON.stringify(data));
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
        localStorage.setItem("userData", JSON.stringify(data));

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

  console.log("user", user);
  return (
    <Tabs defaultValue="account" className="w-[300px] md:w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Register</TabsTrigger>
        <TabsTrigger value="password">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Fill the details as per mentioned</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
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
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Already a registered User, Login</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={details.password}
                type="password"
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
