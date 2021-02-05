import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

import Form from './shared/Form';
import { ResetPasswordVariables } from '../__generated__/ResetPassword';

interface ResetFormProps {
  onReset: (a: { variables: ResetPasswordVariables }) => void;
  error: any;
}

type FormData = {
  user: string;
  password: string;
};

const LoginForm: FC<ResetFormProps> = ({ onReset, error }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = ({ user, password }: FormData) => {
    onReset({ variables: { userName: user, password } });
  };

  return isSubmitSuccessful && !error ? (
    <h4>Password was reset, you can login now</h4>
  ) : (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Reset</h1>
      <TextField name="user" inputRef={register} variant="outlined" />
      <TextField
        type="password"
        name="password"
        inputRef={register}
        variant="outlined"
      />
      {error && <FormHelperText>Reset password failed</FormHelperText>}
      <Button disabled={!isDirty || isSubmitting} type="submit">
        Reset password
      </Button>
    </Form>
  );
};

export default LoginForm;
