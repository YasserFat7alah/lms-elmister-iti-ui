import { Card } from '@/components/ui/card'
import {  Users,  UserCheck,  GraduationCap,  Baby} from "lucide-react";
import React from 'react'

const UserStateCards = ({users , parents , teachers , students}) => {
  return (
    <div className="grid md:grid-cols-4 gap-4">
            <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">All Users</p>
                  <h3 className="text-2xl font-bold text-blue-900">{users.length}</h3>
                </div>
              </div>
            </Card>
    
            <Card className="p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <Baby className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-600 font-medium">Parents</p>
                  <h3 className="text-2xl font-bold text-purple-900">{parents.length}</h3>
                </div>
              </div>
            </Card>
    
            <Card className="p-5 bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium">Teachers</p>
                  <h3 className="text-2xl font-bold text-green-900">{teachers.length}</h3>
                </div>
              </div>
            </Card>
    
            <Card className="p-5 bg-gradient-to-br from-orange-50 to-orange-100/50 border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500 rounded-xl">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-orange-600 font-medium">Students</p>
                  <h3 className="text-2xl font-bold text-orange-900">{students.length}</h3>
                </div>
              </div>
            </Card>
          </div>
  )
}

export default UserStateCards
