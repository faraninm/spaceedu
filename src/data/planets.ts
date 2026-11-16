export type PlanetId =
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune';

export type PlanetCategory = 'Terrestrial' | 'Gas Giant' | 'Ice Giant';

export interface AtmosphereGas {
  symbol: string;
  name: string;
  percent: number;
  color: string;
}

export interface PlanetData {
  id: PlanetId;
  orderIndex: number;
  name: string;
  tagline: string;
  category: PlanetCategory;
  heroLede: string;
  overview: string;
  cutoutUrl: string;
  stillUrl: string;
  videoUrl?: string;
  usesDarkBlend: boolean;
  accentColor: string;
  diameterKm: number;
  massKgText: string;
  massEarths: number;
  radiusEarths: number;
  distanceAu: number;
  distanceMillionKm: number;
  orbitalPeriodDays: number;
  orbitalPeriodLabel: string;
  orbitalVelocityKmS: number;
  rotationPeriodLabel: string;
  axialTiltDeg: number;
  gravityMs2: number;
  meanTempC: number;
  tempRangeC: string;
  moonsCount: number;
  notableMoons: string[];
  atmosphere: AtmosphereGas[];
  missions: string[];
  highlights: string[];
}

export const PLANET_ORDER: PlanetId[] = [
  'mercury',
  'venus',
  'earth',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
];

export const PLANETS: Record<PlanetId, PlanetData> = {
  mercury: {
    id: 'mercury',
    orderIndex: 1,
    name: 'MERCURY',
    tagline: 'Swift iron-core world scorched by the nearby Sun',
    category: 'Terrestrial',
    heroLede:
      'The smallest and innermost planet, racing around the Sun every 88 Earth days. Course enrollment <br>starts today. Early Bird tickets typically last a week, don&rsquo;t miss out!',
    overview:
      'Mercury has no substantial atmosphere to retain heat, producing the most extreme diurnal temperature swings in the solar system. Beneath its heavily cratered silicate crust lies an oversized iron core spanning roughly 85% of the planet’s radius.',
    cutoutUrl: '/src/assets/images/planet_mercury_cutout.png',
    stillUrl: '/src/assets/images/planet_mercury_cutout.png',
    usesDarkBlend: false,
    accentColor: '#b8bec7',
    diameterKm: 4879,
    massKgText: '3.30 × 10²³ kg',
    massEarths: 0.0553,
    radiusEarths: 0.383,
    distanceAu: 0.39,
    distanceMillionKm: 57.9,
    orbitalPeriodDays: 88,
    orbitalPeriodLabel: '88.0 days',
    orbitalVelocityKmS: 47.36,
    rotationPeriodLabel: '58d 15h',
    axialTiltDeg: 0.03,
    gravityMs2: 3.7,
    meanTempC: 167,
    tempRangeC: '-180 °C to +430 °C',
    moonsCount: 0,
    notableMoons: ['None'],
    atmosphere: [
      { symbol: 'O₂', name: 'Oxygen (exosphere)', percent: 42, color: '#79dce8' },
      { symbol: 'Na', name: 'Sodium', percent: 29, color: '#e6c27a' },
      { symbol: 'H₂', name: 'Hydrogen', percent: 22, color: '#9ab0cc' },
      { symbol: 'He', name: 'Helium', percent: 7, color: '#6b7f9e' },
    ],
    missions: ['Mariner 10 (1974)', 'MESSENGER (2011–2015)', 'BepiColombo (2025–2026)'],
    highlights: [
      '3:2 spin-orbit resonance causes one solar day to last 176 Earth days.',
      'Caloris Basin spans 1,550 km across from an ancient giant impact.',
      'Permanently shadowed polar craters harbor water ice despite daytime heat.',
    ],
  },
  venus: {
    id: 'venus',
    orderIndex: 2,
    name: 'VENUS',
    tagline: 'Super-greenhouse world veiled in reflective sulfuric clouds',
    category: 'Terrestrial',
    heroLede:
      'The hottest world in our solar system, wrapped in clouds of sulfuric acid. Course enrollment <br>starts today. Early Bird tickets typically last a week, don&rsquo;t miss out!',
    overview:
      'Often called Earth’s twin in size and bulk density, Venus evolved down a radically different climatic path. A crushing 92-bar carbon dioxide atmosphere traps thermal radiation so efficiently that surface temperatures exceed lead’s melting point.',
    cutoutUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202012_640b239a-d08a-4200-adb2-741bbe129ac8.png',
    stillUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_cf55d1d8-7b59-4a64-80da-d72052ae974e.png',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_b211cd74-013b-4dd3-bfd0-64491d8696fa.mp4',
    usesDarkBlend: false,
    accentColor: '#e5bc78',
    diameterKm: 12104,
    massKgText: '4.87 × 10²⁴ kg',
    massEarths: 0.815,
    radiusEarths: 0.949,
    distanceAu: 0.72,
    distanceMillionKm: 108.2,
    orbitalPeriodDays: 224.7,
    orbitalPeriodLabel: '224.7 days',
    orbitalVelocityKmS: 35.02,
    rotationPeriodLabel: '243d 0h (retrograde)',
    axialTiltDeg: 177.36,
    gravityMs2: 8.87,
    meanTempC: 464,
    tempRangeC: '+462 °C to +471 °C',
    moonsCount: 0,
    notableMoons: ['None'],
    atmosphere: [
      { symbol: 'CO₂', name: 'Carbon Dioxide', percent: 96.5, color: '#e5bc78' },
      { symbol: 'N₂', name: 'Nitrogen', percent: 3.4, color: '#79dce8' },
      { symbol: 'SO₂', name: 'Sulfur Dioxide & trace', percent: 0.1, color: '#9ab0cc' },
    ],
    missions: ['Venera 13 (1982)', 'Magellan (1990–1994)', 'Akatsuki (2015–present)', 'VERITAS / EnVision'],
    highlights: [
      'Rotates backwards (retrograde) so slowly that a sidereal day is longer than its year.',
      'Upper cloud decks super-rotate around the globe in just 4 Earth days.',
      'Maxwell Montes rises 11 km above mean planetary radius on Ishtar Terra.',
    ],
  },
  earth: {
    id: 'earth',
    orderIndex: 3,
    name: 'EARTH',
    tagline: 'Oceanic biosphere shielded by a dynamic magnetosphere',
    category: 'Terrestrial',
    heroLede:
      'Learn more about the fascinating details that we call our home, Planet Earth. Course enrollment <br>starts today. Early Bird tickets typically last a week, don&rsquo;t miss out!',
    overview:
      'Earth sits squarely inside the solar habitable zone where liquid water persists on the surface. Active plate tectonics recycle carbon through the mantle while a convective liquid outer core sustains a dipole magnetic shield against solar wind stripping.',
    cutoutUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202005_3346cc4d-ec3b-44ab-825c-b18e49f5021a.png',
    stillUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_508c64b8-a31e-4290-bdfc-1187df70e0a6.png',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_3ffb4889-c520-432d-8458-038009eb40df.mp4',
    usesDarkBlend: false,
    accentColor: '#79dce8',
    diameterKm: 12742,
    massKgText: '5.97 × 10²⁴ kg',
    massEarths: 1.0,
    radiusEarths: 1.0,
    distanceAu: 1.0,
    distanceMillionKm: 149.6,
    orbitalPeriodDays: 365.25,
    orbitalPeriodLabel: '365.25 days',
    orbitalVelocityKmS: 29.78,
    rotationPeriodLabel: '23h 56m',
    axialTiltDeg: 23.44,
    gravityMs2: 9.81,
    meanTempC: 15,
    tempRangeC: '-89 °C to +57 °C',
    moonsCount: 1,
    notableMoons: ['The Moon (Luna)'],
    atmosphere: [
      { symbol: 'N₂', name: 'Nitrogen', percent: 78.1, color: '#79dce8' },
      { symbol: 'O₂', name: 'Oxygen', percent: 20.9, color: '#58b4e8' },
      { symbol: 'Ar', name: 'Argon & CO₂', percent: 1.0, color: '#9ab0cc' },
    ],
    missions: ['Apollo Program', 'ISS (1998–present)', 'DSCOVR (2015–present)', 'PACE (2024–present)'],
    highlights: [
      '71% of the crust is covered by liquid saline oceans averaging 3.7 km deep.',
      'Our unusually large Moon stabilizes Earth’s 23.4° axial tilt over geologic epochs.',
      'Densest planet in the solar system at 5.51 g/cm³.',
    ],
  },
  mars: {
    id: 'mars',
    orderIndex: 4,
    name: 'MARS',
    tagline: 'Iron-oxide desert frontier with ancient river deltas',
    category: 'Terrestrial',
    heroLede:
      'The rust-red desert world, home to the tallest volcano we know of. Course enrollment <br>starts today. Early Bird tickets typically last a week, don&rsquo;t miss out!',
    overview:
      'Mars preserves a 4-billion-year geologic record of when liquid water carved valley networks and filled crater lakes like Jezero. Today its thin carbon dioxide atmosphere supports planet-encircling dust storms and seasonal CO₂ frost caps.',
    cutoutUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202018_3d559490-f613-4ed7-a3bb-3b7e9fc90fb8.png',
    stillUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202133_0ba6de7c-285d-43dc-b7ab-8c54c73707cb.png',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260827_202422_51eae59a-2459-4c84-907c-cc5edfe5fea7.mp4',
    usesDarkBlend: false,
    accentColor: '#e2885c',
    diameterKm: 6779,
    massKgText: '6.42 × 10²³ kg',
    massEarths: 0.107,
    radiusEarths: 0.532,
    distanceAu: 1.52,
    distanceMillionKm: 227.9,
    orbitalPeriodDays: 687,
    orbitalPeriodLabel: '687.0 days',
    orbitalVelocityKmS: 24.07,
    rotationPeriodLabel: '24h 37m',
    axialTiltDeg: 25.19,
    gravityMs2: 3.72,
    meanTempC: -65,
    tempRangeC: '-140 °C to +20 °C',
    moonsCount: 2,
    notableMoons: ['Phobos', 'Deimos'],
    atmosphere: [
      { symbol: 'CO₂', name: 'Carbon Dioxide', percent: 95.3, color: '#e2885c' },
      { symbol: 'N₂', name: 'Nitrogen', percent: 2.6, color: '#79dce8' },
      { symbol: 'Ar', name: 'Argon & O₂', percent: 2.1, color: '#9ab0cc' },
    ],
    missions: ['Viking 1 & 2', 'Curiosity (2012–present)', 'Perseverance & Ingenuity', 'Mars Sample Return'],
    highlights: [
      'Olympus Mons towers 21.9 km high — nearly triple the height of Mount Everest.',
      'Valles Marineris stretches over 4,000 km long and up to 7 km deep.',
      'A Martian sol lasts 24 hours 39 minutes, making Earth-Mars ops closely synchronized.',
    ],
  },
  jupiter: {
    id: 'jupiter',
    orderIndex: 5,
    name: 'JUPITER',
    tagline: 'Colossal gas giant sculpting the solar system’s architecture',
    category: 'Gas Giant',
    heroLede:
      'More than twice as massive as every other planet combined, banded by supersonic storms. Course enrollment <br>starts today. Early Bird tickets typically last a week, don&rsquo;t miss out!',
    overview:
      'Jupiter is a rapidly spinning hydrogen-helium giant whose immense gravity shepherded asteroids and shaped planetary orbits during the early solar system. Deep inside, crushing pressures compress hydrogen into an electrically conducting liquid metal.',
    cutoutUrl: '/src/assets/images/planet_jupiter_cutout.png',
    stillUrl: '/src/assets/images/planet_jupiter_cutout.png',
    usesDarkBlend: false,
    accentColor: '#d9a473',
    diameterKm: 139820,
    massKgText: '1.90 × 10²⁷ kg',
    massEarths: 317.8,
    radiusEarths: 10.97,
    distanceAu: 5.2,
    distanceMillionKm: 778.5,
    orbitalPeriodDays: 4333,
    orbitalPeriodLabel: '11.86 years',
    orbitalVelocityKmS: 13.07,
    rotationPeriodLabel: '9h 56m',
    axialTiltDeg: 3.13,
    gravityMs2: 24.79,
    meanTempC: -110,
    tempRangeC: '-145 °C (cloud tops)',
    moonsCount: 95,
    notableMoons: ['Io', 'Europa', 'Ganymede', 'Callisto'],
    atmosphere: [
      { symbol: 'H₂', name: 'Molecular Hydrogen', percent: 89.8, color: '#d9a473' },
      { symbol: 'He', name: 'Helium', percent: 10.0, color: '#79dce8' },
      { symbol: 'CH₄', name: 'Methane & Ammonia', percent: 0.2, color: '#9ab0cc' },
    ],
    missions: ['Galileo (1995–2003)', 'Juno (2016–present)', 'JUICE (en route)', 'Europa Clipper'],
    highlights: [
      'The Great Red Spot is a high-pressure anticyclone wider than Earth, active for 350+ years.',
      'Ganymede is larger than Mercury and possesses its own intrinsic magnetic field.',
      'Fastest planetary rotation in the solar system flattens its poles noticeably.',
    ],
  },
  saturn: {
    id: 'saturn',
    orderIndex: 6,
    name: 'SATURN',
    tagline: 'Ringed gas giant encircled by 280,000 km of water-ice sheets',
    category: 'Gas Giant',
    heroLede:
      'Crowned by the solar system’s most expansive ring system of crystalline water ice. Course enrollment <br>starts today. Early Bird tickets typically last a week, don&rsquo;t miss out!',
    overview:
      'Saturn’s iconic rings span nearly 282,000 km wide yet measure often just 10 meters thick. Less dense than liquid water on average, Saturn hosts Titan—a hazy moon with liquid methane seas—and Enceladus, which vents subsurface ocean plumes.',
    cutoutUrl: '/src/assets/images/planet_saturn_cutout.png',
    stillUrl: '/src/assets/images/planet_saturn_cutout.png',
    usesDarkBlend: false,
    accentColor: '#e5d09b',
    diameterKm: 116460,
    massKgText: '5.68 × 10²⁶ kg',
    massEarths: 95.16,
    radiusEarths: 9.14,
    distanceAu: 9.58,
    distanceMillionKm: 1434,
    orbitalPeriodDays: 10759,
    orbitalPeriodLabel: '29.45 years',
    orbitalVelocityKmS: 9.68,
    rotationPeriodLabel: '10h 33m',
    axialTiltDeg: 26.73,
    gravityMs2: 10.44,
    meanTempC: -140,
    tempRangeC: '-178 °C (cloud tops)',
    moonsCount: 146,
    notableMoons: ['Titan', 'Enceladus', 'Mimas', 'Rhea'],
    atmosphere: [
      { symbol: 'H₂', name: 'Molecular Hydrogen', percent: 96.3, color: '#e5d09b' },
      { symbol: 'He', name: 'Helium', percent: 3.25, color: '#79dce8' },
      { symbol: 'CH₄', name: 'Methane & Ammonia', percent: 0.45, color: '#9ab0cc' },
    ],
    missions: ['Pioneer 11', 'Voyager 1 & 2', 'Cassini-Huygens (2004–2017)', 'Dragonfly (planned)'],
    highlights: [
      'A persistent 30,000 km hexagonal jet stream circles Saturn’s north pole.',
      'Mean bulk density is only 0.687 g/cm³ — lower than liquid water.',
      'Cassini sampled organic molecules erupting directly from Enceladus’s south-polar geysers.',
    ],
  },
  uranus: {
    id: 'uranus',
    orderIndex: 7,
    name: 'URANUS',
    tagline: 'Sideways-tilted ice giant bathed in pale cyan methane haze',
    category: 'Ice Giant',
    heroLede:
      'Rolling on its side at a 98-degree tilt with 42-year polar summers and winters. Course enrollment <br>starts today. Early Bird tickets typically last a week, don&rsquo;t miss out!',
    overview:
      'Unlike the gas giants Jupiter and Saturn, Uranus’s interior is dominated by supercritical water, ammonia, and methane ices. An ancient protoplanetary collision likely knocked its rotational axis nearly parallel to its orbital plane.',
    cutoutUrl: '/src/assets/images/planet_uranus_cutout.png',
    stillUrl: '/src/assets/images/planet_uranus_cutout.png',
    usesDarkBlend: false,
    accentColor: '#9ce6ef',
    diameterKm: 50724,
    massKgText: '8.68 × 10²⁵ kg',
    massEarths: 14.54,
    radiusEarths: 3.98,
    distanceAu: 19.22,
    distanceMillionKm: 2871,
    orbitalPeriodDays: 30687,
    orbitalPeriodLabel: '84.02 years',
    orbitalVelocityKmS: 6.8,
    rotationPeriodLabel: '17h 14m (retrograde)',
    axialTiltDeg: 97.77,
    gravityMs2: 8.69,
    meanTempC: -195,
    tempRangeC: '-224 °C (coldest atmosphere)',
    moonsCount: 28,
    notableMoons: ['Titania', 'Oberon', 'Miranda', 'Ariel'],
    atmosphere: [
      { symbol: 'H₂', name: 'Hydrogen', percent: 82.5, color: '#9ce6ef' },
      { symbol: 'He', name: 'Helium', percent: 15.2, color: '#79dce8' },
      { symbol: 'CH₄', name: 'Methane', percent: 2.3, color: '#58b4e8' },
    ],
    missions: ['Voyager 2 (1986 flyby)', 'Uranus Orbiter & Probe (Decadal priority)'],
    highlights: [
      'Records the coldest planetary atmospheric temperature in the solar system (-224 °C).',
      'Encircled by 13 narrow, dark dusty rings aligned with its tilted equator.',
      'Its magnetic dipole is offset by a third of the planet’s radius and tilted 59°.',
    ],
  },
  neptune: {
    id: 'neptune',
    orderIndex: 8,
    name: 'NEPTUNE',
    tagline: 'Supersonic deep-blue ice giant at the edge of the Kuiper Belt',
    category: 'Ice Giant',
    heroLede:
      'The outermost major planet, swept by supersonic methane winds over 2,000 km/h. Course enrollment <br>starts today. Early Bird tickets typically last a week, don&rsquo;t miss out!',
    overview:
      'Discovered through mathematical prediction before being seen through a telescope in 1846, Neptune radiates more than twice as much internal heat as it receives from the distant Sun, fueling the fastest sustained winds of any planet.',
    cutoutUrl: '/src/assets/images/planet_neptune_cutout.png',
    stillUrl: '/src/assets/images/planet_neptune_cutout.png',
    usesDarkBlend: false,
    accentColor: '#5c93ff',
    diameterKm: 49244,
    massKgText: '1.02 × 10²⁶ kg',
    massEarths: 17.15,
    radiusEarths: 3.86,
    distanceAu: 30.05,
    distanceMillionKm: 4495,
    orbitalPeriodDays: 60190,
    orbitalPeriodLabel: '164.8 years',
    orbitalVelocityKmS: 5.43,
    rotationPeriodLabel: '16h 6m',
    axialTiltDeg: 28.32,
    gravityMs2: 11.15,
    meanTempC: -200,
    tempRangeC: '-218 °C (cloud tops)',
    moonsCount: 16,
    notableMoons: ['Triton', 'Proteus', 'Nereid'],
    atmosphere: [
      { symbol: 'H₂', name: 'Hydrogen', percent: 80.0, color: '#5c93ff' },
      { symbol: 'He', name: 'Helium', percent: 19.0, color: '#79dce8' },
      { symbol: 'CH₄', name: 'Methane', percent: 1.0, color: '#9ce6ef' },
    ],
    missions: ['Voyager 2 (1989 flyby)', 'JWST Infrared Observations (2022–present)'],
    highlights: [
      'Equatorial jet streams reach 2,100 km/h — faster than the speed of sound on Earth.',
      'Largest moon Triton orbits backwards and erupts nitrogen-ice geysers 8 km high.',
      'Completed its very first full orbit since discovery only in July 2011.',
    ],
  },
};
