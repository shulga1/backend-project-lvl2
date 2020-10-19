import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parser = (file) => {
  const extension = path.extname(file);

  if (extension === '.json') {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  if (extension === '.yml') {
    return yaml.safeLoad(fs.readFileSync(file, 'utf8'));
  }

  return 'The extension not found';
};

export default parser;
