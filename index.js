import * as os from "os";
import * as fs from "fs";
import { execSync } from "child_process";
import { globSync } from "glob";

export function beforeRun(details) {
  var tests = './cypress/fixtures/tests';
  if (!fs.existsSync(tests)){
      fs.mkdirSync(tests, { recursive: true });
  }
  var data = './cypress/fixtures/data';
  if (!fs.existsSync(data)){
    fs.mkdirSync(data, { recursive: true });
  }
  var jsonete = './cypress/support/jsonnet/';
    if (!fs.existsSync(jsonete)){
      fs.mkdirSync(jsonete, { recursive: true });
  } //Craate Folders for DEMO ONLY

  
  if (!jsonnetExtensionExist()) {
    buildJsonnetExtension();
  }
  // if (os.platform().includes("win32")) {
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

export function beforeSpec(spec) {
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
    fs.existsSync(".//node_modules//sample_cy_plugin//jsonnet//jsonnetext.exe") ||
    fs.existsSync("./node_modules/sample_cy_plugin/jsonnet/jsonnetext.sh")
  );
}

function buildJsonnetExtension() {
  try {
    let execOutput;
    if (os.platform().includes("win32")) {
      execOutput = execSync(
        `go build -C .//node_modules//sample_cy_plugin//jsonnet//`
      ).toString();
    } else {
      execOutput = execSync(
        `go build -C ./node_modules/sample_cy_plugin/jsonnet/ -o jsonnetext.sh`
      ).toString();
      execSync(`chmod +x ./node_modules/sample_cy_plugin/jsonnet/jsonnetext.sh`);
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
        `./node_modules/sample_cy_plugin/jsonnet/${runner} ${file} ${outputFileName}`
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
