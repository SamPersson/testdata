
function insertTestData() {
    console.log("browserAction");
    browser.tabs.executeScript(null, {allFrames:true, file:"/content_scripts/testdata.js"});
}

browser.browserAction.onClicked.addListener(insertTestData);
