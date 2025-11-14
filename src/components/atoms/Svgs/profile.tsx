export const VIPSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
  </svg>
);

export const TransactionHistorySVG = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.0049 5.99976H15.0049C11.6912 5.99976 9.00488 8.68605 9.00488 11.9998C9.00488 15.3135 11.6912 17.9998 15.0049 17.9998H22.0049V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V3.99976C2.00488 3.44747 2.4526 2.99976 3.00488 2.99976H21.0049C21.5572 2.99976 22.0049 3.44747 22.0049 3.99976V5.99976ZM15.0049 7.99976H23.0049V15.9998H15.0049C12.7957 15.9998 11.0049 14.2089 11.0049 11.9998C11.0049 9.79062 12.7957 7.99976 15.0049 7.99976ZM15.0049 10.9998V12.9998H18.0049V10.9998H15.0049Z"
        fill={color}
      />
    </svg>
  );
};

export const RedemHistorySVG = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.2914 5.99994H20.0002C20.5525 5.99994 21.0002 6.44766 21.0002 6.99994V13.9999C21.0002 14.5522 20.5525 14.9999 20.0002 14.9999H18.0002L13.8319 9.16427C13.3345 8.46797 12.4493 8.16522 11.6297 8.41109L9.14444 9.15668C8.43971 9.3681 7.6758 9.17551 7.15553 8.65524L6.86277 8.36247C6.41655 7.91626 6.49011 7.17336 7.01517 6.82332L12.4162 3.22262C13.0752 2.78333 13.9312 2.77422 14.5994 3.1994L18.7546 5.8436C18.915 5.94571 19.1013 5.99994 19.2914 5.99994ZM5.02708 14.2947L3.41132 15.7085C2.93991 16.1209 2.95945 16.8603 3.45201 17.2474L8.59277 21.2865C9.07284 21.6637 9.77592 21.5264 10.0788 20.9963L10.7827 19.7645C11.2127 19.012 11.1091 18.0682 10.5261 17.4269L7.82397 14.4545C7.09091 13.6481 5.84722 13.5771 5.02708 14.2947ZM7.04557 5H3C2.44772 5 2 5.44772 2 6V13.5158C2 13.9242 2.12475 14.3173 2.35019 14.6464C2.3741 14.6238 2.39856 14.6015 2.42357 14.5796L4.03933 13.1658C5.47457 11.91 7.65103 12.0343 8.93388 13.4455L11.6361 16.4179C12.6563 17.5401 12.8376 19.1918 12.0851 20.5087L11.4308 21.6538C11.9937 21.8671 12.635 21.819 13.169 21.4986L17.5782 18.8531C18.0786 18.5528 18.2166 17.8896 17.8776 17.4146L12.6109 10.0361C12.4865 9.86205 12.2652 9.78636 12.0603 9.84783L9.57505 10.5934C8.34176 10.9634 7.00492 10.6264 6.09446 9.7159L5.80169 9.42313C4.68615 8.30759 4.87005 6.45035 6.18271 5.57524L7.04557 5Z"
        fill={color}
      />
    </svg>
  );
};

export const RollerSVG = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 20H22V22H2V20ZM4 12H6V19H4V12ZM9 12H11V19H9V12ZM13 12H15V19H13V12ZM18 12H20V19H18V12ZM2 7L12 2L22 7V11H2V7ZM12 8C12.5523 8 13 7.55228 13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7C11 7.55228 11.4477 8 12 8Z"
        fill={color}
      />
    </svg>
  );
};

export const VaultSVG = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4ZM4 5V19H20V5H4ZM6 7H18V17H6V7ZM8 9V15H16V9H8ZM11 10.5C11 10.2239 11.2239 10 11.5 10H12.5C12.7761 10 13 10.2239 13 10.5V11.5C13 11.7761 12.7761 12 12.5 12H11.5C11.2239 12 11 11.7761 11 11.5V10.5ZM10 13H14V14H10V13Z"
        fill={color}
      />
    </svg>
  )
}

export const KYCStatusSvg = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5C1 4.44772 1.44772 4 2 4H22C22.5523 4 23 4.44772 23 5V19C23 19.5523 22.5523 20 22 20H2C1.44772 20 1 19.5523 1 19V5ZM13 8V10H19V8H13ZM18 12H13V14H18V12ZM10.5 10C10.5 8.61929 9.38071 7.5 8 7.5C6.61929 7.5 5.5 8.61929 5.5 10C5.5 11.3807 6.61929 12.5 8 12.5C9.38071 12.5 10.5 11.3807 10.5 10ZM8 13.5C6.067 13.5 4.5 15.067 4.5 17H11.5C11.5 15.067 9.933 13.5 8 13.5Z"
        fill={color}
      />
    </svg>
  );
};

export const SpentLimitSvg = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z"
        fill={color}
      />
    </svg>
  );
};

export const CommunitySvg = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10ZM5.5 13C6.88071 13 8 11.8807 8 10.5C8 9.11929 6.88071 8 5.5 8C4.11929 8 3 9.11929 3 10.5C3 11.8807 4.11929 13 5.5 13ZM21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8C19.8807 8 21 9.11929 21 10.5ZM12 11C14.7614 11 17 13.2386 17 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5 15.9999C5 15.307 5.10067 14.6376 5.28818 14.0056L5.11864 14.0204C3.36503 14.2104 2 15.6958 2 17.4999V21.9999H5V15.9999ZM22 21.9999V17.4999C22 15.6378 20.5459 14.1153 18.7118 14.0056C18.8993 14.6376 19 15.307 19 15.9999V21.9999H22Z"
        fill={color}
      />
    </svg>
  );
};

export const CreatePostSvg = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.0049 9.99976V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V9.99976H22.0049ZM22.0049 7.99976H2.00488V3.99976C2.00488 3.44747 2.4526 2.99976 3.00488 2.99976H21.0049C21.5572 2.99976 22.0049 3.44747 22.0049 3.99976V7.99976ZM15.0049 15.9998V17.9998H19.0049V15.9998H15.0049Z"
        fill={color}
      />
    </svg>
  );
};

export const SettingSvg = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        fill={color}
      />
    </svg>
  );
};

export const LogoutSVG = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame">
        <path
          id="Vector"
          d="M5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2ZM9 11V8L4 12L9 16V13H15V11H9Z"
          fill="#FF3333"
        />
      </g>
    </svg>
  );
};

export const Plusicon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      className="my-[6px] align-middle"
    >
      <rect width="37" height="37" rx="10" fill="url(#paint0_linear_105_330)" />
      <path d="M18 17V11H20V17H26V19H20V25H18V19H12V17H18Z" fill="#212430" />
      <defs>
        <linearGradient
          id="paint0_linear_105_330"
          x1="0"
          y1="18.5"
          x2="37"
          y2="18.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFC700" />
          <stop offset="0.51" stopColor="#FFECA8" />
          <stop offset="1" stopColor="#FFC700" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const EditProfileSVG = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM6 15V17H18V15H6ZM6 7V13H12V7H6ZM14 7V9H18V7H14ZM14 11V13H18V11H14ZM8 9H10V11H8V9Z"
        fill={color}
      ></path>
    </svg>
  );
};

export const DeactivateAccountSvg = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 11V17H11V11H9ZM13 11V17H15V11H13ZM9 4V6H15V4H9Z"
        fill={color}
      ></path>
    </svg>
  );
};

export const SelfExclusionSvg = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 6V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7ZM13.4142 13.9997L15.182 12.232L13.7678 10.8178L12 12.5855L10.2322 10.8178L8.81802 12.232L10.5858 13.9997L8.81802 15.7675L10.2322 17.1817L12 15.4139L13.7678 17.1817L15.182 15.7675L13.4142 13.9997ZM9 4V6H15V4H9Z"
        fill={color}
      ></path>
    </svg>
  );
};
export const ActivityReminderSvg = ({ color }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"
        fill={color}
      ></path>
    </svg>
  );
};

export const ChangePasswordSvg = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-key-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
        fill={color}
      ></path>
    </svg>
  );
};

export const TopArrow = () => {
  return (
    <img
      src="data:image/png;base64,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"
      alt="top-arrow"
      className="w-16"
    />
  );
};

export const BottomArrow = () => {
  return (
    <img
      src="data:image/png;base64,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"
      alt="bottom-arrow"
      className="w-16 md:w-20 sm:ml-16 ml-6"
    />
  );
};
