import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { KeyboardEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../shared/ui';

interface MessageInputForm {
  text: string;
}

interface MessageInputProps {
  onSend: (text: string) => unknown;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<MessageInputForm>();

  const onSubmit: SubmitHandler<MessageInputForm> = ({ text }) => {
    onSend(text);
    reset();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' || event.shiftKey) {
      return;
    }

    event.preventDefault();
    handleSubmit(onSubmit)();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-between items-end gap-2 w-full"
    >
      <textarea
        onKeyDown={onKeyDown}
        {...register('text', { required: true, maxLength: 300, minLength: 1 })}
        rows={1}
        className="textarea textarea-primary w-full max-h-28"
        placeholder="Enter message"
      ></textarea>

      <Button size="md" color="primary" type="submit" disabled={!isValid}>
        <FontAwesomeIcon size="lg" icon="paper-plane" />
      </Button>
    </form>
  );
}
