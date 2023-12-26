import axios from 'axios';
import { initilize } from '.';

const axiosInstance = axios.create({
  // withCredentials: true,
});

export const useSwrInstance = () => {
  const { requests, queries } = initilize(axiosInstance);

  return {
    requests, queries
  };
};