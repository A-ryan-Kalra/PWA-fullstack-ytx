import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../src/Components/ui/table";
import { BreadcrumbDemo } from "./Breadcrumb";
import { PopoverDemo } from "./Popover";
import TooltipDemo from "./ToolTip";
import {
  HomeIcon,
  ShoppingCartIcon,
  LayoutDashboardIcon,
  User,
} from "lucide-react";
import Users from "../Users";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function TableDemo({
  notification,
  setUpdateNotificationAtom,
  updateNotificationAtom,
}) {
  const [users, setUsers] = useState();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (!currentUser?.username) {
      toast.error("Username does not exit please try to login again!");
      navigate("/");
    } else {
      setUserData(currentUser);
    }
  }, []);

  // console.log("user ", users);
  const getUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/getusers");
      const data = await res.json();
      // setUpdateNotificationAtom((prev) => !prev);
      // console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Something went wrong ", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [updateNotificationAtom]);

  return (
    <div className="p-2 overflow-x-auto">
      <div className="flex h-full gap-5 border-2 w-fit pr-5 mx-auto">
        <div className="min-h-full flex flex-col border-r-2 p-2 gap-4 ">
          <TooltipDemo Icon={HomeIcon} title={"Home"} href="/" />
          <TooltipDemo
            Icon={LayoutDashboardIcon}
            title={"Dashboard"}
            color={"bg-black text-white"}
            href="/dashboard"
          />
          <TooltipDemo Icon={ShoppingCartIcon} title={"Orders"} />
          <TooltipDemo Icon={User} title={"User"} />
        </div>
        <div className="flex flex-col my-5 gap-3">
          <div className="flex items-center justify-between">
            <BreadcrumbDemo />
            {/* <PopoverDemo /> */}
            <h1 className="font-mono">
              Hello,{(userData && userData.username) || "Admin"}{" "}
            </h1>
          </div>

          <Users data={users} />

          <div className=" w-[1320px]  mx-auto max-h-[600px] overflow-y-auto border-2 rounded-lg border-gray-200 shadow-lg p-3">
            <h1 className="font-semibold">Notifications</h1>
            <p className="text-[15px] text-neutral-600">
              A list of notifications made by Admins.
            </p>
            <Table className=" my-4">
              {/* <TableCaption>A list of recent notification.</TableCaption> */}
              <TableHeader>
                <TableRow>
                  <TableHead className=" w-[100px] ">Id</TableHead>
                  <TableHead className=" w-[100px] text-left">Title</TableHead>
                  <TableHead className=" w-[100px] text-left">
                    Message
                  </TableHead>
                  <TableHead className=" w-[100px] text-left">Sender</TableHead>
                  <TableHead className=" w-[100px] text-left">
                    Receiver
                  </TableHead>
                  <TableHead className=" w-[100px] text-left">
                    CreatedAt
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notification?.map((invoice, index) => (
                  <TableRow key={index}>
                    <TableCell className=" font-medium">{index + 1}</TableCell>
                    <TableCell className=" text-left">
                      {invoice.title}
                    </TableCell>
                    <TableCell className=" text-left">{invoice.body}</TableCell>
                    <TableCell className=" text-left">
                      {invoice.sender}
                    </TableCell>
                    <TableCell className=" text-left">
                      {invoice.receiver}
                    </TableCell>
                    <TableCell className=" text-left">
                      <span className="border-2 p-1.5 rounded-md">
                        {invoice.createdAt}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  {/* <TableCell className="text-left">
                    {notification?.details?.length || "0"}
                  </TableCell> */}
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
