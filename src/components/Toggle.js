import { useSelector } from "react-redux";




export const Toggle = ({id, children}) => {
  /*const dispatch = useDispatch();



  
  // Create a ref that we add to the element for which we want to detect outside clicks
    const ref = useRef();
    console.log(useRef());

    useOnClickOutside(ref, () => dispatch(toggle(id)));*/

  const show = useSelector(state => state.toggle[id]);

  

    return show ? children : (null)
  
}

/*
// Hook
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}*/