/**
 * 道具信息api
 * author dmj
 * date 2017/9/22
 * @class ItemVoApi
 */
class ItemVoApi extends BaseVoApi
{
	private itemVo:ItemVo;
	public constructor() 
	{
		super();
	}
	/**
	 * 根据类型获取道具vo列表
	 * @param type 类型，1：道具 2：合成 3：时装
	 */
	public getItemVoListByType(type:number):Array<ItemInfoVo>
	{
		let itemInfoVoObj = this.itemVo.itemInfoVoObj;
		let arr:Array<ItemInfoVo> = new Array();
		for(let key in itemInfoVoObj)
		{
			if(type == itemInfoVoObj[key].type && itemInfoVoObj[key].num > 0)
			{
				arr.push(itemInfoVoObj[key]);
			}
		}
		arr.sort(this.sortA);

		return arr;
	}

	/**
	 * 根据类型获取道具vo列表
	 * @param type 类型，3：时装
	 */
	public getTitleVoListByType(type:number):Array<TitleInfoVo>
	{
		let titleInfoVoObj = this.itemVo.titleInfoVoObj;
		let arr:Array<TitleInfoVo> = new Array();
		for(let key in titleInfoVoObj)
		{
			if(type == titleInfoVoObj[key].type )
			{
				if(key == "4001"){
					if(Api.switchVoApi.checkVip1Privilege())
					{
						arr.push(titleInfoVoObj[key]);
					}
				}
				else{
					if ( titleInfoVoObj[key].num != -1 || titleInfoVoObj[key].itemCfg.unlock != 0)
					{
						arr.push(titleInfoVoObj[key]);
					}
				}
				// arr.push(titleInfoVoObj[key]);
			}
		}
		arr.sort(this.sortA);

		return arr;
	}

	/**
	 * 获取当前称号index
	 */
	public getCurTitleIndex():number
	{
		let titleInfoVoObj = this.itemVo.titleInfoVoObj;
		let curIndex:number = 0;
		for(let key in titleInfoVoObj)
		{	
			if (titleInfoVoObj[key].type == 3) {
				if(Api.playerVoApi.getTitleid() == titleInfoVoObj[key].id )
				{
					return curIndex;
				}
				curIndex++;
			}
		}

		return null;
	}

	// 排序
	private sortA(a:ItemInfoVo|TitleInfoVo,b:ItemInfoVo|TitleInfoVo):number
	{
		return a.sortId - b.sortId;
	}


	/**
	 * 根据id获取titleInfovo
	 * @param id 时装id
	 */
	public getTitleInfoVoById(id:number|string):TitleInfoVo
	{
		let itemInfoVoObj = this.itemVo.titleInfoVoObj;
		if(itemInfoVoObj && itemInfoVoObj[id.toString()])
		{
			return itemInfoVoObj[id.toString()];
		}
		return null;
	}

	/**
	 * 根据id获取itemInfovo
	 * @param id 道具id
	 */
	public getItemInfoVoById(id:number|string):ItemInfoVo
	{
		let itemInfoVoObj = this.itemVo.itemInfoVoObj;
		if(itemInfoVoObj && itemInfoVoObj[id.toString()])
		{
			return itemInfoVoObj[id.toString()];
		}
		return null;
	}
	/**
	 * 根据id获取item数量
	 * @param id 道具id
	 */
	public getItemNumInfoVoById(id:number|string):number
	{
		let itemInfoVoObj = this.itemVo.itemInfoVoObj;
		if(itemInfoVoObj && itemInfoVoObj[id.toString()])
		{
			return itemInfoVoObj[id.toString()].num;
		}
		return 0;
	}
	/**
	 * 获取门客中可以使用的丹药
	 */
	public getItemVoListForServant()
	{
		let itemInfoVoObj = this.itemVo.itemInfoVoObj;
		let arr:Array<ItemInfoVo> = new Array();
		

		for(let key in itemInfoVoObj)
		{
			let itemCfg = itemInfoVoObj[key].itemCfg
			if(itemCfg.target  && itemCfg.target == 2  && itemInfoVoObj[key].num > 0)
			{
				arr.push(itemInfoVoObj[key]);
			}
		}
		arr.sort(this.sortA);

		return arr;
	}

	public getComposeItemList()
	{
		// if(!this.getComposeVersion())
		// {
		// 	return [];
		// }
		let listArr:Config.ComposeItemCfg[]=Config.ComposeCfg.getComposeList(this.getComposeVersion()).concat();
		let l:number=listArr.length;
		for(let i:number=l-1;i>=0;i--)
		{
			let itemCfg:Config.ComposeItemCfg=listArr[i];
			if(itemCfg.timeLimit&&(this.itemVo.cinfo.et<=GameData.serverTime))
			{
				//过期了删除
				listArr.splice(i,1);
			}
		}
		return listArr;
	}

	public getComposeVersion():string
	{
		return this.itemVo.cinfo.version;
	}

	public refreshComposeData(data:any):void
	{
		if(this.itemVo)
		{
			this.itemVo.setcinfo(data);
		}
	}

	public getComposeNumById(id:string|number):number
	{
		let num:number=0;
		if(this.itemVo&&this.itemVo.cinfo.info)
		{
			if(this.itemVo.cinfo.info[id]!=null)
			{
				num=Number(this.itemVo.cinfo.info[id]);
			}
		}
		return num;
	}

	public getComposeLimitLeft(id:string|number):number
	{
		let leftTime:number=0;
		let cfg:Config.ComposeItemCfg = Config.ComposeCfg.getItemCfgById(id,Api.itemVoApi.getComposeVersion());
		if(cfg.timeLimit)
		{
			leftTime = this.itemVo.cinfo.et-GameData.serverTime;
		}
		return Math.max(0,leftTime);
	}

	public checkRedPoint():boolean
	{
		return this.checkCanCompose();
	}

	public checkCanCompose():boolean
	{
		let result:boolean=false;
		let list:Config.ComposeItemCfg[] = this.getComposeItemList();
		if(list)
		{
			let l:number=list.length;
			for(let ii:number=0;ii<l;ii++)
			{
				let itemCfg=list[ii];
				let needItemCfgList:Config.ItemItemCfg[]=itemCfg.needItemCfgList;
				let l:number=needItemCfgList.length;
				let isEnough:boolean=true;
				let needItemNameStr:string="";
				for(let i:number=0;i<l;i++)
				{
					let itemId=needItemCfgList[i].id;
					let ownNum:number=Api.itemVoApi.getItemNumInfoVoById(itemId);
					let needNum:number=itemCfg.getNeedItemNumById(itemId);
					if(ownNum<needNum)
					{
						isEnough=false;
					}
				}
				if(itemCfg.needGem)
				{
					let ownNum:number=Api.playerVoApi.getPlayerGem()
					let needNum:number=itemCfg.needGem;
					if(ownNum<needNum)
					{
						isEnough=false;
					}
				}
				if(isEnough)
				{
					if(itemCfg.composeLimit)
					{
						if(Api.itemVoApi.getComposeNumById(itemCfg.id)<itemCfg.composeLimit)
						{
							return true;
						}
					}
					else
					{
						return true;
					}
				}
			}
		}
		return false;
	}

	public checkCanComposeById(id:string|number):boolean
	{
		let result:boolean=false;
		let itemCfg=Config.ComposeCfg.getItemCfgById(id,this.getComposeVersion());
		if(!itemCfg){
			return false;
		}
		let needItemCfgList:Config.ItemItemCfg[]=itemCfg.needItemCfgList;
		let l:number=needItemCfgList.length;
		let isEnough:boolean=true;
		let needItemNameStr:string="";
		for(let i:number=0;i<l;i++)
		{
			let itemId=needItemCfgList[i].id;
			let ownNum:number=Api.itemVoApi.getItemNumInfoVoById(itemId);
			let needNum:number=itemCfg.getNeedItemNumById(itemId);
			if(ownNum<needNum)
			{
				isEnough=false;
			}
		}
		if(itemCfg.needGem)
		{
			let ownNum:number=Api.playerVoApi.getPlayerGem()
			let needNum:number=itemCfg.needGem;
			if(ownNum<needNum)
			{
				isEnough=false;
			}
		}
		if(isEnough)
		{
			if(itemCfg.composeLimit)
			{
				if(Api.itemVoApi.getComposeNumById(itemCfg.id)<itemCfg.composeLimit)
				{
					return true;
				}
			}
			else
			{
				return true;
			}
		}
		return false;
	}

	public isStart(id:number):boolean
	{	
		if(this.itemVo.sinfo&&this.itemVo.sinfo[id])
		{ 
			if((this.itemVo.sinfo[id].st <= GameData.serverTime) && (this.itemVo.sinfo[id].et > GameData.serverTime))
			{
				return true;
			} 
		}
	 	return false;  
	}

	public isEnd(id:number):boolean
	{
		if(this.itemVo.sinfo[id]&&this.itemVo.sinfo[id].et < GameData.serverTime)
		{
			return true;
		}
		return false;
	}

	//获取是否有兵符类道具
	public isHaveBingfu():boolean
	{
		let itemInfoVoObj = this.itemVo.itemInfoVoObj;
		let arr:Array<ItemInfoVo> = new Array();
		let bingfukeys = {
			"1003":1,
			"1006":1,
			"1081":1,
			"1082":1,
			"1083":1,
			"1084":1,
			"1085":1,
		}

		for(let key in itemInfoVoObj)
		{
			let itemCfg = itemInfoVoObj[key].itemCfg
			if(bingfukeys[key]&&itemInfoVoObj[key].num > 0)
			{
				return  true;
			}
		}
		return false;
	}

	public dispose():void
	{
		this.itemVo=null;
		super.dispose();
	}
}