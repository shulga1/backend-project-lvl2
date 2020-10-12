import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const { union, has } = _;

const getDifferences = (obj1, obj2, keys) => {
  const result = ['{'];

  keys.forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (value1 === value2) {
      result.push(`   ${key}: ${value1}`);
    } else if (has(obj1, key) && has(obj2, key)) {
      result.push(` - ${key}: ${value1}`);
      result.push(` + ${key}: ${value2}`);
    } else if (has(obj1, key)) {
      result.push(` - ${key}: ${value1}`);
    } else {
      result.push(` + ${key}: ${value2}`);
    }
  });

  result.push('}');

  return result.join('\n');
};

const gendiff = (file1, file2) => {
  const path1 = path.resolve(file1);
  const path2 = path.resolve(file2);

  try {
    fs.readFileSync(path1);
    fs.readFileSync(path2);
  } catch (err) {
    return 'No such file(s)';
  }

  const obj1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const obj2 = JSON.parse(fs.readFileSync(path2, 'utf8'));
  const keys = union(Object.keys(obj1), Object.keys(obj2)).sort();

  return getDifferences(obj1, obj2, keys);
};

export default gendiff;
