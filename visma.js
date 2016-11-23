(function() {
let randint = m => Math.floor(Math.random() * m);
let pad = ((s, l) => new Array(l + 1 - s.length).join("0") + s);

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
	
function Checkout(country) {
	document.getElementById("Customer_OrgNo").value = getRegNo(country);
	let mail = document.getElementById("CompanyContactEmail").innerText;
	document.getElementById("Customer_Name").value = mail.split("@")[0];
	document.getElementById("Customer_InvoicingAddress1").value = "A";
	document.getElementById("Customer_InvoicingPostalCode").value = country === "no" ? "2222" : "22222";
	document.getElementById("Customer_InvoicingCity").value = country === "no" ? "Norge" : "Lund";
	document.getElementById("Customer_PhoneNumber").value = country === "no" ? "12345678" : "070-5572927";
	document.getElementById("AcceptTermsOfService").checked = true;
}

function NewVONCustomer(country) {
	var customerNumber = document.getElementById("maincontentholder_CustomerNoTextBox").value.trim();
	if(!customerNumber.match(/\d+/)) {
	  document.getElementById("maincontentholder_CustomerNoTextBox").value = customerNumber = randint(100000000);
	}
	document.getElementById("maincontentholder_CustomerNameTextBox").value = country + customerNumber;
	document.getElementById("maincontentholder_NewOrgNoTextBox").value = getRegNo(country);
	document.getElementById("maincontentholder_NewInvoiceAddress1TextBox").value = "A";
	document.getElementById("maincontentholder_NewInvoicePostalCodeTextBox").value = country === "no" ? "2222" : "22222";
	document.getElementById("maincontentholder_NewInvoiceCityTextBox").value = country === "no" ? "Norge" : "Lund";
	document.getElementById("maincontentholder_EmailTextBox").value = country + customerNumber + "@vline.spcs.se";
	document.getElementById("maincontentholder_FirstNameTextBox").value = country + "-Test";
	document.getElementById("maincontentholder_LastNameTextBox").value = customerNumber;
}

let topDomain = location.host.split(".").pop().split(":").pop();
let country = { "se":"se", "no":"no", "81":"no" }[topDomain];
if(!country) {
	var m = window.location.href.match(/\/[a-z]{2}\-([A-Z]{2})\//);
	if(m) {
		country = m[1].toLowerCase();
	}
}
if(!country) { country = "se" };
	
if(window.location.href.match(/\/[a-z]{2}\-[A-Z]{2}\/checkout\/buy\b/i)) {
  Checkout(country);
} else if(window.location.href.match(/\/administration\/Internal\/AddNewCustomer\.aspx\b/i)) {
  NewVONCustomer(country);
}
	
})();
