import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Form from './shared/Form';
import * as LoginTypes from '../__generated__/Login';

interface LoginFormProps {
  onLogin: (a: { variables: LoginTypes.LoginVariables }) => void;
}

type FormData = {
  user: string;
  password: string;
};

const LoginForm: FC<LoginFormProps> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const onSubmit = ({ user, password }: FormData) => {
    onLogin({ variables: { userName: user, password } });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <TextField name="user" inputRef={register} variant="outlined" />
      <TextField
        type="password"
        name="password"
        inputRef={register}
        variant="outlined"
      />
      <Button to="/reset" exact component={NavLink}>
        Reset password
      </Button>
      <Button disabled={!isDirty || isSubmitting} type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
