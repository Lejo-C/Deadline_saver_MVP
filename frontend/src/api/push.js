import axios from "axios";

export async function sendSubscription(subscription) {
  axios.post("http://localhost:5000/api/subscribe", subscription);
}
