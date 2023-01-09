import Link from "next/link";

const AdminSideNav = () => {
  return (
    <nav className="min-h-fit min-w-[15rem] text-left">
      <ul className="list-none">
        <li className="my-2 border-b border-black">
          <Link href="/admin/applications">
            <span className="hover:opacity-50">Home</span>
          </Link>
        </li>
        <li className="my-2 border-b border-black">
          <Link href="/admin/applications">
            <span className="hover:opacity-50">Applications</span>
          </Link>
        </li>
        <li className="my-2 border-b border-black ">
          <Link href="/admin/drops">
            <span className="hover:opacity-50">Drops</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSideNav;
