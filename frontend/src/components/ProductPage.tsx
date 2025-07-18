import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

function ProductPage() {
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const startTimeRef = useRef(0);
  const intervalRef = useRef(0);
  const location = useLocation();
  const isFirstRender = useRef(true);

  function increaseCount() {
    setCount((count) => count + 1);
  }

  useEffect(() => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(increaseCount, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    return () => {
      clearInterval(intervalRef.current);

      const endTime = Date.now();
      const duration = (endTime - startTimeRef.current) / 1000;
      (async () => {
        try {
          const response = await fetch(`/api/product/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              duration: duration,
              action: "viewed",
            }),
          });
        } catch (error) {
          console.error("Error sending duration", error);
        }
      })();
    }
  }, [location.pathname]);

  return (
    <div>
      <p style={{ color: "white" }}>{count}</p>
    </div>
  );
}

export default ProductPage;
