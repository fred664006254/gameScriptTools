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

        let bottombg = BaseBitmap.create("acsingleday_bottombg");
        bottombg.height = tHeight;
        bottombg.x = tWitdh/2 - bottombg.width/2;
        bottombg.y =  0;
        this.addChild(bottombg);

        for (var index = 1; index <= 3; index++) {
            let bottomBtn = BaseBitmap.create("acsingleday_bottomIcon"+index);
            bottomBtn.addTouchTap(this.bottomBtnHandler,this,[index]);
            if(this._selectIdx == index){
                bottomBtn.setScale(1.0);
            }else{
                bottomBtn.setScale(0.85);
            }
            bottomBtn.x = GameConfig.stageWidth/2 - bottomBtn.width/2 * bottomBtn.scaleX + 170 * (index-2);
            bottomBtn.y = bottombg.y + bottombg.height - bottomBtn.height * bottomBtn.scaleX - 10;
            this.addChild(bottomBtn);
            
            let nameImg = BaseBitmap.create("acsingleday_bottomname"+index);
            nameImg.setScale(bottomBtn.scaleX);
            nameImg.x = bottomBtn.x + bottomBtn.width/2 * bottomBtn.scaleX - nameImg.width/2 * bottomBtn.scaleX;
            nameImg.y = bottomBtn.y + bottomBtn.height * bottomBtn.scaleX - nameImg.height * bottomBtn.scaleX - 8;
            this.addChild(nameImg);
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