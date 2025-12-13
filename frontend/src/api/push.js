import axios from "axios";

export async function sendSubscription(subscription) {
  return axios.post("/api/subscribe", subscription);
}
