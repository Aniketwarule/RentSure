
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { MessageThread } from "@/components/messaging/MessageThread";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, PlusCircle, Filter } from "lucide-react";
import { toast } from "sonner";

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<number | null>(1); // Default to first contact
  const [messages, setMessages] = useState<Record<number, any[]>>({
    1: [
      {
        id: 1,
        content: "Hello, I'm having an issue with the heating in my apartment.",
        sender: "tenant",
        timestamp: "2025-04-14T14:30:00",
        status: "read"
      },
      {
        id: 2,
        content: "Hi there, I'll have someone look at it tomorrow. What time works for you?",
        sender: "landlord",
        timestamp: "2025-04-14T14:45:00",
        status: "read"
      },
      {
        id: 3,
        content: "Around 2pm would be perfect. Thank you!",
        sender: "tenant",
        timestamp: "2025-04-14T15:00:00",
        status: "read"
      },
      {
        id: 4,
        content: "Great, I've scheduled the maintenance visit for tomorrow at 2pm. The technician will call you before arriving.",
        sender: "landlord",
        timestamp: "2025-04-14T15:10:00",
        status: "delivered"
      }
    ],
    2: [
      {
        id: 1,
        content: "Good morning, just a reminder that rent is due next week.",
        sender: "landlord",
        timestamp: "2025-04-13T10:00:00",
        status: "read"
      },
      {
        id: 2,
        content: "Thanks for the reminder. I've set up the automatic payment already.",
        sender: "tenant",
        timestamp: "2025-04-13T10:30:00",
        status: "read"
      }
    ],
    3: [
      {
        id: 1,
        content: "Hello, I wanted to ask about the possibility of renewing my lease which ends next month.",
        sender: "tenant",
        timestamp: "2025-04-10T09:15:00",
        status: "read"
      },
      {
        id: 2,
        content: "Hi Michael, I'd be happy to discuss renewal options. Would you like to keep the same terms or are you looking for any changes?",
        sender: "landlord",
        timestamp: "2025-04-10T11:30:00",
        status: "read"
      }
    ]
  });
  
  // Mock contacts
  const contacts = [
    {
      id: 1,
      name: "John Smith",
      avatar: "",
      property: "123 Main Street, Apt 4B",
      role: "tenant",
      lastMessage: "Great, I've scheduled the maintenance visit for tomorrow at 2pm.",
      lastMessageTime: "2025-04-14T15:10:00",
      unreadCount: 0
    },
    {
      id: 2,
      name: "Emily Johnson",
      avatar: "",
      property: "456 Oak Avenue",
      role: "tenant",
      lastMessage: "Thanks for the reminder. I've set up the automatic payment already.",
      lastMessageTime: "2025-04-13T10:30:00",
      unreadCount: 0
    },
    {
      id: 3,
      name: "Michael Brown",
      avatar: "",
      property: "789 Pine Road",
      role: "tenant",
      lastMessage: "Hi Michael, I'd be happy to discuss renewal options.",
      lastMessageTime: "2025-04-10T11:30:00",
      unreadCount: 0
    }
  ];
  
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.property.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendMessage = async (content: string, attachments?: File[]) => {
    if (!selectedContact) return;
    
    try {
      // Simulate sending message
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newMessage = {
        id: Date.now(),
        content,
        sender: "landlord",
        timestamp: new Date().toISOString(),
        status: "sent",
        attachments: attachments?.map(file => ({
          type: file.type.startsWith("image/") ? "image" : "file",
          name: file.name,
          url: URL.createObjectURL(file)
        }))
      };
      
      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedContact]: [...(prevMessages[selectedContact] || []), newMessage]
      }));
      
      // Simulate message status updates
      setTimeout(() => {
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages[selectedContact]];
          const lastIndex = updatedMessages.length - 1;
          updatedMessages[lastIndex] = { ...updatedMessages[lastIndex], status: "delivered" };
          return {
            ...prevMessages,
            [selectedContact]: updatedMessages
          };
        });
      }, 1000);
      
      setTimeout(() => {
        setMessages(prevMessages => {
          const updatedMessages = [...prevMessages[selectedContact]];
          const lastIndex = updatedMessages.length - 1;
          updatedMessages[lastIndex] = { ...updatedMessages[lastIndex], status: "read" };
          return {
            ...prevMessages,
            [selectedContact]: updatedMessages
          };
        });
      }, 2000);
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
      return Promise.reject(error);
    }
  };
  
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 172800) return "yesterday";
    
    return date.toLocaleDateString();
  };
  
  const handleSelectContact = (contactId: number) => {
    setSelectedContact(contactId);
  };
  
  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)]">
              <h1 className="text-3xl font-bold mb-6">Messages</h1>
              
              <div className="flex h-full border rounded-lg overflow-hidden">
                {/* Contacts sidebar */}
                <div className="w-full md:w-80 flex-shrink-0 border-r">
                  <div className="p-3 border-b">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search conversations..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <ScrollArea className="h-[calc(100%-60px)]">
                    {filteredContacts.length > 0 ? (
                      filteredContacts.map(contact => (
                        <div
                          key={contact.id}
                          className={`p-3 border-b cursor-pointer hover:bg-muted/50 ${
                            selectedContact === contact.id ? "bg-muted" : ""
                          }`}
                          onClick={() => handleSelectContact(contact.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                              <AvatarFallback>
                                {contact.name.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium truncate">{contact.name}</p>
                                <span className="text-xs text-muted-foreground">
                                  {formatTimeAgo(contact.lastMessageTime)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">
                                {contact.property}
                              </p>
                              <p className="text-xs truncate">
                                {contact.lastMessage}
                              </p>
                            </div>
                          </div>
                          
                          {contact.unreadCount > 0 && (
                            <div className="flex justify-end mt-1">
                              <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                {contact.unreadCount}
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-muted-foreground">No contacts found</p>
                      </div>
                    )}
                  </ScrollArea>
                </div>
                
                {/* Message thread */}
                <div className="hidden md:flex flex-col flex-1">
                  {selectedContact ? (
                    <MessageThread
                      contactName={contacts.find(c => c.id === selectedContact)?.name || ""}
                      contactEmail={contacts.find(c => c.id === selectedContact)?.property}
                      messages={messages[selectedContact] || []}
                      currentUser="landlord"
                      onSendMessage={handleSendMessage}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <p className="text-muted-foreground mb-4">Select a contact to start messaging</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;
