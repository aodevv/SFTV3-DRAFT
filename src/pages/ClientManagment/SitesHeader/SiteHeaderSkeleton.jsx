import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SiteHeaderSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#d6d6d6" highlightColor="#bebebe">
      <Skeleton width="100%" height="100%" />
    </SkeletonTheme>
  );
};

export default SiteHeaderSkeleton;
