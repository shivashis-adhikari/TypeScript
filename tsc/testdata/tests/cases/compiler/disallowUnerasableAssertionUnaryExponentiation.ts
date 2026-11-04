// @target: esnext

// https://github.com/microsoft/TypeScript/issues/65170

// '-x ** y' is a syntax error in JavaScript. Erasing 'as T' or 'satisfies T' in '-x as T ** y'
// leaves exactly that, so the unary expression must be parenthesized here as well.

declare let x: number;
declare let o: { p?: number };
declare let p: Promise<number>;

export const a01 = -x as number ** 2;  // Error
export const a02 = +x as number ** 2;  // Error
export const a03 = ~x as number ** 2;  // Error
export const a04 = !x as any ** 2;  // Error
export const a05 = typeof x as any ** 2;  // Error
export const a06 = void x as any ** 2;  // Error
export const a07 = delete o.p as any ** 2;  // Error
export const a08 = <number>x as number ** 2;  // Error
export const a09 = -x as any as number ** 2;  // Error
export const a10 = -x as number ** 2 ** 2;  // Error
export async function a11() {
    return await p as number ** 2;  // Error
}

export const b01 = -x satisfies number ** 2;  // Error
export const b02 = ~x satisfies number ** 2;  // Error
export const b03 = -x satisfies any satisfies number ** 2;  // Error
export const b04 = -x as any satisfies number ** 2;  // Error
export async function b05() {
    return await p satisfies number as any ** 2;  // Error
}

// Update expressions may appear on the left of '**'.
export const c01 = ++x as number ** 2;
export const c02 = x++ as number ** 2;
export const c03 = --x satisfies number ** 2;

// A parenthesized operand is fine.
export const c04 = (-x) as number ** 2;
export const c05 = (-x as number) ** 2;
export const c06 = (-x satisfies number) ** 2;
export const c07 = -(x as number ** 2);

// Unary expressions on the right of '**' are fine.
export const c08 = 2 ** -x as number;
export const c09 = 2 ** (-x as number);
