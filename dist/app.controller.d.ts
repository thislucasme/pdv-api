import { SiteSuccessDatabaseService } from './database/site-success-database.service';
export declare class AppController {
    private readonly siteDatabase;
    constructor(siteDatabase: SiteSuccessDatabaseService);
    getHello(): Promise<{
        feitura: string;
    }>;
}
