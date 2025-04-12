export const isStringInteger = (
	value: string | number | null | undefined
): boolean => {
	if (value === null || value === undefined) {
		return false;
	}

	if (typeof value === "string") {
		if (value.trim() === "") {
			return false;
		}

		if (!/^-?\d+$/.test(value)) {
			return false;
		}
	}

	// convert to number and check if it's an integer
	const parsed = Number(value);
	return !isNaN(parsed) && Number.isInteger(parsed);
};

export const max = (first: number, second: number): number => {
	return first > second ? first : second;
};
