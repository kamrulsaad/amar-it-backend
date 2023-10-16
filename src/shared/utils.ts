export const asyncForEach = async <T>(
    array: T[],
    // eslint-disable-next-line no-unused-vars
    callback: (element: T, index: number, array: T[]) => Promise<void>,
): Promise<void> => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

export const exclude = <T extends Record<string, unknown>, K extends keyof T>(
    obj: T,
    keys: K[],
): Omit<T, K> => {
    const filteredEntries = Object.entries(obj).filter(
        ([key]) => !keys.includes(key as K),
    );
    return Object.fromEntries(filteredEntries) as Omit<T, K>;
};

export const pick = <
    T extends Record<string | number, unknown>,
    K extends keyof T,
>(
    obj: T,
    keys: K[],
): Pick<T, K> => {
    const pickedEntries = Object.entries(obj).filter(([key]) =>
        keys.includes(key as K),
    );
    return Object.fromEntries(pickedEntries) as Pick<T, K>;
};

export const convertToIsoDate = (dateString: string): string => {
    const date = new Date(dateString);
    const isoDate = date.toISOString().split('T')[0];
    return `${isoDate}T00:00:00.000Z`;
};
