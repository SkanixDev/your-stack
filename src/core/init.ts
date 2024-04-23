import inquirer from "inquirer";
import { existingProject, getConfigFile, validateProjectName } from "../utils/utils";
import logger from "../logger";
import chalk from "chalk";
import yaml from "js-yaml";
import fs from "node:fs";

import type { ConfigFile } from "../types/types";

export function initializeForm(){
    
    const configFile = getConfigFile();
    const emptyFolderProject = !existingProject();

    console.info("• Welcome to your project initialization wizard. Let's get started!")

    if (configFile) {
        logger.warning("This folder may be already a project.");
    }

    const prompt = inquirer.createPromptModule();

    prompt([
        {
            type: "input",
            name: "projectName",
            message: "Project name:",
            validate: (input) => {
                if (!input) {
                    return "Project name is required";
                }
                const validateNameOfProject = validateProjectName(input);
                if (!validateNameOfProject[0]) {
                    return `Invalid project name: ${validateNameOfProject[1] ? chalk.red(validateNameOfProject[1].toString()): ""} ${validateNameOfProject[2] ? chalk.red(validateNameOfProject[2]?.toString()): ""}`;
                }

                return true;
            },
        },
        {
            type: "input",
            name: "description",
            message: "Description:",
            default: "A new project"
        },
        {
            type: "input",
            name: "author",
            message: "Author:",
        },
        {
            type: "confirm",
            name: "currentFolder",
            message: "Do you want to initialize the project in the current folder?",
            default: false,
            when: (answers) => {
                if (!emptyFolderProject) {
                    return false;
                }
                return true;
            }
        },
        {
            type: "list",
            name: "typeproject",
            message: "Project type:",
            choices: [
                "web application",
                {
                    name: "nodejs application",
                    disabled: "Soon...",
                }
            ],
        },
        {
            type: "list",
            name: "technologyForWebApp",
            message: "Choose technology:",
            choices: [
                "React",
                "Vue",
                "Svelte",
            ],
            when: (answers) => answers.typeproject === "web application",
        },
        {
            type: "list",
            name: "designframework",
            message: "Choose design framework:",
            choices: [
                "CSS",
                "SCSS",
                "Tailwind",
                "Bootstrap",
                "Shadcn",
                "Tamagui"
            ],
            when: (answers) => answers.typeproject === "web application",
        },
        {
            type: "list",
            name: "packageManager",
            message: "Choose package manager:",
            choices: [
                "npm",
                "yarn",
            ],
            when: (answers) => answers.typeproject === "web application",
        },
        {
            type: "confirm",
            name: "installDependencies",
            message: "Install dependencies?",
            default: true,
        },
    ]).then((answers: ConfigFile) => {
        logger.info("Create the config file...");
        createConfigFile(answers);
    });
}


function createConfigFile(answers: ConfigFile) {
    const yamlConfig = yaml.dump(answers);
    if (answers.currentFolder === false) {
        fs.mkdirSync(answers.projectName);
        fs.writeFileSync(`${answers.projectName}/ys.config.yaml`, yamlConfig);
    }
    else {
        fs.writeFileSync("ys.config.yaml", yamlConfig);
    }
}
