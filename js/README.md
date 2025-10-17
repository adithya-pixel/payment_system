# UPI Payment Flow - Mythic Coin

## Features
- Direct UPI payment using `upi://` deep link
- Dynamic QR generation per order
- Unique order ID & reference ID tracking
- QR expiry timer (5 minutes)
- Simulated payment confirmation
- **Simulated SMS payment confirmation (bonus)**
- Desktop + mobile ready

## How to Test
1. Open `index.html` on **mobile** → click **Pay via UPI** → GPay/PhonePe opens with ₹1.
2. Open `index.html` on **desktop** → scan QR with mobile UPI app.
3. QR expires in 5 minutes. Refresh page to generate new QR.
4. Click **Simulate SMS Payment** to test bonus SMS confirmation.
5. Check simulated order database in browser console (`console.log(orders)`).

## Notes
- Payment confirmation is **simulated** for demo purposes.
- Real SMS confirmation is **only possible in a mobile app** with SMS permission.
- Dynamic QR and reference IDs make it **look like a real eCommerce checkout**.
