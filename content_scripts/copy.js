(async function () {
    const settings = await browser.storage.local.get();
    let textbox = document.createElement("textarea")
    document.body.appendChild(textbox);
    textbox.value = settings.password;
    textbox.select();
    document.execCommand('Copy');
    document.body.removeChild(textbox);
}());