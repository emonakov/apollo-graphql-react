import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Form from './shared/Form';

interface SignUpForm {
  onSignUp: () => void;
}

const SignUpForm: FC<SignUpForm> = ({ onSignUp }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm({
    mode: 'onBlur',
  });

  const history = useHistory();

  const onSubmit = () => {
    onSignUp();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
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
      <Button disabled={!isDirty || isSubmitting} type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
