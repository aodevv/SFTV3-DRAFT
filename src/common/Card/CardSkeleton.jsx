import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#d6d6d6" highlightColor="#bebebe">
      <Skeleton width={244} height={268} />
      <Skeleton width={244} height={268} />
      <Skeleton width={244} height={268} />
      <Skeleton width={244} height={268} />
      <Skeleton width={244} height={268} />
      <Skeleton width={244} height={268} />
    </SkeletonTheme>
  );
};

export default CardSkeleton;
