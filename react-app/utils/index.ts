import {useEffect, useState} from "react";

export const truncate = (str, n = 10) => {
  return (str.length > n) ? str.slice(0, n) : str;
};

export const useCheckMobileScreen = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  return (width <= 768);
}

export const truncateAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(38)}`


