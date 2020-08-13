namespace Config
{
    export namespace AcCfg
    {
        /**
         * 更新有礼
         * author wxz
         * date 2020.6.1
         * @namespace NewPackCfg
         */
        export class NewPackCfg
        {
            public extraTime:number;
            public getReward:string = null;
            public version:string = null;

            public formatData(data:any)
            {
                for (let key in data)
                {
                    this[key] = data[key];
                }
            }   
        }
    }
}