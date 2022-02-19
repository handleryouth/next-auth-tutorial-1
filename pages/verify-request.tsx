import Link from "next/link";

const VerifyRequest = () => {
  return (
    <div>
      <h1>Check your email</h1>
      <h2>A sign in link has been sent to your email address</h2>
      <Link passHref href="/">
        <span>Go back to homepage</span>
      </Link>
    </div>
  );
};

export default VerifyRequest;
