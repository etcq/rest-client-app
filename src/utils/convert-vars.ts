export function convertVars(string: string, vars: Record<string, string>) {
  let result = string;
  if (Object.keys(vars).length === 0) {
    return string;
  }
  const varInString = string.match(/\{\{(.*?)\}\}/g);
  varInString?.forEach((s) => {
    result = result.replace(s, vars[s.replace(/{{|}}/g, '')] || s);
  });
  return result;
}
