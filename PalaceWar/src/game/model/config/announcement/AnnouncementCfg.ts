namespace Config
{	
    export namespace AnnouncementCfg 
    {
        let announcementNum:number;
        let announcements:AnnouncementItemCfg[] = [];

        export function formatData(data: any): void
        {   
            data = data[0];

            announcementNum = data.announcementNum;
            announcements.length = 0;
            for(let key in data.priority){
                let itemCfg:AnnouncementItemCfg = new AnnouncementItemCfg();
                itemCfg.initData(data.priority[key]);
                announcements.push(itemCfg);
            }
        }

        export function getMaxNum():number
        {
            return announcementNum;
        }

        export function getAnnouncements():AnnouncementItemCfg[]
        {
            return announcements;
        }

        export class AnnouncementItemCfg extends BaseItemCfg
        {
            public label:number =0;
            public head:number =0;
            public type:number[] = [];
            public activityType:string = null;
            public codeNum:number[] = null;
        }
    }
}