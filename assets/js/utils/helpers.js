export function formatNumber(num) {
  let string = num.toString();
  let result = [];
  let count = 0;
  for (let i = string.length - 1; i >= 0; i--) {
    result.push(string[i]);
    count++;
    if (count % 3 == 0 && i > 0) {
      result.push(",");
    }
  }
  return result.reverse().join("");
}

export function formatArea(km2) {
  let num = formatNumber(km2);
  return num + " km²";
}

export function formatPopulation(num) {
  if (num >= 1000000000) {
    let billion = num / 1000000000;
    return parseFloat(billion.toFixed(2)) + "B";
  } else if (num >= 1000000) {
    let million = num / 1000000;
    return parseFloat(million.toFixed(2)) + "M";
  } else {
    return formatNumber(num);
  }
}

export function getFlag(country) {
  return country.flags.svg;
}

export function getCapital(country) {
  return country.capital?.[0] ?? "N/A";
}

export function getNativeName(country) {
  let nativeNames = country.name?.nativeName;
  if (!nativeNames) return country.name.common;
  let firstKey = Object.keys(nativeNames)[0];
  return nativeNames[firstKey].common;
}


