import Layout from '../app/layout';
import { Navbar } from '../widgets/navbar';
import { UserForm } from '../widgets/user-form';
import { UserSettingsForm } from '../widgets/user-settings-form';

export const Component = () => {
  return (
    <Layout>
      <div className="overflow-hidden flex-1 flex-grow">
        <div className="flex flex-col h-full mx-auto md:p-0 p-4 gap-12 items-center justify-center sm:max-w-md max-w-sm">
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <h1 className="font-bold text-2xl">Настройки пользователя</h1>
            <UserForm />
          </div>

          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <h1 className="font-bold text-xl">Настройки системы</h1>

            <UserSettingsForm />
          </div>
        </div>
      </div>

      <Navbar />
    </Layout>
  );
};
