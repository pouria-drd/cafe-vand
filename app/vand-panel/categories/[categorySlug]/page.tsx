function CategoryDetailPage({ params }: { params: { categorySlug: string } }) {
    return (
        <div>
            CategoryDetailPage:{" "}
            <span className="text-green-700">{params.categorySlug}</span>
        </div>
    );
}

export default CategoryDetailPage;
