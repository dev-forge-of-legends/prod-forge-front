import { BgButton } from "@components/atoms/BgButton";
import { Image } from "@components/atoms/Image";

// Types
interface ShopItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'packs' | 'dice' | 'themes' | 'effects' | 'characters';
  isOwned?: boolean;
  isEquipped?: boolean;
}

interface ShopItemProps {
  item: ShopItem;
  handlePurchase: (item: ShopItem) => void;
}

export const ShopItem = (props: ShopItemProps) => {
  const { item, handlePurchase } = props;
  return (
    <div className="flex flex-col items-center justify-between rounded-xl border border-[#383838] bg-gradient-to-br from-[rgba(28,28,28,0.2)] to-[rgba(130,130,130,0.2)] py-8 w-65 h-80">
      < h2 className='text-xl font-bold' > {item.name}</h2 >
      <Image
        src={item.image}
        alt={item.name}
        className="max-w-40 object-cover"
      />
      <div className='flex flex-col items-center justify-between gap-2'>
        <p className='text-md'>{item.price} Coins</p>
        <BgButton
          onClick={() => handlePurchase(item)}
          className="font-bold"
          size="dashboard"
          scale={0.7}
          disabled={false}
        >
          BUY NOW
        </BgButton>
      </div>
    </div >
  )
}