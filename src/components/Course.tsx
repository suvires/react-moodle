import {
  getEnrolledCourseByUserIdAndCourseId,
  getCourseContentById,
} from '@/services/core/course'
import { getUser } from '@/utils/auth'
import Image from 'next/image'
import Link from 'next/link'

interface CourseProps {
  id: number
}

export default async function Course({ id }: CourseProps) {
  const user = await getUser()
  if (!user || user.id === undefined) throw new Error('User not found')
  const course = await getEnrolledCourseByUserIdAndCourseId(user.id, id)
  const contents = await getCourseContentById(id)
  if (!course) throw new Error('Course not found')
  return (
    <div>
      <h1>{course.fullname}</h1>
      <ul>
        {contents.map((content: any) => (
          <li key={`section-${content.id}`}>
            <h2>{content.name}</h2>
            <ul>
              {content.modules.map((module: any) => (
                <li key={`module-${module.id}`}>{module.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
