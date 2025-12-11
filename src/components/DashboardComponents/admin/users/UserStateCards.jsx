import React from "react";
import { Users, UserCheck, GraduationCap } from "lucide-react";
import StateCard from "@/components/ui/stateCard";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";



const UserStateCards = ({ users, parents, teachers, students , admins}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
      <StateCard
        title="All Users"
        Icon={Users}
        count={users.length}
        color="blue"
      />

      <StateCard
        title="Admins"
        Icon={MdAdminPanelSettings}
        count={admins.length}
        color="red"
      />

      <StateCard 
        title="Parents"
        Icon={FaUserTie}
        count={parents.length}
        color="purple"
      />

      <StateCard 
        title="Teachers"
        Icon={GraduationCap}
        count={teachers.length}
        color="green"
      />

      <StateCard 
        title="Students"
        Icon={UserCheck}
        count={students.length}
        color="orange"
      />
    </div>
  );
};

export default UserStateCards;