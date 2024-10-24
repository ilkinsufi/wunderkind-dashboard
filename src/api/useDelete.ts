import { useState } from 'react';
import request from './request';

const useDelete = (endpoint: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const deleteData = async (id: string) => {
    setLoading(true);
    try {
      const response = await request.get(`${endpoint}/${id}`);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { deleteData, loading, error };
};

export default useDelete;
