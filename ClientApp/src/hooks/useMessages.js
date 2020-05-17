import { useState, useEffect } from "react";

const messages = [
  {
    id: 1,
    isSeen: true,
    content: "This is an example message",
    sender: {
      id: 1,
      name: "User B Wilkes",
      email: "user@gmail.com",
      role: 1,
      department: {
        name: "Engineering",
        company: { id: 1, name: "APPLE Inc." },
      },
    },
    receiver: {
      id: 1,
      name: "Admin B Wilkes",
      email: "ad@gmail.com",
      role: 0,
      department: {
        name: "Engineering",
        company: { id: 1, name: "APPLE Inc." },
      },
    },
  },
  {
    id: 2,
    isSeen: false,
    content: "This is an example message",
    receiver: {
      id: 1,
      name: "User B Wilkes",
      email: "user@gmail.com",
      role: 1,
      department: {
        name: "Engineering",
        company: { id: 1, name: "APPLE Inc." },
      },
    },
    sender: {
      id: 1,
      name: "Admin B Wilkes",
      email: "ad@gmail.com",
      role: 0,
      department: {
        name: "Engineering",
        company: { id: 1, name: "APPLE Inc." },
      },
    },
  },
];

function useMessages() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    // fetch("/api/User/all")
    //   .then((response) => response.json())
    //   .then((data) => setData(data))
    //   .catch((error) => setError(error));

    setTimeout(() => {
      setData(messages);
    }, 3000);
  }, [timestamp]);

  const refresh = () => {
    setTimestamp(Date.now());
  };

  return { data, error, refresh };
}

export default useMessages;
