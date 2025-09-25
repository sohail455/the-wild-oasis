import { useEffect, useRef } from "react";

export default function useOutsideClick(handel, detectOnCapture = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handelClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handel();
        }
      }

      document.addEventListener("click", handelClick, detectOnCapture);
      return () =>
        document.removeEventListener("click", handelClick, detectOnCapture);
    },
    [handel, detectOnCapture]
  );
  return ref;
}
