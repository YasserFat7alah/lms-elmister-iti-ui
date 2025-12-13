import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Video, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const LiveSessionCard = ({ session }) => {

  const getStatusConfig = (status) => {
    switch (status) {
      case "live":
        return {
          badge: "bg-red-500 text-white animate-pulse", // نبض أحمر
          text: "Live Now",
          btnColor: "bg-red-600 hover:bg-red-700",
          btnText: "Join Now",
          icon: <Video size={16} />
        };
      case "upcoming":
        return {
          badge: "bg-blue-100 text-blue-700",
          text: "Upcoming",
          btnColor: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50",
          btnText: "Add to Calendar",
          icon: <Calendar size={16} />
        };
      default: // ended
        return {
          badge: "bg-gray-100 text-gray-600",
          text: "Ended",
          btnColor: "bg-gray-900 text-white hover:bg-black",
          btnText: "Watch Recording",
          icon: <PlayCircle size={16} />
        };
    }
  };

  const config = getStatusConfig(session.status);

  return (
    <Card className={`overflow-hidden border-gray-100 transition-all hover:shadow-md ${session.status === 'live' ? 'border-red-200 ring-2 ring-red-50' : ''}`}>

      <div className="relative h-40 w-full">
        <Image
          src={session.image}
          alt={session.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`${config.badge} border-none px-3 py-1`}>
            <span className="flex items-center gap-1.5">
              {session.status === 'live' && <span className="w-2 h-2 rounded-full bg-white animate-ping" />}
              {config.text}
            </span>
          </Badge>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
            <Calendar size={14} /> {session.date}
          </span>
          <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
            <Clock size={14} /> {session.time}
          </span>
        </div>

        <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2 line-clamp-2">
          {session.title}
        </h3>

        <p className="text-sm text-gray-500">
          Teacher: <span className="font-medium text-gray-700">{session.instructor}</span>
        </p>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        {session.status === 'live' ? (
          <Link href={session.joinLink} className="w-full">
            <Button className={`w-full ${config.btnColor} gap-2`}>
              {config.icon} {config.btnText}
            </Button>
          </Link>
        ) : (
          <Button className={`w-full ${config.btnColor} gap-2`}>
            {config.icon} {config.btnText}
          </Button>
        )}
      </CardFooter>

    </Card>
  );
};

export default LiveSessionCard;