export function assertUnreachable(anything: never): never {
  throw new Error(`Didn't expect to get here: ${anything}`);
}
