namespace Config{
    export namespace AcCfg{
        /**
         * 新版三国争霸
         * author ycg
         * date 2020.7.28
         */
        export class NewThreeKingdomsCfg{
            /**展示期 */
            public extraTime:number;
            
            /**报名期时间 单位：天*/
            public enrollTime:number;

            /**新三国争霸持续时间（算上报名期） 单位：天*/
            public lastTime:number;

            /**休战期：每日的某个时间段，单位时*/
            public restTime:number;
        
            /**报名官品需求*/
            public lvNeed:number;
            
            /**报名门客数需求*/
            public servantNeed:number;
            
            /**所有报名人前x名获得活动资格*/
            public needRank:number;
            
            /**玩家兵力值*/
            public baseSoldier:number;
            
            /**进攻成功时，防守方每场失败损失兵力（1次战斗=1场修身战斗+30场门客战斗）*/
            public lost1:number;
            
            /**进攻成功时，防守方城池每场失败损失城防（1次战斗=1场修身战斗+30场门客战斗）*/
            public lost2:number;
            
            /**城池城防基参数*/
            public preset:number;

            /**刷新对手道具（随机对手）*/
            public item1:string;
            
            /**围攻道具*/
            public item2:string;
            
            /**分兵道具*/
            public item3:string;
            
            /**分兵的的队伍兵力*/
            public specialSolider:number;
            
            /**分兵立刻获得积分*/
            public specialScore:number;
            
            /**分兵道具每天使用次数*/
            public specialTime:number;
            
            /**每日免费随机次数*/
            public freeTime:number;
            
            /**免费出战间隔*/
            public cdTime:number;
            
            /**约战书每日次数：玩家总门客数/parameter*/
            public parameter1:number;
            
            /**击杀大于等于X名门客，可上榜*/
            public parameter2:number;
            
            /**免费，约战胜利基础分*/
            public victoryBaseScore:number;
            
            /**免费，约战门客基础分*/
            public victoryServantScore:number;
            
            /**围攻胜利基础分*/
            public victoryBaseScore2:number;
            
            /**围攻门客基础分*/
            public victoryServantScore2:number;

            /**，约战失败基础分*/
            public failBaseScore:number;
            
            /**约战失败门客分*/
            public failServantScore:number;
            
            /**围攻失败基础分*/
            public failBaseScore2:number;

            /**围攻失败门客分*/
            public failServantScore2:number;
            
            /**修身战斗胜利后，本次战斗己方门客攻击增加*/
            public specialBuff:number;

            /**门客达到对应资质获得的buff*/
            public baseBuff:Object;

            /**高级奖励解锁计费点*/
            public unclock:string;

            /**城池信息*/
            private castleList:NewThreeKingdomsCastleItem[] = [];
            /**阵营排名奖励*/
            private countryRewardList:NewThreeKingdomsCountryRewardItem[] = [];
            /**个人积分排名奖励*/
            private personRewardList:NewThreeKingdomsPersonRewardItem[] = [];
            /**每日充值*/
            private rechargeList:NewThreeKingdomsRechargeItem[] = [];
            /**每日礼包 */
            private giftList:NewThreeKingdomsGiftItem[] = [];
            /**权势赏金*/
            private goldRewardList:NewThreeKingdomsGoldRewardItem[] = [];
            /**竞猜*/
            private guessList:NewThreeKingdomsGussItem[] = [];
            /**活动购买buff信息*/
            public buffList:NewThreeKingdomsBuffItem[] = [];

            public formatData(data:any):void{
                for (let key in data){
                    this[key] = data[key];
                }

                if (data.castle){
                    this.castleList = [];
                    for (let key in data.castle){
                        let itemCfg = new NewThreeKingdomsCastleItem();
                        itemCfg.initData(data.castle[key]);
                        itemCfg.id = Number(key);
                        this.castleList.push(itemCfg);
                    }
                }

                if (data.country){
                    this.countryRewardList = [];
                    for (let key in data.country){
                        let itemCfg = new NewThreeKingdomsCountryRewardItem();
                        itemCfg.initData(data.country[key]);
                        itemCfg.id = Number(key);
                        this.countryRewardList.push(itemCfg);
                    }
                }

                if (data.person){
                    this.personRewardList = [];
                    for (let key in data.person){
                        let itemCfg = new NewThreeKingdomsPersonRewardItem();
                        itemCfg.initData(data.person[key]);
                        itemCfg.id = Number(key);
                        this.personRewardList.push(itemCfg);
                    }
                }

                if (data.recharge){
                    this.rechargeList = [];
                    for (let key in data.recharge){
                        let itemCfg = new NewThreeKingdomsRechargeItem();
                        itemCfg.initData(data.recharge[key]);
                        itemCfg.id = Number(key);
                        this.rechargeList.push(itemCfg);
                    }
                }

                if (data.gift){
                    this.giftList = [];
                    for (let key in data.gift){
                        let itemCfg = new NewThreeKingdomsGiftItem();
                        itemCfg.initData(data.gift[key]);
                        itemCfg.id = Number(key);
                        this.giftList.push(itemCfg);
                    }
                }

                if (data.goldReward){
                    this.goldRewardList = [];
                    for (let key in data.goldReward){
                        let itemCfg = new NewThreeKingdomsGoldRewardItem();
                        itemCfg.initData(data.goldReward[key]);
                        itemCfg.id = Number(key);
                        this.goldRewardList.push(itemCfg);
                    }
                }

                if (data.guess){
                    this.guessList = [];
                    for (let key in data.guess){
                        let itemCfg = new NewThreeKingdomsGussItem();
                        itemCfg.initData(data.guess[key]);
                        itemCfg.id = Number(key);
                        this.guessList.push(itemCfg);
                    }
                }

                if (data.buff){
                    this.buffList = [];
                    for (let key in data.buff){
                        let itemCfg = new NewThreeKingdomsBuffItem();
                        itemCfg.initData(data.buff[key]);
                        itemCfg.id = Number(key);
                        this.buffList.push(itemCfg);
                    }
                }

            }

            /**城池基本信息 */
            public getCastleCfgList():NewThreeKingdomsCastleItem[]{
                return this.castleList;
            }

            /**阵营排名奖励 */
            public getCountryRewardCfgList():NewThreeKingdomsCountryRewardItem[]{
                return this.countryRewardList;
            }

            /**个人排名奖励 */
            public getPersonRewardCfgList():NewThreeKingdomsPersonRewardItem[]{
                return this.personRewardList;
            }

            /**物资供应 */
            public getRechargeCfgList():NewThreeKingdomsRechargeItem[]{
                return this.rechargeList;
            }

            /**权势奖金 */
            public getGoldRewardCfgList():NewThreeKingdomsGoldRewardItem[]{
                return this.goldRewardList;
            }

            /**竞猜 */
            public getGuessCfgList():NewThreeKingdomsGussItem[]{
                return this.guessList;
            }

            /**每日礼包 */
			public getGiftCfgList():NewThreeKingdomsGiftItem[]{
                return this.giftList;
            }

            /**活动购买buff */
            public getBuffList():NewThreeKingdomsBuffItem[]{
                return this.buffList;
            }
        }

        /**城池item */
        export class NewThreeKingdomsCastleItem extends BaseItemCfg{
            public id:number = 0;
            /**type:城池级别  1初级城 2中级城 3高级城 4主城*/
            public type:number;
            /**baseNum:进人比例  先进低级城*/
            public baseNum:number;
            /**baseDef:预计城防*/
            public baseDef:number;
            /**addBuff:被攻破时，给下一级城池的门客攻击buff*/
            public addBuff:number;
            /**scoreBuff:未被攻破时给本阵营玩家的积分加成*/
            public scoreBuff:number;
        }

        /**阵营积分排名奖励 item */
        export class NewThreeKingdomsCountryRewardItem extends BaseItemCfg{
            public id:number = 0;
            public getReward:string;
        }

        /**个人积分排名奖励 item */
        export class NewThreeKingdomsPersonRewardItem extends BaseItemCfg{
            public id:number = 0;
            public getReward:string;
            public rank:number[] = [];

            public get minRank():number{
                return this.rank[0];
            }

            public get maxRank():number{
                return this.rank[1];
            }
        }

        /**物资供应 item */
        export class NewThreeKingdomsRechargeItem extends BaseItemCfg{
            public id:number = 0;
            public getReward:string;
            public needGem:number;
            public sortId:number;
        }

        /**每日礼包 item */
        export class NewThreeKingdomsGiftItem extends BaseItemCfg{
            public id:number = 0;
            public getReward:string;
            public cost:number;
            public limitTime:number;
            public sortId:number;
        }

        /**权势赏金 item */
        export class NewThreeKingdomsGoldRewardItem extends BaseItemCfg{
            public id:number = 0;
            /**进攻次数 */
            public needTime:number;
            /**普通奖励 */
            public getReward1:string;
            /**高级奖励 */
            public getReward2:string;
            public sortId:number;
        }

        /**竞猜 */
        export class NewThreeKingdomsGussItem extends BaseItemCfg{
            public id:number = 0;
            public type:number;
            public beginTime:number;
            public endTime:number;
            public winReward:string;
            public loseReward:string;
        }

        /**购买buff */
        export class NewThreeKingdomsBuffItem extends BaseItemCfg{
            public id:number = 0;
            public buffType:number;
            public buffValue:number;
            public maxNum:number;
            public cost:number[] = [];
        }
    }
}