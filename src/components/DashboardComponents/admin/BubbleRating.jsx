"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const BubbleRating = () => {

    const data = [
        { label: "Student Satisfaction", value: 90, color: "#38bdf8" },
        { label: "Course Completion", value: 75, color: "#fbbf24" },
        { label: "Teacher Activity", value: 85, color: "#a78bfa" },
        { label: "Parent Engagement", value: 70, color: "#f87171" },
      ];

    return (
        <Card className="w-full p-4">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Your Rating</CardTitle>
            <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet</p>
          </CardHeader>
    
          <CardContent className="flex items-center gap-6 p-6">
            <div className="relative h-48 w-48">
              {data.map((item, i) => (
                <div
                  key={i}
                  className="absolute flex items-center justify-center text-white font-bold rounded-full shadow-md"
                  style={{
                    width: `${item.value / 1.8}px`,
                    height: `${item.value / 1.8}px`,
                    backgroundColor: item.color,
                    top: i === 0 ? "10px" : i === 1 ? "80px" : "40px",
                    left: i === 0 ? "80px" : i === 1 ? "-10px" : "40px",
                  }}
                >
                  <span className="text-sm">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      );
}

export default BubbleRating