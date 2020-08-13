class AcMergeActiveViewTab1 extends CommonViewTab
{
	// 使用按钮
	private _useBtn:BaseButton = null;
	private signBg:BaseBitmap[];
	private signBg2:BaseBitmap[];
	private signStat:BaseTextField[];
	private countDown:BaseTextField;
	public static mztime:number;
	private canGetRewordDays:number;
	private effectNode:CustomMovieClip;
	public constructor() 
	{
		super();
		this.initView();
        TickManager.addTick(this.tick,this);
	}

    private get cfg() : Config.AcCfg.MergeActiveCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
    }

    private get vo() : AcMergeActiveVo{
        return <AcMergeActiveVo>Api.acVoApi.getActivityVoByAidAndCode(AcMergeActiveView.AID, AcMergeActiveView.CODE);
    }

    private get acTivityId() : string{
        return `${AcMergeActiveView.AID}-${AcMergeActiveView.CODE}`;
    }
	
	protected initView():void
	{	
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEML,this.getRewardCallback,this);
		// 描述背景
		let descBg = BaseBitmap.create("mergeactive_descbg");
		descBg.x = 0;
		descBg.y = 0;   
		this.addChild(descBg);

		// 描述1
		let desc1 = ComponentManager.getTextField(LanguageManager.getlocal("acMergeActiveDesc1", [App.DateUtil.getFormatBySecond(AcMergeActiveViewTab1.mztime, 6)]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		desc1.textAlign = egret.HorizontalAlign.CENTER;
		desc1.lineSpacing = 5;
		desc1.x = 260 - desc1.width/2;
		desc1.y = descBg.y + 63 - desc1.height/2;
		this.addChild(desc1);
		// 描述2
		let desc2 = ComponentManager.getTextField(LanguageManager.getlocal("acMergeActiveDesc2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		desc2.width = 408;
		desc2.lineSpacing = 5;
		desc2.x = 260 - desc2.width/2;
		desc2.y = descBg.y + 187 - desc2.height/2;
		this.addChild(desc2);
		// 倒计时
		this.countDown = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WARN_GREEN2);
		this.countDown.x = 260 - this.countDown.width/2;
		this.countDown.y = descBg.y + 284 - this.countDown.height/2;
		this.addChild(this.countDown);
		
		// 签到背景
		let signBg = BaseBitmap.create("mergeactive_signbg");
		signBg.x = 0;
		signBg.y = descBg.y + descBg.height;   
		this.addChild(signBg);

		let treePart = BaseBitmap.create("mergeactive_part2");
		treePart.x = signBg.x;
		treePart.y = signBg.y + 2;   
		this.addChild(treePart);

		let centerPart = BaseBitmap.create("mergeactive_part1");
		centerPart.x = signBg.x;
		centerPart.y = signBg.y;   
		this.addChild(centerPart);

		let yEndArr = [172,232,200,262,222,192];
		let yStartArr = [67,90,104,91,82,90];
		// 一共六天
		let signCount = 6;
		let changeHeight = 68 * Math.min(1, Math.max(0, 1 - (GameConfig.stageHeigth - 960) / (1136-960)));
		// 签到底
		this.signBg = [];
		for(var i = 0; i < signCount; i++) {
			let signPart1 = BaseBitmap.create("mergeactive_sign1");
			signPart1.x = (GameConfig.stageWidth - signPart1.width*signCount) / (signCount+1) + i * (signPart1.width + (GameConfig.stageWidth - signPart1.width*signCount) / (signCount+1));
			signPart1.y = signBg.y + yEndArr[i] - 4 - changeHeight;   
			this.addChild(signPart1);
			signPart1.addTouchTap(this.clickSignBgHandler, this, [i]);
			this.signBg[i] = signPart1;
		}
		// 签到线
		for(var i = 0; i < signCount; i++) {
			let signPart2 = BaseBitmap.create("mergeactive_sign2");
			signPart2.x = this.signBg[i].x + this.signBg[i].width/2 - signPart2.width/2;
			signPart2.y = signBg.y + yStartArr[i];
			signPart2.height = yEndArr[i] - yStartArr[i] - changeHeight;
			this.addChild(signPart2);
		}
		
		// 签到天数
		for(var i = 0; i < signCount; i++) {
			let signDay = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasViewFloor" + (i+1)), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
			signDay.x = this.signBg[i].x + this.signBg[i].width/2 - signDay.width/2;
			signDay.y = this.signBg[i].y + 20 - signDay.height/2;
			this.addChild(signDay);
		}
		// 签到奖励
		for(var i = 0; i < signCount; i++) {			
			let rewardArr =  GameData.formatRewardItem(this.cfg.signTask[i].getReward);
			let itemicon = GameData.getItemIcon(rewardArr[0],false,false);
			itemicon.setScale(0.6);
            itemicon.x = this.signBg[i].x + this.signBg[i].width/2 - itemicon.width*itemicon.scaleX/2;
            itemicon.y = this.signBg[i].y + 78 - itemicon.height*itemicon.scaleY/2;
            this.addChild(itemicon);
		}
		// 签到状态
		this.signStat = [];
		for(var i = 0; i < signCount; i++) {
			let signStat = ComponentManager.getTextField(LanguageManager.getlocal("acMergeActiveSignStat3"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON - 2, TextFieldConst.COLOR_LIGHT_YELLOW);
			signStat.x = this.signBg[i].x + this.signBg[i].width/2 - signStat.width/2;
			signStat.y = this.signBg[i].y + 139 - signStat.height/2;
			this.addChild(signStat);
			this.signStat[i] = signStat
		}

		// 签到底半透
		this.signBg2 = [];
		for(var i = 0; i < signCount; i++) {
			let signPart1 = BaseBitmap.create("mergeactive_sign1");
			signPart1.x = (GameConfig.stageWidth - signPart1.width*signCount) / (signCount+1) + i * (signPart1.width + (GameConfig.stageWidth - signPart1.width*signCount) / (signCount+1));
			signPart1.y = signBg.y + yEndArr[i] - 4 - changeHeight;   
			this.addChild(signPart1);
			App.CommonUtil.setImageColor(signPart1, 0x000000);
			signPart1.alpha = 0.5;
			this.signBg2[i] = signPart1;
		}
		let bottom = BaseBitmap.create("public_daoju_bg01");
		bottom.x = GameConfig.stageWidth/2 - bottom.width/2;
		bottom.y = GameConfig.stageHeigth - 153 - bottom.height;   //bg1.height + 228 + 40;
		this.addChild(bottom);

		let flower = BaseBitmap.create("public_daoju_bg02");
		flower.x = GameConfig.stageWidth - flower.width;
		flower.y  = GameConfig.stageHeigth - 153 - bottom.height;
		this.addChild(flower);

		this._useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"acMergeActiveGetSignReword",this.clickUseBtnHandler,this);
		this._useBtn.x = GameConfig.stageWidth/2 - this._useBtn.width * this._useBtn.scaleX /2;
		this._useBtn.y = GameConfig.stageHeigth - this._useBtn.height - 160;
		this.addChild(this._useBtn);

		this.refreshView();
	}
	// 刷新界面数据
	private refreshView() {
		
		let signCount = 6;
		// 签到状态
		this.canGetRewordDays = -1;
		for(var i = 0; i < signCount; i++) {
			if (this.vo.linfo && this.vo.linfo.flags && this.vo.linfo.flags[i+1]) {
				// 已领取
				this.signStat[i].text = LanguageManager.getlocal("acMergeActiveSignStat1");
				this.signBg2[i].visible = true;
			} else if (this.vo.linfo && this.vo.linfo.days >= i+1) {
				// 可领取
				this.signStat[i].text = LanguageManager.getlocal("acMergeActiveSignStat2");
				if (this.canGetRewordDays == -1) {
					this.canGetRewordDays = i;
				}
				this.signBg2[i].visible = false;
			} else if (this.vo.linfo && this.vo.linfo.days == i) {
				// 明日可领取
				this.signStat[i].text = LanguageManager.getlocal("acMergeActiveSignStat3");
				this.signBg2[i].visible = false;
			} else {
				// 待领取
				this.signStat[i].text = LanguageManager.getlocal("acMergeActiveSignStat4");
				this.signBg2[i].visible = false;
			}
			this.signStat[i].x = this.signBg[i].x + this.signBg[i].width/2 - this.signStat[i].width/2;
		}
		if (this.canGetRewordDays != -1) {
			// 现在有能领奖的
			if (!this.effectNode) {
				this.effectNode = ComponentManager.getCustomMovieClip("mergeactive_signguang",6,200);
				this.effectNode.width = 200;
				this.effectNode.height = 300;
				this.effectNode.playWithTime();
				this.effectNode.blendMode = egret.BlendMode.ADD; 
				this.addChild(this.effectNode);
			}
			this.effectNode.x = this.signBg[this.canGetRewordDays].x + this.signBg[this.canGetRewordDays].width/2 - this.effectNode.width/2 - 3;
			this.effectNode.y = this.signBg[this.canGetRewordDays].y + this.signBg[this.canGetRewordDays].height/2 - this.effectNode.height/2 + 6;
			this.effectNode.visible = true;
		} else {
			// 现在没有能领奖
			if (this.effectNode) {
				this.effectNode.visible = false;
			}
		}
	}

	// 点击使用按钮
	private clickUseBtnHandler(param:any):void
	{
		if (this.canGetRewordDays != -1) {
			this.signRequestDo(this.canGetRewordDays+1);
		} else {
			App.CommonUtil.showTip(LanguageManager.getlocal("acMergeActiveSignTip1"));
		}
	}
	// 点击具体某一天
	private clickSignBgHandler(param:any, param2:any):void
	{
		if (this.vo.linfo && this.vo.linfo.flags && this.vo.linfo.flags[param2+1]) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acMergeActiveSignTip2"));
		} else if (this.vo.linfo && this.vo.linfo.days <= param2) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acMergeActiveSignTip3"));
		} else {
			this.signRequestDo(param2+1);
		}
	}
	private signRequestDo(thedays:number):void
	{
		if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
		this.request(NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEML, {activeId:this.acTivityId, thedays:thedays});
	}
	private getRewardCallback(event:egret.Event)
	{
		if(event)
		{
			if(event.data&&event.data.ret)
			{
				let cmd =  event.data.data.cmd;
				if(cmd == NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEML)
				{
					let data = event.data.data.data;
					let rewards = data.rewards;
					let rList = GameData.formatRewardItem(rewards);
					App.CommonUtil.playRewardFlyAction(rList);
				}
				this.refreshView();
			}
		}
        
	}

	private tick():void
	{
		let deltaT = this.vo.et - GameData.serverTime;
		if (this.countDown && deltaT > 0){
            this.countDown.text = LanguageManager.getlocal("acRank_acCD2",[App.DateUtil.getFormatBySecond(deltaT,1)]);
        }else{
            this.countDown.text = LanguageManager.getlocal("acRank_acCDEnd2");
		}
		this.countDown.x = 260 - this.countDown.width/2;
	}
	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMERGEACTIVEITEML,this.getRewardCallback,this);
		this._useBtn = null;
		this.signBg = null;
		this.signBg = null;
		this.signStat = null;
		this.countDown = null;
		this.canGetRewordDays = -1;
		this.effectNode = null;
        TickManager.removeTick(this.tick,this);		
		super.dispose();
	}
}