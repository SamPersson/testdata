(async function() {
    const randint = m => Math.floor(Math.random() * m);
    const pad = ((si, l) => (s => new Array(Math.max(l + 1 - s.length, 0)).join("0") + s)(si.toString()));

    const settings = await browser.storage.local.get();

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

    function capitalize(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    function makePhrase() {
        //const number = randint(30)+2;
        const adjective = ['adorable', 'adventurous', 'alluring', 'amazing', 'ambitious', 'amusing', 'astonishing', 'attractive', 'awesome', 'bashful', 'bawdy', 'beautiful', 'bewildered', 'bizarre', 'bouncy', 'brainy', 'brave', 'brawny', 'burly', 'capricious', 'careful', 'caring', 'cautious', 'charming', 'cheerful', 'chivalrous', 'classy', 'clever', 'clumsy', 'colossal', 'cool', 'coordinated', 'courageous', 'cuddly', 'curious', 'cute', 'daffy', 'dapper', 'dashing', 'dazzling', 'delicate', 'delightful', 'determined', 'eager', 'embarrassed', 'enchanted', 'energetic', 'enormous', 'entertaining', 'enthralling', 'enthusiastic', 'evanescent', 'excited', 'exotic', 'exuberant', 'exultant', 'fabulous', 'fancy', 'festive', 'finicky', 'flashy', 'flippant', 'fluffy', 'fluttering', 'funny', 'furry', 'fuzzy', 'gaudy', 'gentle', 'giddy', 'glamorous', 'gleaming', 'goofy', 'gorgeous', 'graceful', 'grandiose', 'groovy', 'handsome', 'happy', 'hilarious', 'honorable', 'hulking', 'humorous', 'industrious', 'incredible', 'intelligent', 'jazzy', 'jolly', 'joyous', 'kind', 'macho', 'magnificent', 'majestic', 'marvelous', 'mighty', 'mysterious', 'naughty', 'nimble', 'nutty', 'oafish', 'obnoxious', 'outrageous', 'pretty', 'psychedelic', 'psychotic', 'puzzled', 'quirky', 'quizzical', 'rambunctious', 'remarkable', 'sassy', 'shaggy', 'smelly', 'sneaky', 'spiffy', 'swanky', 'sweet', 'swift', 'talented', 'thundering', 'unkempt', 'upbeat', 'uppity', 'wacky', 'waggish', 'whimsical', 'wiggly', 'zany'];
        const noun = ['aardvarks', 'alligators', 'alpacas', 'anteaters', 'antelopes', 'armadillos', 'baboons', 'badgers', 'bears', 'beavers', 'boars', 'buffalos', 'bulls', 'bunnies', 'camels', 'cats', 'chameleons', 'cheetahs', 'centaurs', 'chickens', 'chimpanzees', 'chinchillas', 'chipmunks', 'cougars', 'cows', 'coyotes', 'cranes', 'crickets', 'crocodiles', 'deers', 'dinasaurs', 'dingos', 'dogs', 'donkeys', 'dragons', 'elephants', 'elves', 'ferrets', 'flamingos', 'foxes', 'frogs', 'gazelles', 'giraffes', 'gnomes', 'gnus', 'goats', 'gophers', 'gorillas', 'hamsters', 'hedgehogs', 'hippopotamus', 'hobbits', 'hogs', 'horses', 'hyenas', 'ibexes', 'iguanas', 'impalas', 'jackals', 'jackalopes', 'jaguars', 'kangaroos', 'kittens', 'koalas', 'lambs', 'lemmings', 'leopards', 'lions', 'ligers', 'lizards', 'llamas', 'lynxes', 'meerkat', 'moles', 'mongooses', 'monkeys', 'moose', 'mules', 'newts', 'okapis', 'orangutans', 'ostriches', 'otters', 'oxes', 'pandas', 'panthers', 'peacocks', 'pegasuses', 'phoenixes', 'pigeons', 'pigs', 'platypuses', 'ponies', 'porcupines', 'porpoises', 'pumas', 'pythons', 'rabbits', 'raccoons', 'rams', 'reindeers', 'rhinoceroses', 'salamanders', 'seals', 'sheep', 'skunks', 'sloths', 'slugs', 'snails', 'snakes', 'sphinxes', 'sprites', 'squirrels', 'takins', 'tigers', 'toads', 'trolls', 'turtles', 'unicorns', 'walruses', 'warthogs', 'weasels', 'wolves', 'wolverines', 'wombats', 'woodchucks', 'yaks', 'zebras'];
        const verb = ['ambled', 'assembled', 'burst', 'babbled', 'charged', 'chewed', 'clamored', 'coasted', 'crawled', 'crept', 'danced', 'dashed', 'drove', 'flopped', 'galloped', 'gathered', 'glided', 'hobbled', 'hopped', 'hurried', 'hustled', 'jogged', 'juggled', 'jumped', 'laughed', 'marched', 'meandered', 'munched', 'passed', 'plodded', 'pranced', 'ran', 'raced', 'rushed', 'sailed', 'sang', 'sauntered', 'scampered', 'scurried', 'skipped', 'slogged', 'slurped', 'spied', 'sprinted', 'spurted', 'squiggled', 'squirmed', 'stretched', 'strode', 'strut', 'swam', 'swung', 'traveled', 'trudged', 'tumbled', 'twisted', 'wade', 'wandered', 'whistled', 'wiggled', 'wobbled', 'yawned', 'zipped', 'zoomed'];
        const adverb = ['absentmindedly', 'adventurously', 'angrily', 'anxiously', 'awkwardly', 'bashfully', 'beautifully', 'bleakly', 'blissfully', 'boastfully', 'boldly', 'bravely', 'briskly', 'calmly', 'carefully', 'cautiously', 'cheerfully', 'cleverly', 'cluelessly', 'clumsily', 'coaxingly', 'colorfully', 'coolly', 'courageously', 'curiously', 'daintily', 'defiantly', 'deliberately', 'delightfully', 'diligently', 'dreamily', 'drudgingly', 'eagerly', 'effortlessly', 'elegantly', 'energetically', 'enthusiastically', 'excitedly', 'fervently', 'foolishly', 'furiously', 'gallantly', 'gently', 'gladly', 'gleefully', 'gracefully', 'gratefully', 'happily', 'hastily', 'haphazardly', 'hungrily', 'innocently', 'inquisitively', 'intensely', 'jokingly', 'joshingly', 'joyously', 'jovially', 'jubilantly', 'kiddingly', 'knavishly', 'knottily', 'kookily', 'lazily', 'loftily', 'longingly', 'lovingly', 'loudly', 'loyally', 'madly', 'majestically', 'merrily', 'mockingly', 'mysteriously', 'nervously', 'noisily', 'obnoxiously', 'oddly', 'optimistically', 'overconfidently', 'outside', 'owlishly', 'patiently', 'playfully', 'politely', 'powerfully', 'purposefully', 'quaintly', 'quarrelsomely', 'queasily', 'quickly', 'quietly', 'quirkily', 'quizzically', 'rapidly', 'reassuringly', 'recklessly', 'reluctantly', 'reproachfully', 'sadly', 'scarily', 'seriously', 'shakily', 'sheepishly', 'shyly', 'silently', 'sillily', 'sleepily', 'slowly', 'speedily', 'stealthily', 'sternly', 'suspiciously', 'sweetly', 'tenderly', 'tensely', 'thoughtfully', 'triumphantly', 'unabashedly', 'unaccountably', 'urgently', 'vainly', 'valiantly', 'victoriously', 'warmly', 'wearily', 'youthfully', 'zestfully'];
        const d = new Date();
        const id = pad(d.getYear() % 100, 2) + pad(d.getMonth() + 1, 2) + pad(d.getDate(), 2) + "-" + capitalize(adjective[randint(adjective.length)]) + "-" + capitalize(noun[randint(noun.length)]);
        return id.substr(0, 30);
    }

    function makeEmail(name) {
        const mailDomain = settings.vlineDomains.indexOf(window.location.hostname) !== -1
            ? "@vline.spcs.se"
            : "@mailinator.com";
        return (name || makePhrase()) + mailDomain;
    }

    function tryGetElem(id, f) {
        const e = document.getElementById(id);
        if (e) {
            return f(e);
        }
    }

    function setValue(value, ifEmpty = false) {
        return e => {
            if (!e.disabled) {
                if (ifEmpty && e.value) {
                    return e.value.toString();
                }
                e.autocomplete = "off";
                return e.value = (typeof value === "function") ? value() : value;
            }
        };
    }
        
    function Checkout(country) {
        const regNo = tryGetElem("Customer_OrgNo", setValue(() => getRegNo(country), true));
        const email = tryGetElem("Employee_Email", setValue(makeEmail, true)) || tryGetElem("CompanyContactEmail", e => e.innerText);
        tryGetElem("Customer_Name", setValue(email && email.split("@")[0] || regNo + " customer"));
        tryGetElem("Customer_InvoicingAddress1", setValue("A"));
        tryGetElem("Customer_InvoicingPostalCode", setValue(country === "no" ? "2222" : "22222"));
        tryGetElem("Customer_InvoicingCity", setValue("Stad"));
        tryGetElem("Customer_PhoneNumber", setValue(country === "no" ? "12345678" : "070-1234567"));
        tryGetElem("AcceptTermsOfService", e => e.checked = true);

        tryGetElem("Employee_FirstName", setValue(country + "-Test"));
        tryGetElem("Employee_LastName", setValue(email && email.split("@")[0]) || regNo);
        return { email, regNo };
    }

    function Trial(country) {
        const d = new Date();
        const email = tryGetElem("Email", setValue(makeEmail, true));
        tryGetElem("Firstname", setValue(country + "-Test"));
        tryGetElem("Surname", setValue(email.split("@")[0]));
        tryGetElem("AcceptLicenceAgreement", e => e.checked = true);
        tryGetElem("Phone", setValue(country === "no" ? "12345678" : "070-1234567"));
        return { email };
    }

    function InviteAO(country) {
        const d = new Date();
        const email = tryGetElem("Email", setValue(makeEmail, true));
        tryGetElem("CompanyName", setValue(email.split("@")[0]));
        const regNo = tryGetElem("CorporateIdentityNo", setValue(() => getRegNo(country), true));
        tryGetElem("ContactPersonName", setValue(country + "-Test"));
        return { email, regNo };
    }

    function NewVONCustomer(country) {
        let customerNumber = tryGetElem("maincontentholder_CustomerNoTextBox", e => e.value.trim());
        if(!customerNumber.match(/\d+/)) {
            customerNumber = tryGetElem("maincontentholder_CustomerNoTextBox", setValue(randint(100000000)))
        }
        tryGetElem("maincontentholder_CustomerNameTextBox", setValue(country + customerNumber));
        const regNo = tryGetElem("maincontentholder_NewOrgNoTextBox", setValue(() => getRegNo(country), true));
        tryGetElem("maincontentholder_NewInvoiceAddress1TextBox", setValue("A"));
        tryGetElem("maincontentholder_NewInvoicePostalCodeTextBox", setValue(country === "no" ? "2222" : "22222"));
        tryGetElem("maincontentholder_NewInvoiceCityTextBox", setValue("Stad"));
        const email = tryGetElem("maincontentholder_EmailTextBox", setValue(() => makeEmail(country + customerNumber), true));
        tryGetElem("maincontentholder_FirstNameTextBox", setValue(country + "-Test"));
        tryGetElem("maincontentholder_LastNameTextBox", setValue(customerNumber));
        return { email, regNo };
    }

    function NewVCPassword() {
        tryGetElem("Password", setValue("Asdf1234!!"));
        tryGetElem("RetypePassword", setValue("Asdf1234!!"));
    }

    const topDomain = location.host.split(".").pop().split(":").pop();

    const m = window.location.href.match(/\/[a-z]{2}\-([A-Z]{2})\//);
    if(m) {
        const country = m[1].toLowerCase();
        if(document.getElementById("Customer_OrgNo")) {
            return Checkout(country);
        }
        else if (document.getElementById("SendInvitationToAO")) {
            return InviteAO(country);
        }
        else if(document.getElementById("Email"))     {
            return Trial(country);
        }
    } 
    else if(window.location.href.match(/\/administration\/Internal\/AddNewCustomer\.aspx\b/i)) {
        const country = { "se":"se", "no":"no", "81":"no" }[topDomain] || "se";
        return NewVONCustomer(country);
    } else if (document.getElementById("Password") && document.getElementById("RetypePassword")) { // VC
        return NewVCPassword();
    }
})().then(data => {
    if (data) {
        browser.runtime.sendMessage(data);
    }
});

