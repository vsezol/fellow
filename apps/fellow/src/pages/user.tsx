import { UserForm } from '../widgets/user-form';

export const Component = () => {
  return (
    <div className="flex flex-col h-full mx-auto md:p-0 p-4 gap-4 items-center justify-center sm:max-w-md max-w-sm">
      <UserForm />
    </div>
  );
};
