import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useEffect, useRef, useState} from 'react';

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  //   cleanup function for useEffect
  const isMounted = useRef(true); // Initial value _isMounted = true

  useEffect(() => {
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckingStatus(false);
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return {loggedIn, checkingStatus};
};

export default useAuthStatus;
// Protecting Routes v6
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase

// Fix memory leak in useEffect hook
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-unmounted-component-in-react-hooks
