namespace Config{
    export namespace AcCfg
    {
        /**
         * 功能预告
         */
        export class WelcomeCfg
        {
            public formatData(data:any):void{
                if (data){
                    for (let key in data){
                        this[key] = data[key];
                    }
                }
            }
        }
    }
}
