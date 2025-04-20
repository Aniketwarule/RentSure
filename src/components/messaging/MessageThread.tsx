
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  PaperclipIcon, 
  SendIcon, 
  ImageIcon, 
  FileIcon, 
  SmileIcon,
  CheckIcon,
  Clock 
} from "lucide-react";
import { toast } from "sonner";

interface MessageProps {
  id: number;
  content: string;
  sender: "landlord" | "tenant";
  timestamp: string;
  status: "sent" | "delivered" | "read";
  attachments?: { type: "image" | "file"; name: string; url: string }[];
}

interface MessageThreadProps {
  contactName: string;
  contactEmail?: string;
  contactAvatar?: string;
  messages: MessageProps[];
  currentUser: "landlord" | "tenant";
  onSendMessage: (content: string, attachments?: File[]) => Promise<void>;
}

export function MessageThread({
  contactName,
  contactEmail,
  contactAvatar,
  messages,
  currentUser,
  onSendMessage
}: MessageThreadProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!newMessage.trim() && selectedFiles.length === 0) return;
    
    setIsSubmitting(true);
    
    try {
      await onSendMessage(newMessage, selectedFiles);
      setNewMessage("");
      setSelectedFiles([]);
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // Add selected files to the state
    const newFiles = Array.from(files);
    setSelectedFiles(prev => [...prev, ...newFiles]);
  };
  
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const openFileSelector = () => {
    fileInputRef.current?.click();
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "read":
        return <CheckIcon className="h-3 w-3 text-blue-500" />;
      case "delivered":
        return <CheckIcon className="h-3 w-3 text-gray-500" />;
      case "sent":
        return <Clock className="h-3 w-3 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="border-b p-3">
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={contactAvatar} alt={contactName} />
            <AvatarFallback>
              {contactName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <CardTitle className="text-base">{contactName}</CardTitle>
            {contactEmail && (
              <p className="text-xs text-muted-foreground">{contactEmail}</p>
            )}
          </div>
        </div>
      </CardHeader>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isCurrentUser = message.sender === currentUser;
            
            return (
              <div 
                key={message.id} 
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] ${isCurrentUser ? "order-2" : "order-1"}`}>
                  {!isCurrentUser && (
                    <Avatar className="h-6 w-6 mr-2 mb-1">
                      <AvatarImage src={contactAvatar} alt={contactName} />
                      <AvatarFallback>
                        {contactName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`rounded-lg p-3 text-sm ${
                      isCurrentUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    
                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {message.attachments.map((attachment, i) => (
                          <div key={i} className="rounded overflow-hidden">
                            {attachment.type === "image" ? (
                              <img 
                                src={attachment.url} 
                                alt={attachment.name} 
                                className="h-32 w-full object-cover" 
                              />
                            ) : (
                              <div className="flex items-center bg-background/50 rounded p-2">
                                <FileIcon className="h-4 w-4 mr-2" />
                                <span className="text-xs truncate">{attachment.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className={`flex items-center mt-1 text-xs text-muted-foreground ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                    <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {isCurrentUser && (
                      <span className="ml-1">
                        {getStatusIcon(message.status)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Selected files preview */}
      {selectedFiles.length > 0 && (
        <div className="px-4 py-2 border-t flex gap-2 overflow-x-auto">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative group">
              <div className="flex items-center bg-muted rounded-md p-2 pr-6">
                {file.type.startsWith("image/") ? (
                  <ImageIcon className="h-4 w-4 mr-2" />
                ) : (
                  <FileIcon className="h-4 w-4 mr-2" />
                )}
                <span className="text-xs max-w-[100px] truncate">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-1 -right-1 bg-background border rounded-full p-0.5"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
      
      <CardFooter className="border-t p-3">
        <div className="flex items-end gap-2 w-full">
          <Textarea
            placeholder="Type a message..."
            className="min-h-[60px] flex-1 resize-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
          />
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={openFileSelector}
              disabled={isSubmitting}
            >
              <PaperclipIcon className="h-5 w-5" />
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              multiple 
              className="hidden" 
            />
            <Button
              type="button"
              size="icon"
              onClick={handleSendMessage}
              disabled={isSubmitting || (!newMessage.trim() && selectedFiles.length === 0)}
            >
              <SendIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
