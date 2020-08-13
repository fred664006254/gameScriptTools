

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
	 * 玩家剩余门客
	 */
	public sids:Object = {};

	/**
	 * 战斗类型 1随机 2复仇 3挑战 4追杀
	 */
	public atype:number = 0;

	/**
	 * 我出战门客
	 */
	public mesid:AtkraceServantVo = null;
	
	/**
	 * 当前对战门客
	 */
	public fids:Object = {};

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

	public support:number=0;

	public fallianceId:number = 0

	public director:any = null;
	public fdirector:any = null;
	
	public constructor() {
		super();
	}

	public initData(data:any):void
	{
		if (data) {
			this.uid = data.uid;
			this.fname = data.fname;
			this.sids = data.sids;
			this.atype = data.atype;
			this.fpoint = data.fpoint;
			// if(data.fallianceId){
				this.fallianceId = data.fallianceId;
			// }
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
			if (data.fids != null) {
				for(var key in data.fids)
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
				for(var key in this.fids)
				{
					if(!data.fids[key])
					{
						delete this.fids[key];
					}
				}
			}
			else {
				for(var key in this.fids)
				{
					this.fids[key].dispose();
				}
				this.fids={};
			}
			this.director = data.director;
			this.fdirector = data.fdirector;
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
		this.support = 0;
		if(data.support){
			this.support = data.support;
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
	   for(var key in this.fids)
		{
			this.fids[key].dispose();
		}
		this.fids={};
		this.fightnum = 0;
		this.total = 0;
		this.handle  = 0;
		this.tmpattr = null;
		this.support = 0;
    }
}