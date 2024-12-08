// Global flag (g) 
let str = "The cat sat on the mat, It was a cat's lif.t";
let regex = /cat/g;
let matches = str.match(regex);
// console.log(matches)

// Case insensitive Flag (i)
let str2 = "The Cat on the mat, CATS are fun.";
let regex2 = /cat/gi;
let matches2 = str2.match(regex2);
// console.log(matches2);

// Multiline Flag(m)
let str3 = `Hello
World
Test`;
let regex3 = /^/gm;
let lines = str3.replace(regex3, "| ");
// console.log(lines);

// Dotall Flag(s)
let str4 = "Hello\nWorld";
let regex4 = /Hello.(World)/s;
let match4 = str4.match(regex4);
// console.log(match4);


// Unicode Flag (u)
let str5 = "😊👍";
let regex5 = /./gu;
let chars = Array.from(str5.matchAll(regex5), m => m[0]);
// console.log(chars);

// Sticky Flag (y)
let str6 = "abcabc";
let regex6 = /a(?=b)/y;
regex6.lastIndex = 1;
let match6 = regex6.exec(str6);
// console.log(match6);

regex6.lastIndex = 4;
let match7 = regex6.exec(str6);
// console.log(match7);


// .split()
let text = "Contact us at info@example.com or support@example.com for help.";
let emails = text.match(/\b[A-Za-z0-9]+@[a-zA-z0-9.-]+\.[a-z]{2,63}\b/g)
// console.log(emails)

// mobile
let phoneRegex = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
let phoneNumbers = [
    "123-456-7890",
    "(123) 456-7890",
    "123.456.7890",
    "1234567890"
];

// phoneNumbers.forEach(phone => {
//     console.log(`${phone} is ${phoneRegex.test(phone) ? 'valid' : 'invalid'}.`);
// });

// Hashtags
let text1 = "Follow #javaScript and #webdevelopment for updates!";
let hashtags = Array.from(text1.match(/#\w+/g));
// console.log(hashtags)

let text2 = "The quick brown fox jumps over the lazy dog.";
let replaced = text2.replace(/The/gi, "A");
// console.log(replaced)

let text3 = "Apples, oranges; bananas, pears";
let fruits = text3.split(/[;,]/);
// console.log(fruits)

let text4 = "To be or not to be, to TO to that is the question";
let todoCount = (text4.match(/\bto\b/gi) || []).length;
// console.log(todoCount)

let text5 = "visit my website at http://example.com or download from ftp://ftp.example.com.";
let urls = text5.match(/(https?|ftp):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~*#-]*[\w@?^=%&\/~+#-])?/g) || [];
console.log(urls)