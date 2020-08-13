namespace Config {
    export namespace AcCfg {
        /**
        *  的 cfg
        * @author 张朝阳
        * date 2019/7/1
        * @class GiftReturnCfg
        */
        export class GiftReturnCfg {

            public extraTime: number = 0;
            /**充值任务，重复X轮。前端展示为元宝数量 */
            public task: any = null;

            /**充值列表 */
            private _claimItemCfgList: GiftReturnClaimItemCfg[] = [];
            /**
             * 初始化数据
             */

            private extra:any = null;


            public formatData(data: any): void {
                for (var key in data) {
                    this[`${key}`] = data[key];

                    if (key == "claim") {
                        this._claimItemCfgList = []
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new GiftReturnClaimItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i + 1);
                            this._claimItemCfgList.push(itemcfg);
                        }
                    }
                }
            }

            public getItemVo(): RewardItemVo {
                let rewardItemVo = GameData.formatRewardItem(this.task.getReward)[0];
                return rewardItemVo;
            }

            public get claimItemCfgList():GiftReturnClaimItemCfg[]
            {   
                let tempArray:GiftReturnClaimItemCfg[] = [];
                for (let i = 0; i<this._claimItemCfgList.length; i++)
                {   
                    let onecfg = this._claimItemCfgList[i];
                    if (!onecfg.preItem)
                    {   
                        tempArray.push(onecfg);
                        continue;
                    }
                    let rewardVoList = GameData.formatRewardItem(onecfg.preItem);
                    let isShow = false;
                    for (let j = 0; j < rewardVoList.length; j++) 
                    {
                        
                        if (rewardVoList[j].type == 19) 
                        {  
                            let skinid = rewardVoList[j].id;
                            let skincfg = Config.ServantskinCfg.getServantSkinItemById(skinid);
                            let servant:ServantInfoVo = Api.servantVoApi.getServantObj(skincfg.servantId);
                            let skinvo : ServantSkinVo ;
                            if (servant && servant.skin)
                            {   
                                skinvo= servant.skin[Number(skinid)];
                            }
                            if (skinvo && skinvo.getbookIdList().length>0)
                            {
                                isShow = true;
                                break;
                            }
                        }
                        else if (rewardVoList[j].type == 6) 
                        { 
                            if (Api.itemVoApi.getItemNumInfoVoById(rewardVoList[j].id)>0 )
                            {   
                                isShow = true;
                                break;
                            }
                        }
                    }
                    if (isShow)
                    {
                        tempArray.push(onecfg);
                    }
                }
                return tempArray;
            }
        }
        /**活动期间，进度奖励 */
        export class GiftReturnClaimItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**sortId */
            public sortId: number;
            /**道具 */
            public item: string;
            public itemExchange:string;
            /**需要翡翠玉 X 个 */
            public needItem: string;
            /**逻辑判断： */
            public logic: string;
            /**限购 */
            public limit: number;

            public preItem: string;
            
        }

    }
}