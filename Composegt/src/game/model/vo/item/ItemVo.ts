/**
 * 道具信息vo
 * author dmj
 * date 2017/9/22
 * @class ItemVo
 */
class ItemVo extends BaseVo
{
	// 数据上次更新时间
	public updated_at:number = 0;
	// 道具列表
	public itemInfoVoObj:Object = null;
	// 称号列表
	public titleInfoVoObj:Object = null;
	
	/**
	 * 道具合成
	 */
	public cinfo:{version:string,st:number,info:any,et:number}=<any>{};
	public sinfo:any =null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.updated_at != null)
			{
				this.updated_at = Number(data.updated_at);
			}
			if(data.info)
			{
				if(this.itemInfoVoObj == null)
				{
					this.itemInfoVoObj = {};
				}
				for(var key in data.info)
				{
					if(this.itemInfoVoObj[key])
					{
						this.itemInfoVoObj[key].initData({id:Number(key),num:data.info[key]});
					}
					else
					{
						let itemInfoVo:ItemInfoVo = new ItemInfoVo();
						itemInfoVo.initData({id:Number(key),num:data.info[key]});
						this.itemInfoVoObj[key] = itemInfoVo;
					}
				}
			}

			if(this.titleInfoVoObj == null)
			{
				this.titleInfoVoObj = {};
				let titleCfg = Config.TitleCfg.getTitleCfg();
				for(var key in titleCfg)
				{
					let titleInfoVo:TitleInfoVo = new TitleInfoVo();
					titleInfoVo.initData({id:Number(key),num:-1});
					this.titleInfoVoObj[key] = titleInfoVo;
				}
			}

			if(data.tinfo)
			{	
				for(var key in this.titleInfoVoObj)
				{	
					if (data.tinfo[key] != null) {
						let isDispatch = false;
						let vo:TitleInfoVo = this.titleInfoVoObj[key];
						let cfg = Config.TitleCfg.getTitleCfgById(key);
						if(vo && cfg && cfg.isTitle == 2 && vo.num != 2 && data.tinfo[key] == 2)
						{
							isDispatch = true;
						}
						this.titleInfoVoObj[key].initData({id:Number(key),num:data.tinfo[key]});
						if(isDispatch ){
							App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR);
						}

					}
					else {
						this.titleInfoVoObj[key].initData({id:Number(key),num:-1});
					}
				}
				for(var key in data.tinfo)
				{	
					if (!this.titleInfoVoObj[key]) {
						this.titleInfoVoObj[key] = new TitleInfoVo();
						this.titleInfoVoObj[key].initData({id:Number(key),num:data.tinfo[key]});
					}
				}
			}

			if(data.tupinfo)
			{
				for(var key in this.titleInfoVoObj)
				{	
					if (data.tupinfo[key] != null) {
						let vo:TitleInfoVo = this.titleInfoVoObj[key];
						vo.lv = data.tupinfo[key].tlv || 1;
						vo.tnum = data.tupinfo[key].tnum;
					}
				}
			}


			if(data.cinfo)
			{
				this.cinfo=data.cinfo;
			}
			if(Api.servantVoApi.isShowRedForItem())
			{
				App.MessageHelper.dispatchNetMessage(MessageConst.MESSAGE_REFRESH_MODE,"servant");
			}
			if(data.sinfo)
			{
				this.sinfo =data.sinfo;
			}
		}
	}

	/**
	 * 刷新道具合成信息
	 * @param data 
	 */
	public setcinfo(data:any):void
	{
		if(!this.cinfo)
		{
			this.cinfo=data;
		}
		else
		{
			if(data.st)
			{
				this.cinfo.st=data.st;
			}
			if(data.version)
			{
				this.cinfo.version=data.version;
			}
			if(data.et)
			{
				this.cinfo.et=data.et;
			}
		}
	}
 

	public dispose():void
	{
		this.updated_at = 0;
		if(this.itemInfoVoObj)
		{
			for(let key in this.itemInfoVoObj)
			{
				if(this.itemInfoVoObj[key])
				{
					this.itemInfoVoObj[key].dispose();
					this.itemInfoVoObj[key] = null;
				}
			}
		}
		this.itemInfoVoObj = null;

		if(this.titleInfoVoObj)
		{
			for(let key in this.titleInfoVoObj)
			{
				(this.titleInfoVoObj[key])
				{
					this.titleInfoVoObj[key].dispose();
					this.titleInfoVoObj[key] = null;
				}
			}
		}
		this.titleInfoVoObj = null;
	}
}