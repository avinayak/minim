export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function addUnsplashScalingParams(url: string) {
  const scaledUrl = new URL(url);
  scaledUrl.searchParams.set("fit", "crop");
  scaledUrl.searchParams.set("w", screen.width.toString());
  scaledUrl.searchParams.set("h", screen.height.toString());
  return scaledUrl.toString();
}

export function omit(obj: any, keys: string[]) {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

export function arrayToSelectOption(array: any[]) {
  return array.map((item) => ({ label: item, value: item }));
}

export function pick(object, keys) {
  return keys.reduce((obj, key) => {
    if (object && object.hasOwnProperty(key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {});
}

export function camelCaseToSentenceCase(str: string) {
  const result = str.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
