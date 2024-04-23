import chalk from "chalk";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const log = (...message: any[]) => write("📝 [LOG]", ...message);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const success = (...message: any[]) => write(chalk.green("✅ [SUCCESS]"), ...message);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const warning = (...message: any[]) => write(chalk.yellow("⚠️ [WARNING]"), ...message);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const info = (...message: any[]) => write( chalk.blue("ℹ️ [INFO]"), ...message);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const error = (...message: any[]) => write(chalk.red("❌ [ERROR]"), ...message);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const debug = (...message: any[]) => write(chalk.whiteBright("🔧 [DEBUG]"), ...message);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const write = (...message: any[]): void => {
  const shouldWrite = process.env.APP_ENV !== "test";

  if (shouldWrite) {
    console.log(...message);
  }
};

export default { success, warning, info, error, log, debug };