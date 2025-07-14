import { SvgIcon } from "@mui/material";
import { APP_GREEN_COLOR, APP_DARK_PURPLE_COLOR, APP_WHITE_COLOR, APP_RICH_BLACK_COLOR } from "./Colors";


export const ROTATING_LOADING_ICON = (iconFillColor = APP_GREEN_COLOR) => {
  return (
    <svg id="rotating-loading-icon" x="0px" y="0px" viewBox="25 25 50 50">
      <path
        fill={iconFillColor}
        d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="1s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export const CHEVRONS_RIGHT = () => {
  return (
    <svg id="chevrons-right" viewBox="0 0 22.25 25.5">
      <g transform="translate(-54.75 -176.75)">
        <g transform="translate(77 202.25) rotate(180)">
          <path
            fill=''
            d="M2.573,12.75,13.188,23.634a1.113,1.113,0,0,1,0,1.546,1.047,1.047,0,0,1-1.507,0L.312,13.523a1.113,1.113,0,0,1,0-1.546L11.681.32a1.047,1.047,0,0,1,1.507,0,1.113,1.113,0,0,1,0,1.546Z"
          />
        </g>
        <g transform="translate(68.25 202.25) rotate(180)">
          <path
            fill=''
            d="M2.573,12.75,13.188,23.634a1.113,1.113,0,0,1,0,1.546,1.047,1.047,0,0,1-1.507,0L.312,13.523a1.113,1.113,0,0,1,0-1.546L11.681.32a1.047,1.047,0,0,1,1.507,0,1.113,1.113,0,0,1,0,1.546Z"
          />
        </g>
      </g>
    </svg>
  );
};

export const PERSONAL_LOCKER = () => {
  return (
    <SvgIcon sx={{ width: 57, height: 57 }}>
      {/* credit: plus icon from https://heroicons.com/ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="57"
        height="57"
        viewBox="0 0 57 57"
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="0.5"
            x2="0.5"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stop-color="#92c23e" />
            <stop offset="1" stop-color="#669f00" />
          </linearGradient>
        </defs>
        <g id="PersonalLocker" transform="translate(-31 -170)">
          <rect
            id="Rectangle_84"
            data-name="Rectangle 84"
            width="57"
            height="57"
            rx="15"
            transform="translate(31 170)"
            fill="url(#linear-gradient)"
          />
          <g id="person_outline_black_24dp" transform="translate(43 182)">
            <path
              id="Path_19575"
              data-name="Path 19575"
              d="M0,0H32.607V32.607H0Z"
              fill="none"
            />
            <path
              id="Path_19576"
              data-name="Path 19576"
              d="M14.869,6.581a2.853,2.853,0,1,1-2.853,2.853,2.853,2.853,0,0,1,2.853-2.853m0,12.228c4.035,0,8.288,1.984,8.288,2.853v1.495H6.581V21.662c0-.87,4.253-2.853,8.288-2.853M14.869,4A5.435,5.435,0,1,0,20.3,9.435,5.433,5.433,0,0,0,14.869,4Zm0,12.228C11.242,16.228,4,18.048,4,21.662v4.076H25.738V21.662C25.738,18.048,18.5,16.228,14.869,16.228Z"
              transform="translate(1.435 1.435)"
              fill="#fff"
            />
          </g>
        </g>
      </svg>
    </SvgIcon>
  );
};

export const FAVOURITE_ICON = () => {
  return (
    <SvgIcon sx={{ width: '24px', height: '24px' }}>
      <svg id="favorite_black_24dp" xmlns="http://www.w3.org/2000/svg" width="21.697" height="21.697" viewBox="0 0 21.697 21.697">
        <defs>
          <linearGradient id="linear-gradient2" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#ff6464" />
            <stop offset="1" stop-color="#c75252" />
          </linearGradient>
        </defs>
        <path id="Path_19598" data-name="Path 19598" d="M0,0H21.7V21.7H0Z" fill="none" />
        <path id="Path_19599" data-name="Path 19599" d="M11.04,19.589,9.729,18.4C5.074,14.174,2,11.389,2,7.972A4.924,4.924,0,0,1,6.972,3,5.414,5.414,0,0,1,11.04,4.889,5.414,5.414,0,0,1,15.108,3a4.924,4.924,0,0,1,4.972,4.972c0,3.417-3.074,6.2-7.729,10.433Z" transform="translate(-0.192 -0.288)" fill="url(#linear-gradient2)" />
      </svg>
    </SvgIcon>
  )
}

export const SUCCESS_PIN = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg id="Components_Processing_Done" data-name="Components/Processing/Done" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 111 111">
      <g id="Components_Processing_Done-2" data-name="Components/Processing/Done">
        <circle id="Oval" cx="55.5" cy="55.5" r="55.5" fill="#92c23e" />
        <g id="Icons_16px_Check" data-name="Icons/16px/Check" transform="translate(36.757 42.356)">
          <path id="Path" d="M31.7.965a3.294,3.294,0,0,1,4.658,4.658L16.6,25.384a3.294,3.294,0,0,1-4.658,0L.965,14.405A3.294,3.294,0,0,1,5.622,9.747l8.65,8.65Z" transform="translate(0 0)" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}

export const ZONE_ICON = () => {
  return (
    <SvgIcon sx={{ width: 57, height: 57 }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="38.191" height="38.191" viewBox="0 0 38.191 38.191">
        <path id="assistant_navigation_FILL0_wght400_GRAD0_opsz48" d="M17.5,10.279l-5.536,13.4.169.169,5.367-2.43,5.367,2.43.169-.169ZM17.5,31a13.7,13.7,0,0,1-5.333-1.03A13.069,13.069,0,0,1,5.03,22.836,13.7,13.7,0,0,1,4,17.5a13.607,13.607,0,0,1,1.03-5.3A13.178,13.178,0,0,1,7.882,7.916,13.461,13.461,0,0,1,17.5,4,13.394,13.394,0,0,1,31,17.5a13.461,13.461,0,0,1-3.916,9.62A13.178,13.178,0,0,1,22.8,29.975,13.607,13.607,0,0,1,17.5,31Zm0-13.5Zm0-11.477A11.245,11.245,0,0,0,6.025,17.5,11.245,11.245,0,0,0,17.5,28.98,11.245,11.245,0,0,0,28.98,17.5,11.245,11.245,0,0,0,17.5,6.025Z" transform="translate(19.095 -5.657) rotate(45)" fill="#4e7509" />
      </svg>
    </SvgIcon>
  )
}

export const LOCKER_ICON = () => {
  return (
    <SvgIcon sx={{ width: '30px', height: '30px' }}>
      <svg id="lock_black_24dp" xmlns="http://www.w3.org/2000/svg" width="25.264" height="25.264" viewBox="0 0 25.264 25.264">
        <defs>
          <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#92c23e" />
            <stop offset="1" stop-color="#669f00" />
          </linearGradient>
        </defs>
        <g id="Group_12313" data-name="Group 12313">
          <path id="Path_19572" data-name="Path 19572" d="M0,0H25.264V25.264H0Z" fill="none" />
          <path id="Path_19573" data-name="Path 19573" d="M0,0H25.264V25.264H0Z" fill="none" opacity="0.87" />
        </g>
        <path id="Path_19574" data-name="Path 19574" d="M18.737,8.369H17.684V6.263a5.263,5.263,0,0,0-10.527,0V8.369H6.105A2.111,2.111,0,0,0,4,10.474V21a2.111,2.111,0,0,0,2.105,2.105H18.737A2.111,2.111,0,0,0,20.842,21V10.474A2.111,2.111,0,0,0,18.737,8.369ZM9.263,6.263a3.158,3.158,0,0,1,6.316,0V8.369H9.263ZM18.737,21H6.105V10.474H18.737Zm-6.316-3.158a2.105,2.105,0,1,0-2.105-2.105A2.111,2.111,0,0,0,12.421,17.842Z" transform="translate(0.211 0.053)" fill="url(#linear-gradient)" />
      </svg>
    </SvgIcon>
  )
}

export const SUPPORT_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <defs>
        <clipPath id="clip-path">
          <rect id="Rectangle_75" data-name="Rectangle 75" width="26" height="26" transform="translate(24 253)" fill="#3f3356" stroke="#707070" stroke-width="1" />
        </clipPath>
      </defs>
      <g id="Mask_Group_7" data-name="Mask Group 7" transform="translate(-24 -253)" clip-path="url(#clip-path)">
        <g id="support_black_24dp" transform="translate(24 253)">
          <g id="Group_12408" data-name="Group 12408">
            <rect id="Rectangle_76" data-name="Rectangle 76" width="26" height="26" fill="none" />
          </g>
          <g id="Group_12409" data-name="Group 12409">
            <path id="Path_19605" data-name="Path 19605" d="M13,2.167A10.833,10.833,0,1,0,23.833,13,10.837,10.837,0,0,0,13,2.167ZM21.082,9.88,18.07,11.126a5.4,5.4,0,0,0-3.2-3.185L16.12,4.929A8.626,8.626,0,0,1,21.082,9.88ZM13,16.25A3.25,3.25,0,1,1,16.25,13,3.246,3.246,0,0,1,13,16.25ZM9.891,4.918,11.158,7.93A5.417,5.417,0,0,0,7.93,11.148L4.918,9.891A8.65,8.65,0,0,1,9.891,4.918ZM4.918,16.109,7.93,14.863a5.382,5.382,0,0,0,3.218,3.207L9.88,21.082A8.662,8.662,0,0,1,4.918,16.109Zm11.2,4.972L14.874,18.07a5.393,5.393,0,0,0,3.2-3.218l3.012,1.268A8.675,8.675,0,0,1,16.12,21.082Z" fill="#3f3356" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export const DARK_SUPPORT_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <defs>
        <clipPath id="clip-path">
          <rect id="Rectangle_75" data-name="Rectangle 75" width="26" height="26" transform="translate(24 253)" fill="#fff" stroke="#707070" stroke-width="1" />
        </clipPath>
      </defs>
      <g id="Mask_Group_7" data-name="Mask Group 7" transform="translate(-24 -253)" clip-path="url(#clip-path)">
        <g id="support_black_24dp" transform="translate(24 253)">
          <g id="Group_12408" data-name="Group 12408">
            <rect id="Rectangle_76" data-name="Rectangle 76" width="26" height="26" fill="none" />
          </g>
          <g id="Group_12409" data-name="Group 12409">
            <path id="Path_19605" data-name="Path 19605" d="M13,2.167A10.833,10.833,0,1,0,23.833,13,10.837,10.837,0,0,0,13,2.167ZM21.082,9.88,18.07,11.126a5.4,5.4,0,0,0-3.2-3.185L16.12,4.929A8.626,8.626,0,0,1,21.082,9.88ZM13,16.25A3.25,3.25,0,1,1,16.25,13,3.246,3.246,0,0,1,13,16.25ZM9.891,4.918,11.158,7.93A5.417,5.417,0,0,0,7.93,11.148L4.918,9.891A8.65,8.65,0,0,1,9.891,4.918ZM4.918,16.109,7.93,14.863a5.382,5.382,0,0,0,3.218,3.207L9.88,21.082A8.662,8.662,0,0,1,4.918,16.109Zm11.2,4.972L14.874,18.07a5.393,5.393,0,0,0,3.2-3.218l3.012,1.268A8.675,8.675,0,0,1,16.12,21.082Z" fill="#fff" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export const TERM_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <defs>
        <clipPath id="clip-path">
          <rect id="Rectangle_75" data-name="Rectangle 75" width="26" height="26" transform="translate(24 253)" fill="#3f3356" stroke="#707070" stroke-width="1" />
        </clipPath>
      </defs>
      <g id="Mask_Group_11" data-name="Mask Group 11" transform="translate(-24 -253)" clip-path="url(#clip-path)">
        <g id="summarize_black_24dp" transform="translate(24 253)">
          <g id="Group_12413" data-name="Group 12413">
            <path id="Path_19612" data-name="Path 19612" d="M0,0H26V26H0Z" fill="none" />
          </g>
          <g id="Group_12415" data-name="Group 12415">
            <g id="Group_12414" data-name="Group 12414">
              <path id="Path_19613" data-name="Path 19613" d="M16.25,3.25H5.417A2.164,2.164,0,0,0,3.261,5.417L3.25,20.583A2.164,2.164,0,0,0,5.406,22.75H20.583a2.173,2.173,0,0,0,2.167-2.167V9.75ZM5.417,20.583V5.417h9.75v5.417h5.417v9.75ZM9.75,8.667A1.083,1.083,0,1,1,8.667,7.583,1.087,1.087,0,0,1,9.75,8.667ZM9.75,13a1.083,1.083,0,1,1-1.083-1.083A1.087,1.087,0,0,1,9.75,13Zm0,4.333A1.083,1.083,0,1,1,8.667,16.25,1.087,1.087,0,0,1,9.75,17.333Z" fill="#3f3356" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export const darkterm = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <defs>
        <clipPath id="clip-path">
          <rect id="Rectangle_75" data-name="Rectangle 75" width="26" height="26" transform="translate(24 253)" fill="#fff" stroke="#707070" stroke-width="1" />
        </clipPath>
      </defs>
      <g id="Mask_Group_11" data-name="Mask Group 11" transform="translate(-24 -253)" clip-path="url(#clip-path)">
        <g id="summarize_black_24dp" transform="translate(24 253)">
          <g id="Group_12413" data-name="Group 12413">
            <path id="Path_19612" data-name="Path 19612" d="M0,0H26V26H0Z" fill="none" />
          </g>
          <g id="Group_12415" data-name="Group 12415">
            <g id="Group_12414" data-name="Group 12414">
              <path id="Path_19613" data-name="Path 19613" d="M16.25,3.25H5.417A2.164,2.164,0,0,0,3.261,5.417L3.25,20.583A2.164,2.164,0,0,0,5.406,22.75H20.583a2.173,2.173,0,0,0,2.167-2.167V9.75ZM5.417,20.583V5.417h9.75v5.417h5.417v9.75ZM9.75,8.667A1.083,1.083,0,1,1,8.667,7.583,1.087,1.087,0,0,1,9.75,8.667ZM9.75,13a1.083,1.083,0,1,1-1.083-1.083A1.087,1.087,0,0,1,9.75,13Zm0,4.333A1.083,1.083,0,1,1,8.667,16.25,1.087,1.087,0,0,1,9.75,17.333Z" fill="#fff" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export const ABOUT_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <defs>
        <clipPath id="clip-path">
          <rect id="Rectangle_75" data-name="Rectangle 75" width="26" height="26" transform="translate(24 253)" fill="#3f3356" stroke="#707070" stroke-width="1" />
        </clipPath>
      </defs>
      <g id="Mask_Group_9" data-name="Mask Group 9" transform="translate(-24 -253)" clip-path="url(#clip-path)">
        <g id="info_black_24dp" transform="translate(24 253)">
          <path id="Path_19608" data-name="Path 19608" d="M0,0H26V26H0Z" fill="none" />
          <path id="Path_19609" data-name="Path 19609" d="M11.917,7.583h2.167V9.75H11.917Zm0,4.333h2.167v6.5H11.917ZM13,2.167A10.833,10.833,0,1,0,23.833,13,10.837,10.837,0,0,0,13,2.167Zm0,19.5A8.667,8.667,0,1,1,21.667,13,8.678,8.678,0,0,1,13,21.667Z" fill="#3f3356" />
        </g>
      </g>
    </svg>
  );
}

export const DARK_ABOUT_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <defs>
        <clipPath id="clip-path">
          <rect id="Rectangle_75" data-name="Rectangle 75" width="26" height="26" transform="translate(24 253)" fill="#fff" stroke="#707070" stroke-width="1" />
        </clipPath>
      </defs>
      <g id="Mask_Group_9" data-name="Mask Group 9" transform="translate(-24 -253)" clip-path="url(#clip-path)">
        <g id="info_black_24dp" transform="translate(24 253)">
          <path id="Path_19608" data-name="Path 19608" d="M0,0H26V26H0Z" fill="none" />
          <path id="Path_19609" data-name="Path 19609" d="M11.917,7.583h2.167V9.75H11.917Zm0,4.333h2.167v6.5H11.917ZM13,2.167A10.833,10.833,0,1,0,23.833,13,10.837,10.837,0,0,0,13,2.167Zm0,19.5A8.667,8.667,0,1,1,21.667,13,8.678,8.678,0,0,1,13,21.667Z" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}

export const LOGOUT_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <defs>
        <clipPath id="clip-path">
          <rect id="Rectangle_75" data-name="Rectangle 75" width="26" height="26" transform="translate(24 253)" fill="#3f3356" stroke="#707070" stroke-width="1" />
        </clipPath>
      </defs>
      <g id="Mask_Group_10" data-name="Mask Group 10" transform="translate(-24 -253)" clip-path="url(#clip-path)">
        <g id="power_settings_new_black_24dp" transform="translate(24 253)">
          <path id="Path_19610" data-name="Path 19610" d="M0,0H26V26H0Z" fill="none" />
          <path id="Path_19611" data-name="Path 19611" d="M14.083,3.25H11.917V14.083h2.167ZM19.316,5.6,17.778,7.139A7.5,7.5,0,0,1,20.583,13,7.583,7.583,0,1,1,8.212,7.128L6.684,5.6A9.741,9.741,0,1,0,22.75,13,9.677,9.677,0,0,0,19.316,5.6Z" fill="#3f3356" />
        </g>
      </g>
    </svg>
  );
}

export const DARK_LOGOUT_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <defs>
        <clipPath id="clip-path">
          <rect id="Rectangle_75" data-name="Rectangle 75" width="26" height="26" transform="translate(24 253)" fill="#fff" stroke="#707070" stroke-width="1" />
        </clipPath>
      </defs>
      <g id="Mask_Group_10" data-name="Mask Group 10" transform="translate(-24 -253)" clip-path="url(#clip-path)">
        <g id="power_settings_new_black_24dp" transform="translate(24 253)">
          <path id="Path_19610" data-name="Path 19610" d="M0,0H26V26H0Z" fill="none" />
          <path id="Path_19611" data-name="Path 19611" d="M14.083,3.25H11.917V14.083h2.167ZM19.316,5.6,17.778,7.139A7.5,7.5,0,0,1,20.583,13,7.583,7.583,0,1,1,8.212,7.128L6.684,5.6A9.741,9.741,0,1,0,22.75,13,9.677,9.677,0,0,0,19.316,5.6Z" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}

export const DARK_MENU_BACK_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg id="menu_black_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path id="Path_52" data-name="Path 52" d="M0,0H24V24H0Z" fill="none" />
      <g id="Icon" transform="translate(3 3)">
        <path id="Path" d="M1.811,8.75l7.47,7.47A.75.75,0,1,1,8.22,17.28l-8-8a.75.75,0,0,1,0-1.061l8-8A.75.75,0,0,1,9.28,1.28Z" transform="translate(0 0)" fill="#fff" />
      </g>
    </svg>
  );
}

export const MENU_BACK_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg id="menu_black_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path id="Path_52" data-name="Path 52" d="M0,0H24V24H0Z" fill="none" />
      <g id="Icon" transform="translate(3 3)">
        <path id="Path" d="M1.811,8.75l7.47,7.47A.75.75,0,1,1,8.22,17.28l-8-8a.75.75,0,0,1,0-1.061l8-8A.75.75,0,0,1,9.28,1.28Z" transform="translate(0 0)" fill="#1a051d" />
      </g>
    </svg>
  );
}

export const favorite = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg id="favorite_black_24dp" xmlns="http://www.w3.org/2000/svg" width="21.697" height="21.697" viewBox="0 0 21.697 21.697">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#ff6464" />
          <stop offset="1" stop-color="#c75252" />
        </linearGradient>
      </defs>
      <path id="Path_19598" data-name="Path 19598" d="M0,0H21.7V21.7H0Z" fill="none" />
      <path id="Path_19599" data-name="Path 19599" d="M11.04,19.589,9.729,18.4C5.074,14.174,2,11.389,2,7.972A4.924,4.924,0,0,1,6.972,3,5.414,5.414,0,0,1,11.04,4.889,5.414,5.414,0,0,1,15.108,3a4.924,4.924,0,0,1,4.972,4.972c0,3.417-3.074,6.2-7.729,10.433Z" transform="translate(-0.192 -0.288)" fill="url(#linear-gradient)" />
    </svg>
  );
}

export const USER_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="59" height="59" viewBox="0 0 59 59">
      <path id="account_circle_FILL1_wght400_GRAD0_opsz48" d="M14.473,50.094a41.952,41.952,0,0,1,9.182-4.462A30.958,30.958,0,0,1,33.5,44.12a31.3,31.3,0,0,1,9.882,1.512A41.658,41.658,0,0,1,52.6,50.094a25.89,25.89,0,0,0,4.609-8.039A26.654,26.654,0,0,0,58.575,33.5,24.569,24.569,0,0,0,33.5,8.425,24.569,24.569,0,0,0,8.425,33.5a26.015,26.015,0,0,0,1.4,8.555A26.541,26.541,0,0,0,14.473,50.094ZM33.5,35.712a9.95,9.95,0,0,1-10.1-10.1,9.95,9.95,0,0,1,10.1-10.1,9.95,9.95,0,0,1,10.1,10.1,9.95,9.95,0,0,1-10.1,10.1ZM33.5,63a28.909,28.909,0,0,1-11.579-2.323A29.357,29.357,0,0,1,6.286,44.931,29.126,29.126,0,0,1,4,33.426,28.544,28.544,0,0,1,6.323,22a29.482,29.482,0,0,1,6.343-9.366,30.24,30.24,0,0,1,9.4-6.306A28.726,28.726,0,0,1,33.574,4,28.544,28.544,0,0,1,45,6.323,29.454,29.454,0,0,1,60.677,22,28.726,28.726,0,0,1,63,33.5a28.544,28.544,0,0,1-2.323,11.431,30.24,30.24,0,0,1-6.306,9.4A29.482,29.482,0,0,1,45,60.677,28.726,28.726,0,0,1,33.5,63Z" transform="translate(-4 -4)" fill="#fff" />
    </svg>
  );
}

export const SWITCH_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg fill="#000000" width="21.697" height="21.697" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 477.426 477.426">
      <g>
        <polygon points="86.213,143.435 476.213,143.435 476.213,113.435 86.213,113.435 86.213,41.892 0,128.387 86.213,214.319 	" />
        <polygon points="477.426,349.202 391.654,263.43 391.424,334.364 1.213,334.364 1.213,364.364 391.326,364.364 391.095,435.533 	
   "/>
      </g>
    </svg>
  );
}

export const DARK_SWITCH_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg fill="#FFFFFF" width="21.697" height="21.697" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 477.426 477.426">
      <g>
        <polygon points="86.213,143.435 476.213,143.435 476.213,113.435 86.213,113.435 86.213,41.892 0,128.387 86.213,214.319 	" />
        <polygon points="477.426,349.202 391.654,263.43 391.424,334.364 1.213,334.364 1.213,364.364 391.326,364.364 391.095,435.533 	
   "/>
      </g>
    </svg>
  );
}

export const USER_DELETE_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
      width="21.697" height="21.697" viewBox="0 0 57.828 57.827"
    >
      <g>
        <g>
          <circle cx="24.87" cy="13.811" r="13.811" />
          <path d="M6.972,52.484l9.718,2.56c4.215,1.109,11.004,0.979,15.173-0.293l3.93-1.205c2.209,2.614,5.505,4.281,9.188,4.281
       c6.633,0,12.03-5.397,12.03-12.03c0-6.635-5.397-12.032-12.03-12.032c-1.124,0-2.207,0.167-3.239,0.456
       c-2.494-3.016-5.696-5.299-9.631-6.58c-2.292,1.345-4.947,2.129-7.791,2.129c-2.857,0-5.527-0.792-7.826-2.149
       c-7.347,2.302-12.55,7.888-15.278,15.2C-0.311,46.905,2.757,51.374,6.972,52.484z M44.95,35.346
       c5.732,0,10.378,4.646,10.378,10.38c0,5.732-4.646,10.379-10.378,10.379s-10.379-4.646-10.379-10.379
       C34.572,39.992,39.217,35.346,44.95,35.346z"/>
          <path d="M39.138,51.036c0.365,0.402,0.866,0.604,1.37,0.604c0.446,0,0.896-0.16,1.251-0.485l3.19-2.916l3.189,2.916
       c0.356,0.325,0.805,0.485,1.251,0.485c0.502,0,1.003-0.203,1.37-0.604c0.691-0.755,0.638-1.93-0.118-2.621l-2.943-2.691
       l2.943-2.691c0.756-0.691,0.809-1.864,0.118-2.621c-0.691-0.757-1.864-0.808-2.621-0.118l-3.189,2.918l-3.19-2.918
       c-0.757-0.691-1.929-0.638-2.621,0.118c-0.691,0.757-0.639,1.93,0.118,2.621l2.944,2.691l-2.944,2.691
       C38.5,49.106,38.448,50.281,39.138,51.036z"/>
        </g>
      </g>
    </svg>
  );
}


export const DARK_USER_DELETE_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg fill="#fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
      width="21.697" height="21.697" viewBox="0 0 57.828 57.827"
    >
      <g>
        <g>
          <circle cx="24.87" cy="13.811" r="13.811" />
          <path d="M6.972,52.484l9.718,2.56c4.215,1.109,11.004,0.979,15.173-0.293l3.93-1.205c2.209,2.614,5.505,4.281,9.188,4.281
       c6.633,0,12.03-5.397,12.03-12.03c0-6.635-5.397-12.032-12.03-12.032c-1.124,0-2.207,0.167-3.239,0.456
       c-2.494-3.016-5.696-5.299-9.631-6.58c-2.292,1.345-4.947,2.129-7.791,2.129c-2.857,0-5.527-0.792-7.826-2.149
       c-7.347,2.302-12.55,7.888-15.278,15.2C-0.311,46.905,2.757,51.374,6.972,52.484z M44.95,35.346
       c5.732,0,10.378,4.646,10.378,10.38c0,5.732-4.646,10.379-10.378,10.379s-10.379-4.646-10.379-10.379
       C34.572,39.992,39.217,35.346,44.95,35.346z"/>
          <path d="M39.138,51.036c0.365,0.402,0.866,0.604,1.37,0.604c0.446,0,0.896-0.16,1.251-0.485l3.19-2.916l3.189,2.916
       c0.356,0.325,0.805,0.485,1.251,0.485c0.502,0,1.003-0.203,1.37-0.604c0.691-0.755,0.638-1.93-0.118-2.621l-2.943-2.691
       l2.943-2.691c0.756-0.691,0.809-1.864,0.118-2.621c-0.691-0.757-1.864-0.808-2.621-0.118l-3.189,2.918l-3.19-2.918
       c-0.757-0.691-1.929-0.638-2.621,0.118c-0.691,0.757-0.639,1.93,0.118,2.621l2.944,2.691l-2.944,2.691
       C38.5,49.106,38.448,50.281,39.138,51.036z"/>
        </g>
      </g>
    </svg>
  );
}

export const PERSONAL_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg id="person_outline_black_24dp" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <path id="Path_19575" data-name="Path 19575" d="M0,0H26V26H0Z" fill="none" />
      <path id="Path_19576" data-name="Path 19576" d="M12.586,6.039a2.254,2.254,0,1,1-2.254,2.254,2.254,2.254,0,0,1,2.254-2.254m0,9.66c3.188,0,6.547,1.567,6.547,2.254v1.181H6.039V17.953c0-.687,3.359-2.254,6.547-2.254m0-11.7A4.293,4.293,0,1,0,16.88,8.293,4.292,4.292,0,0,0,12.586,4Zm0,9.66C9.721,13.66,4,15.1,4,17.953v3.22H21.173v-3.22C21.173,15.1,15.452,13.66,12.586,13.66Z" transform="translate(0.414 0.414)" fill="#3f3356" />
    </svg>
  );
}

export const DARK_PERSONAL_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg id="person_outline_black_24dp" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <path id="Path_19575" data-name="Path 19575" d="M0,0H26V26H0Z" fill="none" />
      <path id="Path_19576" data-name="Path 19576" d="M12.586,6.039a2.254,2.254,0,1,1-2.254,2.254,2.254,2.254,0,0,1,2.254-2.254m0,9.66c3.188,0,6.547,1.567,6.547,2.254v1.181H6.039V17.953c0-.687,3.359-2.254,6.547-2.254m0-11.7A4.293,4.293,0,1,0,16.88,8.293,4.292,4.292,0,0,0,12.586,4Zm0,9.66C9.721,13.66,4,15.1,4,17.953v3.22H21.173v-3.22C21.173,15.1,15.452,13.66,12.586,13.66Z" transform="translate(0.414 0.414)" fill="#fff" />
    </svg>
  );
}

export const TEAM_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg id="people_black_24dp" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <path id="Path_49" data-name="Path 49" d="M0,0H26V26H0Z" fill="none" />
      <path id="Path_50" data-name="Path 50" d="M9.56,14.376c-2.527,0-7.56,1.254-7.56,3.75V20H17.12V18.126C17.12,15.629,12.087,14.376,9.56,14.376ZM4.527,17.858A10.476,10.476,0,0,1,9.56,16.519a10.476,10.476,0,0,1,5.033,1.339ZM9.56,12.5A3.75,3.75,0,1,0,5.78,8.75,3.769,3.769,0,0,0,9.56,12.5Zm0-5.358A1.607,1.607,0,1,1,7.94,8.75,1.612,1.612,0,0,1,9.56,7.143Zm7.6,7.3a4.485,4.485,0,0,1,2.117,3.686V20H23.6V18.126C23.6,15.962,19.82,14.729,17.164,14.44ZM16.04,12.5a3.75,3.75,0,1,0-1.62-7.126,5.814,5.814,0,0,1,0,6.751A3.746,3.746,0,0,0,16.04,12.5Z" transform="translate(0.2 0.499)" fill="#3f3356" />
    </svg>
  );
}

export const DARK_TEAM_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg id="people_black_24dp" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <path id="Path_49" data-name="Path 49" d="M0,0H26V26H0Z" fill="none" />
      <path id="Path_50" data-name="Path 50" d="M9.56,14.376c-2.527,0-7.56,1.254-7.56,3.75V20H17.12V18.126C17.12,15.629,12.087,14.376,9.56,14.376ZM4.527,17.858A10.476,10.476,0,0,1,9.56,16.519a10.476,10.476,0,0,1,5.033,1.339ZM9.56,12.5A3.75,3.75,0,1,0,5.78,8.75,3.769,3.769,0,0,0,9.56,12.5Zm0-5.358A1.607,1.607,0,1,1,7.94,8.75,1.612,1.612,0,0,1,9.56,7.143Zm7.6,7.3a4.485,4.485,0,0,1,2.117,3.686V20H23.6V18.126C23.6,15.962,19.82,14.729,17.164,14.44ZM16.04,12.5a3.75,3.75,0,1,0-1.62-7.126,5.814,5.814,0,0,1,0,6.751A3.746,3.746,0,0,0,16.04,12.5Z" transform="translate(0.2 0.499)" fill="#fff" />
    </svg>
  );
}

export const CHANGE_PIN_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg id="people_black_24dp" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <path id="Path_49" data-name="Path 49" d="M0,0H26V26H0Z" fill="none" />
      <path id="password_FILL0_wght400_GRAD0_opsz48" d="M2.968,25.587V24.111H22.322v1.476Zm.919-6.145-.968-.532.968-1.645H2V16.176H3.887l-.968-1.645L3.887,14l.919,1.621L5.726,14l.968.532-.968,1.645H7.613v1.089H5.726l.968,1.645-.968.532-.919-1.621Zm7.838,0-.968-.581.968-1.645H9.838V16.127h1.887l-.968-1.645.968-.532.919,1.621.919-1.621.968.532-.968,1.645h1.887v1.089H13.564l.968,1.645-.968.581-.919-1.621Zm7.838,0-.968-.581.968-1.645H17.677V16.127h1.887L18.6,14.482l.968-.532.919,1.621L21.4,13.95l.968.532L21.4,16.127H23.29v1.089H21.4l.968,1.645-.968.581-.919-1.621Z" transform="translate(0.355 -5.775)" fill="#3f3356" />
    </svg>
  );
}

export const DARK_CHANGE_PIN_ICON = (iconFillColor = APP_DARK_PURPLE_COLOR) => {
  return (
    <svg id="people_black_24dp" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
      <path id="Path_49" data-name="Path 49" d="M0,0H26V26H0Z" fill="none" />
      <path id="password_FILL0_wght400_GRAD0_opsz48" d="M2.968,25.587V24.111H22.322v1.476Zm.919-6.145-.968-.532.968-1.645H2V16.176H3.887l-.968-1.645L3.887,14l.919,1.621L5.726,14l.968.532-.968,1.645H7.613v1.089H5.726l.968,1.645-.968.532-.919-1.621Zm7.838,0-.968-.581.968-1.645H9.838V16.127h1.887l-.968-1.645.968-.532.919,1.621.919-1.621.968.532-.968,1.645h1.887v1.089H13.564l.968,1.645-.968.581-.919-1.621Zm7.838,0-.968-.581.968-1.645H17.677V16.127h1.887L18.6,14.482l.968-.532.919,1.621L21.4,13.95l.968.532L21.4,16.127H23.29v1.089H21.4l.968,1.645-.968.581-.919-1.621Z" transform="translate(0.355 -5.775)" fill="#fff" />
    </svg>
  );
}

export const CloseIcon = () => {
  return (
    <svg fill={APP_WHITE_COLOR} height="24" width="24" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 552.855 552.855"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M511.889,157.413c-3.408-25.839-17.051-53.507-39.994-76.445c-22.949-22.95-50.619-36.598-76.463-40 c-11.695-1.542-27.295-8.005-36.652-15.184C338.094,9.915,308.883,0,276.428,0s-61.665,9.915-82.351,25.784 c-9.357,7.179-24.964,13.642-36.653,15.184c-25.845,3.403-53.513,17.05-76.463,40c-22.944,22.938-36.591,50.606-39.994,76.445 c-1.542,11.695-8.005,27.308-15.184,36.665C9.915,214.763,0,243.974,0,276.428c0,32.455,9.915,61.666,25.784,82.352 c7.179,9.357,13.642,24.975,15.184,36.664c3.409,25.84,17.05,53.508,39.994,76.445c22.95,22.949,50.619,36.598,76.463,40 c11.695,1.543,27.295,8.006,36.653,15.184c20.686,15.869,49.896,25.783,82.351,25.783s61.666-9.914,82.351-25.783 c9.357-7.178,24.963-13.641,36.652-15.184c25.844-3.402,53.514-17.051,76.463-40c22.943-22.938,36.586-50.605,39.994-76.445 c1.543-11.695,8.006-27.307,15.184-36.664c15.869-20.686,25.783-49.896,25.783-82.352c0-32.454-9.914-61.665-25.783-82.35 C519.895,184.72,513.432,169.102,511.889,157.413z M421.766,349.562c9.205,9.205,9.205,24.125,0,33.322l-38.881,38.881 c-9.203,9.205-24.125,9.205-33.328,0l-73.128-73.133l-73.134,73.133c-9.205,9.205-24.125,9.205-33.33,0l-38.88-38.881 c-9.205-9.203-9.205-24.125,0-33.322l73.14-73.135l-73.134-73.133c-9.205-9.205-9.205-24.125,0-33.324l38.88-38.88 c9.205-9.204,24.125-9.204,33.33,0l73.128,73.134l73.134-73.134c9.205-9.204,24.125-9.204,33.33,0l38.879,38.88 c9.205,9.205,9.205,24.125,0,33.324l-73.139,73.133L421.766,349.562z"></path> </g> </g> </g></svg>
  );
}

export const DARK_CLOSE_ICON = () => {
  return (
    <svg fill={APP_DARK_PURPLE_COLOR} height="24" width="24" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 552.855 552.855"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M511.889,157.413c-3.408-25.839-17.051-53.507-39.994-76.445c-22.949-22.95-50.619-36.598-76.463-40 c-11.695-1.542-27.295-8.005-36.652-15.184C338.094,9.915,308.883,0,276.428,0s-61.665,9.915-82.351,25.784 c-9.357,7.179-24.964,13.642-36.653,15.184c-25.845,3.403-53.513,17.05-76.463,40c-22.944,22.938-36.591,50.606-39.994,76.445 c-1.542,11.695-8.005,27.308-15.184,36.665C9.915,214.763,0,243.974,0,276.428c0,32.455,9.915,61.666,25.784,82.352 c7.179,9.357,13.642,24.975,15.184,36.664c3.409,25.84,17.05,53.508,39.994,76.445c22.95,22.949,50.619,36.598,76.463,40 c11.695,1.543,27.295,8.006,36.653,15.184c20.686,15.869,49.896,25.783,82.351,25.783s61.666-9.914,82.351-25.783 c9.357-7.178,24.963-13.641,36.652-15.184c25.844-3.402,53.514-17.051,76.463-40c22.943-22.938,36.586-50.605,39.994-76.445 c1.543-11.695,8.006-27.307,15.184-36.664c15.869-20.686,25.783-49.896,25.783-82.352c0-32.454-9.914-61.665-25.783-82.35 C519.895,184.72,513.432,169.102,511.889,157.413z M421.766,349.562c9.205,9.205,9.205,24.125,0,33.322l-38.881,38.881 c-9.203,9.205-24.125,9.205-33.328,0l-73.128-73.133l-73.134,73.133c-9.205,9.205-24.125,9.205-33.33,0l-38.88-38.881 c-9.205-9.203-9.205-24.125,0-33.322l73.14-73.135l-73.134-73.133c-9.205-9.205-9.205-24.125,0-33.324l38.88-38.88 c9.205-9.204,24.125-9.204,33.33,0l73.128,73.134l73.134-73.134c9.205-9.204,24.125-9.204,33.33,0l38.879,38.88 c9.205,9.205,9.205,24.125,0,33.324l-73.139,73.133L421.766,349.562z"></path> </g> </g> </g></svg>
  );
}

export const NOTIFICATION = () => {
  return (
    <svg id="Icons_Nav_Notification_-_Active" data-name="Icons/Nav/Notification - Active" xmlns="http://www.w3.org/2000/svg" width="14.5" height="16.611" viewBox="0 0 14.5 16.611">
      <path id="Path" d="M12.523,6.846V5.476A5.377,5.377,0,0,0,7.25,0,5.377,5.377,0,0,0,1.977,5.476V6.846A3.086,3.086,0,0,1,.958,9.031,2.9,2.9,0,0,0,0,10.953c0,1.711,2.71,2.738,7.25,2.738s7.25-1.027,7.25-2.738a2.9,2.9,0,0,0-.958-1.922,3.086,3.086,0,0,1-1.02-2.186Z" transform="translate(0 0)" fill="#3f3356" />
      <path id="Path-2" data-name="Path" d="M0,0A2.607,2.607,0,0,0,2.476,1.889,2.607,2.607,0,0,0,4.951,0c-.775.059-1.6.09-2.476.09S.775.061,0,0Z" transform="translate(4.774 14.722)" fill="#3f3356" />
    </svg>
  );
}

export const DARK_NOTIFICATION = () => {
  return (
    <svg id="Icons_Nav_Notification_-_Active" data-name="Icons/Nav/Notification - Active" xmlns="http://www.w3.org/2000/svg" width="14.5" height="16.611" viewBox="0 0 14.5 16.611">
      <path id="Path" d="M12.523,6.846V5.476A5.377,5.377,0,0,0,7.25,0,5.377,5.377,0,0,0,1.977,5.476V6.846A3.086,3.086,0,0,1,.958,9.031,2.9,2.9,0,0,0,0,10.953c0,1.711,2.71,2.738,7.25,2.738s7.25-1.027,7.25-2.738a2.9,2.9,0,0,0-.958-1.922,3.086,3.086,0,0,1-1.02-2.186Z" transform="translate(0 0)" fill="#fff" />
      <path id="Path-2" data-name="Path" d="M0,0A2.607,2.607,0,0,0,2.476,1.889,2.607,2.607,0,0,0,4.951,0c-.775.059-1.6.09-2.476.09S.775.061,0,0Z" transform="translate(4.774 14.722)" fill="#fff" />
    </svg>
  );
}

export const HAMBERGER_ICON = () => {
  return (
    <svg id="menu_black_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path id="Path_52" data-name="Path 52" d="M0,0H24V24H0Z" fill="none" />
      <path id="Path_53" data-name="Path 53" d="M3,18H21V16H3Zm0-5H21V11H3ZM3,6V8H21V6Z" fill="#3f3356" />
    </svg>
  );
}

export const DARK_HAMBERGER_ICON = () => {
  return (
    <svg id="menu_black_24dp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path id="Path_52" data-name="Path 52" d="M0,0H24V24H0Z" fill="none" />
      <path id="Path_53" data-name="Path 53" d="M3,18H21V16H3Zm0-5H21V11H3ZM3,6V8H21V6Z" fill="#fff" />
    </svg>
  );
}

export const SearchIcon = ({iconFillColor = APP_RICH_BLACK_COLOR}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
    <path d="M11.1172 19C15.5355 19 19.1172 15.4183 19.1172 11C19.1172 6.58172 15.5355 3 11.1172 3C6.69891 3 3.11719 6.58172 3.11719 11C3.11719 15.4183 6.69891 19 11.1172 19Z" stroke={iconFillColor} stroke-opacity="0.17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21.1172 21L16.7672 16.65" stroke={iconFillColor} stroke-opacity="0.17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  )
}

export const ButtonFloatingIcon = () => {
  return (
    <svg id="Button_Floating_Primary" data-name="Button/Floating/Primary" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#92c23e" />
          <stop offset="1" stop-color="#669f00" />
        </linearGradient>
      </defs>
      <rect id="Frame" width="48" height="48" rx="13" fill="url(#linear-gradient)" />
      <g id="Icons" transform="translate(15 15)">
        <path id="Combined_Shape" data-name="Combined Shape" d="M7.718,17.376V11.282H1.624A1.708,1.708,0,0,1,0,9.5,1.708,1.708,0,0,1,1.624,7.718H7.718V1.624A1.708,1.708,0,0,1,9.5,0a1.708,1.708,0,0,1,1.783,1.624V7.718h6.094A1.708,1.708,0,0,1,19,9.5a1.708,1.708,0,0,1-1.624,1.783H11.282v6.094A1.708,1.708,0,0,1,9.5,19,1.708,1.708,0,0,1,7.718,17.376Z" transform="translate(0 0)" fill="#fff" />
      </g>
    </svg>
  );
}

export const PARCEL_ICON = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="57" height="57" viewBox="0 0 57 57">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#92c23e" />
          <stop offset="1" stop-color="#669f00" />
        </linearGradient>
      </defs>
      <g id="Parcel" transform="translate(-31 -332)">
        <rect id="Rectangle_86" data-name="Rectangle 86" width="57" height="57" rx="15" transform="translate(31 332)" fill="url(#linear-gradient)" />
        <g id="Group_12311" data-name="Group 12311" transform="translate(-196.5 -83.58)">
          <g id="box-package" transform="translate(250.566 430.807)">
            <path id="Path_19571" data-name="Path 19571" d="M20.3,1.644a.474.474,0,0,1,.334.06.467.467,0,0,1,.289.431l.1,13.618a.464.464,0,0,1-.228.424l-5.561,3.318a.463.463,0,0,1-.282.094.363.363,0,0,1-.075-.007L.446,17.977A.467.467,0,0,1,0,17.51V3.661H0A.468.468,0,0,1,.28,3.218L7.52.035h0A.454.454,0,0,1,7.77,0L20.3,1.644ZM15.424,5.79v12.5l4.665-2.782L20,2.907,15.424,5.79Zm-.939,12.8V5.922L8.329,5.136l-.2,5.881L5.966,9.546,3.8,10.768l.447-6.152L.939,4.193v12.9l13.546,1.5ZM13.511,1.7,8.971,4.274l5.905.753,4.139-2.608-5.5-.722ZM4.83,3.745l4.4-2.61L7.78.946l-5.6,2.462,2.651.337Z" transform="translate(0 0)" fill="#fff" stroke="#fff" stroke-width="1" />
          </g>
          <g id="Icon" transform="translate(249.5 438.599) rotate(180)">
            <g id="arrow-n">
              <path id="Path" d="M4.5,0,9,6.071H5.143V9.964a.644.644,0,0,1-1.286,0V6.071H0Z" fill="#fff" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export const CAMERA_ICON = () => {
  return (
    <svg id="photo_camera_black_24dp" xmlns="http://www.w3.org/2000/svg" width="49.853" height="49.853" viewBox="0 0 49.853 49.853">
      <path id="Path_19592" data-name="Path 19592" d="M0,0H49.853V49.853H0Z" fill="none" />
      <path id="Path_19593" data-name="Path 19593" d="M27.176,6.154l3.8,4.154H39.39V35.235H6.154V10.309h8.413l3.8-4.154h8.807M29,2H16.54l-3.8,4.154H6.154A4.167,4.167,0,0,0,2,10.309V35.235A4.167,4.167,0,0,0,6.154,39.39H39.39a4.167,4.167,0,0,0,4.154-4.154V10.309A4.167,4.167,0,0,0,39.39,6.154H32.8ZM22.772,16.54a6.232,6.232,0,1,1-6.232,6.232,6.25,6.25,0,0,1,6.232-6.232m0-4.154A10.386,10.386,0,1,0,33.158,22.772,10.39,10.39,0,0,0,22.772,12.386Z" transform="translate(2.154 2.154)" fill="#1A051D" />
    </svg>
  )
}

export const LOCK_ICON = ({className}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="150" height="150" viewBox="0 0 150 150" className={className}>
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#92c23e" />
          <stop offset="1" stop-color="#669f00" />
        </linearGradient>
      </defs>
      <g id="Group_12310" data-name="Group 12310" transform="translate(-13 -257)">
        <g id="Group_12290" data-name="Group 12290" transform="translate(13 257)">
          <circle id="Ellipse_1204" data-name="Ellipse 1204" cx="75" cy="75" r="75" fill="#dff8b1" />
          <circle id="Ellipse_1205" data-name="Ellipse 1205" cx="4.049" cy="4.049" r="4.049" transform="translate(118.766 48.586)" fill="#fff" />
          <circle id="Ellipse_1206" data-name="Ellipse 1206" cx="5.591" cy="5.591" r="5.591" transform="translate(126.864 35.861)" fill="#fff" />
          <circle id="Ellipse_1207" data-name="Ellipse 1207" cx="1.542" cy="1.542" r="1.542" transform="translate(117.223 37.404)" fill="#fff" />
        </g>
        <g id="lock_black_24dp" transform="translate(57 287.757)">
          <g id="Group_12313" data-name="Group 12313">
            <path id="Path_19572" data-name="Path 19572" d="M0,0H62.486V62.486H0Z" fill="none" />
            <path id="Path_19573" data-name="Path 19573" d="M0,0H62.486V62.486H0Z" fill="none" opacity="0.87" />
          </g>
          <path id="Path_19574" data-name="Path 19574" d="M40.45,19.225h-2.6V14.018a13.018,13.018,0,1,0-26.036,0v5.207h-2.6A5.223,5.223,0,0,0,4,24.432V50.468a5.223,5.223,0,0,0,5.207,5.207H40.45a5.223,5.223,0,0,0,5.207-5.207V24.432A5.223,5.223,0,0,0,40.45,19.225ZM17.018,14.018a7.811,7.811,0,0,1,15.622,0v5.207H17.018ZM40.45,50.468H9.207V24.432H40.45ZM24.829,42.658a5.207,5.207,0,1,0-5.207-5.207A5.223,5.223,0,0,0,24.829,42.658Z" transform="translate(6.414 1.604)" fill="url(#linear-gradient)" />
        </g>
      </g>
    </svg>
  )
}

export const NOTIFICATION_ICON = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <g id="Group_12360" data-name="Group 12360" transform="translate(-113 -241)">
        <g id="Group_12333" data-name="Group 12333">
          <g id="Group_12332" data-name="Group 12332" transform="translate(113 241)">
            <circle id="Ellipse_1204" data-name="Ellipse 1204" cx="75" cy="75" r="75" fill="#dff8b1" />
            <circle id="Ellipse_1205" data-name="Ellipse 1205" cx="4.049" cy="4.049" r="4.049" transform="translate(118.766 48.586)" fill="#dff8b1" />
            <circle id="Ellipse_1206" data-name="Ellipse 1206" cx="5.591" cy="5.591" r="5.591" transform="translate(126.864 35.861)" fill="#dff8b1" />
            <circle id="Ellipse_1207" data-name="Ellipse 1207" cx="1.542" cy="1.542" r="1.542" transform="translate(117.224 37.404)" fill="#dff8b1" />
          </g>
        </g>
        <g id="Group_12344" data-name="Group 12344" transform="translate(149.85 279)">
          <path id="Path_19601" data-name="Path 19601" d="M104.207,132.245h0A5.249,5.249,0,0,1,98.958,127V113.819A18.427,18.427,0,0,0,80.531,95.392h0A18.427,18.427,0,0,0,62.1,113.819V127a5.249,5.249,0,0,1-5.249,5.249h0a3.564,3.564,0,0,0-3.564,3.564v.724a3.564,3.564,0,0,0,3.564,3.564h47.352a3.564,3.564,0,0,0,3.564-3.564v-.724A3.564,3.564,0,0,0,104.207,132.245Z" transform="translate(-39.256 -78.388)" fill="#92c23e" />
          <g id="Group_12344-2" data-name="Group 12344" transform="translate(1.15)">
            <path id="Path_19602" data-name="Path 19602" d="M98.053,51.885a3.941,3.941,0,0,1-3.936-3.936V33.725A21.657,21.657,0,0,0,78.345,12.91a7.783,7.783,0,1,0-11.695,0A21.657,21.657,0,0,0,50.879,33.725V47.948a3.941,3.941,0,0,1-3.936,3.936,5.582,5.582,0,0,0-5.576,5.576v.782a5.582,5.582,0,0,0,5.576,5.576H63.85v1.8a8.648,8.648,0,0,0,17.3,0v-1.8H98.053a5.582,5.582,0,0,0,5.576-5.576V57.46A5.582,5.582,0,0,0,98.053,51.885ZM68.174,7.783A4.324,4.324,0,1,1,72.5,12.106,4.329,4.329,0,0,1,68.174,7.783Zm9.512,57.831a5.188,5.188,0,0,1-10.377,0v-1.8H77.686v1.8Zm22.483-7.371a2.119,2.119,0,0,1-2.117,2.117H46.943a2.119,2.119,0,0,1-2.117-2.117V57.46a2.119,2.119,0,0,1,2.117-2.117,7.4,7.4,0,0,0,7.4-7.4V33.725a18.16,18.16,0,1,1,36.319,0V47.948a7.442,7.442,0,0,0,.071,1.015H81.682a1.729,1.729,0,0,0,0,3.459H92.17a7.387,7.387,0,0,0,5.883,2.921,2.119,2.119,0,0,1,2.117,2.117v.782Z" transform="translate(-35.534)" fill="#535c7d" />
            <path id="Path_19603" data-name="Path 19603" d="M255.045,337.581h-.173a1.729,1.729,0,1,0,0,3.459h.173a1.729,1.729,0,1,0,0-3.459Z" transform="translate(-216.593 -288.618)" fill="#535c7d" />
            <path id="Path_19604" data-name="Path 19604" d="M433.624,73.7a37.341,37.341,0,0,0-10.11-21.574,1.73,1.73,0,1,0-2.5,2.393,33.865,33.865,0,0,1,9.17,19.564,1.73,1.73,0,1,0,3.438-.383Z" transform="translate(-359.707 -44.111)" fill="#535c7d" />
            <path id="Path_19605" data-name="Path 19605" d="M393.863,103.057a1.729,1.729,0,1,0,3.438-.383,30.386,30.386,0,0,0-8.23-17.554,1.729,1.729,0,1,0-2.5,2.393A26.91,26.91,0,0,1,393.863,103.057Z" transform="translate(-330.26 -72.319)" fill="#535c7d" />
            <path id="Path_19606" data-name="Path 19606" d="M13.716,52.074a1.73,1.73,0,0,0-2.445.053A37.344,37.344,0,0,0,1.16,73.7a1.729,1.729,0,1,0,3.438.383,33.865,33.865,0,0,1,9.17-19.564A1.729,1.729,0,0,0,13.716,52.074Z" transform="translate(-1.15 -44.11)" fill="#535c7d" />
            <path id="Path_19607" data-name="Path 19607" d="M50.093,104.584A1.727,1.727,0,0,0,52,103.056a26.909,26.909,0,0,1,7.291-15.544,1.73,1.73,0,0,0-2.5-2.393,30.385,30.385,0,0,0-8.23,17.554A1.73,1.73,0,0,0,50.093,104.584Z" transform="translate(-41.679 -72.318)" fill="#535c7d" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export const LOCK_RED_ICON = () => {
  return (
    <svg id="lock_open_black_24dp" xmlns="http://www.w3.org/2000/svg" width="19.392" height="19.392" viewBox="0 0 19.392 19.392">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#ff6464" />
          <stop offset="1" stop-color="#c75252" />
        </linearGradient>
      </defs>
      <path id="Path_19577" data-name="Path 19577" d="M0,0H19.392V19.392H0Z" fill="none" />
      <path id="Path_19578" data-name="Path 19578" d="M15.312,6.656H14.5V5.04A4.042,4.042,0,0,0,10.464,1c-2.23,0-4.04,1-4.04,3.232H8.04c0-1.341,1.083-1.616,2.424-1.616A2.421,2.421,0,0,1,12.888,5.04V6.656H5.616A1.621,1.621,0,0,0,4,8.272v8.08a1.621,1.621,0,0,0,1.616,1.616h9.7a1.621,1.621,0,0,0,1.616-1.616V8.272A1.621,1.621,0,0,0,15.312,6.656Zm0,9.7h-9.7V8.272h9.7Zm-4.848-2.424a1.616,1.616,0,1,0-1.616-1.616A1.621,1.621,0,0,0,10.464,13.928Z" transform="translate(-0.768 -0.192)" fill="red" />
    </svg>
  );
}

export const LOCKED_ICON = () => {
  return (
    <svg id="lock_black_24dp" xmlns="http://www.w3.org/2000/svg" width="19.392" height="19.392" viewBox="0 0 25.264 25.264">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#92c23e" />
          <stop offset="1" stop-color="#669f00" />
        </linearGradient>
      </defs>
      <g id="Group_12313" data-name="Group 12313">
        <path id="Path_19572" data-name="Path 19572" d="M0,0H25.264V25.264H0Z" fill="none" />
        <path id="Path_19573" data-name="Path 19573" d="M0,0H25.264V25.264H0Z" fill="none" opacity="0.87" />
      </g>
      <path id="Path_19574" data-name="Path 19574" d="M18.737,8.369H17.684V6.263a5.263,5.263,0,0,0-10.527,0V8.369H6.105A2.111,2.111,0,0,0,4,10.474V21a2.111,2.111,0,0,0,2.105,2.105H18.737A2.111,2.111,0,0,0,20.842,21V10.474A2.111,2.111,0,0,0,18.737,8.369ZM9.263,6.263a3.158,3.158,0,0,1,6.316,0V8.369H9.263ZM18.737,21H6.105V10.474H18.737Zm-6.316-3.158a2.105,2.105,0,1,0-2.105-2.105A2.111,2.111,0,0,0,12.421,17.842Z" transform="translate(0.211 0.053)" fill="url(#linear-gradient)" />
    </svg>
  );
}

export const SINGLE_LOCKER_RED = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 150 150">
      <g id="Group_12310" data-name="Group 12310" transform="translate(-13 -257)" opacity="1">

        <g id="Group_12315" data-name="Group 12315" transform="translate(29 180.071)">
          <g id="locker" transform="translate(24 115)">
            <path id="Path_51" data-name="Path 51" d="M8.175,0h56.7a5.554,5.554,0,0,1,3.931,1.635l.006.006A5.554,5.554,0,0,1,70.45,5.572v57.58a5.554,5.554,0,0,1-1.635,3.931l-.006.006a5.554,5.554,0,0,1-3.931,1.635H59.462l-2.236,5.133H50.962l-2.344-5.133H25.944l-2.236,5.133H17.444L15.1,68.725H8.175A5.554,5.554,0,0,1,4.244,67.09l-.006-.006A5.554,5.554,0,0,1,2.6,63.152V58.133H1.383A1.387,1.387,0,0,1,0,56.751V39.03a1.387,1.387,0,0,1,1.383-1.383H2.6v-8H1.383A1.387,1.387,0,0,1,0,28.264V10.537A1.387,1.387,0,0,1,1.383,9.155H2.6V5.572A5.554,5.554,0,0,1,4.238,1.641l.006-.006A5.554,5.554,0,0,1,8.175,0ZM30.482,21.117a1.317,1.317,0,0,1-2.284,1.31L26.473,19.44A18.317,18.317,0,0,0,21.6,24.315l2.994,1.731a1.32,1.32,0,1,1-1.322,2.284l-2.994-1.725A18.2,18.2,0,0,0,18.5,33.259h3.45a1.322,1.322,0,1,1,0,2.645H18.5a18.169,18.169,0,0,0,1.779,6.654l2.994-1.731a1.317,1.317,0,1,1,1.31,2.284l-2.988,1.725a18.317,18.317,0,0,0,4.875,4.875L28.2,46.718a1.32,1.32,0,1,1,2.284,1.322l-1.725,2.994a18.2,18.2,0,0,0,6.654,1.779V49.351a1.322,1.322,0,0,1,2.645,0V52.8a18.169,18.169,0,0,0,6.654-1.779l-1.731-2.994a1.317,1.317,0,1,1,2.284-1.31l1.725,2.988A18.073,18.073,0,0,0,49.658,47.5a18.39,18.39,0,0,0,2.206-2.669l-2.988-1.725a1.317,1.317,0,0,1,1.31-2.284l2.994,1.731A18.115,18.115,0,0,0,54.959,35.9H51.515a1.322,1.322,0,0,1,0-2.645h3.45A18.169,18.169,0,0,0,53.186,26.6L50.193,28.33a1.317,1.317,0,0,1-1.31-2.284l2.988-1.725a18.073,18.073,0,0,0-2.206-2.669,18.39,18.39,0,0,0-2.669-2.206l-1.725,2.988a1.317,1.317,0,1,1-2.284-1.31l1.731-2.994a18.115,18.115,0,0,0-6.654-1.779V19.8a1.322,1.322,0,1,1-2.645,0V16.35a18.169,18.169,0,0,0-6.654,1.779l1.719,2.988ZM5.242,37.647H6.57A1.387,1.387,0,0,1,7.953,39.03V56.757A1.387,1.387,0,0,1,6.57,58.139H5.242v5.019A2.942,2.942,0,0,0,6.1,65.226l.006.006a2.917,2.917,0,0,0,2.068.854h56.7a2.942,2.942,0,0,0,2.068-.854l.006-.006a2.917,2.917,0,0,0,.854-2.068V5.572A2.942,2.942,0,0,0,66.945,3.5L66.939,3.5a2.917,2.917,0,0,0-2.068-.854H8.175A2.942,2.942,0,0,0,6.107,3.5L6.1,3.5a2.917,2.917,0,0,0-.854,2.068V9.155H6.576a1.387,1.387,0,0,1,1.383,1.383V28.264a1.387,1.387,0,0,1-1.383,1.383H5.242v8ZM36.734,23.155A11.411,11.411,0,1,1,28.661,26.5a11.405,11.405,0,0,1,8.073-3.342Zm0-9.51a20.934,20.934,0,1,1-14.8,6.131,20.871,20.871,0,0,1,14.8-6.131Z" fill="red" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export const SINGLE_LOCKER_GREEN = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 150 150">
      <g id="Group_12310" data-name="Group 12310" transform="translate(-13 -257)" opacity="1">

        <g id="Group_12315" data-name="Group 12315" transform="translate(29 180.071)">
          <g id="locker" transform="translate(24 115)">
            <path id="Path_51" data-name="Path 51" d="M8.175,0h56.7a5.554,5.554,0,0,1,3.931,1.635l.006.006A5.554,5.554,0,0,1,70.45,5.572v57.58a5.554,5.554,0,0,1-1.635,3.931l-.006.006a5.554,5.554,0,0,1-3.931,1.635H59.462l-2.236,5.133H50.962l-2.344-5.133H25.944l-2.236,5.133H17.444L15.1,68.725H8.175A5.554,5.554,0,0,1,4.244,67.09l-.006-.006A5.554,5.554,0,0,1,2.6,63.152V58.133H1.383A1.387,1.387,0,0,1,0,56.751V39.03a1.387,1.387,0,0,1,1.383-1.383H2.6v-8H1.383A1.387,1.387,0,0,1,0,28.264V10.537A1.387,1.387,0,0,1,1.383,9.155H2.6V5.572A5.554,5.554,0,0,1,4.238,1.641l.006-.006A5.554,5.554,0,0,1,8.175,0ZM30.482,21.117a1.317,1.317,0,0,1-2.284,1.31L26.473,19.44A18.317,18.317,0,0,0,21.6,24.315l2.994,1.731a1.32,1.32,0,1,1-1.322,2.284l-2.994-1.725A18.2,18.2,0,0,0,18.5,33.259h3.45a1.322,1.322,0,1,1,0,2.645H18.5a18.169,18.169,0,0,0,1.779,6.654l2.994-1.731a1.317,1.317,0,1,1,1.31,2.284l-2.988,1.725a18.317,18.317,0,0,0,4.875,4.875L28.2,46.718a1.32,1.32,0,1,1,2.284,1.322l-1.725,2.994a18.2,18.2,0,0,0,6.654,1.779V49.351a1.322,1.322,0,0,1,2.645,0V52.8a18.169,18.169,0,0,0,6.654-1.779l-1.731-2.994a1.317,1.317,0,1,1,2.284-1.31l1.725,2.988A18.073,18.073,0,0,0,49.658,47.5a18.39,18.39,0,0,0,2.206-2.669l-2.988-1.725a1.317,1.317,0,0,1,1.31-2.284l2.994,1.731A18.115,18.115,0,0,0,54.959,35.9H51.515a1.322,1.322,0,0,1,0-2.645h3.45A18.169,18.169,0,0,0,53.186,26.6L50.193,28.33a1.317,1.317,0,0,1-1.31-2.284l2.988-1.725a18.073,18.073,0,0,0-2.206-2.669,18.39,18.39,0,0,0-2.669-2.206l-1.725,2.988a1.317,1.317,0,1,1-2.284-1.31l1.731-2.994a18.115,18.115,0,0,0-6.654-1.779V19.8a1.322,1.322,0,1,1-2.645,0V16.35a18.169,18.169,0,0,0-6.654,1.779l1.719,2.988ZM5.242,37.647H6.57A1.387,1.387,0,0,1,7.953,39.03V56.757A1.387,1.387,0,0,1,6.57,58.139H5.242v5.019A2.942,2.942,0,0,0,6.1,65.226l.006.006a2.917,2.917,0,0,0,2.068.854h56.7a2.942,2.942,0,0,0,2.068-.854l.006-.006a2.917,2.917,0,0,0,.854-2.068V5.572A2.942,2.942,0,0,0,66.945,3.5L66.939,3.5a2.917,2.917,0,0,0-2.068-.854H8.175A2.942,2.942,0,0,0,6.107,3.5L6.1,3.5a2.917,2.917,0,0,0-.854,2.068V9.155H6.576a1.387,1.387,0,0,1,1.383,1.383V28.264a1.387,1.387,0,0,1-1.383,1.383H5.242v8ZM36.734,23.155A11.411,11.411,0,1,1,28.661,26.5a11.405,11.405,0,0,1,8.073-3.342Zm0-9.51a20.934,20.934,0,1,1-14.8,6.131,20.871,20.871,0,0,1,14.8-6.131Z" fill="green" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export const DuroltLogoIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="141" height="54" viewBox="0 0 147.976 55.139">
      <g id="Group_12473" data-name="Group 12473" transform="translate(-29.427 -59.103)">
        <g id="g18" transform="translate(29.427 86.665)">
          <path id="path20" d="M-71.759-58.143c0-4.942-2.123-6.26-5.418-6.26-.915,0-2.086.036-2.6.073v16.816c.513.037,1.684.073,2.6.073,3.295,0,5.418-1.4,5.418-6.341Zm-5.418,16.01a54.9,54.9,0,0,1-7.8-.549,1.107,1.107,0,0,1-1.062-1.281V-67.88a1.106,1.106,0,0,1,1.062-1.281,54.858,54.858,0,0,1,7.8-.549c7.285,0,11.677,3.843,11.677,11.568v4.361c0,7.724-4.392,11.648-11.677,11.648" transform="translate(86.036 69.71)" fill="#6d6e70" />
        </g>
        <g id="g22" transform="translate(54.285 86.694)">
          <path id="path24" d="M-52.992-138.062c-5.821,0-10.543-2.2-10.543-10.543v-16.229a.7.7,0,0,1,.732-.7h4.8a.7.7,0,0,1,.732.7V-148.6c0,3.734.988,5.308,4.283,5.308s4.319-1.574,4.319-5.308v-16.229a.7.7,0,0,1,.732-.7h4.759a.736.736,0,0,1,.769.7V-148.6c0,8.346-4.759,10.543-10.579,10.543" transform="translate(63.535 165.529)" fill="#6d6e70" />
        </g>
        <g id="g26" transform="translate(80.396 86.682)">
          <path id="path28" d="M-69.735-43.056c0-2.233-1.721-3.258-4.8-3.258-.513,0-2.416.073-2.855.11v7.028c.4.037,2.2.073,2.6.073,3.844,0,5.052-.988,5.052-3.478Zm6.589,18.962h-5.6c-.4,0-.549-.366-.732-.732l-4.906-9.261-.4.037c-.769,0-1.9-.073-2.6-.073v9.3a.735.735,0,0,1-.732.732h-4.759a.735.735,0,0,1-.732-.732V-49.39c0-1.244.513-1.574,1.648-1.757a57.975,57.975,0,0,1,7.431-.476c6.223,0,11.018,2.086,11.018,8.566v.476a7.379,7.379,0,0,1-4.722,7.322l5.527,10.323a.95.95,0,0,1,.11.4c0,.256-.147.439-.549.439" transform="translate(83.609 51.623)" fill="#6d6e70" />
        </g>
        <g id="g30" transform="translate(143.393 86.633)">
          <path id="path32" d="M-74.886-135.976a37.869,37.869,0,0,1-5.967.476c-4.722,0-8.932-1.208-8.932-7.87V-162.3a.735.735,0,0,1,.732-.732h4.8a.734.734,0,0,1,.732.732v18.926c0,1.9.622,2.489,2.343,2.489h6.3a.735.735,0,0,1,.732.732v3.4c0,.476-.22.659-.732.769" transform="translate(89.785 163.029)" fill="#6d6e70" />
        </g>
        <g id="g34" transform="translate(157.745 86.689)">
          <path id="path36" d="M-94.942-25.945h-5.93V-4.288a.734.734,0,0,1-.732.732h-4.8a.734.734,0,0,1-.732-.732V-25.945H-113.1a.7.7,0,0,1-.732-.7v-3.77a.7.7,0,0,1,.732-.7h18.157a.736.736,0,0,1,.769.7v3.77a.736.736,0,0,1-.769.7" transform="translate(113.83 31.107)" fill="#6d6e70" />
        </g>
        <g id="g38" transform="translate(94.203 59.103)">
          <path id="path40" d="M0-46.624l3.951,3.8A37.816,37.816,0,0,1,27.379-50.9a38.693,38.693,0,0,1,23.092,7.657l3.753-3.8A43.664,43.664,0,0,0,27.379-55.9,43.419,43.419,0,0,0,0-46.624" transform="translate(0 55.9)" fill="#8bc53f" />
        </g>
        <g id="g42" transform="translate(101.86 68.648)">
          <path id="path44" d="M0-35.979l3.851,3.667a25.508,25.508,0,0,1,16.255-5.831,25.066,25.066,0,0,1,15.557,5.258l3.732-3.738a30.18,30.18,0,0,0-19.288-6.516A31.018,31.018,0,0,0,0-35.979" transform="translate(0 43.137)" fill="#8bc53f" />
        </g>
        <g id="g46" transform="translate(109.138 77.653)">
          <path id="path48" d="M0-25.218l3.587,3.536A13.522,13.522,0,0,1,12.75-25.24a13.522,13.522,0,0,1,8.669,3.127l3.595-3.544A18.611,18.611,0,0,0,12.75-30.235,18.607,18.607,0,0,0,0-25.218" transform="translate(0 30.235)" fill="#8bc53f" />
        </g>
        <g id="g50" transform="translate(115.847 86.705)">
          <path id="path52" d="M0-12.006,5.756-6.25,11.8-12.3a8.872,8.872,0,0,0-5.737-2.1A8.879,8.879,0,0,0,0-12.006" transform="translate(0 14.395)" fill="#8bc53f" />
        </g>
        <g id="g54" transform="translate(103.622 84.367)">
          <path id="path56" d="M-163.791,0l-3.618,3.592a13.567,13.567,0,0,1,2.586,7.934,13.3,13.3,0,0,1-13.28,13.28,13.3,13.3,0,0,1-13.28-13.28,13.412,13.412,0,0,1,2.3-7.339l-3.7-3.553a18.191,18.191,0,0,0-3.6,10.892A18.275,18.275,0,0,0-178.1,29.8a18.275,18.275,0,0,0,18.275-18.275c0-5.538-1.444-8.407-3.963-11.526" transform="translate(196.377)" fill="#90c141" />
        </g>
      </g>
    </svg>
  );
}

export const GRID_ICON = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="183" height="135" viewBox="0 0 183 135" className={className}>
      <defs>
        <clipPath id="clip-path">
          <rect width="183" height="135" fill="none" />
        </clipPath>
      </defs>
      <g id="Repeat_Grid_1" data-name="Repeat Grid 1" clip-path="url(#clip-path)">
        <g transform="translate(-17 -96)">
          <circle id="Ellipse_41" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(8 -96)">
          <circle id="Ellipse_41-2" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(33 -96)">
          <circle id="Ellipse_41-3" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(58 -96)">
          <circle id="Ellipse_41-4" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(83 -96)">
          <circle id="Ellipse_41-5" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(108 -96)">
          <circle id="Ellipse_41-6" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(133 -96)">
          <circle id="Ellipse_41-7" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(158 -96)">
          <circle id="Ellipse_41-8" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(-17 -71)">
          <circle id="Ellipse_41-9" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(8 -71)">
          <circle id="Ellipse_41-10" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(33 -71)">
          <circle id="Ellipse_41-11" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(58 -71)">
          <circle id="Ellipse_41-12" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(83 -71)">
          <circle id="Ellipse_41-13" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(108 -71)">
          <circle id="Ellipse_41-14" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(133 -71)">
          <circle id="Ellipse_41-15" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(158 -71)">
          <circle id="Ellipse_41-16" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(-17 -46)">
          <circle id="Ellipse_41-17" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(8 -46)">
          <circle id="Ellipse_41-18" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(33 -46)">
          <circle id="Ellipse_41-19" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(58 -46)">
          <circle id="Ellipse_41-20" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(83 -46)">
          <circle id="Ellipse_41-21" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(108 -46)">
          <circle id="Ellipse_41-22" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(133 -46)">
          <circle id="Ellipse_41-23" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(158 -46)">
          <circle id="Ellipse_41-24" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(-17 -21)">
          <circle id="Ellipse_41-25" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(8 -21)">
          <circle id="Ellipse_41-26" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(33 -21)">
          <circle id="Ellipse_41-27" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(58 -21)">
          <circle id="Ellipse_41-28" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(83 -21)">
          <circle id="Ellipse_41-29" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(108 -21)">
          <circle id="Ellipse_41-30" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(133 -21)">
          <circle id="Ellipse_41-31" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(158 -21)">
          <circle id="Ellipse_41-32" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(-17 4)">
          <circle id="Ellipse_41-33" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(8 4)">
          <circle id="Ellipse_41-34" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(33 4)">
          <circle id="Ellipse_41-35" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(58 4)">
          <circle id="Ellipse_41-36" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(83 4)">
          <circle id="Ellipse_41-37" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(108 4)">
          <circle id="Ellipse_41-38" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(133 4)">
          <circle id="Ellipse_41-39" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(158 4)">
          <circle id="Ellipse_41-40" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(-17 29)">
          <circle id="Ellipse_41-41" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(8 29)">
          <circle id="Ellipse_41-42" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(33 29)">
          <circle id="Ellipse_41-43" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(58 29)">
          <circle id="Ellipse_41-44" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(83 29)">
          <circle id="Ellipse_41-45" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(108 29)">
          <circle id="Ellipse_41-46" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(133 29)">
          <circle id="Ellipse_41-47" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
        <g transform="translate(158 29)">
          <circle id="Ellipse_41-48" data-name="Ellipse 41" cx="2.5" cy="2.5" r="2.5" transform="translate(17 96)" fill="#bce277" />
        </g>
      </g>
    </svg>
  );
}

export const CONE_ICON = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="137.695" height="236.84" viewBox="0 0 137.695 236.84" className={className}>
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#92c23e" />
          <stop offset="1" stop-color="#669f00" />
        </linearGradient>
        <linearGradient id="linear-gradient-4" x1="0.686" y1="0.755" x2="0.521" y2="0.112" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#fff" stop-opacity="0" />
          <stop offset="1" stop-color="#fff" stop-opacity="0.8" />
        </linearGradient>
        <linearGradient id="linear-gradient-5" x1="0.681" y1="-8.737" x2="0.521" y2="-8.095" />
        <linearGradient id="linear-gradient-6" x1="0.686" y1="-13.093" x2="0.521" y2="-12.45" />
        <linearGradient id="linear-gradient-7" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#92c23e" stop-opacity="0" />
          <stop offset="1" stop-color="#92c23e" />
        </linearGradient>
      </defs>
      <g id="Group_12436" data-name="Group 12436" transform="translate(-118.653 -143.135)">
        <g id="Group_12435" data-name="Group 12435">
          <g id="Components_Map_Pin_Small" data-name="Components/Map Pin/Small" transform="translate(157.775 185.144)">
            <path id="Combined_Shape" data-name="Combined Shape" d="M28.323,49.388l-6.03-5.917H10a10,10,0,0,1-10-10V10A10,10,0,0,1,10,0H49.449a10,10,0,0,1,10,10V33.47a10,10,0,0,1-10,10H37.155l-6.03,5.917a2.01,2.01,0,0,1-2.8,0Z" transform="translate(0 0)" fill="url(#linear-gradient)" />
          </g>
          <path id="Path_42" data-name="Path 42" d="M-4.864,3.358h3.319l-.218-4.516L1.829,1.2,3.5-1.394-.6-3.571,3.5-5.747,1.829-8.341-1.762-5.983l.218-4.5H-4.864l.236,4.516L-8.256-8.323l-1.65,2.594,4.1,2.158-4.1,2.176L-8.256,1.2l3.627-2.376Zm17.829,0h3.319l-.218-4.516L19.657,1.2l1.669-2.594-4.1-2.176,4.1-2.176L19.657-8.341,16.066-5.983l.218-4.5H12.965L13.2-5.965,9.573-8.323,7.923-5.729l4.1,2.158-4.1,2.176L9.573,1.2,13.2-1.177Zm17.829,0h3.319L33.9-1.158,37.486,1.2l1.669-2.594-4.1-2.176,4.1-2.176L37.486-8.341,33.9-5.983l.218-4.5H30.794l.236,4.516L27.4-8.323l-1.65,2.594,4.1,2.158-4.1,2.176L27.4,1.2l3.627-2.376Z" transform="translate(172.875 210.604)" fill="#fff" stroke="rgba(0,0,0,0)" stroke-width="1" />
        </g>
        <g id="Group_12427" data-name="Group 12427">
          <g id="Group_11" data-name="Group 11" transform="translate(118.653 236.371)">
            <g id="Group" transform="translate(0 68.344)" opacity="0.2">
              <path id="Path" d="M131.964,30.115c7.624,4.139,7.624,10.891.109,15.03L82.843,72.156c-7.624,4.139-19.931,4.139-27.555,0L5.732,45.145c-7.624-4.139-7.624-10.891-.109-15.03L54.852,3.1c7.624-4.139,19.931-4.139,27.555,0Z" transform="translate(0 0)" fill="#606060" />
            </g>
            <path id="Path-2" data-name="Path" d="M129.892.653V1.743c0,.109,0,.218-.109.218s0,.109-.109.218a.381.381,0,0,1-.109.218c0,.109-.109.109-.109.218s-.109.218-.109.327-.109.109-.109.218-.109.218-.109.327-.109.109-.109.218-.109.218-.218.327-.109.109-.109.218-.218.218-.218.327l-.109.109c-.109.218-.327.327-.436.545l-.109.109c-.109.109-.218.327-.436.436l-.218.218c-.109.109-.218.109-.218.218s-.218.109-.218.218-.218.109-.327.218-.218.109-.327.218-.218.109-.327.218-.218.109-.327.218-.218.109-.327.218a.828.828,0,0,1-.436.218L78.2,34.744c-.436.218-.762.436-1.2.653-.109,0-.218.109-.327.109-.436.218-.762.327-1.2.545a.109.109,0,0,0-.109.109,6.143,6.143,0,0,1-1.307.436,3.18,3.18,0,0,1-.98.218,6.937,6.937,0,0,1-.762.218c-.327.109-.653.109-.98.218a2.126,2.126,0,0,1-.762.109H70.25c-.436.109-.871.109-1.307.218h-.327a1.852,1.852,0,0,0-.762.109c-.436,0-.871.109-1.2.109H63.062a2.4,2.4,0,0,1-.871-.109c-.327,0-.653-.109-.871-.109s-.545-.109-.871-.109a3.18,3.18,0,0,1-.98-.218c-.218,0-.545-.109-.762-.109-.436-.109-.762-.218-1.089-.327a6.941,6.941,0,0,1-.762-.218.655.655,0,0,0-.436-.109,4.553,4.553,0,0,1-1.089-.436c-.109,0-.218-.109-.327-.109a3.867,3.867,0,0,1-.98-.436c-.109-.109-.327-.109-.436-.218l-1.307-.653L5.446,7.624C1.852,5.555,0,2.832,0,0V5.01c0,2.723,1.852,5.446,5.446,7.624L52.279,39.645l1.307.653c.109.109.327.109.436.218.327.109.545.218.871.327H55c.109,0,.218.109.327.109a4.553,4.553,0,0,1,1.089.436c.109,0,.218.109.436.109a.381.381,0,0,1,.218.109c.109,0,.327.109.436.109.327.109.762.218,1.089.327a.4.4,0,0,1,.327.109.653.653,0,0,1,.436.109c.327.109.653.109.98.218a.828.828,0,0,1,.436.109h.436c.327,0,.653.109.871.109h4.466a4.084,4.084,0,0,0,1.2-.109h1.089a5.445,5.445,0,0,0,1.307-.218h.436a4.715,4.715,0,0,0,.545-.109c.327-.109.653-.109.98-.218a6.936,6.936,0,0,1,.762-.218,3.18,3.18,0,0,1,.98-.218c.109,0,.109,0,.218-.109a4.553,4.553,0,0,0,1.089-.436.109.109,0,0,0,.109-.109,5.838,5.838,0,0,0,1.2-.545c.109,0,.218-.109.327-.109a11.881,11.881,0,0,0,1.2-.653l46.507-27.011c.109,0,.109-.109.218-.109s.109-.109.218-.109.218-.109.327-.218.218-.109.327-.218.218-.109.327-.218.218-.109.327-.218.218-.109.327-.218.218-.109.218-.218.218-.109.218-.218l.109-.109.109-.109.436-.436.109-.109a1.917,1.917,0,0,0,.436-.545h0l.109-.109c.109-.109.218-.218.218-.327s.109-.109.109-.218.109-.218.218-.327l.218-.218c0-.109.109-.218.109-.327s.109-.109.109-.218.109-.218.109-.327V7.3a.381.381,0,0,1,.109-.218c0-.109,0-.109.109-.218s0-.218.109-.218V.327A.319.319,0,0,1,129.892.653Z" transform="translate(4.578 94.756)" fill="url(#linear-gradient)" />
            <path id="Path-3" data-name="Path" d="M124.664,30.115c7.188,4.139,7.3,10.891.109,15.03L78.31,72.156c-7.188,4.139-18.842,4.139-26.031,0L5.446,45.145c-7.188-4.139-7.3-10.891-.109-15.03L51.844,3.1c7.188-4.139,18.842-4.139,26.031,0Z" transform="translate(4.468 57.343)" fill="#dff8b1" />
            <path id="Path-4" data-name="Path" d="M63.9,21.157c-.871,3.921-3.921,7.624-9.04,10.674-12.525,7.3-32.783,7.3-45.417,0C4.215,28.781,1.166,24.969.294,21.048-1.013,15.493,2.037,9.721,9.334,5.473c12.525-7.3,32.892-7.3,45.417,0C62.158,9.721,65.208,15.6,63.9,21.157Z" transform="translate(36.696 72.945)" fill="#4e7509" />
            <path id="Path-5" data-name="Path" d="M63.606,16.255c-.871,3.921-3.921,7.624-9.04,10.674-12.525,7.3-32.783,7.3-45.417,0C3.921,23.88.871,20.068,0,16.147.871,12.226,3.921,8.523,9.04,5.473c12.525-7.3,32.892-7.3,45.417,0C59.685,8.523,62.735,12.335,63.606,16.255Z" transform="translate(36.99 77.847)" fill="url(#linear-gradient)" />
            <path id="Path-6" data-name="Path" d="M3.05,1.525A1.525,1.525,0,1,0,.762,2.832l.762,47.922h0L2.287,2.832A1.514,1.514,0,0,0,3.05,1.525Z" transform="translate(53.327 75.478)" fill="url(#linear-gradient-4)" />
            <path id="Path-7" data-name="Path" d="M4.574,2.287A2.287,2.287,0,0,0,0,2.287a2.178,2.178,0,0,0,1.2,1.96l1.133,69.27H2.222L3.311,4.248A2.178,2.178,0,0,0,4.574,2.287Z" transform="translate(67.378 49.883)" fill="url(#linear-gradient-5)" />
            <path id="Path-8" data-name="Path" d="M3.05,1.525A1.525,1.525,0,1,0,.762,2.832l.762,47.922h0L2.287,2.832A1.514,1.514,0,0,0,3.05,1.525Z" transform="translate(82.625 69.596)" fill="url(#linear-gradient-6)" />
            <path id="Path-9" data-name="Path" d="M101.073,0H0L18.407,92.142h0a10.728,10.728,0,0,0,.218,1.852c.871,3.921,3.921,7.733,9.149,10.783,12.634,7.3,32.892,7.3,45.417,0,5.119-2.941,8.169-6.753,9.04-10.674a11.979,11.979,0,0,0,.218-1.96h0Z" transform="translate(18.312 0)" fill="url(#linear-gradient-7)" />
          </g>
          <g id="Group_15" data-name="Group 15">
            <ellipse id="Oval" cx="1.852" cy="1.852" rx="1.852" ry="1.852" transform="translate(128.794 219.816)" fill="#b6bdfc" />
            <ellipse id="Oval-2" data-name="Oval" cx="1.852" cy="1.852" rx="1.852" ry="1.852" transform="translate(143.645 159.804)" fill="#b6bdfc" />
            <ellipse id="Oval-3" data-name="Oval" cx="1.852" cy="1.852" rx="1.852" ry="1.852" transform="translate(233.244 245.629)" fill="#b6bdfc" />
            <circle id="Oval-4" data-name="Oval" cx="1.53" cy="1.53" r="1.53" transform="translate(203.954 143.135)" fill="#b6bdfc" />
            <ellipse id="Oval-5" data-name="Oval" cx="1.852" cy="1.852" rx="1.852" ry="1.852" transform="translate(173.341 262.837)" fill="#b6bdfc" />
            <ellipse id="Oval-6" data-name="Oval" cx="1.852" cy="1.852" rx="1.852" ry="1.852" transform="translate(248.166 185.835)" fill="#b6bdfc" />
            <g id="Group-2" data-name="Group" transform="translate(131.191 144.665)">
              <path id="Path-10" data-name="Path" d="M14.812,0,59.032,43.021l-14.812,59.9L0,59.9,14.812,0Z" transform="translate(59.576 0)" fill="none" stroke="#b5bdfc" stroke-width="0.28" />
              <path id="Path-11" data-name="Path" d="M59.576,0,103.8,43.021,44.219,60.012,0,16.991,59.576,0Z" transform="translate(0 59.903)" fill="none" stroke="#b5bdfc" stroke-width="0.28" />
              <path id="Path-12" data-name="Path" d="M74.389,0,59.576,59.9,0,76.894l14.7-59.9L74.389,0Z" transform="translate(0 0)" fill="none" stroke="#b5bdfc" stroke-width="0.28" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export const NEW_LOCKER_ICON = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <g id="Group_12310" data-name="Group 12310" transform="translate(-13 -257)">
        <g id="Group_12290" data-name="Group 12290" transform="translate(13 257)">
          <circle id="Ellipse_1204" data-name="Ellipse 1204" cx="75" cy="75" r="75" fill="#dff8b1" />
          <circle id="Ellipse_1205" data-name="Ellipse 1205" cx="4.049" cy="4.049" r="4.049" transform="translate(118.766 48.586)" fill="#fff" />
          <circle id="Ellipse_1206" data-name="Ellipse 1206" cx="5.591" cy="5.591" r="5.591" transform="translate(126.864 35.861)" fill="#fff" />
          <circle id="Ellipse_1207" data-name="Ellipse 1207" cx="1.542" cy="1.542" r="1.542" transform="translate(117.223 37.404)" fill="#fff" />
        </g>
        <g id="Group_12315" data-name="Group 12315" transform="translate(29 180.071)">
          <g id="locker" transform="translate(24 115)">
            <path id="Path_51" data-name="Path 51" d="M8.175,0h56.7a5.554,5.554,0,0,1,3.931,1.635l.006.006A5.554,5.554,0,0,1,70.45,5.572v57.58a5.554,5.554,0,0,1-1.635,3.931l-.006.006a5.554,5.554,0,0,1-3.931,1.635H59.462l-2.236,5.133H50.962l-2.344-5.133H25.944l-2.236,5.133H17.444L15.1,68.725H8.175A5.554,5.554,0,0,1,4.244,67.09l-.006-.006A5.554,5.554,0,0,1,2.6,63.152V58.133H1.383A1.387,1.387,0,0,1,0,56.751V39.03a1.387,1.387,0,0,1,1.383-1.383H2.6v-8H1.383A1.387,1.387,0,0,1,0,28.264V10.537A1.387,1.387,0,0,1,1.383,9.155H2.6V5.572A5.554,5.554,0,0,1,4.238,1.641l.006-.006A5.554,5.554,0,0,1,8.175,0ZM30.482,21.117a1.317,1.317,0,0,1-2.284,1.31L26.473,19.44A18.317,18.317,0,0,0,21.6,24.315l2.994,1.731a1.32,1.32,0,1,1-1.322,2.284l-2.994-1.725A18.2,18.2,0,0,0,18.5,33.259h3.45a1.322,1.322,0,1,1,0,2.645H18.5a18.169,18.169,0,0,0,1.779,6.654l2.994-1.731a1.317,1.317,0,1,1,1.31,2.284l-2.988,1.725a18.317,18.317,0,0,0,4.875,4.875L28.2,46.718a1.32,1.32,0,1,1,2.284,1.322l-1.725,2.994a18.2,18.2,0,0,0,6.654,1.779V49.351a1.322,1.322,0,0,1,2.645,0V52.8a18.169,18.169,0,0,0,6.654-1.779l-1.731-2.994a1.317,1.317,0,1,1,2.284-1.31l1.725,2.988A18.073,18.073,0,0,0,49.658,47.5a18.39,18.39,0,0,0,2.206-2.669l-2.988-1.725a1.317,1.317,0,0,1,1.31-2.284l2.994,1.731A18.115,18.115,0,0,0,54.959,35.9H51.515a1.322,1.322,0,0,1,0-2.645h3.45A18.169,18.169,0,0,0,53.186,26.6L50.193,28.33a1.317,1.317,0,0,1-1.31-2.284l2.988-1.725a18.073,18.073,0,0,0-2.206-2.669,18.39,18.39,0,0,0-2.669-2.206l-1.725,2.988a1.317,1.317,0,1,1-2.284-1.31l1.731-2.994a18.115,18.115,0,0,0-6.654-1.779V19.8a1.322,1.322,0,1,1-2.645,0V16.35a18.169,18.169,0,0,0-6.654,1.779l1.719,2.988ZM5.242,37.647H6.57A1.387,1.387,0,0,1,7.953,39.03V56.757A1.387,1.387,0,0,1,6.57,58.139H5.242v5.019A2.942,2.942,0,0,0,6.1,65.226l.006.006a2.917,2.917,0,0,0,2.068.854h56.7a2.942,2.942,0,0,0,2.068-.854l.006-.006a2.917,2.917,0,0,0,.854-2.068V5.572A2.942,2.942,0,0,0,66.945,3.5L66.939,3.5a2.917,2.917,0,0,0-2.068-.854H8.175A2.942,2.942,0,0,0,6.107,3.5L6.1,3.5a2.917,2.917,0,0,0-.854,2.068V9.155H6.576a1.387,1.387,0,0,1,1.383,1.383V28.264a1.387,1.387,0,0,1-1.383,1.383H5.242v8ZM36.734,23.155A11.411,11.411,0,1,1,28.661,26.5a11.405,11.405,0,0,1,8.073-3.342Zm0-9.51a20.934,20.934,0,1,1-14.8,6.131,20.871,20.871,0,0,1,14.8-6.131Z" fill="#3f3356" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export const RADIO_UNCHECKED_ICON = () => {
  return (
    <svg id="Components_Radio_Button_Active" data-name="Components/Radio Button/Active" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <g id="Components_Radio_Button_Active-2" data-name="Components/Radio Button/Active">
        <g id="Oval" fill="none" stroke="#92c23e" stroke-width="2">
          <circle cx="12" cy="12" r="12" stroke="none" />
          <circle cx="12" cy="12" r="11" fill="none" />
        </g>
      </g>
    </svg>
  );
}

export const RADIO_CHECKED_ICON = () => {
  return (
    <svg id="Components_Radio_Button_Active" data-name="Components/Radio Button/Active" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#92c23e" />
          <stop offset="1" stop-color="#669f00" />
        </linearGradient>
      </defs>
      <g id="Components_Radio_Button_Active-2" data-name="Components/Radio Button/Active">
        <g id="Oval" fill="none" stroke="#92c23e" stroke-width="2">
          <circle cx="12" cy="12" r="12" stroke="none" />
          <circle cx="12" cy="12" r="11" fill="none" />
        </g>
        <circle id="Oval-2" data-name="Oval" cx="7" cy="7" r="7" transform="translate(5 5)" fill="url(#linear-gradient)" />
      </g>
    </svg>
  );
}

export const DYNAMIC_LOCKER = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#92c23e" />
          <stop offset="1" stop-color="#669f00" />
        </linearGradient>
      </defs>
      <g id="DynamicLocker" transform="translate(-30 -549)">
        <rect id="Rectangle_69" data-name="Rectangle 69" width="57" height="57" rx="15" transform="translate(30 549)" fill="url(#linear-gradient)" />
        <g id="timer-svgrepo-com" transform="translate(42 556.055)">
          <path id="Path_19579" data-name="Path 19579" d="M25.732,9.64l2.282-2.282L25.95,5.293,23.456,7.785A10.26,10.26,0,1,0,25.732,9.64ZM18.22,23.846a7.3,7.3,0,1,1,7.3-7.3A7.308,7.308,0,0,1,18.22,23.846Z" transform="translate(2.76 1.055)" fill="#fff" />
          <path id="Path_19580" data-name="Path 19580" d="M19.52,13.22h2.92v5.84H19.52ZM18.06,3H23.9V5.92H18.06ZM3.46,10.3H9.3v2.92H3.46Zm0,11.68H9.3V24.9H3.46ZM2,16.14H7.826v2.92H2Z" transform="translate(0 0)" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}

export const TEAM_LOCKER = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="57" height="57" viewBox="0 0 57 57">
      <defs><linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#92c23e" />
        <stop offset="1" stop-color="#669f00" />
      </linearGradient></defs><g id="TeamLocker" transform="translate(-31 -412)">
        <rect id="Rectangle_87" data-name="Rectangle 87" width="57" height="57" rx="15" transform="translate(31 412)" fill="url(#linear-gradient)" />
        <g id="people_black_24dp" transform="translate(43 424)">
          <path id="Path_49" data-name="Path 49" d="M0,0H32.794V32.794H0Z" fill="none" />
          <path id="Path_50" data-name="Path 50" d="M11.565,16.956c-3.2,0-9.565,1.6-9.565,4.782V24.13H21.13V21.739C21.13,18.555,14.762,16.956,11.565,16.956ZM5.2,21.4a13.175,13.175,0,0,1,6.367-1.708A13.175,13.175,0,0,1,17.932,21.4Zm6.367-6.832A4.782,4.782,0,1,0,6.782,9.782,4.788,4.788,0,0,0,11.565,14.565Zm0-6.832a2.05,2.05,0,1,1-2.05,2.05A2.047,2.047,0,0,1,11.565,7.733Zm9.62,9.305a5.729,5.729,0,0,1,2.678,4.7V24.13h5.466V21.739C29.328,18.978,24.546,17.407,21.184,17.038Zm-1.421-2.473a4.782,4.782,0,0,0,0-9.565,4.708,4.708,0,0,0-2.05.478,7.462,7.462,0,0,1,0,8.608A4.708,4.708,0,0,0,19.763,14.565Z" transform="translate(0.733 1.832)" fill="#fff" />
        </g></g>
    </svg>
  );
}

export const DUROLT_LOGO_FADE_ICON = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="147.976" height="55.139" viewBox="0 0 147.976 55.139">
      <g id="Group_12473" data-name="Group 12473" transform="translate(-29.427 -59.103)" opacity="0.5">
        <g id="g18" transform="translate(29.427 86.665)">
          <path id="path20" d="M-71.759-58.143c0-4.942-2.123-6.26-5.418-6.26-.915,0-2.086.036-2.6.073v16.816c.513.037,1.684.073,2.6.073,3.295,0,5.418-1.4,5.418-6.341Zm-5.418,16.01a54.9,54.9,0,0,1-7.8-.549,1.107,1.107,0,0,1-1.062-1.281V-67.88a1.106,1.106,0,0,1,1.062-1.281,54.858,54.858,0,0,1,7.8-.549c7.285,0,11.677,3.843,11.677,11.568v4.361c0,7.724-4.392,11.648-11.677,11.648" transform="translate(86.036 69.71)" fill="#6d6e70" />
        </g>
        <g id="g22" transform="translate(54.285 86.694)">
          <path id="path24" d="M-52.992-138.062c-5.821,0-10.543-2.2-10.543-10.543v-16.229a.7.7,0,0,1,.732-.7h4.8a.7.7,0,0,1,.732.7V-148.6c0,3.734.988,5.308,4.283,5.308s4.319-1.574,4.319-5.308v-16.229a.7.7,0,0,1,.732-.7h4.759a.736.736,0,0,1,.769.7V-148.6c0,8.346-4.759,10.543-10.579,10.543" transform="translate(63.535 165.529)" fill="#6d6e70" />
        </g>
        <g id="g26" transform="translate(80.396 86.682)">
          <path id="path28" d="M-69.735-43.056c0-2.233-1.721-3.258-4.8-3.258-.513,0-2.416.073-2.855.11v7.028c.4.037,2.2.073,2.6.073,3.844,0,5.052-.988,5.052-3.478Zm6.589,18.962h-5.6c-.4,0-.549-.366-.732-.732l-4.906-9.261-.4.037c-.769,0-1.9-.073-2.6-.073v9.3a.735.735,0,0,1-.732.732h-4.759a.735.735,0,0,1-.732-.732V-49.39c0-1.244.513-1.574,1.648-1.757a57.975,57.975,0,0,1,7.431-.476c6.223,0,11.018,2.086,11.018,8.566v.476a7.379,7.379,0,0,1-4.722,7.322l5.527,10.323a.95.95,0,0,1,.11.4c0,.256-.147.439-.549.439" transform="translate(83.609 51.623)" fill="#6d6e70" />
        </g>
        <g id="g30" transform="translate(143.393 86.633)">
          <path id="path32" d="M-74.886-135.976a37.869,37.869,0,0,1-5.967.476c-4.722,0-8.932-1.208-8.932-7.87V-162.3a.735.735,0,0,1,.732-.732h4.8a.734.734,0,0,1,.732.732v18.926c0,1.9.622,2.489,2.343,2.489h6.3a.735.735,0,0,1,.732.732v3.4c0,.476-.22.659-.732.769" transform="translate(89.785 163.029)" fill="#6d6e70" />
        </g>
        <g id="g34" transform="translate(157.745 86.689)">
          <path id="path36" d="M-94.942-25.945h-5.93V-4.288a.734.734,0,0,1-.732.732h-4.8a.734.734,0,0,1-.732-.732V-25.945H-113.1a.7.7,0,0,1-.732-.7v-3.77a.7.7,0,0,1,.732-.7h18.157a.736.736,0,0,1,.769.7v3.77a.736.736,0,0,1-.769.7" transform="translate(113.83 31.107)" fill="#6d6e70" />
        </g>
        <g id="g38" transform="translate(94.203 59.103)">
          <path id="path40" d="M0-46.624l3.951,3.8A37.816,37.816,0,0,1,27.379-50.9a38.693,38.693,0,0,1,23.092,7.657l3.753-3.8A43.664,43.664,0,0,0,27.379-55.9,43.419,43.419,0,0,0,0-46.624" transform="translate(0 55.9)" fill="#8bc53f" />
        </g>
        <g id="g42" transform="translate(101.86 68.648)">
          <path id="path44" d="M0-35.979l3.851,3.667a25.508,25.508,0,0,1,16.255-5.831,25.066,25.066,0,0,1,15.557,5.258l3.732-3.738a30.18,30.18,0,0,0-19.288-6.516A31.018,31.018,0,0,0,0-35.979" transform="translate(0 43.137)" fill="#8bc53f" />
        </g>
        <g id="g46" transform="translate(109.138 77.653)">
          <path id="path48" d="M0-25.218l3.587,3.536A13.522,13.522,0,0,1,12.75-25.24a13.522,13.522,0,0,1,8.669,3.127l3.595-3.544A18.611,18.611,0,0,0,12.75-30.235,18.607,18.607,0,0,0,0-25.218" transform="translate(0 30.235)" fill="#8bc53f" />
        </g>
        <g id="g50" transform="translate(115.847 86.705)">
          <path id="path52" d="M0-12.006,5.756-6.25,11.8-12.3a8.872,8.872,0,0,0-5.737-2.1A8.879,8.879,0,0,0,0-12.006" transform="translate(0 14.395)" fill="#8bc53f" />
        </g>
        <g id="g54" transform="translate(103.622 84.367)">
          <path id="path56" d="M-163.791,0l-3.618,3.592a13.567,13.567,0,0,1,2.586,7.934,13.3,13.3,0,0,1-13.28,13.28,13.3,13.3,0,0,1-13.28-13.28,13.412,13.412,0,0,1,2.3-7.339l-3.7-3.553a18.191,18.191,0,0,0-3.6,10.892A18.275,18.275,0,0,0-178.1,29.8a18.275,18.275,0,0,0,18.275-18.275c0-5.538-1.444-8.407-3.963-11.526" transform="translate(196.377)" fill="#90c141" />
        </g>
      </g>
    </svg>
  );
}

export const NO_SHARE_ICON = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#92c23e" />
          <stop offset="1" stop-color="#669f00" />
        </linearGradient>
      </defs>
      <g id="Group_12309" data-name="Group 12309" transform="translate(-108 -232)">
        <g id="Group_12290" data-name="Group 12290" transform="translate(108 232)">
          <circle id="Ellipse_1204" data-name="Ellipse 1204" cx="75" cy="75" r="75" fill="#dff8b1" />
          <circle id="Ellipse_1205" data-name="Ellipse 1205" cx="4.061" cy="4.061" r="4.061" transform="translate(119.135 48.271)" fill="#fff" />
          <circle id="Ellipse_1206" data-name="Ellipse 1206" cx="5.609" cy="5.609" r="5.609" transform="translate(127.257 35.507)" fill="#fff" />
          <circle id="Ellipse_1207" data-name="Ellipse 1207" cx="1.547" cy="1.547" r="1.547" transform="translate(117.587 37.054)" fill="#fff" />
        </g>
        <g id="chat_1_" data-name="chat (1)" transform="translate(141.532 269.674)">
          <g id="Group_12292" data-name="Group 12292" transform="translate(0)">
            <g id="Group_12291" data-name="Group 12291">
              <path id="Path_19570" data-name="Path 19570" d="M36.842,132.352a19.056,19.056,0,0,1-20.757-.232,1.613,1.613,0,0,0-1.314-.216l-4.6,1.232,1.2-4.465a1.614,1.614,0,0,0-.245-1.355,19.039,19.039,0,1,1,33.412-4.523A87.728,87.728,0,0,1,36.842,132.352Z" transform="translate(-3.889 -52.578)" fill="url(#linear-gradient)" />
              <path id="Path_19561" data-name="Path 19561" d="M78.978,46.048A30.046,30.046,0,0,0,37.876,4.41a1.633,1.633,0,0,0,1.706,2.784A26.78,26.78,0,0,1,75.774,44.985a1.633,1.633,0,0,0,.045,1.889l1.789,6.677-7.181-1.924a1.632,1.632,0,0,0-1.369.247,26.808,26.808,0,0,1-24.779,3.29A22.617,22.617,0,0,0,28.431,39.317a26.817,26.817,0,0,1,2.357-23.379,1.633,1.633,0,0,0-2.774-1.722,30.1,30.1,0,0,0-3.25,24.427q-1.1-.109-2.232-.111A22.534,22.534,0,0,0,3.737,73.49L1.99,80.012a1.633,1.633,0,0,0,2,2l6.683-1.791A22.546,22.546,0,0,0,34.6,80.089a1.633,1.633,0,1,0-1.752-2.756,19.278,19.278,0,0,1-21-.235,1.632,1.632,0,0,0-1.329-.219l-4.65,1.246,1.21-4.517a1.633,1.633,0,0,0-.248-1.371,19.26,19.26,0,1,1,33.8-4.576,1.633,1.633,0,1,0,3.068,1.118,22.462,22.462,0,0,0,1.357-7.718q0-1.13-.11-2.232a30.094,30.094,0,0,0,25.359-3.854l9.182,2.46a1.633,1.633,0,0,0,2-2Z" transform="translate(-0.002)" fill="#3f3356" />
            </g>
          </g>
          <g id="Group_12294" data-name="Group 12294" transform="translate(43.706 33.518)">
            <g id="Group_12293" data-name="Group 12293" transform="translate(0 0)">
              <path id="Path_19562" data-name="Path 19562" d="M285.959,216.875H269.33a1.633,1.633,0,0,1-1.633-1.633,9.947,9.947,0,1,1,19.895,0A1.633,1.633,0,0,1,285.959,216.875Zm-8.315-8.315a6.694,6.694,0,0,0-6.48,5.049h12.961A6.7,6.7,0,0,0,277.644,208.561Z" transform="translate(-267.697 -205.295)" fill="#3f3356" />
            </g>
          </g>
          <g id="Group_12296" data-name="Group 12296" transform="translate(62.721 23.684)">
            <g id="Group_12295" data-name="Group 12295">
              <path id="Path_19563" data-name="Path 19563" d="M390.678,146.046a1.992,1.992,0,0,0-2.778-.676l-.263.166a2.1,2.1,0,0,0-.656,2.844,2.007,2.007,0,0,0,1.719.981,1.974,1.974,0,0,0,1.059-.309l.259-.163A2.1,2.1,0,0,0,390.678,146.046Z" transform="translate(-386.679 -145.063)" fill="#3f3356" />
            </g>
          </g>
          <g id="Group_12298" data-name="Group 12298" transform="translate(40.287 23.684)">
            <g id="Group_12297" data-name="Group 12297">
              <path id="Path_19564" data-name="Path 19564" d="M253.271,146.046a1.992,1.992,0,0,0-2.778-.675l-.263.166a2.1,2.1,0,0,0-.656,2.845,2.007,2.007,0,0,0,1.719.981,1.973,1.973,0,0,0,1.059-.309l.259-.163A2.1,2.1,0,0,0,253.271,146.046Z" transform="translate(-249.272 -145.063)" fill="#3f3356" />
            </g>
          </g>
          <g id="Group_12300" data-name="Group 12300" transform="translate(12.893 59.859)">
            <g id="Group_12299" data-name="Group 12299">
              <path id="Path_19565" data-name="Path 19565" d="M76.67,364.629a2.148,2.148,0,1,0,.63,1.52A2.166,2.166,0,0,0,76.67,364.629Z" transform="translate(-73.001 -363.999)" fill="#fff" />
            </g>
          </g>
          <g id="Group_12302" data-name="Group 12302" transform="translate(21.873 59.859)">
            <g id="Group_12301" data-name="Group 12301">
              <path id="Path_19566" data-name="Path 19566" d="M131.67,364.629a2.148,2.148,0,1,0,.63,1.52A2.166,2.166,0,0,0,131.67,364.629Z" transform="translate(-128.001 -363.999)" fill="#fff" />
            </g>
          </g>
          <g id="Group_12304" data-name="Group 12304" transform="translate(30.852 59.859)">
            <g id="Group_12303" data-name="Group 12303">
              <path id="Path_19567" data-name="Path 19567" d="M186.669,364.629a2.148,2.148,0,1,0,.63,1.52A2.166,2.166,0,0,0,186.669,364.629Z" transform="translate(-183 -363.999)" fill="#fff" />
            </g>
          </g>
          <g id="Group_12306" data-name="Group 12306" transform="translate(37.185 72.523)">
            <g id="Group_12305" data-name="Group 12305">
              <path id="Path_19568" data-name="Path 19568" d="M230.547,444.676a1.632,1.632,0,1,0,.478,1.154A1.645,1.645,0,0,0,230.547,444.676Z" transform="translate(-227.76 -444.198)" fill="#535c7d" />
            </g>
          </g>
          <g id="Group_12308" data-name="Group 12308" transform="translate(31.886 8.268)">
            <g id="Group_12307" data-name="Group 12307">
              <path id="Path_19569" data-name="Path 19569" d="M198.088,51.118a1.634,1.634,0,1,0,.478,1.156A1.643,1.643,0,0,0,198.088,51.118Z" transform="translate(-195.301 -50.641)" fill="#535c7d" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export const DANGER_ICON = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15.415" height="13.313" viewBox="0 0 15.415 13.313">
      <g id="Group_12401" data-name="Group 12401" transform="translate(-82 -864)">
        <rect id="Rectangle_70" data-name="Rectangle 70" width="5" height="6" transform="translate(86.691 869.143)" fill="#fff" />
        <path id="warning_black_24dp" d="M1,15.313H16.415L8.708,2Zm8.408-2.1h-1.4v-1.4h1.4Zm0-2.8h-1.4v-2.8h1.4Z" transform="translate(81 862)" fill="#ff6464" />
      </g>
    </svg>
  );
}

export const NO_INTERNET_ICON = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#92c23e" />
          <stop offset="1" stop-color="#669f00" />
        </linearGradient>
      </defs>
      <g id="No_Internet" data-name="No Internet" transform="translate(-13 -257)">
        <g id="Group_12290" data-name="Group 12290" transform="translate(13 257)">
          <circle id="Ellipse_1204" data-name="Ellipse 1204" cx="75" cy="75" r="75" fill="#dff8b1" />
          <circle id="Ellipse_1205" data-name="Ellipse 1205" cx="4.049" cy="4.049" r="4.049" transform="translate(118.766 48.586)" fill="#fff" />
          <circle id="Ellipse_1206" data-name="Ellipse 1206" cx="5.591" cy="5.591" r="5.591" transform="translate(126.864 35.861)" fill="#fff" />
          <circle id="Ellipse_1207" data-name="Ellipse 1207" cx="1.542" cy="1.542" r="1.542" transform="translate(117.223 37.404)" fill="#fff" />
        </g>
        <g id="Group_12289" data-name="Group 12289" transform="translate(49.857 285.286)">
          <g id="plug" transform="translate(0 35.008)">
            <g id="Group_12270" data-name="Group 12270" transform="translate(30.31 0)">
              <g id="Group_12269" data-name="Group 12269">
                <path id="Path_19551" data-name="Path 19551" d="M243.253,61.914H208.292a5.663,5.663,0,0,0-5.656,5.656v34.961a5.663,5.663,0,0,0,5.656,5.656h34.961a5.663,5.663,0,0,0,5.656-5.656V67.57A5.663,5.663,0,0,0,243.253,61.914Zm2.605,40.617a2.608,2.608,0,0,1-2.605,2.605H208.292a2.608,2.608,0,0,1-2.605-2.605V67.57a2.608,2.608,0,0,1,2.605-2.605h34.961a2.608,2.608,0,0,1,2.605,2.605v34.961Z" transform="translate(-202.636 -61.914)" fill="#3f3356" />
              </g>
            </g>
            <g id="Group_12272" data-name="Group 12272" transform="translate(38.32 8.01)">
              <g id="Group_12271" data-name="Group 12271" transform="translate(0 0)">
                <path id="Path_19552" data-name="Path 19552" d="M271.313,115.463A15.127,15.127,0,1,0,286.44,130.59,15.144,15.144,0,0,0,271.313,115.463Zm0,27.2a12.091,12.091,0,0,1-11.976-10.55h.49a1.526,1.526,0,1,0,0-3.051h-.49a12.073,12.073,0,0,1,23.952,0h-.49a1.526,1.526,0,0,0,0,3.051h.49A12.091,12.091,0,0,1,271.313,142.666Z" transform="translate(-256.186 -115.463)" fill="#3f3356" />
              </g>
            </g>
            <g id="Group_12274" data-name="Group 12274" transform="translate(48.068 19.571)">
              <g id="Group_12273" data-name="Group 12273">
                <path id="Path_19553" data-name="Path 19553" d="M322.882,192.757a1.526,1.526,0,0,0-1.526,1.526v4.08a1.526,1.526,0,1,0,3.051,0v-4.08A1.526,1.526,0,0,0,322.882,192.757Z" transform="translate(-321.356 -192.757)" fill="#535c7d" />
              </g>
            </g>
            <g id="Group_12276" data-name="Group 12276" transform="translate(55.775 19.571)">
              <g id="Group_12275" data-name="Group 12275">
                <path id="Path_19554" data-name="Path 19554" d="M374.41,192.757a1.526,1.526,0,0,0-1.526,1.526v4.08a1.526,1.526,0,1,0,3.051,0v-4.08A1.526,1.526,0,0,0,374.41,192.757Z" transform="translate(-372.884 -192.757)" fill="#535c7d" />
              </g>
            </g>
            <g id="Group_12278" data-name="Group 12278" transform="translate(71.568 55.011)">
              <g id="Group_12277" data-name="Group 12277">
                <path id="Path_19555" data-name="Path 19555" d="M481.656,429.687h-1.662a1.526,1.526,0,0,0,0,3.051h1.662a1.526,1.526,0,1,0,0-3.051Z" transform="translate(-478.468 -429.687)" fill="#535c7d" />
              </g>
            </g>
            <g id="Group_12280" data-name="Group 12280" transform="translate(0 2.252)">
              <g id="Group_12279" data-name="Group 12279">
                <path id="Path_19557" data-name="Path 19557" d="M16.944,128.654a9.988,9.988,0,0,1-9.977-9.977V107.812a.758.758,0,0,1,.757-.757H27.81a.758.758,0,0,1,.757.757v10.866a9.988,9.988,0,0,1-9.977,9.977Z" transform="translate(-4.354 -94.651)" fill="url(#linear-gradient)" />
                <path id="Path_19556" data-name="Path 19556" d="M65.839,129.73H26.118a11.056,11.056,0,0,1-11.043-11.043v-5.146a12.484,12.484,0,0,0,11.419-12.422V90.861a3.77,3.77,0,0,0-3.766-3.766H19.634V78.5a1.526,1.526,0,1,0-3.051,0v8.6H9.911V78.5a1.526,1.526,0,1,0-3.051,0v8.6H3.766A3.77,3.77,0,0,0,0,90.861v10.258a12.483,12.483,0,0,0,12.023,12.458v5.11a14.11,14.11,0,0,0,14.094,14.094H65.839a1.526,1.526,0,1,0,0-3.051ZM12.47,110.537a9.429,9.429,0,0,1-9.419-9.419V90.861a.716.716,0,0,1,.715-.715H22.728a.716.716,0,0,1,.715.715v10.258a9.429,9.429,0,0,1-9.419,9.419Z" transform="translate(0 -76.972)" fill="#3f3356" />
              </g>
            </g>
          </g>
          <g id="wifi" transform="translate(4.572 0)">
            <g id="Group_12282" data-name="Group 12282" transform="translate(18.363 29.358)">
              <g id="Group_12281" data-name="Group 12281" transform="translate(0 0)">
                <circle id="Ellipse_1213" data-name="Ellipse 1213" cx="2.825" cy="2.825" r="2.825" fill="url(#linear-gradient)" />
              </g>
            </g>
            <g id="Group_12284" data-name="Group 12284" transform="translate(0 0)">
              <g id="Group_12283" data-name="Group 12283" transform="translate(0 0)">
                <path id="Path_19558" data-name="Path 19558" d="M42.129,54.594a28.428,28.428,0,0,0-41.682,0A1.663,1.663,0,0,0,2.88,56.862a25.1,25.1,0,0,1,36.816,0,1.663,1.663,0,0,0,2.433-2.268Z" transform="translate(0 -45.5)" fill="url(#linear-gradient)" />
              </g>
            </g>
            <g id="Group_12286" data-name="Group 12286" transform="translate(6.07 9.65)">
              <g id="Group_12285" data-name="Group 12285" transform="translate(0 0)">
                <path id="Path_19559" data-name="Path 19559" d="M102.95,167.859a20.353,20.353,0,0,0-29.469,0,1.663,1.663,0,0,0,2.361,2.343,17.029,17.029,0,0,1,24.747,0,1.663,1.663,0,0,0,2.361-2.343Z" transform="translate(-72.998 -161.547)" fill="url(#linear-gradient)" />
              </g>
            </g>
            <g id="Group_12288" data-name="Group 12288" transform="translate(12.563 19.375)">
              <g id="Group_12287" data-name="Group 12287">
                <path id="Path_19560" data-name="Path 19560" d="M167.879,281.975a12,12,0,0,0-8.094-3.475h-.122a12,12,0,0,0-8.094,3.475,1.663,1.663,0,0,0,2.341,2.363,8.685,8.685,0,0,1,5.754-2.512h.122a8.685,8.685,0,0,1,5.753,2.512,1.663,1.663,0,0,0,2.341-2.363Z" transform="translate(-151.076 -278.5)" fill="url(#linear-gradient)" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export const LOCKER_OPEN_ICON = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150" className={className}>
      <defs>
        <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stop-color="#ff6464" />
          <stop offset="1" stop-color="#c75252" />
        </linearGradient>
      </defs>
      <g id="Group_12430" data-name="Group 12430" transform="translate(-113 -302)">
        <g id="Group_12310" data-name="Group 12310" transform="translate(100 45)">
          <g id="Group_12290" data-name="Group 12290" transform="translate(13 257)">
            <circle id="Ellipse_1204" data-name="Ellipse 1204" cx="75" cy="75" r="75" fill="#fbe4e4" />
            <circle id="Ellipse_1205" data-name="Ellipse 1205" cx="4.049" cy="4.049" r="4.049" transform="translate(118.766 48.586)" fill="#fff" />
            <circle id="Ellipse_1206" data-name="Ellipse 1206" cx="5.591" cy="5.591" r="5.591" transform="translate(126.864 35.861)" fill="#fff" />
            <circle id="Ellipse_1207" data-name="Ellipse 1207" cx="1.542" cy="1.542" r="1.542" transform="translate(117.223 37.404)" fill="#fff" />
          </g>
        </g>
        <g id="lock_open_black_24dp" transform="translate(156.304 333.804)">
          <path id="Path_19577" data-name="Path 19577" d="M0,0H62.393V62.393H0Z" fill="none" />
          <path id="Path_19578" data-name="Path 19578" d="M40.4,19.2H37.8V14a13,13,0,0,0-13-13c-7.175,0-13,3.224-13,10.4H17c0-4.315,3.484-5.2,7.8-5.2A7.789,7.789,0,0,1,32.6,14v5.2H9.2A5.215,5.215,0,0,0,4,24.4v26a5.215,5.215,0,0,0,5.2,5.2H40.4a5.215,5.215,0,0,0,5.2-5.2v-26A5.215,5.215,0,0,0,40.4,19.2Zm0,31.2H9.2v-26H40.4ZM24.8,42.6a5.2,5.2,0,1,0-5.2-5.2A5.215,5.215,0,0,0,24.8,42.6Z" transform="translate(6.399 1.6)" fill="url(#linear-gradient)" />
        </g>
      </g>
    </svg>
  );
}

export const UnFavouriteIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 21.73 21.73"><path d="M0,0H21.73V21.73H0Z" fill="none" /><path d="M15.129,3a5.422,5.422,0,0,0-4.074,1.892A5.422,5.422,0,0,0,6.98,3,4.931,4.931,0,0,0,2,7.98C2,11.4,5.078,14.191,9.741,18.428l1.313,1.186,1.313-1.2C17.03,14.191,20.108,11.4,20.108,7.98A4.931,4.931,0,0,0,15.129,3ZM11.145,17.079l-.091.091-.091-.091c-4.31-3.9-7.153-6.483-7.153-9.1A3.094,3.094,0,0,1,6.98,4.811a3.54,3.54,0,0,1,3.232,2.137h1.693a3.517,3.517,0,0,1,3.223-2.137A3.094,3.094,0,0,1,18.3,7.98C18.3,10.6,15.454,13.177,11.145,17.079Z" transform="translate(-0.189 -0.284)" fill="#84799a" /></svg>
  )
}

export const QrCodeIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M0 7.33333H7.33333V0H0V7.33333ZM1.22222 1.22222H6.11111V6.11111H1.22222V1.22222ZM2.44444 2.44444H4.88889V4.88889H2.44444V2.44444ZM14.6667 7.33333H22V0H14.6667V7.33333ZM15.8889 1.22222H20.7778V6.11111H15.8889V1.22222ZM17.1111 2.44444H19.5556V4.88889H17.1111V2.44444ZM0 22H7.33333V14.6667H0V22ZM1.22222 15.8889H6.11111V20.7778H1.22222V15.8889ZM2.44444 17.1111H4.88889V19.5556H2.44444V17.1111ZM20.7778 19.5556H22V22H19.5556V18.3333H20.7778V19.5556ZM20.7778 15.8889H22V17.1111H20.7778V15.8889ZM20.7778 14.6667V15.8889H19.5556V14.6667H20.7778ZM8.55556 17.1111H9.77778V22H8.55556V17.1111ZM3.66667 8.55556V11H1.22222V9.77778H0V8.55556H3.66667ZM8.55556 4.88889H9.77778V6.11111H8.55556V4.88889ZM12.2222 1.22222V3.66667H11V0H13.4444V1.22222H12.2222ZM8.55556 1.22222H9.77778V2.44444H8.55556V1.22222ZM20.7778 11H22V13.4444H19.5556V12.2222H20.7778V11ZM19.5556 8.55556V9.77778H17.1111V12.2222H14.6667V11H15.8889V8.55556H19.5556ZM11 13.4444H9.77778V12.2222H8.55556V11H11V13.4444ZM18.3333 15.8889H19.5556V17.1111H18.3333V15.8889ZM20.7778 9.77778V11H19.5556V9.77778H20.7778ZM9.77778 13.4444V14.6667H8.55556V13.4444H9.77778ZM17.1111 19.5556H18.3333V22H15.8889V19.5556H17.1111ZM13.4444 19.5556H14.6667V20.7778H13.4444V22H11V20.7778H12.2222V19.5556H13.4444ZM13.4444 18.3333V17.1111H15.8889V18.3333H13.4444ZM13.4444 12.2222H14.6667V15.8889H13.4444V17.1111H12.2222V18.3333H11V15.8889H9.77778V14.6667H13.4444V13.4444H12.2222V12.2222H13.4444ZM2.44444 12.2222V13.4444H1.22222V12.2222H2.44444ZM17.1111 17.1111H15.8889V15.8889H17.1111V17.1111ZM18.3333 14.6667H15.8889V13.4444H18.3333V14.6667ZM6.11111 8.55556H7.33333V9.77778H6.11111V11H7.33333V13.4444H6.11111V12.2222H4.88889V13.4444H3.66667V11H4.88889V8.55556H6.11111ZM9.77778 8.55556V6.11111H13.4444V9.77778H11V8.55556H12.2222V7.33333H11V8.55556H9.77778ZM9.77778 3.66667H11V4.88889H9.77778V3.66667ZM8.55556 8.55556H9.77778V9.77778H8.55556V8.55556ZM12.2222 4.88889V3.66667H13.4444V4.88889H12.2222Z" fill="white" />
    </svg>
  )
}

export const BarcodeIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <g clip-path="url(#clip0_306_103)">
        <path d="M8.25 4.5H5.75C5.41848 4.5 5.10054 4.6317 4.86612 4.86612C4.6317 5.10054 4.5 5.41848 4.5 5.75V8.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15.75 4.5H18.25C18.5815 4.5 18.8995 4.6317 19.1339 4.86612C19.3683 5.10054 19.5 5.41848 19.5 5.75V8.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M19.5 15.75V18.25C19.5 18.5815 19.3683 18.8995 19.1339 19.1339C18.8995 19.3683 18.5815 19.5 18.25 19.5H15.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M8.25 19.5H5.75C5.41848 19.5 5.10054 19.3683 4.86612 19.1339C4.6317 18.8995 4.5 18.5815 4.5 18.25V15.75" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4.5 12H19.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_306_103">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const UpArrowIcon = ({iconFillColor = APP_RICH_BLACK_COLOR}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M16.5 13.75L11 8.25L5.5 13.75" stroke={iconFillColor} stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export const DownArrowIcon = ({iconFillColor = APP_RICH_BLACK_COLOR}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M5.5 8.25L11 13.75L16.5 8.25" stroke={iconFillColor} stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export const DottedLineUp = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
  <path d="M0 1H19.0526C19.0526 1 29 1.42424 29 10.3333C29 19.2424 29 29 29 29" stroke="#9E9E9E" stroke-dasharray="5 5"/>
</svg>
  )
}

export const DottedLineDown = () => {
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" viewBox="0 0 30 29" fill="none">
  <path d="M0 28H19.0526C19.0526 28 29 27.5758 29 18.6667C29 9.75758 29 0 29 0" stroke="#9E9E9E" stroke-dasharray="5 5"/>
</svg>
  )
}

export const QrCodeFinderIcon = () => {
  return (
    <svg width="193" height="192" viewBox="0 0 193 192" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 38.8009V3H190V38.8009M3 151.142V189H190V151.142" stroke="white" stroke-width="5" />
    </svg>

  )
}

export const FaceBookIcon = () => {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.535 0.00390865C8.01959 0.00216978 5.59534 0.946665 3.74309 2.65008C1.89083 4.3535 0.745856 6.69141 0.535234 9.20018C0.324613 11.7089 1.06373 14.2053 2.606 16.1942C4.14827 18.1831 6.38104 19.5192 8.86152 19.9376V12.1403H6.44153V9.33563H8.86152V7.26705C8.8124 6.77663 8.87103 6.2814 9.03331 5.81606C9.19559 5.35071 9.45759 4.92652 9.80095 4.5732C10.1443 4.21989 10.5607 3.94601 11.021 3.77075C11.4812 3.5955 11.9742 3.52311 12.4654 3.55866C13.1876 3.55667 13.9094 3.59387 14.6276 3.67012V6.18054H13.1437C11.9798 6.18054 11.7561 6.73384 11.7561 7.54621V9.33362H14.5322L14.17 12.1393H11.7551V20.0039C14.2774 19.6771 16.5815 18.4037 18.2015 16.4414C19.8214 14.479 20.6363 11.9742 20.4813 9.43341C20.3263 6.89264 19.213 4.5056 17.3666 2.75508C15.5201 1.00456 13.0783 0.0212057 10.535 0.00390865Z" fill="white" />
    </svg>
  )
}

export const GoogleIcon = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_0_96" styles="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
    <path d="M0 10.001C0.0115868 11.3306 0.285735 12.6448 0.806681 13.8681C1.32763 15.0913 2.08509 16.1994 3.03553 17.1287C3.98597 18.0581 5.11063 18.7902 6.34484 19.2832C7.57906 19.7761 8.89848 20.0201 10.2273 20.001C11.538 20.0338 12.8413 19.7957 14.0559 19.3017C15.2705 18.8077 16.3703 18.0683 17.2864 17.1298C18.2025 16.1913 18.9153 15.0739 19.3803 13.8473C19.8452 12.6207 20.0524 11.3113 19.9888 10.001C19.98 9.38818 19.9019 8.77829 19.7559 8.18303H10.2273V12.047H15.7122C15.2005 14.502 13.0627 15.911 10.2273 15.911C9.43878 15.9316 8.65418 15.7939 7.91973 15.5062C7.18528 15.2185 6.51584 14.7865 5.95091 14.2358C5.38598 13.685 4.93699 13.0267 4.63042 12.2995C4.32385 11.5724 4.1659 10.7912 4.1659 10.002C4.1659 9.21285 4.32385 8.43165 4.63042 7.70452C4.93699 6.97739 5.38598 6.31905 5.95091 5.76831C6.51584 5.21758 7.18528 4.78561 7.91973 4.49789C8.65418 4.21016 9.43878 4.07251 10.2273 4.09303C11.5956 4.08937 12.9241 4.55409 13.9921 5.41003L16.9675 2.50103C15.0929 0.886107 12.7009 -0.00112768 10.2273 0.00103327C8.89848 -0.0179954 7.57906 0.225969 6.34484 0.718901C5.11063 1.21183 3.98597 1.94401 3.03553 2.87332C2.08509 3.80264 1.32763 4.91077 0.806681 6.134C0.285735 7.35723 0.0115868 8.67143 0 10.001Z" fill="white"/>
    </mask>
    <g mask="url(#mask0_0_96)">
    <path d="M-1.92969 15.9098V4.0918L5.97287 10.0008L-1.92969 15.9098Z" fill="white"/>
    <path d="M-1.92969 4.0918L5.97287 10.0008L9.22704 7.2278L20.3838 5.4558V-0.908203H-1.92969V4.0918Z" fill="white"/>
    <path d="M-1.92969 15.9098L12.0155 5.4558L15.6874 5.9108L20.3838 -0.908203V20.9098H-1.92969V15.9098Z" fill="white"/>
    <path d="M20.3831 20.9098L5.97224 10.0008L4.11328 8.6368L20.3831 4.0918V20.9098Z" fill="white"/>
    </g>
    </svg>
  )
}


