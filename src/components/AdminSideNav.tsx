import Link from "next/link";

const AdminSideNav = () => {
  return (
    <nav className="min-h-fit min-w-[15rem] text-left text-xs">
      <ul className="list-none">
        <li className="my-2 border-b border-black pb-2">
          <Link href="/admin/applications">
            <span className="hover:opacity-50">HOME</span>
          </Link>
        </li>
        <li className="my-2 border-b border-black pb-2">
          <Link href="/admin/applications">
            <span className="hover:opacity-50">APPLICATIONS</span>
          </Link>
        </li>
        <li className="my-2 border-b border-black pb-2">
          <Link href="/admin/drops">
            <span className="hover:opacity-50">DROPS</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSideNav;
