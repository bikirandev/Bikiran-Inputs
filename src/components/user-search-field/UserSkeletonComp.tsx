import { Skeleton } from "../../lib/Skeleton";
import { cn } from "../../lib/utils/cn";

const UserSkeletonComp = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex gap-2 items-center py-3 px-3 ", className)}>
      <div>
        <Skeleton className="size-10 rounded-full" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="w-[200px] h-5" />
        <Skeleton className="w-[200px] h-5" />
      </div>
    </div>
  );
};

export default UserSkeletonComp;
