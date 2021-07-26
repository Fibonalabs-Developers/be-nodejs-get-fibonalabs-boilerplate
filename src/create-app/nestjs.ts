import path from "path";
import chalk from "chalk";
import { shouldUseYarn } from "../utils/should-use-yarn";
import { isWriteable } from "../utils/is-writeable";
import clone from "../utils/clone";
import { install } from "../utils/install";
import run from "../utils/run";
import fs from "fs";
import os from "os";

type TemplateType = {
  url: string;
  repo: string;
  name: string;
};

export async function createApp({
  appPath,
  useNpm,
  template,
  database,
}: {
  appPath: string;
  useNpm: boolean;
  template: TemplateType;
  database: string;
}): Promise<void> {
  const root = path.resolve(appPath);
  const appName = path.basename(root);

  const useYarn = useNpm ? false : shouldUseYarn();
  const displayedCommand = useYarn ? "yarn" : "npm";
  const originalDirectory = process.cwd();

  if (!["mysql", "postgresql"].includes(database)) {
    console.error(`No configuration found for ${chalk.red(database)}`);
    process.exit(1);
  }
  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      "The application path is not writable, please check folder permissions and try again."
    );
    console.error(
      "It is likely you do not have write permissions for this folder."
    );
    process.exit(1);
  }

  //   if (!isFolderEmpty(root, appName)) {
  //     process.exit(1);
  //   }

  console.log();
  console.log(`Creating a new Fibanolabs app in ${chalk.green(root)}.`);
  console.log();

  try {
    let repoUrl: URL | undefined;

    try {
      repoUrl = new URL(template.url);
    } catch (error) {
      if ((error as any).code !== "ERR_INVALID_URL") {
        console.error(error);
        process.exit(1);
      }
    }

    if (repoUrl) {
      console.log(
        `Downloading files from repo ${chalk.cyan(
          template.repo
        )}. This might take a moment.`
      );
      console.log();
      clone(appName, repoUrl.toString());
    } else {
      console.log("No URL Found");
      process.exit(1);
    }
  } catch (reason) {
    //   throw new DownloadError(reason);
    console.error(reason);
    process.exit(1);
  }

  process.chdir(root);

  run("git", ["init", "-q"]);

  console.log();
  console.log("Installing packages. This might take a couple of minutes.");
  console.log();
  await install(root, null, { useYarn });

  let packageJson = JSON.parse(
    fs.readFileSync(path.join(root, "package.json"), "utf8")
  );

  packageJson = {
    ...packageJson,
    name: appName,
  };

  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );

  let cdpath: string;
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log();
  console.log(`${chalk.green("Success!")} Created ${appName} at ${appPath}`);
  console.log("Inside that directory, you can run several commands:");
  console.log();
  console.log("We suggest that you begin by typing:");
  console.log();
  console.log(chalk.cyan("  cd"), cdpath);
  console.log(
    `  ${chalk.cyan(`${displayedCommand} ${useYarn ? "" : "run "}start:dev`)}`
  );
  console.log();
}
