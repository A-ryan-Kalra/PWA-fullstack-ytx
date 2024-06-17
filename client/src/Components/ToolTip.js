import { Button } from "../Components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Components/ui/tooltip";

export default function TooltipDemo({ Icon, title, color }) {
  return (
    <>
      <TooltipProvider className="">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" className={color}>
              <Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
