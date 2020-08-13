/**
 * 红颜对战vo
 * author jiangly
 * date 2018/08/13
 * @class WifebattleVo
 */
class WifebattleVo extends BaseVo
{

	// public sinfo:{string:{attr:number,name:string,ranking:number,uid:string,zid:string,lv:number}}[] = [];
	// public winfo:{string:{intimacy:number,name:string,ranking:number,uid:string,zid:string,lv:number}}[] = [];

	// public uid:string = null;

	// 是否能参与 2是正常进入
	public isjoin:number = null;
	//群芳会分数 排行榜分数 不能购买道具
	public point:number = 0;
	//群芳会积分
	public rewardnum:number = 0;
	//玩家状态
	public info:any = null;
	//对手信息
	public ainfo:any = null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			
			this.isjoin = data.isjoin;
			if(data.point){
				this.point = data.point;
			}
			this.rewardnum = data.rewardnum;		
			if(data.info){
				this.info = data.info; 
			}
			if(data.ainfo){
				this.ainfo = data.ainfo;

			}
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFEBATTLE_REFRESHVO);

			
		}

	}
	//检测是否已经有没攻击的敌人
	public checkHaveEnemy():boolean
	{	
		if(this.ainfo && this.ainfo.uid){
			return true;
		} else {
			return false;
		}
	}

	//检测是否到时间可以搜索
	public checkCanCDSearch():boolean
	{
		if(GameData.serverTime - this.info.lasttime > Config.WifebattleCfg.intervalTime){
			return true;
		} else {
			return false;
		}

	}
	public checkHaveSearchCount():boolean
	{
		if(this.info.num < Config.WifebattleCfg.dailyNum){
			return true;
		} else {
			return false;
		}


	}


	//检测当前红颜是否需要弹出搜寻框
	public isShowWifeSearch():boolean
	{
		if(this.ainfo && this.ainfo.handle == 0){
			return true;
		} else {
			return false;
		}
	}
	//得到对手位分最高的弹出提示信息
	public getEnemyMaxInfo():{wifeid:number,skin:number,sexflag?:number}
	{	
		if(this.ainfo && this.ainfo.maxwifeinfo){
			if(this.ainfo.maxwifeinfo.sexflag && this.ainfo.maxwifeinfo.sexflag >=1){
				//男红颜
				return {wifeid:this.ainfo.maxwifeinfo.wifeid,skin:this.ainfo.maxwifeinfo.maleskin,sexflag:this.ainfo.maxwifeinfo.sexflag};
			} else {
				return {wifeid:this.ainfo.maxwifeinfo.wifeid,skin:this.ainfo.maxwifeinfo.skin};
			}
			
		} else {
			return null;
		}

	}

	//CD显示
	public getCDStr():string
	{
		if(this.info.num >= Config.WifebattleCfg.dailyNum){
			//今日次数用完
			return LanguageManager.getlocal("wifeBattleSearchDesc2");
		} else {
			if(!this.checkCanCDSearch())
			{
				let time =  this.info.lasttime + Config.WifebattleCfg.intervalTime - GameData.serverTime ;
				let timeStr = App.DateUtil.getFormatBySecond(time,3);
				return LanguageManager.getlocal('wifeBattleSearchDesc',[timeStr]);
			} else {
				return "";
			}

		}

	}

	public dispose():void
	{
		// 是否能参与 1是正常进入
		this.isjoin = null;
		//群芳会分数 排行榜分数 不能购买道具
		this.point = 0;
		this.rewardnum = 0;
		//玩家状态
		this.info = null;
		//对手信息
		this.ainfo = null;
	}
}