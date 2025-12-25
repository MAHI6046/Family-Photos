'use client'

import { useState, useEffect } from 'react'
import { DeleteConfirmModal } from './DeleteConfirmModal'

interface Photo {
  id: string
  filename: string
  section: string
}

interface PhotoGalleryProps {
  section: string
}

export function PhotoGallery({ section }: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null)

  useEffect(() => {
    fetchPhotos()
  }, [section])

  const fetchPhotos = async () => {
    try {
      const response = await fetch(`/api/photos?section=${encodeURIComponent(section)}`)
      if (response.ok) {
        const data = await response.json()
        setPhotos(data.photos || [])
      }
    } catch (error) {
      console.error('Error fetching photos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (password: string) => {
    if (!photoToDelete) return

    const response = await fetch('/api/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        section,
        filename: photoToDelete.filename,
        password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete photo')
    }

    // Refresh the photo list
    await fetchPhotos()
    setPhotoToDelete(null)
  }

  const handleDeleteClick = (e: React.MouseEvent, photo: Photo) => {
    e.stopPropagation() // Prevent opening the photo view
    setPhotoToDelete(photo)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No photos yet. Add some memories!
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="photo-card rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md cursor-pointer relative group"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative aspect-square">
              <img
                src={`/photos/${section}/${photo.filename}`}
                alt={photo.filename}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Delete Button - appears on hover */}
              <button
                onClick={(e) => handleDeleteClick(e, photo)}
                className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                aria-label="Delete photo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 p-2 bg-black bg-opacity-50 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={`/photos/${section}/${selectedPhoto.filename}`}
              alt={selectedPhoto.filename}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {photoToDelete && (
        <DeleteConfirmModal
          isOpen={!!photoToDelete}
          onClose={() => setPhotoToDelete(null)}
          onConfirm={handleDelete}
          filename={photoToDelete.filename}
        />
      )}
    </>
  )
}

