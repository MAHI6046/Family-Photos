'use client'

import { useState } from 'react'
import { ThemeToggle } from './components/ThemeToggle'
import { PhotoGallery } from './components/PhotoGallery'
import { UploadModal } from './components/UploadModal'

const FAMILY_SECTIONS = [
  'Mom & Dad',
  'Mahender & Sahithi',
  'Advithi',
  'Shreyas',
  'Maneesh & Tejasri',
]

export default function Home() {
  const [selectedSection, setSelectedSection] = useState(FAMILY_SECTIONS[0])
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleUploadSuccess = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <main className="min-h-screen dignified-bg">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header with Main Photo */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Main Hero Photo */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
              <img
                src="/main-photo.jpg"
                alt="Family Photo"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Header Text */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Family Photos Gallery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Preserving precious memories together
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700">
            {FAMILY_SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`px-6 py-3 font-medium text-lg whitespace-nowrap transition-colors relative ${
                  selectedSection === section
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {section}
                {selectedSection === section && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
          {/* External Gallery Link for Maneesh & Tejasri */}
          {selectedSection === 'Maneesh & Tejasri' && (
            <a
              href="https://site.fotoowl.ai/sahilmakhaniphotography/gallery/195813?pass_key=2649"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span>Browse Wedding Gallery</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          
          {/* Upload Button */}
          <button
            onClick={() => setUploadModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2 ml-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Photos</span>
          </button>
        </div>

        {/* Photo Gallery */}
        <div key={refreshKey}>
          <PhotoGallery section={selectedSection} />
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        section={selectedSection}
        onUploadSuccess={handleUploadSuccess}
      />
    </main>
  )
}

