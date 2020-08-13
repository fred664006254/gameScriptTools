class AtkraceVo extends BaseVo
{

	/**
	 * 衙门分数
	 */
	public point:number = 0;

	/**
	 * 仇人信息
	 * {uid:uid,name:xx,point:分数,st:攻击时间,power:势力,level:官品}
	 */
	public einfo:AtkraceEnemyInfo[] = [];

	/**
	 * 请求处理最后时间
	 */
	public lastday:number = 0;

	/**
	 * 是否参与过
	 */
	public isjoin:number = 0;

	/**
	 * 武馆信息
	 */
	public info:AtkraceInfoVo = null;

	/**
	 * 战斗信息
	 */
	public ainfo:AtkraceAtkInfoVo = null;

	/**
	 * 下一场战斗信息，收到下一个ainfo数据会替换到ainfo
	 */
	public nextAInfo:AtkraceAtkInfoVo=null;

	/**
	 * 防守信息
	 * 0:{uid:uid,name:xx,point:分数,st:攻击时间,sid:门客id,num:战胜人数,retscore:得分}
	 */
	public dinfo: AtkraceDefendInfo[] = [];

	/**
	 * 是否可领奖
	 */
	public rewardc:any = null;

	public constructor() {
		super();
	}

	public initData(data:any):void
	{
		if (data) {
			this.point =data.point;
			this.lastday =data.lastday;
			this.isjoin =data.isjoin;
			if (data.rewardc) {
				this.rewardc = data.rewardc;
			}
			if (data.info != null) {
				if (this.info == null) {
					this.info = new AtkraceInfoVo();
				}
				this.info.initData(data.info);
			}
			else if (this.info!=null) {
				this.info.dispose();
				this.info = null;
			}
			if (data.ainfo != null ) 
			{
				
				if(this.nextAInfo==null)
				{
					this.nextAInfo=new AtkraceAtkInfoVo();
					this.nextAInfo.initData(data.ainfo);
					this.ainfo = new AtkraceAtkInfoVo();
					this.ainfo.initData(data.ainfo);
				}
				else
				{
					if(NetManager.curReceiveCmd!=NetRequestConst.REQUEST_USER_LOGIIN)
					{
						if(NetManager.curReceiveCmd==NetRequestConst.REQUEST_ATKRACE_CHOOSE
							||NetManager.curReceiveCmd==NetRequestConst.REQUEST_ATKRACE_REVENGE
							||NetManager.curReceiveCmd==NetRequestConst.REQUEST_ATKRACE_KILL
							||NetManager.curReceiveCmd==NetRequestConst.REQUEST_ATKRACE_CHALLENGE
							||NetManager.curReceiveCmd==NetRequestConst.REQUEST_ATKRACE_FIGHT) {
							// App.LogUtil.log("最新数据",data.ainfo.meslist,data.ainfo.fids);
							// App.LogUtil.log("设置当前用数据",this.nextAInfo.bindData.meslist,this.nextAInfo.bindData.fids);
							this.ainfo.initData(this.nextAInfo.bindData);
							this.nextAInfo.initData(data.ainfo);
						}
						else
						{
							this.ainfo.initData(data.ainfo);
						}
					}
				}
			}
			// else if (this.ainfo!=null) {
			// 	this.ainfo.dispose();
			// 	this.ainfo = null;
			// }
			this.dinfo = data.dinfo ? data.dinfo : [];
			this.einfo = data.einfo ? data.einfo : [];
		}
	}

	public updataAdata():void
	{
		if(this.nextAInfo&&this.nextAInfo.bindData)
		{
			this.ainfo.initData(this.nextAInfo.bindData);
		}
	}

	public dispose()
    {
       this.point = 0;
	   this.einfo = null;
	   this.lastday = 0;
	   this.isjoin = 0;
	   this.info.dispose();
	   this.info=null;
	   this.ainfo.dispose();
	   this.ainfo=null;
	   this.nextAInfo.dispose();
	   this.nextAInfo=null;
	   this.dinfo = null;
	   this.rewardc = null;
    }
}

/**
 * 擂台-防守信息数据结构
 */
interface AtkraceDefendInfo {
	/**
	 * 攻击类型
	 */
	atype: number,
	/**攻击者UID */
	uid: number,
	/**攻击者昵称 */
	name: string,
	/**分数 */
	point: number,
	/**攻击时间 */
	st: number,
	/**门客id */
	sidlist: string[],
	/**战胜人数 */
	num: number,
	/**得分 */
	retscore: number
}

/**
 * 擂台-仇人信息数据结构
 */
interface AtkraceEnemyInfo {
	/**攻击者UID */
	uid: number,
	/**攻击者昵称 */
	name: string,
	/**分数 */
	point: number,
	/**攻击时间 */
	st: number,
	/**势力 */
	power: number,
	/**官品 */
	level: number
}

