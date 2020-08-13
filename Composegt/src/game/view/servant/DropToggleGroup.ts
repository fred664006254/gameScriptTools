// TypeScript file
class DropToggleGroup extends BaseDisplayObjectContainer
{   
    static  DROPBTN_COLOR1:number = 0xfffcd8;
	static  DROPBTN_COLOR2:number = 0x99a3b4;

    private _btnNameArray:string[];
    private _nodeContainer:BaseDisplayObjectContainer;
	private _dropDownContainer:BaseDisplayObjectContainer;
	private _dropDownBtn:BaseButton;
	private _dropDownFlag:BaseBitmap;
	private _dropBtnList:BaseButton[];
	private _lastDropIdx:number=1;
    private _btnCallback:Function;
    private _callbackHandler:any;
	public constructor(btnNameArray:string[],btnCallback:Function,handler:any)
	{
		super();
        this._btnNameArray = btnNameArray;
        this._btnCallback = btnCallback;
        this._callbackHandler = handler;
        this.initBtnList()
	}

    protected initBtnList()
    {
        this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChild(this._nodeContainer);
        this._dropBtnList = [];

        this._dropDownBtn = ComponentManager.getButton("servant_dropBtn","",this.dropDownBtnClickHandler,this,[0]);
		this._dropDownBtn.x = 0;
		this._dropDownBtn.y = 0;
		this._dropDownBtn.setColor(DropToggleGroup.DROPBTN_COLOR1);
		this._nodeContainer.addChild(this._dropDownBtn);
		this._dropDownBtn.setText(this._btnNameArray[0]);
		this._dropBtnList.push(this._dropDownBtn);

		this._dropDownFlag = BaseBitmap.create("servant_dropIcon");
		this._dropDownFlag.anchorOffsetY = this._dropDownFlag.height/2;
		this._dropDownFlag.x = this._dropDownBtn.x + this._dropDownBtn.width -this._dropDownFlag.width-3 ;
		this._dropDownFlag.y =this._dropDownBtn.y + this._dropDownBtn.height -this._dropDownFlag.height/2 -10;
		this._nodeContainer.addChild(this._dropDownFlag);

		this._dropDownContainer = new BaseDisplayObjectContainer()
		this._dropDownContainer.visible = false;
		this._dropDownContainer.x = this._dropDownBtn.x;
		this._dropDownContainer.y = this._dropDownBtn.y + this._dropDownBtn.height;
		this._nodeContainer.addChild(this._dropDownContainer);

		for (var index = 1; index <=4; index++) {
			let tmpBtn = ComponentManager.getButton("servant_dropBtn","",this.dropDownBtnClickHandler,this,[index]);
			this._dropBtnList.push(tmpBtn);
			if (index == 1)
			{	
				tmpBtn.setColor(DropToggleGroup.DROPBTN_COLOR1);
			}else
			{
				tmpBtn.setColor(DropToggleGroup.DROPBTN_COLOR2);
			}
			
			tmpBtn.y = tmpBtn.height*(index-1);
			this._dropDownContainer.addChild(tmpBtn);
			tmpBtn.setText(this._btnNameArray[index-1]);
		}
    }

    protected dropDownBtnClickHandler(btnIdx:number)
    {
        let tmpIdx = this._lastDropIdx;
		this._dropBtnList[1].setColor(DropToggleGroup.DROPBTN_COLOR2);
		this._dropBtnList[2].setColor(DropToggleGroup.DROPBTN_COLOR2);
		this._dropBtnList[3].setColor(DropToggleGroup.DROPBTN_COLOR2);
		this._dropBtnList[4].setColor(DropToggleGroup.DROPBTN_COLOR2);
		this._dropBtnList[this._lastDropIdx].setColor(DropToggleGroup.DROPBTN_COLOR1);
		if (this._dropDownContainer.visible)
		{
			this._dropDownFlag.scaleY = 1;
			this._dropDownContainer.visible = false;
		}else
		{
			this._dropDownFlag.scaleY = -1;
			this._dropDownContainer.visible = true;
		}
		if (btnIdx > 0 )
		{
			this._dropDownBtn.setText(this._btnNameArray[btnIdx-1]);
			this._lastDropIdx = btnIdx;
		}

		if(tmpIdx == this._lastDropIdx)
		{
			return;
		}
        if ( this._btnCallback)
        {
            this._btnCallback.apply(this._callbackHandler,[btnIdx]);
        }
        
    }

    public dispose():void
	{
		this._nodeContainer = null;
		this._dropDownContainer = null;
		this. _dropDownBtn = null;
		this. _dropDownFlag = null;
		this._dropBtnList = null;
		this._lastDropIdx = 1;
		super.dispose();
	}

}