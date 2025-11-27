import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";


const CourseCard = () => {
  return (
    <Card className="max-w-sm mx-auto">

        <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>This is a description of the card.</CardDescription>
        </CardHeader>

        <CardContent>
            <p>
                This is the main content of the card. You can put text, images, or any other React components here.
            </p>
        </CardContent>

        <CardFooter>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Action
            </button>
        </CardFooter>
    </Card>
  )
}

export default CourseCard;