export interface TuitionPlan {
  id: 'audit' | 'cohort' | 'mentorship';
  name: string;
  subtitle: string;
  earlyBirdPrice: number;
  standardPrice: number;
  duration: string;
  seatLimit: string;
  recommended?: boolean;
  features: string[];
}

export interface TuitionFaq {
  id: string;
  question: string;
  answer: string;
}

export interface TutorialStep {
  title: string;
  detail: string;
  equation?: string;
}

export interface TutorialItem {
  id: string;
  title: string;
  topic: 'Orbital Mechanics' | 'Planetary Atmospheres' | 'Optics & Telescopes' | 'Astrophotography';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationMinutes: number;
  summary: string;
  steps: TutorialStep[];
}

export interface BlogArticle {
  id: string;
  title: string;
  category: 'Planetary Science' | 'Observation Guides' | 'Mission Briefs' | 'Student Projects';
  publishedAt: string;
  readMinutes: number;
  author: string;
  authorRole: string;
  excerpt: string;
  featured?: boolean;
  sections: { heading: string; body: string }[];
  keyTakeaway: string;
}

export const TUITION_PLANS: TuitionPlan[] = [
  {
    id: 'audit',
    name: 'Explorer Audit',
    subtitle: 'Self-paced planetary curriculum & interactive labs',
    earlyBirdPrice: 79,
    standardPrice: 105,
    duration: 'Lifetime access',
    seatLimit: 'Open enrollment',
    features: [
      'All 8 planetary science deep-dive modules',
      'Orbital mechanics & spectroscopy interactive labs',
      'Recorded 4K observatory walkthrough briefings',
      'Downloadable ephemeris & observation charts',
    ],
  },
  {
    id: 'cohort',
    name: 'Early Bird Cohort',
    subtitle: 'Live instructor-led 8-week solar system cohort',
    earlyBirdPrice: 149,
    standardPrice: 199,
    duration: '8 weeks live',
    seatLimit: '24 seats per cohort',
    recommended: true,
    features: [
      'Everything in Explorer Audit plus live weekly seminars',
      'Weekly astronomer office hours & problem set reviews',
      'Guided planetary imaging & data reduction workshop',
      'Verified SpaceEdu Completion Certificate',
    ],
  },
  {
    id: 'mentorship',
    name: 'Observatory Mentorship',
    subtitle: 'Small-group research & remote telescope allocation',
    earlyBirdPrice: 299,
    standardPrice: 399,
    duration: '12 weeks + lab',
    seatLimit: '8 seats per cohort',
    features: [
      'Everything in Early Bird Cohort with 1-on-1 feedback',
      '4 hours of scheduled remote robotic telescope time',
      'Capstone exoplanet or planetary photometry paper review',
      'Priority admission to SpaceEdu Alumni Observatory Network',
    ],
  },
];

export const TUITION_FAQS: TuitionFaq[] = [
  {
    id: 'early-bird',
    question: 'How long does Early Bird tuition pricing remain open?',
    answer:
      'Early Bird pricing stays open for 7 days following each cohort launch announcement or until 70% of live cohort seats are claimed, saving 25% across all three plans.',
  },
  {
    id: 'equipment',
    question: 'Do I need my own telescope to complete the course?',
    answer:
      'No personal hardware is required. All visual observation labs include calibrated datasets from SpaceEdu partner observatories, and Observatory Mentorship includes dedicated remote telescope allocations.',
  },
  {
    id: 'refunds',
    question: 'What is the refund and cohort transfer policy?',
    answer:
      'You may transfer to a later cohort date or request a full tuition refund within the first 14 days of your cohort start date with zero administrative fees.',
  },
  {
    id: 'discounts',
    question: 'Are student or educator tuition discounts available?',
    answer:
      'Yes. Full-time high school and university students receive an additional 15% tuition reduction, and verified STEM educators receive 20% off any tier.',
  },
];

export const TUTORIALS: TutorialItem[] = [
  {
    id: 'kepler-transfers',
    title: 'Hohmann Transfer Orbits & Kepler’s Third Law',
    topic: 'Orbital Mechanics',
    difficulty: 'Intermediate',
    durationMinutes: 25,
    summary:
      'Compute minimum-energy transfer trajectories from Earth (1.00 AU) to Mars (1.52 AU) and Jupiter (5.20 AU) using semi-major axis geometry.',
    steps: [
      {
        title: 'Define the transfer ellipse',
        detail:
          'A Hohmann transfer tangent to both Earth’s orbit (r₁ = 1.00 AU) and Mars’s orbit (r₂ = 1.52 AU) has a semi-major axis equal to their average.',
        equation: 'a_transfer = (r₁ + r₂) / 2 = (1.00 + 1.52) / 2 = 1.26 AU',
      },
      {
        title: 'Apply Kepler’s Third Law',
        detail:
          'Since orbital period squared equals semi-major axis cubed in solar-centric AU and years, compute the full transfer ellipse period first.',
        equation: 'T_full = a_transfer^(3/2) = 1.26^(1.5) ≈ 1.414 years',
      },
      {
        title: 'Halve for one-way transit duration',
        detail:
          'A spacecraft travels from perihelion (Earth departure) to aphelion (Mars arrival) over exactly half of the transfer ellipse.',
        equation: 't_transit = T_full / 2 ≈ 0.707 years ≈ 258 days',
      },
      {
        title: 'Verify launch window phase angle',
        detail:
          'Mars moves roughly 0.524° per day. Multiply transit days by Mars’s angular velocity and subtract from 180° to find the required 44° lead angle.',
      },
    ],
  },
  {
    id: 'greenhouse-venus',
    title: 'Radiative Equilibrium & Runaway Greenhouse on Venus',
    topic: 'Planetary Atmospheres',
    difficulty: 'Beginner',
    durationMinutes: 18,
    summary:
      'Compare equilibrium blackbody temperatures with observed surface temperatures across Venus, Earth, and Mars to quantify atmospheric optical depth.',
    steps: [
      {
        title: 'Compute solar flux at planetary distance',
        detail:
          'Solar irradiance drops with the inverse square of distance. At Venus (0.72 AU), irradiance is nearly double Earth’s 1,361 W/m².',
        equation: 'S_venus = 1361 / (0.723)² ≈ 2,601 W/m²',
      },
      {
        title: 'Account for Bond albedo reflection',
        detail:
          'Venus’s bright sulfuric cloud decks reflect 76% of incoming sunlight (albedo A = 0.76), making its equilibrium temperature cooler than Earth’s.',
        equation: 'T_eq ≈ 227 K (-46 °C)',
      },
      {
        title: 'Measure the greenhouse offset',
        detail:
          'Despite high reflectivity, 92 bars of CO₂ trap infrared radiation across nearly every thermal band, raising surface temperature by +510 K to 737 K (+464 °C).',
      },
    ],
  },
  {
    id: 'escape-velocity-giants',
    title: 'Gravitational Wells & Atmospheric Retention',
    topic: 'Orbital Mechanics',
    difficulty: 'Intermediate',
    durationMinutes: 22,
    summary:
      'Calculate escape velocities and Jeans thermal escape thresholds to see why Jupiter retains primordial hydrogen while Mercury loses almost all gas.',
    steps: [
      {
        title: 'Evaluate planetary escape velocity',
        detail:
          'Escape velocity depends on the square root of mass divided by radius. Earth requires 11.19 km/s while Jupiter demands 59.5 km/s.',
        equation: 'v_esc = √(2GM / R) = 11.186 · √(M_earth / R_earth) km/s',
      },
      {
        title: 'Compare to gas thermal speeds',
        detail:
          'Light molecules like H₂ move at ~1.9 km/s on average at 300 K, with high-velocity Maxwell-Boltzmann tails exceeding 10 km/s.',
      },
      {
        title: 'Apply the 1/6 rule of thumb',
        detail:
          'A planet retains a gas species over 4.5 billion years only when v_esc exceeds roughly 6× the root-mean-square molecular speed.',
      },
    ],
  },
  {
    id: 'lucky-imaging-saturn',
    title: 'Lucky Imaging & Frame Stacking for Saturn’s Rings',
    topic: 'Astrophotography',
    difficulty: 'Advanced',
    durationMinutes: 30,
    summary:
      'Capture high-framerate SER planetary video streams, align atmospheric seeing distortion, and sharpen Cassini Division detail via wavelets.',
    steps: [
      {
        title: 'Match focal ratio to pixel pitch',
        detail:
          'For critical Nyquist sampling in planetary imaging, target an effective focal ratio roughly 5× your sensor’s pixel size in microns.',
        equation: 'f / D ≈ 5 × pixel_size(μm)',
      },
      {
        title: 'Capture high-speed 90-second video',
        detail:
          'Record 5,000–10,000 uncompressed frames before Saturn’s fast 10h 33m rotation blurs cloud belt detail.',
      },
      {
        title: 'Quality-sort and stack top 15%',
        detail:
          'Discard frames distorted by turbulent seeing cells and average the sharpest frames to boost signal-to-noise ratio by √N.',
      },
    ],
  },
  {
    id: 'collimation-optics',
    title: 'Ray Tracing & Collimating a Newtonian Reflector',
    topic: 'Optics & Telescopes',
    difficulty: 'Beginner',
    durationMinutes: 15,
    summary:
      'Align secondary and primary mirrors for diffraction-limited resolution of Jupiter’s Galilean moons and Mars polar ice caps.',
    steps: [
      {
        title: 'Center the secondary mirror under the focuser',
        detail:
          'Adjust the spider vanes and central hub until the secondary silhouette appears concentric inside a Cheshire sight tube.',
      },
      {
        title: 'Aim the secondary at the primary center spot',
        detail:
          'Use the three tilt screws on the secondary holder until the primary mirror’s center ring sits on the crosshairs.',
      },
      {
        title: 'Star-test at high magnification',
        detail:
          'Defocus Polaris slightly at 200× magnification and make quarter-turn primary adjustments until the Fresnel rings are symmetric.',
      },
    ],
  },
  {
    id: 'ice-giant-spectra',
    title: 'Methane Absorption Bands in Uranus & Neptune Spectra',
    topic: 'Planetary Atmospheres',
    difficulty: 'Advanced',
    durationMinutes: 24,
    summary:
      'Interpret near-infrared reflectance spectra to explain why Uranus looks pale cyan while Neptune displays deep cobalt-sapphire color.',
    steps: [
      {
        title: 'Identify red-light methane absorption',
        detail:
          'Gaseous CH₄ strongly absorbs wavelengths above 600 nm, stripping red and orange photons from reflected sunlight.',
      },
      {
        title: 'Contrast haze optical thickness',
        detail:
          'Uranus possesses a thicker photochemical aerosol haze layer that scatters white light back before deep methane absorption occurs.',
      },
      {
        title: 'Map high-altitude storm clouds',
        detail:
          'Neptune’s transient bright streaks are frozen methane-ice clouds sitting above the deeper absorption deck.',
      },
    ],
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'cassini-legacy-ice-plumes',
    title: 'Why Saturn’s Smallest Icy Moons Redefined Habitability Beyond the Frost Line',
    category: 'Planetary Science',
    publishedAt: 'Nov 12, 2026',
    readMinutes: 6,
    author: 'Dr. Elena Vance',
    authorRole: 'Director of Planetary Curriculum',
    excerpt:
      'How tidal flexing inside Enceladus and Europa sustains global saltwater oceans miles beneath protective icy crusts—and what upcoming probes will sample.',
    featured: true,
    sections: [
      {
        heading: 'Heating without sunlight',
        body: 'At 9.58 AU from the Sun, Saturn receives roughly 1% of the solar intensity that warms Earth. Yet Enceladus—just 504 km across—powers continuous geysers of water vapor, salts, and complex organics from fractures near its south pole. Orbital resonance with Dione stretches and squeezes Enceladus’s silicate core every 33 hours, converting orbital mechanics directly into geothermal heat.',
      },
      {
        heading: 'Measuring ocean chemistry from orbit',
        body: 'During Cassini’s final plume-diving flybys, mass spectrometers detected molecular hydrogen alongside silica nanoparticles formed only where hot water reacts with rock above 90 °C. That signature points directly to hydrothermal vents on the seafloor of an alien ocean.',
      },
      {
        heading: 'What students analyze in Cohort Week 6',
        body: 'In SpaceEdu’s Outer Worlds module, learners inspect real Cassini Ion and Neutral Mass Spectrometer spectra to identify methane, ammonia, and salt-grain signatures across successive plume altitudes.',
      },
    ],
    keyTakeaway:
      'Tidal resonance allows subsurface liquid oceans to thrive anywhere in the outer solar system, decoupling habitability from distance to the Sun.',
  },
  {
    id: 'mars-opposition-viewing-guide',
    title: 'Observing Mars at Opposition: Surface Albedo Features with a 6-Inch Telescope',
    category: 'Observation Guides',
    publishedAt: 'Nov 04, 2026',
    readMinutes: 5,
    author: 'Marcus Lindqvist',
    authorRole: 'Lead Observatory Instructor',
    excerpt:
      'Practical aperture, filter, and timing strategies for resolving Syrtis Major, Hellas Basin, and seasonal polar frost caps from urban backyards.',
    sections: [
      {
        heading: 'Why angular diameter matters',
        body: 'Mars swings dramatically from 3.5 arcseconds near conjunction to over 15–25 arcseconds during favorable oppositions. Planning observations within 30 days of opposition triples resolvable surface contrast.',
      },
      {
        heading: 'Choosing #21 Orange and #80A Blue filters',
        body: 'An orange #21 filter darkens basaltic maria like Syrtis Major against rusty iron-oxide deserts, while a #80A blue filter suppresses surface contrast to isolate high-altitude white water-ice clouds along the planetary limb.',
      },
    ],
    keyTakeaway:
      'Patience for brief moments of steady atmospheric seeing beats brute telescope aperture when resolving Martian surface features.',
  },
  {
    id: 'bepicolombo-mercury-braking',
    title: 'Gravity-Assist Choreography: How BepiColombo Sheds Orbital Energy to Reach Mercury',
    category: 'Mission Briefs',
    publishedAt: 'Oct 27, 2026',
    readMinutes: 7,
    author: 'Amina Patel',
    authorRole: 'Orbital Mechanics Fellow',
    excerpt:
      'Falling inward toward the Sun requires more delta-v than reaching Pluto. Explore the nine planetary flybys guiding ESA/JAXA into Mercury orbit.',
    sections: [
      {
        heading: 'The paradox of falling toward the Sun',
        body: 'Because Earth orbits the Sun at 29.78 km/s, a spacecraft leaving Earth already carries immense angular momentum. To drop into Mercury’s tight 0.39 AU orbit without accelerating uncontrollably past it, BepiColombo must continuously bleed orbital energy.',
      },
      {
        heading: 'Electric propulsion meets planetary slingshots',
        body: 'By combining solar-electric xenon thrusters with one Earth flyby, two Venus flybys, and six Mercury flybys, mission engineers cut propellant requirements by over 70% while mapping Mercury’s magnetosphere in transit.',
      },
    ],
    keyTakeaway:
      'Inner solar system missions are constrained by angular momentum removal rather than raw distance from Earth.',
  },
  {
    id: 'student-jupiter-rotation-project',
    title: 'Measuring Jupiter’s Differential Rotation Using Student Observatory Time-Lapses',
    category: 'Student Projects',
    publishedAt: 'Oct 18, 2026',
    readMinutes: 4,
    author: 'Cohort 14 Research Group',
    authorRole: 'Observatory Mentorship Alumni',
    excerpt:
      'Four SpaceEdu students tracked cloud-belt longitude shifts over three nights to measure Jupiter’s System I equatorial wind shear.',
    sections: [
      {
        heading: 'Tracking System I vs System II longitudes',
        body: 'Because Jupiter is fluid rather than solid, its equatorial zone spins roughly five minutes faster per rotation than its temperate belts. By timing central-meridian transits of bright festoons and dark barges, students measured a 98 m/s relative jet stream.',
      },
      {
        heading: 'Reproducible open telemetry',
        body: 'All raw FITS calibration frames and WinJUPOS measurement logs from the student cohort are available inside Tutorial Lab 4 for current enrollees.',
      },
    ],
    keyTakeaway:
      'Even modest 8-inch telescopes produce repeatable planetary atmospheric dynamics measurements within a single weekend.',
  },
];
