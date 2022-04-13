let listen_button = document.getElementById("listen_button");

listen_button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: listener,
  });
});

function listener() {
  let other, span, cd, topDiv, bottomDiv;
  setInterval(() => {
    cd = document.getElementsByClassName("van-count-down")[0];
    if (cd.textContent.includes("01:")) {
      other = document.getElementsByClassName("source_list")[0];
      span = other.getElementsByTagName("span")[3];
      span.click();
    } else if (cd.textContent === "00:00:00:00") {
      other = document.getElementsByClassName("source_list")[0];
      span = other.getElementsByTagName("span")[2];
      span.click();
      setTimeout(() => {
        bottomDiv = document.getElementsByClassName("tips-bootom-fix")[0];
        if (bottomDiv) {
          bottomDiv.parentElement.removeChild(bottomDiv);
        }
        topDiv = document.getElementsByClassName("tips-top-fix")[0];
        if (topDiv) {
          topDiv.parentElement.removeChild(topDiv);
        }
      }, 1000 * 3);
    }
  }, 1000 * 6);
}
