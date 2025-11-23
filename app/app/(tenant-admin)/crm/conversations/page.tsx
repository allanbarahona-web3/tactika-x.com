'use client';

import { useState, useEffect } from 'react';
import { ConversationsList } from '@/src/components/crm/conversations-list';
import { SearchBar } from '@/src/components/crm/search-bar';
import { FilterBar } from '@/src/components/crm/filter-bar';
import { useApi } from '@/src/lib/api';
import { ChannelType } from '@/types/crm';

export default function ConversationsPage() {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<ChannelType | null>(null);
  const [isActiveOnly, setIsActiveOnly] = useState(true);

  const { get } = useApi();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (selectedChannel) params.append('channel', selectedChannel);
        if (isActiveOnly) params.append('isActive', 'true');
        params.append('limit', '50');
        params.append('offset', '0');

        const data = await get(`/crm/conversations?${params.toString()}`);
        setConversations(data.conversations || []);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [selectedChannel, isActiveOnly, get]);

  const filteredConversations = conversations.filter((conv: any) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      conv.channelUsername?.toLowerCase().includes(query) ||
      conv.channelUserId.includes(query) ||
      conv.customer?.name?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header Section */}
      <div className="border-b border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Conversaciones</h1>
            <p className="text-sm text-slate-500 mt-1">
              {filteredConversations.length} conversación{filteredConversations.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <FilterBar
            selectedChannel={selectedChannel}
            onChannelChange={setSelectedChannel}
            isActiveOnly={isActiveOnly}
            onActiveOnlyChange={setIsActiveOnly}
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <ConversationsList
          conversations={filteredConversations}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
