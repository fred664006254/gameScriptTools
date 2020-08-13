namespace Config
{
	export namespace AcCfg
	{
		export class SingleDay2019Cfg 
		{
            /**展示时间 */
            public extraTime:number = 0;
            public switch:string[]=[];
            /**【功能1】转盘抽奖-普通奖池*/
            public pool1:any[]=[];
            /*--【功能1】转盘抽奖-高级奖池*/
            public pool2:any[]=[];
            /*--进入高级奖池的次数标识，抽奖次数达到 pool2Times 的时候，会进行一次几率判定，判定成功，走pool2,不成功，走pool1*/
            public pool2Times=[];
            /*--进入高级奖池的概率  百分制  每次几率判定的几率  超过最大值取最大值*/
            public pool2Ratio=[];
            /*-超出pool2Times后，每 X 次，进行一次几率判定*/
            public exTimes=0;
            /*功能3】元宝消耗冲榜-上榜条件：活动期间消耗元宝数量大于等于 X 可上榜*/
            public needGemCost=0;
            /**
             * --【功能2】充值奖励列表
            --needGem:所需额度：单位（元宝）
            --specialReward:特殊奖励：元宝转盘所需道具
            --getReward:奖励
             */
            public recharge:Object={};
            /**
             *  --【功能3】元宝消耗冲榜-排名奖励
            --rank:排名
            --getReward:奖励
             */
            public gemRank:Object={};
            /**
             * --【功能4】限时返场的商店
                --price:原价格
                --rebate:折扣
                --limit:限购数量
                --item:道具
             */
            public shop1List:Object={};
            /**
             * --【功能5】折扣礼包道具
            --type:类型 1：礼包类  2：道具类
            --price:原价价格
            --rebate:折扣
            --limit:限购数量
            --item:道具
             */
            public shop2List:Object={};

            //解析数据
            public formatData(data:any):void
			{
                this.extraTime = data.extraTime;
                this.pool1 = data.pool1;
                this.pool2 = data.pool2;
                this.pool2Times = data.pool2Times;
                this.pool2Ratio = data.pool2Ratio;
                this.exTimes = data.exTimes;
                this.switch = data.switch;
                this.needGemCost = data.needGemCost;

                for(let key in data.recharge){
                    let itemCfg:SingleDayNewRechargeItem;
					let id = Number(key);
                    if(!this.recharge[id]){
                        this.recharge[id]=new SingleDayNewRechargeItem();
                    }
                    itemCfg=this.recharge[id];
                    itemCfg.initData(data.recharge[key]);
                    itemCfg.id=id;
                }

                for(let key in data.gemRank){
                    let itemCfg:SingleDayNewGemRankItem;
					let id = Number(key);
                    if(!this.gemRank[id]){
                        this.gemRank[id]=new SingleDayNewGemRankItem();
                    }
                    itemCfg=this.gemRank[id];
                    itemCfg.initData(data.gemRank[key]);
                    itemCfg.id=id;
                }

                for(let key in data.shop1List){
                    let itemCfg:SingleDayNewShop1Item;
					let id = Number(key);
                    if(!this.shop1List[id]){
                        this.shop1List[id]=new SingleDayNewShop1Item();
                    }
                    itemCfg=this.shop1List[id];
                    itemCfg.initData(data.shop1List[key]);
                    itemCfg.id=id;
                }

                for(let key in data.shop2List){
                    let itemCfg:SingleDayNewShop2Item;
					let id = Number(key);
                    if(!this.shop2List[id]){
                        this.shop2List[id]=new SingleDayNewShop2Item();
                    }
                    itemCfg=this.shop2List[id];
                    itemCfg.initData(data.shop2List[key]);
                    itemCfg.id=id;
                }
            }

            public getWealthGod():string{
                let rewards = "";
                for (let i in this.pool1) {
                    let unit = this.pool1[i];
                    if(unit[1] > 0){
                        rewards += unit[0] + "|";
                    }
                }
                for (let i in this.pool2) {
                    let unit = this.pool2[i];
                    if(unit[1] > 0){
                        rewards += unit[0] + "|";
                    }
                }
                return rewards.substring(0, rewards.length - 1);
            }

            public getMaxRank():number{
                let max = 0;
                let unit =  this.gemRank[Object.keys(this.gemRank).length];
                if(unit && unit.rank && unit.rank[1]){
                    max = unit.rank[1];
                }
                return max;
            }

            public getTitle():string{
                let str = ``;
                let arr = this.switch[0].split(`title_name`);
                if(arr[1]){
                    str = arr[1];
                }
                return str;
            }
        }

        export class SingleDayNewRechargeItem extends BaseItemCfg{
            public id:number;
            /**
            * 所需额度：单位（元宝）
            */
            public needGem:number;
            /**
            * 奖励
            */
            public getReward:string;
            /**
            * 特殊奖励：元宝转盘所需道具
            */
            public specialReward:number;
        }

        export class SingleDayNewGemRankItem extends BaseItemCfg{
            public id:number;
            /**
            * 所需额度：单位（元宝）
            */
            public rank:number[];
            /**
            * 奖励
            */
            public getReward:string;
            public get minRank():number
            {
                return this.rank[0];
            }
            public get maxRank():number
            {
                return this.rank[1];
            }
        }

        export class SingleDayNewShop1Item extends BaseItemCfg{
            public id:number;
            //原价格
            public price:number;
            //折扣
            public rebate:number;
            //限购数量
            public limit:number;
            //道具
            public item:string;
        }

        export class SingleDayNewShop2Item extends BaseItemCfg{
            public id:number;
            //类型 1：礼包类  2：道具类
            public type:number;
            //原价格
            public price:number;
            //折扣
            public rebate:number;
            //限购数量
            public limit:number;
            //道具
            public item:string;
        }
    }
}