import Layout from '../app/layout';
import { Navbar } from '../widgets/navbar';
import { UserForm } from '../widgets/user-form';

export const Component = () => {
  return (
    <Layout>
      <div className="overflow-hidden flex-1 flex-grow">
        <div className="flex flex-col h-full mx-auto p-4 gap-12 items-center justify-center sm:max-w-md max-w-sm">
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <UserForm />
          </div>
        </div>
      </div>

      <Navbar />
    </Layout>
  );
};
