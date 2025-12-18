import axios from "axios";

export async function sendSubscription(subscription) {
  axios.post(`${API}/api/subscribe`, subscription);
}
