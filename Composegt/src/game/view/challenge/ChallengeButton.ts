/**
 * 关卡图标
 * author shaoliang
 * date 2017/10/11
 * @class ChallengeButton
 */

class ChallengeButton extends BaseButton
{

	private _idx:number;
	private _lightBg:BaseBitmap;
	private _curChannel:number;

	private _knife1:BaseBitmap = null;
	private _knife2:BaseBitmap = null;

	public constructor() {
		super();
	}

	public initButton(callback:Function,handler:any,idx:number,curChannel:number)
	{
		this._idx = idx;
		this._curChannel = curChannel;
		let curNum:number = Api.challengeVoApi.getCurMiddleChannelId() -1;
		if (curNum <= idx) {
			this._lightBg =BaseBitmap.create("channel_light");
			this.addChild(this._lightBg);
			this.visible = false;
		}
		
		

		super.init("channel_bg","",callback,handler);

		this.touchEnabled = false;
		if (curNum == idx) {
			if (curNum == 6) {

			}
			else {

			}
			this.showClickable();
		}
	}

	public showClickable():void
	{	
		let curNum:number = Api.challengeVoApi.getCurMiddleChannelId() -1;
		let curChannel:number = Api.challengeVoApi.getCurChannelId();
		let bossType = ChallengeCfg.getChallengeCfgById(curChannel).type

		if (bossType==2) {
			this.showBoss();
		}
		else {
			this.showKnifeAnim();
		}
		
	}
	private showBoss():void
	{
		this.visible = true;
		this.touchEnabled = true;

		let curChannel:number = Api.challengeVoApi.getCurChannelId();
		let challengeConfig:any = ChallengeCfg.getChallengeCfgById(curChannel);
		let rect:egret.Rectangle=egret.Rectangle.create();
		rect.setTo(0,0,120,120);
		let head:BaseLoadBitmap =BaseLoadBitmap.create("prison_icon"+challengeConfig.showBoss,rect);
		head.setPosition(this._lightBg.width/2 - head.width/2 , this._lightBg.height/2 - head.height/2 - 2);
		this.addChild(head);

		let boss:BaseBitmap =BaseBitmap.create("battle_boss");
		boss.setPosition(this._lightBg.width/2 - boss.width/2 , this._lightBg.height - boss.height);
		this.addChild(boss);

	}

	private showKnifeAnim():void
	{	
		this.visible = true;
		this.touchEnabled = true;

		this._knife1 = BaseBitmap.create("channel_knife");
		this._knife1.x = this._lightBg.x + this._lightBg.width/2 - this._knife1.width/2 + 3;
		this.addChild(this._knife1);

		egret.Tween.get(this._knife1,{loop:true}).to({y:this._knife1.y - 7},600).wait(100).to({y:this._knife1.y},600).wait(100);

		// egret.Tween.get(beAttackHero).to({y:beAttackHero.y+offsetY},100).to({y:beAttackHero.y},120).to({alpha:0},800).call(this.showBattleRsult,this);




		// this._knife1 =BaseBitmap.create("channel_knife");
		// this._knife1.scaleX = -1;
		// this.addChild(this._knife1);

		// this._knife2 =BaseBitmap.create("channel_knife");
		// this.addChild(this._knife2);

		// this._knife1.anchorOffsetX = this._knife1.width;
		// this._knife1.anchorOffsetY = this._knife1.height;
		// this._knife2.anchorOffsetX = this._knife1.width;
		// this._knife2.anchorOffsetY = this._knife1.height;
		// this._knife1.setPosition(20 , this._lightBg.height - 20);
		// this._knife2.setPosition(this._lightBg.width - 20 , this._lightBg.height - 20);
		// this._knife1.rotation = -20;
		// this._knife2.rotation = 20;
		// egret.Tween.get(this._knife1,{loop:true}).to({rotation:40},200).wait(100).to({rotation:-40},300).wait(200);
		// egret.Tween.get(this._knife2,{loop:true}).to({rotation:-40},200).wait(100).to({rotation:40},300).wait(200);
	}

	public hiddenKnifeAnim():void
	{
		this._lightBg.visible = false;
		this.touchEnabled = false;
		egret.Tween.removeTweens(this);
		if (this._knife1) {
			this.removeChild(this._knife1);
			this._knife1 = null;
		}
		if (this._knife2) {
			this.removeChild(this._knife2);
			this._knife2 = null;
		}
	}

	public dispose():void
	{	
		egret.Tween.removeTweens(this);
		this._idx = null;
		this._lightBg = null;
		this._knife1 = null;
		this._knife2 = null;

		super.dispose();
	}
}