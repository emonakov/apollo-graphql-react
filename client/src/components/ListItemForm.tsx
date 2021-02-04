import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Form from './shared/Form';

interface ListItemFormProps {
  onAdd: (data: any) => void;
}

const LoginForm: FC<ListItemFormProps> = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: any) => {
    onAdd(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField name="item" inputRef={register} variant="outlined" />
      <Button disabled={!isDirty || isSubmitting} type="submit">
        Add
      </Button>
    </Form>
  );
};

export default LoginForm;
