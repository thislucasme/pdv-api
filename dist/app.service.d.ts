import { SiteSuccessDatabaseService } from './database/site-success-database.service';
export declare class AppService {
    private siteSuccessDatabaseService;
    constructor(siteSuccessDatabaseService: SiteSuccessDatabaseService);
    getHello(): string;
}
