function makeEntry() {
  const date = new Date();
  const pullRequestStr = process.argv[2];
  const files = process.argv.slice(3);
  const PARENT_DIR = files[0].match(process.env.PARENT_DIR + "/([^\/]+)/")[1];

  const pullRequestTicket = pullRequestStr.match(/^\[(.+)\]/)[1];
  const pullRequestName = pullRequestStr.match(/\] (.+)\#/)[1];
  const pullRequestNumber = pullRequestStr.match(/\#(\d+)/)[1];

  console.log(`
${pullRequestTicket} https://${process.env.BOARD}/${pullRequestTicket}
Name: ${pullRequestName}
Date: ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() - 2000}
Description:
Fix: 
Files:
\t${PARENT_DIR.toUpperCase()}
\t${files.map(file => file.split(PARENT_DIR)[1]).join("\n\t")}
Commits: https://github.com/${process.env.GITHUB_PROFILE}/${PARENT_DIR}/pull/${pullRequestNumber}/commits
`)
}

makeEntry()

exports.makeEntry = makeEntry