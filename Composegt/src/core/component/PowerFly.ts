/**
 * 战斗力飘动动画
 * author dky
 * date 2017/12/14
 * @class PowerFly
 */
class PowerFly extends BaseDisplayObjectContainer
{
	private _tw:egret.Tween;
	private _temScale:number = 0.6;
	public constructor() 
	{
		super();
	}

	public init(power:number):void
	{	
		SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
		let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		this.addChild(container);
		let temX:number = 0;
		let temY:number = 0;
		let iconBt:BaseBitmap=null;

		let bgPic = "public_9_powertipbg";

		let numBg = BaseBitmap.create(bgPic);
		// numBg.width = 300;
		// numBg.setScale(this._temScale);
		container.addChild(numBg);
		
		let message = LanguageManager.getlocal("powerAdd") + power;

		let msgTF:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(message,"crit_fnt");


		container.addChild(msgTF);
		numBg.width = msgTF.width + 90;
		msgTF.x = 45;
		msgTF.y = numBg.height/2 - msgTF.height/2

		// container.x = -container.width/2;
		container.anchorOffsetX = container.width/2;
		container.anchorOffsetY = container.height/2;
		this.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2);
		container.setScale(0.1);
		this._tw = egret.Tween.get(container);
		
		this._tw.to({scaleX:1.2,scaleY:1.2},100)
		.to({scaleX:1,scaleY:1},50)
		.to({y:-80,alpha:0.5},1500)
		.call(this.onComplete,this);

		
	}

	private onComplete():void
	{
		if(this._tw)
		{
			egret.Tween.removeTweens(this._tw);
			this._tw = null;
		}
		this.dispose();
	}

	public dispose():void
	{
		if(this._tw)
		{
			egret.Tween.removeTweens(this._tw);
			this._tw = null;
		}
		this._temScale = 0.6;
		super.dispose();
	}
}