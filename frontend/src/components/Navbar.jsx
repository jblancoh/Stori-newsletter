import Link from "next/link"

const Navbar = () => {
  return (
    <div className="navbar bg-primary">
      <div className="flex-1">
        <span className="text-3xl font-bold ml-4">
          Stori
        </span>
      </div>
      <div className="flex-none">
        <Link href="newsletter">
          <button className="btn btn-ghost btn-sm rounded-btn">
            Newsletter
          </button>
        </Link>
        <Link href="subscriber">
          <button className="btn btn-ghost btn-sm rounded-btn">
            Subscribir
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar