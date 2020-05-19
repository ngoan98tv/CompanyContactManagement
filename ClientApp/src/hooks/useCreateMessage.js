import { useState } from "react";

function useCreateMessage() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (data) => {
    setIsLoading(true);
    const response = await fetch("/api/MessageChat/", {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
      return { data: jsonData, error: null };
    } else {
      if (response.bodyUsed) {
        const jsonData = await response.json();
        setError(jsonData);
        setIsLoading(false);
        return { data: null, error: jsonData };
      }
      setIsLoading(false);
      setError(true);
      return { data: null, error: true };
    }
  };

  return [handleCreate, { data, error, isLoading }];
}

export default useCreateMessage;
