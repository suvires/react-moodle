import { ICourse } from '@/interfaces/course.interface'

async function getCourses() {
  const res = await fetch(
    'https://formacion.easyyeah.com/webservice/rest/server.php?wstoken=8b4e9bb3c1a2e37378fe92e892a1695e&wsfunction=core_course_get_courses_by_field&moodlewsrestformat=json',
    {
      cache: 'no-cache',
    }
  )
  return await res.json()
}

export default async function CourseList() {
  const { courses } = await getCourses()
  return (
    <div>
      <h1>Courses</h1>
      {courses.map((course: ICourse) => (
        <div key={course.id}>
          <h2>{course.fullname}</h2>
          <p>{course.categoryname}</p>
        </div>
      ))}
    </div>
  )
}
