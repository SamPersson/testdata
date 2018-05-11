
async function updateUI() {
  const restoredSettings = await browser.storage.local.get();
  document.querySelector("#vline-domains").value = restoredSettings.vlineDomains.join("\n");
  document.querySelector("#auto-password").value = restoredSettings.password;
}
updateUI();

function storeSettings() {

  function getDomains() {
    var text = document.querySelector("#vline-domains").value;
    return text.split(/(\s*[\r\n]+\s*)+/);
  }

  const settings = {
    vlineDomains: getDomains(),
    password: document.querySelector("#auto-password").value,
  };
  console.log("storeSettings", settings);
  browser.storage.local.set(settings);
}

const saveButton = document.querySelector("#save-button");
saveButton.addEventListener("click", storeSettings);
