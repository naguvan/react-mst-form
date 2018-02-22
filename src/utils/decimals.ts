export function decimals(value: number): number {
    const parts = value.toString().split('e');

    let decimals = 0;

    const [left, right] = parts;

    if (parts.length === 2) {
        if (right[0] !== '-') {
            return decimals;
        } else {
            decimals = Number(right.slice(1));
        }
    }

    const splits = left.split('.');
    if (splits.length === 2) {
        decimals += splits[1].length;
    }

    return decimals;
}
