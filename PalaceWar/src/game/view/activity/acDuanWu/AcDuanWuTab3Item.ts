class AcDuanWuTab3Item extends BaseDisplayObjectContainer 
{ 
    private _cfg:Config.AcCfg.DWClaimItemCfg = null;
    private _code : string = '';
    private _claimText:BaseTextField = null;
    private _claimBtn:BaseButton = null;
    private _callbackF:Function = null;
	private _obj:any = null;

    public constructor() 
	{
		super();
	} 

    private get vo() : AcDuanWuVo{
        return <AcDuanWuVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_DUANWU;
    }

    private _uicode : string = '';
    private get code() : string{
        return this._code;
    }

    private get uicode() : string{
        return this._uicode;
    }
    
    public init(data:Config.AcCfg.DWClaimItemCfg,itemparam:any,f:Function,o:any)
    {
        let view = this;
        view._code = itemparam[0];
        view._uicode = itemparam[1];
		view.width = 520;
		view.height = 144;
		this._cfg = data;

        this._obj = o;
		this._callbackF = f;

        let wordsBg:BaseBitmap = BaseBitmap.create("public_9_bg14");  
		wordsBg.width  = view.width;
		wordsBg.height = view.height; 
		this.addChild(wordsBg); 

        this._claimText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
        this._claimText.setPosition(436,28);
		this.addChild(this._claimText);

        this._claimBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"exchange",this.clickButton,this);
        this._claimBtn.setPosition(380,54);
		this.addChild(this._claimBtn);

        this.resetBtn();

        let costItem:string = null;
        let getItem:string = null;
        if (data.costZongZi)
        {
            costItem = `1013_0_${data.costZongZi}_${view.uicode}`
        }
        if (data.costDaGao)
        {   
            if (costItem)
            {
                costItem+=`|`;
            }
            else
            {
                costItem = ``;
            }
            costItem += `1014_0_${data.costDaGao}_${view.uicode}`
        }
        if (data.costXiongHuang)
        {   
            if (costItem)
            {
                costItem+=`|`;
            }
            else
            {
                costItem = ``;
            }
            costItem += `1015_0_${data.costXiongHuang}_${view.uicode}`
        }

        if (data.item)
        {
            getItem = data.item;
        }
        else if (data.getDaGao)
        {
            getItem = `1014_0_${data.getDaGao}_${view.uicode}`
        }
        else if (data.getXiongHuang)
        {
            getItem = `1015_0_${data.getXiongHuang}_${view.uicode}`
        }

        let icons: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons( costItem,true);
        for (let i:number = 0; i<icons.length; i++)
        {
            let icon: BaseDisplayObjectContainer = icons[i];
            icon.setScale(0.85);
            icon.setPosition(14+i*127,30);
            this.addChild(icon);
        }

        let getIcon: BaseDisplayObjectContainer = GameData.getRewardItemIcons( getItem,true)[0];
        getIcon.setPosition(150+(icons.length-1)*127, 30);
        getIcon.setScale(0.85);
        this.addChild(getIcon);

        let arrow:BaseBitmap = BaseBitmap.create(`acduanwu_arrow`);
		arrow.setPosition(getIcon.x-arrow.width+3,view.height/2-arrow.height/2);
		this.addChild(arrow);

        if (icons.length>1)
        {
            let plus1:BaseBitmap = BaseBitmap.create(`acduanwu_plus`);
            plus1.setPosition(103,view.height/2-plus1.height/2);
            this.addChild(plus1);
        }
    }

    public get sortId():number
    {
        let n :number = this._cfg.id;
        if (this._cfg.limit && this._cfg.limit <= this.vo.getClaim(this._cfg.id))
        {
            n+=10000;
        }

        return n;
    }

    private clickButton():void
    {   

        this.vo.lastpos = this._claimText.localToGlobal(this._claimText.width, 20);
        this._callbackF.apply(this._obj,[this._cfg.id]);
    }

    public resetBtn():void
    {
        let vo = this.vo;
        if (this._cfg.limit)
        {
            let claimNum:number = this._cfg.limit - vo.getClaim(this._cfg.id);
            if (claimNum>0)
            {
                this._claimText.text = LanguageManager.getlocal("acDuanWuClaimTimes",[String(claimNum)]);

                let need1=0,need2=0,need3=0;
                if (this._cfg.costZongZi)
                {
                    need1 = this._cfg.costZongZi;
                }
                if (this._cfg.costDaGao)
                {
                    need2 = this._cfg.costDaGao;
                }
                if (this._cfg.costXiongHuang)
                {
                    need3 = this._cfg.costXiongHuang;
                }
                if (vo.getActivityItem(1)>=need1 && vo.getActivityItem(2)>=need2 && vo.getActivityItem(3)>=need3)
                {
                    App.DisplayUtil.changeToNormal(this._claimBtn);
                }
                else
                {
                    App.DisplayUtil.changeToGray(this._claimBtn);
                }
            }
            else
            {
                this._claimText.text = LanguageManager.getlocal("acDuanWuClaimTimes2",[String(claimNum)]);
                this._claimBtn.setEnable(false);
            }
            this._claimText.x = 436-this._claimText.width/2;
        }
        else
        {
            let need1=0,need2=0,need3=0;
            if (this._cfg.costZongZi)
            {
                need1 = this._cfg.costZongZi;
            }
            if (this._cfg.costDaGao)
            {
                need2 = this._cfg.costDaGao;
            }
            if (this._cfg.costXiongHuang)
            {
                need3 = this._cfg.costXiongHuang;
            }
            if (vo.getActivityItem(1)>=need1 && vo.getActivityItem(2)>=need2 && vo.getActivityItem(3)>=need3)
            {
                App.DisplayUtil.changeToNormal(this._claimBtn);
            }
            else
            {
                App.DisplayUtil.changeToGray(this._claimBtn);
            }
        }
        
    }

    public dispose():void
	{
        this._cfg = null;
        this._code = null;
        this._claimText = null;
        this._claimBtn = null;
        this._callbackF = null;
		this._obj = null;

        super.dispose();
    }
}