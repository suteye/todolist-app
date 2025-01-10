interface StatusIconProps {
    status: "success" | "error" | "info";
}

export default function StatusIcon({ status }: StatusIconProps) {
    switch (status) {
        case "success":
            return (
                <svg className="w-12 h-12 mx-auto mb-4 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
            );
        case "error":
            return (
                <svg className="w-12 h-12 mx-auto mb-4 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            );
        case "info":
            return (
                <svg className="w-12 h-12 mx-auto mb-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 18h.01" />
                </svg>
            );
        default:
            return null;
    }
}