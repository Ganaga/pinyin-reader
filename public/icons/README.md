# Icons pour PWA - Pinyin Reader

## Icônes requises

Pour que la PWA fonctionne correctement, vous devez créer les icônes suivantes:

- `icon-72x72.png` (72x72 pixels)
- `icon-96x96.png` (96x96 pixels)
- `icon-128x128.png` (128x128 pixels)
- `icon-144x144.png` (144x144 pixels)
- `icon-152x152.png` (152x152 pixels)
- `icon-192x192.png` (192x192 pixels)
- `icon-384x384.png` (384x384 pixels)
- `icon-512x512.png` (512x512 pixels)

## Méthode 1: Utiliser un outil en ligne (Recommandé)

### Option A: PWA Asset Generator
1. Allez sur https://www.pwabuilder.com/imageGenerator
2. Uploadez votre logo/image (minimum 512x512px recommandé)
3. Téléchargez le pack d'icônes généré
4. Placez les fichiers dans ce dossier `client/icons/`

### Option B: RealFaviconGenerator
1. Allez sur https://realfavicongenerator.net/
2. Uploadez votre image source
3. Configurez les options pour PWA
4. Téléchargez le package
5. Extrayez les icônes dans ce dossier

## Méthode 2: Créer manuellement avec un éditeur d'images

### Utiliser GIMP, Photoshop, ou similaire:
1. Créez une image carrée de 512x512 pixels
2. Dessinez votre logo/icône
3. Exportez en PNG
4. Redimensionnez pour chaque taille requise

### Utiliser ImageMagick (ligne de commande):
```bash
# Depuis une image source icon.png (512x512)
convert icon.png -resize 72x72 icon-72x72.png
convert icon.png -resize 96x96 icon-96x96.png
convert icon.png -resize 128x128 icon-128x128.png
convert icon.png -resize 144x144 icon-144x144.png
convert icon.png -resize 152x152 icon-152x152.png
convert icon.png -resize 192x192 icon-192x192.png
convert icon.png -resize 384x384 icon-384x384.png
convert icon.png -resize 512x512 icon-512x512.png
```

## Design suggestions

Pour l'application Pinyin Reader, voici quelques idées de design:

1. **Style minimaliste:**
   - Fond bleu/violet (#737cfa - la couleur du thème)
   - Caractère chinois blanc au centre (par exemple: 汉 ou 语)
   - Bordures arrondies

2. **Style éducatif:**
   - Un livre ouvert stylisé
   - Caractères chinois avec notation pinyin
   - Couleurs vives et accueillantes

3. **Style moderne:**
   - Forme géométrique abstraite
   - Dégradé de bleu (#737cfa) vers violet
   - Initiales "PR" (Pinyin Reader)

## Icône SVG de base (icon.svg)

Un fichier `icon.svg` est fourni dans ce dossier comme point de départ.
Vous pouvez le modifier avec Inkscape, Adobe Illustrator, ou tout éditeur SVG.

## Test

Une fois les icônes créées, testez votre PWA:
1. Ouvrez l'application dans Chrome/Edge
2. Ouvrez DevTools > Application > Manifest
3. Vérifiez que toutes les icônes sont chargées correctement
4. Testez l'installation de la PWA (bouton "Installer l'application")
