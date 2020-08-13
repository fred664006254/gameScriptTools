namespace Config
{
	export namespace ComposeCfg
	{
		let composeListArrCfg:Object={};
		let composeListCfg:Object={};
		export function formatData(data:any):void
		{
			for(let v in data)
			{
				if(!composeListCfg.hasOwnProperty(String(key)))
				{
					composeListCfg[String(v)]={};
				}

				if(!composeListArrCfg.hasOwnProperty(String(key)))
				{
					composeListArrCfg[String(v)]=[];
				}
				let vArr:ComposeItemCfg[]=composeListArrCfg[String(v)];
				let vCfg=composeListCfg[String(v)];
				let vdata=data[v];
				for(var key in vdata)
				{
					let itemCfg:ComposeItemCfg;
					if(!vCfg.hasOwnProperty(String(key)))
					{
						vCfg[String(key)]=new ComposeItemCfg();
					}
					itemCfg=vCfg[String(key)];
					itemCfg.initData(vdata[key]);
					itemCfg.id=String(key);
					vArr.push(itemCfg);
				}
				vArr.sort((a,b)=>{
					if(a.timeLimit)
					{
						if(b.timeLimit)
						{
							return Number(a.id)-Number(b.id);
						}
						else
						{
							return -1;
						}
					}
					else
					{
						if(b.timeLimit)
						{
							return Number(b.timeLimit);
						}
						else
						{
							return Number(a.id)-Number(b.id);
						}
					}
				})
			}
		}

		export function getItemCfgById(id:string|number,v:string|number):ComposeItemCfg
		{
			return composeListCfg[String(v)][id];
		}

		export function getComposeList(version:string|number):ComposeItemCfg[]
		{
			return composeListArrCfg[String(version)];
		}
	}
	export class ComposeItemCfg extends BaseItemCfg
	{
		/**
		 * 道具ID
		 */
		public id:string;
		/**
		 * 合成道具ID
		 */
		public itemId:string;

		/**
		 * 是否限时  1:限时  0：不限时
		 */
		public timeLimit:number;
		
		/**
		 * 持续时间  单位：秒
		 */
		public lastTime:number;

		/**
		 * 合成上限  在持续时间内，只能合成X个
		 */
		public composeLimit:number;

		/**
		 * 是否可用
		 */
		public needItem:Object;

		/**
		 * 合成所需元宝
		 */
		public needGem:number;

		public get name():string
		{
			return this.itemCfg.name;
		}

		public get desc():string
		{
			return this.itemCfg.desc;
		}

		public get icon():string
		{
			return this.itemCfg.icon;
		}

		public get itemCfg()
		{
			return Config.ItemCfg.getItemCfgById(this.itemId);
		}

		public get iconBg():string
		{
			return this.itemCfg.iconBg;
		}

		public get nameTxt():BaseTextField
		{
			return this.itemCfg.nameTxt;
		}

		public getDescTxt(showEffectStr?:boolean):BaseTextField
		{
			return this.itemCfg.getDescTxt(showEffectStr);
		}

		private _needItemCfgList:Config.ItemItemCfg[]
		public get needItemCfgList():Config.ItemItemCfg[]
		{
			if(!this._needItemCfgList)
			{
				let list:Config.ItemItemCfg[]=[];
				for(let needItemId in this.needItem)
				{
					list.push(Config.ItemCfg.getItemCfgById(needItemId));
				}
				list.sort((a,b)=>{
					return Number(a.id)-Number(b.id);
				});
				this._needItemCfgList=list;
			}
			return this._needItemCfgList;
		}

		public getNeedItemNumById(needItemId:string|number):number
		{
			for(let needItemId in this.needItem)
			{
				if(String(needItemId)==(needItemId))
				{
					return this.needItem[needItemId];
				}
			}
			return 0;
		}

		/**
		 * 获取icon显示对象
		 * @param isTouchInfo 是否点击显示详细信息
		 */
		public getIconContainer(isTouchInfo?:boolean):BaseDisplayObjectContainer
		{
			return this.itemCfg.getIconContainer(isTouchInfo);
		}
		
	}
}