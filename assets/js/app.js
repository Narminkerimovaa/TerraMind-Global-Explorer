
// --- CORE ---
import { state }           from './core/state.js'
import { router }          from './core/router.js'
import { fetchCountries }  from './core/api.js'

// --- COMPONENTS ---
import { initTheme }       from './components/theme.js'
import { initAuth }        from './components/auth.js'
import { initModal }       from './components/modal.js'
import { initProfile }     from './components/profile.js'
import { initToast }       from './components/toast.js'

// --- PAGE ---
import { initExplorer }    from './pages/explorer.js'


async function init() {

  // 1. Tema yüklə (dark/light — ən əvvəl olmalıdır, flicker olmasın)
  initTheme()

  // 2. Auth vəziyyətini yoxla (localStorage-də user varmı?)
  initAuth()

  // 3. Modal və toast komponentlərini hazırla
  initModal()
  initToast()

  // 4. Profil modalını hazırla
  initProfile()

  // 5. API-dən ölkələri çək, state-ə yaz
  const countries = await fetchCountries()
  state.countries = countries
  state.filtered  = countries

  // 6. Explorer səhifəsini işə sal (axtarış, filter, kartlar)
  initExplorer()

  // 7. Router-i başlat (URL dəyişikliklərinə qulaq as)
  router.init()
}

// DOM hazır olduqda başlat
document.addEventListener('DOMContentLoaded', init)