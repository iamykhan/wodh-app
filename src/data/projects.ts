// Curated Portfolio Projects Data
// Based on Google Sheet: https://docs.google.com/spreadsheets/d/18qj9dYq69R7xH7Rk27ADkU6LTbNd2iIC9SRzf0YtsXQ

export type ProjectCategory = "XR" | "Game" | "3D";

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  subcategory: string;
  year: string;
  
  // Media
  thumbnailUrl: string;
  youtubeId?: string;
  wistiaId?: string;
  driveVideoId?: string;
  videoUrl?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  websiteUrl?: string;
  
  // Content
  tagline: string;
  description: string;
  features: string[];
  
  // Tech
  engine: string;
  platforms: string[];
  technologies: string[];
  
  // Meta
  featured?: boolean;
  caseStudy?: boolean;
}

// Helper to extract YouTube thumbnail
export const getYouTubeThumbnail = (youtubeId: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq') => {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault',
    mq: 'mqdefault', 
    sd: 'sddefault',
    maxres: 'maxresdefault'
  };
  return `https://img.youtube.com/vi/${youtubeId}/${qualityMap[quality]}.jpg`;
};

// ============================================================================
// XR PROJECTS (AR/VR/MR) - 16 Projects
// ============================================================================

export const XR_PROJECTS: Project[] = [
  {
    id: "trace3d",
    slug: "trace3d-city-portal",
    title: "TraceAR City Portal",
    client: "Trace3D",
    category: "XR",
    subcategory: "City-Scale AR",
    year: "2025",
    thumbnailUrl: "/images/thumbnails/trace3d-city-portal.jpg",
    videoUrl: "/videos/trace3d-hero.mp4",
    websiteUrl: "https://www.trace3d.app/",
    tagline: "City-scale AR layered calmly onto real streets.",
    description: "TraceAR City Portal is a groundbreaking persistent XR framework that transforms how people navigate and experience urban environments. Using advanced spatial computing, the platform overlays digital information onto physical streets, buildings, and landmarks—creating an invisible layer of interactive content accessible through smartphones and AR glasses. The system enables retailers to create virtual storefronts, tourism boards to offer immersive historical tours, and city planners to visualize future developments. Unlike traditional AR apps, TraceAR uses cloud-based persistent anchors that remain fixed in space, allowing thousands of users to interact with the same digital content simultaneously. The framework supports multi-user collaboration, real-time content updates, and seamless integration with existing city infrastructure including transit systems, emergency services, and commercial directories.",
    features: [
      "Persistent cloud anchors that maintain position across sessions and devices",
      "City-scale GPS-enhanced AR mapping with centimeter-level accuracy",
      "Multi-user collaboration allowing shared AR experiences in real-time",
      "Integration with retail POS systems for AR-enabled shopping",
      "Historical overlay mode showing buildings and streets through time",
      "Navigation system with AR waypoints and accessibility features"
    ],
    engine: "Unity · ARKit · ARCore",
    platforms: ["iOS", "Android", "On-site Kiosks"],
    technologies: ["Unity", "ARKit", "ARCore", "Cloud Anchors", "GPS", "Azure Spatial Anchors", "REST APIs"],
    featured: true,
    caseStudy: true
  },
  {
    id: "haki-scaffolding",
    slug: "haki-scaffolding-vr",
    title: "HAKI Scaffolding VR",
    client: "HAKI",
    category: "XR",
    subcategory: "Industrial Training",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/haki-scaffolding-vr.jpg",
    youtubeId: "_Wz9zB2GO4o",
    websiteUrl: "https://www.haki.com/",
    tagline: "VR safety training for industrial scaffolding systems.",
    description: "HAKI Scaffolding VR is an enterprise-grade virtual reality training platform developed in partnership with HAKI, a global leader in modular scaffolding systems used in construction, industrial maintenance, and event staging. The application addresses a critical industry challenge: training workers on complex scaffolding assembly procedures without the risks and costs of real-world training scenarios. Trainees don VR headsets and enter photorealistic construction environments where they learn to identify HAKI components, understand load-bearing specifications, and practice proper assembly sequences. The simulation includes realistic physics, allowing trainees to experience the consequences of improper assembly in a safe environment. Progress is tracked through a comprehensive analytics dashboard, and successful completion leads to digital certification recognized by HAKI's global network of contractors and safety inspectors.",
    features: [
      "Step-by-step interactive assembly tutorials with 3D component recognition",
      "Physics-based simulation showing structural failure from improper assembly",
      "Multi-scenario training including high-rise, industrial, and event staging",
      "Real-time instructor monitoring and intervention capabilities",
      "Compliance tracking with OSHA and EU safety regulation standards",
      "Digital certification system integrated with HAKI's contractor database"
    ],
    engine: "Unity · XR Toolkit",
    platforms: ["Quest", "PC VR"],
    technologies: ["Unity", "XR Interaction Toolkit", "VR Training SDK", "Learning Management System"],
    featured: true,
    caseStudy: true
  },
  {
    id: "point-cloud-mesh",
    slug: "point-cloud-mesh-generation",
    title: "Point Cloud Mesh Generation",
    client: "Hongyu Zhang (MonoPoly)",
    category: "XR",
    subcategory: "LiDAR Technology",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/point-cloud-mesh-generation.jpg",
    youtubeId: "xcvcpT9RGLg",
    tagline: "Real-time LiDAR mesh generation for spatial computing.",
    description: "Point Cloud Mesh Generation is a cutting-edge spatial computing solution that transforms raw LiDAR sensor data into optimized, textured 3D meshes in real-time. Developed for MonoPoly's advanced scanning platform, this technology bridges the gap between point cloud capture and usable 3D content. The system processes millions of points per second from iPhone Pro LiDAR sensors, industrial scanners, or drone-mounted systems, applying advanced algorithms including surface reconstruction, noise filtering, and texture projection. The resulting meshes are automatically optimized for their target platform—whether high-fidelity visualization for architects, game-ready assets for developers, or lightweight models for AR applications. The technology has applications spanning architecture, construction inspection, historical preservation, and crime scene documentation.",
    features: [
      "Real-time Poisson surface reconstruction processing 10M+ points per second",
      "Multi-source LiDAR support including iPhone, Leica, and FARO scanners",
      "Automatic LOD generation for web, mobile, and desktop platforms",
      "Texture baking from captured photographs onto generated meshes",
      "Noise reduction and outlier filtering using machine learning",
      "Export to FBX, OBJ, glTF, and native CAD formats"
    ],
    engine: "Unity",
    platforms: ["iOS", "Android", "PC"],
    technologies: ["Unity", "C#", "LiDAR SDK", "Point Cloud Library", "Compute Shaders", "ML.NET"],
    featured: true,
    caseStudy: true
  },
  {
    id: "topdown-vr",
    slug: "topdown-vr",
    title: "TopDown VR",
    client: "Studio Project",
    category: "XR",
    subcategory: "VR Experience",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/topdown-vr.jpg",
    youtubeId: "Y7gWknLKHtQ",
    tagline: "Immersive top-down VR perspective gameplay.",
    description: "TopDown VR reimagines the strategy game genre by placing players physically inside a god-game perspective. Instead of viewing a flat screen, players stand above a living diorama world, reaching down to interact with units, terrain, and structures using their hands. The experience combines the strategic depth of games like Populous and Black & White with the physical presence of virtual reality. Players can lean in to examine individual units, use hand gestures to cast abilities, and physically walk around their domain to survey their kingdom from different angles. The game features a campaign mode where players guide a civilization from primitive tribes to a space-faring empire, plus procedurally generated sandbox scenarios. Special attention was given to comfort—the world floats at table height, eliminating the disorientation common in VR strategy games.",
    features: [
      "Physical god-game interaction using hand tracking and controllers",
      "Procedurally generated worlds with dynamic weather and seasons",
      "Civilization progression from stone age to space exploration",
      "Gesture-based ability system for divine interventions",
      "Asynchronous multiplayer with world invasion mechanics",
      "Accessibility options including seated play and comfort vignettes"
    ],
    engine: "Unity",
    platforms: ["Quest", "PC VR"],
    technologies: ["Unity", "Oculus SDK", "XR Interaction Toolkit", "Procedural Generation"],
    featured: true,
    caseStudy: true
  },
  {
    id: "webgl-rocket-simulation",
    slug: "webgl-rocket-simulation",
    title: "WebGL Rocket Simulation",
    client: "Educational Client",
    category: "XR",
    subcategory: "Web Simulation",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/webgl-rocket-simulation.jpg",
    youtubeId: "dyxwko0wojs",
    tagline: "Physics-accurate rocket simulation in the browser.",
    description: "WebGL Rocket Simulation is an educational physics platform that teaches orbital mechanics, rocket propulsion, and space mission planning through interactive browser-based simulations. Built entirely in WebGL for universal accessibility, the application allows students and space enthusiasts to design rockets, plan trajectories, and execute missions to the Moon, Mars, and beyond. The simulation uses real gravitational data from NASA's SPICE toolkit, accurate atmospheric models, and realistic propulsion physics. Users can experiment with different engine types, fuel mixtures, and staging configurations while observing the direct impact on delta-v budgets and mission feasibility. An instructor mode allows teachers to create custom scenarios and track student progress. The platform has been adopted by several universities and space education programs worldwide.",
    features: [
      "N-body gravitational simulation with real planetary ephemeris data",
      "Rocket designer with customizable stages, engines, and fuel types",
      "Mission planner with Hohmann transfers, gravity assists, and aerobraking",
      "Real-time trajectory visualization with orbital mechanics overlays",
      "Historical mission recreation including Apollo, Voyager, and Mars rovers",
      "Classroom mode with assignment creation and progress tracking"
    ],
    engine: "WebGL / Three.js",
    platforms: ["Web Browser"],
    technologies: ["Three.js", "WebGL", "JavaScript", "Physics Engine", "NASA SPICE"],
    featured: false,
    caseStudy: false
  },
  {
    id: "zombie-game-vr",
    slug: "zombie-game-vr",
    title: "Zombie Game VR",
    client: "Gaming Studio",
    category: "XR",
    subcategory: "VR Shooter",
    year: "2023",
    thumbnailUrl: "/images/thumbnails/zombie-game-vr.jpg",
    youtubeId: "tY3W3MMVRmI",
    tagline: "Survive the undead apocalypse in immersive VR.",
    description: "Zombie Game VR delivers heart-pounding survival horror that leverages virtual reality's unique ability to create genuine fear and tension. Set in a post-apocalyptic world overrun by the undead, players must scavenge for weapons, fortify positions, and survive increasingly intense waves of zombies. The game features realistic weapon handling—players must physically reload magazines, rack slides, and manage limited ammunition. The zombie AI creates varied threats: shambling hordes that overwhelm through numbers, fast-moving infected that require quick reflexes, and special mutated types with unique attack patterns. Environmental storytelling reveals the fate of survivors through found notes, audio logs, and scene composition. The haptic feedback system delivers visceral impacts through compatible controllers, making every shotgun blast and melee strike feel substantial. Co-op multiplayer allows teams of four to tackle special survival scenarios.",
    features: [
      "Realistic weapon handling with manual reloading and jam mechanics",
      "Dynamic zombie AI with varied types and emergent swarm behavior",
      "Environmental crafting system for barricades and traps",
      "Procedurally generated safe houses with persistent upgrades",
      "4-player co-op with specialized survivor classes",
      "Haptic feedback integration for immersive combat feel"
    ],
    engine: "Unity",
    platforms: ["Quest", "PC VR", "PSVR"],
    technologies: ["Unity", "XR Toolkit", "Haptic Feedback", "Photon Networking"],
    featured: true,
    caseStudy: true
  },
  {
    id: "vr-physical-keyboard",
    slug: "vr-physical-keyboard",
    title: "VR Physical Keyboard",
    client: "Productivity Tools",
    category: "XR",
    subcategory: "VR Utility",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/vr-physical-keyboard.jpg",
    youtubeId: "K936m1ITyuw",
    tagline: "Type naturally in VR with physical keyboard tracking.",
    description: "VR Physical Keyboard solves one of virtual reality's most persistent productivity challenges: efficient text input while immersed. Using the Quest 3's passthrough cameras and hand tracking, the application creates a seamless bridge between physical and virtual workspaces. Place your real keyboard on your desk, and the system automatically detects it, overlaying a perfectly aligned virtual representation in your VR environment. As you type, you see your real hands interacting with both the physical keyboard and virtual UI elements. The system supports multiple keyboard layouts, profiles for different work scenarios, and integration with popular VR productivity apps. Beyond basic typing, the application provides gesture shortcuts for common operations, customizable virtual monitors, and a focus mode that dims the real world while highlighting your keyboard and immediate workspace.",
    features: [
      "Automatic keyboard detection using computer vision and edge mapping",
      "Multi-layout support for QWERTY, AZERTY, Dvorak, and international keyboards",
      "Hand tracking overlay showing accurate finger positions",
      "Integration with Immersed, Virtual Desktop, and native Quest apps",
      "Gesture shortcuts for copy, paste, window management, and app switching",
      "Customizable passthrough opacity for varying focus levels"
    ],
    engine: "Unity",
    platforms: ["Quest 3", "Quest Pro"],
    technologies: ["Unity", "Passthrough API", "Hand Tracking", "Computer Vision"],
    featured: false,
    caseStudy: false
  },
  {
    id: "vr-fall-guys",
    slug: "vr-fall-guys",
    title: "VR Fall Guys",
    client: "Party Games Studio",
    category: "XR",
    subcategory: "VR Party Game",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/vr-fall-guys.jpg",
    youtubeId: "xull9N6u7Uk",
    tagline: "Chaotic party game action in immersive VR.",
    description: "VR Fall Guys brings the chaotic joy of physics-based party games into virtual reality, where players experience the mayhem from a first-person perspective. Compete against up to 60 players in a gauntlet of obstacle courses, mini-games, and survival challenges where only the most persistent bean survives. The VR adaptation transforms the experience—diving through spinning obstacles, grabbing onto ledges, and pushing opponents feels viscerally different when your body is the controller. The game features full-body IK allowing players to see their character's arms and legs responding to movement. Custom VR-specific rounds take advantage of the medium, including challenges where players must physically duck, grab floating objects, or navigate courses that would cause simulation sickness on a flat screen but feel natural in VR. Party mode supports local mixed reality spectating, letting non-VR players watch and interact with the action.",
    features: [
      "60-player battle royale with elimination rounds and finals",
      "Physics-based character with full-body IK and ragdoll system",
      "VR-exclusive obstacle courses designed for physical movement",
      "Customizable bean character with unlockable skins and animations",
      "Mixed reality spectator mode for local party play",
      "Comfort options including snap turning and motion vignettes"
    ],
    engine: "Unity",
    platforms: ["Quest", "PC VR"],
    technologies: ["Unity", "Photon Networking", "Physics System", "Full-Body IK"],
    featured: true,
    caseStudy: true
  },
  {
    id: "osr-star-finder",
    slug: "osr-star-finder",
    title: "OSR Star Finder",
    client: "Online Star Registry",
    category: "XR",
    subcategory: "AR Application",
    year: "2023",
    thumbnailUrl: "/images/thumbnails/osr-star-finder.jpg",
    youtubeId: "PoWnvbYCsKQ",
    tagline: "Find your registered star in the night sky with AR.",
    description: "OSR Star Finder transforms the romantic gesture of naming a star into a tangible, interactive experience. Developed for the Online Star Registry, this augmented reality application helps users locate their personally registered star in the night sky. Point your smartphone or tablet at the heavens, and the app overlays constellation lines, star names, and celestial navigation guides. When you approach your registered star's location, the app celebrates with custom animations and displays the personal message attached to the registration. Beyond star finding, the app serves as a comprehensive stargazing companion with mythology guides, astronomical facts, and upcoming celestial events. The database syncs with OSR's registry of millions of named stars, ensuring every customer can find their star regardless of when it was registered. Time-lapse mode shows how the night sky changes throughout the year, helping users plan optimal viewing times.",
    features: [
      "AR star tracking with gyroscope and GPS-enhanced positioning",
      "Complete constellation guide with mythology and astronomical data",
      "Personal star registry lookup with custom message display",
      "Celestial event calendar including meteor showers and eclipses",
      "Red light mode preserving night vision during stargazing",
      "Time-lapse visualization showing seasonal sky changes"
    ],
    engine: "Unity",
    platforms: ["iOS", "Android"],
    technologies: ["Unity", "ARKit", "ARCore", "Star Database API", "Celestial Calculations"],
    featured: false,
    caseStudy: false
  },
  {
    id: "avasci",
    slug: "avasci",
    title: "AvaSci",
    client: "AvaSci Technologies",
    category: "XR",
    subcategory: "Avatar Technology",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/avasci.jpg",
    youtubeId: "--Q8dnqMXy4",
    websiteUrl: "https://avasci.com",
    tagline: "Advanced avatar science for immersive experiences.",
    description: "AvaSci represents the cutting edge of digital human technology, providing a complete platform for creating, animating, and deploying realistic avatars across XR applications. The system combines AI-driven face capture, professional-grade motion capture integration, and real-time rendering to produce avatars that cross the uncanny valley. Users can create avatars from a single photograph using proprietary neural networks trained on diverse facial datasets, or use detailed scanning pipelines for maximum fidelity. The animation system supports real-time lip sync, emotion detection, and full-body tracking from various input sources including webcams, VR controllers, and professional mocap suits. AvaSci's cross-platform SDK enables developers to integrate these avatars into applications spanning social VR, virtual production, telehealth, and customer service. Enterprise clients use AvaSci for virtual presenters, AI assistants, and digital twins of real people.",
    features: [
      "AI photo-to-avatar generation with photorealistic quality",
      "Real-time face capture supporting webcam and iPhone TrueDepth",
      "Motion capture integration with Vicon, OptiTrack, and Rokoko",
      "Emotion recognition and automatic expression animation",
      "Cross-platform SDK for Unity, Unreal, and web deployment",
      "Enterprise admin console for avatar fleet management"
    ],
    engine: "Unity / Unreal",
    platforms: ["iOS", "Android", "Quest", "PC"],
    technologies: ["Unity", "Unreal", "Motion Capture", "AI", "Neural Networks", "TensorFlow"],
    featured: true,
    caseStudy: true
  },
  {
    id: "product-simulation",
    slug: "product-simulation",
    title: "Product Simulation",
    client: "Enterprise Client",
    category: "XR",
    subcategory: "Product Visualization",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/product-simulation.jpg",
    wistiaId: "cxh8gmitbw",
    tagline: "Interactive 3D product configuration and visualization.",
    description: "Product Simulation is an enterprise configurator platform that revolutionizes how businesses sell complex, customizable products. From luxury automobiles to industrial machinery, the platform enables customers to configure products in real-time 3D with photorealistic rendering that matches physical samples. The system integrates with manufacturing databases to ensure every configuration is buildable and accurately priced. Customers can explore products in their actual environment using AR, seeing how a configured piece of furniture looks in their living room or how industrial equipment fits their factory floor. Sales teams use the platform for live presentations, walking clients through options while the system automatically generates quotes, lead times, and technical specifications. The platform has processed billions in configured sales across automotive, furniture, industrial equipment, and consumer electronics verticals.",
    features: [
      "Real-time ray-traced rendering matching physical material samples",
      "Manufacturing rules engine ensuring valid configurations only",
      "AR placement mode with room-scale occlusion and lighting",
      "Automatic quote generation with ERP and CRM integration",
      "Multi-user presentation mode for remote sales meetings",
      "Analytics dashboard tracking popular configurations and drop-off points"
    ],
    engine: "Unity",
    platforms: ["Web", "iOS", "Android"],
    technologies: ["Unity", "WebGL", "REST API", "AR Foundation", "Ray Tracing"],
    featured: false,
    caseStudy: false
  },
  {
    id: "vr-rcc",
    slug: "vr-rcc",
    title: "VR RCC",
    client: "Racing Studio",
    category: "XR",
    subcategory: "VR Racing",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/vr-rcc.jpg",
    videoUrl: "/videos/vr-rcc.mp4",
    tagline: "Realistic car controller experience in VR.",
    description: "VR RCC delivers the most authentic virtual reality driving experience by combining the award-winning Realistic Car Controller physics system with purpose-built VR cockpit interaction. Every vehicle in the game features a fully interactive interior—reach out to adjust mirrors, flip switches, and grip the steering wheel with tracked hands. The physics simulation models tire deformation, suspension travel, and weight transfer with precision that satisfies both casual players and sim racing enthusiasts. The game includes a career mode spanning street racing, circuit competitions, and drift championships, plus a sandbox mode where players can explore vast open-world environments. A powerful track editor enables community-created content, while the tuning garage lets players modify every aspect of their vehicles from engine components to suspension geometry. Support for racing wheels and motion platforms creates the ultimate home sim rig experience.",
    features: [
      "Authentic vehicle physics with tire simulation and weight transfer",
      "Fully interactive VR cockpits with grabbable controls and switches",
      "Career mode spanning multiple racing disciplines",
      "Track editor with community sharing and ratings",
      "Deep tuning system affecting handling characteristics",
      "Racing wheel and motion platform support"
    ],
    engine: "Unity",
    platforms: ["Quest", "PC VR"],
    technologies: ["Unity", "RCC Pro", "VR Interaction", "Racing Wheel SDK"],
    featured: true,
    caseStudy: true
  },
  {
    id: "hospital-vr-simulation",
    slug: "hospital-vr-simulation",
    title: "Hospital VR Simulation",
    client: "Healthcare Training",
    category: "XR",
    subcategory: "Medical Training",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/hospital-vr-simulation.jpg",
    youtubeId: "GuuxVhrrtgo",
    tagline: "Medical training simulation in immersive VR.",
    description: "Hospital VR Simulation provides comprehensive medical training in a risk-free virtual environment that replicates real hospital conditions with extraordinary fidelity. Developed with input from practicing physicians, nurses, and medical educators, the platform covers scenarios ranging from routine patient care to high-pressure emergency response. Trainees practice procedures on AI patients that respond realistically to interventions—vital signs change, symptoms progress, and patients communicate their discomfort. The simulation tracks every action for later review, generating detailed performance reports that identify areas for improvement. Multiplayer scenarios enable team-based training for trauma response, surgical assistance, and shift handoffs. The platform meets accreditation requirements for continuing medical education credits and integrates with hospital learning management systems. Custom scenario editors allow institutions to recreate specific cases for grand rounds and incident reviews.",
    features: [
      "Photorealistic hospital environment with accurate equipment placement",
      "AI patients with dynamic vital signs and realistic responses",
      "Procedure simulations for IV insertion, intubation, and wound care",
      "Team training scenarios for code response and surgical procedures",
      "Detailed analytics with CME credit tracking and compliance reporting",
      "Custom scenario editor for case-specific training"
    ],
    engine: "Unity",
    platforms: ["Quest", "PC VR"],
    technologies: ["Unity", "Medical Sim SDK", "AI NPCs", "Learning Management Integration"],
    featured: true,
    caseStudy: true
  },
  {
    id: "ar-measuring-tape",
    slug: "ar-measuring-tape",
    title: "AR Measuring Tape",
    client: "Utility App",
    category: "XR",
    subcategory: "AR Utility",
    year: "2023",
    thumbnailUrl: "/images/thumbnails/ar-measuring-tape.jpg",
    youtubeId: "SFrUy4Ji0Lo",
    tagline: "Measure anything in the real world using AR.",
    description: "AR Measuring Tape transforms any smartphone into a precision measuring instrument, using augmented reality and device sensors to measure distances, areas, and volumes in the real world. The app goes far beyond simple point-to-point measurements—users can measure the dimensions of furniture, calculate wall areas for painting estimates, determine room volumes for HVAC planning, and even measure objects that would be difficult to access with a physical tape. On LiDAR-equipped devices, accuracy approaches professional laser measurers. The app saves measurements with photographs, making it ideal for contractors documenting job sites, real estate professionals creating floor plans, and homeowners planning renovations. Measurements export to PDF reports, CAD files, and popular home design applications. A unique collaborative mode lets remote experts guide on-site workers through measurements using shared AR sessions.",
    features: [
      "Multi-point measurements for complex shapes and room layouts",
      "LiDAR enhancement achieving ±1cm accuracy on supported devices",
      "Area and volume calculations with material estimation",
      "Photo documentation with embedded measurement overlays",
      "Export to PDF, DXF, and home design applications",
      "Remote collaboration with shared AR measurement sessions"
    ],
    engine: "Unity",
    platforms: ["iOS", "Android"],
    technologies: ["Unity", "ARKit", "ARCore", "LiDAR", "CAD Export"],
    featured: false,
    caseStudy: false
  },
  {
    id: "ar-museum-game",
    slug: "ar-museum-game",
    title: "AR Museum Game",
    client: "Cultural Heritage",
    category: "XR",
    subcategory: "AR Experience",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/ar-museum-game.jpg",
    youtubeId: "slHWmMkqahw",
    tagline: "Bring museum exhibits to life with AR gamification.",
    description: "AR Museum Game transforms traditional museum visits into interactive adventures that engage visitors of all ages. Point your device at exhibits to trigger augmented reality experiences—watch historical figures step out of paintings to tell their stories, see ancient artifacts reassemble from fragments, or witness extinct creatures roam through dioramas. The app gamifies exploration through collection mechanics, puzzle-solving, and achievement systems that encourage thorough exploration. Children follow character guides through age-appropriate narratives, while adults access deeper historical content and scholarly perspectives. Museums customize the experience through a content management system, creating seasonal events, temporary exhibition tie-ins, and membership-exclusive content. Analytics help curators understand visitor engagement patterns, identifying popular exhibits and areas needing improved interpretation. The platform has been deployed in natural history museums, art galleries, historic sites, and science centers worldwide.",
    features: [
      "Image recognition triggering AR experiences on exhibits",
      "Character-guided tours with age-appropriate narrative paths",
      "Collection system encouraging exploration of all galleries",
      "Puzzle mechanics revealing hidden stories and connections",
      "Museum CMS for content creation without developer involvement",
      "Visitor analytics dashboard tracking engagement patterns"
    ],
    engine: "Unity",
    platforms: ["iOS", "Android"],
    technologies: ["Unity", "Vuforia", "AR Foundation", "CMS Integration"],
    featured: true,
    caseStudy: true
  },
  {
    id: "kinect-runner",
    slug: "kinect-runner",
    title: "Kinect Runner",
    client: "Fitness Gaming",
    category: "XR",
    subcategory: "Motion Gaming",
    year: "2023",
    thumbnailUrl: "/images/thumbnails/kinect-runner.jpg",
    youtubeId: "kLL-it-7ho0",
    tagline: "Full-body motion gaming with Kinect tracking.",
    description: "Kinect Runner delivers exergaming that turns exercise into entertainment through full-body motion tracking. Players physically run in place, jump, duck, and dodge through endless procedurally generated environments—the faster you move, the faster your in-game character runs. The Kinect sensor captures full skeletal tracking, ensuring movements must be performed correctly to count. This transforms the experience from simple motion detection into genuine physical activity that builds cardiovascular fitness and coordination. Workout modes include interval training with programmed intensity changes, endurance challenges with distance goals, and competitive races against friends or global leaderboards. The calorie tracking system uses metabolic calculations based on detected movement intensity. Gamification elements including unlockable characters, environments, and achievements provide long-term motivation. Physical therapists have adopted the platform for rehabilitation programs, appreciating the adjustable difficulty and detailed movement logging.",
    features: [
      "Full skeletal tracking requiring proper movement execution",
      "Procedurally generated levels ensuring endless variety",
      "Workout programs with interval training and endurance modes",
      "Accurate calorie tracking using metabolic calculations",
      "Global leaderboards and friend challenges",
      "Rehabilitation mode with adjustable difficulty and therapist reports"
    ],
    engine: "Unity",
    platforms: ["PC", "Xbox"],
    technologies: ["Unity", "Kinect SDK", "Motion Tracking", "Fitness Analytics"],
    featured: false,
    caseStudy: false
  }
];

// ============================================================================
// GAME PROJECTS - 17 Projects
// ============================================================================

export const GAME_PROJECTS: Project[] = [
  {
    id: "soul-of-king",
    slug: "soul-of-king",
    title: "Soul of King",
    client: "Tracy",
    category: "Game",
    subcategory: "MOBA",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/soul-of-king.jpg",
    youtubeId: "IwrKOx1Qz0E",
    websiteUrl: "https://www.soulofking.gg/",
    tagline: "Epic MOBA battles with strategic depth.",
    description: "Soul of King delivers intense 5v5 multiplayer online battle arena action with a roster of over 30 unique heroes drawn from mythology, history, and original lore. Each hero features distinct abilities, playstyles, and strategic roles—from aggressive assassins who dive enemy backlines to steadfast tanks who protect allies and control objectives. The game balances accessibility for newcomers with depth that rewards mastery, featuring a progressive ranking system that matches players of similar skill. Strategic elements include jungle objectives, tower sieges, and team fight coordination that require communication and planning. The spectator mode with live commentary support has fostered a growing esports community. Regular content updates introduce new heroes, skins, and seasonal events, while a fair free-to-play model ensures competitive integrity. Cross-platform play unites PC and mobile players in the same matches.",
    features: [
      "30+ heroes with unique abilities and strategic roles",
      "5v5 team battles with objectives, towers, and jungle camps",
      "Competitive ranked ladder with seasonal rewards",
      "Cross-platform play between PC and mobile",
      "Spectator mode with esports broadcasting features",
      "Regular content updates with new heroes and events"
    ],
    engine: "Unity",
    platforms: ["PC", "Mobile"],
    technologies: ["Unity", "Photon", "PlayFab", "Firebase", "Dedicated Servers"],
    featured: true,
    caseStudy: true
  },
  {
    id: "handpan-hero",
    slug: "handpan-hero",
    title: "Handpan Hero",
    client: "Masoud Abdi",
    category: "Game",
    subcategory: "Music Rhythm",
    year: "2023",
    thumbnailUrl: "/images/thumbnails/handpan-hero.jpg",
    youtubeId: "8R2L47gF_p0",
    tagline: "Master the handpan through rhythm-based gameplay.",
    description: "Handpan Hero bridges the gap between gaming and musical education, teaching players to play the ethereal handpan instrument through engaging rhythm-based gameplay. Developed in collaboration with professional handpan musician Masoud Abdi, the game features studio-quality recordings of authentic handpan sounds across multiple scales including D Minor, Celtic, and Hijaz. The progressive curriculum takes players from basic single-note patterns to complex polyrhythmic compositions. Visual feedback shows proper striking technique, while the scoring system rewards both timing accuracy and musical expression. The free play mode transforms any device into a virtual handpan, complete with physics-based sound modeling that responds to touch intensity. A social feature allows players to share their compositions and compete on global leaderboards. The game has become a gateway instrument for thousands who discovered their love of percussion through play.",
    features: [
      "Studio-quality handpan recordings across multiple scales",
      "Progressive curriculum from beginner to advanced compositions",
      "Visual guides demonstrating proper striking technique",
      "Free play mode with physics-based touch response",
      "Composition creator and community sharing features",
      "Global leaderboards and daily challenge modes"
    ],
    engine: "Unity",
    platforms: ["Android", "iOS", "PC"],
    technologies: ["Unity", "C#", "FMOD", "Custom Audio Engine"],
    featured: true,
    caseStudy: true
  },
  {
    id: "star-fox-rework",
    slug: "star-fox-rework",
    title: "Star Fox Rework",
    client: "Fan Project",
    category: "Game",
    subcategory: "Space Shooter",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/star-fox-rework.jpg",
    youtubeId: "JDI-TXvbt5M",
    tagline: "Classic space combat reimagined with modern graphics.",
    description: "Star Fox Rework is a loving tribute to the classic rail shooter that defined a generation, rebuilt from the ground up with modern rendering technology while preserving the precise gameplay that made the original legendary. Players pilot the iconic Arwing through reimagined versions of classic levels—Corneria's war-torn cities, Meteo's asteroid fields, and the fortress of Venom—all rendered with contemporary lighting, particle effects, and detailed environments. The controls have been refined for modern sensibilities while maintaining the tight, responsive feel that speedrunners demand. New content includes additional branching paths, unlockable ships with unique characteristics, and a challenge mode with time attack and score chase variants. The project demonstrates how classic game design principles remain compelling when given visual polish, serving as both homage and evolution of the original vision.",
    features: [
      "Faithful recreation of classic levels with modern graphics",
      "Refined controls maintaining original precision",
      "New branching paths and secret areas to discover",
      "Unlockable ships with unique handling characteristics",
      "Challenge mode with time attack and score chase variants",
      "Performance modes for 60fps and 120fps gameplay"
    ],
    engine: "Unity",
    platforms: ["PC"],
    technologies: ["Unity", "C#", "Shader Graph", "HDRP"],
    featured: false,
    caseStudy: false
  },
  {
    id: "electric-mods",
    slug: "electric-mods",
    title: "Electric Mods",
    client: "Racing Studio",
    category: "Game",
    subcategory: "Racing",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/electric-mods.jpg",
    youtubeId: "PvEHxBJ02YA",
    tagline: "Electric vehicle racing with extensive customization.",
    description: "Electric Mods puts players in the driver's seat of the electric vehicle revolution, featuring a garage of performance EVs from hypercars to converted classics. The game's deep customization system lets players modify battery configurations, motor placements, and regenerative braking systems—changes that directly affect vehicle handling, acceleration curves, and range management during races. Strategic racing emerges from energy management: push hard and risk running dry, or conserve power for a final sprint. Visual customization ranges from paint and decals to aerodynamic components and wheel designs. Career mode follows a journey from local street races to international championships, unlocking new vehicles, sponsors, and customization options. The online multiplayer includes traditional races, drift competitions, and drag strips optimized for EV launches. The game has partnered with real EV manufacturers to feature accurate vehicle models and performance specifications.",
    features: [
      "Deep EV customization affecting performance characteristics",
      "Energy management strategy during races",
      "Licensed vehicles from major EV manufacturers",
      "Career mode from street racing to championships",
      "Multiple race modes including drift and drag",
      "Online multiplayer with ranked competitions"
    ],
    engine: "Unity",
    platforms: ["PC", "Console"],
    technologies: ["Unity", "RCC Pro", "Networking", "Realistic Physics"],
    featured: false,
    caseStudy: false
  },
  {
    id: "beam-ng-destruction",
    slug: "beam-ng-destruction-system",
    title: "BeamNG Destruction System",
    client: "Physics Simulation",
    category: "Game",
    subcategory: "Physics Simulation",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/beam-ng-destruction-system.jpg",
    youtubeId: "WQxectnaq0M",
    tagline: "Soft-body vehicle destruction physics system.",
    description: "BeamNG Destruction System brings next-generation soft-body vehicle physics to Unity, enabling developers to create driving experiences with realistic damage modeling. Unlike rigid body physics that treat vehicles as indestructible shells, this system models each vehicle as a mesh of interconnected nodes that deform, crumple, and tear under impact forces. Collisions result in accurate damage patterns—frontal impacts crumple hoods and push engines backward, side impacts deform doors and pillars, rollovers crush roofs asymmetrically. The deformation affects vehicle handling: bent suspension components alter wheel alignment, damaged engines reduce power, and structural damage changes weight distribution. The system is optimized for real-time performance, using GPU compute shaders to calculate thousands of node interactions at 60fps. Developers can integrate the physics system into racing games, crash test simulators, or destruction sandbox experiences. Comprehensive documentation and sample projects accelerate integration.",
    features: [
      "Soft-body physics with thousands of interconnected nodes",
      "Realistic crumple zones and damage propagation",
      "Deformation affecting vehicle handling and performance",
      "GPU-accelerated calculations for real-time performance",
      "Integration-ready SDK with documentation and samples",
      "Customizable material properties for different vehicle types"
    ],
    engine: "Unity",
    platforms: ["PC"],
    technologies: ["Unity", "Custom Physics Engine", "Mesh Deformation", "Compute Shaders"],
    featured: true,
    caseStudy: true
  },
  {
    id: "multiplayer-shooting",
    slug: "multiplayer-shooting",
    title: "Multiplayer Shooting",
    client: "FPS Studio",
    category: "Game",
    subcategory: "FPS Multiplayer",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/multiplayer-shooting.jpg",
    youtubeId: "SEyN9bgtLu4",
    tagline: "Competitive multiplayer FPS action.",
    description: "Multiplayer Shooting delivers fast-paced competitive first-person shooter action optimized for both PC and mobile platforms. The game features precise gunplay with realistic ballistics, recoil patterns learnable through practice, and weapon handling that rewards skill development. Multiple game modes cater to different playstyles: Team Deathmatch for pure combat, Search and Destroy for tactical teamwork, Domination for objective control, and Free-for-All for lone wolves. An extensive arsenal spans pistols, SMGs, assault rifles, shotguns, and sniper rifles, each with unique characteristics and upgrade paths. The progression system unlocks attachments, skins, and perks without creating pay-to-win imbalances. Ranked matchmaking uses skill-based algorithms to create fair matches, while casual playlists welcome players of all abilities. The anti-cheat system combines server-side validation with machine learning detection to maintain competitive integrity across millions of daily matches.",
    features: [
      "Precise gunplay with learnable recoil patterns",
      "Multiple game modes for varied playstyles",
      "Extensive weapon arsenal with upgrade paths",
      "Skill-based matchmaking for fair competition",
      "Cross-platform play between PC and mobile",
      "Advanced anti-cheat protecting competitive integrity"
    ],
    engine: "Unity",
    platforms: ["PC", "Mobile"],
    technologies: ["Unity", "Photon", "FPS Kit", "Anti-Cheat SDK"],
    featured: true,
    caseStudy: true
  },
  {
    id: "project-racer",
    slug: "project-racer",
    title: "Project Racer",
    client: "Internal",
    category: "Game",
    subcategory: "Arcade Racing",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/project-racer.jpg",
    youtubeId: "TD-OLJihG90",
    tagline: "Competitive racing with tight, replayable sessions.",
    description: "Project Racer distills arcade racing to its purest form: tight controls, readable tracks, and competitive multiplayer that rewards both skill and consistency. The game's handling model strikes a careful balance—vehicles are responsive and predictable, with drifting that's intuitive to initiate but deep to master. Tracks are designed for flow, featuring banked curves, multiple racing lines, and shortcuts that reward exploration without breaking balance. The reactive environment responds to player actions: barriers shatter on impact, tire marks persist on pavement, and weather conditions dynamically affect grip levels. Career mode progresses through vehicle classes from compact hatchbacks to hypercars, each handling distinctly. The track editor empowers the community to create, share, and rate custom tracks, ensuring endless variety. Online multiplayer supports casual and ranked races, with replay systems and ghost data enabling continuous improvement. The clean, console-inspired UI presents information clearly without cluttering the screen.",
    features: [
      "Balanced arcade handling with deep drift mechanics",
      "Reactive environment with dynamic weather effects",
      "Full-featured track editor with community sharing",
      "Career mode across multiple vehicle classes",
      "Ghost racing and replay systems for improvement",
      "Ranked online multiplayer with seasonal competitions"
    ],
    engine: "Unity",
    platforms: ["PC", "Console"],
    technologies: ["Unity", "C#", "Netcode for GameObjects", "Steam SDK"],
    featured: true,
    caseStudy: true
  },
  {
    id: "medieval-lands",
    slug: "medieval-lands",
    title: "Medieval Lands",
    client: "RPG Studio",
    category: "Game",
    subcategory: "Action RPG",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/medieval-lands.jpg",
    youtubeId: "VBr7gwP3fLI",
    tagline: "Epic medieval adventure with deep RPG mechanics.",
    description: "Medieval Lands immerses players in a sprawling dark fantasy world where political intrigue, supernatural threats, and personal vendettas interweave across a 40-hour campaign. The action combat system emphasizes positioning, timing, and resource management—stamina governs offensive and defensive actions, encouraging thoughtful engagement over button mashing. Character builds offer meaningful choices: specialize in heavy armor and devastating two-handed strikes, nimble dual-wielding with dodge-focused defense, or hybrid approaches mixing magic and martial prowess. The crafting system transforms gathered resources into equipment, consumables, and upgrade materials, with master craftsman NPCs teaching rare recipes. Multiple narrative paths respond to player decisions—alliances forged, enemies spared, and moral choices made all influence available quests and the story's conclusion. Side content includes monster hunting contracts, treasure maps, arena championships, and companion quests that develop relationships with party members. New Game Plus unlocks higher difficulties and carries over player progress.",
    features: [
      "Stamina-based action combat with meaningful tactical depth",
      "Classless character building with diverse specialization paths",
      "Branching narrative with multiple endings based on choices",
      "Comprehensive crafting system with master craftsman NPCs",
      "40+ hours of main campaign plus extensive side content",
      "New Game Plus with higher difficulties and carryover progress"
    ],
    engine: "Unity",
    platforms: ["PC", "Console"],
    technologies: ["Unity", "C#", "Dialogue System", "Quest System"],
    featured: true,
    caseStudy: true
  },
  {
    id: "dandera-quest",
    slug: "dandera-quest",
    title: "Dandera Quest",
    client: "Adventure Games",
    category: "Game",
    subcategory: "Adventure",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/dandera-quest.jpg",
    youtubeId: "Ub-SAqslBpY",
    tagline: "Ancient Egyptian adventure with puzzle elements.",
    description: "Dandera Quest transports players to ancient Egypt's most mysterious temple complex, where archaeological discovery meets supernatural adventure. The Dendera Temple, famous for its enigmatic ceiling zodiac and controversial hieroglyphic interpretations, serves as both historical setting and puzzle-filled gameplay space. Players control an archaeologist who discovers that the temple's ancient mechanisms still function—activating them requires deciphering hieroglyphic clues, manipulating light and shadow, and understanding Egyptian mythology. Puzzles integrate authentic archaeological elements: aligning star charts with ceiling carvings, using mirrors to direct sunlight through chambers, and reconstructing fragmentary inscriptions. The narrative weaves historical figures and events with fictional mystery, respecting Egyptian culture while creating engaging entertainment. Environmental storytelling reveals the lives of ancient priests through discovered artifacts and readable translations. An in-game encyclopedia catalogs discoveries, providing educational context for gameplay elements.",
    features: [
      "Historically researched recreation of Dendera Temple",
      "Puzzles based on authentic Egyptian mythology and astronomy",
      "Environmental storytelling through discoverable artifacts",
      "In-game encyclopedia with educational archaeological content",
      "Multiple puzzle solutions rewarding creative thinking",
      "Photo mode capturing the temple's architectural beauty"
    ],
    engine: "Unity",
    platforms: ["PC", "Mobile"],
    technologies: ["Unity", "C#", "Adventure Creator", "Localization"],
    featured: false,
    caseStudy: false
  },
  {
    id: "hyper-casual-bus-sort",
    slug: "hyper-casual-bus-sort",
    title: "Hyper Casual Bus Sort",
    client: "Mobile Games",
    category: "Game",
    subcategory: "Hyper Casual",
    year: "2023",
    thumbnailUrl: "/images/thumbnails/hyper-casual-bus-sort.jpg",
    youtubeId: "31bUYOl8diM",
    tagline: "Addictive bus sorting puzzle gameplay.",
    description: "Hyper Casual Bus Sort transforms a simple premise—matching passengers to buses by color—into an addictive puzzle experience that's easy to learn but challenging to master. Players tap colored passengers to move them onto matching buses, but limited bus capacity and passenger arrangement create spatial puzzles requiring forward thinking. Early levels teach mechanics gently, while advanced stages introduce obstacles: passengers who must board in specific orders, buses that depart on timers, and special passengers requiring multiple matches. The game's visual design prioritizes clarity and satisfaction—successful matches trigger pleasing animations and sounds that reinforce accomplishment. Daily challenges provide fresh puzzles with special rewards, while endless mode tests how far players can progress before running out of moves. The carefully tuned difficulty curve maintains flow state, presenting challenges that feel achievable but require attention. Optional hints and undo moves help frustrated players without trivializing the puzzle.",
    features: [
      "Simple tap-to-move mechanics accessible to all ages",
      "500+ handcrafted levels with progressive difficulty",
      "Daily challenges with unique puzzle configurations",
      "Endless mode testing player skill limits",
      "Satisfying visual and audio feedback on matches",
      "Optional hint system respecting player agency"
    ],
    engine: "Unity",
    platforms: ["Android", "iOS"],
    technologies: ["Unity", "C#", "Ads SDK", "Analytics"],
    featured: false,
    caseStudy: false
  },
  {
    id: "hyper-casual-runner",
    slug: "hyper-casual-runner",
    title: "Hyper Casual Runner",
    client: "Mobile Games",
    category: "Game",
    subcategory: "Hyper Casual",
    year: "2023",
    thumbnailUrl: "/images/thumbnails/hyper-casual-runner.jpg",
    youtubeId: "waUi60HNJ4A",
    tagline: "Endless running with simple swipe controls.",
    description: "Hyper Casual Runner delivers the quintessential mobile gaming experience—pick up and play endless running that's perfect for short sessions yet compelling enough for extended play. Swipe left, right, up, and down to navigate an ever-changing obstacle course while collecting coins and power-ups. The procedural generation system ensures no two runs are identical, combining handcrafted obstacle patterns in randomized sequences that maintain challenge without feeling unfair. Character progression provides long-term goals: collected coins purchase new runners with unique visual styles, and milestone achievements unlock special abilities like double jumps or shields. Social features include friends leaderboards, weekly tournaments, and shareable replay clips of impressive runs. The game's low system requirements ensure smooth performance on older devices, while high-end phones enjoy enhanced visual effects. The ad implementation respects player time, offering optional rewarded videos for continues and bonuses rather than intrusive interruptions.",
    features: [
      "Intuitive swipe controls perfected for mobile play",
      "Procedurally generated runs ensuring endless variety",
      "Unlockable characters with unique visual styles",
      "Weekly tournaments with exclusive rewards",
      "Friends leaderboards and shareable replay clips",
      "Respectful ad implementation with player choice"
    ],
    engine: "Unity",
    platforms: ["Android", "iOS"],
    technologies: ["Unity", "C#", "Ads SDK", "Firebase", "Procedural Generation"],
    featured: false,
    caseStudy: false
  },
  {
    id: "genetiq",
    slug: "genetiq",
    title: "Genetiq",
    client: "Strategy Games",
    category: "Game",
    subcategory: "Strategy",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/genetiq.jpg",
    youtubeId: "nt-SDGBulMM",
    tagline: "Genetic evolution strategy game.",
    description: "Genetiq explores the mechanics of evolution through strategic gameplay where players guide species development across generations. Starting with simple organisms, players select traits for reproduction: limb configurations, sensory organs, metabolic systems, and behavioral patterns. Each trait combination produces offspring with emergent characteristics—longer legs enable faster movement, larger eyes improve predator detection, and pack behaviors enable coordinated hunting. The simulation runs generations forward, showing how your choices manifest in evolving populations competing for resources. Environmental challenges test adaptations: ice ages favor fur and fat reserves, droughts reward water efficiency, and predator introductions demand defensive or evasive traits. Multiplayer modes pit evolving species against each other, creating arms races between predator and prey players. The game visualizes scientific concepts including natural selection, genetic drift, and speciation without requiring biology background. An encyclopedia explains the real science behind gameplay mechanics, making Genetiq both entertaining and educational.",
    features: [
      "Trait-based evolution with emergent creature behaviors",
      "Multi-generational simulation showing adaptation over time",
      "Environmental challenges testing species fitness",
      "Multiplayer ecosystem competition between players",
      "Visual representation of scientific evolutionary concepts",
      "Encyclopedia explaining real genetics and evolution"
    ],
    engine: "Unity",
    platforms: ["PC", "Mobile"],
    technologies: ["Unity", "C#", "Procedural Generation", "Genetic Algorithms"],
    featured: false,
    caseStudy: false
  },
  {
    id: "typing-online",
    slug: "typing-online",
    title: "Typing Online",
    client: "Educational Games",
    category: "Game",
    subcategory: "Educational",
    year: "2023",
    thumbnailUrl: "/images/thumbnails/typing-online.jpg",
    youtubeId: "pq9kcp-hsJY",
    tagline: "Competitive online typing races.",
    description: "Typing Online transforms touch typing practice from solitary drill into competitive multiplayer sport. Players race against opponents in real-time, typing passages that range from classic literature to contemporary articles, with cars advancing based on typing speed and accuracy. The competitive format creates urgency that accelerates skill development—players naturally push beyond comfort zones when racing rivals. Skill-based matchmaking ensures fair races, grouping players by words-per-minute ranges so beginners compete with beginners and experts face worthy challengers. A comprehensive practice mode offers lesson plans targeting specific keyboard areas, problem letter combinations, and accuracy improvement. Statistics tracking shows progress over time, identifying strengths and weaknesses with detailed breakdowns. Custom race creation allows teachers to use curriculum-specific content, while private lobbies enable classroom competitions. The global leaderboard showcases elite typists, with seasonal championships crowning the world's fastest fingers. The browser-based platform requires no installation, working across devices wherever keyboards are available.",
    features: [
      "Real-time multiplayer races with global opponents",
      "Skill-based matchmaking ensuring competitive balance",
      "Comprehensive practice lessons targeting weak areas",
      "Detailed statistics tracking progress over time",
      "Custom content support for classroom use",
      "Browser-based requiring no installation"
    ],
    engine: "Unity",
    platforms: ["Web", "PC"],
    technologies: ["Unity", "WebGL", "Photon", "Analytics Dashboard"],
    featured: false,
    caseStudy: false
  },
  {
    id: "realistic-warrior-game",
    slug: "realistic-3rd-person-warrior-game",
    title: "Realistic 3rd Person Warrior Game",
    client: "Action Games",
    category: "Game",
    subcategory: "Action",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/realistic-3rd-person-warrior-game.jpg",
    youtubeId: "yS5Fw8U6yAw",
    tagline: "Visceral third-person melee combat.",
    description: "Realistic 3rd Person Warrior Game delivers brutal, weighty melee combat that respects the lethality of historical weapons while providing deep gameplay systems. Built in Unreal Engine 5 to leverage Lumen lighting and Nanite geometry, the game presents a dark medieval world rendered with cinematic fidelity. Combat emphasizes commitment—attacks wind up visibly, swings carry momentum, and recovery windows create openings. Players must read enemy animations, choosing when to block, parry, or dodge based on incoming attack types. Stamina management prevents button mashing; exhausted warriors swing slowly and cannot block effectively. The combo system links light and heavy attacks with directional inputs, enabling skilled players to flow between techniques. Enemy variety demands strategy adaptation: shielded opponents require guard-breaking attacks, armored foes resist slashing but fall to blunt trauma, and quick enemies punish overcommitment. Finishing moves provide visceral punctuation to hard-won victories. The campaign follows a warrior's path through war-torn kingdoms, while arena modes offer pure combat challenges.",
    features: [
      "Weighty animation-driven combat with meaningful commitment",
      "Parry, block, and dodge systems rewarding enemy reading",
      "Stamina management preventing mindless aggression",
      "Directional combo system enabling expressive combat",
      "Enemy variety requiring tactical adaptation",
      "Unreal Engine 5 visuals with Lumen and Nanite"
    ],
    engine: "Unreal Engine",
    platforms: ["PC", "Console"],
    technologies: ["Unreal Engine 5", "C++", "Blueprints", "Lumen", "Nanite"],
    featured: true,
    caseStudy: true
  },
  {
    id: "office-simulator",
    slug: "office-simulator-hyper-casual",
    title: "Office Simulator",
    client: "Casual Games",
    category: "Game",
    subcategory: "Simulation",
    year: "2023",
    thumbnailUrl: "/images/thumbnails/office-simulator-hyper-casual.jpg",
    youtubeId: "ZGdy-d3FQl8",
    tagline: "Chaotic office management simulation.",
    description: "Office Simulator transforms the mundane reality of corporate life into absurdist comedy gameplay. Players navigate the social minefield of office politics, juggling actual work tasks with the real challenges: avoiding the boss, escaping unwanted conversations, and surviving endless meetings. The game combines time management with physics-based chaos—tasks must be completed before deadlines, but walking too fast attracts suspicion, and bumping into coworkers triggers awkward small talk that consumes precious time. Environmental storytelling through sticky notes, email threads, and overheard conversations reveals office drama that players can exploit or avoid. The upgrade system unlocks abilities like coffee-powered speed boosts, headphone-based conversation blocking, and strategic bathroom breaks. Multiple endings depend on player reputation—rise to management, maintain anonymity, or spectacularly flame out. The game satirizes corporate culture while remaining relatable to anyone who has worked in an office, finding humor in shared experiences of meetings that could have been emails and reply-all disasters.",
    features: [
      "Time management balancing productivity and survival",
      "Physics-based navigation through social obstacles",
      "Environmental storytelling revealing office drama",
      "Upgrade system with comedic power-ups",
      "Multiple endings based on reputation choices",
      "Satirical humor relatable to office workers everywhere"
    ],
    engine: "Unity",
    platforms: ["Android", "iOS"],
    technologies: ["Unity", "C#", "Ads SDK", "Physics System"],
    featured: false,
    caseStudy: false
  },
];

// ============================================================================
// 3D ART PROJECTS - 3 Projects
// ============================================================================

export const THREE_D_PROJECTS: Project[] = [
  {
    id: "3d-world-hologram-shader",
    slug: "3d-world-hologram-shader",
    title: "3D World Hologram Shader",
    client: "VFX Studio",
    category: "3D",
    subcategory: "Blender / Shader Development",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/3d-world-hologram-shader.jpg",
    youtubeId: "JZ2OkqjENPQ",
    tagline: "Stunning holographic shader effects in Blender.",
    description: "3D World Hologram Shader is a comprehensive shader package that transforms ordinary 3D scenes into mesmerizing holographic visualizations. The system creates the iconic sci-fi hologram aesthetic—complete with scan lines that travel across surfaces, chromatic aberration at edges, flickering noise patterns, and ethereal glow effects that respond to viewing angle. Every parameter is artist-controllable: adjust scan line density and speed, dial in glitch frequency and intensity, modify color schemes from classic cyan to custom palettes, and blend multiple effect layers. The shaders work with any geometry, automatically adapting to surface normals for consistent appearance on complex models. Performance optimization ensures real-time playback in both EEVEE and Cycles, making the package suitable for game development, motion graphics, and virtual production. Included presets cover common use cases from subtle tactical displays to dramatic science fiction interfaces. Tutorial documentation walks artists through customization, while node group organization enables easy integration into existing projects.",
    features: [
      "Procedural scan lines with customizable speed and density",
      "Chromatic aberration and edge glow effects",
      "Glitch and noise systems with keyframeable intensity",
      "Color scheme presets with custom palette support",
      "Optimized for real-time EEVEE and offline Cycles rendering",
      "Comprehensive documentation with video tutorials"
    ],
    engine: "Blender",
    platforms: ["Unity", "Unreal Engine", "Film"],
    technologies: ["Blender", "EEVEE", "Shader Nodes", "Procedural Systems"],
    featured: true,
    caseStudy: true
  },
  {
    id: "realistic-3d-cinematic",
    slug: "realistic-3d-cinematic-unreal",
    title: "Realistic 3D Cinematic",
    client: "Film Production",
    category: "3D",
    subcategory: "Cinematic",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/realistic-3d-cinematic-unreal.jpg",
    youtubeId: "QLnamOt_VGk",
    tagline: "Photorealistic cinematics powered by Unreal Engine.",
    description: "Realistic 3D Cinematic showcases the pinnacle of real-time rendering technology through a series of photorealistic short films created entirely in Unreal Engine 5. The project leverages every cutting-edge feature: Lumen provides accurate global illumination that responds dynamically to time-of-day changes and moving light sources, Nanite enables film-quality geometry with billions of polygons rendered in real-time, and MetaHuman technology delivers digital characters that approach photorealism. Each sequence demonstrates different technical achievements—an architectural visualization showing how light cascades through windows throughout a day cycle, a character piece with subtle facial performance capture, and an environment showcase featuring weather systems and vegetation interaction. The cinematography employs virtual camera techniques including depth of field, motion blur, and lens distortion that match physical cinema cameras. This project serves as both portfolio piece and technical demonstration, proving that real-time engines can achieve output quality previously exclusive to offline rendering farms.",
    features: [
      "Lumen global illumination with dynamic time-of-day",
      "Nanite geometry enabling billions of polygons in real-time",
      "MetaHuman characters with performance capture",
      "Virtual cinematography matching physical camera behavior",
      "Weather and environmental interaction systems",
      "Demonstration of production-ready virtual filmmaking"
    ],
    engine: "Unreal Engine 5",
    platforms: ["Film", "Advertising"],
    technologies: ["Unreal Engine 5", "Lumen", "Nanite", "MetaHuman", "Sequencer", "Virtual Camera"],
    featured: true,
    caseStudy: true
  },
  {
    id: "mobile-game-3d-assets",
    slug: "mobile-game-ready-3d-assets",
    title: "Mobile Game Ready 3D Assets",
    client: "Asset Store",
    category: "3D",
    subcategory: "Asset Pack",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/mobile-game-ready-3d-assets.jpg",
    youtubeId: "c5hS1Fp61fg",
    tagline: "Optimized 3D assets for mobile game development.",
    description: "Mobile Game Ready 3D Assets provides game developers with a comprehensive library of production-quality 3D content specifically optimized for mobile hardware constraints. The pack contains over 500 assets spanning fantasy characters, modern environments, sci-fi props, and nature elements—each model carefully constructed to maximize visual quality while minimizing polygon count, draw calls, and memory usage. Characters use efficient skeletal rigs compatible with mobile animation systems, while props employ level-of-detail (LOD) chains that automatically reduce complexity at distance. Texture atlasing groups related assets onto shared materials, drastically reducing state changes that impact mobile GPU performance. PBR materials are tuned for mobile shader capabilities, with optional simplified versions for low-end devices. Every asset includes Unity and Unreal Engine project files with proper import settings, collision meshes, and prefab configurations. Documentation covers mobile optimization principles, helping developers learn techniques applicable beyond this pack.",
    features: [
      "500+ assets across characters, environments, and props",
      "Mobile-optimized polygon counts with LOD chains",
      "Texture atlasing minimizing draw calls and state changes",
      "PBR materials tuned for mobile shader limitations",
      "Unity and Unreal project files with proper configuration",
      "Documentation teaching mobile optimization principles"
    ],
    engine: "Blender / Maya",
    platforms: ["Unity", "Unreal Engine"],
    technologies: ["Blender", "Substance Painter", "FBX", "Mobile Optimization"],
    featured: false,
    caseStudy: false
  },
  {
    id: "transformer-robot-3d",
    slug: "transformer-robot-3d-model-animation",
    title: "Transformer Robot 3D Model",
    client: "Animation Studio",
    category: "3D",
    subcategory: "Character Art",
    year: "2024",
    thumbnailUrl: "/images/thumbnails/transformer-robot-3d-model-animation.jpg",
    youtubeId: "Xn2TmGtdOPs",
    tagline: "Detailed transformer robot with full animation rig.",
    description: "Transformer Robot 3D Model represents the technical pinnacle of mechanical character design—a fully transforming robot that seamlessly converts between humanoid mech and vehicle form. The model comprises over 2,000 individually moving parts, each meticulously designed to nest and fold according to believable engineering principles. The transformation animation spans 300 frames of intricate choreography where every panel, piston, and joint moves with purposeful mechanical logic. Dual rigging systems control each form: the robot rig provides standard humanoid animation capabilities including IK/FK switching, while the vehicle rig enables driving animation with working suspension and steering. Transition controllers blend between systems during transformation, maintaining deformation integrity throughout. Surface detail includes panel lines, mechanical weathering, and reflective surfaces that catch light realistically. The model is delivered in multiple formats with game-ready optimizations available, serving applications from cinematic animation to real-time game engines to 3D printing.",
    features: [
      "2,000+ moving parts with engineering-plausible transformation",
      "300-frame transformation animation with mechanical logic",
      "Dual rigging system for robot and vehicle forms",
      "IK/FK switching and procedural secondary motion",
      "PBR materials with mechanical weathering detail",
      "Multiple delivery formats including game-ready optimization"
    ],
    engine: "Maya / Blender",
    platforms: ["Unity", "Unreal Engine", "Film"],
    technologies: ["Maya", "Substance Painter", "Advanced Rigging", "Mechanical Animation"],
    featured: true,
    caseStudy: true
  }
];

// ============================================================================
// COMBINED & UTILITY FUNCTIONS
// ============================================================================

export const ALL_PROJECTS: Project[] = [...XR_PROJECTS, ...GAME_PROJECTS, ...THREE_D_PROJECTS];

export const FEATURED_PROJECTS = ALL_PROJECTS.filter(p => p.featured);

export const getProjectBySlug = (slug: string): Project | undefined => {
  return ALL_PROJECTS.find(p => p.slug === slug);
};

export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
  return ALL_PROJECTS.filter(p => p.category === category);
};

export const getRelatedProjects = (project: Project, limit: number = 3): Project[] => {
  return ALL_PROJECTS
    .filter(p => p.id !== project.id && p.category === project.category)
    .slice(0, limit);
};
