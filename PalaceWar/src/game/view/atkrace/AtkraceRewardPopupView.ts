
class AtkraceRewardPopupView extends PopupView
{

	private _backCardArray:BaseButton[] = [];
	private _awardIconArray:BaseDisplayObjectContainer[] = [];
	private _clickIdx:number = 0;
	private _iconWidth:number = 108;
	private _turnTime:number = 400;
	private _callbackF:Function = null;
	private _obj:any = null;
	private _rewardsStr:string = null;

	private _clip:CustomMovieClip;

	public constructor() {
		super();
	}

	protected getTitleStr():string
	{
		return "atkrace_win_award";
	}

	protected getResourceList():string[]
	{
		
		return super.getResourceList().concat(["atkrace_card_back","atkrace_reward_anim"]);
	}

	protected getBgExtraHeight():number
	{
		return 20;
	}
	protected getCloseBtnName():string
	{
		return null;
	}

	protected initView():void
	{	
		if (this.param.data && this.param.data.f && this.param.data.o)
		{
			this._obj = this.param.data.o;
			this._callbackF = this.param.data.f;
		}

		let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 520;
		itemBg.height = 272;
		itemBg.setPosition(this.viewBg.width/2 - itemBg.width/2, 20);
		this.addChildToContainer(itemBg);

		for (let i:number =1; i<=6; i++)
		{
			let cardBtn:BaseButton = ComponentManager.getButton("atkrace_card_back",null,this.clickCard,this,[i]);
			cardBtn.setPosition( 70+ (i-1)%3 * (cardBtn.width + 46)+GameData.popupviewOffsetX+4, 35+ Math.floor((i-1)/3) * (cardBtn.height + 20) );
			this.addChildToContainer(cardBtn);

			this._backCardArray.push(cardBtn);
		}
			
		this._clip = ComponentManager.getCustomMovieClip("atkrace_reward_anim",7,80);
		this._clip.setEndCallBack(this.animEndCallback,this);
		
	}

	private clickCard(idx:number):void
	{
		for (let k in this._backCardArray)
		{
			this._backCardArray[k].setEnable(false);
		}
		this._clickIdx = idx;
		if(this.param.data.battleground){
			this.request(NetRequestConst.REQUST_ACTIVITY_BATTLEGROUND_RANDREWARD, {
				pos:idx,
				activeId:`${AcConst.AID_BATTLEGROUND}-${this.param.data.code}`
			});
		}
		else{
			this.request(NetRequestConst.REQUEST_ATKRACE_RANDREWARD, {pos:idx});
		}
		
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		let rData:any=data.data;
		if(data.ret==false || data.data.data.fightExpired == 1)
		{	
			for (let k in this._backCardArray)
			{
				this._backCardArray[k].setEnable(true);
			}
			Api.atkraceVoApi.dateErrorHandle();
			return;
		}
		
		let randcards:string[];
		randcards = data.data.data.randcards;
		// randcards = ["14_1_12","15_1_8","6_1551_1","14_1_4","15_1_4","14_1_12"];

		let randVo:RewardItemVo = GameData.formatRewardItem(randcards[this._clickIdx-1])[0];
		let rtyep:number = randVo.type;
		if (rtyep == 6) {
			rtyep = randVo.id;
		}
		this._rewardsStr = LanguageManager.getlocal("get_item",[LanguageManager.getlocal("itemName_"+rtyep),randVo.num.toString()]);

		for (let i:number =0; i<6; i++)
		{	
			let icon:BaseDisplayObjectContainer =  GameData.getRewardItemIcons(randcards[i])[0]; //Config.ItemCfg.getItemCfgById(randcards[i]).getIconContainer();
			icon.setPosition( 70+ i%3 * (icon.width + 46) + this._iconWidth/2+GameData.popupviewOffsetX+4, 35+ Math.floor(i/3) * (icon.height + 20) );
			this.addChildToContainer(icon);
			icon.scaleX = 0;
			icon.visible = false;
			let onevo = GameData.formatRewardItem(randcards[i])[0];
			if (onevo.type == 14 || onevo.type == 15)
			{
				icon.getChildByName("iconBg").visible = false;
				icon.x-=5;
			}
			this._awardIconArray.push(icon);
		}

		

		let clickCards:BaseButton = this._backCardArray[this._clickIdx-1];
		
		egret.Tween.get(clickCards).to({scaleX:0, x: clickCards.x + this._iconWidth/2}, this._turnTime).call(this.showAnim,this);
		
 	}

	 private showAnim():void
	 {
		let wardsIcon:BaseDisplayObjectContainer = this._awardIconArray[this._clickIdx-1];

		let tempBitmap:BaseBitmap = BaseBitmap.create("atkrace_reward_anim1");
		this._clip.setPosition( wardsIcon.x - tempBitmap.width/2, wardsIcon.y - tempBitmap.height/2 + this._iconWidth/2);
		this._clip.playWithTime(1);
		this.addChildToContainer(this._clip);
		BaseBitmap.release(tempBitmap);

		wardsIcon.visible = true;
		egret.Tween.get(wardsIcon).to({scaleX:1, x: wardsIcon.x - this._iconWidth/2}, this._turnTime).call(this.turnOtherCards,this);
	 }

	 private animEndCallback(o:CustomMovieClip):void
	 {
		 o.visible =false;
	 }

	private turnOtherCards():void
	{	
		let wardsIcon:BaseDisplayObjectContainer = this._awardIconArray[this._clickIdx-1];
		let posX:number=wardsIcon.x;
		let posY:number=wardsIcon.y;
		let posX2:number=wardsIcon.x + wardsIcon.width*0.05;
		let posY2:number=wardsIcon.y + wardsIcon.height*0.05;
		egret.Tween.get(wardsIcon,{loop:true}).to({scaleX:0.9, scaleY:0.9, x:posX2, y:posY2}, 400).to({scaleX:1, scaleY:1, x:posX, y:posY}, 400);

		for (let i:number =0; i<6; i++)
		{
			if (i+1 == this._clickIdx ) {
				continue;
			}
			let clickCards:BaseButton = this._backCardArray[i];
			let wardsIcon:BaseDisplayObjectContainer = this._awardIconArray[i];
			wardsIcon.visible =true;
			egret.Tween.get(clickCards).to({scaleX:0, x: clickCards.x + this._iconWidth/2}, this._turnTime);
			egret.Tween.get(wardsIcon).wait(this._turnTime).to({scaleX:1, x: wardsIcon.x - this._iconWidth/2}, this._turnTime);
		}

		TimerManager.doTimer(this._turnTime*2,1,this.showTips,this);
	}

	private showTips():void
	{	
		if (!this.viewBg)
		{
			return;
		}
		let awardBg:BaseBitmap = BaseBitmap.create("public_numbg");
		awardBg.width = 540;
		awardBg.setPosition(GameConfig.stageWidth/2 - awardBg.width/2, this.viewBg.y + this.viewBg.height + 20);
		this.addChild(awardBg);

		let awardText:BaseTextField = ComponentManager.getTextField(this._rewardsStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		awardText.setPosition(GameConfig.stageWidth/2 - awardText.width/2, awardBg.y + awardBg.height/2 - awardText.height/2);
		this.addChild(awardText);


		this.addTouchTap(this.closeHandle,this);
	}

	private closeHandle():void
	{	
		let f:Function = this._callbackF;
		let o:any = this._obj;
		this.hide();

		if (f && o ) {
			f.apply(o);
		}
	}

	public dispose():void
	{	
		for (let k in this._backCardArray)
		{
			egret.Tween.removeTweens(this._backCardArray[k]);
		}
		this._backCardArray.length = 0;
		this._clickIdx = 0;
		for (let k2 in this._awardIconArray)
		{
			egret.Tween.removeTweens(this._awardIconArray[k2]);
		}
		this._awardIconArray.length = 0;
		this._clip = null;
		this._callbackF = null;
		this._obj = null;
		this._rewardsStr =null;

		super.dispose();
	}
}