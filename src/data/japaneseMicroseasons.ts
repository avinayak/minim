// Japanese 72 microseasons (shichijūni kō) data
// Each microseason lasts approximately 5 days

export interface Microseason {
  start: string; // MM-DD format
  end: string;   // MM-DD format
  sekki: {
    japanese: string;
    english: string;
  };
  ko: {
    japanese: string;
    english: string;
  };
}

export const microseasons: Microseason[] = [
  // Spring (Haru) - 立春 to 立夏
  { start: "02-04", end: "02-08", sekki: { japanese: "立春", english: "Beginning of Spring" }, ko: { japanese: "東風解凍", english: "East wind melts the ice" } },
  { start: "02-09", end: "02-13", sekki: { japanese: "立春", english: "Beginning of Spring" }, ko: { japanese: "黄鶯睍睆", english: "Bush warblers start singing" } },
  { start: "02-14", end: "02-18", sekki: { japanese: "立春", english: "Beginning of Spring" }, ko: { japanese: "魚上氷", english: "Fish emerge from ice" } },
  
  { start: "02-19", end: "02-23", sekki: { japanese: "雨水", english: "Rain Water" }, ko: { japanese: "土脉潤起", english: "Soil becomes moist" } },
  { start: "02-24", end: "02-28", sekki: { japanese: "雨水", english: "Rain Water" }, ko: { japanese: "霞始靆", english: "Mist begins to linger" } },
  { start: "03-01", end: "03-05", sekki: { japanese: "雨水", english: "Rain Water" }, ko: { japanese: "草木萌動", english: "Grass and trees begin to sprout" } },
  
  { start: "03-06", end: "03-10", sekki: { japanese: "啓蟄", english: "Awakening of Insects" }, ko: { japanese: "蟄虫啓戸", english: "Hibernating insects surface" } },
  { start: "03-11", end: "03-15", sekki: { japanese: "啓蟄", english: "Awakening of Insects" }, ko: { japanese: "桃始笑", english: "Peach blossoms begin to bloom" } },
  { start: "03-16", end: "03-20", sekki: { japanese: "啓蟄", english: "Awakening of Insects" }, ko: { japanese: "菜虫化蝶", english: "Caterpillars become butterflies" } },
  
  { start: "03-21", end: "03-25", sekki: { japanese: "春分", english: "Spring Equinox" }, ko: { japanese: "雀始巣", english: "Sparrows start to nest" } },
  { start: "03-26", end: "03-30", sekki: { japanese: "春分", english: "Spring Equinox" }, ko: { japanese: "櫻始開", english: "Cherry blossoms begin to bloom" } },
  { start: "03-31", end: "04-04", sekki: { japanese: "春分", english: "Spring Equinox" }, ko: { japanese: "雷乃発声", english: "Thunder begins to sound" } },
  
  { start: "04-05", end: "04-09", sekki: { japanese: "清明", english: "Clear and Bright" }, ko: { japanese: "玄鳥至", english: "Swallows return" } },
  { start: "04-10", end: "04-14", sekki: { japanese: "清明", english: "Clear and Bright" }, ko: { japanese: "鴻雁北", english: "Wild geese fly north" } },
  { start: "04-15", end: "04-19", sekki: { japanese: "清明", english: "Clear and Bright" }, ko: { japanese: "虹始見", english: "First rainbows appear" } },
  
  { start: "04-20", end: "04-24", sekki: { japanese: "穀雨", english: "Grain Rain" }, ko: { japanese: "葭始生", english: "Reeds begin to sprout" } },
  { start: "04-25", end: "04-29", sekki: { japanese: "穀雨", english: "Grain Rain" }, ko: { japanese: "霜止出苗", english: "Last frost; rice seedlings grow" } },
  { start: "04-30", end: "05-04", sekki: { japanese: "穀雨", english: "Grain Rain" }, ko: { japanese: "牡丹華", english: "Peonies bloom" } },
  
  // Summer (Natsu) - 立夏 to 立秋
  { start: "05-05", end: "05-09", sekki: { japanese: "立夏", english: "Beginning of Summer" }, ko: { japanese: "蛙始鳴", english: "Frogs start singing" } },
  { start: "05-10", end: "05-14", sekki: { japanese: "立夏", english: "Beginning of Summer" }, ko: { japanese: "蚯蚓出", english: "Earthworms emerge" } },
  { start: "05-15", end: "05-20", sekki: { japanese: "立夏", english: "Beginning of Summer" }, ko: { japanese: "竹笋生", english: "Bamboo shoots sprout" } },
  
  { start: "05-21", end: "05-25", sekki: { japanese: "小満", english: "Lesser Fullness" }, ko: { japanese: "蚕起食桑", english: "Silkworms start feasting on mulberry leaves" } },
  { start: "05-26", end: "05-30", sekki: { japanese: "小満", english: "Lesser Fullness" }, ko: { japanese: "紅花栄", english: "Safflowers bloom" } },
  { start: "05-31", end: "06-05", sekki: { japanese: "小満", english: "Lesser Fullness" }, ko: { japanese: "麦秋至", english: "Wheat ripens and is harvested" } },
  
  { start: "06-06", end: "06-10", sekki: { japanese: "芒種", english: "Grain in Ear" }, ko: { japanese: "螳螂生", english: "Praying mantises hatch" } },
  { start: "06-11", end: "06-15", sekki: { japanese: "芒種", english: "Grain in Ear" }, ko: { japanese: "腐草為螢", english: "Rotten grass becomes fireflies" } },
  { start: "06-16", end: "06-20", sekki: { japanese: "芒種", english: "Grain in Ear" }, ko: { japanese: "梅子黄", english: "Plums turn yellow" } },
  
  { start: "06-21", end: "06-26", sekki: { japanese: "夏至", english: "Summer Solstice" }, ko: { japanese: "乃東枯", english: "Self-heal withers" } },
  { start: "06-27", end: "07-01", sekki: { japanese: "夏至", english: "Summer Solstice" }, ko: { japanese: "菖蒲華", english: "Irises bloom" } },
  { start: "07-02", end: "07-06", sekki: { japanese: "夏至", english: "Summer Solstice" }, ko: { japanese: "半夏生", english: "Crow-dipper sprouts" } },
  
  { start: "07-07", end: "07-11", sekki: { japanese: "小暑", english: "Lesser Heat" }, ko: { japanese: "温風至", english: "Warm winds blow" } },
  { start: "07-12", end: "07-16", sekki: { japanese: "小暑", english: "Lesser Heat" }, ko: { japanese: "蓮始開", english: "Lotus flowers begin to bloom" } },
  { start: "07-17", end: "07-22", sekki: { japanese: "小暑", english: "Lesser Heat" }, ko: { japanese: "鷹乃学習", english: "Hawks learn to fly" } },
  
  { start: "07-23", end: "07-27", sekki: { japanese: "大暑", english: "Greater Heat" }, ko: { japanese: "桐始結花", english: "Paulownia produces seeds" } },
  { start: "07-28", end: "08-01", sekki: { japanese: "大暑", english: "Greater Heat" }, ko: { japanese: "土潤溽暑", english: "Soil is damp, air is humid" } },
  { start: "08-02", end: "08-06", sekki: { japanese: "大暑", english: "Greater Heat" }, ko: { japanese: "大雨時行", english: "Great rains sometimes fall" } },
  
  // Autumn (Aki) - 立秋 to 立冬
  { start: "08-07", end: "08-11", sekki: { japanese: "立秋", english: "Beginning of Autumn" }, ko: { japanese: "涼風至", english: "Cool winds blow" } },
  { start: "08-12", end: "08-16", sekki: { japanese: "立秋", english: "Beginning of Autumn" }, ko: { japanese: "寒蝉鳴", english: "Evening cicadas sing" } },
  { start: "08-17", end: "08-22", sekki: { japanese: "立秋", english: "Beginning of Autumn" }, ko: { japanese: "蒙霧升降", english: "Dense fog rises" } },
  
  { start: "08-23", end: "08-27", sekki: { japanese: "処暑", english: "End of Heat" }, ko: { japanese: "綿柎開", english: "Cotton bolls open" } },
  { start: "08-28", end: "09-01", sekki: { japanese: "処暑", english: "End of Heat" }, ko: { japanese: "天地始粛", english: "Heat begins to die down" } },
  { start: "09-02", end: "09-06", sekki: { japanese: "処暑", english: "End of Heat" }, ko: { japanese: "禾乃登", english: "Rice ripens" } },
  
  { start: "09-07", end: "09-11", sekki: { japanese: "白露", english: "White Dew" }, ko: { japanese: "草露白", english: "Grass is touched with dew" } },
  { start: "09-12", end: "09-16", sekki: { japanese: "白露", english: "White Dew" }, ko: { japanese: "鶺鴒鳴", english: "Wagtails sing" } },
  { start: "09-17", end: "09-21", sekki: { japanese: "白露", english: "White Dew" }, ko: { japanese: "玄鳥去", english: "Swallows leave" } },
  
  { start: "09-22", end: "09-26", sekki: { japanese: "秋分", english: "Autumn Equinox" }, ko: { japanese: "雷乃収声", english: "Thunder ceases" } },
  { start: "09-27", end: "10-02", sekki: { japanese: "秋分", english: "Autumn Equinox" }, ko: { japanese: "蟄虫坏戸", english: "Insects hole up underground" } },
  { start: "10-03", end: "10-07", sekki: { japanese: "秋分", english: "Autumn Equinox" }, ko: { japanese: "水始涸", english: "Water begins to dry up" } },
  
  { start: "10-08", end: "10-12", sekki: { japanese: "寒露", english: "Cold Dew" }, ko: { japanese: "鴻雁来", english: "Wild geese return" } },
  { start: "10-13", end: "10-17", sekki: { japanese: "寒露", english: "Cold Dew" }, ko: { japanese: "菊花開", english: "Chrysanthemums bloom" } },
  { start: "10-18", end: "10-22", sekki: { japanese: "寒露", english: "Cold Dew" }, ko: { japanese: "蟋蟀在戸", english: "Crickets are around the door" } },
  
  { start: "10-23", end: "10-27", sekki: { japanese: "霜降", english: "Frost Descent" }, ko: { japanese: "霜始降", english: "First frost falls" } },
  { start: "10-28", end: "11-01", sekki: { japanese: "霜降", english: "Frost Descent" }, ko: { japanese: "霎時施", english: "Light rains sometimes fall" } },
  { start: "11-02", end: "11-06", sekki: { japanese: "霜降", english: "Frost Descent" }, ko: { japanese: "楓蔦黄", english: "Maple leaves and ivy turn yellow" } },
  
  // Winter (Fuyu) - 立冬 to 立春
  { start: "11-07", end: "11-11", sekki: { japanese: "立冬", english: "Beginning of Winter" }, ko: { japanese: "山茶始開", english: "Camellias begin to bloom" } },
  { start: "11-12", end: "11-16", sekki: { japanese: "立冬", english: "Beginning of Winter" }, ko: { japanese: "地始凍", english: "Land begins to freeze" } },
  { start: "11-17", end: "11-21", sekki: { japanese: "立冬", english: "Beginning of Winter" }, ko: { japanese: "金盞香", english: "Daffodils bloom" } },
  
  { start: "11-22", end: "11-26", sekki: { japanese: "小雪", english: "Lesser Snow" }, ko: { japanese: "虹蔵不見", english: "Rainbows hide" } },
  { start: "11-27", end: "12-01", sekki: { japanese: "小雪", english: "Lesser Snow" }, ko: { japanese: "朔風払葉", english: "North wind blows the leaves from the trees" } },
  { start: "12-02", end: "12-06", sekki: { japanese: "小雪", english: "Lesser Snow" }, ko: { japanese: "橘始黄", english: "Tachibana citrus tree leaves begin to turn yellow" } },
  
  { start: "12-07", end: "12-11", sekki: { japanese: "大雪", english: "Greater Snow" }, ko: { japanese: "閉塞成冬", english: "Winter becomes complete" } },
  { start: "12-12", end: "12-16", sekki: { japanese: "大雪", english: "Greater Snow" }, ko: { japanese: "熊蟄穴", english: "Bears retreat to their dens" } },
  { start: "12-17", end: "12-21", sekki: { japanese: "大雪", english: "Greater Snow" }, ko: { japanese: "鱖魚群", english: "Salmon gather and swim upstream" } },
  
  { start: "12-22", end: "12-26", sekki: { japanese: "冬至", english: "Winter Solstice" }, ko: { japanese: "乃東生", english: "Self-heal sprouts" } },
  { start: "12-27", end: "12-31", sekki: { japanese: "冬至", english: "Winter Solstice" }, ko: { japanese: "麋角解", english: "Elk shed their antlers" } },
  { start: "01-01", end: "01-04", sekki: { japanese: "冬至", english: "Winter Solstice" }, ko: { japanese: "雪下出麦", english: "Wheat springs up under snow" } },
  
  { start: "01-05", end: "01-09", sekki: { japanese: "小寒", english: "Lesser Cold" }, ko: { japanese: "芹乃栄", english: "Parsley flourishes" } },
  { start: "01-10", end: "01-14", sekki: { japanese: "小寒", english: "Lesser Cold" }, ko: { japanese: "水泉動", english: "Springs thaw" } },
  { start: "01-15", end: "01-19", sekki: { japanese: "小寒", english: "Lesser Cold" }, ko: { japanese: "雉始雊", english: "Pheasants start to call" } },
  
  { start: "01-20", end: "01-24", sekki: { japanese: "大寒", english: "Greater Cold" }, ko: { japanese: "欸冬華", english: "Butterburs bud" } },
  { start: "01-25", end: "01-29", sekki: { japanese: "大寒", english: "Greater Cold" }, ko: { japanese: "水沢腹堅", english: "Ice thickens on streams" } },
  { start: "01-30", end: "02-03", sekki: { japanese: "大寒", english: "Greater Cold" }, ko: { japanese: "鶏始乳", english: "Hens start laying eggs" } },
];

export function getCurrentMicroseason(date: Date = new Date()): Microseason | null {
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();
  const currentDateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  
  // Handle year boundary cases
  for (const season of microseasons) {
    if (isDateInRange(currentDateStr, season.start, season.end)) {
      return season;
    }
  }
  
  return null;
}

function isDateInRange(currentDate: string, startDate: string, endDate: string): boolean {
  const [currentMonth, currentDay] = currentDate.split('-').map(Number);
  const [startMonth, startDay] = startDate.split('-').map(Number);
  const [endMonth, endDay] = endDate.split('-').map(Number);
  
  // Handle year boundary cases (winter season spanning across years)
  if (startMonth > endMonth || (startMonth === endMonth && startDay > endDay)) {
    // Range crosses year boundary (e.g., Dec 27 - Jan 4)
    return (
      (currentMonth > startMonth || (currentMonth === startMonth && currentDay >= startDay)) ||
      (currentMonth < endMonth || (currentMonth === endMonth && currentDay <= endDay))
    );
  } else {
    // Normal range within same year
    return (
      (currentMonth > startMonth || (currentMonth === startMonth && currentDay >= startDay)) &&
      (currentMonth < endMonth || (currentMonth === endMonth && currentDay <= endDay))
    );
  }
}
