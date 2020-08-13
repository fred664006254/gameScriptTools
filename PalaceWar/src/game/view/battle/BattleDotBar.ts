/**
 * author shaoliang
 * date 2017/9/28
 * @class BattleDotBar
 */



class BattleDotBar extends BaseDisplayObjectContainer
{

	private _allDots:BaseBitmap[] = [];
	private _totalNum:number;
	private _curNum:number;

	public constructor() {
		super();
	}

	public init(m:number):void
	{
		this._totalNum = 8;

		let bg:BaseBitmap = BaseBitmap.create("public_bg6");
		this.addChild(bg);

		let barWidth:number = 460;
		let perX:number = 120;

		let sectionName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("challengeSectionName"+Api.challengeVoApi.getCurMiddleChannelId()),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		sectionName.setPosition(30,bg.height/2 - sectionName.height /2);
		sectionName.textColor = TextFieldConst.COLOR_BLACK;
		this.addChild(sectionName);

		for (let i:number=0; i<this._totalNum ; i++)
		{
			let dot1:BaseBitmap = BaseBitmap.create("battle_dot_none");
			dot1.setPosition(perX +  (barWidth / this._totalNum) * (0.5+ i) - dot1.width /2, bg.height/2 - dot1.height /2 );
			this.addChild(dot1);

			let dot2:BaseBitmap = BaseBitmap.create("battle_dot_full");
			dot2.setPosition(perX +  ( barWidth / this._totalNum) * (0.5+ i) - dot2.width /2, bg.height/2 - dot2.height /2 );
			this.addChild(dot2);

			// 关卡版本2
			// if (i == this._totalNum - 1) {
			// 	let dot3:BaseBitmap = BaseBitmap.create("battle_dot_boss");
			// 	dot3.setPosition( perX +  (barWidth / this._totalNum) * (0.5+ i) - dot3.width /2, bg.height/2 - dot3.height /2 );
			// 	this.addChild(dot3);
			// }

			this._allDots.push(dot2);
		}
	}

	public set curNum(n:number)
	{
		this._curNum = n;
		for (let i:number=0; i<this._totalNum ; i++)
		{
			if (n > i) {
				if (this._allDots[i].visible == false) {
					this._allDots[i].visible = true;
				}
			}
			else {
				if (this._allDots[i].visible == true) {
					this._allDots[i].visible = false;
				}
			}
		}
	}
	public setNumEff(n:number):void
	{
		this._curNum = n;

		let eff = ComponentManager.getCustomMovieClip("fastbattleprogress_", 10, 50);
		eff.anchorOffsetX = 80;
		eff.anchorOffsetY = 80;
		eff.x = this._allDots[n-1].x + this._allDots[n-1].width/2;
		eff.y = this._allDots[n-1].y + this._allDots[n-1].height/2;
		this.addChild(eff);
		eff.playWithTime(1);
		eff.setScale(3);
		eff.alpha = 0;
		egret.Tween.get(eff).to({scaleX:2,scaleY:2,alpha:1},100).to({scaleX:1,scaleY:1},100).call(()=>
		{
			egret.Tween.removeTweens(eff);
		},this);		
		eff.setEndCallBack(()=>
		{
			eff.dispose();
			eff = null;

			for (let i:number=0; i<this._totalNum ; i++)
			{
				if (n > i) {
					if (this._allDots[i].visible == false) {
						this._allDots[i].visible = true;
					}
				}
				else {
					if (this._allDots[i].visible == true) {
						this._allDots[i].visible = false;
					}
				}
			}			
		},this);
	}

	public get curNum():number
	{
		return this._curNum;
	}

	public dispose():void
	{	
		this._totalNum = null;
		this._curNum = null;
		this._allDots.length = 0;

		super.dispose();		
	}

}