"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
function upload_to_intland_server() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { spawn } = require("child_process");
            const test_run_name = tl.getInput("test_run_name", true);
            const test_run_id = tl.getInput("test_run_id", true);
            const server_url = tl.getInput("server_url", true);
            const cb_user = tl.getInput("cb_user", true);
            const cb_password = tl.getInput("cb_password", true);
            const test_configuration_id = tl.getInput("test_configuration_id", true);
            const test_case_tracker_id = tl.getInput("test_case_tracker_id", true);
            const test_run_tracker_id = tl.getInput("test_run_tracker_id", true);
            const test_xml_folder = tl.getInput("test_xml_folder", true);
            const zip = spawn("zip", [
                "-j",
                "-r",
                "tests.zip",
                test_xml_folder,
                "-i",
                "*.xml",
            ]);
            zip.stdout.on("data", (data) => {
                console.log(`${data}`);
            });
            zip.stderr.on("data", (data) => {
                console.log(`stderr: ${data}`);
            });
            zip.on("error", (error) => {
                console.log(`error: ${error.message}`);
                throw error.message;
            });
            var path = require("path");
            const jsPath = path.join(__dirname, "xunit");
            const javaClassPath = `${path.join(jsPath, "xunit.jar")}:${path.join(jsPath, "codebeamer-api-client-1.0.0-all.jar")}`;
            console.log(`path: ${javaClassPath}`);
            const upload = spawn("java", [
                "-cp",
                javaClassPath,
                "com.intland.xunit.XUnitUploader",
                server_url,
                cb_user,
                cb_password,
                test_configuration_id,
                test_case_tracker_id,
                test_run_tracker_id,
                test_run_name,
                test_run_id,
                "tests.zip",
            ]);
            upload.stdout.on("data", (data) => {
                if (!data.includes("aaaaa")) {
                    console.log(`${data}`);
                }
                if (data.includes("ERROR")) {
                    throw Error("Configuration error, please check instance is available and test configuration is correct");
                }
            });
            upload.stderr.on("data", (data) => {
                console.log(`stderr: ${data}`);
            });
            upload.on("error", (error) => {
                console.log(`error: ${error.message}`);
                throw error.message;
            });
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
upload_to_intland_server();
