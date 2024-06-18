// Public Key New:
// BIYpZfMb4FcAdctRnWwpg_2YSA0b0jJx24JK4_Ji9U-ZbxxJl9OXUtS-p5Suy2Lh2AtA0JeuPTyc6Mu-RlFWbRo

// Private Key New:
// jHV8REsJiTn2_CJWHyOeUmaBuAqZycpaMtoGhfZyMy4

export const getSubscription = async () => {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BIYpZfMb4FcAdctRnWwpg_2YSA0b0jJx24JK4_Ji9U-ZbxxJl9OXUtS-p5Suy2Lh2AtA0JeuPTyc6Mu-RlFWbRo"
        ),
      });
    }
    // console.log("React Subscription ", subscription);
    return subscription;
  } else {
    console.error("Service Worker is not supported in this browser");
    return null;
  }
};

const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};
