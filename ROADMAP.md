# 🗺 TerraMind — Yol Xəritəsi

Aşağıdakı ardıcıllıqla get. Hər addımı bitirmədən növbətiyə keçmə.

---

## Mərhələ 1 — utils/storage.js

Bu fayl localStorage ilə işləyir. Başqa heç bir fayl birbaşa localStorage-ə toxunmayacaq.

Yazacaqların:
- `storage.get(key)` — localStorage-dən oxu, JSON parse et, null qaytar tapmasansa
- `storage.set(key, value)` — JSON stringify edib yaz
- `storage.remove(key)` — sil

Test: Brauzer konsolunda `storage.set('test', {a:1})` yaz, `storage.get('test')` ilə oxu.

---

## Mərhələ 2 — utils/helpers.js

Tətbiq boyu lazım olan kiçik funksiyalar.

Yazacaqların:
- `formatNumber(num)` — 1000000 → "1,000,000"
- `formatArea(km2)` — 1000000 → "1,000,000 km²"
- `formatPopulation(num)` — 1340000000 → "1.34B", 45000000 → "45M", kiçikləri olduğu kimi
- `getFlag(country)` — ölkə obyektindən flag URL-ini qaytar
- `getCapital(country)` — paytaxt yoxdursa "N/A" qaytar
- `getNativeName(country)` — native name yoxdursa əsas adı qaytar

Test: Hər funksiyanı konsolda fərqli rəqəmlərlə yoxla.

---

## Mərhələ 3 — core/state.js

Tətbiqin mərkəzi yaddaşı. Bütün modullar buradan oxuyacaq.

Yazacaqların:
- `state` obyekti — aşağıdakı sahələrlə:

```
countries        → [] — API-dən gələn bütün ölkələr
filtered         → [] — aktiv filtrdən keçmiş ölkələr
currentCountry   → null — modalda açıq olan ölkə
currentPage      → 1 — pagination üçün
currentRegion    → 'all' — aktiv region filtri
currentSort      → 'name' — aktiv sıralama
user             → null — giriş etmiş istifadəçi (storage-dən oxu)
favorites        → [] — saxlanmış ölkələr (storage-dən oxu)
```

Diqqət: `user` və `favorites` — storage.js-dən oxuyub state-ə yaz, başlanğıcda boş qalmasın.

Test: Konsolda `import {state} from './core/state.js'` ilə yoxla.

---

## Mərhələ 4 — core/api.js

REST Countries API ilə bütün əlaqə buradadır. Başqa heç bir fayl fetch yazmayacaq.

Yazacaqların:
- `fetchCountries()` — bütün ölkələri gətir
  - `https://restcountries.com/v3.1/all`
  - fields parametri əlavə et — lazımsız datanı gətirmə (sürət üçün)
  - xəta olarsa boş array qaytar, konsola yaz

- `fetchCountryByCode(code)` — tək ölkə
  - `https://restcountries.com/v3.1/alpha/{code}`
  - detail page üçün lazım olacaq

- `fetchNeighbors(codes)` — qonşu ölkələr
  - `https://restcountries.com/v3.1/alpha?codes={code1,code2}`
  - modal və detail page-də qonşular bölməsi üçün

Test: `fetchCountries()` çağır, konsola gələn datanın strukturuna bax.

---

## Mərhələ 5 — components/theme.js

Dark/light tema. Ən sadə komponent.

Yazacaqların:
- `initTheme()` — storage-dən aktiv temanı oxu, `body`-yə class əlavə et
- `toggleTheme()` — aktiv temanı dəyiş, storage-ə yaz, body class-ını yenilə
- Header-dəki tema düyməsinə event listener qoş

Test: Düyməyə bas, tema dəyişsin, səhifəni yenilə — əvvəlki tema qalsın.

---

## Mərhələ 6 — components/toast.js

Bildiriş sistemi. Hər yerdən çağırılacaq.

Yazacaqların:
- `initToast()` — DOM-da `#toast` elementini tap, saxla
- `showToast(message, type)` — type: 'success' / 'error' / 'info'
  - toast-a mətn yaz, class əlavə et
  - 3 saniyə sonra avtomatik gizlət
  - ardıcıl çağırışlarda üst-üstə düşməsin (əvvəlkini təmizlə)

Test: Konsolda `showToast('Test', 'success')` çağır.

---

## Mərhələ 7 — components/auth.js

Login, register, logout məntiqi.

Yazacaqların:
- `initAuth()` — storage-dən user oxu, varsa header düyməsini yenilə
- `showAuthModal()` — `#auth-modal`-a active class əlavə et
- `closeAuthModal()` — active class-ı sil
- `closeAuthOutside(event)` — yalnız overlay-ə click olunanda bağla
- `switchAuthTab(tab)` — 'login' / 'register' tabları arasında keç
- `handleLogin()` — input-ları oxu, storage-dən istifadəçini tap, uyğundursa state.user-i yenilə, header-i yenilə, modali bağla, toast göstər
- `handleRegister()` — input-ları oxu, username artıq varsa xəta göstər, yoxdursa storage-ə yaz, avtomatik login et
- `handleLogout()` — state.user-i null et, storage-dən sil, header-i yenilə, profile modali bağla

Diqqət: Real backend yoxdur — istifadəçiləri storage-də saxla.

Test: Qeydiyyatdan keç, çıxış et, yenidən giriş et.

---

## Mərhələ 8 — components/profile.js

Profil modalı.

Yazacaqların:
- `initProfile()` — header auth düyməsinə click listener qoş — user varsa profil modal aç, yoxdursa auth modal aç
- `showProfileModal()` — `#profile-modal`-a active class əlavə et, state.user-dən məlumatları DOM-a yaz
  - username, email
  - total score, oyun sayı, ən yüksək skor
  - skor tarixini listlə
- `closeProfileModal()` — active class-ı sil
- `closeProfileOutside(event)` — overlay click-də bağla

Test: Giriş et, header düyməsinə bas, profil açılsın.

---

## Mərhələ 9 — components/modal.js

Ölkə modalı — index.html-dəki `#country-modal`.

Yazacaqların:
- `initModal()` — klaviatura Escape-ə listener qoş, modali bağlasın
- `openModal(country)` — state.currentCountry-ni set et, DOM-a yaz:
  - bayraq şəkli
  - ölkə adı, native adı
  - region, paytaxt, əhali, sahə, valyuta, dil tagları
  - qonşu ölkələr — fetchNeighbors() çağır, render et
  - favorites düyməsinin vəziyyətini yenilə
- `closeModal()` — active class-ı sil, state.currentCountry-ni null et
- `closeModalOutside(event)` — overlay click-də bağla
- `toggleFavoriteFromModal()` — state.currentCountry-ni favorites-ə əlavə et və ya sil, storage-ə yaz, düyməni yenilə, toast göstər

Test: Ölkə kartına bas, modal açılsın, bütün məlumatlar görünsün.

---

## Mərhələ 10 — pages/explorer.js

index.html-in əsas məntiqi.

Yazacaqların:
- `initExplorer()` — hər şeyi başlat:
  - search input-a event listener qoş
  - region select-ə event listener qoş
  - sort select-ə event listener qoş
  - ilk render-i çağır

- `renderCards()` — state.filtered-dəki ölkələri kartlara çevir, `#countries-grid`-ə yaz
  - hər kart: bayraq, ad, paytaxt, əhali, region
  - karta click — openModal() çağır
  - favorites düyməsi — toggleFavorite() çağır
  - pagination-a uyğun yalnız aktiv səhifənin ölkələrini göstər

- `applyFilters()` — state.countries üzərində:
  - axtarış sözünə görə filtrə et (ad, paytaxt)
  - seçilmiş regiona görə filtrə et
  - seçilmiş sıralamaya görə sırala
  - nəticəni state.filtered-ə yaz
  - state.currentPage-i 1-ə sıfırla
  - renderCards() çağır
  - results count-u yenilə

- `renderPagination()` — state.filtered-in uzunluğuna görə səhifə düymələrini yarat

- `setRegion(value)` — state.currentRegion-u yenilə, applyFilters() çağır
- `setSorting(value)` — state.currentSort-u yenilə, applyFilters() çağır
- `setView(type)` — 'grid' / 'list' — countries-grid-ə class əlavə et

Test: Axtarış yaz, filtr seç, sıralamağı dəyiş — hər şey real vaxtda yenilənsin.

---

## Mərhələ 11 — pages/favorites.js

favorites.html-in məntiqi.

Yazacaqların:
- `initFavorites()` — state.favorites-dən oxu, render et
- `renderFavorites()` — favorites boşdursa empty state göstər, dolu isə kartları render et
  - kartlar explorer-dakı ilə eyni görünüşdə olsun
  - hər kartda "sil" düyməsi olsun
- `removeFavorite(code)` — state.favorites-dən sil, storage-ə yaz, yenidən render et, toast göstər

Test: Explorer-dən ölkə saxla, favorites.html-ə keç, orada görünsün.

---

## Mərhələ 12 — pages/quiz.js

quiz.html-in məntiqi.

Yazacaqların:
- `initQuiz()` — leaderboard-u yüklə, göstər
- `startQuiz(mode)` — mode: 'flags' / 'capitals' / 'population'
  - state.countries-dən 10 random sual yarat
  - quiz game ekranını göstər, menunu gizlət
  - ilk sualı render et

- `renderQuestion(index)` — aktiv sualı göstər:
  - flags modunda — bayraq şəkli göstər, 4 seçim düyməsi
  - capitals modunda — ölkə adı göstər, 4 paytaxt seçimi
  - progress bar-ı yenilə, sual nömrəsini yenilə

- `startTimer()` — 15 saniyə geri say
  - SVG timer circle-i animasiya et
  - vaxt bitərsə avtomatik növbəti suala keç, 0 xal

- `selectAnswer(answer)` — seçilmiş cavabı yoxla:
  - düzgündürsə — yaşıl, xal əlavə et, streak artır
  - yanlışdırsa — qırmızı, düzgün cavabı göstər, streak sıfırla
  - 1 saniyə gözlə, növbəti suala keç

- `endQuestion()` — timer-i dayandır, növbəti sual varsa renderQuestion(), yoxdursa showResult()

- `showResult()` — nəticə ekranını göstər:
  - toplam xal, doğru, yanlış, ən uzun streak
  - skoru state.user-ə əlavə et, storage-ə yaz

- `endQuiz()` — quiz game ekranını bağla, menunu göstər

Test: Hər 3 modu oyna, nəticə düzgün hesablansın, skor profildə görünsün.

---

## Mərhələ 13 — core/router.js

Detail page overlay məntiqi.

Yazacaqların:
- `openDetailPage()` — state.currentCountry-dən oxu, `#detail-page`-ə active class əlavə et:
  - bayraq, ad, native ad, region
  - bütün məlumatlar — fetchCountryByCode() ilə tam data gətir
  - dillər, valyutalar, saat zonası tagları
  - qonşu ölkələr — fetchNeighbors() ilə
  - Google Maps linki
- `closeDetailPage()` — active class-ı sil
- `router.init()` — brauzer back düyməsi basılanda detail page-i bağla

Test: Modalda "View Full Profile" düyməsinə bas, detail page açılsın.

---

## Mərhələ 14 — app.js

Hər şeyi birləşdir. Bu faylı ən sonda tamamla.

- Bütün init funksiyalarını import et
- `init()` funksiyasında ardıcıl çağır
- `DOMContentLoaded`-ə qoş

---

## Ardıcıllıq

```
storage.js → helpers.js → state.js → api.js
     ↓
theme.js → toast.js → auth.js → profile.js → modal.js
     ↓
explorer.js → favorites.js → quiz.js
     ↓
router.js → app.js ✓
```

---

*Hər addımı bitirdikdə brauzdə test et, sonra növbətiyə keç.*