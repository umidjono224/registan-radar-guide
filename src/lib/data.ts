import type { Localised } from "./i18n";
import type { LatLng } from "./geo";
import sherdor from "@/assets/sherdor.jpg";
import ulugbek from "@/assets/ulugbek.jpg";
import tillakori from "@/assets/tillakori.jpg";
import registan from "@/assets/registan.jpg";
import guremir from "@/assets/guremir.jpg";
import bibikhanym from "@/assets/bibikhanym.jpg";

export type Category = "square" | "madrasa" | "mosque" | "mausoleum" | "museum" | "historic";

/** Backend-ready place model. Matches lib/models/place.dart. */
export interface Place {
  placeId: string;
  name: Localised;
  category: Category;
  coords: LatLng;
  image: string;
  gallery: string[];
  period: Localised;
  short: Localised;
  history: Localised;
  audio: { audioId: string; durationSec: number; downloaded: boolean };
  popularity: number;
  availability: "offline" | "update" | "remote";
}

/** Simulated user position: centre of Registan Square. */
export const USER_POSITION: LatLng = { lat: 39.65465, lng: 66.97565 };

export const places: Place[] = [
  {
    placeId: "sherdor",
    name: { uz: "Sherdor madrasasi", ru: "Медресе Шердор", en: "Sherdor Madrasah" },
    category: "madrasa",
    coords: { lat: 39.65478, lng: 66.97664 },
    image: sherdor,
    gallery: [sherdor, registan, tillakori],
    period: { uz: "1619–1636", ru: "1619–1636", en: "1619–1636" },
    short: {
      uz: "Peshtoqidagi quyosh yuzli yo‘lbars tasviri bilan mashhur. Yalangto‘sh Bahodir buyrug‘i bilan qurilgan.",
      ru: "Знаменито изображением тигров с солнечными ликами на портале. Построено по приказу Ялангтуша Бахадура.",
      en: "Famed for the sun‑faced tigers on its portal. Built on the orders of Yalangtush Bahadur.",
    },
    history: {
      uz: "Sherdor madrasasi 1619–1636-yillarda Samarqand hokimi Yalangto‘sh Bahodir tomonidan Ulug‘bek madrasasi ro‘parasida qurilgan. Peshtoqidagi quyoshni ko‘tarib borayotgan yo‘lbarslar tasviri islom san’atida noyob hodisa hisoblanadi. Madrasa 17-asr Buxoro me’morchiligining eng yorqin namunalaridan biri.",
      ru: "Медресе Шердор построено в 1619–1636 годах правителем Самарканда Ялангтушем Бахадуром напротив медресе Улугбека. Изображение тигров, несущих солнце, на портале — редчайший случай в исламском искусстве.",
      en: "Sherdor Madrasah was built between 1619 and 1636 by Yalangtush Bahadur, governor of Samarkand, as a mirror to Ulugbek Madrasah. The tigers carrying the sun across its portal are an exceptionally rare motif in Islamic art.",
    },
    audio: { audioId: "a-sherdor", durationSec: 168, downloaded: true },
    popularity: 98,
    availability: "offline",
  },
  {
    placeId: "tillakori",
    name: { uz: "Tilla-Kori madrasasi", ru: "Медресе Тилля‑Кари", en: "Tilla‑Kori Madrasah" },
    category: "madrasa",
    coords: { lat: 39.65548, lng: 66.97562 },
    image: tillakori,
    gallery: [tillakori, registan, sherdor],
    period: { uz: "1646–1660", ru: "1646–1660", en: "1646–1660" },
    short: {
      uz: "“Oltin bilan bezatilgan” madrasa. Ichki gumbazi zarhal naqshlar bilan qoplangan.",
      ru: "«Отделанное золотом» медресе. Внутренний купол покрыт позолоченными узорами.",
      en: "The ‘gilded’ madrasah. Its interior dome is covered in gold‑leaf patterns.",
    },
    history: {
      uz: "Tilla-Kori madrasasi Registon ansamblining shimoliy qismini yakunlaydi. U ham madrasa, ham jome masjidi vazifasini bajargan. Ichki gumbaz zarhal kundal texnikasida bezatilgan.",
      ru: "Медресе Тилля‑Кари завершает северную часть ансамбля Регистан. Служило одновременно медресе и соборной мечетью.",
      en: "Tilla‑Kori completes the northern side of the Registan ensemble and served as both a madrasah and the city’s congregational mosque.",
    },
    audio: { audioId: "a-tillakori", durationSec: 191, downloaded: true },
    popularity: 92,
    availability: "offline",
  },
  {
    placeId: "ulugbek",
    name: { uz: "Ulug‘bek madrasasi", ru: "Медресе Улугбека", en: "Ulugbek Madrasah" },
    category: "madrasa",
    coords: { lat: 39.65478, lng: 66.97452 },
    image: ulugbek,
    gallery: [ulugbek, registan],
    period: { uz: "1417–1420", ru: "1417–1420", en: "1417–1420" },
    short: {
      uz: "Registondagi eng qadimgi madrasa. Buyuk astronom Mirzo Ulug‘bek tomonidan qurdirilgan.",
      ru: "Старейшее медресе Регистана. Возведено великим астрономом Мирзо Улугбеком.",
      en: "The oldest madrasah on the Registan, founded by the astronomer‑king Mirzo Ulugbek.",
    },
    history: {
      uz: "Ulug‘bek madrasasi 15-asrda Sharqning eng nufuzli ilm dargohlaridan biri bo‘lgan. Bu yerda astronomiya, matematika va falsafa o‘qitilgan. Peshtoqidagi yulduzli osmon tasviri Ulug‘bekning ilmga muhabbatidan darak beradi.",
      ru: "В XV веке медресе Улугбека было одним из самых престижных учебных заведений Востока: здесь преподавали астрономию, математику и философию.",
      en: "In the fifteenth century Ulugbek Madrasah was among the finest universities of the East, teaching astronomy, mathematics and philosophy.",
    },
    audio: { audioId: "a-ulugbek", durationSec: 204, downloaded: true },
    popularity: 95,
    availability: "offline",
  },
  {
    placeId: "registan",
    name: { uz: "Registon maydoni", ru: "Площадь Регистан", en: "Registan Square" },
    category: "square",
    coords: { lat: 39.65488, lng: 66.97558 },
    image: registan,
    gallery: [registan, sherdor, ulugbek, tillakori],
    period: { uz: "XV–XVII asrlar", ru: "XV–XVII века", en: "15th–17th centuries" },
    short: {
      uz: "Samarqandning yuragi. Uchta madrasa bilan o‘ralgan mashhur maydon.",
      ru: "Сердце Самарканда — знаменитая площадь, окружённая тремя медресе.",
      en: "The heart of Samarkand — a celebrated square framed by three madrasahs.",
    },
    history: {
      uz: "“Registon” so‘zi “qumli joy” degan ma’noni anglatadi. Bu yerda farmonlar e’lon qilingan, bayramlar o‘tkazilgan va savdo qaynagan.",
      ru: "Слово «Регистан» означает «песчаное место». Здесь оглашали указы, проводили праздники и торговали.",
      en: "‘Registan’ means ‘sandy place’. Here decrees were proclaimed, festivals held and trade flourished.",
    },
    audio: { audioId: "a-registan", durationSec: 142, downloaded: true },
    popularity: 100,
    availability: "offline",
  },
  {
    placeId: "chorsu",
    name: { uz: "Chorsu savdo gumbazi", ru: "Торговый купол Чорсу", en: "Chorsu Trading Dome" },
    category: "historic",
    coords: { lat: 39.6551, lng: 66.9775 },
    image: registan,
    gallery: [registan],
    period: { uz: "XV asr", ru: "XV век", en: "15th century" },
    short: {
      uz: "Sherdor orqasidagi olti burchakli savdo gumbazi. Hozir san’at galereyasi.",
      ru: "Шестигранный торговый купол за Шердором. Сейчас — художественная галерея.",
      en: "A hexagonal trading dome behind Sherdor, now an art gallery.",
    },
    history: {
      uz: "Chorsu Temuriylar davrida bosh bozor bo‘lgan. 18-asrda qayta qurilgan.",
      ru: "В эпоху Тимуридов Чорсу был главным рынком. Перестроен в XVIII веке.",
      en: "Chorsu was the principal market of the Timurid era and was rebuilt in the eighteenth century.",
    },
    audio: { audioId: "a-chorsu", durationSec: 96, downloaded: true },
    popularity: 60,
    availability: "offline",
  },
  {
    placeId: "guremir",
    name: { uz: "Amir Temur maqbarasi", ru: "Мавзолей Гур‑Эмир", en: "Gur‑e‑Amir Mausoleum" },
    category: "mausoleum",
    coords: { lat: 39.6486, lng: 66.9688 },
    image: guremir,
    gallery: [guremir],
    period: { uz: "1404", ru: "1404", en: "1404" },
    short: {
      uz: "Amir Temur va uning avlodlari dafn etilgan maqbara. Firuza rangli qovurg‘ali gumbaz.",
      ru: "Усыпальница Амира Темура и его потомков. Ребристый бирюзовый купол.",
      en: "Resting place of Amir Temur and his heirs, crowned with a ribbed turquoise dome.",
    },
    history: {
      uz: "Dastlab Muhammad Sulton uchun qurilgan. 1405-yilda Amir Temur bu yerda dafn etilgan.",
      ru: "Изначально построен для Мухаммад‑Султана. В 1405 году здесь был похоронен Амир Темур.",
      en: "Originally built for Muhammad Sultan; Amir Temur himself was buried here in 1405.",
    },
    audio: { audioId: "a-guremir", durationSec: 221, downloaded: true },
    popularity: 97,
    availability: "offline",
  },
  {
    placeId: "rukhabad",
    name: { uz: "Ruhobod maqbarasi", ru: "Мавзолей Рухабад", en: "Rukhabad Mausoleum" },
    category: "mausoleum",
    coords: { lat: 39.6505, lng: 66.9705 },
    image: guremir,
    gallery: [guremir],
    period: { uz: "1380", ru: "1380", en: "1380" },
    short: {
      uz: "“Ruh maskani”. Shayx Burhoniddin Sog‘arjiy maqbarasi.",
      ru: "«Обитель духа». Мавзолей шейха Бурханиддина Сагарджи.",
      en: "‘Abode of the spirit’ — the mausoleum of Sheikh Burhaniddin Sagarji.",
    },
    history: {
      uz: "Amir Temur davrining eng sodda va qadimiy maqbaralaridan biri.",
      ru: "Один из самых простых и древних мавзолеев эпохи Темура.",
      en: "One of the plainest and earliest mausoleums of Temur’s reign.",
    },
    audio: { audioId: "a-rukhabad", durationSec: 88, downloaded: false },
    popularity: 55,
    availability: "update",
  },
  {
    placeId: "bibikhanym",
    name: { uz: "Bibixonim masjidi", ru: "Мечеть Биби‑Ханым", en: "Bibi‑Khanym Mosque" },
    category: "mosque",
    coords: { lat: 39.6607, lng: 66.98 },
    image: bibikhanym,
    gallery: [bibikhanym],
    period: { uz: "1399–1404", ru: "1399–1404", en: "1399–1404" },
    short: {
      uz: "Amir Temur qurdirgan ulkan jome masjidi. O‘z davrida islom olamidagi eng yiriklaridan.",
      ru: "Грандиозная соборная мечеть Амира Темура — одна из крупнейших в исламском мире своего времени.",
      en: "Amir Temur’s colossal congregational mosque, once among the largest in the Islamic world.",
    },
    history: {
      uz: "Hindiston yurishidan keyin qurilgan. 20-asr oxirida keng ko‘lamda tiklangan.",
      ru: "Построена после индийского похода. Масштабно восстановлена в конце XX века.",
      en: "Built after the Indian campaign and extensively restored in the late twentieth century.",
    },
    audio: { audioId: "a-bibikhanym", durationSec: 176, downloaded: true },
    popularity: 90,
    availability: "offline",
  },
  {
    placeId: "khizr",
    name: { uz: "Hazrati Xizr masjidi", ru: "Мечеть Хазрат‑Хызр", en: "Hazrat Khizr Mosque" },
    category: "mosque",
    coords: { lat: 39.664, lng: 66.9845 },
    image: bibikhanym,
    gallery: [bibikhanym],
    period: { uz: "1854", ru: "1854", en: "1854" },
    short: {
      uz: "Afrosiyob tepaligidagi masjid. Shahar manzarasi ochiladi.",
      ru: "Мечеть на холме Афрасиаб с видом на город.",
      en: "A hillside mosque on Afrasiab with sweeping views of the city.",
    },
    history: {
      uz: "Samarqanddagi eng qadimgi masjid o‘rnida qurilgan.",
      ru: "Построена на месте древнейшей мечети Самарканда.",
      en: "Built on the site of Samarkand’s oldest mosque.",
    },
    audio: { audioId: "a-khizr", durationSec: 102, downloaded: true },
    popularity: 70,
    availability: "offline",
  },
  {
    placeId: "afrasiab",
    name: { uz: "Afrosiyob muzeyi", ru: "Музей Афрасиаб", en: "Afrasiab Museum" },
    category: "museum",
    coords: { lat: 39.6707, lng: 66.991 },
    image: ulugbek,
    gallery: [ulugbek],
    period: { uz: "1970", ru: "1970", en: "1970" },
    short: {
      uz: "Qadimgi Samarqand xarobalari yonidagi muzey. 7-asr devor rasmlari saqlanadi.",
      ru: "Музей у руин древнего Самарканда. Хранит настенные росписи VII века.",
      en: "Museum beside the ruins of ancient Samarkand, home to seventh‑century murals.",
    },
    history: {
      uz: "Mashhur “Elchilar zali” devoriy suratlari shu yerda.",
      ru: "Здесь находятся знаменитые росписи «Зала послов».",
      en: "Houses the celebrated ‘Hall of Ambassadors’ murals.",
    },
    audio: { audioId: "a-afrasiab", durationSec: 130, downloaded: false },
    popularity: 65,
    availability: "remote",
  },
];

export const getPlace = (id: string) => places.find((p) => p.placeId === id);

export interface Plan {
  planId: string;
  nameKey: "day1" | "day3" | "day7";
  price: number;
  currency: string;
  days: number;
  popular?: boolean;
}
export const plans: Plan[] = [
  { planId: "p1", nameKey: "day1", price: 29000, currency: "UZS", days: 1 },
  { planId: "p3", nameKey: "day3", price: 59000, currency: "UZS", days: 3, popular: true },
  { planId: "p7", nameKey: "day7", price: 99000, currency: "UZS", days: 7 },
];

export interface OfflinePackage {
  packageId: string;
  version: string;
  sizeMb: number;
  monuments: number;
  photos: number;
  audio: number;
  languages: number;
}
export const registanPack: OfflinePackage = {
  packageId: "registan-v2",
  version: "2.3.0",
  sizeMb: 245,
  monuments: 18,
  photos: 146,
  audio: 18,
  languages: 3,
};

export const formatPrice = (n: number, currency: string) =>
  `${n.toLocaleString("en-GB")} ${currency}`;
