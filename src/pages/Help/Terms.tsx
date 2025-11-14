import { Image } from "@components/atoms/Image";
import GoBackButton from "./Common";

const Terms: React.FC = () => {
  return (
    <div className="max-h-screen overflow-y-auto bg-dark/30 max-w-4xl mx-auto border-1 border-white/10 rounded-2xl px-10 font-sans">
      {/* <div className="w-32">
        <GoBackButton />
      </div> */}
      <div className="container mx-auto max-w-4xl scroll-smooth overflow-y-auto mt-9">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="w-32 -ml-4">
            <GoBackButton />
          </div>
          <h1 className="text-[24px] lg:text-[28px] font-bold text-white text-center flex-1">
            Terms & Conditions
          </h1>
          <div className="w-32 flex justify-end hidden md:block">
            <Image
              src="/assets/images/Logo v1.webp"
              fallbackSrc="/assets/images/Logo v1.webp"
              alt="Forge of Legends"
              className="w-20 h-20 object-contain filter brightness-125"
            />
          </div>
        </div>

        <div className="w-full h-0.25 bg-white/10 mx-auto rounded-full"></div>

        {/* Introduction */}
        <div className="mt-8">
          <h4 className='text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]'>
            1. DEFINITIONS
          </h4>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>1.1. The Agreement:</span>
            <span className='text-white/80'> These Terms of Service ("Terms") constitute a legally binding agreement between you ("User" or "Player") and [Your Company Name] ("we," "us," "our") regarding the mobile game "Forge of Legends," including all related services, websites, and updates (collectively, the "Service").</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>1.2. Acceptance:</span>
            <span className='text-white/80'> By downloading, installing, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our separate Privacy Policy. If you do not agree to these Terms, you must not use the Service.</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>1.3. Eligibility:</span>
            <ul className='text-white/80 list-disc list-inside mb-[16px] text-[12px] lg:text-[16px]'>
              <li>You must be at least 18 years of age (or the minimum age of digital consent in your country) to use the Service.
              </li>
              <li>If you are under 18 (or the age of majority in your jurisdiction), you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.
              </li>
            </ul>
          </p>
        </div>

        <div className="mt-8">
          <h4 className='text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]'>
            2. Account Registration & Security
          </h4>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>2.1. Account Creation:</span>
            <span className='text-white/80'> To access certain features, you may need to register an account ("Account"). This may be done automatically through a platform like Apple Game Center or Google Play Games.
            </span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>2.2. Account Information:</span>
            <span className='text-white/80'> You agree to provide accurate and complete information during registration and to keep it updated.</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>2.3. Security:</span>
            <span className='text-white/80'> You are solely responsible for maintaining the confidentiality of your Account login information and for all activities that occur under your Account. You must immediately notify us of any unauthorized use of your Account or any other security breach.</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>2.4. One Account per Player:</span>
            <span className='text-white/80'>You may only maintain one personal Account. Creating multiple accounts to exploit the game ("smurfing") is prohibited.</span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className='text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]'>
            3. License Grant & Restrictions
          </h4>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>3.1. Limited License:</span>
            <span className='text-white/80'> Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to install and use the Service for your personal, non-commercial entertainment purposes.
            </span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>3.2. Restrictions:</span>
            <span className='text-white/80'> You shall not:</span>
            <ul className='text-white/80 list-disc list-inside mb-[16px] text-[12px] lg:text-[16px]'>
              <li>Copy, modify, or create derivative works of the Service.</li>
              <li>Reverse engineer, decompile, or disassemble the Service, except as permitted by applicable law.</li>
              <li>Use cheats, automation software (bots), hacks, mods, or any other unauthorized third-party software designed to modify the game experience.</li>
              <li>Exploit any bug, glitch, or vulnerability to gain an unfair advantage.</li>
              <li>Use the Service for any commercial purpose, including in-game item trading for real-world currency, without our express written consent.</li>
            </ul>
          </p>
        </div>

        <div className="mt-8">
          <h4 className='text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]'>
            4. Virtual Items & In-Game Purchases
          </h4>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>4.1. Virtual Currency and Items:</span>
            <span className='text-white/80'> The Service may include virtual, in-game currency (&quot;Coin&quot;) and virtual items (e.g., pawns, map, dice) (collectively, &quot;Virtual Items&quot;) that can be purchased with real money or earned through gameplay.</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>4.2. License, Not Sale:</span>
            <span className='text-white/80'> You acknowledge that you do not own these Virtual Items. Instead, you purchase a limited, personal license to use them within the Service. Virtual Items have no real-world value.</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>4.3. No Refunds; No Transfers:</span>
            <span className='text-white/80'> All purchases of Virtual Items are final and non-refundable, except as required by law.</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>4.4. Pricing and Availability:</span>
            <span className='text-white/80'> We may modify the price, availability, or attributes of Virtual Items at any time, without liability to you. We will notify you if we make material modifications.</span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className='text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]'>
            5. User Conduct & Chat Services
          </h4>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>5.1. Prohibited Conduct:</span>
            <span className='text-white/80'> You agree not to use the Service to:</span>
          </p>
          <ul className='text-white/80 list-disc list-inside mb-[16px] text-[12px] lg:text-[16px] space-y-1'>
            <li>Harass, abuse, threaten, or bully any other user.</li>
            <li>Post hate speech, discriminatory language, or obscene/sexually explicit content.</li>
            <li>Impersonate any person or entity, including our employees.</li>
            <li>Spread false information or spam (unsolicited advertising).</li>
            <li>Engage in any illegal activity.</li>
          </ul>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>5.2. Chat Services:</span>
            <span className='text-white/80'> The in-game chat is a privilege. We reserve the right to monitor, filter, and remove any user-generated content and to temporarily or permanently mute or ban users who violate these conduct rules, at our sole discretion.</span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className='text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]'>
            6. Intellectual Property (Who Owns What)
          </h4>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>6.1. We Own the Game:</span>
            <span className='text-white/80'> Everything in &quot;Forge of Legends&quot; belongs to us. This includes all characters, artwork, designs, code, music, sounds, the name &quot;Forge of Legends,&quot; and all rules, mechanics, and the game world.</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>6.2. You Get a License to Play:</span>
            <span className='text-white/80'> When you download the game, we grant you permission to play it for your personal enjoyment. You are not buying the game itself or any part of it.</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>6.3. What You Are Not Allowed to Do:</span>
            <span className='text-white/80'> You agree not to copy, hack, or reverse-engineer the game; use our art, logo, or name for commercial purposes; or create cheats or mods that break the game.</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>6.4. Content You Create In-Game:</span>
            <span className='text-white/80'> You own original content you create in the game, such as your player name. By playing, you grant us permission to use that content within the game—for example, displaying your clan name to other players.</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>6.5. Don&apos;t Use Others&apos; Copyrighted Stuff:</span>
            <span className='text-white/80'> You agree not to use names, logos, or art that you do not own. You are responsible for any content you create.</span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className='text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]'>
            7. Privacy
          </h4>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='text-white/80'>Your privacy is important to us. Our Privacy Policy protects your personal information. By using the Service, you consent to the practices described in the Privacy Policy.</span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className='text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]'>
            8. Termination
          </h4>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>8.1. By You:</span>
            <span className='text-white/80'> You may stop using the Service at any time.</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>8.2. By Us:</span>
            <span className='text-white/80'> We may, at our sole discretion, suspend or terminate your Account and your access to the Service at any time, for any reason, without prior notice or liability, especially if you breach these Terms.</span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className='text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]'>
            9. Disclaimer of Warranties & Limitation of Liability
          </h4>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>9.1. &quot;As Is&quot; Service:</span>
            <span className='text-white/80'> The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis, without warranties of any kind, either express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or free from harmful components.</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>9.2. Limitation of Liability:</span>
            <span className='text-white/80'> To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising out of or related to your use or inability to use the Service.</span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className='text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]'>
            10. Changes to the Terms
          </h4>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='text-white/80'>We reserve the right to modify these Terms at any time. If we make material changes, we will notify you through the Service or by other means. Your continued use of the Service after the effective date of the revised Terms constitutes your acceptance of them.</span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className='text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]'>
            11. Governing Law & Dispute Resolution
          </h4>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>11.1. Governing Law:</span>
            <span className='text-white/80'> These Terms shall be governed by the laws of [Your State/Country], without regard to its conflict of law provisions.</span>
          </p>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='font-semibold text-white'>11.2. Dispute Resolution:</span>
            <span className='text-white/80'> Any dispute shall be resolved through final and binding arbitration in [Your City/Region], rather than in court. You agree to waive your right to a jury trial and to participate in a class-action lawsuit.</span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className='text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]'>
            12. Contact Information
          </h4>
          <p className='mb-[16px] text-[12px] lg:text-[16px]'>
            <span className='text-white/80'>If you have any questions about these Terms, please contact us at: [Your Support Email Address].</span>
          </p>
        </div>

        {/* Footer Spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default Terms;
