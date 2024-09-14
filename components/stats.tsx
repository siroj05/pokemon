import { stat } from "@/lib/types";
import { formatString } from "@/lib/utils";
import { Progress } from "./ui/progress";

interface Props {
  stat : stat
}

export default function Stats({stat}: Props) {
  return (
    <div>
      <p className="font-semibold">{formatString(stat.stat.name)}</p>
      <div className="relative">
        <Progress value={stat.base_stat} />
        <span className="text-white absolute top-0 left-2">
          {stat.base_stat}
        </span>
      </div>
    </div>
  );
}
