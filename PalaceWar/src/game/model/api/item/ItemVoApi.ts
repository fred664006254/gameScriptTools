/**
 * 道具信息api
 * author dmj
 * date 2017/9/22
 * @class ItemVoApi
 */
class ItemVoApi extends BaseVoApi
{
	private itemVo:ItemVo;
	//等待展示的称号升级弹窗
	private _waitingTitleLvUp:any[]=[];

	public constructor() 
	{
		super();
	}

	public insertWaitingTitleLvUp(t:any):void
	{
		if (ViewController.getInstance().getView(ViewConst.COMMON.TITLELEVELUPVIEW) && ViewController.getInstance().getView(ViewConst.COMMON.TITLELEVELUPVIEW).isShow())
		{	
			this._waitingTitleLvUp.push(t);
		}
		else
		{
			ViewController.getInstance().openView(ViewConst.COMMON.TITLELEVELUPVIEW,t);
		}
	}

	public checkWaitingTitleLvUp():void
	{
		if (this._waitingTitleLvUp.length>0)
		{
			let a:any = this._waitingTitleLvUp.shift();
			ViewController.getInstance().openView(ViewConst.COMMON.TITLELEVELUPVIEW,a);
		}
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
			if( itemInfoVoObj[key].num > 0) //type == itemInfoVoObj[key].type &&
			{
				arr.push(itemInfoVoObj[key]);
			}
		}
		if(Api.rookieVoApi.getIsGuiding()){
			arr.sort((a,b)=>{
				if(Number(a.id) == 2401){
					return -1;
				}
				else if(Number(b.id) == 2401){
					return 1;
				}
				else{
					return a.sortId - b.sortId;
				}
			});
		}
		else{
			arr.sort(this.sortA);
		}
		
		return arr;
	}

	/**
	 * 根据类型获取道具vo列表
	 * @param type 类型，3：时装   4装扮
	 */
	public getTitleVoListByType(type:number):Array<TitleInfoVo>
	{
		let titleInfoVoObj = this.itemVo.titleInfoVoObj;
		let arr:Array<TitleInfoVo> = new Array();
		for(let key in titleInfoVoObj)
		{
			if(type == titleInfoVoObj[key].type  )
			{
				if(key == "4001" && titleInfoVoObj[key].itemCfg.unlock != 0){
					if(Api.switchVoApi.checkVip1Privilege())
					{
						arr.push(titleInfoVoObj[key]);
					}
				}
				else if(key == "3801" && titleInfoVoObj[key].itemCfg.unlock != 0){
					if(Api.switchVoApi.checkOpenPrestige())
					{
						arr.push(titleInfoVoObj[key]);
					}
				}else if(key == "4017" && titleInfoVoObj[key].itemCfg.unlock != 0){
					if(Api.switchVoApi.checkIsTitleState("4017"))
					{
						arr.push(titleInfoVoObj[key]);
					}
				}
				else{
					let isHas = false;
					if (!PlatformManager.checkIsFkylcSp())
					{
						isHas= titleInfoVoObj[key].num != -1;
					}
					
					if ( isHas || titleInfoVoObj[key].itemCfg.unlock != 0)
					// if ( titleInfoVoObj[key].itemCfg.unlock != 0)
					{	
						if (type == 4 && titleInfoVoObj[key].itemCfg.isTitle == 4)
						{
							if (Api.switchVoApi.checkOpenTitleList())
							{
								arr.push(titleInfoVoObj[key]);
							}
						}
						else
						{
							arr.push(titleInfoVoObj[key]);
						}
						
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
			if (titleInfoVoObj[key].type == 3 || titleInfoVoObj[key].type == 4) {
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
	private sortA(a:ItemInfoVo|TitleInfoVo|Config.ComposeItemCfg,b:ItemInfoVo|TitleInfoVo|Config.ComposeItemCfg):number
	{
		return a.sortId - b.sortId;
	}

	// 排序
	private sortB(a:ItemInfoVo|TitleInfoVo|Config.ComposeItemCfg,b:ItemInfoVo|TitleInfoVo|Config.ComposeItemCfg):number
	{
		return b.sortId - a.sortId;
	}

	/**
	 * 根据id获取titleInfovo
	 * @param id 时装id
	 */
	public getTitleInfoVoById(id:number):TitleInfoVo
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
	/**是否有这个称号  */
	public isHasTitle(id:number)
	{
		if(this.itemVo && this.itemVo.tinfo[id])
		{
			return true
		}
		return false
	}
	/**称号信息  */
	public getTitleInfo():any
	{
		if(this.itemVo && this.itemVo.tinfo)
		{
			return this.itemVo.tinfo;
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
		listArr.sort(this.sortA);
		let l:number=listArr.length;
		for(let i:number=l-1;i>=0;i--)
		{
			let itemCfg:Config.ComposeItemCfg=listArr[i];
			if(itemCfg.timeLimit&&(this.itemVo.cinfo.et<=GameData.serverTime))
			{
				//过期了删除
				listArr.splice(i,1);
			}
			if (!Api.switchVoApi.checkOpenServantLevel450())
			{
				if (GameData.isInArray(itemCfg.itemId,["1719","1720","1721"]))
				{
					listArr.splice(i,1);
				}
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
				if(Config.GameprojectCfg.checkComposeNotShowRedPointById(itemCfg.itemId))
				{
					isEnough=false;
				}
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
		let needItemCfgList:Config.ItemItemCfg[]=itemCfg.needItemCfgList;
		let l:number=needItemCfgList.length;
		let isEnough:boolean=true;
		if(Config.GameprojectCfg.checkComposeNotShowRedPointById(itemCfg.itemId))
		{
			isEnough=false;
		}
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
			if (id == 2115){
				//此处不需要判断截止时间，如果开第二期活动可以使用
				if (this.itemVo.sinfo[id].st <= GameData.serverTime){
					return true;
				}
			}
			else if((this.itemVo.sinfo[id].st <= GameData.serverTime) && (this.itemVo.sinfo[id].et > GameData.serverTime))
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

	public getTitleUpgradeInfo(titleid):any{
		let obj = {
			num : 0,
			level : 0
		};
		if(this.itemVo && this.itemVo.titleupgrade && this.itemVo.titleupgrade[titleid]){
			obj.num =  this.itemVo.titleupgrade[titleid].v; 
			obj.level = this.itemVo.titleupgrade[titleid].tlv; 
		}
		return obj;
	}

	public getMaxTitleLv():number
	{
		let v = 0;
		for (let k in this.itemVo.tinfo)
		{
			let cfg = Config.TitleCfg.getTitleCfgById(k);
			if (cfg.isTitle == 1)
			{
				if (v == 0)
				{
					v = cfg.titleType;
				}
				else if (v > cfg.titleType)
				{
					v = cfg.titleType;
				}
			}
		}
		return v;
	}

	public getMaxTitleId():number
	{
		let v = 0;
		let id:number = 0;
		for (let k in this.itemVo.tinfo)
		{
			let cfg = Config.TitleCfg.getTitleCfgById(k);
			if (cfg.isTitle == 1)
			{
				if (v == 0)
				{
					v = cfg.titleType;
					id = Number(k);
				}
				else if (v > cfg.titleType)
				{
					v = cfg.titleType;
					id = Number(k);
				}
			}
		}
		return id;
	}

	//判断是否是门客皮肤道具
	public checkIsServantSkinItem(id:string|number):boolean
	{
		let itemCfg =  Config.ItemCfg.getItemCfgById(id)
		if(itemCfg.servantSkinID){
			return true;
		}
		return false
	}

	public dispose():void
	{
		this.itemVo=null;
		this._waitingTitleLvUp.length = 0;
		super.dispose();
	}
}