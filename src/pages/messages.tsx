import React, { useState } from 'react';
import { NavBar } from '@/components/global/NavBar';
import { Title } from '@/components/global/Title';
import { colors } from '@/styles/colors';
import { ConversationList, Conversation } from '@/components/messages/ConversationList';
import { ConversationDetail, Message } from '@/components/messages/ConversationDetail';

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string | undefined>();
  const [showDetail, setShowDetail] = useState(false);
  const [mockMessages, setMockMessages] = useState<{ [key: string]: Message[] }>({
    '1': [
      {
        id: '1',
        sender: 'system',
        content: 'Début de la conversation',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: '2',
        sender: 'other',
        content: "Bonjour, je suis intéressé par votre trajet. C'est possible d'avoir une place ?",
        timestamp: new Date(Date.now() - 3000000),
        type: 'request',
        status: 'pending',
      },
    ],
    '2': [
      {
        id: '1',
        sender: 'system',
        content: 'Début de la conversation',
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: '2',
        sender: 'other',
        content: "J'aimerais réserver une place pour demain matin.",
        timestamp: new Date(Date.now() - 82800000),
        type: 'request',
        status: 'accepted',
      },
      {
        id: '3',
        sender: 'user',
        content: "Bien sûr ! Rendez-vous à 8h15 sur le parking.",
        timestamp: new Date(Date.now() - 79200000),
      },
    ],
  });

  // Mock data - à remplacer par des vraies données de l'API
  const conversations: Conversation[] = [
    {
      id: '1',
      user: {
        name: 'John Doe',
      },
      lastMessage: "Bonjour, je suis intéressé par votre trajet. C'est possible d'avoir une place ?",
      date: new Date(),
      status: 'upcoming',
      tripPeriod: '23 mars - 13 avril',
    },
    {
      id: '2',
      user: {
        name: 'Alice Martin',
      },
      lastMessage: "J'aimerais réserver une place pour demain matin.",
      date: new Date(Date.now() - 86400000), // hier
      status: 'current',
      tripPeriod: '19 fév - 23 mars',
    },
    {
      id: '3',
      user: {
        name: 'Thomas Bernard',
      },
      lastMessage: "D'accord pour demain, rendez-vous sur le parking.",
      date: new Date(Date.now() - 172800000), // avant-hier
      status: 'completed',
      tripPeriod: '16 jan - 19 fév',
    },
  ];

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    setShowDetail(true);
  };

  const handleBack = () => {
    setShowDetail(false);
  };

  const handleAccept = (messageId: string, comment: string) => {
    // Mise à jour du message avec le statut accepté
    const updatedMessages = { ...mockMessages };
    const conversationId = selectedConversation;
    
    if (conversationId && updatedMessages[conversationId]) {
      const messages = updatedMessages[conversationId];
      const messageIndex = messages.findIndex(m => m.id === messageId);
      
      if (messageIndex !== -1) {
        // Mettre à jour le statut du message
        messages[messageIndex] = {
          ...messages[messageIndex],
          status: 'accepted',
          comment: comment || undefined
        };

        // Ajouter un message de statut
        messages.push({
          id: `status-${Date.now()}`,
          sender: 'system',
          content: 'Trajet accepté',
          timestamp: new Date(),
          type: 'status'
        });

        // Si un commentaire est fourni, ajouter un message de réponse
        if (comment) {
          messages.push({
            id: `response-${Date.now()}`,
            sender: 'user',
            content: comment,
            timestamp: new Date(),
            type: 'response'
          });
        }

        setMockMessages(updatedMessages);
      }
    }
  };

  const handleReject = (messageId: string, comment: string) => {
    // Mise à jour du message avec le statut refusé
    const updatedMessages = { ...mockMessages };
    const conversationId = selectedConversation;
    
    if (conversationId && updatedMessages[conversationId]) {
      const messages = updatedMessages[conversationId];
      const messageIndex = messages.findIndex(m => m.id === messageId);
      
      if (messageIndex !== -1) {
        // Mettre à jour le statut du message
        messages[messageIndex] = {
          ...messages[messageIndex],
          status: 'rejected',
          comment: comment || undefined
        };

        // Ajouter un message de statut
        messages.push({
          id: `status-${Date.now()}`,
          sender: 'system',
          content: 'Trajet refusé',
          timestamp: new Date(),
          type: 'status'
        });

        // Si un commentaire est fourni, ajouter un message de réponse
        if (comment) {
          messages.push({
            id: `response-${Date.now()}`,
            sender: 'user',
            content: comment,
            timestamp: new Date(),
            type: 'response'
          });
        }

        setMockMessages(updatedMessages);
      }
    }
  };

  const selectedUser = selectedConversation 
    ? conversations.find(c => c.id === selectedConversation)?.user.name 
    : '';

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1622]">
      <Title
        texteNormal="Mes"
        texteGras="messages"
      />

      <div className="flex-1 flex">
        {/* Liste des conversations - toujours visible sur desktop, masquée sur mobile si détail affiché */}
        <div className={`w-full lg:w-96 border-r border-[#2B4D63]/30 ${showDetail ? 'hidden lg:block' : ''}`}>
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversation}
            onSelect={handleSelectConversation}
          />
        </div>

        {/* Détail de la conversation - plein écran sur mobile, côté droit sur desktop */}
        <div className={`flex-1 ${!showDetail ? 'hidden lg:block' : ''}`}>
          {selectedConversation ? (
            <ConversationDetail
              userName={selectedUser || ''}
              messages={mockMessages[selectedConversation] || []}
              onBack={handleBack}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              <p>Sélectionnez une conversation</p>
            </div>
          )}
        </div>
      </div>

      <NavBar />
    </div>
  );
}
