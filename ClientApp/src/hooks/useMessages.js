import { useState, useEffect } from "react";

function useMessages() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    fetch("/api/MessageChat/all")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error));
  }, [timestamp]);

  const refresh = () => {
    setTimestamp(Date.now());
  };

  return { data, error, refresh };
}

export default useMessages;
