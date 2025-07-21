/*
This page has the following basic functionalities, not including the UI:
It uses useRef to hold the value of the duration of the page viewed by the user.

Likewise, the rating provided by the user is also stored as a useRef. If no 
rating is given, 'null' is sent as the rating which is accepted by the DB.

*/


import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function ProductPage() {
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const startTimeRef = useRef(0);
  const intervalRef = useRef(0);
  const location = useLocation();
  const isFirstRender = useRef(true);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();
  const ratingRef = useRef(rating)

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
    ratingRef.current = rating
  }, [rating])

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
          await fetch(`/api/product/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              duration: duration,
              action: "viewed",
              rating: ratingRef.current
            }),
          });
        } catch (error) {
          console.error("Error sending duration", error);
        }
      })();
    };
  }, [location.pathname]);



  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "row",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {[...Array(5)].map((star, idx) => {
          const ratingValue = idx + 1;
          return (
            <>
              <label>
                {" "}
                <FaStar
                  style={{ display: "flex" }}
                  color={ratingValue <= (hover || rating) ? "yellow" : "grey"}
                  size={100}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
                <input
                  type="radio"
                  name="rating"
                  id=""
                  style={{ display: "none" }}
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
              </label>
            </>
          );
        })}
      </div>
      <input
        type="submit"
        value="submit"
        onClick={() => {
          navigate("/home");
        }}
        style={{ backgroundColor: "white", borderRadius: "3px" }}
      />
      <div>
        <p style={{ color: "white" }}>{count}</p>
      </div>
    </div>
  );
}

export default ProductPage;
