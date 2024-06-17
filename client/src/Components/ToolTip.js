import { useNavigate } from "react-router-dom";
import { Button } from "../Components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Components/ui/tooltip";

export default function TooltipDemo({ Icon, title, color, href }) {
  const navigation = useNavigate();

  return (
    <div>
      <TooltipProvider className="">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => navigation(href)}
              variant="outline"
              className={color}
            >
              <Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
