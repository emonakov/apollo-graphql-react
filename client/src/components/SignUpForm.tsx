import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import Form from './shared/Form';
import { SignupVariables } from '../__generated__/Signup';

interface SignUpForm {
  onSignUp: (a: { variables: SignupVariables }) => void;
  error: any;
}

type FormData = {
  user: string;
  password: string;
};

const SignUpForm: FC<SignUpForm> = ({ onSignUp, error }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm({
    mode: 'onBlur',
  });

  const history = useHistory();

  const onSubmit = async ({ user, password }: FormData) => {
    await onSignUp({ variables: { userName: user, password } });
  };

  useEffect(() => {
    if (isSubmitSuccessful && !error) {
      history.push('/');
    }
  }, [isSubmitSuccessful]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign up</h1>
      <TextField name="user" inputRef={register} variant="outlined" />
      <TextField
        type="password"
        name="password"
        inputRef={register}
        variant="outlined"
      />
      {error && <FormHelperText>Signup failed</FormHelperText>}
      <Button disabled={!isDirty || isSubmitting} type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
