const RAZORPAY_KEY = "rzp_test_1DP5mmOlF5G5ag";

let orders = [];
let currentOrder = null;

// Create a new order
function createOrder() {
  const orderId = "ORD_" + Date.now();
  currentOrder = {
    orderId,
    amount: 1,
    status: "Pending",
    timestamp: new Date().toLocaleString()
  };
  orders.push(currentOrder);
}

// Open Razorpay Checkout for UPI
function openUPIPayment() {
  const options = {
    key: RAZORPAY_KEY,
    amount: currentOrder.amount * 100, // in paise
    currency: "INR",
    name: "Mythic Coin",
    description: "One digital blessing coin ✨",
    prefill: {
      name: "Adithya Siju",
      email: "test@example.com",
      contact: "9999999999"
    },
    method: {
      upi: true
    },
    handler: function (response) {
      currentOrder.status = "Paid ✅";
      currentOrder.razorpayPaymentId = response.razorpay_payment_id;
      document.getElementById("status").innerText = "Payment successful! ✅";
      console.log("Order database:", orders);
    },
    modal: {
      escape: true
    },
    theme: {
      color: "#2563eb"
    }
  };

  const rzp = new Razorpay(options);
  rzp.on('payment.failed', function(response){
    currentOrder.status = "Failed ❌";
    document.getElementById("status").innerText = "Payment failed! ❌";
    console.log("Payment failed:", response.error);
  });

  rzp.open();
}

// Initialize
createOrder();

// Event listener
document.getElementById("payButton").addEventListener("click", openUPIPayment);
