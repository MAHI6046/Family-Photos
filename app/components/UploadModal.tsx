'use client'

import { useState, useRef } from 'react'

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  section: string
  onUploadSuccess: () => void
}

export function UploadModal({
  isOpen,
  onClose,
  section,
  onUploadSuccess,
}: UploadModalProps) {
  const [password, setPassword] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
      setError('')
    }
  }

  const handleUpload = async () => {
    if (!password) {
      setError('Please enter password')
      return
    }

    if (files.length === 0) {
      setError('Please select at least one photo')
      return
    }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('password', password)
      formData.append('section', section)

      files.forEach((file) => {
        formData.append('photos', file)
      })

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      // ✅ SAFE response handling (fixes JSON error)
      let data: any = {}
      const text = await response.text()

      if (text) {
        try {
          data = JSON.parse(text)
        } catch {
          data = {}
        }
      }

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      // Reset form
      setPassword('')
      setFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      onUploadSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to upload photos')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Upload Photos – {section}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700"
            />
          </div>

          {/* File input */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Photos
            </label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-lg border px-4 py-2 dark:bg-gray-700"
            />
            {files.length > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                {files.length} file(s) selected
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-300 bg-red-100 px-4 py-2 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={uploading}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {uploading ? 'Uploading…' : 'Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
