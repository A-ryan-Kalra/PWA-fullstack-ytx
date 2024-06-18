self.addEventListener("activate", async (e) => {});

// self.addEventListener("message", (event) => {
//   console.log("Message myData=", myData);
//   if (event.data && event.data.type === "GET_DATA") {
//     event.ports[0].postMessage(myData);
//   }
// });

self.addEventListener("push", (e) => {
  const details = JSON.parse(e.data.text());

  //   const val = document.getElementById("text").value;
  //   console.log("val=", val);
  self.registration.showNotification(details.title, {
    body: details.body,
  });
});
