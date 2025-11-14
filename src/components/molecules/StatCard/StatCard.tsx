import { Stat } from "@app-types/constants";
import { Image } from "@components/atoms/Image";

interface StatCardProps {
  s: Stat
}

export const StatCard = ({ s }: StatCardProps) => (
  <div className="rounded-xl glass-border px-3 bg-card-gradient sm:px-4 py-2 sm:h-[70px] md:h-[80px] w-auto flex flex-col justify-center min-w-0">
    <div className="flex items-center gap-2">
      <div className="relative top-[1px] w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] rounded-[8px] bg-card-gradient grid place-items-center p-1 sm:p-1.5 shrink-0">
        <Image
          src={s.icon}
          fallbackSrc={s.icon}
          className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
        />
      </div>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] leading-none font-vastagoMedium text-gray break-words">
          {s.label}
        </span>
        <div className="mt-0.5 flex items-baseline gap-1">
          <span className="text-lg sm:text-xl md:text-2xl leading-none text-white font-vastagoSemiBold">
            {s.value}
          </span>
        </div>
      </div>
    </div>
  </div>
);
