import axios from "axios";

export async function sendSubscription(subscription) {
  axios.post("/api/subscribe", subscription);
}
