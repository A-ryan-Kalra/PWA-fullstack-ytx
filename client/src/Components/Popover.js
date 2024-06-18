import { PlusIcon } from "lucide-react";
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
export const updateNotification = atom(false);

export function PopoverDemo({ profilePicture, name, endpoint }) {
  const [notificationAtom, setNotificationAtom] = useAtom(allowNotification);
  const [userData, setUserData] = useState();
  const [updateNotificationAtom, setUpdateNotificationAtom] =
    useAtom(updateNotification);
  const navigate = useNavigate();
  //   const [notification, setNotifications] = useState();
  const now = new Date();
  const formattedDate = format(now, "yyyy-MM-dd hh:mm a");

  const [details, setDetails] = useState({
    title: "",
    body: "",
    createdAt: formattedDate || "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (!data.username) {
      toast.error("Username does not exit please try to login again!");
      navigate("/");
    } else {
      setUserData(data);
    }
  }, []);

  const { notificationRequest, data } = RequestPermission();
  const [subscription, setSubscription] = useState(null);
  console.log("endpoint=", endpoint);

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
      console.log(data);
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
                <Button
                  className=" hover:bg-blue-500  group text-black flex"
                  variant="outline"
                  onClick={notificationRequest}
                >
                  <img
                    className={"w-6 h-6 rounded-full"}
                    src={profilePicture}
                    alt={name}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black font-semibold" side="left">
                {/* <PlusIcon className="w-[17px] h-[16px]  border-black group-hover:border-white border-[2px] group-hover:text-white font-semibold rounded-full" /> */}
                <p>Send notification to {name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </PopoverTrigger>
      {notificationAtom && (
        <PopoverContent className="z-[1000] w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">{name}</h4>
              <p className="text-sm text-muted-foreground">Send Message</p>
            </div>
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
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
