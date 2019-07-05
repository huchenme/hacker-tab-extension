import { useEffect, useState } from 'react';

const useWindowScroll = () => {
  const [state, setState] = useState({
    x: window.scrollX,
    y: window.scrollY,
  });

  useEffect(() => {
    const handler = () => {
      setState({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  return state;
};

export default useWindowScroll;
