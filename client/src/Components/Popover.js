import { CheckCircleIcon, PlusIcon, XCircleIcon } from "lucide-react";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../Components/ui/popover";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import RequestPermission from "../constants/RequestPermission";
import { atom, useAtom } from "jotai";
import { allowNotification } from "../constants/data";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { getSubscription } from "../getSubscription";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const updateNotification = atom(false);

export function PopoverDemo({ profilePicture, name, endpoint }) {
  const [notificationAtom, setNotificationAtom] = useAtom(allowNotification);
  const [userData, setUserData] = useState();
  const [updateNotificationAtom, setUpdateNotificationAtom] =
    useAtom(updateNotification);
  const [resize, setResize] = useState(false);
  //   const [notification, setNotifications] = useState();
  const now = new Date();
  const formattedDate = format(now, "yyyy-MM-dd hh:mm a");
  const { currentUser } = useSelector((state) => state.user);
  const [details, setDetails] = useState({
    title: "",
    body: "",
    createdAt: formattedDate || "",
  });

  useEffect(() => {
    if (window.innerWidth > 1300) {
      setResize(true);
      // alert("okay");
    } else {
      setResize(false);
    }
    const horizontal = () => {
      if (window.innerWidth > 1300) {
        setResize(true);
        // alert("okay");
      } else {
        setResize(false);
      }
    };
    window.addEventListener("resize", horizontal);
    return () => window.removeEventListener("resize", horizontal);
  }, []);

  useEffect(() => {
    if (!currentUser?.username) {
      console.error("Username does not exit please try to login again!");
      // navigate("/");
    } else {
      setUserData(currentUser);
    }
  }, []);

  const { notificationRequest, data } = RequestPermission();

  const storeDetails = async () => {
    try {
      const res = await fetch("/api/user/save-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          details,
          endpoint,
          receiver: name,
          sender: (userData && userData.username) || "unknown",
        }),
      });
      const data = await res.json();
      toast.success("Notification sent successfully");
      // console.log(data);
      setDetails({
        body: "",
        title: "",
      });
      setUpdateNotificationAtom(!updateNotificationAtom);
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };

  //   console.log("notification ", details);

  return (
    <Popover className="">
      <PopoverTrigger asChild>
        <div className="">
          <TooltipProvider className="">
            <Tooltip>
              <TooltipTrigger asChild>
                {endpoint?.length !== 0 ? (
                  <Button
                    className=" hover:bg-blue-500 gap-1 group text-black flex"
                    variant="outline"
                    onClick={notificationRequest}
                  >
                    <img
                      className={"w-5 h-5 rounded-full"}
                      src={profilePicture}
                      alt={name}
                    />
                    <CheckCircleIcon
                      size={18}
                      className=" text-green-700 group-hover:text-white rounded-full"
                    />
                    {resize && (
                      <TooltipContent
                        className="bg-black border-black border-2 font-semibold"
                        side="left"
                      >
                        <p className=" text-white">
                          {name} is subscribed to recieve notifications
                        </p>
                      </TooltipContent>
                    )}
                  </Button>
                ) : (
                  <Button
                    className=" hover:bg-blue-500 gap-1 group text-black flex"
                    variant="outline"
                    onClick={notificationRequest}
                  >
                    <img
                      className={"w-5 h-5 rounded-full"}
                      src={profilePicture}
                      alt={name}
                    />
                    <XCircleIcon
                      size={18}
                      className=" text-red-700 group-hover:text-white rounded-full"
                    />
                    {resize && (
                      <TooltipContent
                        className="bg-white border-black border-2 font-semibold"
                        side="left"
                      >
                        <p className=" text-black">
                          {name} is not subscribed to recieve notifications
                        </p>
                      </TooltipContent>
                    )}
                  </Button>
                )}
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </div>
      </PopoverTrigger>
      {notificationAtom && (
        <PopoverContent className="z-[1000] w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">{name}</h4>
              {endpoint.length !== 0 && (
                <p className="text-sm text-muted-foreground">
                  Allowed to send or recieve Notification
                </p>
              )}
            </div>
            {endpoint.length !== 0 ? (
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        [e.target.id]: e.target.value,
                        createdAt: formattedDate,
                      }))
                    }
                    value={details?.title}
                    id="title"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="body">Body</Label>
                  <Input
                    id="body"
                    onChange={(e) =>
                      setDetails((prev) => ({
                        ...prev,
                        [e.target.id]: e.target.value,
                        createdAt: formattedDate,
                      }))
                    }
                    value={details?.body}
                    className="col-span-2 h-8"
                  />
                </div>
                <Button
                  className="border-2  duration-200  bg-blue-500 text-white gap-2"
                  variant="default"
                  onClick={storeDetails}
                >
                  Submit
                </Button>
              </div>
            ) : (
              <h1>{name} has not enabled notifications on his end</h1>
            )}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
