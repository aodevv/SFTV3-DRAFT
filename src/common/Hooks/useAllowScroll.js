import { useEffect, useRef, useState } from "react";

export const useAllowScroll = () => {
  const [allowScroll, setAllowScroll] = useState(true);
  let tableRef = useRef();

  useEffect(() => {
    const container = tableRef.current;

    const handleWheel = (event) => {
      if (allowScroll) {
        event.preventDefault();
      }
    };

    if (container) {
      if (allowScroll) {
        container.addEventListener("wheel", handleWheel);
      } else {
        container.removeEventListener("wheel", handleWheel);
      }
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [allowScroll, tableRef]);

  return [tableRef, setAllowScroll];
};
