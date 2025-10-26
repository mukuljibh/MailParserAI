export function cleanStr(str: any): string | null {
  if (!str || typeof str !== "string") {
    console.log("Invalid input to cleanStr:", str);
    return null;
  }

  let validEmailRegx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  let emailMatch = str.match(validEmailRegx);

  return emailMatch ? emailMatch[0] : null;
}
