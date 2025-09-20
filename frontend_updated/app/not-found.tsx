import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="mt-5 text-center">
        <h1 data-aos="fade-up">404 - Page Not Found</h1>
        <div className="mt-3" data-aos="fade-up" data-aos-delay="100">
          <p>Sorry, the page you are looking for could not be found.</p>
          <div className="mt-3">
            <Link href="/">
              <button>Go Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
