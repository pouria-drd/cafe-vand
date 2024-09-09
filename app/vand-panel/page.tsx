"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { CategoryModalForm } from "@/components/ui";

function VandPanel() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <section>
            <div className="bg-white flex flex-col gap-8 rounded w-full p-4">
                <h1 className="text-xl sm:text-2xl text-right">دسترسی سریع</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button onClick={() => setIsOpen(true)}>محصول جدید</Button>
                    <Button variant="outlined" onClick={() => setIsOpen(true)}>
                        دسته بندی جدید
                    </Button>
                </div>
            </div>

            <CategoryModalForm
                type="create"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </section>
    );
}

export default VandPanel;
