const upiID = "adithyasiju9@okaxis"; 
const name = "AdithyaSiju";
const amount = 1;
const qrExpiryMinutes = 5;

const orders = [];
let currentOrder;

function generateOrder() {
  const orderId = "ORD_" + Date.now(); 
  const referenceId = "REF_" + Date.now(); 
  const upiLink = `upi://pay?pa=${upiID}&pn=${encodeURIComponent(name)}&am=${amount.toFixed(2)}&cu=INR&tn=${orderId}&tr=${referenceId}`;

  orders.push({
    orderId,
    referenceId,
    amount,
    status: "Pending",
    timestamp: new Date().toLocaleString()
  });

  const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiLink)}`;
  document.getElementById("qr").innerHTML = `
    <p>Or scan this QR to pay:</p>
    <img src="${qrURL}" alt="UPI Payment QR Code">
  `;

  startTimer(qrExpiryMinutes);

  return { orderId, referenceId, upiLink };
}

let timerInterval;
function startTimer(minutes) {
  clearInterval(timerInterval);
  let timeLeft = minutes * 60; 
  const timerEl = document.getElementById("timer");
  timerEl.innerText = `QR expires in: ${minutes}:00`;

  timerInterval = setInterval(() => {
    timeLeft--;
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    timerEl.innerText = `QR expires in: ${min}:${sec < 10 ? "0"+sec : sec}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerEl.innerText = "QR expired! Refresh page to generate new QR.";
      document.getElementById("status").innerText = "";
      document.getElementById("qr").innerHTML = "";
    }
  }, 1000);
}

currentOrder = generateOrder();

document.getElementById("payButton").addEventListener("click", () => {
  if (!document.getElementById("qr").innerHTML) {
    alert("QR expired! Refresh page to generate a new payment.");
    return;
  }

  window.location.href = currentOrder.upiLink;
  document.getElementById("status").innerText = "Waiting for payment confirmation...";

  setTimeout(() => {
    orders.forEach(order => {
      if(order.orderId === currentOrder.orderId){
        order.status = "Paid ✅";
      }
    });
    document.getElementById("status").innerText = "Payment completed successfully! ✅";
    console.log("Order database:", orders);
  }, 5000);
});

document.getElementById("simulateSMS").addEventListener("click", () => {
  orders.forEach(order => {
    if(order.orderId === currentOrder.orderId){
      order.status = "Paid via SMS ✅";
    }
  });
  document.getElementById("status").innerText = "Payment confirmed via SMS!";
  console.log("Order database after SMS:", orders);
});
