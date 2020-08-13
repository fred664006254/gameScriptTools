namespace Config {
    export namespace AcCfg {
        export class RechargeRebateCfg {
            private list:{[key:string]:{needGem:string, getGem:number}};
            //解析数据
            public formatData(data: any): void {
                this.list = {};
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.list[key] = data[key];
                    }
                }
            }
            
			public getList()
			{
				return this.list;
			}
        }
    }
}