export default function mergeRefs<T>(...refs: React.ForwardedRef<T>[]) {
  return (node: T) => {
    for (const ref of refs) {
      if (ref && typeof ref !== "function") {
        ref.current = node;
      }
    }
  };
}
