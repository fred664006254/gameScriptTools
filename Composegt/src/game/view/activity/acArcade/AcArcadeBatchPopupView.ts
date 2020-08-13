/**
  * 电玩十连 
  yanyuling
  * @class AcArcadeBatchPopupView
  */
  
class AcArcadeBatchPopupView  extends PopupView
{
	private _callbackF:Function = null;
	private _obj:any = null;
	private _infoList:any[] = [];
	private _scrollContiner:BaseDisplayObjectContainer=undefined;
	private _fightBtn:BaseButton = null;
	private _containerTab:BaseDisplayObjectContainer[] = [];
	private _curShowIdx:number = 0;
	private _scrollView:ScrollView = null;

	public constructor() {
		super();
	}

	protected getCnCode(): string {
		let code = this.param.data.code;
        if (code == "2" || code == "3") {
            code = "1";
        }
        return code;
    }

	protected initView():void
	{	
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
			this._infoList = this.param.data.batchList;
		}
		//手动调用士兵限时礼包强弹
		
		let grayBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		grayBg.width = 540;
		grayBg.height = 620;
		grayBg.setPosition(this.viewBg.width/2 - grayBg.width/2 , 10);
		this.addChildToContainer(grayBg);

		this._fightBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"sysConfirm",this.confirmClick,this);
		this._fightBtn.setPosition(this.viewBg.width/2 - this._fightBtn.width/2 , grayBg.y + grayBg.height + 20);
		this.addChildToContainer(this._fightBtn);
		this._fightBtn.visible = false;

		this._scrollContiner = new BaseDisplayObjectContainer();
		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,grayBg.width-20, grayBg.height - 20);

		this._scrollView = ComponentManager.getScrollView(this._scrollContiner,rect);
		this._scrollView.x = grayBg.x+10;
		this._scrollView.y =grayBg.y+10;
		this.addChildToContainer(this._scrollView);
		this._scrollView.horizontalScrollPolicy="off";

		for (let i = 0 ; i < this._infoList.length; i++)
		{
			let c = this.getRewardInfoContainer(this._infoList[i],i+1);
			this._containerTab.push(c);
		}
		this.showContainerAnim();
	}

	private showContainerAnim():void
	{
		if (this._containerTab.length > this._curShowIdx) 
		{
			let tempContainer:BaseDisplayObjectContainer = this._containerTab[this._curShowIdx];
			this._scrollContiner.addChild(tempContainer);
			tempContainer.y = this._curShowIdx * 192;//192
			this._scrollView.setScrollTop(this._scrollView.getMaxScrollTop(),300);

			this._curShowIdx++;
			tempContainer.x = -600 - 25;//-550;
			egret.Tween.get(tempContainer).wait(500).to({x:0},300);
			egret.Tween.get(this._scrollContiner).wait(600).call(this.showContainerAnim,this);
		}
		else 
		{
			this._fightBtn.visible = true;
			this._scrollView.touchEnabled = true;
			this._scrollContiner.touchEnabled = true;
		}
	}

	private getRewardInfoContainer(info:any,idx:number):BaseDisplayObjectContainer
	{
		let bgContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		bgContainer.width = 520;
		bgContainer.height = 190;

		let lotteryTime = this.param.data.lotteytime;
		let toprewards = GameData.formatRewardItem(info[0])[0];
		let lotteryRewards = info[1];
		let lotteryRewards1 = lotteryRewards[0];
		let lotteryRewards2 = lotteryRewards[1];
		let lotteryRewards3 = lotteryRewards[2];
		let score: number = 0;
        let cfg = <Config.AcCfg.ArcadeCfg> this.acVo.config;
		if (lotteryRewards1 == lotteryRewards2 && lotteryRewards1 == lotteryRewards3 && lotteryRewards2 == lotteryRewards3) {
			score = cfg.getScoreForType("0");
		}
		else if (lotteryRewards1 == lotteryRewards2 || lotteryRewards1 == lotteryRewards3 || lotteryRewards2 == lotteryRewards3) {
			score = cfg.getScoreForType("1");
		}
		else if (lotteryRewards1 != lotteryRewards2 && lotteryRewards1 != lotteryRewards3 && lotteryRewards2 != lotteryRewards3) {
			score = cfg.getScoreForType("2");
		}

		
		let rewardBg:BaseBitmap = BaseBitmap.create("activity_db_01");
		rewardBg.width = 520;
		rewardBg.height = 185;
		rewardBg.setPosition(0, 0);
		bgContainer.addChild(rewardBg);	

        let titleBg = BaseBitmap.create("public_up3"); //arcadegame_topbg_2
		titleBg.width = 510;
		titleBg.height = 33;
		titleBg.setPosition(rewardBg.x + rewardBg.width / 2 - titleBg.width / 2, rewardBg.y + 6);
		bgContainer.addChild(titleBg);

        let charge_redBg = BaseBitmap.create("activity_charge_red");
		charge_redBg.width = 384;
        charge_redBg.y = titleBg.y-3;
        charge_redBg.x = rewardBg.x;
        bgContainer.addChild(charge_redBg);
        
		let targetStr:string = LanguageManager.getlocal("acArcadeGameLogViewLotteryTitle-" + this.getCnCode(), [""+idx]);
		let targetText:BaseTextField = ComponentManager.getTextField(targetStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		targetText.setPosition(charge_redBg.x + 20, charge_redBg.y + charge_redBg.height/2 - targetText.height/2+1);
		bgContainer.addChild(targetText);
		charge_redBg.width = targetText.width + 50;
        //时间戳
        let time = App.DateUtil.getFormatBySecond(lotteryTime, 2);
        let timeTF = ComponentManager.getTextField(time, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
		timeTF.setPosition(rewardBg.x + rewardBg.width - timeTF.width - 25, titleBg.y + titleBg.height/2 - timeTF.height/2);
		bgContainer.addChild(timeTF);

		//奖励
        let bg2 = BaseBitmap.create("acarcadeview_logdown-1"); //
        bg2.setPosition(titleBg.x+ 15 , titleBg.y + titleBg.height + 8);
        let rewardScale = 0.6
        bg2.setScale(rewardScale);
        bgContainer.addChild(bg2);
        
        let rewards:RewardItemVo [] = GameData.formatRewardItem(lotteryRewards.join("|"));
        let scale = 0.55;
        for (let i = 0; i < rewards.length; i++) {
            let rewardVo: RewardItemVo = rewards[i];
            let rewardDB = GameData.getItemIcon(rewardVo, true, true);
            rewardDB.setScale(scale);
            rewardDB.setPosition(bg2.x + (rewardDB.width * scale + 24) * i + 17, bg2.y + bg2.height / 2*bg2.scaleX - rewardDB.height * scale / 2);
            bgContainer.addChild(rewardDB);
        }

        //获得文字
        let awardText:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		awardText.text = LanguageManager.getlocal("acArcadeGameLogViewRewardsDesc-" + this.getCnCode(), [toprewards.name, String(toprewards.num), String(score)]);
        awardText.multiline = true;
        awardText.lineSpacing = 4;
        awardText.width = 260;
        awardText.setPosition(bg2.x + bg2.width * rewardScale + 20, bg2.y + bg2.height* rewardScale/2 - awardText.height/2);
		bgContainer.addChild(awardText);

		return bgContainer;
	}

	private confirmClick():void
	{
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj,[]);
		}
		this.hide();
	}
	protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "activity_db_01","activity_charge_red","acarcadeview_logdown-1",
          
        ]);
    }
	protected get acVo():AcArcadeVo
	{
		return <AcArcadeVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid,this.param.data.code);
	}

	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		return null;
	}

	// 计算背景高度时使用，在container高度的基础上添加该高度
	protected getBgExtraHeight():number
	{
		return 20;
	}
	protected getTitleStr():string
	{
		return "acArcadeBatchPopupViewTitle";
	}

	public dispose():void
	{	
		this._callbackF = null;
		this._obj = null;
		this._infoList.length = 0;
		egret.Tween.removeTweens(this._scrollContiner);
		this._scrollContiner = undefined;
		this._fightBtn = null;
		this._containerTab.length = 0;
		this._curShowIdx = 0;
		this._scrollView = null;

		super.dispose();
	}
}