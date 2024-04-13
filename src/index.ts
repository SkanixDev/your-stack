#!/usr/bin/env node

import { Command } from "commander";
import { initializeForm } from "./core/init";
import { prepareProject } from "./core/prepare";

const program = new Command();

program
    .command("init")
    .description("Initialize a new project")
    .action(async () => {
        initializeForm();
    });

program
    .command("prepare")
    .description("Prepare the project")
    .action(async () => {
        console.log("Preparing the project...");
        prepareProject();
    });

program.parse(process.argv);