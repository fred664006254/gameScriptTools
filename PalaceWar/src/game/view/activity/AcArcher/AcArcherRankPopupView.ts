/**
  * 黄忠活动排行榜
  * author 张朝阳
  * date 2018/6/21
  * @class AcArcherRankPopupView
  */
class AcArcherRankPopupView extends PopupView{
	/**
	 * 排行榜的ScrollList
	 */
	private _rankScrollList:ScrollList = null;
	/** 排行榜的bg */
	private _rankBg:BaseBitmap = null;
	/** 排行榜的topbg */
	private _rankTopBg:BaseBitmap = null;
	/** 排名 */
	private _rankTF:BaseTextField = null;
	/** 玩家昵称 */
	private _rankPlayNameTF:BaseTextField = null;
	/** 杀敌数 */
	private _rankKillNumTF:BaseTextField = null;
	/** 我的昵称 */
	private _rankNiceNameTF:BaseTextField = null;
	/** 上榜条件 */
	private _rankUpTF:BaseTextField = null;
	/** 我的排名 */
	private _rankMyTF:BaseTextField = null;
	/** 转的次数 */
	private _rankPowerTF:BaseTextField = null;
	/** 奖励下面显示我的排名 */
	private _rewardMyRankTF:BaseTextField = null
	/** 活动倒计时 */
	private _rewardAcTimeTF:BaseTextField = null
	/** 奖励发送 */
	private _rewardMailTF:BaseTextField = null
	/**奖励的ScrollList */
	private _rewardScrollList:ScrollList = null;
	/**
	 * 底部的bg
	 */
	private _buttomBg:BaseBitmap = null;

	private activeId:string = null;
	private code:string = null;
	public constructor() {
		super();
	}
	/**
	 * 配置文件数据
	 */
	private get cfg() : Config.AcCfg.ArcherCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACARCHER, this.code);
    }
	/**
	 * 服务器返回数据
	 */
	private get vo() : AcArcherVo{
        return <AcArcherVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACARCHER, this.code);
    }
	/**
	 * 初始化view
	 */
	public initView()
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARCHERRANK),this.updateData,this);
		let myrankArr = this.param.data.myrankArr;
		let rankArr = this.param.data.rankArr;
		this.activeId = this.param.data.activeId;
		this.code = this.param.data.code;
		// 排行榜的tabbar
		let tabName:string[] = ["acPunishRankTab1","acPunishRankRewardPopupViewTitle"];
        let tabbarGroup:TabBarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
		tabbarGroup.setPosition(35+GameData.popupviewOffsetX,15);
		this.addChildToContainer(tabbarGroup);
		// 排行榜的bg 
		this._rankBg = BaseBitmap.create("public_9_probiginnerbg");
		this._rankBg.width = 516;
		this._rankBg.height = 520;
		this._rankBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - this._rankBg.width / 2,tabbarGroup.y + tabbarGroup.height);
		this.addChildToContainer(this._rankBg);
		// 排行榜的topbg 
		this._rankTopBg = BaseBitmap.create("public_9_bg37");
		this._rankTopBg.width = this._rankBg.width;
		this._rankTopBg.height = 35;
		this._rankTopBg.setPosition(this._rankBg.x,this._rankBg.y);
		this.addChildToContainer(this._rankTopBg);
		// 排名 
		this._rankTF  = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rankTF.setPosition(this._rankTopBg.x + 35,this._rankTopBg.y + this._rankTopBg.height / 2 - this._rankTF.height / 2+1);
		this.addChildToContainer(this._rankTF);
		// 玩家昵称 
		this._rankPlayNameTF  = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rankPlayNameTF.setPosition(this._rankTopBg.x + this._rankTopBg.width / 2 - this._rankPlayNameTF.width / 2,this._rankTF.y+1);
		this.addChildToContainer(this._rankPlayNameTF);
		// 杀敌数 
		this._rankKillNumTF  = ComponentManager.getTextField(LanguageManager.getlocal("acArcherRankKillNum"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rankKillNumTF.setPosition(this._rankTopBg.x + this._rankTopBg.width - this._rankKillNumTF.width  - 75,this._rankTF.y+1);
		this.addChildToContainer(this._rankKillNumTF);
		//排行榜的ScrollList
		let rect = new egret.Rectangle(0,0,this._rankBg.width,this._rankBg.height - this._rankTopBg.height - 10)
		this._rankScrollList = ComponentManager.getScrollList(AcArcherRankScrollItem,rankArr,rect);
		this._rankScrollList.setPosition(this._rankTopBg.x,this._rankTopBg.y + this._rankTopBg.height);
		this.addChildToContainer(this._rankScrollList);
		this._rankScrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") );
		// 底部的bg 
		this._buttomBg = BaseBitmap.create("public_9_probiginnerbg");
		this._buttomBg.width = 516;
		this._buttomBg.height = 112;
		this._buttomBg.setPosition(this._rankBg.x,this._rankBg.y + this._rankBg.height + 10);
		this.addChildToContainer(this._buttomBg);
		// 我的昵称 
		let niceName = Api.playerVoApi.getPlayerName();
		this._rankNiceNameTF = ComponentManager.getTextField(LanguageManager.getlocal("acRank_mynick") + niceName,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rankNiceNameTF.setPosition(this._buttomBg.x + 40,this._buttomBg.y + 20);
		this.addChildToContainer(this._rankNiceNameTF);
		// 上榜条件 
		this._rankUpTF = ComponentManager.getTextField(LanguageManager.getlocal("AcArcherRankPopupViewTip",[String(this.cfg.rankNeedNum)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rankUpTF.setPosition(this._buttomBg.x + this._buttomBg .width - this._rankUpTF.width - 40,this._rankNiceNameTF.y);
		this.addChildToContainer(this._rankUpTF);
		if(PlatformManager.checkIsThSp())
		{
			this._rankNiceNameTF.setPosition(this._buttomBg.x + 10,this._buttomBg.y + 20);
			this._rankUpTF.setPosition(this._buttomBg.x + this._buttomBg .width - this._rankUpTF.width - 10,this._rankNiceNameTF.y);
		}
		// 我的排名 
		let myRank = myrankArr.myrank;
		if(myRank == null)
		{
			myRank = LanguageManager.getlocal("atkracedes4");
		}
		else if(myrankArr.myrank > 10000)
		{
			myRank = "10000+";
		}
			
		this._rankMyTF = ComponentManager.getTextField(LanguageManager.getlocal("rankorder2",[myRank]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rankMyTF.setPosition(this._rankNiceNameTF.x,this._buttomBg.y + this._buttomBg.height - this._rankMyTF.height -20);
		this.addChildToContainer(this._rankMyTF);
		// 转的次数
		this._rankPowerTF = ComponentManager.getTextField(LanguageManager.getlocal("acArcherRankNum",[String(this.vo.getArcherNum())]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rankPowerTF.setPosition(this._rankUpTF.x,this._rankMyTF.y);
		this.addChildToContainer(this._rankPowerTF);
		// 奖励下面显示我的排名 
		this._rewardMyRankTF = ComponentManager.getTextField(LanguageManager.getlocal("acPunishMyrank1",[myRank]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rewardMyRankTF.setPosition(this._buttomBg.x + 30,this._buttomBg.y + 15);
		this.addChildToContainer(this._rewardMyRankTF)
		this._rewardMyRankTF.visible = false;
		// 活动倒计时 
		this._rewardAcTimeTF = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeople_acCD"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rewardAcTimeTF.setPosition(this._buttomBg.x + this._buttomBg.width - this._rewardAcTimeTF.width - 10,this._rewardMyRankTF.y);
		this.addChildToContainer(this._rewardAcTimeTF);
		this._rewardAcTimeTF.visible = false;
		// 奖励发送 
		this._rewardMailTF = ComponentManager.getTextField(LanguageManager.getlocal("acRanktip3"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		this._rewardMailTF.setPosition(this._buttomBg.x + this._buttomBg.width / 2 - this._rewardMailTF.width / 2,this._buttomBg.y + this._buttomBg.height - this._rewardMailTF.height - 10);
		this.addChildToContainer(this._rewardMailTF);
		this._rewardMailTF.visible = false;

		//奖励的ScrollList
		let rewardList:any[] = this.cfg.rankReward;
		let rewardRect = new egret.Rectangle(0,0,this._rankBg.width,this._rankBg.height);
		this._rewardScrollList = ComponentManager.getScrollList(AcArcherRankRewardScrollItem,rewardList,rewardRect);
		this._rewardScrollList.setPosition(this._rankBg.x,this._rankBg.y);
		this.addChildToContainer(this._rewardScrollList);
		this._rewardScrollList.visible = false;


	}
	/**
	 * 更新数据
	 */
	public updateData(event:egret.Event)
	{
		let data = event.data.data.data.rankArr;
		this.showRankUI();
		this._rankScrollList.refreshData(data);
		
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
	/**
	 * 	切换tabbar事件
	 */
	private tabBtnClickHandler(params:any)
	{
		if(params.index == 1)
		{
			this.showRewardUI()
		}
		else{
			// this.showRankUI();
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETARCHERRANK,{activeId : this.activeId});
		}
	}
	/**
	 * 显示奖励UI
	 */
	private showRewardUI()
	{
		this._rankScrollList.visible = false;
		this._rankBg.visible = false;
		this._rankTopBg.visible = false;
		this._rankTF.visible = false;
		this._rankPlayNameTF.visible = false;
		this._rankKillNumTF.visible = false;
		this._rankNiceNameTF.visible = false;
		this._rankUpTF.visible = false;
		this._rankMyTF.visible = false;
		this._rankPowerTF.visible = false;
		// this._rankNoneTF.visible = false;
		this._rewardMyRankTF.visible = true;
		this._rewardAcTimeTF.visible = true;
		this._rewardMailTF.visible = true;
		this._rewardScrollList.visible = true;
	}
	/**
	 * 显示RankUI
	 */
	private showRankUI()
	{
		this._rankScrollList.visible = true;
		this._rankBg.visible = true;
		this._rankTopBg.visible = true;
		this._rankTF.visible = true;
		this._rankPlayNameTF.visible = true;
		this._rankKillNumTF.visible = true;
		this._rankNiceNameTF.visible = true;
		this._rankUpTF.visible = true;
		this._rankMyTF.visible = true;
		this._rankPowerTF.visible = true;
		// this._rankNoneTF.visible = true;
		this._rewardMyRankTF.visible = false;
		this._rewardAcTimeTF.visible = false;
		this._rewardMailTF.visible = false;
		this._rewardScrollList.visible = false;
	}
	/**标题 */
	protected getTitleStr():string
	{
		return "acArcherRankTitle";
	}
	protected getShowHeight():number
	{
		return 790;
	}
	/**关闭界面 */
	public dispose()
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETARCHERRANK),this.updateData,this);
		this._rankScrollList = null;
		this._rankBg = null;
		this._rankTopBg = null;
		this._rankTF = null;
		this._rankPlayNameTF = null;
		this._rankKillNumTF = null;
		this._rankNiceNameTF = null;
		this._rankUpTF = null;
		this._rankMyTF = null;
		this._rankPowerTF = null;
		// this._rankNoneTF = null;
		this._rewardMyRankTF = null;
		this._rewardAcTimeTF = null;
		this._rewardMailTF = null;
		this._rewardScrollList = null;
		this._buttomBg = null;
		this.activeId = null;
		this.code = null;
		super.dispose();
	}
}