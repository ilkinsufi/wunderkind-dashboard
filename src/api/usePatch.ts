import { useState } from 'react';
import request from './request';

interface Translation {
  content: string;
  languageCode: string;
}

const usePatch = (endpoint: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const patchData = async (data: any) => {
    setLoading(true);
    try {
      const response = await request.patch(endpoint, data, {
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { patchData, loading, error };
};

export default usePatch;
