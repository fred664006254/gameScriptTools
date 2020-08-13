namespace Config
{   
    //成长基金
	export namespace GrowgoldCfg
    {
        /**
		 * 激活基金的价位
		 */
		export let unlockRecharge:string = null;
        /**
		 * 未购买时的展示期
		 */
        export let showTime:number = 0;
        /**
		 * 返额力度X倍，前端用
		 */
        export let power:number = 0;
		/**
		 * 购买后的最长展示期
		 */
        export let maxShowTime:number = 0;

		

        export let task:GrowgoldTaskItemCfg[]=[];

		export function formatData(data:any):void
        {
            unlockRecharge = data.unlockRecharge;
			showTime = data.showTime;
			power = data.power;
			// maxShowTime = data.maxShowTime;

            task.length = 0;
            for(var key in data.task)
			{
                let itemCfg:GrowgoldTaskItemCfg = new GrowgoldTaskItemCfg();				
				itemCfg.initData(data.task[key]);
				itemCfg.id=Number(key)+1;
                task.push(itemCfg);
			}
        }
    }

    export class GrowgoldTaskItemCfg extends BaseItemCfg
    {
        public id: number;

		/**
		 * 官品需求
		 */
		public needLv:number;
        /**
		 * 官品需求
		 */
		public getReward:string;
        
    }
}