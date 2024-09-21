"use client";

import { QuickAccess } from "@/components/ui";
import { AddIcon, EyeIcon, UserPlusIcon } from "@/components/icons";

function AdminPage() {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-fr">
                <QuickAccess variant="teal">
                    <AddIcon />
                    آیتم جدید
                </QuickAccess>
                <QuickAccess variant="blue">
                    <AddIcon />
                    دسته بندی جدید
                </QuickAccess>

                <QuickAccess variant="green" href="/menu">
                    <EyeIcon />
                    مشاهده منو
                </QuickAccess>
                <QuickAccess variant="purple" disabled>
                    <UserPlusIcon />
                    کاربر جدید
                </QuickAccess>
            </div>
        </div>
    );
}

export default AdminPage;
