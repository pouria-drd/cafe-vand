import moment from "jalali-moment";
import { twMerge } from "tailwind-merge";
import packageJson from "@/package.json";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getAppVersion() {
    try {
        const version = packageJson.version;
        return version;
    } catch (error) {
        return "1.0.0";
    }
}

export function formatDate(
    dateString: Date | string,
    isPersian: boolean = false
): string {
    const date = new Date(dateString);

    if (isPersian) {
        // Convert to Persian date format
        return moment(date).locale("fa").format("YYYY/MM/DD HH:mm");
    } else {
        // Default date formatting
        const defaultOptions: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, // Use 24-hour time format by default
        };
        return date.toLocaleString(undefined, defaultOptions);
    }
}
