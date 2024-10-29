import { getMessaging, getToken } from "firebase/messaging";
import app from "../config/firebase";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
function getRegistrationToken() {
  const messaging = getMessaging(app);
  getToken(messaging, {
    vapidKey:
      "BI9-Sd0QuRBDWV3YJmlzxboQQDd5UcHjR1segCPZGvk_5-lANQCnRdNlCBp9AIiOseeMKYlyBmXnYVIQ5n4P8Sk",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
}

export default getRegistrationToken;
