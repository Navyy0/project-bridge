
import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-700 py-8 bg-gradient-to-r from-[#000000] to-[#222222]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Branding Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-xl font-bold text-[#FFB300]">Pb</h1>
            <p className="text-sm text-gray-400">© 2024 ProjectBridge. All rights reserved.</p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Gmail */}
            <a
              href="mailto:navyanshr@gmail.com"
              className="hover:text-[#FFB300] transition-colors"
              aria-label="Gmail"
            >
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 13.202L3.6 7.267V16.8a1.2 1.2 0 001.2 1.2h14.4a1.2 1.2 0 001.2-1.2V7.267l-8.4 5.935zm10.8-7.335v10.933A3.6 3.6 0 0119.2 20.4H4.8a3.6 3.6 0 01-3.6-3.6V5.867A3.6 3.6 0 014.8 2.4h14.4a3.6 3.6 0 013.6 3.6zm-1.2 0L12 11.197 2.4 5.867V5.867c.002-1.09.885-1.973 1.975-1.973h14.4c1.09 0 1.973.885 1.973 1.973v.002z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/navy_09august/profilecard/?igsh=bG04MGR6YXVmdTVm"
              className="hover:text-[#FFB300] transition-colors"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.976 1.246 2.243 1.308 3.608.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.976.975-2.243 1.246-3.608 1.308-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.976-1.246-2.243-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.976-.975 2.243-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0 1.806c-3.17 0-3.558.012-4.812.07-.964.043-1.49.2-1.836.347-.44.182-.751.402-1.09.74-.339.338-.558.65-.74 1.09-.147.346-.304.872-.347 1.836-.058 1.254-.07 1.642-.07 4.812s.012 3.558.07 4.812c.043.964.2 1.49.347 1.836.182.44.402.751.74 1.09.338.339.65.558 1.09.74.346.147.872.304 1.836.347 1.254.058 1.642.07 4.812.07s3.558-.012 4.812-.07c.964-.043 1.49-.2 1.836-.347.44-.182.751-.402 1.09-.74.339-.338.558-.65.74-1.09.147-.346.304-.872.347-1.836.058-1.254.07-1.642.07-4.812s-.012-3.558-.07-4.812c-.043-.964-.2-1.49-.347-1.836-.182-.44-.402-.751-.74-1.09-.338-.339-.65-.558-1.09-.74-.346-.147-.872-.304-1.836-.347-1.254-.058-1.642-.07-4.812-.07zm0 5.838a4.837 4.837 0 100 9.675 4.837 4.837 0 000-9.675zm0 7.995a3.157 3.157 0 110-6.314 3.157 3.157 0 010 6.314zm6.406-10.845a1.122 1.122 0 11-2.243 0 1.122 1.122 0 012.243 0z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/navyansh-raj/"
              className="hover:text-[#FFB300] transition-colors"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
