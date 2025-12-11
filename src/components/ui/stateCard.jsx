import { Card } from "@/components/ui/card";

const StateCard = ({ title, Icon, count, color }) => {
  return (
    <Card className={`p-5 bg-gradient-to-br from-${color}-50 to-${color}-100/50 border border-${color}-200`}>
      <div className="flex items-center gap-3">
        <div className={`p-3 bg-${color}-500 rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className={`text-sm text-${color}-600 font-medium`}>{title}</p>
          <h3 className={`text-2xl font-bold text-${color}-900`}>{count}</h3>
        </div>
      </div>
    </Card>
  );
};

export default StateCard;
