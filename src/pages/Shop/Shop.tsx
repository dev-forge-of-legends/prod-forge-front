import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { ShopItem } from './ShopItem';

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

// Mock data
const shopItems: ShopItem[] = [
  {
    id: '1',
    name: 'Starter Pack',
    price: 500,
    image: '/assets/images/shop/packs/starter.webp',
    category: 'packs',
  },
  {
    id: '2',
    name: 'Advanturer Pack',
    price: 1000,
    image: '/assets/images/shop/packs/advanturer.webp',
    category: 'packs',
  },
  {
    id: '3',
    name: 'Dragon\'s Pack',
    price: 1500,
    image: '/assets/images/shop/packs/dragon.webp',
    category: 'packs',
  },
];

const Shop: React.FC = () => {
  const [activeTab, setActiveTab] = useState("packs");

  const handlePurchase = (item: ShopItem) => {
    console.log("purchase", item);
  };

  return (
    <div className="quicksand-font h-full text-white p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-vastagoRegular text-xl md:text-3xl text-left mb-4">Shop</h1>
        <div className="w-full flex flex-row flex-wrap justify-start items-center gap-3 md:gap-4 mt-4 mb-4">
          <button
            onClick={() => setActiveTab("packs")}
            className="flex items-center transition-all"
          >
            <span className={`font-vastagoMedium text-sm md:text-base hover:text-yellow border-b-2  border-transparent hover:border-yellow transition-colors py-1 md:py-2 ${activeTab === "packs" ? "text-white border-white" : "text-white/50"}`}>
              Currency Packs
            </span>
          </button>
          <button
            onClick={() => setActiveTab("cosmetics")}
            className="flex items-center transition-all"
          >
            <span className={`font-vastagoMedium text-sm md:text-base hover:text-yellow border-b-2  border-transparent hover:border-yellow transition-colors py-1 md:py-2 ${activeTab === "cosmetics" ? "text-white border-white" : "text-white/50"}`}>
              Cosmetics
            </span>
          </button>
          <button
            onClick={() => setActiveTab("boosts")}
            className="flex items-center transition-all"
          >
            <span className={`font-vastagoMedium text-sm md:text-base hover:text-yellow border-b-2  border-transparent hover:border-yellow transition-colors py-1 md:py-2 ${activeTab === "boosts" ? "text-white border-white" : "text-white/50"}`}>
              Boosts
            </span>
          </button>
        </div>
        <div className="flex flex-row mt-4 mb-4 pb-4 border-b-1 border-[#FFFFFF22] gap-4 flex-wrap">
          {shopItems.map((item) => (
            <ShopItem key={item.id} item={item} handlePurchase={handlePurchase} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Shop;