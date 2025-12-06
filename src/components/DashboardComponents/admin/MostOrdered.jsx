"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";


const MostOrdered = () => {

    const data = [
        { name: "Mathematics 101", amount: 120, icon: "/imgs/math.png" },
        { name: "English Literature", amount: 95, icon: "/imgs/english.png" },
        { name: "Physics Basics", amount: 80, icon: "/imgs/physics.png" },
        { name: "Art & Creativity", amount: 70, icon: "/imgs/art.png" },
      ];


    return (
        <Card className="w-full p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Most Ordered Items
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Based on last 7 days statistics
            </p>
          </CardHeader>
    
          <CardContent className="space-y-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border-b"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={item.icon}
                    width={35}
                    height={35}
                    className="rounded-full"
                    alt={item.name}
                  />
                  <span className="font-medium">{item.name}</span>
                </div>
                <span className="text-sm font-semibold">{item.amount}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      );
}

export default MostOrdered