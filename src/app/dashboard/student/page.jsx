import { redirect } from 'next/navigation';

export default function TeacherDashboardPage() {
  redirect('/dashboard/student/my-learning');
}
