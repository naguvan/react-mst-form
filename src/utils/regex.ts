// https://stackoverflow.com/a/874742/3762242
export function regex(input: string): RegExp | null {
    const [_, pattern, flag] = input.match(
        new RegExp('^/(.*?)/([gimy]*)$')
    ) || [null, null, ''];
    return pattern != null ? new RegExp(pattern, flag || 'i') : null;
}
