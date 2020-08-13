/**
 * npc 说话
 * author shaoliang
 * date 2017/9/28
 * @class BattleRattle
 */

class BattleRattle extends BaseDisplayObjectContainer
{
	private _rattleText:BaseTextField;
	private _myParent:any;
	private _rattleBg:BaseBitmap;

	public constructor() {
		super();
	}

	public init(p:any,width:number = 350, tailType:number = 1,height:number = 83,):void
	{
		this._myParent = p;

		this._rattleBg = BaseBitmap.create("public_9_bg42");
		this.addChild(this._rattleBg);
		this._rattleBg.width = width;
		this._rattleBg.height = height;

		let wordsCornerBg:BaseBitmap = BaseBitmap.create("public_9_bg42_tail");
		if (tailType == 1) {
			wordsCornerBg.x = 300;
			wordsCornerBg.y = 3;
			wordsCornerBg.scaleX = -1;
			wordsCornerBg.scaleY = -1;
		}
		else {
			wordsCornerBg.x = this._rattleBg.x+30;
			wordsCornerBg.y = this._rattleBg.y +this._rattleBg.height -3;
		}
		this.addChild(wordsCornerBg);
		
		this._rattleText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._rattleText.width = this._rattleBg.width - 30;
		this._rattleText.textColor = TextFieldConst.COLOR_BLACK;
		this._rattleText.lineSpacing = 6;
		this.addChild(this._rattleText);
	}

	public resetString(str?:string, time:number=3000, type:number =1):void
	{	
		if (this.parent == null && this._myParent) {
			this._myParent.addChild(this);
		}
		if (str) {
			this._rattleText.text = str;
		}
		else {
			if (type == 1) {
				this._rattleText.text = LanguageManager.getlocal("npcRattle" + App.MathUtil.getRandom(1,34));
			}
			else if (type == 2) {
				this._rattleText.text = LanguageManager.getlocal("bossRattle" + App.MathUtil.getRandom(1,12));
			}
		}
		
		this._rattleText.setPosition(15,this._rattleBg.height/2 - this._rattleText.height/2);
		
		if (time > 0) {
			egret.Tween.removeTweens(this);
			egret.Tween.get(this).wait(3000).call(this.hidden,this);
		}
		
	}

	private hidden():void 
	{	
		this.dispose();
	}

	public dispose():void
	{
		egret.Tween.removeTweens(this);
		this._rattleText = null;	
		super.dispose();
	}

}