const entry = require('./index')

describe('Environment Variables', () => {
  beforeEach(() => {
    process.argv = ["", "", "[ticket] stop duplicated course creation #1124", "usr/mike/holder/my-repo/src/thing", "usr/mike/holder/my-repo/src/other"]
    process.env.BOARD = "kanban.com"
    process.env.GITHUB_PROFILE = "company-name"
    process.env.PARENT_DIR = "holder"
  });

  test('fail if there is no BOARD env variable', () => {
    process.env.BOARD = ""
    expect(entry.makeEntry()).toBeFalsy();
  });
  test('fail if there is no GITHUB_PROFILE env variable', () => {
    process.env.GITHUB_PROFILE = ""
    expect(entry.makeEntry()).toBeFalsy();
  });
  test('fail if there is no PARENT_DIR env variable', () => {
    process.env.PARENT_DIR = ""
    expect(entry.makeEntry()).toBeFalsy();
  });
});

describe("Handles args correctly", () => {
  beforeAll(() => {
    process.env.BOARD = "kanban.com"
    process.env.GITHUB_PROFILE = "company-name"
    process.env.PARENT_DIR = "holder"
  });

  test('fail if there are not enough args', () => {
    process.argv = ["", "", "[ticket] stop duplicated course creation #1124"]
    expect(entry.makeEntry()).toBeFalsy();
  });
  test('return true', () => {
    process.argv = ["", "", "[ticket] stop duplicated course creation #1124", "usr/mike/holder/my-repo/src/thing", "usr/mike/holder/my-repo/src/other"]
    expect(entry.makeEntry()).toBeTruthy();
  })
})