import { QueryClient } from "@tanstack/react-query";

const CACHE_TIME = 1000 * 60 * 60 * 24; // 1 day
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: CACHE_TIME,
            
        },
    },
});

export const prefecthBook = async (id: number) => {
    await queryClient.prefetchQuery({
        queryKey: ["book", id], 
        queryFn: () => fetchBook(id)
    }); 
}
export const prefetchBooks = async (page: number) => {
    await queryClient.prefetchQuery({
        queryKey: ["book", page],
        queryFn: () => fetchBooks(page),
    });
};


async function fetchBook(id: number) {
    const response = await fetch(`/api/gutenberg/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch book details");
    }
    return response.json();
}

async function fetchBooks(page: number) {
    const response = await fetch(`/api/gutenberg?page=${page}`);
    if (!response.ok) {
        throw new Error("Failed to fetch book details");
    }
    return response.json();
}