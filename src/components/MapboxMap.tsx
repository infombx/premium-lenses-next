'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!
const LNG = 57.517083
const LAT = -20.155972

export default function MapboxMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    mapboxgl.accessToken = TOKEN

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [LNG, LAT],
      zoom: 14,
      cooperativeGestures: true,
    })

    new mapboxgl.Marker({ color: '#000000' })
      .setLngLat([LNG, LAT])
      .addTo(map)

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => map.remove()
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
