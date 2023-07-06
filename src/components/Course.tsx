import { getCourseById, getCourseContentById } from '@/services/core/course'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function Course() {
  const course = await getCourseById()
  console.log(course)
  const contents = await getCourseContentById()
  console.log(contents)
  if (!course) return <p>Curso no encontrado</p>
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
