# Alexis Saucede — Site Vitrine

Site vitrine pour **Alexis Saucede**, coach sportif personnel basé à Saint-Mandé (94).

## Stack technique

- **React 18** + **Vite**
- **Tailwind CSS** — design system sombre personnalisé
- **Three.js** + **@react-three/fiber** — modèles 3D du logo
- **Framer Motion** — animations et transitions
- **Lenis** — smooth scroll
- **Formspree** — formulaire de contact
- **Lucide React** — icônes

## Fonctionnalités

- Hero avec logo 3D animé (rotation + parallaxe au scroll)
- Section méthode, ingrédients, transformations, avis Google
- FAQ accordéon
- Questionnaire de contact complet (Formspree)
- Tracking `form-submit` via `dataLayer` (Google Tag Manager)
- Design 100% responsive

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Variables d'environnement

Créer un fichier `.env` à la racine :

```env
VITE_FORMSPREE_ID=xrevboob
VITE_GOOGLE_PLACES_API_KEY=
VITE_GOOGLE_PLACE_ID=
```

## Déploiement

Le site est déployé sur **Vercel** avec le domaine personnalisé `alexissaucede.com`.
