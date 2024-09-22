import { EyeIcon } from "@/components/icons";
import { QuickAccess } from "@/components/ui";

function DashboardPage() {
    return (
        <div className="bg-white flex flex-col gap-8 rounded w-full p-4">
            <h1 className="text-xl sm:text-2xl text-right">دسترسی سریع</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-fr r2l">
                <QuickAccess variant="purple" href="/menu">
                    <EyeIcon />
                    مشاهده منو
                </QuickAccess>
            </div>
        </div>
    );
}

export default DashboardPage;
