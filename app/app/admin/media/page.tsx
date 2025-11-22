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
      <h1 className="text-2xl font-semibold text-gray-900">Media Library</h1>
      <p className="text-sm text-gray-500 mt-1 mb-8">Manage and upload your files</p>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Upload Files</h2>
        <form onSubmit={handleUpload} className="flex gap-3">
          <input
            id="file-input"
            type="file"
            onChange={handleFileSelect}
            accept="image/*,application/pdf"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors text-sm"
            disabled={uploading}
          />
          <button
            type="submit"
            disabled={!selectedFile || uploading}
            className="px-6 py-2.5 bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white rounded-lg font-medium text-sm transition-colors"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        {selectedFile && (
          <p className="mt-2 text-xs text-gray-600">
            Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
          </p>
        )}
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm font-medium">Loading media</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {media.length === 0 ? (
            <div className="col-span-full bg-white border border-gray-200 rounded-lg p-12 text-center">
              <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="text-sm font-medium text-gray-900">No media</p>
              <p className="text-xs text-gray-500 mt-1">Upload your first file</p>
            </div>
          ) : (
            media.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
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
                        <p className="text-3xl mb-2">📄</p>
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
                      className="flex-1 px-3 py-2 text-center text-gray-600 hover:text-gray-900 rounded text-xs font-medium transition-colors"
                      title="Copy URL"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => window.open(item.url, '_blank')}
                      className="flex-1 px-3 py-2 text-center text-gray-600 hover:text-gray-900 rounded text-xs font-medium transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 px-3 py-2 text-center text-red-600 hover:text-red-700 rounded text-xs font-medium transition-colors"
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
