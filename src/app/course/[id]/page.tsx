import Course from '@/components/Course'

export default function CoursePage({ params }: { params: { id: string } }) {
  return <Course id={params.id} />
}
