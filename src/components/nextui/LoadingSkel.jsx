import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function LoadingSkel() {
  return (
    <Card className="w-full space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-10 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="flex">
        <Skeleton className="w-full rounded-lg">
          <div className="h-3 w-full rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-full rounded-lg">
          <div className="h-20 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
