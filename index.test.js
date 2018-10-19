const entry = require('./index')
describe('Main test', () => {
  beforeAll(() => {
    process.argv = ["", "", "[ticket] stop duplicated course creation #1124", "usr/mike/holder/my-repo/src/thing", "usr/mike/holder/my-repo/src/other"]
    process.env.BOARD = "kanban.com"
    process.env.GITHUB_PROFILE = "company-name"
    process.env.PARENT_DIR = "holder"
    this.outputData = "";
    const storeLog = inputs => (this.outputData += inputs);
    console["log"] = jest.fn(storeLog);
  })

  describe('Environment Variables', () => {
    afterEach(() => {
      process.env.BOARD = "kanban.com"
      process.env.GITHUB_PROFILE = "company-name"
      process.env.PARENT_DIR = "holder"
      this.outputData = "";
    });

    test('it should fail if there is no BOARD env variable', () => {
      process.env.BOARD = ""
      expect(entry.makeEntry()).toBeFalsy();
      expect(this.outputData).toBe("You're missing the BOARD variable");
    });
    test('it should fail if there is no GITHUB_PROFILE env variable', () => {
      process.env.GITHUB_PROFILE = ""
      expect(entry.makeEntry()).toBeFalsy();
      expect(this.outputData).toBe("You're missing the GITHUB_PROFILE variable");
    });
    test('it should fail if there is no PARENT_DIR env variable', () => {
      process.env.PARENT_DIR = ""
      expect(entry.makeEntry()).toBeFalsy();
      expect(this.outputData).toBe("You're missing the PARENT_DIR variable");
    });
  });


  describe("Handles args correctly", () => {
    afterEach(() => {
      this.outputData = "";
    });

    test('it should fail if there are not enough args', () => {
      process.argv = ["", "", "[ticket] stop duplicated course creation #1124"]
      expect(entry.makeEntry()).toBeFalsy();
      expect(this.outputData).toBe("You have to provide the pull request string and at least one file");
    });
    test('it should return true if successful', () => {
      process.argv = ["", "", "[ticket] stop duplicated course creation #1124", "usr/mike/holder/my-repo/src/thing", "usr/mike/holder/my-repo/src/other"]
      const date = new Date();
      expect(entry.makeEntry()).toBeTruthy();
      expect(this.outputData).toBe(`
ticket https://${process.env.BOARD}/ticket
Name: stop duplicated course creation
Date: ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() - 2000}
Description:
Fix:
Files:
\tMY-REPO
\t/src/thing
\t/src/other
Commits: https://github.com/${process.env.GITHUB_PROFILE}/my-repo/pull/1124/commits
`)
    })
  })
})