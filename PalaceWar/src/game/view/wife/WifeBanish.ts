
class WifeBanish extends BaseDisplayObjectContainer 
{
    private _scrollContiner:BaseDisplayObjectContainer=null;
    private _carriageNum:BaseTextField = null;
    private _remainNum:BaseTextField = null;
    private _addBtn:BaseButton = null;

    private _carriageTab:WifeBanishCarriage[] = [];

    private _clickPos:number = 0;
    private _clickWife:string = "";

    public constructor() 
	{
		super();
	}

    public init():void
	{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_BANISH,this.banishCallBack,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_BUYBANISHPOS,this.buyCarriageCallback,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WIFE_FINISH,this.finishBanishCallBack,this);

        let topBg:BaseBitmap = BaseBitmap.create("forpeople_top");
        topBg.setPosition(0,-15);
        this.addChild(topBg);

        let numBg:BaseBitmap = BaseBitmap.create("public_9_bg59");
        numBg.width = 162;
        numBg.setPosition(10,0);
        this.addChild(numBg);

        this._carriageNum = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._carriageNum.setPosition(16,numBg.y+6);
        this.addChild(this._carriageNum);

        this._addBtn = ComponentManager.getButton("btn_common_add",null,this.addHandle,this);
        this._addBtn.setPosition(175,numBg.y-2);
        this.addChild(this._addBtn);

        if (Config.BanishCfg.getMaxUnit()<= Api.wifebanishVoApi.getPosNum())
        {
            this._addBtn.visible = false;
        }
       

        let limitation:number = Config.BanishCfg.getLimitation();
        let desc1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("banishNumTip1",[String(limitation)]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
        desc1.setPosition(GameConfig.stageWidth-50-desc1.width,-8);
        this.addChild(desc1);

        this._remainNum = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._remainNum.y=desc1.y+desc1.height+5;
        this.addChild(this._remainNum);

         this.resetCarriageNum();

        this._scrollContiner = new BaseDisplayObjectContainer();
        let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,45,GameConfig.stageWidth,GameConfig.stageHeigth-150);

       

        let scrollView = ComponentManager.getScrollView(this._scrollContiner,rect);
        scrollView.name = `scrollView`;
		this.addChild(scrollView);

         let line:BaseBitmap = BaseBitmap.create("dinner_line");
        line.setPosition(0,45-line.height);
        this.addChild(line);
        
        
        scrollView.bounces = false;

        let house:BaseBitmap = BaseBitmap.create("banish_house");
        this._scrollContiner.addChild(house);

        let num = Config.BanishCfg.getMaxUnit();
        num += Api.wifebanishVoApi.getTotalPosNum();
        let maxUnit:number = num;
        let floorNum:number = Math.ceil(maxUnit/2);
        
        for (let i:number=0; i<floorNum; i++)
        {
            let floorTile:BaseBitmap = BaseBitmap.create("banish_floor");
            floorTile.y = house.height + floorTile.height*i;
            this._scrollContiner.addChild(floorTile);
        }
        
        let posNum:number = Api.wifebanishVoApi.getTotalPosNum();
        for (let i:number=1; i<=posNum; i++)
        {
            let carriage:WifeBanishCarriage = new WifeBanishCarriage();
            carriage.init(i,this.goToBanish,this.goHome,this);
            carriage.setPosition((i-1)%2*352,180+Math.floor((i-1)/2)*188);
            this._scrollContiner.addChild(carriage);
            this._carriageTab.push(carriage);

            let vo = Api.wifebanishVoApi.getBanishInfoVo(carriage.id);
            if (vo)
            {
                carriage.setWife(vo);
            }
            else
            {
                carriage.setHorse();
            }
        }

    }

    private goToBanish(id:number, index:number, code:string):void
    {   
        let curNum:number = Api.wifebanishVoApi.getBanishNum();
        if (Api.wifeVoApi.getWifeNum()-Config.BanishCfg.getLimitation() -curNum <=0)
        {   
            App.CommonUtil.showTip(LanguageManager.getlocal("banish_beyond_tip",[String(Config.BanishCfg.getLimitation())]));
            return;
        }
        let totalnum = Api.wifebanishVoApi.getTotalPosNum();
        let vo = <AcBattlePassVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, code);
        if(id > Api.wifebanishVoApi.getPosNum() && vo && !vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("servantExileSelectServantPopupViewShowTip4"));
            return;
        }

        this._clickPos = index;
        this.param = id;
        ViewController.getInstance().openView(ViewConst.POPUP.BANISHCHOOSEPOPUPVIEW,{f:this.goToBanishCallback,o:this});
    }

    private goToBanishCallback(wife:string):void
    {
        
        NetManager.request(NetRequestConst.REQUEST_WIFE_BANISH,{wifeId:wife,pos:this.param});
    }

    private goHome(id:number,wife:string,index:number):void
    {   

        let days:number = Math.ceil((this._carriageTab[index-1].posInfo.et - GameData.serverTime)/86400);
        let needNum = Config.BanishCfg.getUnitGem()*days;
        let wifecfg = Config.WifeCfg.getWifeCfgById(wife);
        let message = LanguageManager.getlocal("banish_callback",[(wifecfg.name),String(needNum)]);
		let mesObj = {
			 confirmCallback: this.goHomeCallback, 
			 handler: this, 
			 icon:  "itemicon1",
			 iconBg: "itembg_1", 
			 num: Api.playerVoApi.getPlayerGem(), 
             useNum:needNum,
             msg: message ,
             id : 1,
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );

        this._clickWife = wife;
        this._clickPos = index;
    }

    private param = 0;

    private goHomeCallback():void
    {
         NetManager.request(NetRequestConst.REQUEST_WIFE_FINISH,{wifeId:this._clickWife});
    }

    private resetCarriageNum():void
    {   
        let curNum:number = Api.wifebanishVoApi.getBanishNum();
        let totalNum:number = Api.wifebanishVoApi.getTotalPosNum();
        this._carriageNum.text=LanguageManager.getlocal("banishCarriageNum",[String(curNum),String(totalNum)]);

        let num:number = Api.wifeVoApi.getWifeNum()-curNum;

        this._remainNum.text = LanguageManager.getlocal("banishNumTip2",[String(num)]);
        this._remainNum.x = GameConfig.stageWidth-50-this._remainNum.width;
        
        for (let i:number=0; i<this._carriageTab.length; i++)
        {
            this._carriageTab[i].setIsShowTip(num>0);
        }
    }

    private addHandle():void
    {   
        let needNum = Config.BanishCfg.getSeatCost(String(Api.wifebanishVoApi.getPosNum()));

		let message = LanguageManager.getlocal("banish_buyCarriage",[String(needNum)]);
		let mesObj = {
			 confirmCallback: this.buyCarriageHandler, 
			 handler: this, 
			 icon:  "itemicon1",
			 iconBg: "itembg_1", 
			 num: Api.playerVoApi.getPlayerGem(), 
             useNum:needNum,
             msg: message ,
             id : 1,
		};
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,mesObj );
        
    }

    private buyCarriageHandler():void
    { 
        // NetManager.request(NetRequestConst.REQUEST_WIFE_BANISH,{wifeId:"101",pos:"1"});
         NetManager.request(NetRequestConst.REQUEST_WIFE_BUYBANISHPOS,{});
    }

    private buyCarriageCallback(event:egret.Event):void
    { 
        let ret = event.data.ret
		if(ret)
		{   
            if (Config.BanishCfg.getMaxUnit()<= Api.wifebanishVoApi.getPosNum())
            {
                this._addBtn.visible = false;
            }
            // let i:number = Api.wifebanishVoApi.getPosNum();
            // let carriage:WifeBanishCarriage = new WifeBanishCarriage();
            // carriage.init(i,this.goToBanish,this.goHome,this);
            // carriage.setPosition((i-1)%2*352,180+Math.floor((i-1)/2)*188);
            // this._scrollContiner.addChild(carriage);
            // this._carriageTab.push(carriage);
            // carriage.setHorse();

        this._scrollContiner.dispose();
        this._scrollContiner = null;

        this._carriageTab = [];


        this._scrollContiner = new BaseDisplayObjectContainer();
        let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,45,GameConfig.stageWidth,GameConfig.stageHeigth-150);

        let tmp = <BaseDisplayObjectContainer>this.getChildByName(`scrollView`);
        if(tmp){
            tmp.dispose();
            tmp = null;
        }

        let scrollView = ComponentManager.getScrollView(this._scrollContiner,rect);
        scrollView.name = `scrollView`;
		this.addChild(scrollView);        
        
        scrollView.bounces = false;
        let house:BaseBitmap = BaseBitmap.create("banish_house");
        this._scrollContiner.addChild(house);

        let num = Config.BanishCfg.getMaxUnit();
        num += Api.wifebanishVoApi.getTotalPosNum();
        let maxUnit:number = num;
        let floorNum:number = Math.ceil(maxUnit/2);
        
        for (let i:number=0; i<floorNum; i++)
        {
            let floorTile:BaseBitmap = BaseBitmap.create("banish_floor");
            floorTile.y = house.height + floorTile.height*i;
            this._scrollContiner.addChild(floorTile);
        }
        
        let posNum:number = Api.wifebanishVoApi.getTotalPosNum();
        for (let i:number=1; i<=posNum; i++)
        {
            let carriage:WifeBanishCarriage = new WifeBanishCarriage();
            carriage.init(i,this.goToBanish,this.goHome,this);
            carriage.setPosition((i-1)%2*352,180+Math.floor((i-1)/2)*188);
            this._scrollContiner.addChild(carriage);
            this._carriageTab.push(carriage);

            let vo = Api.wifebanishVoApi.getBanishInfoVo(carriage.id);
            if (vo)
            {
                carriage.setWife(vo);
            }
            else
            {
                carriage.setHorse();
            }
        }

            this.resetCarriageNum();
            App.CommonUtil.showTip(LanguageManager.getlocal("banish_buyCarriage_tip"));
        }
    }

    private banishCallBack(event:egret.Event):void
    { 
        let ret = event.data.ret
		if(ret)
		{   
            this.resetCarriageStatusByIndex(this._clickPos);
            this.resetCarriageNum();
            this.horseGo(this._clickPos);
        }
    }

    private finishBanishCallBack(event:egret.Event):void
    { 
        let ret = event.data.ret
		if(ret)
		{   
            
            this.resetCarriageNum();
            this.horseBack(this._clickPos);
            App.CommonUtil.showTip(LanguageManager.getlocal("banish_back_tip"));
        }
    }

    private resetCarriageStatusByIndex(i:number):void
    {   
        let carriage:WifeBanishCarriage = this._carriageTab[i-1];
        let vo = Api.wifebanishVoApi.getBanishInfoVo(carriage.id);
        if (vo && vo.et >= GameData.serverTime)
        {
            carriage.setWife(vo);
        }
        else
        {
            carriage.setHorse();
        }
    }

    private horseGo(i:number):void
    {   
        App.CommonUtil.showTip(LanguageManager.getlocal("banish_go_tip"));

        let oneHorse:BaseBitmap = BaseBitmap.create("banish_go_1");
        let horseClip:CustomMovieClip = ComponentManager.getCustomMovieClip("banish_go_",6);
		horseClip.frameRate = 100;
        horseClip.setPosition(GameConfig.stageWidth/2-oneHorse.width/2+5,this._carriageTab[i-1].y);
		this._scrollContiner.addChild(horseClip);
        horseClip.playWithTime(0);
        
        let time:number = (this._scrollContiner.height  - horseClip.y - oneHorse.height)*10;
        
        egret.Tween.get(horseClip).wait(100).call(function(){
            horseClip.stop();
        }).wait(900).call(function(){
            horseClip.playWithTime(0);
        }).to({y:this._scrollContiner.height- oneHorse.height},time).call(function(){
            horseClip.dispose();
        });
        BaseBitmap.release(oneHorse);
    }

    private horseBack(i:number):void
    {   
        this._carriageTab[i-1].goBack();
        let oneHorse:BaseBitmap = BaseBitmap.create("banish_back_1");
        let horseClip:CustomMovieClip = ComponentManager.getCustomMovieClip("banish_back_",6);
		horseClip.frameRate = 100;
        horseClip.setPosition(GameConfig.stageWidth/2-oneHorse.width/2+5,this._scrollContiner.height- oneHorse.height);
		this._scrollContiner.addChild(horseClip);
        horseClip.playWithTime(0);
        
        let that = this;
        let time:number = (horseClip.y-this._carriageTab[i-1].y)*10;
        egret.Tween.get(horseClip).to({y:this._carriageTab[i-1].y},time).call(function(){
            horseClip.stop();
        }).wait(1000).call(function(){
            horseClip.dispose();
            that.resetCarriageStatusByIndex(i);
           
        });
        BaseBitmap.release(oneHorse);
    }

    public tick():void
    {
        for (let i:number=0; i<this._carriageTab.length; i++)
        {
            if (this._carriageTab[i].refreshTime())
            {   
                this.horseBack(i+1);
                App.CommonUtil.showTip(LanguageManager.getlocal("banish_back_tip"));
            }
        }
    }

    public dispose():void
	{	
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_BANISH,this.banishCallBack,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_BUYBANISHPOS,this.buyCarriageCallback,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WIFE_FINISH,this.finishBanishCallBack,this);

        this._scrollContiner = null;
        this._carriageNum = null;
        this._addBtn = null;
        this._carriageTab.length = 0;
        this._clickPos = 0;
        this._clickWife = "";
        this._remainNum = null;

		super.dispose();
	}
}