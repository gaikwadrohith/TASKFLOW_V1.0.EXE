import { motion as Motion } from "framer-motion";

export default function Footer() {

  return (
    <Motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full border-t border-black mt-12 bg-white"
    >

      <div className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">

        <span>
          © {new Date().getFullYear()} TaskFlow
        </span>

        <div className="flex gap-4 mt-2 md:mt-0">

          <span className="hover:text-black cursor-pointer">
            Privacy
          </span>

          <span className="hover:text-black cursor-pointer">
            Terms
          </span>

          <span className="hover:text-black cursor-pointer">
            Support
          </span>

        </div>

      </div>

    </Motion.footer>
  );
}