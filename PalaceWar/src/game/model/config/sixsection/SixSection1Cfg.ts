namespace Config{
/**
 * 皇城六部 兵部
 * author ycg
 * date 2020.5.7
 * 
 */
    export namespace Sixsection1Cfg{
        //--开启周期  第一次开启后，每隔X天开启一次
        export let turnTime:number;
        //--开启时间
        export let openTime:number;
        //--资源重置时间 24小时制
        export let resetTime:number;
        //--持续时间 每次开启持续X天
        export let lastTime:number;
        //--初始影响力 
        export let startInf:number;
        //--初始影响力上限
        export let limitInf:number;
        //--参与兵部玩法的官职要求
        export let needLv:number;
        //--兵部头衔每日争夺次数
        export let freeTime:number;
        //--兵部据点buff类型
        //--1临时攻击加成
        //--2临时暴击伤害加成
        //--3临时血量加成
        //--兵部据点buff信息
        export let buff:any;
        export let buildList:any[] = [];
        export let directorList:any[] = [];
        //--兵部弹劾书 使用后增加1次兵部头衔抢夺次数
        export let item1:string;
        //--兵部论战书  使用后增加影响力
        export let item2:string;
        //--兵部搜查令  使用后查看目标所有兵部据点位置
        export let item3:string;
        //--兵部侦查令  使用后查看目标据点阵容
        export let item4:string;
        //--论战书增加的影响力
        export let infAdd:number;
        //--初始影响力回复速度（没有头衔时的速度，单位：每小时时）
        export let startInfSpeed:number;
        export let rechargeList:any[] = [];
        //在商城中的兵部礼包
        export let shop:any;
        export let shopCfg:Config.ShopItemCfg = null;
        //参与兵部玩法的最多门客数
        export let maxServantNum;
        //参与兵部玩法的最多队伍数
        export let maxTeamNum;
        
        //玩家门客达到对应资质获得的buff      单条里面是总值，最后需要把每条的值加起来
        //needAbility:剩余门客资质所需X
        //servantNum:
        //addAtk:攻击加成
        //addCrit:暴击伤害加成
        export let baseBuff:any;

        export function formatData(data: any): void 
		{
            for (let key in data){
                this[key] = data[key];
                if (key == "build1"){
                    
                    for (let k in data[key]){
                        let item = new SixSection1BuildItem();
                        item.initData(data[key][k]);
                        item.id = k;
                        let index = Number(k.split("t")[1]);
                        item.index = index;
                        item.rowMaxNum = Math.ceil(item.seatNumber/item.perMaxSeat);
                        this.buildList.push(item);
                        this.buildList.sort((a, b)=>{return a.index - b.index});
                    }
                }
                else if (key == "director1"){
                    for (let k in data[key]){
                        let item = new SixSection1BuildItem();
                        item.initData(data[key][k]);
                        item.id = k;
                        let index = Number(k.split("s")[1]);
                        item.index = index;
                        this.directorList.push(item);
                        this.directorList.sort((a, b)=>{return a.index - b.index});
                    }
                }
                else if (key == "recharge"){
                    for (let k in data[key]){
                        let item = new SixSection1RechargeItem();
                        item.initData(data[key][k]);
                        item.id = Number(k) + 1;
                        this.rechargeList.push(item);
                    }
                }
                else if (key == "shop"){
                    if (!shopCfg)
                    {
                        shopCfg = new Config.ShopItemCfg();
                    }
                    let allKey:string[] = Object.keys(this.shop);
                    shopCfg.initData(this.shop[allKey[0]]);                    
                    shopCfg.id = Number(allKey[0]);
                }
            }
            let stNum = 1;
            for (let i=0; i < this.buildList.length; i++){
                this.buildList[i].stRowNum = stNum;
                stNum = stNum + this.buildList[i].rowMaxNum;
            }
        }

        export function getBuildList():any[]{
            return this.buildList;
        }

        export function getDirectorList():any[]{
            return this.directorList;
        }

        export function getRechargeList():any[]{
            return this.rechargeList;
        }

        class SixSection1BuildItem extends BaseItemCfg{
            public index:number = 0;
            public id:string = null;
            // --seatNumber:基础席位数量
            public seatNumber:number = 0;
            // --lost:抢夺的资源比例
            public lost:number = 0;
            //--minGetTime:最小领取时间（单位：分）
            public minGetTime:number = 0;
            // --shujijingyanSpeed:书籍经验产出速度（每小时）
            public shujijingyanSpeed:number = 0;
            // --maxTime:有效产出时间（时）
            public maxTime:number = 0;
            // --influenceNeed:抢夺席位所需影响力
            public influenceNeed:number = 0;
            //maxInfluence:影响力上限
            public maxInfluence:number;
            //影响力速度
            public influenceSpeed:number;
            //perMaxSeat
            public perMaxSeat:number;
            //行数
            public rowMaxNum:number;
            //起始行数
            public stRowNum:number;
            public addSeat:number;
        }

        class SixSection1RechargeItem extends BaseItemCfg{
            public id:number=0;
            public sortId:number = 0;
            public needGem:number = 0;
            public getReward:string = null;
        }
    }
}
