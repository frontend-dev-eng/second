import moment from "moment";
import {HH_mm_ss} from "../assets/constants/Constants";
import {APP_LIGHT_GREY_COLOR, APP_GREEN_COLOR, APP_ENGLISH_VERMILLION_COLOR} from "../assets/constants/Colors";
import {convertMillisecondsToSpecifiedTimeFormat} from "../lib/Utils";

export const REMAINING_TIME_DONUT_CHART = (remainingDurationInMilliseconds, totalBookingDurationInMilliseconds) => {
    const percentageRemaining = (remainingDurationInMilliseconds / totalBookingDurationInMilliseconds) * 100;
    const svgWidth = 160;
    const svgHeight = 160;
    const strokeWidth = 20;
    const radius = (svgWidth - strokeWidth) / 2;
    const cx = svgWidth / 2;
    const cy = svgHeight / 2;
    const endAngle = (percentageRemaining / 100) * 360;
    const remainingTimeArcAndTextColor = remainingDurationInMilliseconds > 600000 ? APP_GREEN_COLOR : APP_ENGLISH_VERMILLION_COLOR;

    const d = `M ${cx}, ${cy - radius} A ${radius}, ${radius} 0 ${endAngle > 180 ? 1 : 0}, 1 ${cx + radius * Math.sin((endAngle * Math.PI) / 180)}, ${cy - radius * Math.cos((endAngle * Math.PI) / 180)}`;

    return (
        <svg id="remaining-time-donut-chart" width={svgWidth} height={svgHeight}>
            <circle cx={cx} cy={cy} r={radius} strokeWidth={strokeWidth} fill="white" stroke={APP_LIGHT_GREY_COLOR}></circle>
            <path d={d} fill="none" stroke={remainingTimeArcAndTextColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <text x={cx} y={cy} textAnchor="middle" alignmentBaseline="middle" fill={remainingTimeArcAndTextColor} fontSize="24">{convertMillisecondsToSpecifiedTimeFormat(remainingDurationInMilliseconds, HH_mm_ss)}</text>
        </svg>
    );
}