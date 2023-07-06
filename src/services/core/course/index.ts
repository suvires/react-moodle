import { ICourse } from '@/interfaces/course.interface'
import { getAccessToken } from '@/utils/auth'

export async function getEnrolledCoursesByUserId(userId: number) {
  try {
    const token = await getAccessToken()
    const params = new URLSearchParams({
      userid: `${userId}`,
      wstoken: `${token}`,
      moodlewsrestformat: 'json',
      wsfunction: 'core_enrol_get_users_courses',
    })
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MOODLE_WEBSERVICE_URL}?${params}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.ok) {
      const data = await res.json()
      if (data.exception) {
        throw new Error(data.exception)
      } else {
        return data
      }
    } else {
      throw new Error(res.statusText)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getEnrolledCourseByUserIdAndCourseId(
  userId: number,
  courseId: number
) {
  try {
    const token = await getAccessToken()
    const params = new URLSearchParams({
      userid: `${userId}`,
      wstoken: `${token}`,
      moodlewsrestformat: 'json',
      wsfunction: 'core_enrol_get_users_courses',
    })
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MOODLE_WEBSERVICE_URL}?${params}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.ok) {
      const data = await res.json()
      if (data.exception) {
        throw new Error(data.exception)
      } else {
        console.log(data)
        const course = data.find(
          (course: ICourse) => course.id.toString() === courseId.toString()
        )

        console.log(course)
        return course
      }
    } else {
      throw new Error(res.statusText)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getCourseContentById(id: number) {
  try {
    const token = await getAccessToken()
    const params = new URLSearchParams({
      courseid: `${id}`,
      wstoken: `${token}`,
      moodlewsrestformat: 'json',
      wsfunction: 'core_course_get_contents',
    })

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MOODLE_WEBSERVICE_URL}?${params}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.ok) {
      const data = await res.json()
      if (data.exception) {
        throw new Error(data.exception)
      } else {
        return data
      }
    } else {
      throw new Error(res.statusText)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
