"use client";

import { useSearchParams, useRouter } from "next/navigation";
import styles from "./PaginationComponent.module.css";

interface PaginationProps {
    total: number;
}
const limit = 30;
const PaginationComponent = ({ total }: PaginationProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPage = Number(searchParams.get("page")) || 1;
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`${styles.button} ${currentPage === 1 ? styles.disabled : ""}`}
            >
                Previous
            </button>

            <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
            </span>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`${styles.button} ${currentPage === totalPages ? styles.disabled : ""}`}
            >
                Next
            </button>
        </div>
    );
};

export default PaginationComponent;