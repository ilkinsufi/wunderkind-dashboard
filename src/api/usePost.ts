import { useState } from 'react';
import request from './request';

const usePost = (endpoint: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const postData = async (data: any) => {
    setLoading(true);
    try {
      const response = await request.post(endpoint, data);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { postData, loading, error };
};

export default usePost;
