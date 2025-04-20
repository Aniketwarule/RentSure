
import { useNavigate } from "react-router-dom";
import { FileText, DollarSign, User, MessageSquare } from "lucide-react";

export const RecentActivity = () => {
  const navigate = useNavigate();
  
  const activities = [
    {
      id: 1,
      type: "payment",
      title: "Rent Payment Received",
      description: "123 Main Street - $1,200",
      time: "2 hours ago",
      icon: DollarSign
    },
    {
      id: 2,
      type: "document",
      title: "Agreement Signed",
      description: "456 Oak Avenue - Lease Renewal",
      time: "Yesterday",
      icon: FileText
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      description: "From John Tenant regarding maintenance",
      time: "2 days ago",
      icon: MessageSquare
    },
    {
      id: 4,
      type: "user",
      title: "New Tenant",
      description: "Sarah Johnson added to 789 Pine Road",
      time: "1 week ago",
      icon: User
    }
  ];
  
  const getIconColor = (type: string) => {
    switch (type) {
      case "payment": return "text-green-500";
      case "document": return "text-blue-500";
      case "message": return "text-purple-500";
      case "user": return "text-orange-500";
      default: return "text-gray-500";
    }
  };
  
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div 
          key={activity.id}
          className="flex items-start gap-4 p-2 rounded-lg hover:bg-accent cursor-pointer"
          onClick={() => {
            switch (activity.type) {
              case "payment": navigate("/payments"); break;
              case "document": navigate("/agreements"); break;
              case "message": navigate("/messages"); break;
              case "user": navigate("/contacts"); break;
            }
          }}
        >
          <div className={`rounded-full p-2 ${getIconColor(activity.type)} bg-muted`}>
            <activity.icon className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium">{activity.title}</h4>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
          </div>
          <div className="text-xs text-muted-foreground">
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  );
};
