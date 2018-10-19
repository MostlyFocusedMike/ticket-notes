// this is required for jest testing of command line arguments
// it has to come first
process.argv = ["", "", "[ticket] stop duplicated course creation #1124", "usr/mike/holder/my-repo/src/thing", "usr/mike/holder/my-repo/src/other"]
process.env.BOARD = "kanban.com"
process.env.GITHUB_PROFILE = "company-name"
process.env.PARENT_DIR = "holder"

const entry = require('./index')

describe('Environment Variables', () => {
  
  test('fail if there is no BOARD env variable', () => {
    process.env.BOARD = ""
    const realProcess = process;
    const exitMock = jest.fn();

    // We assign all properties of the "real process" to
    // our "mock" process, otherwise, if "myFunc" relied
    // on any of such properties (i.e `process.env.NODE_ENV`)
    // it would crash with an error like:
    // `TypeError: Cannot read property 'NODE_ENV' of undefined`.
    global.process = { ...realProcess, exit: exitMock };

    entry.makeEntry()
    expect(exitMock).toHaveBeenCalled();
    global.process = realProcess;
    // process.env.BOARD = "kanban.com"
  });
});