const args = process.argv.slice(2);

const pullRequestStr = args[0];
const files = args.slice(1);
const pullRequestTicket = pullRequestStr.match(/^\[(.+)\]/)[1]
const pullRequestName = pullRequestStr.match(/\] (.+)\#/)[1]
const pullRequestNumber = pullRequestStr.match(/\#(\d+)/)[1]

const DIR = process.env.DIR

console.log(DIR)
console.log(pullRequestTicket)
console.log(pullRequestName)
console.log(pullRequestNumber)