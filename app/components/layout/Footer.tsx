import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa'; // Importing icons from react-icons

const Footer = () => {
  return (
    <footer className="mt-8 py-4 relative">
      <p className="text-center">© 2024 Ecommerce. All rights reserved.</p>
      <div className="absolute bottom-4 right-4 flex space-x-4">
        <a
          href="https://github.com/i-sangh" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-800"
        >
          <FaGithub className="h-6 w-6" />
        </a>
        <a
          href="http://www.linkedin.com/in/sanghapal-mangale-67a060266" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-800"
        >
          <FaLinkedin className="h-6 w-6" />
        </a>
        <a
          href="https://nextjs-portfolio-i-sangh.onrender.com/" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-800"
        >
          <FaGlobe className="h-6 w-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
