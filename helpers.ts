import * as os from "os";
import * as fs from "fs";
import { execSync } from "child_process";
import { globSync } from "glob";

export function beforeRun(details?) {
  if (!jsonnetExtensionExist()) {
    buildJsonnetExtension();
  }
  // if (os.platform().includes("win")) {
  //   interpretJsonNet(
  //     "./cypress/support/jsonnet/**/*.jsonnet",
  //     ".//cypress//fixtures//tests"
  //   );
  //  else {
  interpretJsonNet(
    "./cypress/support/jsonnet/**/*.jsonnet",
    "./cypress/fixtures/tests"
  );
}
// }

export function beforeSpec(spec?) {
  console.log("spec ::::>", spec);
  console.log(os.platform());
  // if (os.platform().includes("win")) {
  //   interpretJsonNet(
  //     "./cypress/support/jsonnet/**/*" + spec.fileName + "*.jsonnet",
  //     ".//cypress//fixtures//data"
  //   );
  // }
  // else {
  interpretJsonNet(
    "./cypress/support/jsonnet/**/*" + spec.fileName + "*.jsonnet",
    "./cypress/fixtures/data"
  );
}
// }

function jsonnetExtensionExist() {
  return (
    fs.existsSync(".//cypress//support//jsonnet//extensions//jsonnetext.exe") ||
    fs.existsSync("./cypress/support/jsonnet/extensions/jsonnetext.sh")
  );
}

function buildJsonnetExtension() {
  try {
    let execOutput;
    if (os.platform().includes("win")) {
      execOutput = execSync(
        `go build -C .//cypress//support//jsonnet//extensions`
      ).toString();
    } else {
      execOutput = execSync(
        `go build -C ./cypress/support/jsonnet/extensions -o jsonnetext.sh`
      ).toString();
      execSync(`chmod +x ./cypress/support/jsonnet/extensions/jsonnetext.sh`);
    }
    console.log(`Exec Output: ${execOutput}`);
  } catch (err) {
    console.error("An error happened during jsonnet extension build");
    console.error(err);
    console.log(`------------------------------/n`);
    process.exit(1);
  }
}

function interpretJsonNet(input, outFolder) {
  const runner = "jsonnetext.sh";

  const jsonnetFiles = globSync(input);

  for (const file of jsonnetFiles) {
    let outputFileName;
    // if (os.platform().includes("win")) {
    //   outputFileName =
    //     outFolder +
    //     file.substring(file.lastIndexOf("//")).replace(".jsonnet", ".json");
    // } else {
    outputFileName =
      outFolder +
      file.substring(file.lastIndexOf("/")).replace(".jsonnet", ".json");
    // }

    try {
      //   if (os.platform().includes("win")) {
      //     execSync(
      //       `.//cypress//support//jsonnet//extensions//${runner} ${file} ${outputFileName}`
      //     ).toString();
      //   } else {
      execSync(
        `./cypress/support/jsonnet/extensions/${runner} ${file} ${outputFileName}`
      ).toString();
      // }
    } catch (err) {
      console.error(
        "An error happened during jsonnet evaluation for dynamic test creation",
        file
      );
      console.error(err);
      console.log(`------------------------------/n`);
      process.exit(1);
    }
  }
}
