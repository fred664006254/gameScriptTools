namespace Config {
	/**
	 * 省亲配置
	 */
	export namespace BanishCfg
	{   
        /**
		 * 解锁功能所需红颜数量
		 */
        let numNeed:number;

        /**
		 * 省亲后红颜需大于limitation。否则省亲失败
		 */
        let limitation:number;

        /**
		 * 省亲时间。单位：天
		 */
        let exileTime:number;

        /**
		 * 提前召回费用。天数*单位元宝
		 */
        let unitGem:number;

        let seatList:Object={};

        export function formatData(data:any):void
		{   
            numNeed = data.numNeed;
            limitation = data.limitation;
            exileTime = data.exileTime;
            unitGem = data.unitGem;

            for(var key in data.seat)
			{
				let itemCfg:BanishSeatCfg;
				if(!seatList.hasOwnProperty(String(key)))
				{
					seatList[String(key)]=new BanishSeatCfg();
				}
				itemCfg=seatList[String(key)];
				itemCfg.initData(data.seat[key]);
                itemCfg.id=String(key);
			}
        }
		export function getNumNeed():number
		{
			return numNeed;
		}
		export function getLimitation():number
		{
			return limitation;
		}
		export function getExileTime():number
		{
			return exileTime*86400;
		}
		export function getExileTime2():number
		{
			return exileTime;
		}
		export function getUnitGem():number
		{
			return unitGem;
		}
		export function getMaxUnit():number
		{
			return Object.keys(seatList).length;
		}
		export function getSeatCost(key:string):number
		{
			return seatList[key].unlockGem;
		}

		export function getDefaultSeatNum():number
		{
			let num = 0;
			for (let k in seatList)
			{
				if (seatList[k] && seatList[k].initial==1)
				{
					num++;
				}
			}
			return num;
		}
    }

    export class BanishSeatCfg extends BaseItemCfg
	{
		public id:string;

        /**
		 * 初始席位    1-是，0-否
		 */
		public initial:number;

        /**
		 * 解锁花费元宝数
		 */
		public unlockGem:number;
    }
}