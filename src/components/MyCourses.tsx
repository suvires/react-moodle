import { ICourse } from '@/interfaces/course.interface'
import { getEnrolledCoursesByUserId } from '@/services/core/course'
import Image from 'next/image'
import Link from 'next/link'

export default async function MyCourses() {
  const courses = await getEnrolledCoursesByUserId()
  return (
    <div>
      <h1>My courses</h1>
      {courses.length ? (
        <ul>
          {courses.map((course: ICourse) => (
            <li key={course.id}>
              <Link href={`/course/${course.shortname}`}>
                <h2>{course.fullname}</h2>
                <picture>
                  <Image
                    fill={true}
                    src={
                      course.overviewfiles[0]
                        ? `${course.overviewfiles[0].fileurl}?token=${process.env.NEXT_PUBLIC_MOODLE_TOKEN}`
                        : '/assets/images/course-cover-placeholder.svg'
                    }
                    alt={`${course.fullname} course cover`}
                  />
                </picture>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: course.summary }} />
              <p>{course.categoryname}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You aren&apos;t enrolled in any course yet.</p>
      )}
    </div>
  )
}
