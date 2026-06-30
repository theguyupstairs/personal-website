import { useEffect, useState } from "react";

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {

    fetch("/api/ping")
      .then(r => r.text())
      .then(setMessage);

  }, []);

  return (
    <h1>{message}</h1>
  );
}

export default App;