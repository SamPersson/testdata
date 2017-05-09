async function insertTestData() {
    console.log("browserAction");
    const {email, regNo} = (await browser.tabs.executeScript(null, {allFrames:true, file:"/content_scripts/testdata.js"})).filter(f => f.email)[0];
    var currentTab = (await browser.tabs.query({ active: true, currentWindow: true }))[0];
    const m = email && email.match(/^([^@]+)\@mailinator\.com$/i)
    if (m) {
        browser.tabs.create({
            url: "https://www.mailinator.com/inbox2.jsp?public_to=" + encodeURIComponent(m[1]),
            active: false,
            index: currentTab && currentTab.index + 1 || undefined,
        });
    }
}

browser.browserAction.onClicked.addListener(insertTestData);

async function setDefaultSettings()
{
    const settings = await browser.storage.local.get();
    if (settings.vlineDomains === undefined) {
        settings.vlineDomains = ["localhost"];
    }
    browser.storage.local.set(settings);
}

setDefaultSettings();
