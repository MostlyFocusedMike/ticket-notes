function envNotSetup() {

  const msg = (env) => `You're missing the ${env} variable`;
  if (!process.env.BOARD) {
    console.log(msg("BOARD"))
    return true;
  }
  if (!process.env.PARENT_DIR) {
    console.log(msg("PARENT_DIR"))
    return true;
  }
  if (!process.env.GITHUB_PROFILE) {
    console.log(msg("GITHUB_PROFILE"))
    return true;
  }
  if (process.argv.length <= 3) {
    console.log("You have to provide the pull request string and at least one file")
    return true;
  }
}

function makeEntry() {
  if (envNotSetup()) { return false; }

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
  return true; // since the log will not return anything
}

makeEntry()

exports.makeEntry = makeEntry