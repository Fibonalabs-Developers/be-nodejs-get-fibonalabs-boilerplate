import spawn from "cross-spawn";

type InstallArgs = {
  useYarn: boolean;
  devDependencies?: boolean;
};

export async function install(
  root: string,
  dependencies: string[] | null,
  { useYarn, devDependencies }: InstallArgs
): Promise<void> {
  return new Promise((resolve, reject) => {
    let command: string = useYarn ? "yarnpkg" : "npm";
    let args: string[];

    args = ["install"];

    console.log(root);
    /**
     * Spawn the installation process.
     */

    const child = spawn(command, args, {
      stdio: "inherit",
      env: { ...process.env, ADBLOCK: "1", DISABLE_OPENCOLLECTIVE: "1" },
    });
    child.on("close", (code) => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(" ")}` });
        return;
      }
      resolve();
    });
  });
}
