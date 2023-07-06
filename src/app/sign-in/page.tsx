'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

interface FormData {
  email: string
  password: string
}

const SignInFormSchema = zod
  .object({
    email: zod
      .string()
      .min(1, {
        message: 'Write your email',
      })
      .email({ message: 'Invalid email address.' }),
    password: zod.string().min(1, {
      message: 'Write your password',
    }),
  })
  .strict()

export default function SignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [signInError, setSignInError] = useState<string>('')
  const [isRedirecting, setSisRedirecting] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState: { touchedFields },
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(SignInFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (data: FormData) => {
    setSignInError('')
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((response) => {
      if (response) {
        const { error } = response
        if (!error) {
          setSisRedirecting(true)
          router.push('/')
        } else {
          setSignInError('Invalid email or password')
        }
      }
    })
  }
  if (isRedirecting) return null
  return (
    <form className="sign-in" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Your email</label>
      <input
        type="email"
        id="email"
        autoComplete="email"
        {...register('email')}
      />
      {!!errors.email && touchedFields.email && (
        <p className="error">{errors.email.message}</p>
      )}

      <label htmlFor="password">Your password</label>
      <div className="input-password">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          {...register('password')}
        />
        <i
          className={showPassword ? 'show-password' : ''}
          onClick={handleShowPasswordClick}
        ></i>
      </div>
      {!!errors.password && touchedFields.password && (
        <p className="error">{errors.password.message}</p>
      )}
      {signInError && <p className="error">{signInError}</p>}
      <button className="btn btn--primary" disabled={isSubmitting}>
        Sign in
      </button>
    </form>
  )
}
