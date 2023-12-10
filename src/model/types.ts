export interface bookAdmin{
    book_id : number,
    book_name :string,
    publication_date :number,
    authors ?: string[]
}

export interface bookMain{
    book_id : number,
    book_name :string,
    authors ?: string[]
}