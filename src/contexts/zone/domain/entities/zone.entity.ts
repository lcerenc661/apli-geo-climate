export class Zone {
  private static readonly VALID_ZONES = [
    'norte-001',
    'sur-002',
    'oeste-003',
    'este-004',
  ];

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description?: string,
  ) {}

  static isValidZone(name: string): boolean {
    return Zone.VALID_ZONES.includes(name);
  }

  static getValidZones(): string[] {
    return [...Zone.VALID_ZONES];
  }
}
