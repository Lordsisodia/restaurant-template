/**
 * Result Type Pattern (Rust-inspired)
 *
 * A type-safe way to handle operations that can fail without using exceptions.
 * Instead of throwing errors, functions return a Result<T, E> that explicitly
 * represents success or failure.
 *
 * Benefits:
 * - Forces explicit error handling at compile time
 * - Makes error paths visible in the type system
 * - No unexpected exceptions during runtime
 * - Better composability of error-prone operations
 *
 * Usage:
 * ```typescript
 * function divide(a: number, b: number): Result<number> {
 *   if (b === 0) {
 *     return Err(new Error('Division by zero'));
 *   }
 *   return Ok(a / b);
 * }
 *
 * const result = divide(10, 2);
 * if (result.success) {
 *   console.log(result.data); // 5
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */

/**
 * Represents the result of an operation that can succeed or fail.
 *
 * @template T - The type of the success value
 * @template E - The type of the error (defaults to Error)
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Creates a successful Result with the given data.
 *
 * @template T - The type of the success value
 * @param data - The success value
 * @returns A successful Result containing the data
 *
 * @example
 * const result = Ok(42);
 * // result: { success: true, data: 42 }
 */
export const Ok = <T>(data: T): Result<T, never> => ({
  success: true,
  data,
});

/**
 * Creates a failed Result with the given error.
 *
 * @template E - The type of the error
 * @param error - The error value
 * @returns A failed Result containing the error
 *
 * @example
 * const result = Err(new Error('Something went wrong'));
 * // result: { success: false, error: Error(...) }
 */
export const Err = <E = Error>(error: E): Result<never, E> => ({
  success: false,
  error,
});

/**
 * Unwraps a Result, returning the data if successful or throwing the error if failed.
 *
 * @template T - The type of the success value
 * @param result - The Result to unwrap
 * @returns The success data
 * @throws The error if the Result is a failure
 *
 * @example
 * const result = Ok(42);
 * const value = unwrap(result); // 42
 *
 * const failedResult = Err(new Error('Failed'));
 * const value = unwrap(failedResult); // throws Error('Failed')
 */
export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.success) {
    return result.data;
  }
  throw result.error;
}

/**
 * Unwraps a Result, returning the data if successful or a default value if failed.
 *
 * @template T - The type of the success value
 * @param result - The Result to unwrap
 * @param defaultValue - The value to return if the Result is a failure
 * @returns The success data or the default value
 *
 * @example
 * const result = Ok(42);
 * const value = unwrapOr(result, 0); // 42
 *
 * const failedResult = Err(new Error('Failed'));
 * const value = unwrapOr(failedResult, 0); // 0
 */
export function unwrapOr<T, E>(result: Result<T, E>, defaultValue: T): T {
  return result.success ? result.data : defaultValue;
}

/**
 * Unwraps a Result, returning the data if successful or computing a default value if failed.
 *
 * @template T - The type of the success value
 * @template E - The type of the error
 * @param result - The Result to unwrap
 * @param fn - A function that computes the default value from the error
 * @returns The success data or the computed default value
 *
 * @example
 * const result = Err(new Error('Not found'));
 * const value = unwrapOrElse(result, (err) => {
 *   console.log('Error:', err.message);
 *   return 0;
 * }); // Logs "Error: Not found" and returns 0
 */
export function unwrapOrElse<T, E>(
  result: Result<T, E>,
  fn: (error: E) => T
): T {
  return result.success ? result.data : fn(result.error);
}

/**
 * Maps a Result's success value using the provided function.
 *
 * @template T - The type of the original success value
 * @template U - The type of the new success value
 * @template E - The type of the error
 * @param result - The Result to map
 * @param fn - The mapping function
 * @returns A new Result with the mapped value, or the original error
 *
 * @example
 * const result = Ok(5);
 * const doubled = map(result, (x) => x * 2);
 * // doubled: Ok(10)
 *
 * const failedResult = Err(new Error('Failed'));
 * const doubled = map(failedResult, (x) => x * 2);
 * // doubled: Err(Error('Failed'))
 */
export function map<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U
): Result<U, E> {
  return result.success ? Ok(fn(result.data)) : result;
}

/**
 * Maps a Result's error using the provided function.
 *
 * @template T - The type of the success value
 * @template E - The type of the original error
 * @template F - The type of the new error
 * @param result - The Result to map
 * @param fn - The error mapping function
 * @returns A new Result with the original value or the mapped error
 *
 * @example
 * const result = Err('not found');
 * const mapped = mapErr(result, (msg) => new Error(msg));
 * // mapped: Err(Error('not found'))
 */
export function mapErr<T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F
): Result<T, F> {
  return result.success ? result : Err(fn(result.error));
}

/**
 * Chains Result operations together (flatMap/bind).
 *
 * @template T - The type of the original success value
 * @template U - The type of the new success value
 * @template E - The type of the error
 * @param result - The Result to chain from
 * @param fn - The function that produces a new Result
 * @returns The new Result from fn, or the original error
 *
 * @example
 * function divide(a: number, b: number): Result<number> {
 *   return b === 0 ? Err(new Error('Division by zero')) : Ok(a / b);
 * }
 *
 * const result = Ok(10);
 * const chained = andThen(result, (x) => divide(x, 2));
 * // chained: Ok(5)
 */
export function andThen<T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> {
  return result.success ? fn(result.data) : result;
}

/**
 * Checks if a Result is successful.
 *
 * @template T - The type of the success value
 * @template E - The type of the error
 * @param result - The Result to check
 * @returns true if the Result is successful, false otherwise
 *
 * @example
 * const result = Ok(42);
 * isOk(result); // true
 *
 * const failedResult = Err(new Error('Failed'));
 * isOk(failedResult); // false
 */
export function isOk<T, E>(result: Result<T, E>): result is { success: true; data: T } {
  return result.success;
}

/**
 * Checks if a Result is a failure.
 *
 * @template T - The type of the success value
 * @template E - The type of the error
 * @param result - The Result to check
 * @returns true if the Result is a failure, false otherwise
 *
 * @example
 * const result = Ok(42);
 * isErr(result); // false
 *
 * const failedResult = Err(new Error('Failed'));
 * isErr(failedResult); // true
 */
export function isErr<T, E>(result: Result<T, E>): result is { success: false; error: E } {
  return !result.success;
}

/**
 * Wraps an async function that might throw into one that returns a Result.
 *
 * @template T - The type of the success value
 * @param fn - The async function to wrap
 * @returns An async function that returns a Result
 *
 * @example
 * const safeFetch = tryCatch(async () => {
 *   const response = await fetch('/api/data');
 *   return response.json();
 * });
 *
 * const result = await safeFetch();
 * if (result.success) {
 *   console.log(result.data);
 * } else {
 *   console.error(result.error);
 * }
 */
export function tryCatch<T>(
  fn: () => Promise<T>
): () => Promise<Result<T>> {
  return async () => {
    try {
      const data = await fn();
      return Ok(data);
    } catch (error) {
      return Err(error instanceof Error ? error : new Error(String(error)));
    }
  };
}

/**
 * Wraps a synchronous function that might throw into one that returns a Result.
 *
 * @template T - The type of the success value
 * @param fn - The function to wrap
 * @returns A function that returns a Result
 *
 * @example
 * const safeParse = tryCatchSync(() => JSON.parse(input));
 *
 * const result = safeParse();
 * if (result.success) {
 *   console.log(result.data);
 * } else {
 *   console.error('Parse failed:', result.error);
 * }
 */
export function tryCatchSync<T>(
  fn: () => T
): () => Result<T> {
  return () => {
    try {
      const data = fn();
      return Ok(data);
    } catch (error) {
      return Err(error instanceof Error ? error : new Error(String(error)));
    }
  };
}
