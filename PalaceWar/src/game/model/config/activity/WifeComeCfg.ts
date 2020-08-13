namespace Config
{
    export namespace AcCfg
    {
        export class WifeComeCfg
        {
            //红颜id
            public wifeId: string;
            //转换多少花朵显示
            public exchange: number;
            //需求花朵数量
            public need: number;
            public servantneed:string = undefined;
            public sceneID:string;
            public wifeSkinID:string;
            public formatData(data: any): void
            {
                this.wifeId = data.wifeId;
                this.exchange = data.exchange;
                this.need = data.need;
                this.servantneed = data.servantneed;
                this.sceneID = data.sceneID;
                this.wifeSkinID = data.wifeSkinID;
            }

        }

    }

}