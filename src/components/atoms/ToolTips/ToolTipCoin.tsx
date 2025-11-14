import * as Tooltip from '@radix-ui/react-tooltip'
import { FaQuestionCircle } from 'react-icons/fa'
import { Image } from '../Image'

interface TolTipCoinProps {
  amount: number
  imgSrc: string
  info: string
  size?: 'small' | 'big'
}

export const ToolTipCoin = ({
  amount,
  imgSrc,
  info,
  size = 'big'
}: TolTipCoinProps) => {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className='flex justify-center items-center gap-[8px] text-white cursor-pointer'>
            <Image
              src={imgSrc}
              alt='imgSrc'
              loading='lazy'
              className={`${size === 'small' ? 'h-[18px]' : 'h-[30px]'}`}
            />
            <h6
              className={`${size === 'small' ? 'text-[14px]' : 'text-[20px]'}`}
            >
              {amount}
            </h6>
            {size !== 'small' && <FaQuestionCircle size={18} />}
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side='top'
            align='center'
            className='w-full max-w-[350px] justify-center bg-black text-white rounded-[12px] quicksand-font opacity-80 shadow-lg z-50'
            sideOffset={8}
          >
            <div className='p-[10px_28px]'>{info}</div>
            <Tooltip.Arrow className='fill-black' />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
