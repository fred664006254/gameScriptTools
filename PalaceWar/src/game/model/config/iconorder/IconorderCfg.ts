namespace Config 
{
	/**
	 * 主界面icon图标配置
	 * author 陈可
	 * date 2018/4/18
	 * @class IconOrderCfg
	 */
	export namespace IconorderCfg 
	{
		let aidIconDic:{[cfgName:string]:string[]}={};
		let iconOrderList: {[acName:string]:IconOrderItemCfg} = {};

		/**
		 * icon列表，存储格式为{icon:[acname1,acname2]}，解析配置时候存下来，提升游戏内每次查找遍历的性能
		 */
		let iconNameList:{[icon:string]:string[]}={};
		export function formatData(data: any): void {
			for (var key in data) {
				let acName:string=data[key]?data[key].activeName:"";
				if(acName)
				{
					let iconOrderItem: IconOrderItemCfg;
					if (!iconOrderList.hasOwnProperty(acName)) {
						iconOrderList[acName] = new IconOrderItemCfg();
					}
					iconOrderItem = iconOrderList[acName];
					iconOrderItem.initData(data[key]);
					if(iconOrderItem.icon)
					{
						if(!iconNameList[iconOrderItem.icon])
						{
							iconNameList[iconOrderItem.icon]=[];
						}
						iconNameList[iconOrderItem.icon].push(iconOrderItem.activeName);
					}
				}
			}
		}

		/**
		 * 根据icon获取相同icon的所有活动
		 * @param icon 必须为icon名字
		 */
		export function getAcNameListByIcon(icon:string):string[]
		{
			return iconNameList[icon]||[];
		}

		/**
		 * 根据活动id获取相同icon的所有活动
		 * @param aid 活动id，仅支持id，不支持传code
		 */
		export function getAcNameListByAid(aid:string):string[]
		{
			let list:string[]=null;
			let icon:string=getIconNameByName(aid);
			if(icon)
			{
				list = getAcNameListByIcon(icon);
			}
			return list||[];
		}

		/**
		 * 检测活动是否在活动组里面
		 */
		export function checkAcInGroup(aid:string,code?:string):boolean
		{
			if(code)
			{
				if(getAcNameListByAid(aid + "-" + code).length>1)
				{
					return getAcNameListByAid(aid + "-" + code).length>1;
				}	
			}
			return getAcNameListByAid(aid).length>1;
		}

		function getIconSortIdByName(name:string):number
		{
			if(iconOrderList[name])
			{
				return Number(iconOrderList[name].sortId);
			}
			return 9999;
		}

		export function getIconSortIdByCfgName(cfgName:string):number
		{
			if(iconOrderList[cfgName])
			{
				return getIconSortIdByName(cfgName);
			}
			else if (cfgName == "extendicon")
			{
				return 1000000000;
			}
			else if (cfgName == "thgift")
			{
				return 27.5;
			}
			else
			{
				for(let key in iconOrderList)
				{
					if(iconOrderList[key]&&iconOrderList[key].icon==cfgName)
					{
						return getIconSortIdByName(key);
					}
				}
			}
			return 9999;
		}
		/**
		 * 获得icon的name
		 */
		export function getIconNameByName(name:string,code?:string):string
		{
			if(code)
			{
				if(iconOrderList[name + "-" + code])
				{
					return iconOrderList[name + "-" + code].icon;
				}
			}
			if(iconOrderList[name])
			{
				return iconOrderList[name].icon;
			}
		}

		export function checkHasChildCfgNameByName(name:string):boolean
		{
			for(let key in iconOrderList)
			{
				let item:IconOrderItemCfg=iconOrderList[key];
				if(key&&key.indexOf(".")>-1 && item.aid==name)
				{
					return true;
				}
				//cfg里面存在aid-code 类型
				else if(key&&key.indexOf("-")>-1 && item.aid==name)
				{
					return true;
				}
			}
			return false;
		}
		/**
		 * 检测cfg活动名称 是否存在code
		 * 如果存在，则返回这个code
		 */
		export function checkHasChildCodeCfgNameByName(aid:string,code:string):string
		{
			let tmpCode:string = null;
			for(let key in iconOrderList)
			{
				let item:IconOrderItemCfg=iconOrderList[key];
				if(key&&key.indexOf("-")>-1 && item.aid==aid)
				{
					if(key.split('-')[1] == code)
					{
						tmpCode = code;
					}
					// return key.split('-')[1] == code?code:null;
				}
			}
			return tmpCode;
		}

		/**
		 * 检测cfg活动名称 是否存在atype
		 * 如果存在，则返回这个atype
		 */
		export function checkHasChildAtypeCfgNameByName(aid:string,atype:string):string
		{
			for(let key in iconOrderList)
			{
				let item:IconOrderItemCfg=iconOrderList[key];
				if(key&&key.indexOf(".")>-1 && item.aid==aid)
				{
					return key.split('.')[1] == atype?atype:null;
				}
			}
			return null;
		}
		/**
		 * 配置里面是否有这个icon，并且是否大于1
		 */
		export function checkHasIconLengthGreater1ThanByCfg(icon:string):boolean
		{

			if(getAcNameListByIcon(icon).length > 1)
			{
				return true;
			}
			return false;
		}

		export function getisFlickByName(cfgName:string,type?:string|number):boolean
		{
			if(iconOrderList[cfgName]&&!type)
			{
				return Boolean(iconOrderList[cfgName].isFlick);
			}
			else
			{
				if(type)
				{
					if(iconOrderList[cfgName+"."+type])
					{
						return Boolean(iconOrderList[cfgName+"."+type].isFlick);
					}
				}
				else
				{
					for(let key in iconOrderList)
					{
						if(iconOrderList[key]&&iconOrderList[key].icon==cfgName)
						{
							return Boolean(iconOrderList[key].isFlick);
						}
					}
				}
			}
			return false;
		}

		export function getAidListByCfgName(cfgName:string):string[]
		{
			if(aidIconDic[cfgName])
			{
				return aidIconDic[cfgName];
			}
			let idArr:string[]=[];
			if(!cfgName)
			{
				return idArr;
			}
			if(iconOrderList)
			{
				for(let key in iconOrderList)
				{
					if(iconOrderList[key]&&iconOrderList[key].icon==cfgName)
					{
						if(idArr.indexOf(key)<0)
						{
							idArr.push(key);
						}
					}
				}
			}
			aidIconDic[cfgName]=idArr;
			return idArr;
		}
		/**
		 * 	通过aid 和type 或者是code 来获取IconOrderItemCfg
		 *  暂时只会提供 aid.type 组合 和 aid-code 组合
		 * 	不会提供aid-code.type 组合,也不会提供检测
		 */
		export function getIconCfgByAidAndType(aid:string,type?:string|number,code?:string):IconOrderItemCfg
		{
			// aid=type?aid+"."+type:aid;
			// aid=code?aid+"-"+code:aid;

			// aid=type?aid+"."+type:aid;
			if(type)
			{
				aid = aid+"."+type;
			}
			else
			{
				aid=code?aid+"-"+code:aid;
			}
			if(iconOrderList[aid])
			{
				return iconOrderList[aid];
			}
			return null;
		}

		export function getIconBgByAidAndType(aid:string,type?:string|number):number
		{
			let cfg=getIconCfgByAidAndType(aid,type);
			if(cfg)
			{
				return cfg.iconBg;
			}
		}
	}
	export class IconOrderItemCfg extends BaseItemCfg 
	{
		/**
		 * 活动名称
		 */
		public activeName:string;

		/**
		 * 排序id
		 */
		public sortId:string;

		/**
		 * 活动的底框  0：默认框  1：当前冲榜的特殊框
		 */
		public iconBg:number=0;

		/**
		 * icon的炫光特效  0：无特效  1：有特效
		 */
		public isFlick:number=0;

		/**
		 * 使用的icon的key，注意不是icon的全名，需要匹配的
		 */
		public icon:string;
		
		public get aid():string
		{
			if(this.activeName)
			{
				let splitArr:string[] = [".","-"];
				for(let i = 0;i < splitArr.length;i++)
				{
					if(this.activeName.indexOf(splitArr[i]) > -1)
					{
						let strArr:string[] = this.activeName.split(splitArr[i]);
						return strArr[0];
					}
				}
			}
			// if(this.activeName)
			// {
			// 	let strArr:string[] = this.activeName.split(".");
			// 	if(strArr.length > 1)
			// 	{
			// 		return strArr[0];
			// 	}
			// 	// return this.activeName.split(".")[0];
			// }
			// if(this.activeName)
			// {
			// 	let strArr:string[] = this.activeName.split("-");
			// 	if(strArr.length > 1)
			// 	{
			// 		return strArr[0];
			// 	}
			// }
			return null;
		}
	}
}