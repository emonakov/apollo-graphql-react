import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Form from './shared/Form';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: FC<LoginFormProps> = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = () => {
    onLogin();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
