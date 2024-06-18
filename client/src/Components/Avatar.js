import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Components/ui/tooltip";

export default function AvatarDemo({ profilePicture, name }) {
  return (
    <div className="">
      <TooltipProvider className="">
        <Tooltip>
          <TooltipTrigger asChild>
            <img className={"w-7 h-7"} src={profilePicture} alt={name} />
          </TooltipTrigger>
          <TooltipContent className="" side="left">
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
