(function() {

function CheckoutSE() {
	let pad = ((s, l) => new Array(l + 1 - s.length).join("0") + s);
	let randint = m => Math.floor(Math.random() * m);
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
	let pad = ((s, l) => new Array(l + 1 - s.length).join("0") + s);
	let randint = m => Math.floor(Math.random() * m);
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

if(window.location.href.match(/\/sv\-SE\/checkout\/buy\b/)) {
  CheckoutSE();
} else if(window.location.href.match(/\/nb\-NO\/checkout\/buy\b/)) {
  CheckoutNO();
}
	
})();
