const YEAR_WEIGHTS = {
  2025: 0.55,
  2024: 0.28,
  2023: 0.17
};

const TIER_CONFIG = [
  { key: "冲刺", title: "冲刺层", hint: "贴近考生线差，适合放前位" },
  { key: "稳妥", title: "稳妥层", hint: "小幅正余量，适合中段" },
  { key: "保底", title: "保底层", hint: "明显正余量，用来兜底" }
];

const MATCH_CLASS = {
  "冲刺": "badge-sprint",
  "稳妥": "badge-stable",
  "保底": "badge-safe",
  "超高风险": "badge-risk"
};

const FALLBACK_ICONS = {
  "sparkles": "✦",
  "wand-sparkles": "✦",
  "route": "↗",
  "clipboard-list": "☑",
  "school": "学",
  "search": "⌕"
};

const LEVEL_CLASS = {
  "省示范": "demo",
  "省标准": "standard",
  "普通": "normal"
};

const SCHOOL_TIERS = {
  "一梯队": ["xgdfz", "tieyi", "gaoxin1"],
  "二梯队": ["jiaodafz", "tieyi-guoji", "sdfz", "tieyi-binhe"],
  "三梯队": ["xazx", "xasan", "xayi", "changan1", "tieyi-lugang", "chuangxingang", "chongshi"],
  "四梯队": ["tieyi-jinwan", "jiaoda-hangtian", "gx-lugang", "83", "85", "89", "26", "jingkai1", "qujiang1"],
  "五梯队": ["gx-fengdong", "gx2", "gx-shiyan", "konggang", "89-fen", "taiyilu", "8", "xdfz", "qinhan", "xagj"],
  "六梯队": ["htc2", "htc1", "75", "xiguang", "tangnan", "6", "gx3", "xd-fz", "sdfz-lugang"],
  "七梯队": ["xd-chanba", "72", "6-fen", "qujiang2", "jdfz", "dongcheng1", "yanta2", "gx4", "xihang1", "qingan", "yuandong1", "hangtian", "yuandong2"],
  "八梯队": ["wuhuan", "82", "jingkai3", "huanghe"],
  "九梯队": ["70", "2", "55", "yucai", "66", "hanguang", "yangguang"],
  "十梯队": ["lianhu1", "yannan", "chanba2", "zhongtie", "86", "48", "jinghe1", "cheliang"],
  "十一梯队": ["11", "huashan", "71", "dongyi", "xidian"],
  "十二梯队": ["30", "taibai", "jinyuan", "qinghua", "xagdfz", "tengxin", "34", "handu", "58", "kunlun", "46", "dongfang", "38", "changqing2", "daminggong", "45", "yuhang", "53", "44", "xiwai", "43", "xigang", "25", "62", "19", "42", "bodi", "boai", "jinghua", "siyuan", "gx5"]
};

const SCHOOL_TIER_BY_ID = Object.fromEntries(
  Object.entries(SCHOOL_TIERS).flatMap(([tier, ids]) => ids.map((id) => [id, tier]))
);

const DEFAULT_DISTRICTS = [];
const AMAP_KEY = "a4b721ec0e33f45ca89c69cbf9c10fd6";
const AMAP_SECURITY_CODE = "812202a0c120f156eab501367b5e31f8";

const HOME_LOCATIONS = [
  { id: "poly-tianzhan", name: "保利天瓒", lat: 34.233024, lng: 108.890189 },
  { id: "gaoxin", name: "高新区", lat: 34.2106, lng: 108.8873 },
  { id: "yanta", name: "雁塔区", lat: 34.2134, lng: 108.948, },
  { id: "hangtian", name: "航天基地", lat: 34.158, lng: 108.977 },
  { id: "qujiang", name: "曲江新区", lat: 34.2052, lng: 108.9896 },
  { id: "lianhu", name: "莲湖区", lat: 34.2656, lng: 108.9335 },
  { id: "beilin", name: "碑林区", lat: 34.2425, lng: 108.9524 },
  { id: "weiyang", name: "未央区", lat: 34.3068, lng: 108.946 },
  { id: "xincheng", name: "新城区", lat: 34.2666, lng: 108.9598 },
  { id: "baqiao", name: "灞桥区", lat: 34.2731, lng: 109.0647 },
  { id: "custom", name: "自定义坐标", lat: 34.2106, lng: 108.8873 }
];

const DISTRICT_COORDS = {
  "高新区": { lat: 34.2106, lng: 108.8873 },
  "雁塔区": { lat: 34.2134, lng: 108.948 },
  "航天基地": { lat: 34.158, lng: 108.977 },
  "曲江新区": { lat: 34.2052, lng: 108.9896 },
  "莲湖区": { lat: 34.2656, lng: 108.9335 },
  "碑林区": { lat: 34.2425, lng: 108.9524 },
  "未央区": { lat: 34.3068, lng: 108.946 },
  "新城区": { lat: 34.2666, lng: 108.9598 },
  "灞桥区": { lat: 34.2731, lng: 109.0647 },
  "经开区": { lat: 34.347, lng: 108.943 },
  "浐灞国际港": { lat: 34.306, lng: 109.043 },
  "西咸新区": { lat: 34.317, lng: 108.77 },
  "长安区": { lat: 34.157, lng: 108.906 }
};

const form = document.querySelector("#predictForm");
const scoreInput = document.querySelector("#scoreInput");
const controlLineInput = document.querySelector("#controlLineInput");
const rankEstimate = document.querySelector("#rankEstimate");
const rankPercent = document.querySelector("#rankPercent");
const rankMappedScore = document.querySelector("#rankMappedScore");
const rankSourceNote = document.querySelector("#rankSourceNote");
const homeAddressInput = document.querySelector("#homeAddressInput");
const homeAddressStatus = document.querySelector("#homeAddressStatus");
const homeLatInput = document.querySelector("#homeLatInput");
const homeLngInput = document.querySelector("#homeLngInput");
const distanceFilter = document.querySelector("#distanceFilter");
const rushMinInput = document.querySelector("#rushMinInput");
const rushMaxInput = document.querySelector("#rushMaxInput");
const stableMinInput = document.querySelector("#stableMinInput");
const stableMaxInput = document.querySelector("#stableMaxInput");
const safeMinInput = document.querySelector("#safeMinInput");
const safeMaxInput = document.querySelector("#safeMaxInput");
const districtFilter = document.querySelector("#districtFilter");
const browseDistrictFilter = document.querySelector("#browseDistrictFilter");
const ownershipFilter = document.querySelector("#ownershipFilter");
const publicSafetyOnly = document.querySelector("#publicSafetyOnly");
const showOnlyMatched = document.querySelector("#showOnlyMatched");
const searchInput = document.querySelector("#searchInput");
const batchFilter = document.querySelector("#batchFilter");
const matchFilter = document.querySelector("#matchFilter");
const planModeInputs = [...document.querySelectorAll('input[name="planMode"]')];
const demoMaxGapInput = document.querySelector("#demoMaxGapInput");
const schoolDetailOverlay = document.querySelector("#schoolDetailOverlay");
const schoolDetailSheet = document.querySelector("#schoolDetailSheet");
const schoolDetailContent = document.querySelector("#schoolDetailContent");

let currentState = null;
let currentSchools = [];
let currentFilteredSchools = [];
let currentPlan = null;
let manualSelections = {};
let selectedDetailSchoolId = null;
let amapReady = false;
const drivingDistanceCache = new Map();
const drivingDistancePending = new Set();
const schoolLocationCache = new Map();
const schoolLocationPending = new Set();
const schoolLocationQueue = [];
let drivingDistanceRenderTimer = null;
let schoolLocationQueueRunning = false;
const SCHOOL_LOCATION_STORAGE_KEY = "xianVolunteerSchoolLocationsV2";

function round(value, digits = 1) {
  return Number(value).toFixed(digits).replace(/\.0$/, "");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function unique(values) {
  return [...new Set(values)].filter(Boolean).sort((a, b) => a.localeCompare(b, "zh-CN"));
}

function getNumber(input, fallback) {
  const value = Number(input.value);
  return Number.isFinite(value) ? value : fallback;
}

function quotaByCode(code) {
  return TARGET_QUOTA_DATA.quotas.find((item) => item.code === code) ?? null;
}

function getLocationPreset(id) {
  return HOME_LOCATIONS.find((item) => item.id === id) ?? HOME_LOCATIONS[0];
}

function setHomeStatus(text) {
  if (homeAddressStatus) {
    homeAddressStatus.textContent = text;
  }
}

function loadAmap() {
  if (window.AMap || amapReady) {
    initAmapAutocomplete();
    return;
  }

  window._AMapSecurityConfig = {
    securityJsCode: AMAP_SECURITY_CODE
  };

  const script = document.createElement("script");
  script.src = `https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}&plugin=AMap.AutoComplete,AMap.Geocoder,AMap.Driving,AMap.PlaceSearch`;
  script.async = true;
  script.onload = () => {
    amapReady = true;
    initAmapAutocomplete();
    scheduleDrivingDistances();
  };
  script.onerror = () => {
    setHomeStatus("高德地图加载失败，暂时无法计算驾车距离。");
  };
  document.head.append(script);
}

function initAmapAutocomplete() {
  if (!window.AMap || !homeAddressInput) {
    return;
  }

  const autoComplete = new window.AMap.AutoComplete({
    city: "西安",
    input: "homeAddressInput",
    citylimit: true
  });

  autoComplete.on("select", (event) => {
    const tip = event.poi;
    if (!tip) {
      return;
    }

    homeAddressInput.value = tip.name || homeAddressInput.value;
    if (tip.location) {
      homeLngInput.value = tip.location.lng;
      homeLatInput.value = tip.location.lat;
      clearDrivingDistances();
      setHomeStatus(`已定位：${tip.name}，正在计算驾车距离。`);
      render();
      return;
    }

    geocodeHomeAddress(tip.name || homeAddressInput.value);
  });

  setHomeStatus("高德地址提示已启用；驾车距离会在路线返回后自动更新。");
}

function geocodeHomeAddress(address) {
  if (!window.AMap || !address) {
    return;
  }

  const geocoder = new window.AMap.Geocoder({ city: "西安" });
  geocoder.getLocation(address, (status, result) => {
    const location = result?.geocodes?.[0]?.location;
    if (status === "complete" && location) {
      homeLngInput.value = location.lng;
      homeLatInput.value = location.lat;
      clearDrivingDistances();
      setHomeStatus(`已定位：${address}，正在计算驾车距离。`);
      render();
    } else {
      setHomeStatus("没有找到该地址，请换更具体的小区、道路或地标。");
    }
  });
}

function getHomeLocation() {
  const lat = getNumber(homeLatInput, HOME_LOCATIONS[0].lat);
  const lng = getNumber(homeLngInput, HOME_LOCATIONS[0].lng);
  return {
    id: "custom",
    name: homeAddressInput.value.trim() || "家庭地址",
    lat,
    lng
  };
}

function getSchoolLocation(school) {
  const coords = school.location ?? schoolLocationCache.get(school.id) ?? null;
  if (!coords) {
    return null;
  }
  return {
    ...coords,
    estimated: false
  };
}

function loadStoredSchoolLocations() {
  try {
    const raw = localStorage.getItem(SCHOOL_LOCATION_STORAGE_KEY);
    if (!raw) {
      return;
    }
    const entries = JSON.parse(raw);
    Object.entries(entries).forEach(([id, coords]) => {
      if (coords === null) {
        schoolLocationCache.set(id, null);
        return;
      }
      if (Number.isFinite(coords?.lat) && Number.isFinite(coords?.lng)) {
        schoolLocationCache.set(id, coords);
      }
    });
  } catch (error) {
    localStorage.removeItem(SCHOOL_LOCATION_STORAGE_KEY);
  }
}

function storeSchoolLocations() {
  const entries = {};
  schoolLocationCache.forEach((coords, id) => {
    entries[id] = coords;
  });
  localStorage.setItem(SCHOOL_LOCATION_STORAGE_KEY, JSON.stringify(entries));
}

function getDistanceCacheKey(home, destination) {
  return [
    round(home.lat, 6),
    round(home.lng, 6),
    round(destination.lat, 6),
    round(destination.lng, 6)
  ].join(",");
}

function getCachedDrivingDistance(home, destination) {
  return drivingDistanceCache.get(getDistanceCacheKey(home, destination)) ?? null;
}

function clearDrivingDistances() {
  drivingDistanceCache.clear();
  drivingDistancePending.clear();
  if (drivingDistanceRenderTimer) {
    clearTimeout(drivingDistanceRenderTimer);
    drivingDistanceRenderTimer = null;
  }
}

function canUseDrivingDistance() {
  return Boolean(window.AMap?.Driving);
}

function getDrivingService() {
  if (!canUseDrivingDistance()) {
    return null;
  }

  if (!window._schoolDrivingService) {
    window._schoolDrivingService = new window.AMap.Driving({
      city: "西安",
      policy: window.AMap.DrivingPolicy?.LEAST_TIME
    });
  }

  return window._schoolDrivingService;
}

function requestDrivingDistance(home, destination) {
  const driving = getDrivingService();
  if (!driving) {
    return;
  }

  const key = getDistanceCacheKey(home, destination);
  if (drivingDistanceCache.has(key) || drivingDistancePending.has(key)) {
    return;
  }

  drivingDistancePending.add(key);
  driving.search(
    [home.lng, home.lat],
    [destination.lng, destination.lat],
    (status, result) => {
      drivingDistancePending.delete(key);
      const meters = Number(result?.routes?.[0]?.distance);
      if (status === "complete" && Number.isFinite(meters)) {
        drivingDistanceCache.set(key, meters / 1000);
        renderAfterDrivingDistanceUpdate();
      } else {
        drivingDistanceCache.set(key, null);
      }
    }
  );
}

function renderAfterDrivingDistanceUpdate() {
  if (drivingDistanceRenderTimer) {
    return;
  }

  drivingDistanceRenderTimer = window.setTimeout(() => {
    drivingDistanceRenderTimer = null;
    render();
  }, 120);
}

function scheduleDrivingDistances() {
  if (!currentState || !currentSchools.length || !canUseDrivingDistance()) {
    return;
  }

  currentSchools.forEach((school) => {
    const destination = getSchoolLocation(school);
    if (destination) {
      requestDrivingDistance(currentState.home, destination);
    } else {
      requestSchoolLocation(school);
    }
  });
}

function requestSchoolLocation(school) {
  if (!window.AMap || schoolLocationCache.has(school.id) || schoolLocationPending.has(school.id)) {
    return;
  }

  schoolLocationPending.add(school.id);
  schoolLocationQueue.push(school);
  runSchoolLocationQueue();
}

function runSchoolLocationQueue() {
  if (schoolLocationQueueRunning || schoolLocationQueue.length === 0) {
    return;
  }

  schoolLocationQueueRunning = true;
  const school = schoolLocationQueue.shift();
  resolveSchoolLocation(school, (coords) => {
    schoolLocationPending.delete(school.id);
    schoolLocationCache.set(school.id, coords);
    storeSchoolLocations();
    schoolLocationQueueRunning = false;
    renderAfterDrivingDistanceUpdate();
    window.setTimeout(runSchoolLocationQueue, 80);
  });
}

function resolveSchoolLocation(school, done) {
  searchSchoolPoi(school, (coords) => {
    if (coords) {
      done(coords);
      return;
    }

    geocodeSchool(school, done);
  });
}

function searchSchoolPoi(school, done) {
  if (!window.AMap?.PlaceSearch) {
    done(null);
    return;
  }

  const placeSearch = new window.AMap.PlaceSearch({
    city: "西安",
    citylimit: true,
    pageSize: 5
  });

  placeSearch.search(`${school.name} ${school.district}`, (status, result) => {
    const pois = result?.poiList?.pois ?? [];
    const poi = pois.find((item) => {
      const text = `${item.name ?? ""} ${item.address ?? ""}`;
      return text.includes(school.shortName) || text.includes(school.name.replace(/^西安市?/, ""));
    }) ?? pois[0];
    const location = poi?.location;
    if (status === "complete" && location) {
      done({
        lat: Number(location.lat),
        lng: Number(location.lng)
      });
    } else {
      done(null);
    }
  });
}

function geocodeSchool(school, done) {
  if (!window.AMap?.Geocoder) {
    done(null);
    return;
  }

  const geocoder = new window.AMap.Geocoder({ city: "西安" });
  geocoder.getLocation(`西安市${school.district}${school.name}`, (status, result) => {
    const location = result?.geocodes?.[0]?.location;
    if (status === "complete" && location) {
      done({
        lat: Number(location.lat),
        lng: Number(location.lng)
      });
      return;
    }

    done(null);
  });
}

function formatDistance(school) {
  if (!Number.isFinite(school.distanceKm)) {
    if (school.distanceMode === "no-location") {
      return "位置定位中";
    }
    if (school.distanceMode === "location-failed") {
      return "位置待补";
    }
    if (school.distanceMode === "failed") {
      return "路线待补";
    }
    return "驾车计算中";
  }
  return `${school.distanceEstimated ? "驾车约" : "驾车"}${round(school.distanceKm, 1)}km`;
}

function normalizeRange(minValue, maxValue) {
  return {
    min: Math.min(minValue, maxValue),
    max: Math.max(minValue, maxValue)
  };
}

function getRangeStrategy() {
  const rush = normalizeRange(getNumber(rushMinInput, -15), getNumber(rushMaxInput, -5));
  const stable = normalizeRange(getNumber(stableMinInput, -5), getNumber(stableMaxInput, 5));
  const safe = normalizeRange(getNumber(safeMinInput, 5), getNumber(safeMaxInput, 15));

  return {
    name: "自定义余量",
    summary: `冲 ${formatRange(rush)}，稳 ${formatRange(stable)}，保 ${formatRange(safe)}`,
    rush,
    stable,
    safe
  };
}

function formatRange(range) {
  return `${round(range.min)}到${round(range.max)}`;
}

function predictRank(state) {
  const reference = RANK_REFERENCE_DATA;
  const points = [...reference.points].sort((a, b) => b.score - a.score);
  const targetRate = state.effectiveRange > 0
    ? (state.score - state.controlLine) / state.effectiveRange
    : 0;
  const mappedScore = reference.control + targetRate * Math.max(reference.max - reference.control, 1);

  if (state.score < state.controlLine) {
    return {
      mappedScore,
      rank: null,
      percentile: null,
      label: "低于普高线",
      summary: "低于当前控制线，暂不估算城六区普高位次。"
    };
  }

  if (mappedScore >= points[0].score) {
    return {
      mappedScore,
      rank: points[0].rank,
      percentile: points[0].percentile,
      label: `${formatRankRange(points[0].rank, 80)}`,
      summary: "已进入参考表顶端区间，头部位次波动较大。"
    };
  }

  for (let index = 0; index < points.length - 1; index += 1) {
    const high = points[index];
    const low = points[index + 1];
    if (mappedScore <= high.score && mappedScore >= low.score) {
      const span = high.score - low.score || 1;
      const ratio = (high.score - mappedScore) / span;
      const rank = high.rank + (low.rank - high.rank) * ratio;
      const percentile = high.percentile + (low.percentile - high.percentile) * ratio;
      return {
        mappedScore,
        rank,
        percentile,
        label: formatRankRange(rank),
        summary: `按${reference.year}年城六区位比曲线插值。`
      };
    }
  }

  const last = points[points.length - 1];
  return {
    mappedScore,
    rank: last.rank,
    percentile: last.percentile,
    label: `${formatRankRange(last.rank)}以后`,
    summary: "低于参考表底部，位次只能粗略估计。"
  };
}

function formatRankRange(rank, minWindow = 160) {
  const windowSize = Math.max(minWindow, rank < 1000 ? 80 : rank < 10000 ? 300 : 800);
  const lower = Math.max(1, Math.round((rank - windowSize / 2) / 10) * 10);
  const upper = Math.max(lower + 10, Math.round((rank + windowSize / 2) / 10) * 10);
  return `${lower.toLocaleString("zh-CN")} - ${upper.toLocaleString("zh-CN")}`;
}

function renderRankEstimate(state) {
  if (!rankEstimate || !rankPercent || !rankMappedScore || !rankSourceNote) {
    return;
  }

  const prediction = predictRank(state);
  rankEstimate.textContent = prediction.label;
  rankPercent.textContent = Number.isFinite(prediction.percentile)
    ? `${round(prediction.percentile * 100, 1)}%`
    : "--";
  rankMappedScore.textContent = `2025参考口径：${round(prediction.mappedScore, 1)}分`;
  rankSourceNote.textContent = `${prediction.summary} 数据源：${RANK_REFERENCE_DATA.sourceTitle}`;
}

function getSelectedDistricts() {
  return getSelectedDistrictValues(districtFilter);
}

function getBrowseDistricts() {
  return getSelectedDistrictValues(browseDistrictFilter);
}

function getSelectedDistrictValues(container) {
  const selected = [...container.querySelectorAll('input[type="checkbox"]:checked')].map((input) => input.value);
  if (selected.includes("all")) {
    return [];
  }

  return selected;
}

function getState() {
  const year = 2026;
  const targetMax = TARGET_YEAR_PRESETS[year]?.max ?? 640;
  const controlLine = getNumber(controlLineInput, TARGET_YEAR_PRESETS[year]?.control ?? 480);
  const score = getNumber(scoreInput, controlLine);
  const strategy = getRangeStrategy();
  const levels = [...document.querySelectorAll('input[name="level"]:checked')].map((item) => item.value);
  const planMode = document.querySelector('input[name="planMode"]:checked')?.value ?? "score-first";
  const demoMaxGap = getNumber(demoMaxGapInput, 15);

  return {
    year,
    targetMax,
    controlLine,
    score,
    strategy,
    studentDelta: score - controlLine,
    effectiveRange: Math.max(targetMax - controlLine, 1),
    home: getHomeLocation(),
    safeMaxGap: strategy.safe.max,
    districts: getSelectedDistricts(),
    distanceLimit: distanceFilter.value === "all" ? Infinity : Number(distanceFilter.value),
    ownership: ownershipFilter.value,
    levels,
    publicSafetyOnly: publicSafetyOnly.checked,
    showOnlyMatched: showOnlyMatched.checked,
    search: searchInput.value.trim().toLowerCase(),
    batch: batchFilter.value,
    match: matchFilter.value,
    browseDistricts: getBrowseDistricts(),
    planMode,
    demoMaxGap
  };
}

function estimateSchool(school, state) {
  const publicEstimate = getPublicEstimate2026(school, state);
  const items = Object.entries(school.lines)
    .map(([year, rawLine]) => {
      const reference = CONTROL_LINES[year];
      if (!reference || !Number.isFinite(rawLine)) {
        return null;
      }

      const effectiveRange = Math.max(reference.max - reference.line, 1);
      const deltaRate = (rawLine - reference.line) / effectiveRange;
      return {
        year: Number(year),
        rawLine,
        weight: YEAR_WEIGHTS[year] ?? 0.1,
        deltaRate
      };
    })
    .filter(Boolean);

  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0) || 1;
  const weightedRate = items.reduce((sum, item) => sum + item.deltaRate * item.weight, 0) / totalWeight;
  const modelRequiredDelta = weightedRate * state.effectiveRange;
  const requiredDelta = getCalibratedRequiredDelta(modelRequiredDelta, publicEstimate);
  const expectedLine = clamp(state.controlLine + requiredDelta, 0, state.targetMax);
  const gap = state.studentDelta - requiredDelta;
  const match = classifyGap(gap, state);
  const trend = getTrend(items, state.effectiveRange);
  const confidence = items.length >= 3 ? "高" : items.length === 2 ? "中" : "低";
  const matchScore = getMatchScore(gap, match, state);
  const targetQuota = quotaByCode(school.code);
  const schoolLocation = getSchoolLocation(school);
  const drivingDistance = schoolLocation ? getCachedDrivingDistance(state.home, schoolLocation) : null;
  const distance = Number.isFinite(drivingDistance) ? drivingDistance : null;
  const distanceMode = Number.isFinite(drivingDistance)
    ? "driving"
    : schoolLocation
      ? (drivingDistanceCache.has(getDistanceCacheKey(state.home, schoolLocation)) ? "failed" : "pending")
      : (schoolLocationCache.has(school.id) ? "location-failed" : "no-location");

  return {
    ...school,
    targetQuota,
    distanceKm: distance,
    distanceMode,
    distanceEstimated: Boolean(schoolLocation?.estimated),
    tier: SCHOOL_TIER_BY_ID[school.id] ?? "梯队待补",
    referenceYears: items.map((item) => item.year).sort((a, b) => b - a),
    latestLine: school.lines[2025] ?? school.lines[2024] ?? school.lines[2023],
    modelRequiredDelta,
    requiredDelta,
    expectedLine,
    publicEstimate,
    gap,
    match,
    trend,
    confidence,
    matchScore
  };
}

function getCalibratedRequiredDelta(modelRequiredDelta, publicEstimate) {
  if (!publicEstimate) {
    return modelRequiredDelta;
  }

  const width = publicEstimate.max - publicEstimate.min;
  const estimateDelta = publicEstimate.requiredDelta;
  if (width <= 12) {
    return estimateDelta;
  }

  const maxDownwardAdjustment = 5;
  if (estimateDelta < modelRequiredDelta) {
    return Math.max(estimateDelta, modelRequiredDelta - maxDownwardAdjustment);
  }

  return Math.min(estimateDelta, modelRequiredDelta + 8);
}

function getPublicEstimate2026(school, state) {
  if (state.year !== 2026 || typeof PUBLIC_2026_ESTIMATES === "undefined") {
    return null;
  }

  const estimate = PUBLIC_2026_ESTIMATES[school.id] ?? PUBLIC_2026_ESTIMATES[school.code];
  if (!estimate) {
    return null;
  }

  const range = Array.isArray(estimate.range) ? estimate.range : [estimate.line, estimate.line];
  const values = range.map(Number).filter(Number.isFinite);
  if (!values.length) {
    return null;
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const line = Number.isFinite(estimate.line) ? Number(estimate.line) : (min + max) / 2;
  const baseControl = Number.isFinite(estimate.baseControl)
    ? Number(estimate.baseControl)
    : (typeof PUBLIC_2026_ESTIMATE_BASE_CONTROL === "number" ? PUBLIC_2026_ESTIMATE_BASE_CONTROL : TARGET_YEAR_PRESETS[2026]?.control ?? state.controlLine);

  return {
    line,
    min,
    max,
    requiredDelta: line - baseControl,
    source: estimate.source ?? "2026公开预估"
  };
}

function classifyGap(gap, state) {
  const { strategy } = state;
  if (gap >= strategy.rush.min && gap <= strategy.rush.max) {
    return "冲刺";
  }
  if (gap >= strategy.stable.min && gap <= strategy.stable.max) {
    return "稳妥";
  }
  if (gap >= strategy.safe.min && gap <= strategy.safe.max) {
    return "保底";
  }
  if (gap < strategy.rush.min) {
    return "超高风险";
  }
  return "保底";
}

function getMatchScore(gap, match, state) {
  if (match === "超高风险") {
    return clamp(30 + gap, 6, 34);
  }
  const center = (range) => (range.min + range.max) / 2;
  if (match === "冲刺") {
    return clamp(92 - Math.abs(gap - center(state.strategy.rush)) * 3, 46, 96);
  }
  if (match === "稳妥") {
    return clamp(94 - Math.abs(gap - center(state.strategy.stable)) * 2.2, 55, 98);
  }
  return clamp(92 - Math.abs(gap - center(state.strategy.safe)) * 2, 58, 96);
}

function getTrend(items, effectiveRange) {
  const latest = items.find((item) => item.year === 2025);
  const older = items.filter((item) => item.year < 2025);
  if (!latest || older.length === 0) {
    return { label: "趋势待观察", delta: 0 };
  }

  const olderAverage = older.reduce((sum, item) => sum + item.deltaRate, 0) / older.length;
  const delta = (latest.deltaRate - olderAverage) * effectiveRange;
  if (delta > 8) {
    return { label: "热度上升", delta };
  }
  if (delta < -8) {
    return { label: "热度回落", delta };
  }
  return { label: "热度平稳", delta };
}

function baseFilter(schools, state) {
  return schools.filter((school) => {
    const levelOk = state.levels.includes(school.level);
    const districtOk = state.districts.length === 0 || state.districts.includes(school.district);
    const ownershipOk = state.ownership === "all" || school.ownership === state.ownership;
    const distanceOk = isWithinDistanceLimit(school, state.distanceLimit);
    const matchedOk = !state.showOnlyMatched || school.match !== "超高风险";
    return levelOk && districtOk && ownershipOk && distanceOk && matchedOk;
  });
}

function isWithinDistanceLimit(school, distanceLimit) {
  if (!Number.isFinite(distanceLimit)) {
    return true;
  }
  if (school.distanceMode !== "driving") {
    return true;
  }
  return school.distanceKm <= distanceLimit;
}

function displayFilter(schools, state) {
  return schools.filter((school) => {
    const searchPool = [school.name, school.shortName, school.district, school.level, school.ownership, school.batch, school.tier, ...school.tags]
      .join(" ")
      .toLowerCase();
    const searchOk = !state.search || searchPool.includes(state.search);
    const batchOk = state.batch === "all" || school.batch === state.batch;
    const matchOk = state.match === "all" || school.match === state.match;
    const browseDistrictOk = state.browseDistricts.length === 0 || state.browseDistricts.includes(school.district);
    return searchOk && batchOk && matchOk && browseDistrictOk;
  });
}

function betterFirst(a, b) {
  return b.requiredDelta - a.requiredDelta || b.matchScore - a.matchScore || a.name.localeCompare(b.name, "zh-CN");
}

function safeFirst(a, b) {
  const target = currentState ? (currentState.strategy.safe.min + currentState.strategy.safe.max) / 2 : 20;
  return Math.abs(a.gap - target) - Math.abs(b.gap - target) || b.requiredDelta - a.requiredDelta || a.name.localeCompare(b.name, "zh-CN");
}

function isUsefulSafe(school, state) {
  return school.match === "保底" && school.gap >= state.strategy.safe.min && school.gap <= state.strategy.safe.max;
}

function targetFirst(a, b) {
  const aq = a.targetQuota?.quota ?? 0;
  const bq = b.targetQuota?.quota ?? 0;
  const aScore = (aq * 2.5) + (a.targetQuota?.share ?? 0) * 100 + a.requiredDelta * 0.18 - Math.abs(a.gap + 8) * 0.7;
  const bScore = (bq * 2.5) + (b.targetQuota?.share ?? 0) * 100 + b.requiredDelta * 0.18 - Math.abs(b.gap + 8) * 0.7;
  if (bScore !== aScore) {
    return bScore - aScore;
  }
  if (bq !== aq) {
    return bq - aq;
  }
  return betterFirst(a, b);
}

function pickUnique(pool, used, predicate, sorter = betterFirst) {
  const found = pool
    .filter((school) => !used.has(school.id))
    .filter(predicate)
    .sort(sorter)[0];
  if (found) {
    used.add(found.id);
  }
  return found ?? null;
}

function pickSlotsByRoles(pool, used, roles, state, options = {}) {
  const slots = roles.map((role, index) => {
    const sorter = role === "保底" ? safeFirst : betterFirst;
    return pickUnique(
      pool,
      used,
      (school) => {
        if (options.limitMaxRequiredDelta !== undefined && school.requiredDelta > options.limitMaxRequiredDelta) {
          return false;
        }
        if (options.limitMinRequiredDelta !== undefined && school.requiredDelta <= options.limitMinRequiredDelta) {
          return false;
        }
        if (role === "保底") {
          return isUsefulSafe(school, state);
        }
        return school.match === role;
      },
      sorter
    );
  });

  fillSlots(slots, roles.length, pool, used, state, options);
  return slots;
}

function pickFillers(pool, used, count, sorter = betterFirst) {
  const picked = [];
  while (picked.length < count) {
    const next = pickUnique(pool, used, () => true, sorter);
    if (!next) {
      break;
    }
    picked.push(next);
  }
  return picked;
}

function prependFillers(slots, fillers, maxSlots) {
  const result = [...fillers, ...slots.filter(Boolean)];
  while (result.length < maxSlots) {
    result.push(null);
  }
  return result.slice(0, maxSlots);
}

function makeHighBlockerPool(pool, state, minRequiredDelta = null) {
  return pool
    .filter((school) => minRequiredDelta === null || school.requiredDelta > minRequiredDelta || school.gap < state.strategy.rush.min)
    .sort((a, b) => {
      const aRisk = a.gap < state.strategy.rush.min ? 1 : 0;
      const bRisk = b.gap < state.strategy.rush.min ? 1 : 0;
      return bRisk - aRisk || b.requiredDelta - a.requiredDelta || a.name.localeCompare(b.name, "zh-CN");
    });
}

function ensureMinimumFirstSlots(slots, firstBatchAll, used, state, minRequiredDelta = null) {
  const minCount = 2;
  const maxSlots = 3;
  const filled = slots.filter(Boolean).length;
  if (filled >= minCount) {
    return slots;
  }

  const fillers = pickFillers(
    makeHighBlockerPool(firstBatchAll, state, minRequiredDelta),
    used,
    minCount - filled,
    (a, b) => {
      const aRisk = a.gap < state.strategy.rush.min ? 1 : 0;
      const bRisk = b.gap < state.strategy.rush.min ? 1 : 0;
      return bRisk - aRisk || b.requiredDelta - a.requiredDelta || a.name.localeCompare(b.name, "zh-CN");
    }
  );
  return prependFillers(slots, fillers, maxSlots);
}

function ensureMinimumSecondSlots(slots, secondBatchAll, used, state) {
  const minCount = 2;
  const maxSlots = 4;
  const filled = slots.filter(Boolean).length;
  if (filled >= minCount) {
    return slots;
  }

  const fillers = pickFillers(
    secondBatchAll.filter((school) => school.match !== "超高风险"),
    used,
    minCount - filled,
    betterFirst
  );
  const result = [...slots.filter(Boolean), ...fillers];
  while (result.length < maxSlots) {
    result.push(null);
  }
  return result.slice(0, maxSlots);
}

function makePlan(schools, state) {
  const used = new Set();
  const firstBatchAll = schools.filter((school) => school.batch === "第一批次" && school.level === "省示范");
  const secondBatchAll = schools.filter((school) => school.batch === "第二批次");
  const available = schools.filter((school) => school.match !== "超高风险");
  const firstBatch = available.filter((school) => school.batch === "第一批次" && school.level === "省示范");
  const secondBatch = available.filter((school) => school.batch === "第二批次");
  const targetedPool = available.filter((school) => {
    const quota = school.targetQuota?.quota ?? 0;
    return quota > 0 && school.gap > -20 && school.gap < 5;
  });

  const directional = pickUnique(targetedPool, new Set(), () => true, targetFirst);

  let firstRoles = ["冲刺", "冲刺", "冲刺"];
  let secondRoles = ["冲刺", "稳妥", "保底", "保底"];
  let firstMinRequiredDelta = null;
  let firstMaxGap = null;
  if (state.planMode === "first-main") {
    firstRoles = ["冲刺", "稳妥", "保底"];
    secondRoles = ["保底", "保底", "保底", "保底"];
    firstMaxGap = Math.max(0, state.demoMaxGap);
  }
  if (state.planMode === "second-main") {
    firstRoles = ["冲刺", "冲刺", "冲刺"];
    secondRoles = ["冲刺", "稳妥", "保底", "保底"];
  }

  const secondAnchor = state.planMode === "second-main"
    ? getSecondBatchAnchor(secondBatch)
    : state.planMode === "score-first"
      ? getSecondBatchBest(secondBatch)
      : null;
  if (secondAnchor && (state.planMode === "second-main" || state.planMode === "score-first")) {
    firstMinRequiredDelta = secondAnchor.requiredDelta;
  }
  let firstPool = firstMinRequiredDelta !== null
    ? firstBatch.filter((school) => school.requiredDelta > firstMinRequiredDelta)
    : firstBatch;
  if (firstMaxGap !== null) {
    firstPool = firstPool.filter((school) => school.gap <= firstMaxGap);
  }

  if (state.planMode === "second-main") {
    firstPool = makeHighBlockerPool(firstBatchAll, state, firstMinRequiredDelta).slice(0, 3);
  }

  let firstSlots = state.planMode === "second-main"
    ? pickFillers(firstPool, used, 3, (a, b) => b.requiredDelta - a.requiredDelta || a.name.localeCompare(b.name, "zh-CN"))
    : pickSlotsByRoles(
      firstPool,
      used,
      firstRoles,
      state,
      firstMinRequiredDelta !== null ? { limitMinRequiredDelta: firstMinRequiredDelta } : {}
    );
  while (firstSlots.length < 3) {
    firstSlots.push(null);
  }
  firstSlots = ensureMinimumFirstSlots(firstSlots, firstBatchAll, used, state, firstMinRequiredDelta);
  const firstFilled = firstSlots.filter(Boolean);
  const firstFloor = state.planMode === "first-main" && firstFilled.length
    ? Math.max(...firstFilled.map((school) => school.requiredDelta))
    : Infinity;
  const secondPool = state.planMode === "first-main"
    ? secondBatch.filter((school) => school.requiredDelta <= firstFloor)
    : secondBatch;
  const finalSecondPool = state.publicSafetyOnly && state.planMode === "first-main"
    ? secondPool.filter((school) => school.ownership === "公办")
    : secondPool;

  let secondSlots = pickSlotsByRoles(
    finalSecondPool,
    used,
    secondRoles,
    state,
    state.planMode === "first-main" ? { limitMaxRequiredDelta: firstFloor } : {}
  );
  secondSlots = ensureMinimumSecondSlots(secondSlots, secondBatchAll, used, state);

  return {
    directional,
    first: firstSlots,
    second: secondSlots,
    firstRoles,
    secondRoles,
    secondAnchor,
    firstMinRequiredDelta
  };
}

function fillSlots(slots, count, pool, used, state, options = {}) {
  const constrainedPool = pool.filter((school) => (
    (options.limitMaxRequiredDelta === undefined || school.requiredDelta <= options.limitMaxRequiredDelta)
    && (options.limitMinRequiredDelta === undefined || school.requiredDelta > options.limitMinRequiredDelta)
  ));

  while (slots.length < count) {
    slots.push(null);
  }

  for (let index = 0; index < slots.length; index += 1) {
    if (slots[index]) {
      continue;
    }

    const fallback = pickUnique(
      constrainedPool,
      used,
      (school) => index === slots.length - 1 ? isUsefulSafe(school, state) : school.match !== "超高风险",
      index === slots.length - 1 ? safeFirst : betterFirst
    ) || pickUnique(
      constrainedPool,
      used,
      (school) => school.match !== "超高风险" && school.gap <= state.safeMaxGap + 10,
      index === slots.length - 1 ? safeFirst : betterFirst
    );
    slots[index] = fallback;
  }

  const last = slots[slots.length - 1];
  if (last && last.match !== "保底") {
    const saferPool = state.publicSafetyOnly ? constrainedPool.filter((school) => school.ownership === "公办") : constrainedPool;
    const safer = saferPool
      .filter((school) => !used.has(school.id) || school.id === last.id)
      .filter((school) => isUsefulSafe(school, state))
      .sort(safeFirst)[0];
    if (safer) {
      used.delete(last.id);
      used.add(safer.id);
      slots[slots.length - 1] = safer;
    }
  }
}

function renderSummary(state, plan) {
  const deltaText = state.studentDelta >= 0 ? `+${round(state.studentDelta)}` : round(state.studentDelta);
  document.querySelector("#studentDelta").textContent = deltaText;
  document.querySelector("#scoreSummary").textContent =
    state.studentDelta >= 0
      ? `高出控制线 ${round(state.studentDelta)} 分`
      : `低于控制线 ${round(Math.abs(state.studentDelta))} 分`;
  document.querySelector("#strategyName").textContent = state.strategy.name;
  document.querySelector("#strategySummary").textContent = `${state.strategy.summary}；${getPlanModeLabel(state.planMode)}`;

  const selectedFirst = plan.first.map((school, index) => resolveSelectedSlotSchool(`first-${index}`, school));
  const selectedSecond = plan.second.map((school, index) => resolveSelectedSlotSchool(`second-${index}`, school));
  const selectedDirectional = resolveSelectedSlotSchool("directional", plan.directional);
  const allSlots = [selectedDirectional, ...selectedFirst, ...selectedSecond].filter(Boolean);
  const lastSafe = [...selectedSecond].reverse().find(Boolean);
  const lastGap = lastSafe?.gap ?? 0;
  const safety = getSafetyStatus(allSlots, lastSafe, state);
  document.querySelector("#safetyScore").textContent = safety.title;
  document.querySelector("#safetySummary").textContent = safety.summary;

  if (lastSafe) {
    document.querySelector("#safetySummary").textContent += `，末位余量 ${round(lastGap)} 分`;
  }
}

function resolveSelectedSlotSchool(slotKey, fallbackSchool) {
  const manualId = manualSelections[slotKey];
  if (manualId === "__empty__") {
    return null;
  }
  if (!manualId) {
    return fallbackSchool;
  }
  return currentSchools.find((school) => school.id === manualId) ?? fallbackSchool;
}

function getPlanModeLabel(mode) {
  if (mode === "first-main") {
    return "省示范优先";
  }
  if (mode === "second-main") {
    return "二批优质校优先";
  }
  return "最高分优先";
}

function getSafetyStatus(slots, lastSafe, state) {
  if (state.studentDelta < 0) {
    return { title: "不足", summary: "当前分数低于控制线，建议优先关注征集或职普融通信息" };
  }

  const safeCount = slots.filter((school) => school.match === "保底").length;
  if (!lastSafe || lastSafe.gap < state.strategy.safe.min || safeCount < 2) {
    return { title: "偏紧", summary: `保底梯度不足，建议补一个 ${formatRange(state.strategy.safe)} 余量学校` };
  }
  if (lastSafe.gap > state.strategy.safe.max) {
    return { title: "过低", summary: `末位学校余量超过 ${round(state.strategy.safe.max)} 分，保底有些浪费` };
  }
  if (lastSafe.gap >= state.strategy.safe.min && lastSafe.gap <= state.strategy.safe.max && safeCount >= 2) {
    return { title: "良好", summary: "保底余量在有效窗口内，梯度比较实用" };
  }
  return { title: "可用", summary: "志愿梯度基本完整" };
}

function renderTierBoard(schools) {
  const board = document.querySelector("#tierBoard");
  board.innerHTML = TIER_CONFIG.map((tier) => {
    const items = schools
      .filter((school) => school.match === tier.key)
      .filter((school) => tier.key !== "保底" || isUsefulSafe(school, currentState))
      .sort(tier.key === "保底" ? safeFirst : betterFirst)
      .slice(0, 10);

    return `
      <article class="tier-column">
        <div class="tier-head">
          <h3>${tier.title}</h3>
          <span>${items.length} 所</span>
        </div>
        <div class="tier-list">
          ${
            items.length
              ? items.map(renderCompactSchool).join("")
              : `<div class="empty-state">当前筛选下没有${tier.key}学校</div>`
          }
        </div>
      </article>
    `;
  }).join("");
  attachSchoolCardEvents(board);
}

function renderCompactSchool(school) {
  const lineText = formatExpectedLine(school);
  return `
    <article class="school-item interactive-school" data-school-id="${school.id}" role="button" tabindex="0" aria-label="查看${school.name}出口详情">
      <h4>${school.shortName}</h4>
      <div class="meta-line">
        ${renderPill(school.level, LEVEL_CLASS[school.level])}
        ${renderPill(school.tier, "standard")}
        ${renderPill(school.ownership)}
        ${renderPill(school.district)}
        ${renderPill(formatDistance(school))}
      </div>
      <div class="match-row">
        <div class="meter" aria-label="匹配度 ${round(school.matchScore)}">
          <span style="--meter:${round(school.matchScore, 0)}%"></span>
        </div>
        <span class="gap-text">${school.match} · ${lineText} · 余量 ${formatGap(school.gap)} · 距家 ${formatDistance(school)}</span>
      </div>
    </article>
  `;
}

function renderVolunteerTable(plan) {
  const table = document.querySelector("#volunteerTable");
  renderPlanModeHint(plan);
  const rows = [
    { key: "directional", slot: "定向志愿", school: plan.directional, role: "定向", group: "directional" },
    ...plan.first.map((school, index) => ({ key: `first-${index}`, slot: `第一批次 ${index + 1}`, school, role: plan.firstRoles?.[index] ?? "梯度", group: "first" })),
    ...plan.second.map((school, index) => ({ key: `second-${index}`, slot: `第二批次 ${index + 1}`, school, role: plan.secondRoles?.[index] ?? "梯度", group: "second" }))
  ];

  table.innerHTML = rows.map(renderVolunteerRow).join("");
  attachVolunteerSelectEvents();
}

function renderPlanModeHint(plan) {
  const hint = document.querySelector("#planModeHint");
  if (!hint || !currentState) {
    return;
  }

  if (currentState.planMode === "score-first" && plan.secondAnchor) {
    hint.textContent = `最高分优先：先比较顺序检索下最值得争取的学校，当前二批锚点为 ${plan.secondAnchor.shortName}（${formatExpectedLine(plan.secondAnchor)}）；一批次只放预测线更高或基本够不上的学校，并自动满足一批至少2所。`;
    return;
  }

  if (currentState.planMode === "second-main" && plan.secondAnchor) {
    hint.textContent = `二批优质校优先：二批冲刺目标为 ${plan.secondAnchor.shortName}（${formatExpectedLine(plan.secondAnchor)}）；一批次优先填高冲滑档校，并自动满足一批至少2所。`;
    return;
  }

  if (currentState.planMode === "first-main") {
    hint.textContent = `省示范优先：优先争取一批省示范，但不推荐余量超过${round(currentState.demoMaxGap)}分的一批省示范；二批次只做不高于一批推荐上限的保底承接。`;
    return;
  }

  hint.textContent = "";
}

function renderVolunteerRow(row) {
  const candidates = getVolunteerCandidates(row.group, row.school);
  const selectedSchool = resolveSelectedSchool(row, candidates);

  if (selectedSchool === null) {
    return renderEmptyVolunteerRow(row, candidates);
  }

  if (selectedSchool && selectedSchool.id !== row.school?.id) {
    row.school = selectedSchool;
  }

  if (!row.school) {
    return renderEmptyVolunteerRow(row, candidates);
  }

  const school = row.school;
  const lineText = formatExpectedLine(school);
  const targetText = row.role === "定向" && school.targetQuota
    ? ` · 定向名额 ${school.targetQuota.quota} 个`
    : "";
  return `
    <article class="volunteer-row">
      <span class="slot">${row.slot}</span>
      <div class="volunteer-school">
        <label class="volunteer-select-label">
          <span>${row.role}推荐，可自行选择</span>
          <select class="volunteer-select" data-slot-key="${row.key}" data-group="${row.group}">
            ${renderVolunteerOptions(candidates, school)}
          </select>
        </label>
        <span>${school.code} · ${school.tier} · ${school.district} · ${school.batch} · 距家 ${formatDistance(school)}${targetText}</span>
      </div>
      <span class="match-badge ${MATCH_CLASS[school.match]}">${row.role} / ${school.match}</span>
      <span class="volunteer-risk">${lineText}，余量 ${formatGap(school.gap)}</span>
    </article>
  `;
}

function renderEmptyVolunteerRow(row, candidates) {
  return `
    <article class="volunteer-row">
      <span class="slot">${row.slot}</span>
      <div class="volunteer-school">
        <label class="volunteer-select-label">
          <span>${row.role}推荐，可自行选择</span>
          <select class="volunteer-select" data-slot-key="${row.key}" data-group="${row.group}">
            ${renderVolunteerOptions(candidates, null)}
          </select>
        </label>
        <span>该志愿位暂不填报学校</span>
      </div>
      <span class="pill">空</span>
      <span class="volunteer-risk">可保留为空</span>
    </article>
  `;
}

function getVolunteerCandidates(group, selectedSchool = null) {
  const candidateSource = currentFilteredSchools.length ? currentFilteredSchools : currentSchools;

  if (group === "directional") {
    const candidates = candidateSource
      .filter((school) => {
        const quota = school.targetQuota?.quota ?? 0;
        return quota > 0 && school.gap > -20 && school.gap < 5;
      })
      .sort(targetFirst);
    return includeSelectedCandidate(candidates, selectedSchool);
  }

  if (group === "first") {
    const allowHighRiskBlockers = currentState?.planMode === "score-first" || currentState?.planMode === "second-main";
    const firstCandidates = candidateSource
      .filter((school) => school.batch === "第一批次" && school.level === "省示范")
      .filter((school) => allowHighRiskBlockers || school.match !== "超高风险")
      .filter((school) => {
        if (currentState?.planMode !== "second-main" && currentState?.planMode !== "score-first") {
          return true;
        }
        const secondAnchor = currentState?.planMode === "score-first"
          ? getSecondBatchBest(candidateSource)
          : getSecondBatchAnchor(candidateSource);
        return !secondAnchor || school.requiredDelta > secondAnchor.requiredDelta;
      });
    return includeSelectedCandidate(firstCandidates.sort(betterFirst), selectedSchool);
  }

  const firstLimit = getFirstBatchLimit(currentPlan);
  const candidates = candidateSource
    .filter((school) => school.batch === "第二批次" && school.match !== "超高风险")
    .filter((school) => currentState?.planMode !== "first-main" || !Number.isFinite(firstLimit) || school.requiredDelta <= firstLimit)
    .sort(betterFirst);
  return includeSelectedCandidate(candidates, selectedSchool);
}

function includeSelectedCandidate(candidates, selectedSchool) {
  if (!selectedSchool || candidates.some((school) => school.id === selectedSchool.id)) {
    return candidates;
  }
  return [selectedSchool, ...candidates];
}

function getSecondBatchAnchor(candidateSource) {
  return candidateSource
    .filter((school) => school.batch === "第二批次" && school.match === "冲刺")
    .sort(betterFirst)[0] ?? null;
}

function getSecondBatchBest(candidateSource) {
  return candidateSource
    .filter((school) => school.batch === "第二批次" && school.match !== "超高风险")
    .sort(betterFirst)[0] ?? null;
}

function getFirstBatchLimit(plan) {
  if (currentState?.planMode !== "first-main") {
    return Infinity;
  }
  const firstSchools = plan?.first?.filter(Boolean) ?? [];
  if (!firstSchools.length) {
    return Infinity;
  }
  return Math.max(...firstSchools.map((school) => school.requiredDelta));
}

function resolveSelectedSchool(row, candidates) {
  const manualId = manualSelections[row.key];
  if (manualId === "__empty__") {
    return null;
  }
  const manual = candidates.find((school) => school.id === manualId);
  if (manual) {
    return manual;
  }

  if (manualId) {
    delete manualSelections[row.key];
  }

  return row.school;
}

function renderVolunteerOptions(candidates, selectedSchool) {
  const emptySelected = !selectedSchool ? "selected" : "";
  return [
    `<option value="__empty__" ${emptySelected}>空｜暂不填报</option>`,
    ...candidates.map((school) => {
    const selected = selectedSchool && school.id === selectedSchool.id ? "selected" : "";
    const quota = school.targetQuota?.quota > 0 ? ` · 定向${school.targetQuota.quota}名` : "";
    const matchLabel = school.match === "超高风险" && (currentState?.planMode === "score-first" || currentState?.planMode === "second-main")
      ? "高冲补位"
      : school.match;
    return `<option value="${school.id}" ${selected}>${school.shortName}｜${school.tier}｜${matchLabel}｜余量${formatGap(school.gap)}｜${formatDistance(school)}｜${school.district}${quota}</option>`;
    })
  ].join("");
}

function attachVolunteerSelectEvents() {
  document.querySelectorAll(".volunteer-select").forEach((select) => {
    select.addEventListener("change", () => {
      manualSelections[select.dataset.slotKey] = select.value;
      render();
    });
  });
}

function attachSchoolCardEvents(root = document) {
  root.querySelectorAll(".interactive-school").forEach((card) => {
    if (card.dataset.detailBound === "true") {
      return;
    }

    card.dataset.detailBound = "true";
    card.addEventListener("click", () => {
      openSchoolDetail(card.dataset.schoolId);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      event.preventDefault();
      openSchoolDetail(card.dataset.schoolId);
    });
  });
}

function renderSchoolGrid(schools) {
  const grid = document.querySelector("#schoolGrid");
  if (!schools.length) {
    grid.innerHTML = `<div class="empty-state">当前筛选没有匹配学校，试着放宽区域、性质或匹配度。</div>`;
    return;
  }

  grid.innerHTML = schools
    .sort((a, b) => b.matchScore - a.matchScore || betterFirst(a, b))
    .slice(0, 72)
    .map(renderSchoolCard)
    .join("");
  attachSchoolCardEvents(grid);
}

function renderSchoolCard(school) {
  const yearText = school.referenceYears.length ? school.referenceYears.join("、") : "暂无";
  const lineText = formatExpectedLine(school);
  return `
    <article class="school-card interactive-school" data-school-id="${school.id}" role="button" tabindex="0" aria-label="查看${school.name}出口详情">
      <div class="card-head">
        <h3>${school.name}</h3>
        <span class="match-badge ${MATCH_CLASS[school.match]}">${school.match}</span>
      </div>
      <div class="meta-line">
        ${renderPill(school.level, LEVEL_CLASS[school.level])}
        ${renderPill(school.tier, "standard")}
        ${renderPill(school.ownership)}
        ${renderPill(school.district)}
        ${renderPill(formatDistance(school))}
        ${renderPill(school.batch)}
        ${school.targetQuota?.quota > 0 ? renderPill(`定向${school.targetQuota.quota}名`, "standard") : ""}
      </div>
      <div class="match-row">
        <div class="meter">
          <span style="--meter:${round(school.matchScore, 0)}%"></span>
        </div>
        <span class="gap-text">匹配度 ${round(school.matchScore, 0)} · 余量 ${formatGap(school.gap)} · 距家 ${formatDistance(school)} · ${lineText}</span>
      </div>
      <p class="school-note">
        ${school.publicEstimate ? `${school.publicEstimate.source}，历史参考 ${yearText} 年` : `参考 ${yearText} 年`}，近年${school.trend.label}，置信度${school.confidence}。
        ${school.tags.map((tag) => `#${tag}`).join(" ")}
      </p>
      <span class="detail-hint">点击查看出口数据</span>
    </article>
  `;
}

function renderPill(text, extraClass = "") {
  return `<span class="pill ${extraClass}">${text}</span>`;
}

function formatGap(gap) {
  return gap >= 0 ? `+${round(gap)}` : round(gap);
}

function formatExpectedLine(school) {
  if (!school.publicEstimate) {
    return `预测线 ${round(school.expectedLine)}`;
  }

  const { min, max, source } = school.publicEstimate;
  const range = min === max ? round(min) : `${round(min)}-${round(max)}`;
  const modelLine = Number.isFinite(school.modelRequiredDelta) && currentState
    ? currentState.controlLine + school.modelRequiredDelta
    : null;
  const modelText = Number.isFinite(modelLine) ? `，历史模型 ${round(modelLine)}` : "";
  return `预测线 ${round(school.expectedLine)}（${source} ${range}${modelText}）`;
}

function getOutcomeData(school) {
  const outcomeData = typeof SCHOOL_OUTCOME_DATA === "undefined"
    ? {
      default: {
        year: null,
        firstTierRate: null,
        sixHundredRate: null,
        highScoreCount: null,
        doubleFirstClassRate: null,
        undergraduateRate: null,
        sourceTitle: null,
        sourceUrl: null,
        note: "出口数据待补：请以学校官方发布、教育主管部门公开信息或可信家长会资料为准。"
      }
    }
    : SCHOOL_OUTCOME_DATA;
  const minYear = outcomeData.minYear ?? 2021;
  const schoolOutcome = outcomeData[school.id] ?? outcomeData[school.code] ?? {};
  const isOutdated = Number.isFinite(schoolOutcome.year) && schoolOutcome.year < minYear;
  if (isOutdated) {
    return {
      ...outcomeData.default,
      year: null,
      note: `仅展示近5年（${minYear}-2025）出口数据；已忽略更早年份资料。`
    };
  }
  return {
    ...outcomeData.default,
    ...schoolOutcome
  };
}

function getClassTypeData(school) {
  const classTypeData = typeof SCHOOL_CLASS_TYPE_DATA === "undefined"
    ? {
      default: {
        sourceTitle: null,
        sourceUrl: null,
        note: "班型待补：暂未查到稳定公开资料，建议以学校当年招生简章、家长会或高一分班通知为准。",
        classes: []
      }
    }
    : SCHOOL_CLASS_TYPE_DATA;
  return {
    ...classTypeData.default,
    ...(classTypeData[school.id] ?? classTypeData[school.code] ?? {})
  };
}

function formatOutcomeRate(value) {
  if (!Number.isFinite(value)) {
    return "待补";
  }
  return value <= 1 ? `${round(value * 100, 1)}%` : `${round(value, 1)}%`;
}

function formatOutcomeCount(value) {
  if (!Number.isFinite(value)) {
    return "待补";
  }
  return `${round(value, 0)}人`;
}

function renderOutcomeMetric(label, value, helper = "") {
  const pending = value === "待补";
  return `
    <div class="outcome-metric ${pending ? "pending" : ""}">
      <span>${label}</span>
      <strong>${value}</strong>
      ${helper ? `<small>${helper}</small>` : ""}
    </div>
  `;
}

function renderOutcomeSource(outcome) {
  if (outcome.sourceUrl && outcome.sourceTitle) {
    return `<a href="${outcome.sourceUrl}" target="_blank" rel="noreferrer">${outcome.sourceTitle}</a>`;
  }
  if (outcome.sourceTitle) {
    return `<span>${outcome.sourceTitle}</span>`;
  }
  return `<span>暂无可信公开来源</span>`;
}

function formatClassCount(count) {
  if (!Number.isFinite(count)) {
    return "不明";
  }
  return `${round(count, 0)}个`;
}

function renderClassTypes(classType) {
  if (!classType.classes.length) {
    return `<div class="empty-state compact-empty">${classType.note}</div>`;
  }

  return `
    <div class="class-type-grid">
      ${classType.classes.map((item) => `
        <div class="class-type-item">
          <span>${item.name}</span>
          <strong>${formatClassCount(item.count)}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderClassTypeSource(classType) {
  if (classType.sourceUrl && classType.sourceTitle) {
    return `<a href="${classType.sourceUrl}" target="_blank" rel="noreferrer">${classType.sourceTitle}</a>`;
  }
  if (classType.sourceTitle) {
    return `<span>${classType.sourceTitle}</span>`;
  }
  return `<span>暂无公开来源</span>`;
}

function renderSchoolDetail(school) {
  const outcome = getOutcomeData(school);
  const classType = getClassTypeData(school);
  const quotaText = school.targetQuota
    ? `${school.targetQuota.quota} 个，面向 ${TARGET_QUOTA_DATA.sourceSchool}`
    : "暂无定向名额";
  const outcomeYear = outcome.year ? `${outcome.year}届` : "年份待补";

  return `
    <div class="detail-head">
      <div>
        <p class="detail-kicker">${school.code} · ${school.batch} · ${school.tier}</p>
        <h2 id="detailSchoolName">${school.name}</h2>
        <div class="meta-line">
          ${renderPill(school.level, LEVEL_CLASS[school.level])}
          ${renderPill(school.ownership)}
          ${renderPill(school.district)}
          ${renderPill(formatDistance(school))}
          ${school.targetQuota?.quota > 0 ? renderPill(`定向${school.targetQuota.quota}名`, "standard") : ""}
        </div>
      </div>
      <button class="detail-close" type="button" aria-label="关闭学校详情">×</button>
    </div>

    <div class="detail-summary-grid">
      <div>
        <span>预测线</span>
        <strong>${round(school.expectedLine)}</strong>
        ${school.publicEstimate ? `<small>${formatExpectedLine(school)}</small>` : ""}
      </div>
      <div>
        <span>当前余量</span>
        <strong>${formatGap(school.gap)}</strong>
      </div>
      <div>
        <span>匹配度</span>
        <strong>${round(school.matchScore, 0)}</strong>
      </div>
      <div>
        <span>热度趋势</span>
        <strong>${school.trend.label}</strong>
      </div>
    </div>

    <section class="detail-section">
      <h3>出口数据</h3>
      <p>${outcomeYear} · ${outcome.note}</p>
      <div class="outcome-grid">
        ${renderOutcomeMetric("一本率", formatOutcomeRate(outcome.firstTierRate), "或特控线上线率")}
        ${renderOutcomeMetric("600分以上比率", formatOutcomeRate(outcome.sixHundredRate))}
        ${renderOutcomeMetric("600分以上人数", formatOutcomeCount(outcome.highScoreCount))}
        ${renderOutcomeMetric("双一流/重点去向", formatOutcomeRate(outcome.doubleFirstClassRate))}
        ${renderOutcomeMetric("本科率", formatOutcomeRate(outcome.undergraduateRate))}
      </div>
      <div class="detail-source">
        <span>数据来源</span>
        ${renderOutcomeSource(outcome)}
      </div>
    </section>

    <section class="detail-section">
      <h3>班型设置</h3>
      <p>${classType.note}</p>
      ${renderClassTypes(classType)}
      <div class="detail-source">
        <span>资料来源</span>
        ${renderClassTypeSource(classType)}
      </div>
    </section>

    <section class="detail-section">
      <h3>填报参考</h3>
      <div class="detail-facts">
        <span>定向名额：${quotaText}</span>
        <span>近年参考：${school.referenceYears.length ? school.referenceYears.join("、") : "暂无"} 年</span>
        <span>录取置信度：${school.confidence}</span>
        <span>标签：${school.tags.map((tag) => `#${tag}`).join(" ")}</span>
      </div>
    </section>
  `;
}

function openSchoolDetail(schoolId) {
  const school = currentSchools.find((item) => item.id === schoolId);
  if (!school || !schoolDetailSheet || !schoolDetailOverlay || !schoolDetailContent) {
    return;
  }

  selectedDetailSchoolId = school.id;
  schoolDetailContent.innerHTML = renderSchoolDetail(school);
  schoolDetailOverlay.hidden = false;
  document.body.classList.add("detail-open");
  schoolDetailSheet.classList.add("open");
  schoolDetailSheet.setAttribute("aria-hidden", "false");
  schoolDetailContent.querySelector(".detail-close")?.focus();
}

function closeSchoolDetail() {
  selectedDetailSchoolId = null;
  if (!schoolDetailSheet || !schoolDetailOverlay) {
    return;
  }

  document.body.classList.remove("detail-open");
  schoolDetailSheet.classList.remove("open");
  schoolDetailSheet.setAttribute("aria-hidden", "true");
  window.setTimeout(() => {
    if (!selectedDetailSchoolId) {
      schoolDetailOverlay.hidden = true;
    }
  }, 180);
}

function refreshOpenSchoolDetail() {
  if (!selectedDetailSchoolId || !schoolDetailContent) {
    return;
  }
  const school = currentSchools.find((item) => item.id === selectedDetailSchoolId);
  if (!school) {
    closeSchoolDetail();
    return;
  }
  schoolDetailContent.innerHTML = renderSchoolDetail(school);
}

function renderSources() {
  document.querySelector("#sourceList").innerHTML = SOURCE_LINKS.map((source) => {
    return `<a href="${source.url}" target="_blank" rel="noreferrer">${source.title}<small> · ${source.note}</small></a>`;
  }).join("");
}

function populateFilters() {
  document.querySelector("#schoolCount").textContent = SCHOOL_DATA.length;
  unique(SCHOOL_DATA.map((school) => school.district)).forEach((district) => {
    districtFilter.append(createDistrictCheckbox(district, DEFAULT_DISTRICTS.includes(district)));
    browseDistrictFilter.append(createDistrictCheckbox(district, false));
  });
}

function createDistrictCheckbox(district, checked = false) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.value = district;
  input.checked = checked;
  label.append(input, district);
  return label;
}

function syncDistrictSelect(container, changedInput = null) {
  const inputs = [...container.querySelectorAll('input[type="checkbox"]')];
  const allInput = inputs.find((input) => input.value === "all");
  if (!allInput) {
    return;
  }

  if (changedInput === allInput && allInput.checked) {
    inputs
      .filter((input) => input !== allInput)
      .forEach((input) => {
        input.checked = false;
      });
    return;
  }

  const specificSelected = inputs.filter((input) => input !== allInput && input.checked);

  if (specificSelected.length > 0) {
    allInput.checked = false;
    return;
  }

  allInput.checked = true;
}

function render() {
  currentState = getState();
  currentSchools = SCHOOL_DATA.map((school) => estimateSchool(school, currentState));
  currentFilteredSchools = baseFilter(currentSchools, currentState);
  currentPlan = makePlan(currentFilteredSchools, currentState);
  const displaySchools = displayFilter(currentFilteredSchools, currentState);

  renderRankEstimate(currentState);
  renderSummary(currentState, currentPlan);
  renderTierBoard(currentFilteredSchools);
  renderVolunteerTable(currentPlan);
  renderSchoolGrid(displaySchools);
  refreshOpenSchoolDetail();

  if (window.lucide) {
    window.lucide.createIcons();
  } else {
    renderFallbackIcons();
  }

  syncPanelHeights();
  scheduleDrivingDistances();
}

function syncPanelHeights() {
  const controlPanel = document.querySelector(".control-panel");
  if (!controlPanel) {
    return;
  }

  const height = Math.ceil(controlPanel.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--control-panel-height", `${height}px`);
}

function renderKeepingViewport(anchorElement) {
  const beforeTop = anchorElement?.getBoundingClientRect?.().top ?? null;
  const beforeScrollY = window.scrollY;
  render();
  if (beforeTop === null) {
    window.scrollTo({ top: beforeScrollY, behavior: "auto" });
    return;
  }

  window.requestAnimationFrame(() => {
    const afterTop = anchorElement.getBoundingClientRect().top;
    window.scrollBy({ top: afterTop - beforeTop, behavior: "auto" });
  });
}

function renderFallbackIcons() {
  document.querySelectorAll("[data-lucide]").forEach((icon) => {
    icon.textContent = FALLBACK_ICONS[icon.dataset.lucide] ?? "•";
    icon.classList.add("fallback-icon");
  });
}

function attachEvents() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    render();
  });

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : event.target?.parentElement;
    const closeButton = target?.closest(".detail-close");
    if (closeButton || event.target === schoolDetailOverlay) {
      closeSchoolDetail();
      return;
    }

    const schoolCard = target?.closest(".interactive-school");
    if (schoolCard?.dataset.schoolId) {
      openSchoolDetail(schoolCard.dataset.schoolId);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSchoolDetail();
      return;
    }

    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    const schoolCard = event.target.closest?.(".interactive-school");
    if (schoolCard?.dataset.schoolId) {
      event.preventDefault();
      openSchoolDetail(schoolCard.dataset.schoolId);
    }
  });

  [
    scoreInput,
    controlLineInput,
    homeLatInput,
    homeLngInput,
    distanceFilter,
    rushMinInput,
    rushMaxInput,
    stableMinInput,
    stableMaxInput,
    safeMinInput,
    safeMaxInput,
    ownershipFilter,
    publicSafetyOnly,
    showOnlyMatched,
    searchInput,
    batchFilter,
    matchFilter,
    demoMaxGapInput,
    ...document.querySelectorAll('input[name="level"]')
  ].forEach((element) => {
    element.addEventListener("input", render);
    element.addEventListener("change", render);
  });

  planModeInputs.forEach((input) => {
    input.addEventListener("change", () => {
      manualSelections = {};
      render();
    });
  });

  demoMaxGapInput?.addEventListener("change", () => {
    manualSelections = {};
    render();
  });

  districtFilter.addEventListener("change", (event) => {
    syncDistrictSelect(districtFilter, event.target);
    renderKeepingViewport(districtFilter);
  });

  browseDistrictFilter.addEventListener("change", (event) => {
    syncDistrictSelect(browseDistrictFilter, event.target);
    renderKeepingViewport(browseDistrictFilter);
  });

  homeAddressInput.addEventListener("change", () => {
    geocodeHomeAddress(homeAddressInput.value.trim());
  });

  window.addEventListener("resize", syncPanelHeights);
}

function boot() {
  loadStoredSchoolLocations();
  populateFilters();
  syncDistrictSelect(districtFilter);
  syncDistrictSelect(browseDistrictFilter);
  renderSources();
  scoreInput.max = TARGET_YEAR_PRESETS[2026]?.max ?? 640;
  attachEvents();
  loadAmap();
  render();
  syncPanelHeights();
}

document.addEventListener("DOMContentLoaded", boot);
