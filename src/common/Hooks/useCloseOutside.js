import { useEffect, useRef } from "react";

export const useCloseOutside = (isClose, setIsClose) => {
  let menuRef = useRef();
  let openRef = useRef();
  useEffect(() => {
    let closeDropdown = (e) => {
      if (!isClose) {
        if (
          !menuRef.current.contains(e.target) &&
          !openRef.current.contains(e.target)
        )
          setIsClose(true);
      }
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  });

  return [openRef, menuRef];
};
