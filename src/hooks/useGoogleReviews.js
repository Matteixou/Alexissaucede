import { useState, useEffect } from 'react'

/**
 * Récupère les avis Google via la Places API (v1).
 * Retourne null si la clé / le Place ID ne sont pas configurés —
 * Reviews.jsx retombera sur les avis statiques dans ce cas.
 *
 * Google Cloud Console :
 *  - Activer "Places API (New)"
 *  - Restreindre la clé au domaine de production
 */
export default function useGoogleReviews() {
  const [data, setData]       = useState(null)   // { reviews, rating, totalRatings }
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const apiKey  = import.meta.env.VITE_GOOGLE_PLACES_API_KEY
    const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID

    if (!apiKey || !placeId) {
      setLoading(false)
      return
    }

    fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        'X-Goog-Api-Key':  apiKey,
        'X-Goog-FieldMask': 'reviews,rating,userRatingCount',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`Places API ${res.status}`)
        return res.json()
      })
      .then(json => {
        setData({
          reviews:      json.reviews      ?? [],
          rating:       json.rating       ?? null,
          totalRatings: json.userRatingCount ?? null,
        })
        setLoading(false)
      })
      .catch(err => {
        console.warn('Google Places API :', err.message)
        setError(err)
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
