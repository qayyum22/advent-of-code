const input = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const arr = input.split("\n\n");
const rules = [...arr[0].split("\n")];
const updatedRules = rules.map((rule) => {
  const [key, value] = rule.split("|").map(Number);
  return [ key, value ];
});
const updates = arr[1].split("\n");
console.log("rules : ", updatedRules);

// const updatedUpdates = [];
// updates.forEach((update) => {
  
//   updatedUpdates.push([key, value]);
// });
// console.log("updated : ", updatedUpdates);


const m = ['75,47,61,53,29'];
const updatedM = m.map((x) => x.split(',').map(Number));
console.log("updatedM : ", updatedM[0]);

