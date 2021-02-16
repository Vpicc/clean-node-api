export interface HashComparer {
  compare(value: string, has: string): Promise<boolean>,
}
