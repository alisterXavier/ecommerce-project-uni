import axios from 'axios';
import { initilize } from '.';

const axiosInstance = axios.create({
  // withCredentials: true,
});

export const useSwrInstance = () => {
  const { requests } = initilize(axiosInstance);

  return {
    requests,
  };
};