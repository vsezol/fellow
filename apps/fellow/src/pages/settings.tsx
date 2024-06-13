import clsx from 'clsx';
import Layout from '../app/layout';
import { selectAnimeModeEnabled } from '../entities/user-settings';
import { useAppSelector } from '../store';
import { Navbar } from '../widgets/navbar';
import { UserSettingsForm } from '../widgets/user-settings-form';

export const Component = () => {
  const animeMode = useAppSelector(selectAnimeModeEnabled);

  return (
    <Layout>
      <div className="overflow-hidden flex-1 flex-grow">
        <div className="flex flex-col h-full mx-auto p-4  gap-12 items-center justify-center sm:max-w-md max-w-sm">
          <div
            className={clsx(
              'w-full flex flex-col gap-4 p-4 items-center justify-center bg-base-200 rounded',
              animeMode && 'bg-opacity-50'
            )}
          >
            <UserSettingsForm />
          </div>
        </div>
      </div>

      <Navbar />
    </Layout>
  );
};
