/**
 * author zsl
 * date 2018/8/1
 * @class BubbleTip
 */

class AcTreasureHuntTip extends BaseDisplayObjectContainer
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

    public init(str:string,length:number,isTrue:boolean=false):void
	{
        this._name = str;
        this._length = length;
        this.alpha = 0;

       	let meeesageBg:BaseBitmap = BaseBitmap.create("ac_tw_bubble");
        meeesageBg.x =55;
		this.addChild(meeesageBg);


        let bubbleName:string = 'treasurenpchead-1'; 
        let bubbleIcon:BaseLoadBitmap = BaseLoadBitmap.create(bubbleName);
        bubbleIcon.width =55;
        bubbleIcon.height =58;    
        this.addChild(bubbleIcon);

        this._messageStr = str;
     
        this._bubbleText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_BLACK);
        this._bubbleText.setPosition(14+meeesageBg.x, 8+ meeesageBg.y);
        this.addChild(this._bubbleText);

        this._bubbleText.width = meeesageBg.width-14; 
        this._bubbleText.text = this._messageStr; 

        meeesageBg.height = this._bubbleText.textHeight + 30; 
        this.height = meeesageBg.height;
        this.width = meeesageBg.width + bubbleIcon.width;

        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, bubbleIcon, this, [0,0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, meeesageBg, bubbleIcon, [bubbleIcon.width,0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._bubbleText, meeesageBg);
        this.setScale(0.01); 
		egret.Tween.get(this).to({scaleX:1.2,scaleY:1.2,alpha : 1},180).to({scaleX:0.9,scaleY:0.9},90).to({scaleX:1,scaleY:1},90).wait(100).call(this.textShootAnim,this);
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