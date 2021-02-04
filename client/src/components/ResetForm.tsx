import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Form from './shared/Form';

interface ResetFormProps {
  onReset: (data: any) => void;
}

const LoginForm: FC<ResetFormProps> = ({ onReset }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: any) => {
    onReset(data);
  };

  return isSubmitSuccessful ? (
    <h4>Password was reset, you can login now</h4>
  ) : (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Reset</h1>
      <TextField name="new_password" inputRef={register} variant="outlined" />
      <Button disabled={!isDirty || isSubmitting} type="submit">
        Reset password
      </Button>
    </Form>
  );
};

export default LoginForm;
