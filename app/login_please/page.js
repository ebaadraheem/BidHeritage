// PleaseLogin.js

import Link from 'next/link';

const PleaseLogin = () => (
  <div className='min-h-[100vh] bg-[#D2B48C]  flexer'>
    <div className="p-4 text-center ">
      <h2 className="text-2xl font-bold mb-4">Please Login</h2>
      <p className="text-lg mb-4">You need to be logged in to access this page.</p>
      <Link href="/">
        <div className="text-blue-500 hover:underline">Go to Home</div>
      </Link>
    </div>
  </div>
);

export default PleaseLogin;
