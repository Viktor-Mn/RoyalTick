'use client'
import { Suspense } from "react";
import ComparisonLayout from "@/components/layouts/ComparisonLayout";
import ComparisonPage from "@/components/templates/ComparisonPage/ComparisonPage";

export default function Comparison() {
    return (
        <Suspense fallback={<div>Завантаження...</div>}>
                <ComparisonPage />
        </Suspense>
    );
}