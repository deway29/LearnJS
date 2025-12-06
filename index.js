// Left-aligned triangle
function leftTriangle(n) {
  let result = '';
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      result += '*';
    }
    result += '\n';
  }
  return result;
}

console.log(leftTriangle(5));
