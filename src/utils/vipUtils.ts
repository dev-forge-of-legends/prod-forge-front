import { VipLevelType } from "@app-types/enums";

export const getNextVipLevel = (level: VipLevelType) => {
    switch (level) {
    case VipLevelType.None: return VipLevelType.Bronze;
    case VipLevelType.Bronze: return VipLevelType.Silver;
    case VipLevelType.Silver: return VipLevelType.Gold;
    case VipLevelType.Gold: return VipLevelType.Platinum;
    case VipLevelType.Platinum: return VipLevelType.Diamond;
    default: return VipLevelType.None;
    }
  }