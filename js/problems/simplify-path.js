// https://leetcode.com/problems/simplify-path/

const simplifyPath = path => {
  const parts = path.split('/')
    .filter(p => !!p);

  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (p === '.') {
      parts.splice(i, 1);
      i--;
    }
    if (p === '..') {
      if (i === 0) {
        parts.splice(i, 1);
      } else {
        parts.splice(i - 1, 2);
      }
      i = Math.max(-1, i - 2);
    }
  }

  return `/${parts.join('/')}`;
};


console.log(simplifyPath('/a/../../b/../c//.//'));
console.log(simplifyPath('/home/'));
console.log(simplifyPath('/a/./b/../../c/'));
console.log(simplifyPath('/home//foo/'));
console.log(simplifyPath('/home/user/Documents/../Pictures'));
console.log(simplifyPath('/../'));
console.log(simplifyPath('/.../a/../b/c/../d/./'));
