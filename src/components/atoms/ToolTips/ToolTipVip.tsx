import * as Tooltip from '@radix-ui/react-tooltip'
import { VIPSVG } from '../Svgs'

export const ToolTip = () => {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <p className='text-white cursor-pointer relative'>
            <VIPSVG />
          </p>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side='bottom'
            align='center'
            className='w-full max-w-[350px] justify-center bg-black text-white rounded-[12px] quicksand-font opacity-80 shadow-lg z-50'
            sideOffset={8}
          >
            <div className='p-[10px_28px]'>
              <h3 className='text-[24px] mb-[8px] font-medium'>
                VIP Level Benefits
              </h3>
              <p className='text-[16px] mb-[16px]'>Bronze Level Benefits</p>
              <ul className='mb-[16px] pl-[40px] list-decimal'>
                <li className='text-[14px]'>Priority Redemptions</li>
                <li className='text-[14px]'>Monthly Loyalty Gifts</li>
                <li className='text-[14px]'>14 Day&apos;s ST Reviews</li>
                <li className='text-[14px]'>VIP wheel</li>
              </ul>
              <p className='text-[16px] mb-[16px]'>Silver Level Benefits</p>
              <ul className='mb-[16px] pl-[40px] list-decimal'>
                <li className='text-[14px]'>All Bronze Benefits</li>
                <li className='text-[14px]'>Priority Reviews</li>
                <li className='text-[14px]'>Bigger Exclusive Promos</li>
                <li className='text-[14px]'>Birthday Bonus</li>
                <li className='text-[14px]'>Free Spin Gifts</li>
                <li className='text-[14px]'>Priority support</li>
              </ul>
              <p className='text-[16px] mb-[16px]'>Gold Level Benefits</p>
              <ul className='mb-[16px] pl-[40px] list-decimal'>
                <li className='text-[14px]'>All Bronze and Silver Benefits</li>
                <li className='text-[14px]'>Saturday Redemptions</li>
                <li className='text-[14px]'>7 Day&apos;s ST Reviews</li>
                <li className='text-[14px]'>Bigger ST Reviews</li>
                <li className='text-[14px]'>Surprise Random Drops</li>
                <li className='text-[14px]'>Personalized Promos</li>
              </ul>
            </div>
            <Tooltip.Arrow className='fill-black' />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
