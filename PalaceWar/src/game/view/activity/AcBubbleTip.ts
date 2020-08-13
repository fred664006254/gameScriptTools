/**
 * author zsl
 * date 2018/8/1
 * @class BubbleTip
 */

class AcBubbleTip extends BaseDisplayObjectContainer
{

    private _name:string = null;
    private _length:number = 0;
    private _bubbleText:BaseTextField = null;
    private _newTxtText:BaseTextField = null;
    
    private _messageStr:string = null;
    private _codonLength:number = 0;

    public constructor() {
		super();
	}
    /** length  文字状态*/
     /** isTrue  true 可以领奖状态   */
    

    public init(name:string,length:number,isTrue:boolean=false):void
	{
        this._name = name;
        this._length = length;

       	let meeesageBg:BaseBitmap = BaseBitmap.create("ac_tw_bubble");
        meeesageBg.x =55;
		this.addChild(meeesageBg);


        let bubbleName:string = null; 
        let iconName =name.toLowerCase();
        if (RES.hasRes("ac_bubble_"+iconName))
        {
            bubbleName = "ac_bubble_"+iconName;
        }

        if (bubbleName)
        {
            var bubbleIcon:BaseLoadBitmap = BaseLoadBitmap.create(bubbleName);
            bubbleIcon.width =55;
            bubbleIcon.height =58;
            bubbleIcon.x= -13;
            
		    this.addChild(bubbleIcon);
            meeesageBg.x = 40;
            meeesageBg.y = 15;
        }
        if(isTrue)
        {
            this._messageStr = LanguageManager.getlocal("bubble_tip_"+name+App.MathUtil.getRandom(1,length)+"_2");
        }
        else
        {
            this._messageStr = LanguageManager.getlocal("bubble_tip_"+name+App.MathUtil.getRandom(1,length)+"_1");
        }
     
        this._bubbleText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BLACK);
        this._bubbleText.setPosition(14+meeesageBg.x, 8+ meeesageBg.y);
        this.addChild(this._bubbleText);

        this._bubbleText.width = meeesageBg.width-14; 

        if(this._messageStr.length>=9)
        { 
            meeesageBg.height = 77; 
            meeesageBg.y = meeesageBg.height/2-bubbleIcon.height/2-15; 
            this._bubbleText.y = this._bubbleText.y-11; 
        }

        if(this._messageStr.length>18)
        {   
            this._bubbleText.y = this._bubbleText.y-7; 
        }

        this.setScale(0.01); 
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
        this._newTxtText =null;

        super.dispose();
    }
}