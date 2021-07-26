import { spawnSync } from "child_process";

const run = (cmd: string, args: any) =>
  spawnSync(cmd, args, { stdio: "inherit" });

export default run;
