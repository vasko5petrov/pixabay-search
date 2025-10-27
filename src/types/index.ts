export interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    searchResults: Image[] | null;
    totalHits: number;
    handleSearch: (value: string) => void;
    isPending: boolean;
    error: Error | null;
    setPage: (page: number) => void;
    page: number;
}


export interface Image {
    id: number;
    src: string;
    userUrl: string;
    userImageURL: string;
    userName: string;
    pageUrl: string;
    tags: string[];
}