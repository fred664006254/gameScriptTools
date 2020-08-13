/**
 * 	领取奖励界面
 * @author 张朝阳
 * date 2018/10/16
 * @class AllianceWarRewardPopupView
 */
class AllianceWarRewardPopupView extends PopupView {

	private _myRank:any = null;

	private _receiveAllianceBtn:BaseButton = null;
	private _receiveAllianceBM:BaseBitmap = null;
	private _tipTxt:BaseTextField = null;
	private _receiveMySelfBtn:BaseButton = null;
	private _receiveMySelfBM:BaseBitmap = null;

	private _notMyReceiveTxt:BaseTextField = null;
	public constructor() {
		super();
	}
	public initView(): void {

		//监听 model事件
		App.MessageHelper.addNetMessage("myalliancewar",this.refreshView,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ALLIANCEWAR_GETREWARDS,this.receiveRewardHandle,this);
		let bg = BaseBitmap.create("public_9_bg32");
		bg.width = 520;
		bg.height = 695;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, this.viewBg.y + 15);
		this.addChildToContainer(bg);

		let tinfo = Api.allianceWarVoApi.getOtherInfo();
		let topTipStr = "";
		if(tinfo.name)
		{
			topTipStr = LanguageManager.getlocal("allianceWarRewardPopupViewTopTip", [tinfo.zid, tinfo.name, tinfo.level]);
		}
		else
		{
			topTipStr = LanguageManager.getlocal("allianceWarRewardPopupViewTopTip2");
		}
		let topTip = ComponentManager.getTextField(topTipStr, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
		topTip.setPosition(bg.x + bg.width / 2 - topTip.width / 2, bg.y + 10);
		this.addChildToContainer(topTip)
		//帮会奖励相关
		let bg1 = BaseBitmap.create("public_9_bg14");
		bg1.width = 502;
		bg1.height = 246;
		bg1.setPosition(bg.x + bg.width / 2 - bg1.width / 2, topTip.y + topTip.height + 5);
		this.addChildToContainer(bg1);

		let leftFlower1 = BaseBitmap.create("acsevenhuawen");
		leftFlower1.setPosition(bg1.x + 10, bg1.y + bg1.height - leftFlower1.height - 10);
		this.addChildToContainer(leftFlower1);

		let rightFlower1 = BaseBitmap.create("acsevenhuawen");
		rightFlower1.setPosition(bg1.x + bg1.width - rightFlower1.width - 10, leftFlower1.y);
		this.addChildToContainer(rightFlower1);

		let titleBg1 = BaseBitmap.create("acsevenitemtopbg");
		titleBg1.setPosition(bg1.x + bg1.width / 2 - titleBg1.width / 2, bg1.y + 5);
		this.addChildToContainer(titleBg1);

		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardTitle1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		titleTxt1.setPosition(titleBg1.x + titleBg1.width / 2 - titleTxt1.width / 2, titleBg1.y + titleBg1.height / 2 - titleTxt1.height / 2);
		this.addChildToContainer(titleTxt1);

		let leftLine1 = BaseBitmap.create("acsevenitemzshi");
		leftLine1.anchorOffsetX = leftLine1.width / 2;
		leftLine1.anchorOffsetY = leftLine1.height / 2;
		leftLine1.setPosition(titleTxt1.x - leftLine1.width / 2 - 10, titleTxt1.y + titleTxt1.height / 2)
		this.addChildToContainer(leftLine1);

		let rightLine1 = BaseBitmap.create("acsevenitemzshi");
		rightLine1.anchorOffsetX = rightLine1.width / 2;
		rightLine1.anchorOffsetY = rightLine1.height / 2;
		rightLine1.rotation = 180;
		rightLine1.setPosition(titleTxt1.x + titleTxt1.width + rightLine1.width / 2 + 10, leftLine1.y)
		this.addChildToContainer(rightLine1);

		let allianceReward = this.getAllianceReward();
		let allianceVoList = GameData.formatRewardItem(allianceReward);
		let scaleValue = 0.8;
		let offsetHeight = 0;
		for(let i = 0; i < allianceVoList.length;i++)
		{
			let itemDB = GameData.getItemIcon(allianceVoList[i],false,true);
			itemDB.setScale(scaleValue);
			let offsetWidth = (bg1.width - allianceVoList.length * itemDB.width * scaleValue) / (allianceVoList.length + 1)
			itemDB.setPosition(bg1.x + offsetWidth + (itemDB.width * scaleValue + offsetWidth)* i,titleBg1.y + titleBg1.height + 15);
			this.addChildToContainer(itemDB);
			offsetHeight = itemDB.height * scaleValue;
		}
		
		this._receiveAllianceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"friendsBtnTxt9",this.receiveAllianceBtnClick,this);
		this._receiveAllianceBtn.setPosition(bg1.x + bg1.width / 2 - this._receiveAllianceBtn.width / 2,titleBg1.y + titleBg1.height + 15 + offsetHeight + 20);
		this.addChildToContainer(this._receiveAllianceBtn);

		this._receiveAllianceBM = BaseBitmap.create("signin_had_get");
		this._receiveAllianceBM.setPosition(this._receiveAllianceBtn.x + this._receiveAllianceBtn.width / 2 - this._receiveAllianceBM.width / 2,this._receiveAllianceBtn.y + this._receiveAllianceBtn.height / 2 - this._receiveAllianceBM.height / 2);
		this.addChildToContainer(this._receiveAllianceBM);

		this._tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(""),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BROWN);
		this._tipTxt.setPosition(this._receiveAllianceBtn.x + this._receiveAllianceBtn.width / 2 - this._tipTxt.width / 2,this._receiveAllianceBtn.y + this._receiveAllianceBtn.height + 10);
		this.addChildToContainer(this._tipTxt)

		//个人奖励相关
		let bg2 = BaseBitmap.create("public_9_bg14");
		bg2.width = 502;
		bg2.height = 222;
		bg2.setPosition(bg.x + bg.width / 2 - bg2.width / 2, bg1.y + bg1.height + 10);
		this.addChildToContainer(bg2);

		let leftFlower2 = BaseBitmap.create("acsevenhuawen");
		leftFlower2.setPosition(bg2.x + 10, bg2.y + bg2.height - leftFlower2.height - 10);
		this.addChildToContainer(leftFlower2);

		let rightFlower2 = BaseBitmap.create("acsevenhuawen");
		rightFlower2.setPosition(bg2.x + bg2.width - rightFlower2.width - 10, leftFlower2.y);
		this.addChildToContainer(rightFlower2);

		let titleBg2 = BaseBitmap.create("acsevenitemtopbg");
		titleBg2.setPosition(bg2.x + bg2.width / 2 - titleBg2.width / 2, bg2.y + 5);
		this.addChildToContainer(titleBg2);

		let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardTitle2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		titleTxt2.setPosition(titleBg2.x + titleBg2.width / 2 - titleTxt2.width / 2, titleBg2.y + titleBg2.height / 2 - titleTxt2.height / 2);
		this.addChildToContainer(titleTxt2);

		let leftLine2 = BaseBitmap.create("acsevenitemzshi");
		leftLine2.anchorOffsetX = leftLine2.width / 2;
		leftLine2.anchorOffsetY = leftLine2.height / 2;
		leftLine2.setPosition(titleTxt2.x - leftLine2.width / 2 - 10, titleTxt2.y + titleTxt2.height / 2)
		this.addChildToContainer(leftLine2);

		let rightLine2 = BaseBitmap.create("acsevenitemzshi");
		rightLine2.anchorOffsetX = rightLine2.width / 2;
		rightLine2.anchorOffsetY = rightLine2.height / 2;
		rightLine2.rotation = 180;
		rightLine2.setPosition(titleTxt2.x + titleTxt2.width + rightLine2.width / 2 + 10, leftLine2.y)
		this.addChildToContainer(rightLine2);

		let myselfReward = this.getMyselfReward();
		let myselfVoList = GameData.formatRewardItem(myselfReward);
		for(let i = 0; i < myselfVoList.length;i++)
		{
			let itemDB = GameData.getItemIcon(myselfVoList[i],false,true);
			itemDB.setScale(scaleValue);
			let offsetWidth = (bg2.width - myselfVoList.length * itemDB.width * scaleValue) / (myselfVoList.length + 1);
			itemDB.setPosition(bg2.x + offsetWidth + (itemDB.width * scaleValue + offsetWidth)* i,titleBg2.y + titleBg2.height + 15);
			this.addChildToContainer(itemDB);
		}
		this._receiveMySelfBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"friendsBtnTxt9",this.receiveMySelfBtnClick,this);
		this._receiveMySelfBtn.setPosition(bg2.x + bg2.width / 2 - this._receiveMySelfBtn.width / 2,titleBg2.y + titleBg2.height + 15 + offsetHeight + 20);
		this.addChildToContainer(this._receiveMySelfBtn);

		this._receiveMySelfBM = BaseBitmap.create("signin_had_get");
		this._receiveMySelfBM.setPosition(this._receiveMySelfBtn.x + this._receiveMySelfBtn.width / 2 - this._receiveMySelfBM.width / 2,this._receiveMySelfBtn.y + this._receiveMySelfBtn.height / 2 - this._receiveMySelfBM.height / 2);
		this.addChildToContainer(this._receiveMySelfBM);
		//未参战提示
		this._notMyReceiveTxt = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewNotRewardTip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED3);
		this._notMyReceiveTxt.setPosition(this._receiveMySelfBtn.x + this._receiveMySelfBtn.width / 2 - this._notMyReceiveTxt.width / 2,this._receiveMySelfBtn.y + this._receiveMySelfBtn.height / 2 - this._notMyReceiveTxt.height / 2);
		this.addChildToContainer(this._notMyReceiveTxt);
		//下方提示相关

		//帮派提示相关
		let tipTitleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardTitle1"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTitleTxt1.setPosition(bg2.x, bg2.y + bg2.height + 10);
		this.addChildToContainer(tipTitleTxt1);

		let tipWinTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardWinDesc1"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
		tipWinTxt1.setPosition(tipTitleTxt1.x, tipTitleTxt1.y + tipTitleTxt1.height + 5);
		this.addChildToContainer(tipWinTxt1);

		let tipLoseTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardloseDesc1"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
		tipLoseTxt1.setPosition(tipWinTxt1.x, tipWinTxt1.y + tipWinTxt1.height + 3);
		this.addChildToContainer(tipLoseTxt1);

		//个人提示相关
		let tipTitleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardTitle2"), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		tipTitleTxt2.setPosition(tipLoseTxt1.x, tipLoseTxt1.y + tipLoseTxt1.height + 10);
		this.addChildToContainer(tipTitleTxt2);

		let tipWinTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardWinDesc2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
		tipWinTxt2.setPosition(tipTitleTxt2.x, tipTitleTxt2.y + tipTitleTxt2.height + 5);
		this.addChildToContainer(tipWinTxt2);

		let tipLoseTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewRewardloseDesc2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_BROWN);
		tipLoseTxt2.setPosition(tipWinTxt2.x, tipWinTxt2.y + tipWinTxt2.height + 3);
		this.addChildToContainer(tipLoseTxt2);

	
		this.refreshView();

	}
	protected resetBgSize()
	{
		super.resetBgSize();
		let buttomTip = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarRewardPopupViewButtomTip"),TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		buttomTip.setPosition(this.viewBg.x + this.viewBg.width - buttomTip.width,this.viewBg.y + this.viewBg.height);
		this.addChild(buttomTip);
	}
	private refreshView()
	{

		if(Api.allianceWarVoApi.isReceiveAllianceReward())
		{
			this._receiveAllianceBtn.setVisible(false);
			this._receiveAllianceBM.setVisible(true);
			if (Api.allianceWarVoApi.getReceiveRewardName())
			{
				this._tipTxt.text = LanguageManager.getlocal("allianceWarRewardPopupViewRewardTip2",[Api.allianceWarVoApi.getReceiveRewardName()]);
			}
			else 
			{
				this._tipTxt.text = LanguageManager.getlocal("allianceWarRewardPopupViewRewardTip3");
			}
			
			this._tipTxt.setPosition(this._receiveAllianceBtn.x + this._receiveAllianceBtn.width / 2 - this._tipTxt.width / 2,this._receiveAllianceBtn.y + this._receiveAllianceBtn.height + 10);


		}
		else
		{
			this._receiveAllianceBtn.setVisible(true);
			this._receiveAllianceBM.setVisible(false);
			this._tipTxt.text = LanguageManager.getlocal("allianceWarRewardPopupViewRewardTip1");
			this._tipTxt.setPosition(this._receiveAllianceBtn.x + this._receiveAllianceBtn.width / 2 - this._tipTxt.width / 2,this._receiveAllianceBtn.y + this._receiveAllianceBtn.height + 10);
			if(Api.allianceVoApi.getMyAllianceVo().po == 1 ||Api.allianceVoApi.getMyAllianceVo().po == 2 )
			{
				this._receiveAllianceBtn.setEnable(true);
			}
			else
			{
				this._receiveAllianceBtn.setEnable(false);
			}

		}
		if(!Api.allianceWarVoApi.getOldInfo())
		{
			this._notMyReceiveTxt.setVisible(true);
			this._receiveMySelfBtn.setVisible(false);
			this._receiveMySelfBM.setVisible(false);
			return;
		}
		else
		{
			this._notMyReceiveTxt.setVisible(false);
		}
		if(Api.allianceWarVoApi.isReceiveMyReward())
		{
			this._receiveMySelfBtn.setVisible(false);
			this._receiveMySelfBM.setVisible(true);
		}
		else
		{
			this._receiveMySelfBtn.setVisible(true);
			this._receiveMySelfBM.setVisible(false);
		}
	}
	private receiveRewardHandle(event:egret.Event)
	{
		
		if(event && event.data && !event.data.ret)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarRewardPopupViewReciveRewardTip"));
			this.request(NetRequestConst.REQYEST_ALLIANCEWAR_GETMYALLIANCEINFO,null);
		}
		if(event.data.ret)
		{
			let data = event.data.data.data.rewards;
			let voList = GameData.formatRewardItem(data);
			App.CommonUtil.playRewardFlyAction(voList);
			
		}
	}
	/**
	 * 领取帮会
	 */
	private receiveAllianceBtnClick()
	{
		if(Api.allianceVoApi.getMyAllianceVo().po == 1 ||Api.allianceVoApi.getMyAllianceVo().po == 2 )
		{
			this.request(NetRequestConst.REQUEST_ALLIANCEWAR_GETREWARDS,{isalliance:1})
		}
		else
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceWarRewardPopupViewShowTip"));
		}
	}
	/**
	 * 领取自己的奖励
	 */
	private receiveMySelfBtnClick()
	{
		this.request(NetRequestConst.REQUEST_ALLIANCEWAR_GETREWARDS,{isalliance:0})
	}
	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQYEST_ALLIANCEWAR_GETRANK,requestData:{}};
	}
	protected receiveData(data: { ret: boolean, data: any }): void {
		if(data.ret)
		{
			this._myRank = data.data.data.myrank;
		}
	}
	/**
 	* 获得个人奖励
 	*/
	public getMyselfReward() {
		let addRankList = Config.AlliancewarCfg.getRankAdd();
		let AliiianceRank = 10000;
		let cfgKey = null;
		let reward = "";
		let tinfo = Api.allianceWarVoApi.getOtherInfo();
		for (let key in addRankList) {
			if(this._myRank >= addRankList[key].minRank && this._myRank <= addRankList[key].maxRank)
			{
				AliiianceRank = this._myRank;
				cfgKey = key;
				break;
			}
		}
		if(Api.allianceWarVoApi.isWin())
		{
			let level = 0;
			if( tinfo.level)
			{
				level = tinfo.level;
			}
			else
			{
				level = Api.allianceVoApi.getAllianceVo().level;
			}
			if(cfgKey)
			{
				reward += "21_0_" + String(Config.AlliancewarCfg.addContribution * level + addRankList[cfgKey].reward_member) + "|" +  Config.AlliancewarCfg.extraReward;
			}
			else
			{
				reward += "21_0_" + String(Config.AlliancewarCfg.addContribution * level) + "|" +  Config.AlliancewarCfg.extraReward;
			}
		}
		else
		{
			reward += "21_0_" + Config.AlliancewarCfg.addContribution;
		}
		return reward;
		// return this.myalliancewar.servant[servantId];
	}
	/**
	 * 获得帮会奖励
	 */
	public getAllianceReward():string {
		let addRankList = Config.AlliancewarCfg.getRankAdd();
		let AliiianceRank = 10000;
		let cfgKey = null;
		let reward = "";
		let tinfo = Api.allianceWarVoApi.getOtherInfo();
		for (let key in addRankList) {
			if(this._myRank >= addRankList[key].minRank && this._myRank <= addRankList[key].maxRank)
			{
				AliiianceRank = this._myRank;
				cfgKey = key;
				break;
			}
		}
		if(Api.allianceWarVoApi.isWin())
		{
			let level = 0;
			if( tinfo.level)
			{
				level = tinfo.level;
			}
			else
			{
				level = Api.allianceVoApi.getAllianceVo().level;
			}
			if(cfgKey)
			{
				reward += "22_0_" + String(Config.AlliancewarCfg.addExp * level + addRankList[cfgKey].reward_guild);
			}
			else
			{
				reward += "22_0_" + String(Config.AlliancewarCfg.addExp * level);
			}
			
		}
		else
		{
			reward += "22_0_" + Config.AlliancewarCfg.addExp;
		}
		return reward;
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"acsevenhuawen", "acsevenitemtopbg","signin_had_get"
		]);
	}
	protected getTitleStr() {

		return "allianceWarRewardPopupViewTitle";
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage("myalliancewar",this.refreshView,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ALLIANCEWAR_GETREWARDS,this.receiveRewardHandle,this);
		this._myRank = null;
		this._receiveAllianceBtn = null;
		this._receiveAllianceBM = null;
		this._tipTxt = null;
		this._receiveMySelfBtn = null;
		this._receiveMySelfBM = null;
		this._notMyReceiveTxt = null;
		super.dispose();
	}
}