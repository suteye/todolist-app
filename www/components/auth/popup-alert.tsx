"use client";
import { getAnimationClasses } from "@/www/lib/animation";
import React, { useState, useEffect } from "react";
import StatusIcon from "./status-icons";
import { redirect } from "next/navigation";

interface PopupProps {
    title: string;
    message: string;
    status: "success" | "error" | "info";
    onClose: () => void;
}

export default function Popup({ title, message, status, onClose }: PopupProps) {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        if (!isVisible) {
            const timer = setTimeout(() => {
                onClose();
                redirect("/login");
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    const { overlay, content } = getAnimationClasses(isVisible);

    return (
        <div id="popup-modal" tabIndex={-1} className={overlay}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className={content}>
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                        onClick={handleClose}
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        <StatusIcon status={status} />
                        <h3 className="mb-5 text-lg font-normal text-gray-500">{title}</h3>
                        <p className="mb-4 text-gray-700">{message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}