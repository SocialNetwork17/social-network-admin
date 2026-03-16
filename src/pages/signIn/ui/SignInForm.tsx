'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { useRouter } from 'next/navigation';
import { SIGN_IN_MUTATION } from '../api/signIn.mutation';
import type { SignInMutation, SignInMutationVariables } from '../api/signIn.mutation.generated';
import s from './SignInForm.module.scss';
import {Button} from "@/shared/ul/Button/Button";
import {Input} from "@/shared/ul/Input/Input";

export const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [signIn, { loading }] = useMutation<SignInMutation, SignInMutationVariables>(SIGN_IN_MUTATION, {
    onCompleted: (data) => {
      if (data.loginAdmin.logged) {
        router.push('/admin/users');
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

          <Input
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

          <Input
              id="password"
              type="password"
              placeholder={"******************"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
        </div>


        {errorMessage && <p className={s.error}>{errorMessage}</p>}
          
          <Button variant={'primary'} type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          
      </form>
  );
};
