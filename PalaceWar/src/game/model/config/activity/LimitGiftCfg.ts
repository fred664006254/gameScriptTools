namespace Config {
    export namespace AcCfg {
        export class LimitGiftCfg {
            public limitType: number;
            private _GiftList: LimitGiftItem[];

            public formatData(data:any) {
                this.limitType = data.limitType;
                let giftList = data.gift;
                this._GiftList = giftList.map(v => {
                    let _g = new LimitGiftItem();
                    _g.cost = v.cost;
                    _g.limit = v.limit;
                    _g.getReward = v.getReward;
                    _g.show = v.show || 0;
                    return _g;
                })
            }

            public get GiftList(): LimitGiftItem[] {
                return this._GiftList || [];
            }
        }

        export class LimitGiftItem extends BaseItemCfg {
            public constructor() {
                super();
            }

            public cost: string;
            public limit: number;
            public getReward: string;
            public show: number;
        }
    }
}