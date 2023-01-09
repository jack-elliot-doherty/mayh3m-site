import Link from "next/link";

const AdminSideNav = () => {
  return (
    <nav className="text-left">
      <ul className="list-none">
        <li className="mb-2">
          <Link href="/admin">Home</Link>
        </li>
        <hr className="h-0.5 bg-black"></hr>
        <li className="mb-2">
          <Link href="/admin/applications">Applications</Link>
        </li>
        <hr className="h-0.5 bg-black"></hr>

        <li className="mb-2">
          <Link href="/admin/drops">Drops</Link>
        </li>
        <hr className="h-0.5 bg-black"></hr>
      </ul>
    </nav>
  );
};

export default AdminSideNav;
