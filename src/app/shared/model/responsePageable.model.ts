export interface ResponsePageable {
    content: any[];
    first: boolean;
    latest: boolean;
    number: number;
    numberOfElements: number;
    pageable: any[];
    size: number;
    sort: number;
    totalElements: number;
    totalPages: number;
}