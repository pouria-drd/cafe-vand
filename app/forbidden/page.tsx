import Link from "next/link";

function ForbiddenPage() {
    return (
        <div className="bg-white flex flex-col items-center justify-center gap-4 rounded-lg px-6 py-8">
            <h1 className="text-zinc-700 text-4xl font-bold">403 خطای</h1>
            <p className="text-gray-400 text-center">
                شما مجاز به دسترسی به این صفحه نیست
            </p>
            <Link
                href="/auth"
                className="bg-vand-primary-main rounded-md px-3 py-1.5 text-white hover:bg-vand-primary-10">
                ادامه
            </Link>
        </div>
    );
}

export default ForbiddenPage;
