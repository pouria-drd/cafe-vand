"use client";

import { Input } from "..";
import React, {
    useState,
    useRef,
    ClipboardEvent,
    ChangeEvent,
    KeyboardEvent,
} from "react";

interface MultiInputCodeProps {
    length?: number; // Optional length prop
    onChange?: (code: string) => void; // Optional callback function for when the code changes
}

const MultiInputCode: React.FC<MultiInputCodeProps> = ({
    length = 6,
    onChange,
}) => {
    // Array to store input values
    const [code, setCode] = useState<string[]>(Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Function to handle changes in each input box
    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        // Ensure the input is alphanumeric and only one character long
        if (/^[0-9a-zA-Z]$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Call the onChange prop with the updated code
            if (onChange) {
                onChange(newCode.join(""));
            }

            // Move to the next input box if available
            if (index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    // Function to handle backspace and delete navigation
    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        const key = e.key;

        if (key === "Backspace" || key === "Delete") {
            const newCode = [...code];

            if (code[index] !== "") {
                // Clear current input
                newCode[index] = "";
                setCode(newCode);
                if (onChange) {
                    onChange(newCode.join(""));
                }
            } else if (key === "Backspace" && index > 0) {
                // Move focus to the previous input if empty
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    // Function to handle pasting of multiple characters
    const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
        const pastedData = e.clipboardData.getData("text").slice(0, length);
        const newCode = pastedData.split("");
        const filledCode = [...code];

        newCode.forEach((char, i) => {
            if (i < length) {
                filledCode[i] = char;
            }
        });

        setCode(filledCode);
        inputRefs.current[newCode.length - 1]?.focus();

        if (onChange) {
            onChange(filledCode.join(""));
        }

        e.preventDefault();
    };

    return (
        <div
            className="flex items-center justify-between gap-2 w-full"
            onPaste={handlePaste}>
            {code.map((value, index) => (
                <Input
                    key={index}
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                    required
                    type="text"
                    value={value}
                    maxLength={1}
                    autoFocus={index === 0}
                    className="bg-white text-center w-10 aspect-square p-1"
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            ))}
        </div>
    );
};

export default MultiInputCode;
