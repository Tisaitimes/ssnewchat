
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Send, 
  Image as ImageIcon, 
  Video, 
  Paperclip, 
  Mic, 
  CheckCheck, 
  Clock, 
  X,
  Reply,
  Volume2
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

// Message status types
type MessageStatus = 'sending' | 'delivered' | 'seen' | 'failed';

// Message types that can be sent
type MessageType = 'text' | 'image' | 'video' | 'file' | 'voice';

// Message data structure
interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: MessageStatus;
  type: MessageType;
  replyTo?: string; // ID of the message this is replying to
  attachmentUrl?: string; // URL for attachments if any
}

const Conversation = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      sender: {
        id: 'agent1',
        name: 'Support Agent',
        avatar: 'https://ui-avatars.com/api/?name=Support+Agent',
      },
      status: 'seen',
      type: 'text',
    },
    {
      id: '2',
      content: 'I have a question about my subscription.',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      sender: {
        id: 'customer1',
        name: 'John Doe',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe',
      },
      status: 'delivered',
      type: 'text',
    },
    {
      id: '3',
      content: 'Sure, I can help with that. What specifically do you want to know?',
      timestamp: new Date(Date.now() - 1500000), // 25 minutes ago
      sender: {
        id: 'agent1',
        name: 'Support Agent',
        avatar: 'https://ui-avatars.com/api/?name=Support+Agent',
      },
      status: 'seen',
      type: 'text',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const notificationSound = useRef<HTMLAudioElement | null>(null);

  // Initialize notification sound
  useEffect(() => {
    notificationSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/3005/3005-preview.mp3');
    return () => {
      if (notificationSound.current) {
        notificationSound.current = null;
      }
    };
  }, []);

  // Auto-scroll to the newest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulating receiving a new message every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newIncomingMessage: Message = {
        id: `incoming-${Date.now()}`,
        content: 'This is a new incoming message. How can I assist you further?',
        timestamp: new Date(),
        sender: {
          id: 'agent1',
          name: 'Support Agent',
          avatar: 'https://ui-avatars.com/api/?name=Support+Agent',
        },
        status: 'delivered',
        type: 'text',
      };
      
      setMessages(prev => [...prev, newIncomingMessage]);
      
      // Play sound notification if enabled
      if (soundEnabled && notificationSound.current) {
        notificationSound.current.play().catch(e => console.error("Error playing notification sound:", e));
      }
      
      toast.info('New message received', {
        description: 'You have received a new message from Support Agent',
      });
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [soundEnabled]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Create a new message
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      content: newMessage,
      timestamp: new Date(),
      sender: {
        id: 'customer1',
        name: 'John Doe',
        avatar: 'https://ui-avatars.com/api/?name=John+Doe',
      },
      status: 'sending',
      type: 'text',
      replyTo: replyingTo || undefined,
    };
    
    // Add message to the list
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
    setReplyingTo(null);
    
    // Simulate message delivery status change
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMsg.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1000);
    
    // Simulate message seen status change
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMsg.id ? { ...msg, status: 'seen' } : msg
        )
      );
    }, 3000);
  };

  const getReplyToMessage = (replyId: string | undefined) => {
    if (!replyId) return null;
    return messages.find(msg => msg.id === replyId);
  };

  const handleReply = (messageId: string) => {
    setReplyingTo(messageId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachment = (type: MessageType) => {
    toast.info(`${type.charAt(0).toUpperCase() + type.slice(1)} upload`, {
      description: `${type} attachment feature clicked`,
    });
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
    toast.success(`Sound notifications ${soundEnabled ? 'disabled' : 'enabled'}`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://ui-avatars.com/api/?name=Support+Agent" alt="Support Agent" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Support Agent</h2>
            <p className="text-sm text-muted-foreground">Online • Last seen just now</p>
          </div>
        </div>
        <Button 
          variant={soundEnabled ? "default" : "outline"} 
          size="sm"
          onClick={toggleSound}
        >
          <Volume2 className="h-4 w-4 mr-2" />
          {soundEnabled ? "Sound On" : "Sound Off"}
        </Button>
      </div>

      <Card className="flex-1 overflow-hidden">
        <CardHeader className="p-4 border-b">
          <CardTitle>Conversation</CardTitle>
          <CardDescription>Your chat history with Support Agent</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto h-[calc(100%-8rem)]">
          <div className="flex flex-col space-y-4 p-4">
            {messages.map((message) => {
              const isCurrentUser = message.sender.id === 'customer1';
              const replyToMessage = getReplyToMessage(message.replyTo);
              
              return (
                <div 
                  key={message.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] ${isCurrentUser ? 'order-2' : 'order-1'}`}
                  >
                    {!isCurrentUser && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{message.sender.name}</span>
                      </div>
                    )}
                    
                    {replyToMessage && (
                      <div className={`rounded-lg p-2 mb-1 text-xs ${isCurrentUser ? 'bg-gray-100 dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-800'}`}>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Reply className="h-3 w-3" />
                          <span>Replying to</span>
                        </div>
                        <div className="truncate">{replyToMessage.content}</div>
                      </div>
                    )}
                    
                    <div className={`rounded-lg p-3 ${
                      isCurrentUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <p>{message.content}</p>
                    </div>
                    
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      
                      {isCurrentUser && (
                        <span className="text-xs text-muted-foreground flex items-center">
                          {message.status === 'sending' && <Clock className="h-3 w-3 mr-1" />}
                          {message.status === 'delivered' && <CheckCheck className="h-3 w-3 mr-1 text-blue-500" />}
                          {message.status === 'seen' && <CheckCheck className="h-3 w-3 mr-1 text-green-500" />}
                          {message.status === 'failed' && <X className="h-3 w-3 mr-1 text-red-500" />}
                          {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                        </span>
                      )}
                      
                      <Button 
                        onClick={() => handleReply(message.id)} 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 px-2 text-xs"
                      >
                        <Reply className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        </CardContent>
      </Card>

      <div className="mt-4">
        {replyingTo && (
          <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 rounded-t-md">
            <div className="flex items-center">
              <Reply className="h-4 w-4 mr-2" />
              <span className="text-sm">
                Replying to: {getReplyToMessage(replyingTo)?.content.substring(0, 50)}
                {(getReplyToMessage(replyingTo)?.content.length || 0) > 50 ? '...' : ''}
              </span>
            </div>
            <Button 
              onClick={() => setReplyingTo(null)} 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <div className="flex items-end space-x-2">
          <div className="flex space-x-1">
            <Button 
              onClick={() => handleAttachment('image')}
              variant="outline" 
              size="icon" 
              className="rounded-full h-9 w-9"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => handleAttachment('video')}
              variant="outline" 
              size="icon" 
              className="rounded-full h-9 w-9"
            >
              <Video className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => handleAttachment('file')}
              variant="outline" 
              size="icon" 
              className="rounded-full h-9 w-9"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button 
              onClick={() => handleAttachment('voice')}
              variant="outline" 
              size="icon" 
              className="rounded-full h-9 w-9"
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
          
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 min-h-[5rem] resize-none"
          />
          
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon" 
            className="h-10 w-10"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
