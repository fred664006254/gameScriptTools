class WifeBanishCarriage extends BaseDisplayObjectContainer 
{

    private _horse:BaseDisplayObjectContainer = null;
    private _wife:BaseDisplayObjectContainer = null;
    private _tipContainer:BaseDisplayObjectContainer = null;
    private _banishTime:BaseTextField = null;
    public posInfo:WifeBanishInfoVo = null;
    public id:number = 0;
    private _index = 0;

    private _callbackF1:Function = null;
    private _callbackF2:Function = null;
	private _obj:any = null;
    private _backBtn:BaseButton = null;
    private _isShowed:boolean = false;
    private _dayTxt : BaseTextField = null;
    private _nowCode : number = 1;
    
    public constructor() 
	{
		super();
	}

    public init(index:number,f1:Function,f2:Function,o:any)
    {
        this.id = index;
        this._index = index;
        let list:AcBaseVo[] = Api.acVoApi.getActivityVoListByAid(AcConst.AID_BATTLEPASS);
        list.sort((a,b)=>{
            return a.et - b.et;
        });
		if(this.id > Api.wifebanishVoApi.getPosNum()){
            let end = Api.wifebanishVoApi.getPosNum();
            for(let i in list){
                let vo = <AcBattlePassVo>list[i];
                end += vo.getWifeBanPos();
                if(this.id <= end){
                    this._nowCode = vo.code;
                    if(vo && vo.isInActivity()){
                        this.id = vo.wifeBanPos[this.id - (end - vo.getWifeBanPos())];
                        break;
                    }
                }

            }
		}
        this._obj = o;
        this._callbackF1 = f1;  
        this._callbackF2 = f2;  
    }

    private clickHandle():void
    {   
        if (this.posInfo)
        {
            this._callbackF2.apply(this._obj,[this.id,this.posInfo.wifeId,this._index]);
        }
        else
        {
            this._callbackF1.apply(this._obj,[this.id,this._index,this._nowCode.toString()]);
        }
    }

    public setHorse():void
    {
        this.removeChildren();
        this.posInfo = null;

        this._horse = new BaseDisplayObjectContainer();
        this.addChild(this._horse);
        this._horse.addTouchTap(this.clickHandle,this);

        let horse:BaseBitmap = BaseBitmap.create("banish_carriage");
        this._horse.addChild(horse);
        

        if (this.id % 2 == 0)
        {
            horse.scaleX = -1;
            horse.x = horse.width;
        }
        this._horse.x=22;

        this._tipContainer = new BaseDisplayObjectContainer();
        this._horse.addChild(this._tipContainer);

        let tip:BaseBitmap = BaseBitmap.create("bookroom_tipbg");
        tip.x = horse.width/2 - tip.width/2;
        this._tipContainer.addChild(tip);

        let desc1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("banishClick"),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        desc1.setPosition(tip.x+tip.width/2 - desc1.width/2,9);
        this._tipContainer.addChild(desc1);

        //限时
        let vo = <AcBattlePassVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS,this._nowCode.toString());
		if(this.id > Api.wifebanishVoApi.getPosNum()){
            let tipbg = BaseBitmap.create(`servantexiletiipbg`);
			let day = '';
			if(vo.isInActivity){
				let endtime = vo.et - 86400 * 1;
                if((endtime - GameData.serverTime) / 86400 >= 1){
					day = Math.max(0 ,Math.floor((endtime - GameData.serverTime) / 86400)) + LanguageManager.getlocal(`date_day2`);
				}
				else{
					day = Math.max(0 ,Math.ceil((endtime - GameData.serverTime) / 3600))+ LanguageManager.getlocal(`date_hour`);
				}
			}
			let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`limitDayTime`, [day]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
			App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, tipbg, this._horse, [0,10]);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
			this.addChild(tipbg);
			this.addChild(tipTxt);
            this._dayTxt = tipTxt;
            
            let dropDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(`battlepassdropdesc`, [LanguageManager.getlocal(`acBattlePassTitle-${this._nowCode}`)]), 22);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dropDescTxt, this._horse, [0,this._horse.height]);
			this.addChild(dropDescTxt);
		}

        egret.Tween.get(this._tipContainer, { loop: true }).to({ y: -10 }, 1000).to({ y: 0 }, 1000);
        
    }

    public setIsShowTip(isShow:boolean):void
    {
        if (this._tipContainer)
        {
            this._tipContainer.visible = isShow;
        }
    }

    public setWife(info:WifeBanishInfoVo):void
    {
        this.removeChildren();
        this.posInfo = info;
        this._isShowed = false;
        this._tipContainer = null;

        this._wife = new BaseDisplayObjectContainer();
        this.addChild(this._wife);


        let bg:BaseBitmap = BaseBitmap.create("banish_headbg");
        this._wife.addChild(bg);
        this._wife.setPosition(21.6,9);

        let wifeHead:BaseDisplayObjectContainer = Api.wifebanishVoApi.getWifeHead(info.wifeId);
        this._wife.addChild(wifeHead);

        let desc1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("banishing"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_GREEN3);
        desc1.setPosition(205-desc1.width/2,8);
        this._wife.addChild(desc1);

        this._backBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"banishGohome",this.clickHandle,this);
        this._backBtn.setPosition(143,63);
        this._wife.addChild(this._backBtn);

        this._banishTime = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._banishTime.width = 160;
        this._banishTime.setPosition(128,desc1.y+desc1.height+5);
        this._banishTime.textAlign = egret.HorizontalAlign.CENTER;
        this._wife.addChild(this._banishTime);

        this._wife.setScale(0.85);

        //限时
        let vo = <AcBattlePassVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS,this._nowCode.toString());
        if(this.id > Api.wifebanishVoApi.getPosNum()){
            let tipbg = BaseBitmap.create(`servantexiletiipbg`);
            let day = '';
            if(vo.isInActivity){
                let endtime = vo.et - 86400 * 1;
                if((endtime - GameData.serverTime) / 86400 >= 1){
                    day = Math.max(0 ,Math.floor((endtime - GameData.serverTime) / 86400)) + LanguageManager.getlocal(`date_day2`);
                }
                else{
                    day = Math.max(0 ,Math.ceil((endtime - GameData.serverTime) / 3600))+ LanguageManager.getlocal(`date_hour`);
                }
            }
            let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`limitDayTime`, [day]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, tipbg, this._wife, [-20,-20]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipbg);
            this.addChild(tipbg);
            this.addChild(tipTxt);
            this._dayTxt = tipTxt;

            let dropDescTxt = ComponentManager.getTextField(LanguageManager.getlocal(`battlepassdropdesc`, [LanguageManager.getlocal(`acBattlePassTitle-${this._nowCode}`)]), 22);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dropDescTxt, this._wife, [0,this._wife.height]);
			this.addChild(dropDescTxt);
         }

        this.refreshTime();
    }

    public goBack():void
    {   
        this._backBtn.setEnable(false);
    }

    public refreshTime():boolean
    {
        let r:boolean = false;
        if (this._wife )
        {   
            if (this.posInfo)
            {
                if (this.posInfo.et >= GameData.serverTime)
                {   
                    let lastStr = App.DateUtil.getFormatBySecondIntoTime(this.posInfo.et - GameData.serverTime);
                    this._banishTime.text = LanguageManager.getlocal("friends_collectLastTime",[lastStr]);
                }
                else if (this._isShowed == false)
                {   
                    this._isShowed = true;
                    r = true;
                }
            }          
        }
        let vo = <AcBattlePassVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS,this._nowCode.toString());
		if(this.id > Api.wifebanishVoApi.getPosNum()){
			let day = '';
			if(vo.isInActivity){
				let endtime = vo.et - 86400 * 1;
                if((endtime - GameData.serverTime) / 86400 >= 1){
					day = Math.max(0 ,Math.floor((endtime - GameData.serverTime) / 86400)) + LanguageManager.getlocal(`date_day2`);
				}
				else{
					day = Math.max(0 ,Math.ceil((endtime - GameData.serverTime) / 3600))+ LanguageManager.getlocal(`date_hour`);
				}
				if(endtime - GameData.serverTime <= 0){
					if(this._isShowed == false)
                    {   
                        this._isShowed = true;
                        r = true;
                    }
				}
			}
			if(this._dayTxt){
				this._dayTxt.text = LanguageManager.getlocal(`limitDayTime`, [day.toString()]);	
			}		
		}
        return r;
    }

    public dispose()
    {
        this._horse = null;
        this._wife = null;
        this.posInfo = null;
        this._banishTime = null;
        this.id = 0;
        this._callbackF1 = null;
        this._callbackF2 = null;
        this._obj = null;
        this._backBtn = null;
        this._isShowed = false;
        this._tipContainer = null;
        this._dayTxt = null;
        this._index = 0;
        this._nowCode = 1;
        super.dispose();
    }
}