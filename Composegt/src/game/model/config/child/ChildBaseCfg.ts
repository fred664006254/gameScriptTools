namespace Config
{
	export namespace ChildbaseCfg
	{
		/**
		 * 恢复1点活力所需时间 单位：秒	
		 */
		export let needTime:number;

		/**
		 * 恢复活力所需道具
		 */
		export let needItem:string;

		/**
		 * 子嗣修改名字所需元宝
		 */
		export let renameGem:number;

		/**
		 * 最多子嗣席位
		 */
		export let maxPos:number;

        /**
		 * 初始子嗣席位
		 */
		export let iniPos:number;


        /**
		 * 解锁一键培养所需席位数量
		 */
		export let needPos:number;

		/**
		 * 子嗣位置扩展所需元宝  超过最大值取最大值
		 */
		export let needGem:number[];
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				ChildbaseCfg[key]=data[key];
			}
		}

	}

}