import zanskarImg from "@/assets/zanskar.jpg";
import tirthanImg from "@/assets/tirthan.jpg";
import majuliImg from "@/assets/majuli.jpg";
import spitiImg from "@/assets/spiti.jpg";
import dzukouImg from "@/assets/dzukou.jpg";

export interface Destination {
  id: string;
  name: string;
  region: string;
  image: string;
  bio: string;
  bestTime: string;
  price: number;
  highlights: string[];
  description: string;
  gallery: string[];
  difficulty: string;
  duration: string;
  altitude: string;
  included: string[];
  lat: number;
  lng: number;
  country: string;
}

export const worldDestinations: Partial<Destination>[] = [
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', lat: 35.0116, lng: 135.7681 },
  { id: 'santorini', name: 'Santorini', country: 'Greece', lat: 36.3932, lng: 25.4615 },
  { id: 'banff', name: 'Banff', country: 'Canada', lat: 51.1784, lng: -115.5708 },
  { id: 'machu-picchu', name: 'Machu Picchu', country: 'Peru', lat: -13.1631, lng: -72.5450 },
  { id: 'amalfi', name: 'Amalfi Coast', country: 'Italy', lat: 40.6333, lng: 14.6027 },
  { id: 'reykjavik', name: 'Reykjavik', country: 'Iceland', lat: 64.1265, lng: -21.8174 },
];

export const destinations: Destination[] = [
  {
    id: "zanskar",
    name: "Zanskar Valley",
    region: "Ladakh",
    image: zanskarImg,
    bio: "A frozen kingdom of turquoise rivers and ancient monasteries, Zanskar is India's last Shangri-La — remote, raw, and breathtaking.",
    bestTime: "Jun – Sep",
    price: 18999,
    highlights: ["Chadar Trek", "Phuktal Monastery", "River Rafting"],
    description: "Nestled deep within the Himalayas, Zanskar Valley is one of the most remote and pristine regions of India. With turquoise rivers cutting through dramatic gorges, ancient Buddhist monasteries perched on cliff faces, and some of the most challenging treks in the world, Zanskar offers an unparalleled adventure. The famous Chadar Trek over the frozen Zanskar River is a bucket-list experience. In summer, the valley transforms into a lush green paradise perfect for rafting and monastery visits.",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    ],
    difficulty: "Challenging",
    duration: "5–7 Days",
    altitude: "3,500 – 5,000m",
    included: ["Airport transfers", "Heritage homestay", "Expert guide", "All meals", "Rafting gear", "Permits"],
    lat: 33.9189,
    lng: 76.8275,
    country: "India",
  },
  {
    id: "tirthan",
    name: "Tirthan Valley",
    region: "Himachal Pradesh",
    image: tirthanImg,
    bio: "Crystal streams, ancient forests, and the gateway to the Great Himalayan National Park — Tirthan is Himachal's best-kept secret.",
    bestTime: "Mar – Jun",
    price: 8999,
    highlights: ["Trout Fishing", "GHNP Trek", "Waterfall Hikes"],
    description: "Tirthan Valley, named after the crystal-clear Tirthan River, is a paradise for nature lovers and trekkers. Located near the Great Himalayan National Park (a UNESCO World Heritage Site), it offers pristine forests, stunning waterfalls, and some of the best trout fishing in India. The valley remains largely untouched by mass tourism, offering an authentic Himalayan experience with cozy wooden cottages, riverside camping, and trails through ancient cedar and oak forests.",
    gallery: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800",
    ],
    difficulty: "Easy–Moderate",
    duration: "3–5 Days",
    altitude: "1,600 – 3,200m",
    included: ["Valley transfers", "Riverside cottage", "Trek guide", "All meals", "Fishing equipment", "Park entry"],
    lat: 31.634,
    lng: 77.3486,
    country: "India",
  },
  {
    id: "majuli",
    name: "Majuli Island",
    region: "Assam",
    image: majuliImg,
    bio: "The world's largest river island, Majuli is a living museum of Assamese neo-Vaishnavite culture floating on the Brahmaputra.",
    bestTime: "Oct – Mar",
    price: 7499,
    highlights: ["Sattra Visits", "Mask Making", "Sunset Cruises"],
    description: "Majuli, the world's largest river island, is a cultural treasure floating on the mighty Brahmaputra. Home to ancient Sattra monasteries preserving neo-Vaishnavite art and culture, Majuli offers a unique blend of spirituality, art, and natural beauty. Watch master craftsmen create traditional masks, experience the graceful Sattriya dance form, cycle through vibrant paddy fields, and witness the most spectacular sunsets over the river. This is slow travel at its finest.",
    gallery: [
      "https://images.unsplash.com/photo-1590845947676-fa1fda48045e?w=800",
      "https://images.unsplash.com/photo-1504457047772-27faf04c7b5e?w=800",
      "https://images.unsplash.com/photo-1583309219338-a582f1f9ca6b?w=800",
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800",
    ],
    difficulty: "Easy",
    duration: "3–4 Days",
    altitude: "85m (River level)",
    included: ["Ferry crossing", "Island cottage", "Cultural guide", "All meals", "Bicycle rental", "Dance show"],
    lat: 26.9602,
    lng: 94.1378,
    country: "India",
  },
  {
    id: "spiti",
    name: "Spiti Valley",
    region: "Himachal Pradesh",
    image: spitiImg,
    bio: "A cold desert moonscape dotted with 1,000-year-old monasteries. Spiti rewards those who dare to reach it.",
    bestTime: "May – Oct",
    price: 14999,
    highlights: ["Key Monastery", "Chandratal Lake", "Fossil Hunting"],
    description: "Spiti Valley, often called 'Little Tibet,' is a breathtaking cold desert landscape in the high Himalayas. With its dramatic barren mountains, ancient monasteries dating back over a millennium, and some of the highest inhabited villages in the world, Spiti is a journey into another realm. Visit the iconic Key Monastery, camp beside the stunning Chandratal Lake at 4,300m, hunt for marine fossils in the mountains, and experience the warm hospitality of Spitian people living at the edge of the world.",
    gallery: [
      "https://images.unsplash.com/photo-1626015365107-aa59fc5d6aee?w=800",
      "https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    ],
    difficulty: "Moderate–Hard",
    duration: "6–8 Days",
    altitude: "3,800 – 4,600m",
    included: ["Manali transfers", "Monastery stays", "Expert driver", "All meals", "Camping gear", "Permits"],
    lat: 32.2461,
    lng: 78.0349,
    country: "India",
  },
  {
    id: "dzukou",
    name: "Dzükou Valley",
    region: "Nagaland",
    image: dzukouImg,
    bio: "Known as the 'Valley of Flowers of the Northeast,' Dzükou's rolling emerald hills burst with rare lilies every monsoon.",
    bestTime: "Jun – Sep",
    price: 9999,
    highlights: ["Wildflower Trek", "Camping", "Naga Heritage"],
    description: "Dzükou Valley, straddling the border of Nagaland and Manipur, is one of the most beautiful trekking destinations in India. Known as the 'Valley of Flowers of the Northeast,' it bursts with rare Dzükou lilies and other wildflowers during monsoon. The valley's rolling emerald hills, misty mornings, and pristine streams create a magical atmosphere. Combined with the rich Naga tribal heritage, traditional cuisine, and the historic Kohima War Cemetery, a trip to Dzükou is a deeply enriching experience.",
    gallery: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800",
      "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800",
      "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800",
    ],
    difficulty: "Moderate",
    duration: "3–5 Days",
    altitude: "2,400 – 2,700m",
    included: ["Kohima transfers", "Camping setup", "Naga guide", "All meals", "Trekking poles", "Inner Line Permit"],
    lat: 25.5925,
    lng: 94.0683,
    country: "India",
  },
  {
    id: "munnar",
    name: "Munnar",
    region: "Kerala",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800",
    bio: "Endless tea plantations and mist-covered hills. Munnar is the 'God's Own Country' at its peak.",
    bestTime: "Sep – Mar",
    price: 11999,
    highlights: ["Tea Museum", "Eravikulam National Park", "Anamudi Peak"],
    description: "Munnar, situated at the confluence of three mountain streams, is a paradise for nature lovers. Known as the 'Kashmir of South India,' it offers rolling hills covered with emerald green tea plantations, exotic flora and fauna in Eravikulam National Park, and the highest peak in South India, Anamudi. The cool climate and serene atmosphere make it a perfect escape.",
    gallery: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800",
      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800"
    ],
    difficulty: "Easy",
    duration: "3–4 Days",
    altitude: "1,600m",
    included: ["Kochi transfers", "Tea estate stay", "Local guide", "All meals", "Museum entry"],
    lat: 10.0889,
    lng: 77.0595,
    country: "India",
  },
  {
    id: "rishikesh",
    name: "Rishikesh",
    region: "Uttarakhand",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
    bio: "The Yoga Capital of the World, where the Ganges flows with spiritual energy and white-water thrills.",
    bestTime: "Mar – May",
    price: 8499,
    highlights: ["White Water Rafting", "Ganga Aarti", "Yoga Retreats"],
    description: "Rishikesh is where spirituality meets adrenaline. Located in the foothills of the Himalayas beside the holy Ganges, it's a world-renowned center for yoga and meditation. Contrastingly, it's also the adventure hub of India, offering world-class rafting and bungee jumping. The evening Ganga Aarti at Triveni Ghat is a surreal, soulful experience.",
    gallery: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
      "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=800"
    ],
    difficulty: "Moderate",
    duration: "3–5 Days",
    altitude: "340m",
    included: ["Haridwar transfers", "Riverside camp", "Rafting session", "All meals", "Yoga classes"],
    lat: 30.0869,
    lng: 78.2676,
    country: "India",
  },
  {
    id: "hampi",
    name: "Hampi",
    region: "Karnataka",
    image: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800",
    bio: "A boulder-strewn landscape of ancient ruins, Hampi is a frozen echo of the mighty Vijayanagara Empire.",
    bestTime: "Oct – Feb",
    price: 9499,
    highlights: ["Virupaksha Temple", "Coracle Rides", "Sunset at Matanga Hill"],
    description: "Hampi, a UNESCO World Heritage site, is a surreal open-air museum. The ruins of the Vijayanagara Empire are scattered across a landscape of massive boulders and lush palm groves. From the majestic Virupaksha Temple to the intricate Stone Chariot, every corner tells a story of architectural brilliance and a glorious past.",
    gallery: [
      "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800",
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800"
    ],
    difficulty: "Easy",
    duration: "3–4 Days",
    altitude: "467m",
    included: ["Hospet transfers", "Heritage guesthouse", "Expert guide", "All meals", "Bicycle rental"],
    lat: 15.3350,
    lng: 76.4600,
    country: "India",
  },
  {
    id: "jaisalmer",
    name: "Jaisalmer",
    region: "Rajasthan",
    image: "https://images.unsplash.com/photo-1590425000030-cf2f52097e3a?w=800",
    bio: "The Golden City of the Thar Desert, where a living fort rises from the shimmering sands.",
    bestTime: "Nov – Feb",
    price: 12499,
    highlights: ["Jaisalmer Fort", "Sam Sand Dunes", "Camel Safari"],
    description: "Jaisalmer is like a scene from 'The Arabian Nights.' Its yellow sandstone architecture gives it a distinctive golden glow. The iconic Jaisalmer Fort is one of the few 'living forts' in the world, with residents still living within its walls. A camel safari through the Sam Sand Dunes under a starlit sky is the quintessential desert experience.",
    gallery: [
      "https://images.unsplash.com/photo-1590425000030-cf2f52097e3a?w=800",
      "https://images.unsplash.com/photo-1577083161633-9bc3a0024460?w=800"
    ],
    difficulty: "Easy",
    duration: "4–5 Days",
    altitude: "225m",
    included: ["Desert transfers", "Luxury tent stay", "Camel safari", "All meals", "Cultural show"],
    lat: 26.9157,
    lng: 70.9160,
    country: "India",
  },
  {
    id: "havelock",
    name: "Havelock Island",
    region: "Andaman Islands",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800",
    bio: "Turquoise waters, white sands, and the best scuba diving in South Asia. Havelock is a tropical dream.",
    bestTime: "Nov – May",
    price: 15999,
    highlights: ["Radhanagar Beach", "Scuba Diving", "Kayaking"],
    description: "Havelock Island, officially known as Swaraj Dweep, is the jewel of the Andaman archipelago. It's home to Radhanagar Beach, frequently voted the best beach in Asia. The island offers pristine coral reefs bursting with marine life, making it a world-class destination for scuba diving and snorkeling. Its emerald forests and azure waters are pure tranquility.",
    gallery: [
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800",
      "https://images.unsplash.com/photo-1591142512130-9fbb34383183?w=800"
    ],
    difficulty: "Easy",
    duration: "4–6 Days",
    altitude: "0m (Sea level)",
    included: ["Port Blair ferry", "Beach resort", "Scuba intro", "All meals", "Inter-island boat"],
    lat: 11.9761,
    lng: 92.9876,
    country: "India",
  },
  {
    id: "varanasi",
    name: "Varanasi",
    region: "Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
    bio: "The world's oldest living city, where life and death converge on the holy Ghats of the Ganges.",
    bestTime: "Oct – Mar",
    price: 7999,
    highlights: ["Ganga Aarti", "Boat Cruise", "Narrow Galis"],
    description: "Varanasi, the spiritual heart of India, is an assault on the senses in the most profound way. It's a city of 2,000 temples and nearly 100 ghats. Witnessing the evening Aarti, exploring the labyrinthine alleys of the old city, and taking a sunrise boat ride on the Ganges offers a glimpse into the timeless traditions of India.",
    gallery: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
      "https://images.unsplash.com/photo-1596701062351-be5f4262f3c7?w=800"
    ],
    difficulty: "Easy",
    duration: "3–4 Days",
    altitude: "80m",
    included: ["Airport transfers", "Heritage hotel", "Ghat guide", "All meals", "Boat ride"],
    lat: 25.3176,
    lng: 82.9739,
    country: "India",
  },
];

export interface DayPlan {
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
}

export const detailedItineraries: Record<string, DayPlan[]> = {
  zanskar: [
    { title: "Arrival & Acclimatization", morning: "Fly into Leh Kushok Bakula Airport", afternoon: "Rest & acclimatize at heritage homestay", evening: "Sunset stroll at Leh Palace & Shanti Stupa" },
    { title: "Into the Valley", morning: "Drive Leh → Lamayuru via Fotu La Pass (4,108m)", afternoon: "Explore Lamayuru Moonland & monastery", evening: "Arrive Padum — campfire dinner under stars" },
    { title: "Monastery & Rapids", morning: "Trek to Phuktal Monastery (cliffside)", afternoon: "Zanskar River Grade III–IV rafting", evening: "Farewell dinner & return journey begins" },
  ],
  tirthan: [
    { title: "Valley Welcome", morning: "Drive from Aut to Tirthan Valley", afternoon: "Settle into riverside wooden cottage", evening: "Trout fishing & bonfire by the stream" },
    { title: "Highland Exploration", morning: "Hike to Jalori Pass (3,120m)", afternoon: "Trek to serene Serolsar Lake", evening: "Return to camp — stargazing session" },
    { title: "National Park Trek", morning: "Guided GHNP nature walk", afternoon: "Raghupur Fort heritage trail", evening: "Farewell riverside feast & departure" },
  ],
  majuli: [
    { title: "Island Arrival", morning: "Ferry from Jorhat across Brahmaputra", afternoon: "Visit Auniati Sattra & cultural walk", evening: "Golden hour at the river bank" },
    { title: "Cultural Immersion", morning: "Pottery village & artisan workshops", afternoon: "Traditional mask-making masterclass", evening: "Live Sattriya dance performance" },
    { title: "Village & Farewell", morning: "Sunrise cycling through paddy fields", afternoon: "Mishing tribal village feast", evening: "Return ferry — memories sealed" },
  ],
  spiti: [
    { title: "Journey to the Moon", morning: "Depart Manali via Atal Tunnel", afternoon: "Cross Kunzum La — enter Spiti", evening: "Arrive Kaza — hot dinner at café" },
    { title: "Monastery Circuit", morning: "Key Monastery sunrise meditation", afternoon: "Kibber village & Chicham Bridge", evening: "Comic village — world's highest post office" },
    { title: "Sacred Lake", morning: "Drive to Chandratal Lake (4,300m)", afternoon: "Lakeside trek & photography", evening: "Return via Kunzum — farewell views" },
  ],
  dzukou: [
    { title: "Gateway to Nagaland", morning: "Explore Kohima War Cemetery & heritage", afternoon: "Drive to Viswema village trailhead", evening: "Light trek to basecamp — Naga dinner" },
    { title: "Valley of Flowers", morning: "Full ascent into Dzükou Valley", afternoon: "Explore lily meadows & rolling hills", evening: "Wild camping — bonfire & local stories" },
    { title: "Sunrise & Return", morning: "Sunrise from the valley ridge", afternoon: "Descent trek back to Viswema", evening: "Authentic Naga lunch in Kohima — depart" },
  ],
};
