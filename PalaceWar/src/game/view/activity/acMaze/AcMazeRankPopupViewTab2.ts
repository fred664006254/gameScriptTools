/**
  * 赵云排行榜Tab2
  * author 张朝阳
  * date 2018/7/10
  * @class AcMazeRankPopupViewTab2
  */
class AcMazeRankPopupViewTab2 extends AcCommonViewTab {

	private _rewardAcTimeTF:BaseTextField = null;
	private _buttomBg:BaseBitmap = null;
	private _rewardMyRankTF:BaseTextField = null;
	public constructor() {
		super();
		this.initView();
	}
	/**
	 * 配置文件数据
	 */
	private get cfg() : Config.AcCfg.MazeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMazeView.AID, AcMazeView.CODE);
    }
	/**
	 * 服务器返回数据
	 */
	private get vo() : AcMazeVo{
        return <AcMazeVo>Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
	}
	
	public initView()
	{
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZERANK,this.rankClickHandler,this);
		TickManager.addTick(this.tick,this);
		let rewardList:any[] = this.cfg.rankReward;
		let rewardRect = new egret.Rectangle(0,0,516,520);
		let rewardScrollList = ComponentManager.getScrollList(AcMazeRankRewardScrollItem,rewardList,rewardRect);
		rewardScrollList.setPosition(30,55);
		this.addChild(rewardScrollList);

		this._buttomBg = BaseBitmap.create("public_9_probiginnerbg");
		this._buttomBg.width = 516;
		this._buttomBg.height = 112;
		this._buttomBg.setPosition(rewardScrollList.x ,rewardScrollList.y + rewardScrollList.height + 10);
		this.addChild(this._buttomBg);

		this._rewardMyRankTF = ComponentManager.getTextField(LanguageManager.getlocal("rankorder2",[LanguageManager.getlocal("atkracedes4")]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rewardMyRankTF.setPosition(this._buttomBg.x + 30,this._buttomBg.y + 15);
		this.addChild(this._rewardMyRankTF)
		// 活动倒计时 
		this._rewardAcTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeople_acCD"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rewardAcTimeTF.setPosition(this._buttomBg.x + this._buttomBg.width - this._rewardAcTimeTF.width - 10,this._rewardMyRankTF.y);
		this.addChild(this._rewardAcTimeTF);
		// 奖励发送 
		let rewardMailTF = ComponentManager.getTextField(LanguageManager.getlocal("acRanktip3"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		if(PlatformManager.checkIsEnLang())
		{
			rewardMailTF.textAlign = egret.HorizontalAlign.CENTER;
		}
		rewardMailTF .setPosition(this._buttomBg.x + this._buttomBg.width / 2 - rewardMailTF .width / 2,this._buttomBg.y + this._buttomBg.height - rewardMailTF .height - 10);
		this.addChild(rewardMailTF);
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAZERANK,{"activeId":AcMazeView.ACTIVEID});
		this.tick();
	}

	/**
	 * 时间倒计时
	 */
	public tick(): boolean {
		let cfg = this.cfg;
		let deltaT = this.vo.et - GameData.serverTime - 86400 * 1;
		if (this._rewardAcTimeTF && deltaT > 0) {
			this._rewardAcTimeTF.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
			this._rewardAcTimeTF.setPosition(this._buttomBg.x + this._buttomBg.width - this._rewardAcTimeTF.width - 10,this._rewardMyRankTF.y);
			return true;
		} else {
			this._rewardAcTimeTF.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
			this._rewardAcTimeTF.setPosition(this._buttomBg.x + this._buttomBg.width - this._rewardAcTimeTF.width - 10,this._rewardMyRankTF.y);
		}
		return false;
	}

	private rankClickHandler(event:egret.Event)
	{
		let data = event.data.data.data;
		let myRank = data.myrankArr.myrank;
		let str:string;
		if(myRank == null)
		{
			str = LanguageManager.getlocal("atkracedes4");
		}
		else if(myRank > 10000)
		{
			str = "10000+";
		}
		else
		{
			str = myRank;
		}
		this._rewardMyRankTF.text = LanguageManager.getlocal("rankorder2",[str])
	}
	
	public dispose()
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZERANK,this.rankClickHandler,this);
		TickManager.removeTick(this.tick,this);
		this._rewardAcTimeTF = null;
		this._buttomBg = null;
		this._rewardAcTimeTF = null;
		super.dispose();
	}

}