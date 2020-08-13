class DailybossBanner extends BaseDisplayObjectContainer
{   

    private _bg:BaseBitmap = null;
    private _process:BaseBitmap = null;
    private _text:BaseTextField = null;
    private _info:any = null;

    private _callbackF:Function = null;
    private _callbackF2:Function = null;
	private _obj:any = null;
    public _idx:number = 0;

    public _isLock:boolean = false;

    public _redPointStatus:number = 0;

    public constructor() 
    {
    	super();
	}

    public init(info:any,idx:number,f:Function,o:any,f2:Function):void
	{   
        this._info = info;
        this._obj = o;
        this._callbackF = f;  
        this._idx = idx;
        this._callbackF2 = f2;

        let picName:string;
        if (info.name == "countryWar")
		{
            picName = "dailyboss_"+info.name;
        }
        else
        {
            picName = "dailyboss_"+info.name.toLowerCase();
        }

        this._bg = BaseBitmap.create(picName);
        this._bg.setPosition(GameConfig.stageWidth/2-this._bg.width/2,0);
        this.addChild(this._bg);
        this._bg.addTouchTap(this.touchHandle,this);

        this._process = BaseBitmap.create("dailyboss_underway");
        this._process.setPosition(this._bg.x-2,12);
        this.addChild(this._process);

        this._text = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._text.setPosition(50,188);
        this._text.width = GameConfig.stageWidth - 100;
        this._text.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(this._text);
    }


    public touchHandle():void
    {   
        let name:string = this._info.name;
        if(name == "countryWar" && Api.countryWarVoApi.getEnermyZid() == 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarCountdown_3"));
            return;
        }
        this._callbackF.apply(this._obj,[this._info.name]);
    }

    public tick():void
    {   
        let name:string = this._info.name;
        if (name == "boss1" || name == "boss2")
		{
			let status:number=Api.dailybossVoApi.getStatusByName(name);
            let statusStr:string="";
            if(status==0)
            {
                if (this._isLock==false)
                {
                    this._process.visible = false;
                    App.DisplayUtil.changeToGray(this._bg);

                    this._isLock = true;
                }
                statusStr = LanguageManager.getlocal("dailybossLeftTimeDesc",[App.DateUtil.getFormatBySecond(Api.dailybossVoApi.getNextStartLeftTimeByName(name),1)]);
            }
            else if(status==1)
            {	
                if (this._isLock==true)
                {
                    this._process.visible = true;
                    App.DisplayUtil.changeToNormal(this._bg);

                    this._isLock = false;
                }
                statusStr = LanguageManager.getlocal("dailybossEndTimeDesc",[App.DateUtil.getFormatBySecond(Api.dailybossVoApi.getEndTimeByName(name),1)]);
            }
            this._text.text = statusStr;
		}
        else if (name == "bossnew")
		{
            let status:number=Api.dailybossnewVoApi.getStatusByName(name);
            let statusStr:string="";
            if(status==0)
            {
                if (this._isLock==false)
                {
                    this._process.visible = false;
                    App.DisplayUtil.changeToGray(this._bg);

                    this._isLock = true;
                }
                statusStr = LanguageManager.getlocal("dailybossnewLeftTimeDesc",[App.DateUtil.getFormatBySecond(Api.dailybossnewVoApi.getNextStartLeftTimeByName(name),1)]);
            }
            else if(status==1)
            {	
                if (this._isLock==true)
                {
                    this._process.visible = true;
                    App.DisplayUtil.changeToNormal(this._bg);

                    this._isLock = false;
                }
                statusStr = LanguageManager.getlocal("dailybossnewEndTimeDesc",[App.DateUtil.getFormatBySecond(Api.dailybossnewVoApi.getEndTimeByName(name),1)]);
            }
            this._text.text = statusStr;

            if (Api.dailybossnewVoApi.getRewardFlag() == 1)
            {
                App.CommonUtil.addIconToBDOC(this);
                this.getChildByName("reddot").x = this.width;
                this.getChildByName("reddot").y = 10;
            }
            else
            {
                 App.CommonUtil.removeIconFromBDOC(this);
            }
        }
		else if (name == "countryWar")
		{
            let str:string;
            let cd = Api.countryWarVoApi.getCountTime();
            if(Api.countryWarVoApi.getEnermyZid() == 0){
                App.DisplayUtil.changeToGray(this._bg);
                this._process.visible = false;
                cd = Api.countryWarVoApi.getCountEndTime();
                if(cd <= 0){
                    NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_GETMODEL,null);
                }
            }
            else{
                if(Api.countryWarVoApi.getIslunkong()){
                    App.DisplayUtil.changeToGray(this._bg);
                    this._process.visible = false;
                }
                else{
                    App.DisplayUtil.changeToNormal(this._bg);
                    this._process.visible = true;
                }
            }
            str = Api.countryWarVoApi.getCountStr();
            this._text.text = str;

            if (this._redPointStatus == 0)
            {
                if (Api.countryWarVoApi.countryWarRedPoint())
                {
                    this._redPointStatus = 1;
                    App.CommonUtil.addIconToBDOC(this);
                    this.getChildByName("reddot").x = this.width;
                    this.getChildByName("reddot").y = 10;
                }
            }

            if (this._redPointStatus == 1 && !Api.countryWarVoApi.countryWarRedPoint())
            {
                this._redPointStatus = 2;
                App.CommonUtil.removeIconFromBDOC(this);
            }
        }
        else if (name == "ladderTournament")
		{   
            let statusStr:string="";
            let vo = Api.acVoApi.getActivityVoByAidAndCode("ladderTournament");
            if (vo.checkIsInEndShowTime())
            {
                statusStr =  LanguageManager.getlocal("acLadder_TimeCountDownEnd2");
                this._process.visible = false;
            }
            else
            {
                statusStr =  LanguageManager.getlocal("acConquerMainLandActTime-1",[vo.acTimeAndHour]);
            }
            
            this._text.text = statusStr;

            if (vo.isShowRedDot)
            {
                App.CommonUtil.addIconToBDOC(this);
                this.getChildByName("reddot").x = this.width;
                this.getChildByName("reddot").y = 10;
            }
            else
            {
                App.CommonUtil.removeIconFromBDOC(this);
            }
            if (vo.isEnd)
            {
                this._callbackF2.apply(this._obj,[this._idx]);
            }
        }
    }

    public dispose():void
	{   
        App.DisplayUtil.changeToNormal(this._bg);
        this._bg = null;
        this._process = null;
        this._text = null;
        
        this._info = null;
        this._callbackF = null;
        this._obj = null;
        this._idx = 0;
        this._isLock = false;
        this._redPointStatus = 0;
        this._callbackF2 = null;

        super.dispose();
    }
}