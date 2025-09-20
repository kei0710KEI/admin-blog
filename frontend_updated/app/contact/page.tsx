export default function ContactPage() {
  return (
    <div className="container">
      <div className="mt-5">
        <h1 data-aos="fade-up">Contact Us</h1>
        <div className="mt-3" data-aos="fade-up" data-aos-delay="100">
          <p>
            Have a question, suggestion, or want to collaborate? I'd love to
            hear from you! Feel free to reach out through any of the channels
            below.
          </p>
        </div>
        <div className="mt-4" data-aos="fade-up" data-aos-delay="200">
          <h2>Get in Touch</h2>
          <div className="mt-3">
            <p>
              <strong>Email:</strong> contact@vbmblogs.com
            </p>
            <p>
              <strong>GitHub:</strong> @vbmcoder
            </p>
            <p>
              <strong>Twitter:</strong> @vbmblogs
            </p>
            <p>
              <strong>LinkedIn:</strong> vbmcoder
            </p>
          </div>
        </div>
        <div className="mt-4" data-aos="fade-up" data-aos-delay="300">
          <h2>What I Can Help With</h2>
          <ul className="mt-2">
            <li>Web development consulting</li>
            <li>Code reviews and optimization</li>
            <li>Technical writing and tutorials</li>
            <li>Open source collaboration</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
