import { Skeleton } from '@mantine/core';

type SkeletonContainerProps = {
  h: number;
  w: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  repeat: number;
  wrap?: boolean;
};

export const SkeletonContainer = ({
  h,
  w,
  mt,
  mr,
  mb,
  ml,
  repeat,
  wrap,
}: SkeletonContainerProps) => {
  const skeletons = [];
  for (let i = 0; i < repeat; i++) {
    skeletons.push(
      <Skeleton
        key={i} // Ensure each Skeleton has a unique key
        height={h}
        width={w}
        mt={mt}
        mr={mr}
        mb={mb}
        ml={ml}
      />
    );
  }

  return (
    <div className={`flex ${wrap && 'flex-wrap'}`}>
      {skeletons}
    </div>
  );
};
