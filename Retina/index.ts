import tl = require("azure-pipelines-task-lib");

async function upload_to_intland_server() {
  try {
    const { spawn } = require("child_process");

    const test_run_name: string | undefined = tl.getInput(
      "test_run_name",
      true
    );
    const test_run_id: string | undefined = tl.getInput("test_run_id", true);

    const server_url: string | undefined = tl.getInput("server_url", true);
    const retina_user: string | undefined = tl.getInput("retina_user", true);
    const retina_password: string | undefined = tl.getInput(
      "retina_password",
      true
    );

    const test_configuration_id: string | undefined = tl.getInput(
      "test_configuration_id",
      true
    );
    const test_case_tracker_id: string | undefined = tl.getInput(
      "test_case_tracker_id",
      true
    );
    const test_run_tracker_id: string | undefined = tl.getInput(
      "test_run_tracker_id",
      true
    );

    const test_xml_folder: string | undefined = tl.getInput(
      "test_xml_folder",
      true
    );

    const zip = spawn("zip", [
      "-j",
      "-r",
      "tests.zip",
      test_xml_folder,
      "-i",
      "*.xml",
    ]);

    zip.stdout.on("data", (data: string) => {
      console.log(`${data}`);
    });

    zip.stderr.on("data", (data: string) => {
      console.log(`stderr: ${data}`);
    });

    zip.on("error", (error: any) => {
      console.log(`error: ${error.message}`);
      throw error.message;
    });

    var path = require("path");
    const jsPath: string = path.join(__dirname, "xunit");
    const javaClassPath: string = `${path.join(
      jsPath,
      "xunit.jar"
    )}:${path.join(jsPath, "codebeamer-api-client-1.0.0-all.jar")}`;
    console.log(`path: ${javaClassPath}`);

    if (server_url == undefined) {
      throw "Server url needs to be defined.";
    }

    const upload = spawn("java", [
      "-cp",
      javaClassPath,
      "com.intland.xunit.XUnitUploader",
      server_url.replace("/retina", "/cb"),
      retina_user,
      retina_password,
      test_configuration_id,
      test_case_tracker_id,
      test_run_tracker_id,
      test_run_name,
      test_run_id,
      "tests.zip",
    ]);

    upload.stdout.on("data", (data: string) => {
      if (!data.includes("aaaaa")) {
        console.log(`${data}`);
      }

      if (data.includes("ERROR")) {
        throw Error(
          "Configuration error, please check instance is available and test configuration is correct"
        );
      }
    });

    upload.stderr.on("data", (data: string) => {
      console.log(`stderr: ${data}`);
    });

    upload.on("error", (error: any) => {
      console.log(`error: ${error.message}`);
      throw error.message;
    });
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

upload_to_intland_server();
