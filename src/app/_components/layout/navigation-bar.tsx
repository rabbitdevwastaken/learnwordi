import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export const NavigationBar: React.FC = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Link className="active" href="/github">
                Github
              </Link>
            </li>
            <li>
              <Link href="/notion">Notion</Link>
            </li>
          </ul>
        </div>
        <Link className="btn btn-ghost text-xl" href="/">
          Mark42
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/github">Github</Link>
          </li>
          <li>
            <Link href="/notion">Notion</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <p className="mr-2 text-sm">
          {session && <span>Logged in as {session.user?.name}</span>}
        </p>
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="btn btn-ghost"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </div>
  );
};
