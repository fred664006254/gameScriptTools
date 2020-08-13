class ChallengeAutoRewardsPopupView  extends PopupView
{
	private _callbackF:Function = null;
	private _obj:any = null;
	private _infoList:any[] = [];
	private _scrollContiner:BaseDisplayObjectContainer=undefined;
	private _fightBtn:BaseButton = null;
	private _containerTab:BaseDisplayObjectContainer[] = [];
	private _curShowIdx:number = 0;
	private _scrollView:ScrollView = null;
	private _oldSoldier:number = 0;
	private _oldCid:number = 0;
	private _oldKill:number = 0;

	public constructor() {
		super();
	}

	protected getTitleStr():string
	{
		return "challengeAutoFight";
	}

	// protected isShowOpenAni():boolean
	// {
	// 	return false;
	// }

	protected getRequestData():{requestType:string,requestData:any}
	{	
		this._oldSoldier = Api.playerVoApi.getSoldier();
		this._oldCid = Api.challengeVoApi.getCurChannelId();
		this._oldKill = Api.challengeVoApi.getCurKilledNum();
		return {requestType:NetRequestConst.REQUEST_CHALLENGE_AUTOATTACK,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{	

		if (!data.ret)
		{	
			return;
		}

		let tempRewards:any = data.data.data.rewardsArr;
		let allKey:string[] = Object.keys(tempRewards);
		//剩余士兵
		let curSoldier:number = this._oldSoldier;
		//奖励数组
		let awardArray:RewardItemVo[] = [];
		//第几场战斗
		let fightNum:number = 0;

		for (let i:number = 0; i<allKey.length ; i++)
		{	
			let key:string = allKey[i];
			let val:string = tempRewards[key];
			let cid:number = Number(key);

			let challengeCfg:any = ChallengeCfg.getChallengeCfgById(cid);
			let atk2:number = challengeCfg.atk;
			let soldier2:number = challengeCfg.soldier;
			if (cid == this._oldCid)
			{
				soldier2 -=this._oldKill;
			}
			let atk1:number = Api.playerVoApi.getAtk();
			let soldier1:number = curSoldier;
			let report:any = Api.conquestVoApi.getBattleResult(atk1,soldier1,atk2,soldier2);
			curSoldier = report.left1;

			let curRewards:RewardItemVo[] = [];
			if (val && val.length > 0) {
				curRewards = GameData.formatRewardItem(val);
			}
			
			for (let n:number = 0; n<curRewards.length; n++)
			{
				let curVo:RewardItemVo = curRewards[n];
				let hadVo:boolean = false;
				for (let k in awardArray)
				{
					let vo:RewardItemVo = awardArray[k];
					if (vo.id == curVo.id && vo.type == curVo.type)
					{
						hadVo = true;
						vo.num += curVo.num;
						break;
					}
				}
				if (hadVo == false)
				{
					awardArray.push(curVo);
				}
			}
			fightNum++;
			let smallId:number = (cid%41)%8;
			//结算
			if (smallId==0 || (i+1) == allKey.length)
			{
				let bcid:number = Math.floor(cid / 41) + 1;
				let mcid:number = Math.floor((cid-1) % 41 / 8 ) + 1;
				let tempArray:RewardItemVo[] = awardArray.concat();
				this._infoList.push({"bigId":bcid,"midId":mcid,"fightCont":fightNum,"curSd":curSoldier,"awardArray":tempArray});

				awardArray.length = 0;
				fightNum = 0;
			}
		}

	}

	// 关闭按钮图标名称
	protected getCloseBtnName():string
	{
		return null;
	}

	protected initView():void
	{	
		//手动调用士兵限时礼包强弹
		// Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY);
		Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap2.SOLDIER);
		
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		let grayBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		grayBg.width = 518;
		grayBg.height = 602;
		grayBg.setPosition(this.viewBg.width/2 - grayBg.width/2 , 18);
		this.addChildToContainer(grayBg);

		this._fightBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"sysConfirm",this.confirmClick,this);
		this._fightBtn.setPosition(this.viewBg.width/2 - this._fightBtn.width/2 , grayBg.y + grayBg.height + 20);
		this.addChildToContainer(this._fightBtn);
		this._fightBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._fightBtn.visible = false;

		this._scrollContiner = new BaseDisplayObjectContainer();
		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(30+GameData.popupviewOffsetX,grayBg.y + 10,this.viewBg.width, grayBg.height - 20);
		rect.width = this.viewBg.width - 2*(30+GameData.popupviewOffsetX);

		this._scrollView = ComponentManager.getScrollView(this._scrollContiner,rect);
		this.addChildToContainer(this._scrollView);
		this._scrollView.horizontalScrollPolicy="off";

		for (let i = 0 ; i < this._infoList.length; i++)
		{
			let c = this.getRewardInfoContainer(this._infoList[i]);
			this._containerTab.push(c);
		}

		let finialKey:string;
		if (Api.playerVoApi.getSoldier() == 0)
		{
			finialKey = "challengeRewardEnd2";
		}
		else 
		{
			finialKey = "challengeRewardEnd1";
		}

		let finalContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		let finalText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(finialKey),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW);
		finalText.setPosition(this.viewBg.width/2-finalText.width/2, 10);
		finalContainer.addChild(finalText); 
		finalText.height = finalText.height + 10;

		if (Api.playerVoApi.getSoldier() == 0)
		{
			finalText.setColor(TextFieldConst.COLOR_WARN_RED);
		}

		this._containerTab.push(finalContainer);

		this.showContainerAnim();
	}

	private showContainerAnim():void
	{
		if (this._containerTab.length > this._curShowIdx) 
		{
			let tempContainer:BaseDisplayObjectContainer = this._containerTab[this._curShowIdx];
			this._scrollContiner.addChild(tempContainer);
			tempContainer.y = this._curShowIdx * 192;
			this._scrollView.setScrollTop(this._scrollView.getMaxScrollTop(),300);

			this._curShowIdx++;
			tempContainer.x = -550-GameData.popupviewOffsetX;
			egret.Tween.get(tempContainer).wait(500).to({x:-30-GameData.popupviewOffsetX},300);
			egret.Tween.get(this._scrollContiner).wait(600).call(this.showContainerAnim,this);
		}
		else 
		{
			this._fightBtn.visible = true;
			this._scrollView.touchEnabled = true;
			this._scrollContiner.touchEnabled = true;

		}
	}



	private getRewardInfoContainer(info:any):BaseDisplayObjectContainer
	{
		let bgContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();

		let rewardBg:BaseBitmap = BaseBitmap.create("public_9_bg14");
		rewardBg.width = 504;
		rewardBg.height = 190;
		rewardBg.setPosition(this.viewBg.width/2 - rewardBg.width/2, 0);
		bgContainer.addChild(rewardBg);	

		//this._infoList.push({"bigId":bcid,"midId":mcid,"fightCont":fightNum,"curSd":curSoldier,"awardArray":tempArray});

		let bcid:number = 1;
		let mcid:number = Api.challengeVoApi.getCurMiddleChannelId();
		let targetStr:string = LanguageManager.getlocal("challengeTitle" + info.bigId);
		let targetText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("challengeRewardTitle",[String(info.bigId),targetStr,String(info.midId)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_YELLOW2);
		targetText.setPosition(rewardBg.x + 20, 14);
		bgContainer.addChild(targetText);

		let lineImg2 = BaseLoadBitmap.create("rank_line");
        lineImg2.width = 500;
        lineImg2.height = 2;
        lineImg2.x = this.viewBg.width/2 - lineImg2.width/2;
        lineImg2.y = targetText.y + targetText.height + 7;
        bgContainer.addChild(lineImg2);

		let fightText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("challengeRewardFight",[String(info.fightCont),String(info.curSd)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		fightText.setPosition(targetText.x , targetText.y+targetText.height+18);
		bgContainer.addChild(fightText);

		let lineImg = BaseLoadBitmap.create("rank_line");
        lineImg.width = 500;
        lineImg.height = 2;
        lineImg.x = this.viewBg.width/2 - lineImg.width/2;
        lineImg.y = fightText.y + fightText.height + 7;
        bgContainer.addChild(lineImg);

		let awardText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("challengeReward"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
		awardText.setPosition(targetText.x, rewardBg.height - 70);
		bgContainer.addChild(awardText);

	
		//奖励
		let xPos = awardText.x + awardText.width + 10;
		for (let k in info.awardArray)
		{
			let vo:RewardItemVo = info.awardArray[k];

			let icon =GameData.getItemIcon(vo,true);
			icon.setPosition(xPos,rewardBg.height-100);
			icon.setScale(0.83);
			bgContainer.addChild(icon);

			xPos += 113;
		}
		return bgContainer;
	}

	private confirmClick():void
	{
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj,[]);
		}
		this.hide();
	}

		// 计算背景高度时使用，在container高度的基础上添加该高度
	protected getBgExtraHeight():number
	{
		return 20;
	}


	public dispose():void
	{	

		this._callbackF = null;
		this._obj = null;
		this._infoList.length = 0;
		if (this._scrollContiner)
		{	
			egret.Tween.removeTweens(this._scrollContiner);
		}
		this._scrollContiner = undefined;
		this._fightBtn = null;
		this._containerTab.length = 0;
		this._curShowIdx = 0;
		this._scrollView = null;
		this._oldSoldier = 0;
		this._oldCid = 0;
		this._oldKill = 0;

		super.dispose();
	}
}