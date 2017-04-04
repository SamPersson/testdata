(function() {
    const randint = m => Math.floor(Math.random() * m);
    const pad = ((si, l) => (s => new Array(Math.max(l + 1 - s.length, 0)).join("0") + s)(si.toString()));

    function getRegNo(country) {
        if (country === "se") {
            let isValidRegNo = no => no.split("").filter(c => c !== "-").map(c => c - "0").map((c, i) => ((i + 1) % 2 + 1) * c).map(s => (s % 10) + Math.floor(s / 10)).reduce((a, b) => a + b) % 10 === 0;
            let reg;
            do {
                reg = pad(randint(1000000).toString(), 6) + "-" + pad(randint(1000).toString(), 4);
            } while (!isValidRegNo(reg));
            return reg;
        } else if (country === "no") {
            let ctrl = [3, 2, 7, 6, 5, 4, 3, 2, 1];
            let isValidRegNo = no => no.split("").filter(c => c !== "-").map(c => c - "0").map((c, i) => ctrl[i] * c).reduce((a, b) => a + b) % 11 === 0;
            let reg;
            do {
                reg = pad(randint(1000000000).toString(), 9);
            } while (!isValidRegNo(reg));
            return reg;
        }
    }

    function tryGetElem(id, f) {
        const e = document.getElementById(id);
        if (e) {
            return f(e);
        }
    }
        
    function Checkout(country) {
        const regNo = tryGetElem("Customer_OrgNo", e => e.value = e.value || getRegNo(country));
        const mail = tryGetElem("CompanyContactEmail", e => e.innerText);
        tryGetElem("Customer_Name", e => e.value = mail && mail.split("@")[0] || regNo + " customer");
        tryGetElem("Customer_InvoicingAddress1", e => e.value = "A");
        tryGetElem("Customer_InvoicingPostalCode", e => e.value = country === "no" ? "2222" : "22222");
        tryGetElem("Customer_InvoicingCity", e => e.value = "Stad");
        tryGetElem("Customer_PhoneNumber", e => e.value = country === "no" ? "12345678" : "070-1234567");
        tryGetElem("AcceptTermsOfService", e => e.checked = true);
    }

    function Trial(country) {
        const d = new Date();
        const email = tryGetElem("Email", e => e.value = country + pad(d.getYear() % 100, 2) + pad(d.getMonth() + 1 , 2) + pad(d.getDate() , 2) + "-" + pad(randint(10000) + "@vline.spcs.se", 4));
        tryGetElem("Firstname", e => e.value = country + "-Test");
        tryGetElem("Surname", e => e.value = email.split("@")[0]);
        tryGetElem("AcceptLicenceAgreement", e => e.checked = true);
        tryGetElem("Phone", e => e.value = country === "no" ? "12345678" : "070-1234567");
    }

    function InviteAO(country) {
        const d = new Date();
        const email = tryGetElem("Email", e => e.value = country + pad(d.getYear() % 100, 2) + pad(d.getMonth() + 1, 2) + pad(d.getDate(), 2) + "-" + pad(randint(10000) + "@vline.spcs.se", 4));
        tryGetElem("CompanyName", e => e.value = email.split("@")[0]);
        tryGetElem("CorporateIdentityNo", e => e.value = getRegNo(country));
        tryGetElem("ContactPersonName", e => e.value = country + "-Test");
    }

    function NewVONCustomer(country) {
        let customerNumber = tryGetElem("maincontentholder_CustomerNoTextBox", e => e.value.trim());
        if(!customerNumber.match(/\d+/)) {
            customerNumber = tryGetElem("maincontentholder_CustomerNoTextBox", e => e.value = randint(100000000));
        }
        tryGetElem("maincontentholder_CustomerNameTextBox", e => e.value = country + customerNumber);
        tryGetElem("maincontentholder_NewOrgNoTextBox", e => e.value = getRegNo(country));
        tryGetElem("maincontentholder_NewInvoiceAddress1TextBox", e => e.value = "A");
        tryGetElem("maincontentholder_NewInvoicePostalCodeTextBox", e => e.value = country === "no" ? "2222" : "22222");
        tryGetElem("maincontentholder_NewInvoiceCityTextBox", e => e.value = "Stad");
        tryGetElem("maincontentholder_EmailTextBox", e => e.value = country + customerNumber + "@vline.spcs.se");
        tryGetElem("maincontentholder_FirstNameTextBox", e => e.value = country + "-Test");
        tryGetElem("maincontentholder_LastNameTextBox", e => e.value = customerNumber);
    }

    const topDomain = location.host.split(".").pop().split(":").pop();

    const m = window.location.href.match(/\/[a-z]{2}\-([A-Z]{2})\//);
    if(m) {
        country = m[1].toLowerCase();
        if(document.getElementById("Customer_OrgNo")) {
            Checkout(country);
        }
        else if (document.getElementById("SendInvitationToAO")) {
            InviteAO(country);
        }
        else if(document.getElementById("Email"))     {
            Trial(country);
        }
    } 
    else if(window.location.href.match(/\/administration\/Internal\/AddNewCustomer\.aspx\b/i)) {
        const country = { "se":"se", "no":"no", "81":"no" }[topDomain] || "se";
        NewVONCustomer(country);
    }
})();
