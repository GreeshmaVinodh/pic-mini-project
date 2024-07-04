import { useEffect, useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";

import useShowToast from "../../hooks/useShowToast";
import "./Payment.css";

const Funding = () => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const showToast = useShowToast();

  useEffect(() => {
    const checkRedirect = () => {
      const redirectTime = sessionStorage.getItem("redirectTime");
      if (redirectTime) {
        const now = new Date().getTime();
        if (now - redirectTime >= 6000) {
          // 1 minute
          showToast("Success", "Payment successful!", "success");
          sessionStorage.removeItem("redirectTime");
          setPaymentComplete(true);
        }
      }
    };

    const interval = setInterval(checkRedirect, 1000);
    return () => clearInterval(interval);
  }, [showToast]);

  const handleRedirect = () => {
    sessionStorage.setItem("redirectTime", new Date().getTime());
    window.location.href = "https://buy.stripe.com/test_9AQ02bbZE4Or3YsbII";
  };

  return (
    <>
      <div className="payment">
        {!paymentComplete ? (
          <>
            <div>
              <Text>Offer Funding</Text>
              <Button onClick={handleRedirect}>Pay Now</Button>
            </div>
          </>
        ) : (
          <Box mt={4}>
            <Text>Payment successful!</Text>
          </Box>
        )}
      </div>
    </>
  );
};

export default Funding;
