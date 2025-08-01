export class Zone {
  private static readonly VALID_ZONES = [
    'norte-001',
    'sur-002',
    'oeste-003',
    'este-004',
  ];

  constructor(
    public readonly id: string,
    public readonly description?: string,
  ) {}
}
