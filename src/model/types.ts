export interface bookAdmin{
    book_id : number,
    book_name :string,
    publication_date :number,
    authors ?: string[],
    clicks: number
}

export interface bookMain{
    book_id : number,
    book_name :string,
    authors ?: string[]
}

export interface bookBook{
    book_id : number,
    book_name : string,
    image_url : string,
    publication_date: number,
    description : string,
    authors ?: string[]
}

export interface dbV0books{
    book_id : number,
    book_name : string,
    image_url : string,
    publication_date: number,
    description : string,
    clicks : number,
    views : number,
    deleted: number
}

export interface dbV1books{
    book_id : number,
    book_name : string,
    image_url : string,
    publication_date: number,
    description : string,
    clicks : number,
    views : number,
    deleted: number,
    authors_names : string
}