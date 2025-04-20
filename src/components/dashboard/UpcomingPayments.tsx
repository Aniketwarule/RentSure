
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const UpcomingPayments = () => {
  // Sample data for upcoming payments
  const payments = [
    {
      id: 1,
      property: "123 Main Street",
      amount: 1800,
      dueDate: "2025-05-01",
      status: "upcoming",
      daysLeft: 16
    },
    {
      id: 2,
      property: "456 Oak Avenue",
      amount: 2400,
      dueDate: "2025-04-25",
      status: "upcoming",
      daysLeft: 10
    },
    {
      id: 3,
      property: "789 Pine Road",
      amount: 1500,
      dueDate: "2025-05-15",
      status: "upcoming",
      daysLeft: 30
    }
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressColor = (daysLeft: number) => {
    if (daysLeft <= 7) return "bg-red-500";
    if (daysLeft <= 14) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <div key={payment.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{payment.property}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarIcon className="h-3 w-3" />
                <span>Due {formatDate(payment.dueDate)}</span>
              </div>
            </div>
            <span className="font-semibold">${payment.amount}</span>
          </div>
          <div className="flex items-center gap-2">
            <Progress 
              value={100 - (payment.daysLeft / 30) * 100} 
              className={`h-2 ${getProgressColor(payment.daysLeft)}`}
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {payment.daysLeft} days left
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
