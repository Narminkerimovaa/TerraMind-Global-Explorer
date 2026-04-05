function formatNumber(num) {
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

function formatArea(km2) {
  let num = formatNumber(km2);
  return num + "km²";
}

function formatPopulation(num) {
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

class Country {
  constructor(url, country) {
    this.url = url;
    this.country = country;
  }

  async fetchData() {
    try {
      let res = await fetch(this.url + "/" + this.country);
      let data = await res.json();
      this.data = data[0];
    } catch (error) {
      console.log("Xəta baş verdi:", error);
    }
  }
}

function getFlag(country) {
  return country.flags.svg;
}

function getCapital(country) {
  return country.capital?.[0] ?? "N/A";
}

function getNativeName(country) {
  let nativeNames = country.name?.nativeName;
  if (!nativeNames) return country.name.common;
  let firstKey = Object.keys(nativeNames)[0];
  return nativeNames[firstKey].common;
}


// istifadəsi:
// async function somewhere() {
//   let peru = await getCountryInfo("peru");
//   peru.flag;
//   peru.capital;
//   peru.name;
// }
