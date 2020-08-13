namespace Config
{
	/**
	 * 册封配置
	 */
	export namespace WifestatusCfg 
	{
		let wifestatusListCfg:WifestatusItemCfg[]=[];
		export function formatData(data:any):void
		{
			for(var key in data)
			{
				let itemCfg:WifestatusItemCfg=new WifestatusItemCfg();
				// if(!wifestatusListCfg.hasOwnProperty(String(key)))
				// {
					// wifestatusListCfg[String(key)]=new WifestatusItemCfg();
				// }
				// itemCfg=wifestatusListCfg[String(key)];
				itemCfg.initData(data[key]);
                itemCfg.id = String(key);
				wifestatusListCfg.push(itemCfg);
		
			}
			wifestatusListCfg.reverse();
			// egret.log("123")
		}

		export function getWifestatusCfgByID(id:string):WifestatusItemCfg
		{
			for (var index = 0; index < wifestatusListCfg.length; index++) {
				var element = wifestatusListCfg[index];
				if(element.id == id){
					return element;
				}
				
			}
			return null;
			// return wifestatusListCfg[String(id)];
		}
        export function getWifestatusList():Array<WifestatusItemCfg>
		{
			return wifestatusListCfg;
		}

		/**
		 * 获取最大长度
		 */
		export function getMaxLength():number
		{
			return Object.keys(wifestatusListCfg).length;
		}
	}

	export class WifestatusItemCfg extends BaseItemCfg
	{
        /**
		 * 册封ID
		 */
		public id: string;
		/**
		 * needStar  解锁需要星数
		 */
		public needStar:number;

		/**
		 * maxNum  位置上限
		 */
		public maxNum:number;
		/**
		 * needIntimacy  该位置所需亲密度
		 */
		public needIntimacy:number;
		/**
		 * needGlamour  该位置所需魅力值
		 */
		public needGlamour:number;
		/**
		 * getStar  每个位置获得星数
		 */
		public getStar:number;

		
		public constructor()
		{
			super();	
		}
	}
}