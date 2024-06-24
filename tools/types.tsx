export type PartInfo = {
    quantity: number;
    type: string;
    value: number;
    footprint?: string;
    location?: string;
    description?: string;
  };
export const PartInfoKeys: string[] = ["quantity", "type", "value", "footprint", "location", "description"];
  