import { useQuery } from "@tanstack/react-query";
import { getProductList } from "../product";

export function getQueryKey() {
    return ["productList"]
}

export function useGetProductList() {
    return useQuery({
        queryKey: getQueryKey(),
        queryFn: () => getProductList()
    })
}

