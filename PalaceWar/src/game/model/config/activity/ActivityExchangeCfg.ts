namespace Config {
    export namespace AcCfg {
        export class ActivityExchangeCfg {
            private _itemList: ActivityExchangeCfgItem[];

            public formatData(data:any) {
                this._itemList = [];
                let __list = data.itemExchange || [];
                __list.forEach(v => {
                    let _n: ActivityExchangeCfgItem = new ActivityExchangeCfgItem();
                    _n.sortId = v.sortId;
                    _n.limit = v.limit || 0;
                    _n.getReward = v.getReward;
                    _n.costItems = [];

                    let i = 1;
                    while (v[`costItem${i}`]) {
                        _n.costItems.push(v[`costItem${i}`]);
                        i++;
                    }

                    this._itemList.push(_n);
                })
            }

            public get AllCfgItems(): ActivityExchangeCfgItem[] {
                return this._itemList || [];
            }

            public getLimitById(sortId: number): number {
                let n = this._itemList.filter(v => v.sortId == sortId);
                return n[0]? n[0].limit : 0;
            }
        }

        export class ActivityExchangeCfgItem extends BaseItemCfg {
            public constructor() {
                super();
            }

            public sortId: number;             // 排序
            public limit: number;              // 兑换次数限制
            public costItems: string[];        // 消耗
            public getReward: string;          // 获得
        }

        // interface ActivityExchangeCfgItem {
        //     sortId: number,             // 排序
        //     limit: number,              // 兑换次数限制
        //     costItems: string[],        // 消耗
        //     getReward: string           // 获得
        // }
    }
}