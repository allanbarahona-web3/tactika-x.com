'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mediaApi } from '@/lib/api/client';

interface Media {
  id: string;
  url: string;
  filename: string;
  entityId?: string;
  entityType?: string;
  createdAt: string;
}

export default function MediaPage() {
  const { token } = useAuth();
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!token) return;
    fetchMedia();
  }, [token]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const data = await mediaApi.list(token!);
      setMedia(data?.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load media');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedFile) return;

    try {
      setUploading(true);
      await mediaApi.upload(token, selectedFile);
      fetchMedia();
      setSelectedFile(null);
      // Reset file input
      const input = document.getElementById('file-input') as HTMLInputElement;
      if (input) input.value = '';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm('Are you sure?')) return;
    try {
      await mediaApi.delete(token, id);
      fetchMedia();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete media');
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Media Library</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Upload New Media</h2>
        <form onSubmit={handleUpload} className="flex gap-4">
          <input
            id="file-input"
            type="file"
            onChange={handleFileSelect}
            accept="image/*,application/pdf"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={uploading}
          />
          <button
            type="submit"
            disabled={!selectedFile || uploading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-600">
            Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
          </p>
        )}
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading media...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {media.length === 0 ? (
            <div className="col-span-full bg-white rounded-lg shadow p-12 text-center text-gray-500">
              <p className="text-lg">No media yet</p>
              <p className="text-sm mt-1">Upload your first image to get started</p>
            </div>
          ) : (
            media.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Preview */}
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  {item.url.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                    <img
                      src={item.url}
                      alt={item.filename}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-4xl mb-2">📄</p>
                        <p className="text-xs text-gray-500">
                          {item.filename.split('.').pop()?.toUpperCase()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-900 truncate mb-2">
                    {item.filename}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(item.url)}
                      className="flex-1 px-3 py-2 text-center bg-gray-50 text-gray-700 hover:bg-gray-100 rounded font-medium text-sm transition-colors"
                      title="Copy URL to clipboard"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => window.open(item.url, '_blank')}
                      className="flex-1 px-3 py-2 text-center bg-blue-50 text-blue-600 hover:bg-blue-100 rounded font-medium text-sm transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 px-3 py-2 text-center bg-red-50 text-red-600 hover:bg-red-100 rounded font-medium text-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
