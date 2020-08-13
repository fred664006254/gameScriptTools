class AtkracecrossVo extends BaseVo
{
	/**
	 * 衙门分数
	 */
	public point:number = 0;

	/**
	 * 仇人信息
	 * {uid:uid,name:xx,point:分数,st:攻击时间,power:势力,level:官品}
	 */
	public einfo:Object = null;

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
	 * 防守信息
	 * 0:{uid:uid,name:xx,point:分数,st:攻击时间,sid:门客id,num:战胜人数,retscore:得分}
	 */
	public dinfo:Object = null;

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
			this.einfo =data.einfo;
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
			if (data.ainfo != null && Object.keys(data.ainfo).length>0) {
				if (this.ainfo == null) {
					this.ainfo = new AtkraceAtkInfoVo();
				}
				this.ainfo.initData(data.ainfo);
			}
			else if (this.ainfo!=null) {
				this.ainfo.dispose();
				this.ainfo = null;
			}
			this.dinfo =data.dinfo;
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
	   this.dinfo = null;
	   this.rewardc = null;
    }
}