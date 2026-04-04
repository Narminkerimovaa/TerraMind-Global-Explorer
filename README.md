# 🌍 TerraMind — Global Explorer

> 195 ölkə. Sonsuz hekayə. Bir tətbiq.

TerraMind dünya ölkələrini kəşf etmək, bayraqları tanımaq və coğrafiya biliklərini test etmək üçün hazırlanmış interaktiv bir veb tətbiqidir. [REST Countries API](https://restcountries.com/) istifadə olunur.

Bu layihə **öyrənmə məqsədilə** yazılır — JavaScript modulları, state idarəsi və komponent əsaslı düşüncə tərzini praktikada tətbiq etmək üçün.

---

## ✨ Xüsusiyyətlər

| Xüsusiyyət | Təsvir |
|---|---|
| 🗺 Explorer | 195 ölkəni axtarış, filtr və sıralama ilə kəşf et |
| 🧠 Quiz | Bayraq, paytaxt və əhali üzrə bilik testi |
| ♡ Favorites | Bəyəndiyin ölkələri saxla |
| 👤 Auth | Qeydiyyat, giriş, skor tarixi |
| 🌙 Tema | Dark / Light dəstəyi |

---

## 📁 Struktur

```
terramind/
├── index.html
├── quiz.html
├── favorites.html
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        ├── app.js
        ├── core/
        │   ├── api.js
        │   ├── state.js
        │   └── router.js
        ├── components/
        │   ├── auth.js
        │   ├── modal.js
        │   ├── profile.js
        │   ├── toast.js
        │   └── theme.js
        ├── pages/
        │   ├── explorer.js
        │   ├── quiz.js
        │   └── favorites.js
        └── utils/
            ├── helpers.js
            └── storage.js
```

---

*Layihə öyrənmə məqsədilə yazılır. Hər modul müstəqil başa düşülə bilməlidir.*