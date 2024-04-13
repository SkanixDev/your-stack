import fs from 'node:fs';
import path from 'node:path';
import validateNpmPackageName from 'validate-npm-package-name';
import logger from '../logger';

export function getConfigFile() {
  const configPath = path.resolve(process.cwd(), 'ys.config.yaml');
  if (fs.existsSync(configPath)) {
    return fs.readFileSync(configPath, 'utf-8');
  }
    return '';
}

export function existingProject(pathProject: string = process.cwd()) {
  const content = fs.readdirSync(pathProject);
  return content.length > 0;
}

export function validateProjectName(projectName: string) {
  const validation = validateNpmPackageName(projectName);
  if(!validation.validForNewPackages) {
    return [false, validation.errors, validation.warnings];
  }
  return [true, "", ""];
}