import { Image } from "@components/atoms/Image";
import GoBackButton from "./Common";

const SweepRules: React.FC = () => {
  return (
    <div className="max-h-screen overflow-y-auto bg-dark/30 max-w-4xl mx-auto border-1 border-white/10 rounded-2xl px-10 font-sans">
      <div className="container mx-auto max-w-4xl scroll-smooth overflow-y-auto mt-9">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="w-32 -ml-4">
            <GoBackButton />
          </div>
          <h1 className="text-[24px] lg:text-[28px] font-bold text-white text-center flex-1">
            Sweep Rules & Token Guide
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
          <p className="text-[12px] lg:text-[16px] text-white/80 mb-[16px]">
            This guide explains how Sweep Tokens work in Forge of Legends, how to
            unlock the Sweep feature, and the rules that govern token usage,
            conversion, and rewards.
          </p>
        </div>

        <div className="mt-8">
          <h4 className="text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]">
            1: Sweep Token Definition &amp; Purpose
          </h4>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">1.1. What are Sweep Tokens?</span>
            <span className="text-white/80">
              {" "}
              Sweep Tokens are a special in-game currency used exclusively for the
              &quot;Sweep&quot; function. They are non-tradeable, non-giftable, and
              cannot be sold for gold or other currencies.
            </span>
          </p>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">1.2. Function of Sweep Tokens:</span>
            <span className="text-white/80">
              {" "}
              Each Sweep Token allows you to instantly complete one eligible game
              level, receiving rewards without manually playing the match. This feature
              is designed to save time while maintaining progression.
            </span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className="text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]">
            2: How to Unlock the Sweep Feature
          </h4>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">2.1. Unlock Condition:</span>
            <span className="text-white/80">
              {" "}
              The Sweep feature for a specific level becomes available only after you
              achieve a 3-star victory on that level. Once unlocked for a level, it
              remains available permanently.
            </span>
          </p>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">2.2. Verification:</span>
            <span className="text-white/80">
              {" "}
              Levels where Sweep is available will display a broom icon or &quot;Sweep&quot;
              button on the level selection screen.
            </span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className="text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]">
            3: How to Use Sweep Tokens
          </h4>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">3.1. Step-by-Step Process:</span>
          </p>
          <ul className="text-white/80 list-disc list-inside mb-[16px] text-[12px] lg:text-[16px] space-y-1">
            <li>Go to any level where you have earned 3 stars.</li>
            <li>Tap the &quot;Sweep&quot; button.</li>
            <li>Select how many sweeps you want to perform (1, 5, or 10).</li>
            <li>The game will show the total Sweep Tokens required and a preview of rewards.</li>
            <li>Confirm to complete the sweep instantly.</li>
          </ul>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">3.2. Instant Results:</span>
            <span className="text-white/80">
              {" "}
              Rewards are immediately delivered to your inventory. No gameplay animation
              is shown.
            </span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className="text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]">
            4: Earning Sweep Tokens
          </h4>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">4.1. Primary Sources:</span>
          </p>
          <ul className="text-white/80 list-disc list-inside mb-[16px] text-[12px] lg:text-[16px] space-y-1">
            <li>Daily Quests: Complete 3 daily quests → Reward: 5 Sweep Tokens</li>
            <li>Weekly Login Bonus: Day 4 reward → 10 Sweep Tokens</li>
            <li>Player Level Up: Reach levels 10, 20, 30, etc. → 15 Sweep Tokens each</li>
            <li>Special Events: Seasonal events often award 20-50 Sweep Tokens</li>
          </ul>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">4.2. Premium Sources:</span>
          </p>
          <ul className="text-white/80 list-disc list-inside mb-[16px] text-[12px] lg:text-[16px] space-y-1">
            <li>In-App Purchase: &quot;Sweep Token Pack&quot; - $1.99 for 30 tokens</li>
            <li>Monthly Card: Daily bonus includes 5 Sweep Tokens</li>
            <li>Battle Pass: Premium track offers 50 Sweep Tokens at various tiers</li>
          </ul>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">4.3. Bonus Sweep Tokens:</span>
          </p>
          <ul className="text-white/80 list-disc list-inside mb-[16px] text-[12px] lg:text-[16px] space-y-1">
            <li>Daily Streak Bonus: Use the sweep feature 3 days in a row → 5 Bonus Tokens</li>
            <li>Weekly Usage Bonus: Perform 50+ sweeps in a week → 15 Bonus Tokens</li>
            <li>Weekend Special: 2x Sweep Token drops from all sources on Saturdays and Sundays</li>
            <li>Monthly Achievement: Complete 200+ sweeps in a month → 30 Bonus Tokens</li>
          </ul>
        </div>

        <div className="mt-8">
          <h4 className="text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]">
            5: Sweep Token Limits &amp; Caps
          </h4>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">5.1. Daily Usage Limit:</span>
          </p>
          <ul className="text-white/80 list-disc list-inside mb-[16px] text-[12px] lg:text-[16px] space-y-1">
            <li>Free players: Maximum 20 sweeps per day</li>
            <li>Premium Pass holders: Maximum 50 sweeps per day</li>
            <li>Note: This counts total sweeps across all levels.</li>
          </ul>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">5.2. Token Storage Limit:</span>
            <span className="text-white/80">
              {" "}
              Maximum 200 Sweep Tokens can be held at once. Excess tokens beyond 200 are
              automatically converted to US Dollars at the 10% swap rate (see 6).
            </span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className="text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]">
            6: Sweep Token Swap Rate System
          </h4>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">6.1. 10% Swap Rate to US Dollars:</span>
            <span className="text-white/80">
              {" "}
              Players can voluntarily convert excess Sweep Tokens to US Dollars. Conversion
              Rate: 100 Sweep Tokens = $1.00 USD. Minimum conversion: 100 tokens required.
              Maximum conversion: 10,000 tokens per day ($100 USD daily maximum).
            </span>
          </p>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">6.2. Automatic Conversion:</span>
            <span className="text-white/80">
              {" "}
              When a player&apos;s Sweep Token balance exceeds 200, automatic conversion occurs.
              Example: If you have 315 tokens → 115 tokens convert to $1.15 USD (remainder 0
              tokens).
            </span>
          </p>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">6.3. Conversion Process:</span>
          </p>
          <ul className="text-white/80 list-disc list-inside mb-[16px] text-[12px] lg:text-[16px] space-y-1">
            <li>Go to Inventory → Select Sweep Tokens → Tap &quot;Convert to Cash&quot; button.</li>
            <li>Select amount to convert (in multiples of 100).</li>
            <li>Confirm conversion to receive USD in your linked payment account.</li>
          </ul>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">6.4. Payment Terms:</span>
            <span className="text-white/80">
              {" "}
              Minimum $5.00 USD required for withdrawal. Withdrawals are processed within 7-10
              business days. Conversion fees may apply based on payment method.
            </span>
          </p>
        </div>

        <div className="mt-8">
          <h4 className="text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]">
            7: Rewards from Sweeping
          </h4>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">7.1. Guaranteed Rewards:</span>
          </p>
          <ul className="text-white/80 list-disc list-inside mb-[16px] text-[12px] lg:text-[16px] space-y-1">
            <li>100% of normal gold and EXP</li>
            <li>100% of common crafting materials</li>
            <li>Same hero experience as manual play</li>
          </ul>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">7.2. Limited Rewards:</span>
          </p>
          <ul className="text-white/80 list-disc list-inside mb-[16px] text-[12px] lg:text-[16px] space-y-1">
            <li>First-time completion bonuses: NOT available through sweeping</li>
            <li>Challenge objectives (e.g., &quot;Win in 5 turns&quot;): NOT counted when sweeping</li>
            <li>Random rare drops: Same drop rate as manual play</li>
          </ul>
        </div>

        <div className="mt-8">
          <h4 className="text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]">
            8: Restrictions &amp; Exclusions
          </h4>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">8.1. Where You Cannot Use Sweep Tokens:</span>
          </p>
          <ul className="text-white/80 list-disc list-inside mb-[16px] text-[12px] lg:text-[16px] space-y-1">
            <li>Player vs Player (PvP) matches</li>
            <li>Guild Wars</li>
            <li>Special Event levels (first 48 hours)</li>
            <li>Newly released campaign levels (first week)</li>
            <li>Any level where you haven&apos;t earned 3 stars</li>
          </ul>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">8.2. Token-Specific Rules:</span>
          </p>
          <ul className="text-white/80 list-disc list-inside mb-[16px] text-[12px] lg:text-[16px] space-y-1">
            <li>Sweep Tokens cannot be transferred between accounts</li>
            <li>Expired event tokens are automatically converted to regular Sweep Tokens</li>
            <li>Lost or unused tokens are not refundable</li>
            <li>Bonus tokens follow the same rules as regular tokens</li>
          </ul>
        </div>

        <div className="mt-8">
          <h4 className="text-white text-[16px] lg:text-[20px] font-semibold mb-[8px]">
            9: Policy Changes
          </h4>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">9.1. Modification Rights:</span>
            <span className="text-white/80">
              {" "}
              We reserve the right to modify Sweep Token drop rates, daily usage limits, token
              storage capacity, reward distributions, and swap rates (with 30-day notice).
            </span>
          </p>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">9.2. Notification:</span>
            <span className="text-white/80">
              {" "}
              Players will be notified of significant changes via in-game mail at least 7 days in
              advance.
            </span>
          </p>
          <p className="mb-[16px] text-[12px] lg:text-[16px]">
            <span className="font-semibold text-white">9.3. Termination:</span>
            <span className="text-white/80">
              {" "}
              The Sweep feature may be temporarily disabled during server maintenance or special
              events.
            </span>
          </p>
        </div>

        {/* Footer Spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default SweepRules;
