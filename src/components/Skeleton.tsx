export function Skeleton(props: any) {
  return (
    <div
      className={`skeleton-loader relative w-full h-[200px] rounded-lg bg-[#FFFFFF0D] overflow-hidden ${props.className || ''}`}
    />
  );
}
