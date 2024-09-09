"use client";

import { useState } from "react";
import { Button, Modal } from "@/components/ui";

function VandPanel() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <section className="">
            <div>VandPanel</div>

            <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div>VandPanel Modal</div>
            </Modal>
        </section>
    );
}

export default VandPanel;
