/**
 * 温馨提示，也用于战斗失败
 * author shaoliang
 * date 2017/9/29
 * @class PromptView
 */

class PromptView extends BaseView
{

	// 1，战斗失败， 2，没兵了   3，没钱啦 4,擂台失败 5.贸易失败
	private _type:number = null;
	private _callbackF:Function = null;
	private _obj:any = null;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();
		if (this.param.data ) {
			this._type = this.param.data.type;
			if (this._type == 1 || this._type == 2 || this._type == 4) {
				rewardPic.push("battle_fail_word");
				
			}

		}


		return rewardPic.concat([
			"promotion_scroll",
			"promotion_scroll_1",
			"dailyboss_shengli_bg",

			"atkrace_xian_1",
			"arena_bottom_bg",
			"battle_fail_word",
			]);
	}


	protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "public_9_bg8";
	}

	protected initView():void
	{
	}

	protected init():void
	{
		super.init();
		this.addTouchTap(this.touchTap,this,null);

		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}
		if (this._type == 1 &&Api.otherInfoVoApi.getFirstchallengefail()!=1&&!Api.rookieVoApi.curGuideKey)
		{
			Api.rookieVoApi._waitingGuide.length=0;
			Api.rookieVoApi.curGuideKey = "firstchallengefail";
			Api.rookieVoApi.insertWaitingGuide({"idx":"firstchallengefail_1"});
			// Api.rookieVoApi.isGuiding = true;
			Api.rookieVoApi.checkWaitingGuide();
			// Api.rookieVoApi.showRookieView();
			this.request(NetRequestConst.REQUEST_OTHERINFO_SETFIRSTCHALLENGEFAIL,{});
		}	
		

		if (this._type == 1 || this._type == 2 || this._type == 4 || this._type == 5) {
			/*
			let winBg:BaseBitmap = BaseBitmap.create("public_rule_bg");
			winBg.setPosition(GameConfig.stageWidth/2  - winBg.width, GameConfig.stageHeigth - 568 - winBg.height/2 );
			this.addChildToContainer(winBg);

			let winBg2:BaseBitmap = BaseBitmap.create("public_rule_bg");
			winBg2.scaleX = -1;
			winBg2.setPosition(GameConfig.stageWidth/2  + winBg2.width -1, GameConfig.stageHeigth- 568 - winBg2.height/2);
			this.addChildToContainer(winBg2);
			*/

			let scrollContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
			
			let scrollLeft = BaseBitmap.create("promotion_scroll");
			scrollLeft.scaleX = -1;
			scrollLeft.x = scrollLeft.width;
			scrollLeft.y = 0;

			let scrollRight = BaseBitmap.create("promotion_scroll");
			scrollRight.x = GameConfig.stageWidth-scrollRight.width;
			scrollRight.y = 0;

			let scrollBg = BaseBitmap.create("promotion_scroll_1");
			scrollBg.x = GameConfig.stageWidth / 2 - scrollBg.width/2;
			scrollBg.y = scrollLeft.height/2 - scrollBg.height/2;

			scrollContainer.width = GameConfig.stageWidth;
			scrollContainer.height = scrollRight.height;
			scrollContainer.x = 0;
			scrollContainer.y = GameConfig.stageHeigth/2 - scrollContainer.height/2 - 50;

			this.addChildToContainer(scrollContainer);
			scrollContainer.addChild(scrollBg);
			scrollContainer.addChild(scrollLeft);
			scrollContainer.addChild(scrollRight);
			let winBg = scrollContainer;

			let awardBg:BaseBitmap = BaseBitmap.create("dailyboss_shengli_bg");
			awardBg.width = 500;
			awardBg.height = 150;
			awardBg.setPosition(GameConfig.stageWidth/2  - awardBg.width/2,GameConfig.stageHeigth/2 - awardBg.height/2 + 2-80);//winBg.y + winBg.height/2  - awardBg.height/2 + 20);
			this.addChildToContainer(awardBg);

			App.DisplayUtil.changeToGray(scrollLeft);
			App.DisplayUtil.changeToGray(scrollRight);
			App.DisplayUtil.changeToGray(scrollBg);

			let winText:BaseBitmap = BaseBitmap.create("battle_fail_word");
			winText.setPosition(GameConfig.stageWidth/2  - winText.width/2,scrollContainer.y - winText.height/2 + 25 - 20);
			this.addChildToContainer(winText);

			if (this._type == 4) {
				let battleFail:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("atkraceScore"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
				battleFail.setPosition(winBg.width/2 - battleFail.width/2 - 20, winBg.y + 115 );
				battleFail.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
				this.addChildToContainer(battleFail);

				let scroe = "-1";
				if(Api.switchVoApi.checkOpenAtkraceScoreFix())
				{
					scroe = "-0";
				}
				let moraleAdd:BaseTextField = ComponentManager.getTextField(scroe,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED);
				moraleAdd.setPosition( battleFail.x + battleFail.width+10, battleFail.y);
				this.addChildToContainer(moraleAdd);
			}
			else {
				let battleFail:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("battleFail"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
				if( this._type==5)
				{
					battleFail.text =LanguageManager.getlocal("battleFail2");
				}
				battleFail.setPosition(winBg.width/2 - battleFail.width/2, winBg.y + 115 );
				battleFail.textColor = TextFieldConst.COLOR_WHITE;
				this.addChildToContainer(battleFail);
				
				
			}

			
			

			let battleFail2:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("battleFailTip"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			battleFail2.setPosition(winBg.width/2 - battleFail2.width/2, winBg.y + 170 );
			battleFail2.textColor = TextFieldConst.COLOR_WHITE;
			this.addChildToContainer(battleFail2);

			SoundManager.playEffect(SoundConst.EFFECT_BATTLE_FAIL);

			this.container.anchorOffsetX = GameConfig.stageWidth/2;
			this.container.anchorOffsetY = GameConfig.stageHeigth/2;
			this.container.setPosition(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);
			this.container.scaleX = 0.1;
			this.container.scaleY = 1;
			egret.Tween.get(this.container).to({scaleX:1,scaleY:1},120); //.to({scaleX:1.1,scaleY:1.1},100) 
		}

		if (this._type !=4) {
			let tipBB:BaseBitmap = BaseBitmap.create("arena_bottom_bg");//public_tipbg  public_9_wordbg.png 
			// tipBB.height = 264;
			tipBB.setPosition(GameConfig.stageWidth/2 - tipBB.width/2, GameConfig.stageHeigth - tipBB.height + 7);
			this.addChild(tipBB);
			
			let promptTip:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("promptTip"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			promptTip.setPosition(GameConfig.stageWidth/2 - promptTip.width/2, tipBB.y + 22 );
			promptTip.textColor = TextFieldConst.COLOR_WARN_YELLOW2;
			this.addChild(promptTip);

			

			let line = BaseBitmap.create("atkrace_xian_1");
			line.x = GameConfig.stageWidth/2 - line.width/2;
			line.y = tipBB.y + 62;
			this.addChild(line);

			let indext = 2
			if(MainUI.getInstance().getUnlockIndex()>=10)
			{
				indext = 3;
			}
			for (let i:number = 1; i<=indext; i++)
			{	
				let preKey = "promptTip"
				if(this._type == 5)
				{
					preKey = "tradepromptTip"
				}
				let promptContent:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal(preKey +i),TextFieldConst.FONTSIZE_CONTENT_COMMON);
				promptContent.setPosition(48, tipBB.y + 100 + 70 * (i-1) - promptContent.height/2  );
				this.addChild(promptContent);

				let sureBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn" ,this.sureBtnClick,this,[i]);
				sureBtn.setPosition(463, tipBB.y  + 100 + 70 * (i-1) - sureBtn.height/2);
				// sureBtn.setColor(TextFieldConst.COLOR_BLACK);
				this.addChild(sureBtn);

				let line = BaseBitmap.create("atkrace_xian_1");
				line.x = GameConfig.stageWidth/2 - line.width/2;
				line.y = tipBB.y + 62 + i * 70;
				this.addChild(line);
			}
		}



		
	}

	private sureBtnClick(idx:number):void
	{
		let type:number =idx;

		ViewController.getInstance().hideAllView();


		if (type == 2) {
			ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
		}
		else if (type == 1){
			// ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);
		}
		else if (type == 3){
			ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
		}
		//手动调用士兵限时礼包强弹
		Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY);
		Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY2);
	}

	private touchTap():void
	{
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		//手动调用士兵限时礼包强弹
		Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY);
		Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY2);

		this.hide();
	}

	public dispose():void
	{
		this._type = null;
		this._callbackF = null;
		this._obj = null;

		super.dispose();
	}

}