class ChangebgIcon extends BaseDisplayObjectContainer
{   
    private _status:number = 1; // 1 已解锁  2 未解锁
    private _circle:BaseBitmap = null;
    private _using:BaseBitmap = null;
    private _idx:number = 0;

    private _callbackF:Function = null;
	private _obj:any = null;

    private _lockedTab:BaseBitmap[] = [];

    public constructor() {
		super();
	}

    //
    public init(key:string,idx:number,status:number,f:Function,o:any):void
	{
        this._status = status;    
        this._obj = o;
        this._callbackF = f;  
        this._idx = idx;

        
        let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,100,100);
        let icon:BaseLoadBitmap = BaseLoadBitmap.create("changebg_icon_"+key);
        this.addChild(icon);
        icon.addTouchTap(this.touchHandle,this);

        if (status == 2)
        {
            let mask:BaseBitmap = BaseBitmap.create("changebg_mask");
            this.addChild(mask);

            let lock:BaseBitmap = BaseBitmap.create("changebg_lock");
            lock.setPosition(mask.width/2-lock.width/2,mask.height/2-lock.height/2);
            this.addChild(lock);

            this._lockedTab.push(mask);
            this._lockedTab.push(lock);
        }

        this._circle = BaseBitmap.create("changebg_circle");
        this.addChild(this._circle);
        this._circle.visible = false;

        this._using = BaseBitmap.create("changebg_using");
        this._using.x = this._circle.width/2 - this._using.width/2;
        this.addChild(this._using);
        this._using.visible = false;

        let nameBg:BaseBitmap =  BaseBitmap.create("changebg_namebg");
        nameBg.scaleX = 100/nameBg.width;
        this.addChild(nameBg);

        let name:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("changebg_name_"+key),TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        name.lineSpacing = 4;
        name.width = 100;
        name.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(name);

        nameBg.y = this._circle.height - name.height - 4;
        nameBg.height = name.height+8;
        name.y = nameBg.y+4;

        this.name = "ChangebgIcon"
    }

    public touchHandle():void
    {
        this._callbackF.apply(this._obj,[this._idx]);
    }

    public setSelect(s:boolean):void
    {
        this._circle.visible = s;
    }

    public setUsing(s:boolean):void
    {
        this._using.visible = s;
    }

     public setUnlock():void
    {
        for (let k:number = 0; k<this._lockedTab.length; k++)
        {
            this.removeChild(this._lockedTab[k]);
        }
        this._lockedTab.length = 0;
    }


    public dispose():void
	{   
        this._status = 1;
        this._circle = null;
        this._using = null;
        this._idx = 0;
        this._callbackF = null;
        this._obj = null;
        this._lockedTab.length = 0;

        super.dispose();
    }
}