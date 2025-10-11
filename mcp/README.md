# MCP Codegen Harness

Record manual interactions in the browser and save clean Playwright test code with clear filenames and metadata.

## Quick start

- To start codegen and choose a URL on your own:
  - npm run codegen

- To start on a specific URL:
  - APP_URL=https://example.com npm run codegen
  - Or provide as a flag: npm run codegen -- --url=https://example.com

- Optional context fields to shape filenames and metadata:
  - MODULE, SCENARIO, TEST_NAME
  - Example:
    - MODULE=Demo SCENARIO=Learner_Login TEST_NAME=LoginFlow npm run codegen

All recordings are saved under `mcp/recordings` as timestamped `.spec.ts` files along with a `.meta.json` containing the context.

## Notes

- The generated test targets Playwright Test (`--target=playwright-test`).
- Storage state is saved next to the spec so you can re-use session data if desired. To disable saving storage, pass `--no-storage`.
- To filter storage to your own domains and drop 3rd-party (e.g. YouTube), pass `--allow-domains=qaprod1.expertusoneqa.cloud,universalprofile.expertusoneqa.cloud`.
- After recording, review the spec: consolidate locators, add meaningful assertions, and integrate into `tests/`.

### Examples

- Record with storage filtered to first-party domains only:
  - npm run codegen -- --url=https://qaprod1.expertusoneqa.cloud/learner/qaprod1/ --module=Demo --scenario=Learner_Login_Demo --name=Demo_Learner_Login --allow-domains=qaprod1.expertusoneqa.cloud,universalprofile.expertusoneqa.cloud

- Record without saving storage at all:
  - npm run codegen -- --url=https://qaprod1.expertusoneqa.cloud/learner/qaprod1/ --no-storage