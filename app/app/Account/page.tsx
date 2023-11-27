import { UserResponse } from '@supabase/supabase-js';

const Account = ({ auth }: { auth: UserResponse }) => {
  return (
    <div>
      <h2>Account</h2>
    </div>
  );
};

export default Account;
