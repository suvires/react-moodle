import Course from '@/components/Course'

export default function CoursePage({ params }: { params: { id: number } }) {
  return <Course id={params.id} />
}
