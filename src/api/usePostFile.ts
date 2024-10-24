import { useState } from 'react';
import request from './request';

export const usePostFile = (endpoint: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [response, setResponse] = useState<any>(null);

  const postData = async (data: any) => {
    setLoading(true);
    try {
      const res = await request.post(endpoint, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResponse(res.data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { postData, loading, error, response };
};
