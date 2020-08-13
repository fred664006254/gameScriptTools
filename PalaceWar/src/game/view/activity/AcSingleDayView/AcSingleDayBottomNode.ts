class AcSingleDayBottomNode extends BaseLoadDisplayObjectContiner
{
    private _selectIdx:number;
    private _switchCallback:Function;
    private _callbackOgj:any;
	public constructor(data:{selectIdx:number,switchCallback:Function,callbackOgj:any})
	{
		super();
        this._selectIdx = data.selectIdx || 1;
        this._switchCallback = data.switchCallback;
        this._callbackOgj = data.callbackOgj;
        this.show();
	}
    protected getParent():egret.DisplayObjectContainer
	{
		return null;
	}

	protected init():void
	{
        this.initBottomBg();
    }

    protected initBottomBg(){
        let tWitdh = GameConfig.stageWidth;
        let tHeight = GameConfig.stageHeigth;
        this.width = tWitdh;
        this.height = tHeight;

        let bottombg = BaseBitmap.create("wifeskin_barbg");
        // bottombg.height = 114;
        bottombg.x = tWitdh/2 - bottombg.width/2;
        bottombg.y = tHeight - bottombg.height;
        this.addChild(bottombg);

        for (var index = 1; index <= 3; index++) {
            let tarRes = "acsingleday_bottomIcon"+index;
            if(this._selectIdx == index){
                tarRes = "acsingleday_bottomIcon"+index + "_2";
            }
            let bottomBtn = BaseBitmap.create(tarRes);
            bottomBtn.addTouchTap(this.bottomBtnHandler,this,[index]);
            
            bottomBtn.x = GameConfig.stageWidth/2 - bottomBtn.width/2 * bottomBtn.scaleX + 170 * (index-2);
            bottomBtn.y = bottombg.y + bottombg.height/2 - bottomBtn.height/2 ;
            this.addChild(bottomBtn);
            
            // let nameImg = BaseBitmap.create("acsingleday_bottomname"+index);
            // nameImg.setScale(bottomBtn.scaleX);
            // nameImg.x = bottomBtn.x + bottomBtn.width/2 * bottomBtn.scaleX - nameImg.width/2 * bottomBtn.scaleX;
            // nameImg.y = bottomBtn.y + bottomBtn.height * bottomBtn.scaleX - nameImg.height * bottomBtn.scaleX - 8;
            // this.addChild(nameImg);
        }
    }

    protected bottomBtnHandler(event:egret.TouchEvent, index:number)
    {
        if(this._selectIdx == index || !this._callbackOgj || !this._switchCallback){
            return;
        }
        this._switchCallback.apply(this._callbackOgj,[index]);
    }

	protected getResourceList():string[]
	{
		return [];
	}

    public dispose():void
	{
        this._selectIdx = null;
        this._switchCallback = null;
        this._callbackOgj = null;
        super.dispose();
    }
}