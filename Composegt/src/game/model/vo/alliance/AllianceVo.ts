/**
 * 军团系统vo
 * author dky
 * date 2017/11/27
 * @class AllianceVo
 */
class AllianceVo extends BaseVo
{

	//军团id
	public id:number = 0;
	//军团创建者uid
	public creator:number = 0;
	//军团创建者名称
	public creatorname:string = "";
	//军团经验
	public exp:number = 0;
	//玩家成员
	public list:any[] = null;
	//军团总人数
	public mn:number = 0;
	//军团当前最大人数
	public maxmn:number = 0;
	//军团名称
	public name:string = null;
	//军团财富
	public wealth:number = null;
	//qq
	public cqq:string = null;
	//密码
	public pswd:number = null;
	//微信
	public cweixin:string = null;
	//军团等级
	public level:number = 0;
	//对外公告
	public intro:string = null;
	//对内公告
	public message:string = null;
	//军团日志
	public log:any[] = null;
	//军团势力
	public affect:number = 0;
	//招募是否开启0随机加入
	public switch:number = null;
	//职位设置,初始化时处理职位
	public position:number = null;
	//特殊数据重置时间
	public lastday:number = null;
	//数据上次更新时间
	public updated_at:number = null;
	//今日贡献次数
	public info:any = null;
	//军团申请
	public apply:any[] = null;

	public boss:any = null;
	
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			if(data.id != null)
			{
				this.id = Number(data.id);
			}
			if(data.creator != null)
			{
				this.creator = Number(data.creator);
			}
			if(data.creatorname != null)
			{
				this.creatorname = String(data.creatorname);
			}
			if(data.exp != null)
			{
				this.exp = data.exp;
			}
			if(data.list != null)
			{
				this.list = data.list;
			}
			if(data.mn != null)
			{
				this.mn = data.mn;
			}
			if(data.maxmn != null)
			{
				this.maxmn = data.maxmn;
			}
			if(data.name != null)
			{
				this.name = data.name;
			}
			if(data.cqq != null)
			{
				this.cqq = data.cqq;
			}
			if(data.cweixin != null)
			{
				this.cweixin = data.cweixin;
			}
			if(data.level != null)
			{
				this.level = data.level;
			}
			if(data.intro != null)
			{
				this.intro = data.intro;
			}
			if(data.message != null)
			{
				this.message = data.message;
			}
			if(data.log != null)
			{
				this.log = data.log;
			}
			if(data.affect != null)
			{
				this.affect = data.affect;
			}
			if(data.switch != null)
			{
				this.switch = data.switch;
			}
			if(data.position != null)
			{
				this.position = data.position;
			}
			if(data.lastday != null)
			{
				this.lastday = data.lastday;
			}
			if(data.updated_at != null)
			{
				this.updated_at = data.updated_at;
			}
			if(data.wealth != null )
			{
				this.wealth = data.wealth;
			}
			if(data.pswd != null )
			{
				this.pswd = data.pswd;
			}
			if(data.boss != null )
			{
				this.boss = data.boss;
			}
			if(data.apply != null )
			{
				this.apply = data.apply;
			}
			if(data.info != null )
			{
				this.info = data.info;
			}
		}
	}
	public isBossOpen()
	{
		if(Object.keys(this.boss).length > 0)
		{
			return true;
		}
		return false;
	}

	//刺客首领是否已开启
	public isInfinityBoss()
	{
		return this.boss.infinityBoss == 1;
	}

	//刺客首领是否已开启
	public infinityBossTomorrow():number
	{
		return this.boss.tomorrow || GameData.serverTime;
	}

	//刺客首领是否可以开启
	public isInfinityClear()
	{
		return this.boss.clear == 1;
	}

	public dispose():void
	{
		
		//军团id
		this.id= null;
		//军团创建者uid
		this.creator= null;
		//军团创建者名称
		this.creatorname= null;
		//军团创建者名称
		this.exp= 0;
		//玩家成员
		this.list = null;
		//军团总人数
		this.mn= 0;
		//qq
		this.cqq = null;
		//微信
		this.cweixin = null;
		//军团等级
		this.level= null;
		//对外公告
		this.intro = null;
		//对内公告
		this.message = null;
		//军团日志
		this.log = null;
		//军团势力
		this.affect= 0;
		//招募是否开启0随机加入
		this.switch = null;
		//职位设置,初始化时处理职位
		this.position= null;
		//特殊数据重置时间
		this.lastday= null;
		//数据上次更新时间
		this.updated_at= null;
		this.maxmn = 0;
		this.name = null;
		this.wealth = 0;
		this.pswd = null;
		this.boss = null;
		this.info = 0;
	}
}