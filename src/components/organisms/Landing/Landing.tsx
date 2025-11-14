import { LoginModal, SignupModal } from "@components/molecules";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BgButton } from "../../atoms";
import { Image } from "../../atoms/Image";
import Contact from "./Contact";

export const Landing = () => {
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [showContact, setShowContact] = useState<boolean>(false);
  const [signupModalOpen, setSignupModalOpen] = useState<boolean>(false);
  const [referalCode, setReferralCode] = useState<string>("");
  const [adsBy, setAdsBy] = useState<string>("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoginModalOpen(searchParams.get("login") === "true");
    setSignupModalOpen(searchParams.get("signup") === "true");
    setReferralCode(searchParams.get("referalCode") || "");
    setAdsBy(searchParams.get("adsBy") || "");
  }, [searchParams]);

  return (
    <div>
      <div className="bg-[url('https://sfo3.digitaloceanspaces.com/forge-dev-assets/assets/images/backgrounds/landing.webp')] bg-cover bg-center bg-no-repeat h-[100vh] w-[100vw] relative">
        <div className="relative z-10">
          <div className="items-center text-center relative">
            {/* Animated decorative elements */}
            <div className="absolute -top-10 left-1/4 w-4 h-4 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          </div>
          <div className="relative">
            <div className="w-full flex justify-center pt-[10vh]">
              <Image
                src="/assets/images/Logo v1.webp"
                fallbackSrc="/assets/images/Logo v1.webp"
                alt="Forge of Legends"
                className="mt-[4vh] w-30 md:w-40 transform transition-transform duration-300"
              />
            </div>
            <div className="flex justify-center gap-2 md:gap-10 mt-10">
              <BgButton
                onClick={() => navigate("/how")}
                className="bg-transparent backdrop-blur-md backdrop-filter py-3"
                scale={1}
              >
                <span className="text-[12px] md:text-[16px] font-vastagoMedium text-[#C8C397]">
                  How to play
                </span>
              </BgButton>
              <BgButton
                onClick={() => setLoginModalOpen(true)}
                className="bg-transparent backdrop-blur-md backdrop-filter py-3"
                scale={1}
              >
                <span className="text-[#C8C397] text-[12px] md:text-[16px] font-vastagoMedium">
                  Play Now
                </span>
              </BgButton>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-8 pb-4 px-5">
            {/* Mobile: First line - Terms and Sweep Rules links */}
            <div className="flex md:hidden justify-center gap-4 items-center mb-4">
              <Link to="/terms">
                <p className="font-vastagoRegular text-gray-400 text-[14px] hover:text-amber-400 transition-colors duration-200">
                  Terms and Condition
                </p>
              </Link>
              <Link to="/sweep">
                <p className="font-vastagoRegular text-gray-400 text-[14px] hover:text-amber-400 transition-colors duration-200">
                  Sweep Rules
                </p>
              </Link>
            </div>

            {/* Desktop: Contact button on left */}
            <div className="hidden md:flex items-center flex-1">
              <BgButton
                onClick={() => setShowContact(true)}
                className="text-sm flex items-center justify-center text-yellow md:h-10 md:w-30"
              >
                Contact
              </BgButton>
            </div>

            {/* Desktop: Terms and Sweep Rules links in center */}
            <div className="hidden md:flex justify-center items-center gap-8 flex-1">
              {/* <Link to="/privacy">
                <p className="text-gray-400 text-[14px] underline hover:text-amber-400 transition-colors duration-200">
                  Privacy and Policy
                </p>
              </Link> */}
              <Link to="/terms">
                <p className="font-vastagoRegular text-gray-400 text-[14px] hover:text-amber-400 transition-colors duration-200">
                  Terms and Condition
                </p>
              </Link>
              <Link to="/sweep">
                <p className="font-vastagoRegular text-gray-400 text-[14px] hover:text-amber-400 transition-colors duration-200">
                  Sweep Rules
                </p>
              </Link>
            </div>

            {/* Mobile: Second line - Contact button on left, Social buttons on right */}
            {/* Desktop: Social buttons on right */}
            <div className="flex justify-between items-center md:justify-end md:flex-1 gap-4">
              <div className="flex md:hidden items-center">
                <BgButton
                  onClick={() => setShowContact(true)}
                  className="text-sm flex items-center justify-center text-yellow h-8 w-24"
                >
                  Contact
                </BgButton>
              </div>
              <div className="flex justify-center gap-1 md:gap-4 md:justify-end">
                <Link
                  to="/"
                  className="transform hover:scale-110 transition-transform duration-200"
                >
                  <Image
                    src="/assets/images/footer/1.webp"
                    fallbackSrc="/assets/images/footer/1.webp"
                    alt="Forge of Legends"
                    className="w-[5wh] h-[5vh] hover:brightness-125 transition-all duration-200"
                  />
                </Link>
                <Link
                  to="/"
                  className="transform hover:scale-110 transition-transform duration-200"
                >
                  <Image
                    src="/assets/images/footer/2.webp"
                    fallbackSrc="/assets/images/footer/2.webp"
                    alt="Forge of Legends"
                    className="w-[5wh] h-[5vh] hover:brightness-125 transition-all duration-200"
                  />
                </Link>
                <Link
                  to="/"
                  className="transform hover:scale-110 transition-transform duration-200"
                >
                  <Image
                    src="/assets/images/footer/3.webp"
                    fallbackSrc="/assets/images/footer/3.webp"
                    alt="Forge of Legends"
                    className="w-[5wh] h-[5vh] hover:brightness-125 transition-all duration-200"
                  />
                </Link>
                <Link
                  to="/"
                  className="transform hover:scale-110 transition-transform duration-200"
                >
                  <Image
                    src="/assets/images/footer/4.webp"
                    fallbackSrc="/assets/images/footer/4.webp"
                    alt="Forge of Legends"
                    className="w-[5wh] h-[5vh] hover:brightness-125 transition-all duration-200"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
      <SignupModal
        isOpen={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        referalCode={referalCode}
        adsBy={adsBy}
      />
      {
        showContact && (
          <div className="w-full">
            <Contact onClose={() => setShowContact(false)} />
          </div>
        )
      }
    </div >
  );
};
