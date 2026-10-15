# Registan Radar Guide

Create a complete, modern, premium, production-ready mobile UI/UX design for an offline-first tourist guide application called **“Registon Guide”**.

The application is specifically designed for tourists visiting **Registan Square and nearby historical monuments in Samarkand, Uzbekistan**.

This is NOT a generic travel application. It is a focused digital tourist guide for the Registan area.

The core experience must be extremely simple:

**Open → Explore → Radar → Point the phone → Select a monument → Read / Listen → Done**

==================================================

1. CORE PRODUCT CONCEPT
   ==================================================

The application must be designed as an **OFFLINE-FIRST tourist guide**.

The core tourist experience must work without an internet connection.

The application uses:

* GPS
* Compass / magnetometer
* Gyroscope
* Accelerometer
* Local database
* Local images
* Local audio files
* Offline map
* Local translations

The application does NOT use AI as the primary mechanism.

Do NOT design:

* AI chatbot
* AI assistant
* AI conversation interface
* AI-generated content interface
* Camera-based AI object recognition

The application does NOT need a camera for the core experience.

The user holds and rotates the phone. The application determines:

1. Where the user is.
2. Which direction the user is facing.
3. Which nearby monument is located in that direction.
4. The distance to the monument.
5. Which monument should be displayed as the current target.

The main interaction is therefore based on:

**GPS + Compass + Gyroscope + Local Monument Database**

==================================================
2. ONLINE VS OFFLINE ARCHITECTURE
=================================

Design the UX assuming the following architecture:

OFFLINE:

* GPS
* Compass
* Gyroscope
* Radar
* Nearby monuments
* Monument details
* Historical information
* Photos
* Audio guides
* Languages
* Favorites
* History
* Offline map
* Navigation information
* Local settings

ONLINE:

* Registration/login when required
* Payment
* Subscription verification
* Downloading the Registan offline package
* Updating monument content
* Future backend synchronization
* Optional future online functionality

The UI must clearly communicate whether the application is:

* Online
* Offline
* Synchronizing
* Downloading
* Updating
* Ready for offline use

Do not make the user feel that the application is broken when there is no internet.

==================================================
3. TARGET AREA
==============

The application is initially limited to:

**Registan Square and nearby historical monuments in Samarkand.**

Do not design the application as if it contains the entire world.

The main content package should be:

**Registan Offline Pack**

Example contents:

* Registan Square
* Ulugbek Madrasah
* Sherdor Madrasah
* Tilla-Kori Madrasah
* Nearby historical monuments
* Historical points of interest
* Local photos
* Audio guides
* Offline map
* Translations

The architecture should still allow additional monuments to be added later through the backend.

==================================================
4. SUPPORTED LANGUAGES
======================

The application must support exactly three languages:

🇺🇿 Uzbek — `uz-UZ`

🇷🇺 Russian — `ru-RU`

🇬🇧 British English — `en-GB`

English must specifically use British English conventions.

Use British spelling where applicable:

* centre
* favourite
* metre
* colour
* organise

Do NOT add Arabic, Turkish, American English, or other languages.

All user-facing content must support localization:

* Navigation
* Buttons
* Menus
* Monument names
* Historical descriptions
* Audio guide titles
* Audio guide metadata
* Settings
* Error messages
* GPS messages
* Compass instructions
* Payment screens
* Subscription screens
* Offline messages
* Notifications
* Empty states
* Loading states

The selected language must be stored locally and must continue working offline.

==================================================
5. DESIGN LANGUAGE
==================

Create a premium modern visual identity inspired subtly by:

* Registan architecture
* Turquoise Uzbek ceramic tiles
* Deep blue
* Sandstone
* Central Asian geometric patterns

Do NOT make the UI look old-fashioned or overly decorative.

The design should feel like a combination of:

* premium museum application
* modern navigation application
* high-end travel guide

Primary visual direction:

* Dark premium interface
* Deep navy / charcoal background
* Turquoise and blue accents
* Warm cream / sandstone highlights
* Subtle green success states
* White/high-contrast typography
* Rounded cards
* Soft shadows
* Minimal icons
* Clean spacing
* Strong visual hierarchy

Outdoor readability is extremely important because tourists will use the application outdoors.

Support:

* Dark mode
* Light mode

Dark mode should be the primary visual direction.

==================================================
6. DEVICE AND RESPONSIVE DESIGN
===============================

Design for modern Android and iOS smartphones.

Primary reference:

**390 × 844 px**

The UI must adapt to:

* small phones
* large phones
* Android
* iPhone

Use proper safe areas.

Buttons must have comfortable touch targets.

Typography must remain readable outdoors.

==================================================
7. INFORMATION ARCHITECTURE
===========================

Main navigation:

1. Explore
2. Places
3. Map
4. Favourites
5. Profile

Use a modern bottom navigation bar.

The Explore screen must be the primary entry point.

==================================================
8. SPLASH SCREEN
================

Create a minimal premium splash screen.

Include:

Registon Guide

Tagline:

“Samarqand tarixini kashf eting”

Use a subtle architectural pattern or Registan-inspired geometric element.

Do not overload the screen.

==================================================
9. ONBOARDING
=============

Create three onboarding screens.

SCREEN 1:

Title:

“Registonni yangi usulda kashf eting”

Explain:

“Telefoningizni aylantiring va atrofingizdagi tarixiy obidalarni kashf eting.”

SCREEN 2:

Title:

“Internet kerak emas”

Explain:

“Ma’lumotlar, audio gidlar, rasmlar va xarita offline ishlaydi.”

SCREEN 3:

Title:

“Sayohatingizni boshlang”

CTA:

“Boshlash”

Also provide language selection.

Language selector:

🇺🇿 O‘zbekcha
🇷🇺 Русский
🇬🇧 English

==================================================
10. AUTHENTICATION
==================

Create:

* Login
* Registration
* Forgot password
* Verification
* Terms
* Privacy

Keep authentication simple.

Registration fields:

* Name
* Email or phone
* Password
* Confirm password

Buttons:

“Kirish”

“Ro‘yxatdan o‘tish”

Design all states:

* Loading
* Success
* Invalid input
* Server error
* Offline
* Verification required

The authentication UI must be prepared for future backend integration.

==================================================
11. HOME / EXPLORE
==================

This is the primary screen.

Header:

“Registon”

Subtitle:

“Tarix har doim yoningizda”

Top-right:

Language selector
Profile icon

Main primary action:

Large premium card/button:

**RADAR**

Subtitle:

“Yaqin obidalarni kashf eting”

Show current location:

“Registon maydoni”

Show GPS accuracy:

“±5 m”

Show current connectivity:

“Offline rejim”

Nearby preview:

Sherdor madrasasi — 85 m

Tilla-Kori madrasasi — 95 m

Ulugbek madrasasi — 120 m

Each place must be tappable.

==================================================
12. MAIN RADAR SCREEN
=====================

This is the MOST IMPORTANT SCREEN.

Create a large circular radar interface.

The radar must visually display:

* North
* East
* South
* West
* Distance rings
* User position
* Monument markers
* Current heading
* Selected monument
* Distance
* Direction

Example:

CENTER:

Blue user position indicator.

Around the radar:

Sherdor Madrasah
85 m
5° right

Tilla-Kori Madrasah
95 m
South

Ulugbek Madrasah
120 m
West

The radar must rotate or update according to the user's phone orientation.

When the user rotates the phone:

* Monument markers move accordingly.
* Direction indicators update.
* Selected monument follows the correct bearing.

Selected monument should display:

Monument thumbnail
Name
Distance
Direction

Example:

“Sherdor madrasasi”

“85 m”

“5° o‘ngda”

Primary CTA:

**Batafsil**

Secondary CTA:

**Yo‘nalish**

==================================================
13. RADAR INTERACTION LOGIC
===========================

The UI must visually represent the following real-world logic:

User GPS:

Latitude + Longitude

Phone heading:

Compass heading

Device orientation:

Gyroscope + accelerometer

Monument:

Latitude + Longitude

The application calculates:

* Distance
* Bearing
* Difference between user heading and monument bearing

Example:

User heading:

287°

Sherdor:

292°

Difference:

5°

Display:

“5° o‘ngda”

The radar must make this information understandable without requiring technical knowledge.

==================================================
14. RADAR STATES
================

Design the following states:

GPS searching:

“Joylashuv aniqlanmoqda...”

GPS ready:

“Joylashuv aniqlandi”

Low GPS accuracy:

“GPS aniqligi past”

Compass calibration:

“Kompasni sozlang”

Compass unavailable:

“Kompas sensori mavjud emas”

No nearby monuments:

“Yaqin atrofda obida topilmadi”

Monument detected:

“Sherdor madrasasi”

Offline:

“Offline ishlayapti”

All states must provide an appropriate next action.

==================================================
15. MONUMENT DETAIL SCREEN
==========================

Create a premium monument detail page.

Example:

**Sherdor madrasasi**

Hero image.

Show:

* Monument name
* Category
* Distance
* Direction
* Location
* Historical period

Tabs:

Asosiy
Tarix
Rasmlar
Audio

Main content card:

Short description.

Primary button:

**Batafsil ma’lumot**

Audio section:

“Audio gid”

Play button.

Show:

* Duration
* Progress
* Play/pause
* Offline availability

Gallery:

Large image
Small thumbnails

Actions:

* Favourites
* Yo‘nalish
* Audio
* Share

All information must be available offline.

==================================================
16. PLACES SCREEN
=================

Create a list of all Registan-area monuments.

Categories:

* Barchasi
* Madrasa
* Masjid
* Maqbara
* Muzey
* Tarixiy joy

Each Place Card contains:

* Image
* Name
* Distance
* Category
* Short description
* Favourite button

Sorting:

* Yaqin
* Mashhur
* Alfavit bo‘yicha

The list must work offline.

==================================================
17. MAP SCREEN
==============

Create a map screen focused on the Registan area.

Show:

* User location
* Monument markers
* Selected monument
* Distance
* Walking route

The map component must be designed for future **Mapbox integration**.

Do not design the map as a static image.

The map area should be a replaceable map component.

Include:

* Zoom controls
* Current location button
* Compass
* Selected marker
* Route button

The map should have an offline-map state.

==================================================
18. OFFLINE MAP
===============

Design the offline map experience.

The user should be able to download:

**Registan Offline Map**

Show:

* Download size
* Download progress
* Available storage
* Download status

States:

* Not downloaded
* Downloading
* Downloaded
* Update available
* Update failed
* Insufficient storage

Example:

“Registan Offline Map”

“42 MB”

[ Yuklab olish ]

==================================================
19. AUDIO GUIDE
===============

Create a dedicated audio guide player.

Features:

* Play
* Pause
* Seek
* 15 seconds backward
* 15 seconds forward
* Playback speed
* Progress
* Duration
* Offline status

Example:

Sherdor madrasasi

Audio gid

02:48

Show:

“Offline mavjud”

Audio must work without internet.

==================================================
20. FAVOURITES
==============

Create:

“Sevimlilar”

Show saved monuments.

Empty state:

“Hali sevimli joylaringiz yo‘q”

CTA:

“Obidalarni kashf etish”

Favourites must work locally first.

The architecture should allow future backend synchronization.

==================================================
21. HISTORY
===========

Create:

“Ko‘rilganlar”

Show recently viewed monuments.

Each item:

* Image
* Monument name
* Date
* Time

Allow:

“Tarixni tozalash”

History must work offline.

==================================================
22. OFFLINE CENTRE
==================

Create a dedicated:

**Offline ma’lumotlar**

screen.

Main package:

**Registan Offline Pack**

Example:

18 obida
146 surat
18 audio gid
Offline xarita
3 til

Storage:

“245 MB”

Buttons:

“Yangilash”

“O‘chirish”

States:

* Ready
* Downloading
* Download complete
* Update available
* Download failed
* Insufficient storage
* Offline
* Online

==================================================
23. PAYMENT AND SUBSCRIPTION
============================

Create a modern payment flow.

Plans:

1 kun
3 kun
7 kun

Each plan should display:

* Price
* Validity
* Included features

CTA:

“Davom etish”

Payment states:

* Payment processing
* Payment successful
* Payment failed
* Payment cancelled
* Subscription active
* Subscription expired
* Verification

IMPORTANT:

Payment and offline content must be architecturally separated.

Payment requires internet.

After payment:

Server confirms the subscription.

The app then unlocks the relevant offline content.

Never design the client-side UI as the final authority for payment status.

==================================================
24. PROFILE
===========

Create:

Profile

Show:

* Name
* Email
* Subscription
* Subscription expiration
* Language
* Theme
* Offline data
* Notifications
* About
* Terms
* Privacy
* Support
* Logout

Subscription card:

“Premium”

“Amal qilish muddati: ...”

==================================================
25. SETTINGS
============

Create settings for:

Language
Theme
Location
Compass calibration
Notifications
Audio
Storage
Offline data
Privacy
About

Language options:

🇺🇿 O‘zbekcha
🇷🇺 Русский
🇬🇧 English

==================================================
26. PERMISSIONS
===============

The application primarily requires:

* Location permission
* Motion/sensor access where required by the platform

Do NOT request camera permission because the core product does not require a camera.

Explain why location permission is required.

Example:

“Yaqin obidalarni aniqlash uchun joylashuvingiz kerak.”

CTA:

“Ruxsat berish”

Compass calibration should have a visual instruction screen.

==================================================
27. ERROR STATES
================

Design polished error states for:

GPS unavailable

“Joylashuv aniqlanmadi”

Compass inaccurate

“Kompasni sozlang”

Low GPS accuracy

“GPS aniqligi past”

No nearby monuments

“Yaqin atrofda obida topilmadi”

Offline content unavailable

“Offline ma’lumot topilmadi”

Payment failed

“To‘lov amalga oshmadi”

Storage full

“Qurilmada yetarli bo‘sh joy yo‘q”

Unsupported sensors

“Qurilmangiz kerakli sensorlarni qo‘llab-quvvatlamaydi”

Every error should provide a clear next action.

==================================================
28. LOADING STATES
==================

Create loading/skeleton states for:

* Places
* User profile
* Payment
* Offline package
* Map
* Synchronization

Use progress indicators where meaningful.

==================================================
29. BACKEND-READY COMPONENT DESIGN
==================================

The UI must be designed so that every dynamic component can later receive real backend data.

Do not hardcode content into the component design.

Create reusable components.

Example:

PLACE CARD

Properties:

* placeId
* name
* image
* distance
* bearing
* category
* favourite
* availability

RADAR MARKER

Properties:

* placeId
* name
* distance
* bearing
* selected

AUDIO PLAYER

Properties:

* audioId
* title
* duration
* localFile
* remoteUrl
* downloaded
* playbackState

SUBSCRIPTION CARD

Properties:

* planId
* name
* price
* duration
* active
* expiresAt

OFFLINE PACKAGE

Properties:

* packageId
* version
* size
* downloaded
* updateAvailable
* downloadProgress

==================================================
30. OFFLINE-FIRST DATA MODEL
============================

Design the UI assuming two data layers:

LOCAL DATA

REMOTE DATA

The UI should prioritize local data.

Local data includes:

* Place information
* Coordinates
* Images
* Audio
* Translations
* Favourites
* History
* Offline map metadata

Remote data includes:

* Payment status
* Subscription verification
* Content updates
* New monuments
* Updated descriptions
* Updated audio
* Updated images

If the backend is unavailable, the UI should continue operating using local data.

==================================================
31. FLUTTER IMPLEMENTATION
==========================

The design must be realistic to implement in Flutter.

Avoid unnecessarily complex UI effects that are difficult to reproduce.

Design reusable components suitable for Flutter widgets.

Conceptual architecture:

lib/
core/
models/
services/
screens/
widgets/
navigation/
theme/
localization/

Future integrations:

* GPS/location package
* Compass sensor
* Gyroscope
* Accelerometer
* Local database
* Local file storage
* Mapbox
* REST API
* Authentication
* Payment API

The UI should allow these integrations without requiring a redesign.

==================================================
32. COMPONENT DESIGN SYSTEM
===========================

Create a complete reusable design system.

Components:

* Primary button
* Secondary button
* Icon button
* Bottom navigation
* Top navigation
* Place card
* Radar marker
* Distance badge
* Direction badge
* Audio player
* Image gallery
* Tabs
* Chips
* Bottom sheet
* Modal
* Toast
* Alert
* Progress bar
* Skeleton
* Empty state
* Error state
* Permission card
* Subscription card
* Offline package card

Define:

* Typography
* Font sizes
* Font weights
* Spacing
* Corner radius
* Button heights
* Icon sizes
* Shadows
* Colours
* Component states

States should include:

* Default
* Pressed
* Selected
* Disabled
* Loading
* Success
* Error
* Offline

==================================================
33. ACCESSIBILITY
=================

Prioritize accessibility.

Use:

* High contrast
* Large readable text
* Clear icons
* Text labels for important icons
* Large touch targets
* Clear error messages
* Avoid relying only on colour
* Accessible audio controls

The application should be usable by international tourists who may not be familiar with Uzbekistan.

==================================================
34. MICROINTERACTIONS
=====================

Use subtle premium animations.

Examples:

* Radar pulse
* Radar marker movement
* Selected monument expansion
* Favourite animation
* Audio playback animation
* Page transitions
* Offline download progress
* Successful payment animation
* Compass calibration animation

Animations must be fast and subtle.

Do not overuse animations.

==================================================
35. NAVIGATION FLOW
===================

Create a complete navigation flow:

Splash
↓
Onboarding
↓
Language
↓
Login / Registration
↓
Payment / Subscription
↓
Offline Pack
↓
Explore
↓
Radar
↓
Select Monument
↓
Monument Details
↓
Read / Listen / View Photos

Also allow:

Explore
→ Places
→ Map
→ Favourites
→ Profile

Profile
→ Subscription
→ Offline Data
→ Language
→ Settings

==================================================
36. FINAL DELIVERABLE
=====================

Generate a COMPLETE mobile UI/UX system, not just a home screen.

Include at minimum:

1. Splash
2. Onboarding
3. Language selection
4. Login
5. Registration
6. Home / Explore
7. Radar
8. Radar states
9. Nearby Places
10. Place Details
11. History
12. Favourites
13. Map
14. Offline Map
15. Audio Guide
16. Offline Centre
17. Payment Plans
18. Payment Processing
19. Payment Success
20. Payment Failure
21. Subscription status
22. Profile
23. Settings
24. GPS permission
25. Compass calibration
26. GPS error
27. Compass error
28. Offline states
29. Loading states
30. Empty states
31. Error states
32. Complete design system
33. Navigation flow

The final UI must look like a real commercial mobile application ready for Flutter implementation.

Do not create a generic template.

The design must clearly communicate:

**Registan + Offline + Radar + Tourist Guide**

The core product experience must remain extremely simple:

**OPEN → RADAR → ROTATE PHONE → FIND MONUMENT → DETAILS → LISTEN / READ**

The application must feel fast, premium, reliable, and usable even when the tourist has no mobile internet.

The design must be technically realistic for future integration with:

**Flutter + GPS + Compass + Gyroscope + Local Database + Offline Storage + Mapbox + REST Backend + Authentication + Online Payment.**

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/845b362a-65b6-430c-b06f-6c2e8a65627d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
