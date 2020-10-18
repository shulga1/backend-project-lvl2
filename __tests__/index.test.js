import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('json files', () => {
  const before = getFixturePath('before.json');
  const after = getFixturePath('after.json');
  const result = readFile('jsonResult').trim();
  expect(gendiff(before, after)).toBe((result));
});
