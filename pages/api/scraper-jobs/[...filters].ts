// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { spawn } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";

const exectuteScript = (...commands: string[]): Promise<string> =>
  new Promise((resolve, reject) => {
    let dataToSend: any = null;
    // spawn new child process to call the python script
    const python = spawn("python", ["bin/exec.py", ...commands]);

    // collect data from script
    python.stdout.on("data", function (data) {
      dataToSend = data.toString();
      console.log({ dataToSend })
      resolve(dataToSend);
    });

    python.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      reject(`stderr: ${data}`);
    });

    // in close event we are sure that stream from child process is closed
    python.on("exit", (code) => {
      console.log(`child process exited with code ${code}, ${dataToSend}`);
    });
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let jobsite = "a";
    let role = "";
    const { filters } = req.query;
    if (Array.isArray(filters)) {
      jobsite = filters[0];
      role = filters[1];
    } else {
      jobsite = filters || jobsite;
    }

    const data = await exectuteScript("list", "--list", jobsite);
   
    return res.status(200).json(JSON.parse(data));
  } catch (err: unknown) {
    let error = err as { message: string };
    return res.status(400).json({
      message: error?.message,
    });
  }
}
