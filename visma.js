(function() {
let randint = m => Math.floor(Math.random() * m);
let pad = ((s, l) => new Array(l + 1 - s.length).join("0") + s);

function CheckoutSE() {
	let isValidRegNo = no => no.split("").filter(c => c !== "-").map(c => c - "0").map((c, i) => ((i + 1) % 2 + 1) * c).map(s => (s % 10) + Math.floor(s / 10)).reduce((a, b) => a + b) % 10 === 0;
	let reg;
	do {
		reg = pad(randint(1000000).toString(), 6) + "-" + pad(randint(1000).toString(), 4);
	} while (!isValidRegNo(reg));
	document.getElementById("Customer_OrgNo").value = reg;
	let mail = document.getElementById("CompanyContactEmail").innerText;
	document.getElementById("Customer_Name").value = mail.split("@")[0];
	document.getElementById("Customer_InvoicingAddress1").value = "A";
	document.getElementById("Customer_InvoicingPostalCode").value = "22222";
	document.getElementById("Customer_InvoicingCity").value = "Lund";
	document.getElementById("Customer_PhoneNumber").value = "070-5572927";
	document.getElementById("AcceptTermsOfService").checked = true;
}

function CheckoutNO() {
	let ctrl = [3, 2, 7, 6, 5, 4, 3, 2, 1];
	let isValidRegNo = no => no.split("").filter(c => c !== "-").map(c => c - "0").map((c, i) => ctrl[i] * c).reduce((a, b) => a + b) % 11 === 0;
	let reg;
	do {
		reg = pad(randint(1000000000).toString(), 9);
	} while (!isValidRegNo(reg));
	document.getElementById("Customer_OrgNo").value = reg;
	let mail = document.getElementById("CompanyContactEmail").innerText;
	document.getElementById("Customer_Name").value = mail.split("@")[0];
	document.getElementById("Customer_InvoicingAddress1").value = "A";
	document.getElementById("Customer_InvoicingPostalCode").value = "1234";
	document.getElementById("Customer_InvoicingCity").value = "Norge";
	document.getElementById("Customer_PhoneNumber").value = "12345678";
	document.getElementById("AcceptTermsOfService").checked = true;
}

function NewVONCustomer() {
	var customerNumber = document.getElementById("maincontentholder_CustomerNoTextBox").value;
	if(!customerNumber.match(/\d+/)) {
	  document.getElementById("maincontentholder_CustomerNoTextBox").value = customerNumber = randint(100000000);
	}
	document.getElementById("maincontentholder_CustomerNameTextBox").value = "s" + customerNumber;
	document.getElementById("maincontentholder_NewOrgNoTextBox").value = "555555-5555";
	document.getElementById("maincontentholder_NewInvoiceAddress1TextBox").value = "A";
	document.getElementById("maincontentholder_NewInvoicePostalCodeTextBox").value = "22222";
	document.getElementById("maincontentholder_NewInvoiceCityTextBox").value = "Lund";
	document.getElementById("maincontentholder_EmailTextBox").value = "s" + customerNumber + "@vline.spcs.se";
	document.getElementById("maincontentholder_FirstNameTextBox").value = "Sam";
	document.getElementById("maincontentholder_LastNameTextBox").value = customerNumber;
}

if(window.location.href.match(/\/sv\-SE\/checkout\/buy\b/i)) {
  CheckoutSE();
} else if(window.location.href.match(/\/nb\-NO\/checkout\/buy\b/i)) {
  CheckoutNO();
} else if(window.location.href.match(/\/administration\/Internal\/AddNewCustomer\.aspx\b/i)) {
  NewVONCustomer();
}
	
})();
