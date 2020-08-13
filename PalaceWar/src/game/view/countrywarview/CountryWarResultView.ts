class CountryWarResultView  extends BaseView
{

	private _callbackF:Function = null;
	private _obj:any = null;
	private _infoContainer:BaseDisplayObjectContainer = null;

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

	private get api(){
        return Api.countryWarVoApi;
    }

	protected getResourceList():string[]
	{
		let rewardPic:string[] = super.getResourceList();
		if (this.param.data.result==1) {
			rewardPic=rewardPic.concat(["emperor_win_light","emperor_battle_win_bg","emperor_battle_win_1","emperor_battle_win_2"]);;
		}
		else
		{
			rewardPic=rewardPic.concat(["emperor_battle_lost","emperor_battle_lost_bg","emperor_battle_lost_bg2"]);;
		}

		return rewardPic;
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
		let battleBg2:BaseBitmap;
		let picStr:string;
		let bgStr:string;
		if (result == 1)
		{
			picStr = "emperor_battle_win_1";
			bgStr = "emperor_battle_win_bg";
			battleBg2 = BaseBitmap.create("emperor_win_light");
			battleBg2.anchorOffsetX = battleBg2.width/2;
			battleBg2.anchorOffsetY = battleBg2.height/2;
			battleBg2.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2);
			this.addChildToContainer(battleBg2);
		}
		else 
		{
			picStr = "emperor_battle_lost";
			bgStr = "emperor_battle_lost_bg";
		}

		let battleBg:BaseBitmap = BaseBitmap.create(bgStr);
		battleBg.setPosition(GameConfig.stageWidth/2  - battleBg.width/2,GameConfig.stageHeigth/2 - battleBg.height/2);
		this.addChildToContainer(battleBg);
		battleBg.name = "battleBg";
		
		let battleresult:BaseBitmap = BaseBitmap.create(picStr);
		battleresult.setPosition(GameConfig.stageWidth/2  - battleresult.width/2,GameConfig.stageHeigth/2 - battleresult.height/2);
		this.addChildToContainer(battleresult);

		this._infoContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._infoContainer);

		let countDownBg:BaseBitmap=BaseBitmap.create("public_searchdescbg");
		this._infoContainer.addChild(countDownBg);

		// if (this.param.data.result==1) {
		// 	countDownBg.y += 40;
		// }
		let winNum = this.api.getWinNum();
		let point = Config.CountrywarCfg.point[winNum + 1].credit;

		let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(`CountryWarBattle${result == 1 ? 'Win' : 'Lose'}`, [Api.mergeServerVoApi.getAfterMergeSeverName(null,true, Api.mergeServerVoApi.getTrueZid()),`${winNum}:${5 - winNum}`, `${point >= 0 ? '+' : ''}${point}`]), 22);
		descTxt.lineSpacing = 10;
		descTxt.textAlign = egret.HorizontalAlign.CENTER;

		countDownBg.height = descTxt.textHeight + 40;
		countDownBg.width = descTxt.textWidth + 40;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, countDownBg, battleBg, [0, battleBg.height + 40]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, countDownBg);
		this._infoContainer.addChild(descTxt);

		let cloeBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, 'confirmBtn', this.hide, this);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cloeBtn, countDownBg, [0,countDownBg.height+25]);
		this._infoContainer.addChild(cloeBtn);

		this._infoContainer.visible = false;
		this.container.y = -100;
		if (result == 1)
		{
			//胜利动画
			
			battleBg2.name = "battleBg2";

			battleBg.visible = false;
			battleBg2.setScale(0.01);


			battleBg.visible = false;
			battleresult.visible = false;
			battleresult.y = GameConfig.stageHeigth/2 - battleresult.height;

			let battleresult2:BaseBitmap = BaseBitmap.create("emperor_battle_win_2");
			battleresult2.setPosition(GameConfig.stageWidth/2  - battleresult2.width/2,GameConfig.stageHeigth/2);
			this.addChildToContainer(battleresult2);
			battleresult.visible = false;
			battleresult2.visible = false;

			let originalScale2:number = 4;
			let oldx2:number = battleresult.x;
			let oldy2:number = battleresult.y;
			battleresult.setScale(originalScale2);
			battleresult.setPosition(oldx2-(originalScale2-1)/2*battleresult.width,oldy2-(originalScale2-1)/2*battleresult.height);

			let originalScale3:number = 4;
			let oldx3:number = battleresult2.x;
			let oldy3:number = battleresult2.y;
			battleresult2.setScale(originalScale3);
			battleresult2.setPosition(oldx3-(originalScale3-1)/2*battleresult2.width,oldy3-(originalScale3-1)/2*battleresult2.height);

			let originalScale:number = 4;
			let oldx:number = battleBg.x;
			let oldy:number = battleBg.y;
			battleBg.setScale(originalScale);
			battleBg.setPosition(oldx-(originalScale-1)/2*battleBg.width,oldy-(originalScale-1)/2*battleBg.height);
			
			let that = this;
			egret.Tween.get(battleBg2).to({scaleX:1,scaleY:1},500).call(function(){
				
				egret.Tween.get(battleBg2,{loop:true}).to({rotation:360},3000);
				battleBg.visible =true;
				egret.Tween.get(battleBg).to({scaleX:1,scaleY:1,x:oldx,y:oldy},400)

			}).wait(500).call(function(){
				battleresult.visible = true;
				egret.Tween.get(battleresult).to({scaleX:1,scaleY:1,x:oldx2,y:oldy2},400);
			}).wait(200).call(function(){
				battleresult2.visible = true;
				egret.Tween.get(battleresult2).to({scaleX:1,scaleY:1,x:oldx3,y:oldy3},400);
			}).wait(300).call(function(){
				that._infoContainer.visible = true;
			});

		}
		else
		{	
			battleBg2 = BaseBitmap.create("emperor_battle_lost_bg2");
			battleBg2.setPosition(GameConfig.stageWidth/2  - battleBg2.width/2,GameConfig.stageHeigth/2 - battleBg2.height/2);
			this.addChildToContainer(battleBg2);
			battleBg2.name = "battleBg2";

			battleBg.visible = false;
			//失败动画
			battleresult.alpha = 0;
			let originalScale:number = 4;
			let oldx:number = battleBg2.x;
			let oldy:number = battleBg2.y;
			battleBg2.setScale(originalScale);
			battleBg2.setPosition(oldx-(originalScale-1)/2*battleBg2.width,oldy-(originalScale-1)/2*battleBg2.height);
			
			let that = this;
			egret.Tween.get(battleBg2).to({scaleX:1,scaleY:1,x:oldx,y:oldy},400).call(function(){

				battleBg2.visible = false;
				battleBg.visible = true;

				
			}).wait(100).call(function(){
				egret.Tween.get(battleresult).to({alpha:1},300);
				
			}).wait(300).call(function(){
				that._infoContainer.visible = true;
				
			});
		}
	}


	private touchTap():void
	{
		if (this._obj && this._callbackF) {
			this._callbackF.apply(this._obj);
		}
		this.hide();
		
	}

	public dispose():void
	{	
		egret.Tween.removeTweens(this.container.getChildByName("battleBg"));
		if (this.container.getChildByName("battleBg2"))
		{
			egret.Tween.removeTweens(this.container.getChildByName("battleBg2"));
		}
		this._callbackF = null;
		this._obj = null;
		this._infoContainer = null;
	
		super.dispose();
	}
}