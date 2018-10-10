async function handleMessage(message) {
    const { email, regNo } = message;
    const currentTab = (await browser.tabs.query({ active: true, currentWindow: true }))[0];
    const m = email && email.match(/^([^@]+)\@mailinator\.com$/i)
    if (m) {
        browser.tabs.create({
            url: "https://www.mailinator.com/v3/index.jsp?zone=public&query=" + encodeURIComponent(m[1]),
            active: false,
            index: currentTab && currentTab.index + 1 || undefined,
        });
    }
}
browser.runtime.onMessage.addListener(handleMessage);

async function insertTestData() {
    browser.tabs.executeScript({ file: "browser-polyfill.js" });
    browser.tabs.executeScript(null, { allFrames: true, file: "/content_scripts/testdata.js" });
}
browser.browserAction.onClicked.addListener(insertTestData);

async function setDefaultSettings()
{
    const settings = await browser.storage.local.get();
    if (settings.vlineDomains === undefined) {
        settings.vlineDomains = ["localhost"];
    }
    if (settings.password === undefined) {
        settings.password = "ewqEWQ321#\"!";
    }
    browser.storage.local.set(settings);
}
setDefaultSettings();

async function copyPassword() {
    browser.tabs.executeScript({ file: "browser-polyfill.js" });
    browser.tabs.executeScript(null, { file: "/content_scripts/copy.js" });
}

browser.contextMenus.create({
    id: "auto-password",
    contexts: ["browser_action"],
    onclick: copyPassword,
    title: "Copy password",
});

if (browser.contextMenus.onShown) {
    let lastMenuInstanceId = 0;
    let nextMenuInstanceId = 1;
    browser.contextMenus.onShown.addListener(async info => {
        let menuInstanceId = nextMenuInstanceId++;
        lastMenuInstanceId = menuInstanceId;

        if (!info.menuIds.filter(id => id === "auto-password")[0]) {
            return;
        }
        
        let settings = await browser.storage.local.get();

        // After completing the async operation, check whether the menu is still shown.
        if (menuInstanceId !== lastMenuInstanceId) {
            return; // Menu was closed and shown again.
        }

        browser.contextMenus.update("auto-password", {title: `Copy password: ${settings.password}`});
        browser.contextMenus.refresh();
    });

    browser.contextMenus.onHidden.addListener(function () {
        lastMenuInstanceId = 0;
    });
}