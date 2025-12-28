# Guide de Déploiement - Pinyin Reader

## Comment vérifier qu'un déploiement fonctionne

### 1. Attendre la fin du workflow GitHub Actions
- Aller sur: https://github.com/Ganaga/pinyin-reader/actions
- Vérifier que le workflow "Deploy to GitHub Pages" est ✅ (vert)
- Attendre 2-3 minutes après la fin du workflow

### 2. Vider le cache avant de tester

**Option A - Hard Refresh (Recommandé)**
- Chrome/Edge: `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)
- Firefox: `Ctrl + Shift + R` (Windows) ou `Cmd + Shift + R` (Mac)

**Option B - Mode Navigation Privée**
- Ouvrir une fenêtre en mode privé/incognito
- Aller sur https://ganaga.github.io/pinyin-reader/

**Option C - DevTools (Pour développeurs)**
1. Ouvrir DevTools (F12)
2. Onglet "Network"
3. Cocher "Disable cache"
4. Rafraîchir la page (F5)

### 3. Vérifier la version déployée

Ouvrir la console DevTools (F12) et taper:
```javascript
// Méthode 1: Voir le HTML
document.documentElement.outerHTML.substring(0, 200)

// Méthode 2: Voir uniquement le commentaire de version
document.head.innerHTML.match(/Build: (.*?) -->/)[0]
```

La version doit correspondre à la dernière version committée.

### 4. Vérifier l'absence d'erreurs

Dans l'onglet Console (F12), il ne doit PAS y avoir:
- ❌ `404 (Not Found)` pour `/src/main.js`
- ❌ `404 (Not Found)` pour des icônes PNG
- ❌ Erreurs de Service Worker

Il DOIT y avoir:
- ✅ Chargement de `/pinyin-reader/assets/main-*.js`
- ✅ `Service Worker registered successfully`

## Problèmes courants et solutions

### Problème: Le site charge une ancienne version

**Cause**: Cache du navigateur ou du CDN GitHub

**Solutions**:
1. **Immediate**: Hard refresh (`Ctrl + Shift + R`)
2. **Permanent**: Attendre 5-10 minutes que le CDN se mette à jour
3. **Développeur**: Vider complètement le cache du site dans DevTools → Application → Clear storage

### Problème: Erreur 404 sur assets/main-*.js

**Cause**: Le fichier index.html référence un ancien bundle qui n'existe plus

**Solutions**:
1. Vérifier que le workflow GitHub Actions a bien réussi
2. Hard refresh pour obtenir le nouveau index.html
3. Si le problème persiste, vérifier que GitHub Pages est configuré sur "GitHub Actions" (pas "Deploy from branch")

### Problème: Service Worker ne se met pas à jour

**Cause**: Le Service Worker cache lui-même l'ancienne version

**Solutions**:
1. DevTools (F12) → Application → Service Workers
2. Cliquer sur "Unregister" pour le service worker
3. Rafraîchir la page (F5)
4. Le nouveau service worker s'installera

## Workflow de déploiement recommandé

### 1. Développement local
```bash
npm run dev
# Tester toutes les fonctionnalités
```

### 2. Build et test local
```bash
npm run build
npm run preview
# Tester le build de production localement
```

### 3. Commit et push
```bash
git add .
git commit -m "Description des changements"
git push
```

### 4. Vérification du déploiement
1. Attendre 2-3 minutes
2. Ouvrir https://github.com/Ganaga/pinyin-reader/actions
3. Vérifier que le workflow est vert ✅
4. **Mode privé/incognito**: Ouvrir https://ganaga.github.io/pinyin-reader/
5. Vérifier la console (F12) - aucune erreur 404
6. Tester les fonctionnalités principales

### 5. En cas de problème
1. Ne PAS pousser de nouveau commit immédiatement
2. Vérifier la console pour comprendre l'erreur
3. Tester en mode privé avec cache désactivé
4. Si le problème est du cache: attendre 5-10 minutes
5. Si le problème est réel: corriger et re-déployer

## Checklist de déploiement

- [ ] Le workflow GitHub Actions est vert ✅
- [ ] Testé en mode navigation privée
- [ ] Aucune erreur 404 dans la console
- [ ] Service Worker s'enregistre correctement
- [ ] La version dans le HTML correspond à la dernière
- [ ] Les fonctionnalités principales fonctionnent:
  - [ ] Traduction du texte
  - [ ] Sauts de ligne préservés
  - [ ] Collection (ajout/suppression/partage)
  - [ ] Library (phrases HSK)
  - [ ] Mode pinyin avec suggestions

## Notes techniques

### Vite et le bundling
- Vite génère des noms de fichiers avec hash: `main-AbC123.js`
- Chaque build peut générer un hash différent
- Le `index.html` construit référence toujours le bon hash
- Si vous voyez une 404 sur `main-*.js`, c'est que le navigateur a le mauvais `index.html`

### GitHub Pages et le cache
- GitHub Pages utilise un CDN qui cache agressivement
- Le cache peut prendre 5-10 minutes à se mettre à jour
- Les fichiers avec hash dans le nom (`main-AbC123.js`) sont cachés indéfiniment (car uniques)
- Le `index.html` est caché mais devrait se rafraîchir rapidement

### Service Worker
- Le Service Worker cache les assets pour le mode offline
- Il se met à jour automatiquement quand le `CACHE_NAME` change (dans `sw.js`)
- En développement, toujours désactiver le cache dans DevTools

## Contact

Pour des problèmes de déploiement persistants:
1. Vérifier les GitHub Actions logs
2. Ouvrir une issue sur https://github.com/Ganaga/pinyin-reader/issues
