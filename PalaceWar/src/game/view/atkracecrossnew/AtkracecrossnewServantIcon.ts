class AtkracecrossnewServantIcon extends BaseDisplayObjectContainer
{   
    private _sid:string = null;
    private _choose:boolean = false;
    private _flag1:BaseBitmap = null;
    private _flag2:BaseBitmap = null;

    private _obj:any = null;
    private _func:Function = null;

    public constructor() 
	{
		super();
	}

    public init( sid:string,choose:boolean,f:Function,o:any):void
    {
        this._sid = sid;
        this._choose = choose;
        this._func = f;
        this._obj = o;

        let view = this;
        let servantInfoVo : ServantInfoVo = Api.servantVoApi.getServantObj(sid);
        let temW:number = 105;
		let iconBgBt:BaseLoadBitmap = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.qualityBoxImgPath : 'servant_cardbg_0');
		this.addChild(iconBgBt);
		iconBgBt.scaleX = temW/194;
        iconBgBt.scaleY = temW/192;

		let iconBt:BaseLoadBitmap = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.halfImgPath : 'servant_half_empty');
		iconBt.x = iconBgBt.x + 5;
		iconBt.y = iconBgBt.y + 5;
		this.addChild(iconBt);
		iconBt.scaleX = (temW-10)/180;
        iconBt.scaleY = (temW-10)/177;
        iconBt.addTouchTap(this.touchHandler, this);


        //兵力数目
        let numbg:BaseBitmap = BaseBitmap.create("servant_namebg");
        numbg.width = 98;
        numbg.height = 24;
        numbg.setPosition(3 , 77);//1 75
        this.addChild(numbg);

        let zizhistr = LanguageManager.getlocal("emperorWarBuzhenZzhi",[String(servantInfoVo.getTotalBookValue(0))]);
        let zizhiText = ComponentManager.getTextField(zizhistr, 18,TextFieldConst.COLOR_WHITE);
        if (PlatformManager.checkIsThSp()){
            zizhiText.size = 14;
        }
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,zizhiText,numbg);
		this.addChild(zizhiText);

        let flag1 = BaseBitmap.create("newcrossatkrace_gone");
        flag1.setPosition(-6,-6);
        this.addChild(flag1);
        this._flag1 = flag1;

        let flag2 = BaseBitmap.create("newcrossatkrace_check");
        flag2.setPosition(100-flag2.width+5,100-flag2.height+5);
        this.addChild(flag2);
        this._flag2 = flag2;

        this.resetFlag();


    }

    private resetFlag():void
    {
        this._flag1.visible = this._choose;
        this._flag2.visible = this._choose;
    }

    public setCheck():void
    {
        this._choose = !this._choose;
        this.resetFlag();
    }

    public getChoose():boolean
    {
        return this._choose;
    }

     public getSid():string
    {
        return this._sid;
    }

    private touchHandler():void
    {
        this._func.apply(this._obj,[this]);
    }

    public dispose():void
	{	
		this._sid = null;
        this._choose = false;
        this._flag1 = null;
        this._flag2 = null;
        this._obj = null;
        this._func = null;

		super.dispose();
	}
}