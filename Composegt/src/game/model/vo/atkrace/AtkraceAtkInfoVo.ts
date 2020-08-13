

class AtkraceAtkInfoVo extends BaseVo
{

	/**
	 * 对战玩家,
	 */
	public uid:string = "";

	/**
	 * 对战玩家,
	 */
	public fname:string = "";

	/**
	 * 对战玩家分数
	 */
	public fpoint:number = 0;

	/**
	 * 对手头像
	 */
	public fpic: number = 1;
	/**
	 * 对手等级
	 */
	public flevel: number = 3;
	/**
	 * 对手排名
	 */
	public frank: number = 0;

	/**
	 * 玩家剩余门客
	 */
	public sids:Object = {};

	/**
	 * 战斗类型 1随机 2复仇 3挑战 4追杀
	 */
	public atype:number = 0;

	/**
	 * 我出战门客(waste)
	 */
	public mesid:AtkraceServantVo = null;

	/**
	 * 出战门客列表
	 */
	public meslist: AtkraceServantVo[] = [];
	
	/**
	 * 当前对战门客
	 */
	public fids:AtkraceServantVo[] = [];

	/**
	 * 战胜次数
	 */
	public fightnum:number = 0;

	/**
	 * 总门客数
	 */
	public total:number = 0;

	/**
	 *  -1再议 1准奏
	 */
	public handle:number = 0;
	
	/**
	 *  tmpattr:临时属性{blood血量加成:,atk攻击加成:,skill技能加成, list:[2:{},3:{},4:{}], isbuy:1是/0否},
	 */
	public tmpattr:any = {};

	public bindData:any;
	
	public constructor() {
		super();
	}

	public initData(data:any):void
	{
		this.bindData=data;
		if (data) 
		{
			this.uid = data.uid;
			this.fname = data.fname;
			this.sids = data.sids;
			this.atype = data.atype;
			this.fpoint = data.fpoint;
			this.fpic = data.fpic;
			this.flevel = data.flevel;
			this.frank = data.frank;
			if (data.mesid != null) {
				this.mesid = new AtkraceServantVo();
				this.mesid.initData(data.mesid);
			}
			else {
				if (this.mesid) {
					this.mesid.dispose();
					this.mesid = null;
				}
			}

			if(data.meslist)
			{
				for(var key in data.meslist)
				{
					if(data.meslist.hasOwnProperty(key))
					{
						if(this.meslist[key])
						{
							this.meslist[key].initData(data.meslist[key]);	
						}
						else
						{
							let servantInfoVo:AtkraceServantVo = new AtkraceServantVo();
							servantInfoVo.id = key;
							servantInfoVo.initData(data.meslist[key]);
							this.meslist[key] = servantInfoVo;
						}
					}
				}
				for(var key in this.meslist)
				{
					if(this.meslist.hasOwnProperty(key))
					{
						if(!data.meslist[key])
						{
							delete this.meslist[key];
						}
					}
				}
			}
			else
			{
				for(var key in this.meslist)
				{
					if(this.meslist.hasOwnProperty(key))
					{
						this.meslist[key].dispose();
					}
				}
				this.meslist.length=0;
			}

			if (data.fids != null) {
				for(var key in data.fids)
				{
					if(data.fids.hasOwnProperty(key))
					{
						if(this.fids[key])
						{
							this.fids[key].initData(data.fids[key]);	
						}
						else
						{
							let servantInfoVo:AtkraceServantVo = new AtkraceServantVo();
							servantInfoVo.id = key;
							servantInfoVo.initData(data.fids[key]);
							this.fids[key] = servantInfoVo;
						}
					}
				}
				for(var key in this.fids)
				{
					if(this.fids.hasOwnProperty(key))
					{
						if(!data.fids[key])
						{
							this.fids[key].dispose();
							delete this.fids[key];
						}
					}
				}
			}
			else {
				for(var key in this.fids)
				{
					this.fids[key].dispose();
				}
				this.fids.length=0;
			}
			if (data.fightnum != null) {
				this.fightnum = data.fightnum;
			}
			else {
				this.fightnum = 0;
			}
			if (data.total != null) {
				this.total = data.total;
			}
			else {
				this.total = 0;
			}
	
			this.handle = data.handle;
			this.tmpattr = data.tmpattr;
		}
	}

	public getFName():string
	{
		let nameStr:string = this.fname;
		if (this.uid == "robot") {
			nameStr =  LanguageManager.getlocal("atkRaceRobotName"+this.fname);
		}
		return nameStr;
	}

	public dispose()
    {
		this.uid = null;
		this.fname = null;
		this.sids = null;
		this.fpoint = 0;
		this.atype = 0;
		this.fids = null;
		if(this.mesid)
		{
			this.mesid.dispose();
			this.mesid=null;
		}
		if(this.fids)
		{
			for(var key in this.fids)
			{
				this.fids[key].dispose();
			}
			this.fids.length=0;
		}
		this.fightnum = 0;
		this.total = 0;
		this.handle  = 0;
		this.tmpattr = null;
		this.bindData=null;
    }
}