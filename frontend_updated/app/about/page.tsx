export default function AboutPage() {
  return (
    <div className="container">
      <div className="mt-5">
        <h1 data-aos="fade-up">About Me</h1>
        <div className="mt-3" data-aos="fade-up" data-aos-delay="100">
          <p>
            Welcome to VBMBLOGS! I'm a passionate web developer who loves
            creating amazing digital experiences. This blog is where I share my
            journey, insights, and tutorials about web development, technology,
            and more.
          </p>
          <p className="mt-3">
            I specialize in modern web technologies including React, Next.js,
            TypeScript, and various backend technologies. My goal is to help
            fellow developers learn and grow in their coding journey.
          </p>
        </div>
        <div className="mt-4" data-aos="fade-up" data-aos-delay="200">
          <h2>Skills & Technologies</h2>
          <ul className="mt-2">
            <li>Frontend: React, Next.js, TypeScript, HTML5, CSS3</li>
            <li>Backend: Node.js, MongoDB, Express.js</li>
            <li>Tools: Git, VS Code, Figma</li>
            <li>Deployment: Vercel, Netlify</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
