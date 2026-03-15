'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { SIGN_IN_MUTATION } from '../api/signIn.mutation';
import type { SignInMutation, SignInMutationVariables } from '../api/signIn.mutation.generated';
import s from './SignInForm.module.scss';

export const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [signIn, { loading }] = useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN_MUTATION, {
    onCompleted: (data) => {
      if (data.loginAdmin.logged) {
        router.push('/users');
      } else {
        setErrorMessage('Invalid credentials');
      }
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    signIn({ variables: { email, password } });
  };

  return (
      <form className={s.form} onSubmit={handleSubmit}>
        <h1 className={s.title}>Sign In</h1>

        <div className={s.field}>
          <label htmlFor="email">Email</label>
          <input
              id="email"
              type="email"
              value={email}
              placeholder={"Epam@epam.com"}
              onChange={(e) => setEmail(e.target.value)}
              required
          />
        </div>

        <div className={s.field}>
          <label htmlFor="password">Password</label>
          <input
              id="password"
              type="password"
              placeholder={"******************"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
        </div>


        {errorMessage && <p className={s.error}>{errorMessage}</p>}

        <button className={s.button} type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
  );
};
