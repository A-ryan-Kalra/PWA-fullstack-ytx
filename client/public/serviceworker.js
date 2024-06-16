// Public Key New:
// BIYpZfMb4FcAdctRnWwpg_2YSA0b0jJx24JK4_Ji9U-ZbxxJl9OXUtS-p5Suy2Lh2AtA0JeuPTyc6Mu-RlFWbRo

// Private Key New:
// jHV8REsJiTn2_CJWHyOeUmaBuAqZycpaMtoGhfZyMy4

function urlBase64ToUnit8Array(base4String) {
  try {
    const padding = "=".repeat((4 - (base4String.length % 4)) % 4);

    const base64 = (base4String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawdata = atob(base64);

    const outputArray = new Uint8Array(rawdata.length);

    for (let i = 0; i < rawdata.length; i++) {
      outputArray[i] = rawdata.charCodeAt(i);
    }
    return outputArray;
  } catch (err) {
    console.error("Failure", err);
  }
}

const saveSubscription = async (subscription) => {
  const res = await fetch("/api/save-subscription", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });

  return res.json();
};

self.addEventListener("activate", async (e) => {
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUnit8Array(
      "BIYpZfMb4FcAdctRnWwpg_2YSA0b0jJx24JK4_Ji9U-ZbxxJl9OXUtS-p5Suy2Lh2AtA0JeuPTyc6Mu-RlFWbRo"
    ),
  });

  console.log("subscription ", subscription);
  const response = await saveSubscription(subscription);

  console.log("response ", response);
});

self.addEventListener("push", (e) => {
  console.log("e.data.text ", e.data.text());
  const details = JSON.parse(e.data.text());
  console.log(details);
  //   const val = document.getElementById("text").value;
  //   console.log("val=", val);
  self.registration.showNotification(details.title, {
    body: details.body,
  });
});
