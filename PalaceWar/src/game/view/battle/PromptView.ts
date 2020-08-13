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


		return rewardPic.concat([]);
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

		if (this._type == 1 || this._type == 2 || this._type == 4 || this._type == 5) {

			let winBg:BaseBitmap = BaseBitmap.create("public_rule_bg");
			winBg.setPosition(GameConfig.stageWidth/2  - winBg.width, GameConfig.stageHeigth - 568 - winBg.height/2 );
			this.addChildToContainer(winBg);

			let winBg2:BaseBitmap = BaseBitmap.create("public_rule_bg");
			winBg2.scaleX = -1;
			winBg2.setPosition(GameConfig.stageWidth/2  + winBg2.width -1, GameConfig.stageHeigth- 568 - winBg2.height/2);
			this.addChildToContainer(winBg2);

			let awardBg:BaseBitmap = BaseBitmap.create("public_9_bg1");
			awardBg.width = 500;
			awardBg.height = 140;
			awardBg.setPosition(GameConfig.stageWidth/2  - awardBg.width/2,winBg.y + winBg.height/2  - awardBg.height/2 + 20);
			this.addChildToContainer(awardBg);

			App.DisplayUtil.changeToGray(winBg);
			App.DisplayUtil.changeToGray(winBg2);

			let winText:BaseBitmap = BaseBitmap.create("battle_fail_word");
			winText.setPosition(GameConfig.stageWidth/2  - winText.width/2, GameConfig.stageHeigth- 568 - winBg.height/2 -35);
			this.addChildToContainer(winText);

			if (this._type == 4) {
				let battleFail:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("atkraceScore"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
				battleFail.setPosition(winBg.width - battleFail.width/2 - 20, winBg.y + 145 );
				battleFail.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
				this.addChildToContainer(battleFail);

				let strr = "-1";
				if(this.param.data.winScore != null){
					strr = String(this.param.data.winScore);
				}

				let moraleAdd:BaseTextField = ComponentManager.getTextField(strr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED);
				moraleAdd.setPosition( battleFail.x + battleFail.width+10, battleFail.y);
				this.addChildToContainer(moraleAdd);
			}
			else {
				let battleFail:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("battleFail"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
				if( this._type==5)
				{
					battleFail.text =LanguageManager.getlocal("battleFail2");
				}
				battleFail.setPosition(winBg.width - battleFail.width/2, winBg.y + 145 );
				battleFail.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
				this.addChildToContainer(battleFail);
				
				
			}

			
			

			let battleFail2:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("battleFailTip"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
			battleFail2.setPosition(winBg.width - battleFail2.width/2, winBg.y + 200 );
			battleFail2.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
			this.addChildToContainer(battleFail2);

			SoundManager.playEffect(SoundConst.EFFECT_BATTLE_FAIL);

			this.container.anchorOffsetX = GameConfig.stageWidth/2;
			this.container.anchorOffsetY = GameConfig.stageHeigth/2;
			this.container.setPosition(GameConfig.stageWidth/2, GameConfig.stageHeigth/2);
			this.container.scaleX = 0.1;
			this.container.scaleY = 1;
			egret.Tween.get(this.container).to({scaleX:1,scaleY:1},120); //.to({scaleX:1.1,scaleY:1.1},100) 
		}

		if(this._type==5&&Api.switchVoApi.checkOpenShenheGame()&&PlatformCfg.shenheFunctionName=="trade")
		{}
		else if (this._type !=4) {
			let tipBB:BaseBitmap = BaseBitmap.create("public_tipbg");
			tipBB.height = 264;
			tipBB.setPosition(GameConfig.stageWidth/2 - tipBB.width/2, GameConfig.stageHeigth - tipBB.height - 30);
			this.addChild(tipBB);
			
			let promptTip:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal("promptTip"),TextFieldConst.FONTSIZE_TITLE_SMALL);
			promptTip.setPosition(GameConfig.stageWidth/2 - promptTip.width/2, tipBB.y + 22 );
			promptTip.textColor = TextFieldConst.COLOR_WARN_YELLOW;
			this.addChild(promptTip);

			

			let tipBg1:BaseBitmap = BaseBitmap.create("public_9_tipbg");
			tipBg1.height = 62;
			tipBg1.setPosition(GameConfig.stageWidth/2 - tipBg1.width/2, tipBB.y + 56);
			this.addChild(tipBg1);

			let tipBg2:BaseBitmap = BaseBitmap.create("public_9_tipbg");
			tipBg2.height = 62;
			tipBg2.setPosition(GameConfig.stageWidth/2 - tipBg2.width/2, tipBg1.y + tipBg1.height*2);
			this.addChild(tipBg2);

			for (let i:number = 1; i<=3; i++)
			{	
				let preKey = "promptTip"
				if(this._type == 5)
				{
					preKey = "tradepromptTip"
				}
				let promptContent:BaseTextField = ComponentManager.getTextField( LanguageManager.getlocal(preKey +i),TextFieldConst.FONTSIZE_CONTENT_COMMON);
				promptContent.setPosition(48, tipBg1.y + tipBg1.height*(i-0.5) - promptContent.height/2  );
				this.addChild(promptContent);

				let sureBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn" ,this.sureBtnClick,this,[i]);
				sureBtn.setPosition(463, tipBg1.y + tipBg1.height*(i-0.5) - sureBtn.height/2);
				sureBtn.setColor(TextFieldConst.COLOR_BLACK);
				this.addChild(sureBtn);
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
			ViewController.getInstance().openView(ViewConst.COMMON.MANAGEVIEW);
		}
		else if (type == 3){
			ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
		}
		
		//手动调用士兵限时礼包强弹
		// Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY);
		Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap2.SOLDIER);
		
	}

	private touchTap():void
	{
		if (this._type == 1 || this._type == 2)
		{
			return;
		}
		
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}

		//手动调用士兵限时礼包强弹
		// Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap.SOLDIER_EMPTY);
		Api.limitedGiftVoApi.manualOpenLimitedGiftWin(Api.limitedGiftVoApi.typeMap2.SOLDIER);
		
		this.hide();
	}
	
	protected getCloseBtnName():string
	{
		if(this._type==5&&Api.switchVoApi.checkOpenShenheGame()&&PlatformCfg.shenheFunctionName=="trade")
		{
			return ButtonConst.COMMON_CLOSE_1;
		}
		return "";
	}
	public dispose():void
	{
		this._type = null;
		this._callbackF = null;
		this._obj = null;

		super.dispose();
	}

}