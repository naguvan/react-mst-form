export type Indexer<T> = (i: T) => (item: T) => boolean;

export function unique<T>(
    items: Array<T>,
    indexer: Indexer<T> | null = null
): Array<T> {
    const indexOf =
        indexer === null
            ? (item: T) => items.indexOf(item)
            : (item: T) => items.findIndex(indexer(item));
    return items.filter((item, index, self) => {
        return indexOf(item) === index;
    });
}
