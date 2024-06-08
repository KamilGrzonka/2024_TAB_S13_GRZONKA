export function entityBoolToString<T>(object: T) {
  const boolFields = ["wynajmujacy"];

  const wasArray: boolean = Array.isArray(object);

  const objectArray = Array.isArray(object) ? object : [object];

  if (!objectArray.length) {
    return object;
  }

  const foundBoolFields: string[] = [];

  for (const boolField of boolFields) {
    if (Object.prototype.hasOwnProperty.call(objectArray[0], boolField)) {
      foundBoolFields.push(boolField);
    }
  }

  if (foundBoolFields.length) {
    objectArray.forEach((element) => {
      foundBoolFields.forEach((boolField) => {
        element[boolField] = element[boolField] ? "Tak" : "Nie";
      });
    });

    if (wasArray) {
      return objectArray as T;
    } else {
      return objectArray[0] as T;
    }
  }

  return object;
}
