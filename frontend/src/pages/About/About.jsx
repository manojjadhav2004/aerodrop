import React from "react";

const About = () => {
  const team = [
  
    {
      name: "Manoj Jadhav",
      role: " ",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      email: "mailto:manoj@example.com",
    },
    {
      name: "Vaibhav Jadhav",
      role: " ",
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      email: "mailto:vaibhav@example.com",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 text-center bg-white dark:bg-black dark:text-white mt-16">
      {/* Team Section */}
      <div>
        <h2 className="text-4xl italic font-light mb-12 tracking-wide">
          Developers
        </h2>
        <div className="flex flex-col gap-8">
          {team.map((dev, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg transition hover:-translate-y-1"
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-xl font-bold text-black dark:text-white transition hover:ring-4 hover:ring-gray-300 dark:hover:ring-neutral-600">
                  {dev.name[0]}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-black dark:text-white text-lg">
                  {dev.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {dev.role}
                </p>
              </div>

              {/* Divider (only on desktop) */}
              <div className="hidden sm:block w-px h-12 bg-gray-200 dark:bg-neutral-700"></div>

              {/* Links */}
              <div className="flex gap-3">
                <a
                  href={dev.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                >
                  GitHub
                </a>
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                >
                  LinkedIn
                </a>
                <a
                  href={dev.email}
                  className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-neutral-800 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
                >
                  Email
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
