export interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    searchResults: Image[];
    totalHits: number;
    handleSearch: (value: string) => void;
    isPending: boolean;
    error: Error | null;
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