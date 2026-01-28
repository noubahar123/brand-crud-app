export interface Brand {
    id: string;
    name: string;
}

export interface BrandResponse {
    count: number | null
    next: number | null
    previous: number | null
    results: []
}