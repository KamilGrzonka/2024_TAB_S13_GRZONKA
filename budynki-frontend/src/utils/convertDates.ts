function convertDates<T>(object: T, fn: (date: Date) => Date | string) {
  const dateFields = [
    "dataZawarcia",
    "dataZrealizowania",
    "dataPoczatkowa",
    "dataKoncowa",
    "dataMeldunku",
    "dataWymeldowania",
    "dataZgloszenia",
    "dataWykonania",
    "dataRozpoczecia",
    "dataZakonczenia",
  ];

  const wasArray: boolean = Array.isArray(object);

  const objectArray = Array.isArray(object) ? object : [object];

  if(!objectArray.length) {
    return object;
  }

  const foundDateFields: string[] = [];

  for (const dateField of dateFields) {
    if (Object.prototype.hasOwnProperty.call(objectArray[0], dateField)) {
      foundDateFields.push(dateField);
    }
  }

  if (foundDateFields.length) {
    objectArray.forEach((element) => {
      foundDateFields.forEach((dateField) => {
        element[dateField] = fn(element[dateField]);
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

function toDates(date: Date) {
  return date ? new Date(date) : undefined as unknown as Date;
}

function toString(date: Date) {
  return date ? date.toLocaleDateString() : "";
}

export function entityDateToDate<T>(object: T) {
  return convertDates(object, toDates);
}

export function entityDateToString<T>(object: T) {
  return convertDates(object, toString);
}
