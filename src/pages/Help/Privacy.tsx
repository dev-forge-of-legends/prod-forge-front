import { Image } from "@components/atoms/Image";
import GoBackButton from "./Common";

const Privacy: React.FC = () => {
  const Text = [
    {
      id: "1",
      title: "Introduction",
      subTitle: "Forge of Legends('we','our'or'us') respects your privacy.",
      content: [],
    },
    {
      id: "2",
      title: "Information We Collect",
      subTitle: "",
      content: [
        {
          num: "1",
          description:
            "Account Information: Username, email address, profile details.",
        },
        {
          num: "2",
          description:
            "GamePlay Data: Matches played, achievements, scores and in-game activity.",
        },
        {
          num: "3",
          description:
            "Device information: IP address, device type, operating system.",
        },
        {
          num: "4",
          description:
            "Optional Data: Chat messages, feedback or surveys if you choose to provide them.",
        },
      ],
    },
    {
      id: "3",
      title: "How We Use Your Information",
      subTitle: "",
      content: [
        {
          num: "1",
          description: "To provide, improve, and personalize gameplay.",
        },
        { num: "2", description: "To track progress, XP and achievements." },
        {
          num: "3",
          description: "To enable multiplayer matches and team features.",
        },
        {
          num: "4",
          description: "To ensure fair play, security and prevent fraud.",
        },
        {
          num: "5",
          description: "To communicate updates, events and new features.",
        },
      ],
    },
    {
      id: "4",
      title: "Sharing of Information",
      subTitle:
        "We do not sell your personal information. We may share limied data only in these cases:",
      content: [
        {
          num: "1",
          description:
            "With service providers who support our platform (e.g. hosting, analytics)",
        },
        {
          num: "2",
          description: "If required by law or to protect game integrity.",
        },
        {
          num: "3",
          description: "With your consent (e.g. linking to social accounts).",
        },
      ],
    },
  ];

  return (
    <div className="min-h-full max-h-full overflow-y-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="flex items-center justify-between p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl mb-8">
          <div className="w-32">
            <GoBackButton/>
          </div>

          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#F89F17] to-[#FFD700] bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#F89F17] to-[#FFD700] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="w-32 flex justify-end">
            <Image
              src="/assets/images/Logo v1.webp"
              fallbackSrc="/assets/images/Logo v1.webp"
              alt="Forge of Legends"
              className="w-20 h-20 object-contain filter brightness-125"
            />
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700/30">
          <p className="text-gray-300 text-lg leading-relaxed text-center">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information in Forge of Legends.
          </p>
        </div>

        {/* Privacy Policy Content */}
        <div className="space-y-6">
          {Text.map((text) => (
            <div
              key={text.id}
              className="group bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30 hover:border-[#F89F17]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#F89F17]/10"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F89F17] to-[#925E0E] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">
                      {text.id}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[#F89F17] transition-colors duration-300">
                    {text.title}
                  </h2>

                  {text.subTitle && (
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {text.subTitle}
                    </p>
                  )}

                  <div className="space-y-3">
                    {text.content.map((sentence) => (
                      <div
                        key={sentence.num}
                        className="flex items-start space-x-3 p-3 bg-gray-700/20 rounded-xl hover:bg-gray-700/40 transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center mt-1 group-hover:bg-[#F89F17] transition-colors duration-300">
                          <span className="text-white text-xs font-bold">
                            {sentence.num}
                          </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed flex-1">
                          {sentence.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 mt-6 border border-gray-700/30">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-3">
              Your Privacy Matters
            </h3>
            <p className="text-gray-300 leading-relaxed">
              We are committed to protecting your personal information and being
              transparent about our data practices. If you have any questions
              about this privacy policy, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
