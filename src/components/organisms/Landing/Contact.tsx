import { Globe, Mail, Phone } from "lucide-react";
import React from "react";

interface ContactProps {
  onClose: () => void;
}

const Contact: React.FC<ContactProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="w-[380px] h-[380px] rounded-2xl shadow-lg text-gray-300 relative p-6"
        style={{
          backgroundColor: "rgba(22, 11, 4, 0.9)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close contact form"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-5xl font-light"
        >
          ×
        </button>

        {/* Header Text */}
        <div className="mt-7">

          <h2 className="text-[21px] font-semibold mb-2 leading-snug">
            Developed by the{" "}
            <span className="text-amber-400">Triospace.tech</span> Software
            Development Team.
          </h2>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          For any support or inquiries, please contact us at:
        </p>

        {/* Contact Info */}
        <div className="flex flex-col space-y-5">
          <div className="flex items-center space-x-3 ">
            <div className="w-8 h-8 flex flex-col justify-center items-center rounded-full bg-[#9A724B]">
              <Globe className="w-4 h-4 text-[#160B04]" />
            </div>
            <a
              href="https://triospace.tech"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white text-[19px]"
            >
              www.triospace.tech
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-[#9A724B]">
              <Phone className="w-4 h-4 text-[#160B04]" />
            </div>
            <span className="text-[19px]">123456789</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-[#9A724B]">
              <Mail className="w-4 h-4 text-[#160B04]" />
            </div>
            <span className="text-[19px]">support@triospace.tech</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-[#9A724B]">
              <Mail className="w-4 h-4 text-[#160B04]" />
            </div>
            <span className="text-[19px]">contact@triospace.tech</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
