export async function getEnrolledCoursesByUserId() {
  try {
    const params = new URLSearchParams({
      userid: '44',
      wstoken: `${process.env.NEXT_PUBLIC_MOODLE_TOKEN}`,
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
        return null
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

export async function getCourseById() {
  try {
    const params = new URLSearchParams({
      'options[ids][0]': '23',
      wstoken: `${process.env.NEXT_PUBLIC_MOODLE_TOKEN}`,
      moodlewsrestformat: 'json',
      wsfunction: 'core_course_get_courses',
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
        return null
      } else {
        return data[0]
      }
    } else {
      throw new Error(res.statusText)
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getCourseContentById() {
  try {
    const params = new URLSearchParams({
      courseid: '23',
      wstoken: `${process.env.NEXT_PUBLIC_MOODLE_TOKEN}`,
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
        return null
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
