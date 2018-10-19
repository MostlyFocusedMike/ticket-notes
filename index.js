function envNotSetup() {
  let msg = "";
  const makeMsg = (env) => msg = `You're missing the ${env} variable`;
  if (!process.env.BOARD) { makeMsg("BOARD") }
  if (!process.env.PARENT_DIR) { makeMsg("PARENT_DIR") }
  if (!process.env.GITHUB_PROFILE) { makeMsg("GITHUB_PROFILE") }
  if (process.argv.length <= 3) { msg = "You have to provide the pull request string and at least one file" }
  if (msg) {
    console.log(msg)
    return true
  }
}

function makeEntry() {
  if (envNotSetup()) { return false; }

  const date = new Date();
  const pullRequestStr = process.argv[2];
  const files = process.argv.slice(3);
  const REPO = files[0].match(process.env.PARENT_DIR + "/([^\/]+)/")[1];

  const pullRequestTicket = pullRequestStr.match(/^\[(.+)\]/)[1].trim();
  const pullRequestName = pullRequestStr.match(/\] (.+)\#/)[1].trim();
  const pullRequestNumber = pullRequestStr.match(/\#(\d+)/)[1].trim();

  console.log(`
${pullRequestTicket} https://${process.env.BOARD}/${pullRequestTicket}
Name: ${pullRequestName}
Date: ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() - 2000}
Description:
Fix:
Files:
\t${REPO.toUpperCase()}
\t${files.map(file => file.split(REPO)[1]).join("\n\t")}
Commits: https://github.com/${process.env.GITHUB_PROFILE}/${REPO}/pull/${pullRequestNumber}/commits
`)
  return true; // since the log will not return anything
}

exports.makeEntry = makeEntry