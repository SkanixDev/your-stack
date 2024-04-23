import fs from "node:fs";
import logger from "../logger";
import yaml from "js-yaml";

export function prepareProject(configFilePath = `${process.cwd()}/ys.config.yaml`) {
    
    logger.info("Preparing the project...");
    logger.info("Checking the configuration file...");

    const configFile = fs.existsSync(configFilePath) ? yaml.load(fs.readFileSync(configFilePath, "utf-8")) : null;
    let rootProject = configFilePath;

    if(!configFile) {
        logger.error("The configuration file is missing.");
        return;
    }

    logger.success("The configuration file is found.");

    
    console.log(configFile);
    
}