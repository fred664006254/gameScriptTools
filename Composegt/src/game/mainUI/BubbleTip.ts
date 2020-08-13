/**
 * author zsl
 * date 2018/8/1
 * @class BubbleTip
 */

class BubbleTip extends BaseDisplayObjectContainer
{

    private _name:string = null;
    private _length:number = 0;
    private _bubbleText:BaseTextField = null;
    private _messageStr:string = null;
    private _codonLength:number = 0;

    public constructor() {
		super();
	}

    public init(name:string,length:number):void
	{
        this._name = name;
        this._length = length;

       	let meeesageBg:BaseBitmap = BaseBitmap.create("mainui_bubble");
		this.addChild(meeesageBg);


        if (RES.hasRes("mainui_bubble_"+name))
        {
            let bubbleIcon:BaseLoadBitmap = BaseLoadBitmap.create("mainui_bubble_"+name);
		    this.addChild(bubbleIcon);
            meeesageBg.x = 30;
            meeesageBg.y = 10;
        }
         this._messageStr = LanguageManager.getlocal("bubble_tip_"+name+App.MathUtil.getRandom(1,length));

        this._bubbleText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BLACK);
        this._bubbleText.setPosition(14+meeesageBg.x, 10+ meeesageBg.y);
        this.addChild(this._bubbleText);

        this.setScale(0.01);
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height;
		egret.Tween.get(this).to({scaleX:1.2,scaleY:1.2},180).to({scaleX:0.9,scaleY:0.9},90).to({scaleX:1,scaleY:1},90).wait(100).call(this.textShootAnim,this);
    }

    private textShootAnim():void
	{	
		
		this._codonLength +=1;
		if (this._codonLength > this._messageStr.length) {
			this._bubbleText.text = this._messageStr;
            egret.Tween.get(this._bubbleText).wait(3000).call(this.showDisposeAnim,this);
		}
		else {
			this._bubbleText.text = this._messageStr.substr(0,this._codonLength);
			egret.Tween.get(this._bubbleText).wait(100).call(this.textShootAnim,this);
		}
	}

    private showDisposeAnim():void
	{
        egret.Tween.get(this).to({alpha:0},500).call(this.dispose,this);
    }


    public dispose():void
	{   
        egret.Tween.removeTweens(this._bubbleText);
        this._name = null;
        this._length = 0;
        this._bubbleText = null;
        this._messageStr = null;
        this._codonLength = 0;

        super.dispose();
    }
}