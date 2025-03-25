import React, { useEffect, useState } from "react";

const LiveStream = () => {
  const [prediction, setPrediction] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/live-predictions/");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setPrediction(data.message.violence_detected ? "Violence Detected" : "No Violence Detected");
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);
  return (
    <div>
      <h2>Live Camera Feed</h2>
      <img src="http://127.0.0.1:8000/api/live-feed/" alt="Live Feed" width="80%" />
      <h3>Prediction: {prediction === "true" ? "Violence Detected!" : "No Violence"}</h3>
    </div>
  );
};

export default LiveStream;
