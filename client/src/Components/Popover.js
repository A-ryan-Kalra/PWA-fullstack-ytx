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
import { useState } from "react";
import RequestPermission from "../constants/RequestPermission";
import { atom, useAtom } from "jotai";
import { allowNotification } from "../constants/data";
export const updateNotification = atom(false);

export function PopoverDemo() {
  const [notificationAtom, setNotificationAtom] = useAtom(allowNotification);
  const [updateNotificationAtom, setUpdateNotificationAtom] =
    useAtom(updateNotification);
  //   const [notification, setNotifications] = useState();
  const now = new Date();
  const formattedDate = format(now, "yyyy-MM-dd hh:mm a");
  const [details, setDetails] = useState({
    title: "",
    body: "",
    createdAt: formattedDate || "",
  });

  const { notificationRequest } = RequestPermission();

  //   console.log(formattedDate);
  const storeDetails = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/save-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const data = await res.json();
      //   console.log(data);
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
        <Button
          className="border-2 flex items-center justify-center  duration-200 group bg-black text-white gap-2"
          variant="outline"
          onClick={notificationRequest}
        >
          <PlusIcon className="w-[15px] h-[15px] border-white group-hover:border-black border-[1px] font-semibold rounded-full" />
          <span>Add Notification</span>
        </Button>
      </PopoverTrigger>
      {notificationAtom && (
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Notification</h4>
              <p className="text-sm text-muted-foreground">
                Enter the Notification
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Title</Label>
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
                <Label htmlFor="maxWidth">Body</Label>
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
