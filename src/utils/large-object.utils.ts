let largeObjectArray: Record<string, string>[] | null = null;

export function getLargeObjectArray() {
  if (largeObjectArray === null) {
    largeObjectArray = createLargeObjectArray();
  }
  return largeObjectArray;
}

function createLargeObject(): Record<string, string> {
  const largeObject: Record<string, string> = {};
  for (let i = 0; i < 500; i++) {
    largeObject[`${i}`] = `${i}`;
  }
  return largeObject;
}

function createLargeObjectArray(): Record<string, string>[] {
  const largeObject = createLargeObject();
  const largeObjectArray: Record<string, string>[] = [];

  for (let i = 0; i < 50; i++) {
    largeObjectArray.push(largeObject);
  }

  return largeObjectArray;
}
