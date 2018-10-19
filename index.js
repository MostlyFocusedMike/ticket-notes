const args = process.argv.slice(2);

const pullRequestStr = args[0];
const files = args.slice(1);
const pullRequestTicket = pullRequestStr.match(/^\[(.+)\]/)[1];
const pullRequestName = pullRequestStr.match(/\] (.+)\#/)[1];
const pullRequestNumber = pullRequestStr.match(/\#(\d+)/)[1];

const repo = files[0].match(process.env.DIR + "/([^\/]+)/")[1];

const entry = `
${pullRequestTicket} ${process.env.BOARD}/${pullRequestTicket}
Name: ${pullRequestName}
Date:
Description:
Fix: 
Files:
${repo.toUpperCase()}

Commits: https://github.com${process.env.COMPANY_REPO}/${repo}/pull/${pullRequestNumber}/commits
`

console.log(entry)