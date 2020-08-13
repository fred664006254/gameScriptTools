
class EmperorwarRoundResultView  extends BaseView
{

	private _callbackF:Function = null;
	private _obj:any = null;
	private _countDownLb:BaseTextField = null;
	private _countDownTime:number = -1;

	public constructor() {
		super();
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

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "emperor_battle_win2",
			"emperor_battle_lost2",
			 "emperor_battle_win",
			"emperor_battle_lost",
        ]);
	}

	protected initView():void
	{
		this.addTouchTap(this.touchTap,this,null);

		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		let result:number = this.param.data.result;

		let picStr:string;
		let picStr2:string;
		if (result == 1)
		{	
			picStr = "emperor_battle_win";
			picStr2 = "emperor_battle_win2";
		}
		else 
		{
			picStr = "emperor_battle_lost";
			picStr2 = "emperor_battle_lost2";
		}

		let battleresult2:BaseBitmap = BaseBitmap.create(picStr2);
		battleresult2.setPosition(GameConfig.stageWidth/2  - battleresult2.width/2,GameConfig.stageHeigth/2 - battleresult2.height/2);
		this.addChildToContainer(battleresult2);
		battleresult2.name = "battleresult2";

		let battleresult:BaseBitmap = BaseBitmap.create(picStr);
		battleresult.setPosition(GameConfig.stageWidth/2  - battleresult.width/2,GameConfig.stageHeigth/2 - battleresult.height/2);
		this.addChildToContainer(battleresult);
		battleresult.name = "battleresult";

		let countDownBg:BaseBitmap=BaseBitmap.create("public_searchdescbg");
		countDownBg.setPosition(GameConfig.stageWidth/2 - countDownBg.width/2 + 20, battleresult.y + battleresult.height +35);
		this.addChildToContainer(countDownBg);

		let timeDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("countDownNext2"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
		timeDesc.setPosition(countDownBg.x+ countDownBg.width/2 -timeDesc.width/2 + 10 , countDownBg.y + countDownBg.height/2 - timeDesc.height/2);
		this.addChildToContainer(timeDesc);

		this._countDownLb = ComponentManager.getTextField("0",TextFieldConst.FONTSIZE_TITLE_BIG);
		this._countDownLb.setPosition(countDownBg.x+ countDownBg.width/2 -timeDesc.width/2 - 20 , countDownBg.y + countDownBg.height/2 - this._countDownLb.height/2);
		this._countDownLb.setColor(TextFieldConst.COLOR_LIGHT_RED);
		this.addChildToContainer(this._countDownLb);
		countDownBg.visible = false;
		timeDesc.visible = false;
		this._countDownLb.visible = false;

		let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		closeText.textAlign = egret.HorizontalAlign.CENTER;
		closeText.setPosition((GameConfig.stageWidth-closeText.width)/2,GameConfig.stageHeigth - 50);
		this.addChildToContainer(closeText);

		if (result == 1)
		{
			//胜利动画
			

			let originalScale:number = 0.01;
			let oldx:number = battleresult2.x;
			let oldy:number = battleresult2.y;
			battleresult2.setScale(originalScale);
			battleresult2.setPosition(oldx-(originalScale-1)/2*battleresult2.width,oldy-(originalScale-1)/2*battleresult2.height);
			
			let originalScale2:number = 1.1;
			let oldx2:number = oldx-(originalScale2-1)/2*battleresult2.width
			let oldy2:number = oldy-(originalScale2-1)/2*battleresult2.height;
			
			let originalScale3:number = 3;
			let oldx3:number = battleresult.x;
			let oldy3:number = battleresult.y;
			battleresult.setScale(originalScale3);
			battleresult.setPosition(oldx3-(originalScale3-1)/2*battleresult.width,oldy3-(originalScale3-1)/2*battleresult.height);
			battleresult.alpha = 0;
			let that = this;
			egret.Tween.get(battleresult2).to({scaleX:originalScale2,scaleY:originalScale2,x:oldx2,y:oldy2},400).to({scaleX:1,scaleY:1,x:oldx,y:oldy},100).call(function(){
				battleresult.alpha = 1;
				egret.Tween.get(battleresult).to({scaleX:1,scaleY:1,x:oldx3,y:oldy3},400);
				
			}).wait(400).call(function(){
				countDownBg.visible = true;
				timeDesc.visible = true;
				that._countDownLb.visible = true;
				that._countDownLb.text = "3";
				that._countDownTime =3;
			});
		}
		else
		{
			//失败动画
			battleresult.alpha = 0;
			let originalScale:number = 4;
			let oldx:number = battleresult2.x;
			let oldy:number = battleresult2.y;
			battleresult2.setScale(originalScale);
			battleresult2.setPosition(oldx-(originalScale-1)/2*battleresult2.width,oldy-(originalScale-1)/2*battleresult2.height);
			
			let that = this;
			egret.Tween.get(battleresult2).to({scaleX:1,scaleY:1,x:oldx,y:oldy},600).call(function(){
				egret.Tween.get(battleresult).to({alpha:1},400);

				
			}).wait(400).call(function(){
				countDownBg.visible = true;
				timeDesc.visible = true;
				that._countDownLb.visible = true;
				that._countDownLb.text = "3";
				that._countDownTime =3;
			});
		}
	}


	private touchTap():void
	{
		this._countDownTime = -1;
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		this.hide();
		
	}

	private tick():void
	{
		if (this._countDownTime >0) {
			this._countDownTime--;
			this._countDownLb.text = String(this._countDownTime);
		}
		else if ( this._countDownTime == 0 ) {
			this.touchTap();
		}
	}

	public dispose():void
	{	
		egret.Tween.removeTweens(this.container.getChildByName("battleresult"));
		egret.Tween.removeTweens(this.container.getChildByName("battleresult2"));
		this._callbackF = null;
		this._obj = null;
		this._countDownLb = null;
		this._countDownTime = -1;
	
		super.dispose();
	}
}