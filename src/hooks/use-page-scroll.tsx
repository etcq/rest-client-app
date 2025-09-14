import { useState, useEffect, useCallback } from 'react';

const usePageScroll = () => {
  const [pageScroll, setPageScroll] = useState(false);

  const changeHeader = useCallback(() => {
    setPageScroll(window.scrollY >= 1);
  }, [setPageScroll]);

  useEffect(() => {
    window.addEventListener('scroll', changeHeader);
    return () => {
      window.removeEventListener('scroll', changeHeader);
    };
  }, [changeHeader]);

  return pageScroll;
};

export default usePageScroll;
