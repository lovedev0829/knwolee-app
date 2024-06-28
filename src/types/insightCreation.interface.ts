export type GeneratedFrom = "Custom" | "Dashboard" | "Evergreen";

// below elements taken from: https://api.artemisxyz.com/bam/dropdowns/all?categories=Bridge,CeFi,DeFi,ERC_4337,Gaming,Utility,Layer%202,Memecoin,NFT%20Apps,NFT,Social,Stablecoin,Token,ERC_1155,EOA
export type InsightFormat = "bitcoin" | "ethereum" | "perpetuals" | "lending" | "zkrollup" | "interop" | "layer2" | "toplayer1" | "majorlayer1" | "stablecoin" | "minorlayer1";

export interface IKpi {
    _id: string
    kpiFormats: InsightFormat[];
    createdAt: string;
    userId: string;
    kpiTitle: string;
    generatedFrom: GeneratedFrom;
    updatedAt: string;
}

export type Kpi = {
    insightFormats: InsightFormat[];
    userId: string;
    kpiTitle: string;
    generatedFrom: GeneratedFrom;
}

export interface IInsight {
    _id: string
    insightData: string;
    insightFormat: InsightFormat;
    insightTitle: string;
    createdAt: string;
    metadata: unknown;
    updatedAt: string;
    userId: string;
}

export interface ArtemisInsight {
    _id: string
    artemisId: string;
    createdAt: string;
    insight: string;
    metric: string;
    updatedAt: string;
}
