import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchApi, axiosApi } from "../apiSlice";

const ApiForm = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("{}");

  const dispatch = useDispatch();
  const { loading, data, error, status } = useSelector(
    (state) => state.api
  );

  const handleFetch = () => {
    dispatch(fetchApi({ url, method, body: JSON.parse(body) }));
  };

  const handleAxios = () => {
    dispatch(axiosApi({ url, method, body: JSON.parse(body) }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>API Hunter</h2>

      <input
        type="text"
        placeholder="Enter API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option>GET</option>
        <option>POST</option>
      </select>

      {method === "POST" && (
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          style={{ width: "100%", marginTop: "10px" }}
        />
      )}

      <br /><br />

      <button onClick={handleFetch}>Fetch API</button>
      <button onClick={handleAxios} style={{ marginLeft: "10px" }}>
        Axios API
      </button>

      <hr />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}> {error}</p>}

      {data && (
        <div>
          <p>Status: {status}</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiForm;