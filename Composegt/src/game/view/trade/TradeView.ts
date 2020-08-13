/**
 * 贸易
 * author yanyuling
 * date 2018/01/04
 * @class TradeView
 */
class TradeView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _nodeContainer2:BaseDisplayObjectContainer;
    private _rewardNodeContainer:BaseDisplayObjectContainer;
    private _curTradeNameTxt:BaseTextField;
    private _tradeArrow:BaseBitmap;

    private _bg1:BaseDisplayObjectContainer;
    private _bg2:BaseDisplayObjectContainer;
    private _curTopBg:BaseDisplayObjectContainer;
    private _nextTopBg:BaseDisplayObjectContainer;
    private _shipImg:BaseDisplayObjectContainer;
    private _shipImgAnim1:CustomMovieClip;
    private _shipImgAnim2:CustomMovieClip;
    private _shipImg1:BaseBitmap;
    private _shipImg2:BaseBitmap;
    private _preCid:number = 0;
    private _lastNameCid:number = 0;
    private _bgW:number= 1280;
    private _lastTradeName:string ="";
    private _lastTradeGold:number = 0;
    private _lastTradeInte:number = 0;
    private _laseIdStr:string ='';
    private _btomY:number = 0;
    private _shipMoving:boolean = false;

    private shipCfg = [
        {
            id:0,
            shipid:2,
            portid:1,
            portPosX:987,
            portPosY:1136 - 326- 170,
            shipPosX:920,
            shipPosY:617

        },
        {
            id:1,
            shipid:1,
            portid:2,
            portPosX:774,
            portPosY:1136 - 600- 170,
            shipPosX:780,
            shipPosY:457

        },
        {
            id:2,
            shipid:2,
            portid:3,
            portPosX:650,
            portPosY:1136 - 346- 170,
            shipPosX:570,
            shipPosY:607

        },
        {
            id:3,
            shipid:1,
            portid:4,
            portPosX:347,
            portPosY:1136 - 648- 170,
            shipPosX:420,
            shipPosY:437

        },
        {
            id:4,
            shipid:2,
            portid:5,
            portPosX:168,
            portPosY:1136 - 326- 170,
            shipPosX:190,
            shipPosY:582

        },        
        {
            id:5 ,
            shipid:1,
            portid:6,
            portPosX:10,
            portPosY:1136 - 584 - 170,
            shipPosX:0,
            shipPosY:462

        },
    ];
    private shipNumPerPage = this.shipCfg.length;
    private  lastGoldNum:number =0;
    private _flag:number =0;
    private _batchBtn:BaseButton =null;
    
    public constructor() 
    {
		super();
	}

    public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_INDEX),this.indexInterfaceCallBack,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_FIGHT),this.refreshAfterTrade,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_BATCHFIGHT),this.refreshAfterTrade,this);
        
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_TRADE_AFTER_FIGHT,this.refreshTradeInfoAfterFight,this);

        // NetManager.request(NetRequestConst.REQUEST_TRADE_INDEX,{});

        this._nodeContainer = new  BaseDisplayObjectContainer();
        this._nodeContainer.x 
        this._nodeContainer.width = 2560;//1280;
        this._nodeContainer.height = 1136;
        this._nodeContainer.name = "node--->";
        this._nodeContainer.y =  - this.container.y - (1136 - GameConfig.stageHeigth);
		this.addChildToContainer(this._nodeContainer);
        this._nodeContainer2 = new  BaseDisplayObjectContainer();
        

        let bg = BaseLoadBitmap.create("trade_bg1");
        bg.width = 1280;
        bg.height = 1136;
        let bg2 = BaseLoadBitmap.create("trade_bg1");
        bg2.width = 1280;
        bg2.height = 1136;
        this._bg1 = new BaseDisplayObjectContainer();
        this._bg1.name = "bg1";
        this._bg1.width = bg.width;
        this._bg1.height = bg.height;
        this._bg1.addChild(bg);

        this._bg2 = new BaseDisplayObjectContainer();
        this._bg2.name = "bg2";
        this._bg2.width = bg2.width;
        this._bg2.height = bg2.height;
        this._bg2.addChild(bg2);

        this._curTopBg = this._bg1;
        this._nextTopBg = this._bg2;

        this._nodeContainer.addChild(this._bg2);
        this._nodeContainer.addChild(this._bg1);
        
        
        this._tradeArrow = BaseBitmap.create("trade_arrow");
        this._tradeArrow.anchorOffsetY = this._tradeArrow.height;
        this._tradeArrow.anchorOffsetX = this._tradeArrow.width/2;
        this._nodeContainer.addChild(this._tradeArrow);
        for (let index = 0; index < this.shipNumPerPage * 2; index++) {
            let id = index % this.shipNumPerPage;
      
            let cfg = this.shipCfg[id];
            id = id + 1;
            let portImg = BaseLoadBitmap.create("trade_port"+ cfg.portid);
            portImg.width = 293;
            portImg.height = 170;
            portImg.x = cfg.portPosX;
            portImg.y = cfg.portPosY;
            if(index == 0)
            {

                this._shipImg = new BaseDisplayObjectContainer();
                this._shipImg.width = 154;
                this._shipImg.height = 154;
                this._shipImg.x = cfg.shipPosX;
                this._shipImg.y = cfg.shipPosY;
                this._nodeContainer.addChild(this._shipImg);

                this._shipImgAnim1 = ComponentManager.getCustomMovieClip("trade_carriage1_", 4, 120);
                this._shipImgAnim1.name = "shipImgAnim1";
                this._shipImgAnim1.visible = false;
                this._shipImgAnim1.playWithTime(-1);
                this._shipImg.addChild(this._shipImgAnim1);

                this._shipImgAnim2 = ComponentManager.getCustomMovieClip("trade_carriage2_", 4, 120);
                this._shipImgAnim2.name = "shipImgAnim2";                
                this._shipImgAnim2.visible = false;
                this._shipImgAnim2.playWithTime(-1);
                this._shipImg.addChild(this._shipImgAnim2);

                this._shipImg1 = BaseBitmap.create("trade_carri1");
                this._shipImg1.name = "_shipImg1";
                this._shipImg1.visible = false;
                this._shipImg.addChild(this._shipImg1);

                this._shipImg2 = BaseBitmap.create("trade_carri2");
                this._shipImg2.name = "shipImg2";
                this._shipImg2.visible = false;
                this._shipImg.addChild(this._shipImg2);

            }
            portImg.name = "portImg"+id;

            let namebg = BaseBitmap.create("trade_namebg");
			// namebg.width = 160;
            namebg.x = portImg.x + 50;
            namebg.y = portImg.y + 50;
            namebg.name = "namebg"+id;
           

            

            let nameTxt = ComponentManager.getTextField("",20);

            
            nameTxt.multiline = true;
            nameTxt.x = portImg.x + 147;
            nameTxt.y = portImg.y + 40;
            nameTxt.name = "nameTxt"+id;
            if(index < this.shipNumPerPage)
            {
                this._bg1.addChild(portImg);
                this._bg1.addChild(namebg);
                this._bg1.addChild(nameTxt);
            }else{
                this._bg2.addChild(portImg);
                this._bg2.addChild(namebg);
                this._bg2.addChild(nameTxt);
            }
        }
         
        if(!Api.switchVoApi.checkOpenShenhe())
		{
              this.makeRankBtn();
        }
      
        let bottomBg = BaseLoadBitmap.create("public_9_wordbg");
        bottomBg.height= 312;
        bottomBg.y = GameConfig.stageHeigth - this._nodeContainer2.y - bottomBg.height - this.container.y;
        this._nodeContainer2.addChild(bottomBg);
        this._btomY = bottomBg.y;

        
        this._curTopBg.x = 1280;
        // this._curTopBg.y = GameConfig.stageHeigth - this._bottomBg.y - 1136 + 200;
        this._nextTopBg.x = 0;
        // this._nextTopBg.y = this._curTopBg.y;


        let bottomBg2 = BaseBitmap.create("public_biaotinew");
        // bottomBg2.width = GameConfig.stageWidth;
        // bottomBg2.height= 62;
        bottomBg2.width = GameConfig.stageWidth + 80;
        bottomBg2.x = GameConfig.stageWidth / 2 - bottomBg2.width/2;
        bottomBg2.y = bottomBg.y + 15;
        this._nodeContainer2.addChild(bottomBg2);

        let rewardBg = BaseBitmap.create("public_9v_bg10");
        rewardBg.width = 614;
        rewardBg.height = 109;
        rewardBg.x = GameConfig.stageWidth / 2 - rewardBg.width/2;
        rewardBg.y = bottomBg.y + 110;
        this._nodeContainer2.addChild(rewardBg);
        
       
        this._curTradeNameTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._curTradeNameTxt.x = bottomBg2.x + 110;
        this._curTradeNameTxt.y = bottomBg2.y + bottomBg2.height/2 - 11;
        this._nodeContainer2.addChild(this._curTradeNameTxt);

        let getTipTxt =  ComponentManager.getTextField(LanguageManager.getlocal("conquestGetItem"),22,0xe6caac);
        getTipTxt.x = 40;
        getTipTxt.y = bottomBg2.y + 56;
        this._nodeContainer2.addChild(getTipTxt);
        this._rewardNodeContainer =  new  BaseDisplayObjectContainer();
		this._rewardNodeContainer.x = bottomBg.x;
        this._rewardNodeContainer.y = bottomBg.y;
        this._nodeContainer2.addChild(this._rewardNodeContainer);
        let isBatch = Api.tradeVoApi.isBatchEnable();
        if(!isBatch)
        {
            let tipTxt =  ComponentManager.getTextField(LanguageManager.getlocal("tradeBatchTip"),22,0xe6caac);
            tipTxt.x = 30;
            tipTxt.y = bottomBg.y + bottomBg.height - 60;
            tipTxt.name = "tipTxt";
            this._nodeContainer2.addChild(tipTxt);
        }
        
        let batchBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"tradeBatchBtn",this.batchHandler,this);
        batchBtn.x = GameConfig.stageWidth/2 - batchBtn.width - 50;
        batchBtn.y = bottomBg.y + bottomBg.height - 80;
        this._batchBtn = batchBtn;
        batchBtn.visible = isBatch;
        this._nodeContainer2.addChild(batchBtn);
        
        let tradeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"tradeBtn",this.tradeBtnHandler,this);
        tradeBtn.x = GameConfig.stageWidth/2 + 50;
        tradeBtn.y = batchBtn.y;
        this._nodeContainer2.addChild(tradeBtn);

        let resCfg=[


            {
                icon:"trade_zhi",
                posx:360,
                posy:0,
                num: Api.playerVoApi.getInte()
            },
            {
                icon:"public_icon2",
                posx:150,
                posy:0,
                num: Api.playerVoApi.getPlayerGoldStr()
            },


            {
                icon:"trade_zhi",
                posx:460,
                posy:bottomBg2.y + bottomBg2.height/2  -14,
                num:""
            },
            {
                icon:"public_icon2",
                posx:315,
                posy:bottomBg2.y + bottomBg2.height/2  -14,
                num:""
            },
        ]
        for (var index = 0; index < resCfg.length; index++) {
            let tmpcfg = resCfg[index];
            let resbg=BaseBitmap.create("public_hb_bg01");
            resbg.x = tmpcfg.posx;
            resbg.y = tmpcfg.posy;
            this._nodeContainer2.addChild(resbg);

            let resIcon:BaseBitmap=BaseBitmap.create(tmpcfg.icon);
            resIcon.x = resbg.x-15;
            resIcon.y = resbg.y +resbg.height/2 - resIcon.height/2;
            this._nodeContainer2.addChild(resIcon);
            
            let numTxt=ComponentManager.getTextField(String(tmpcfg.num),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
            numTxt.x = resIcon.x + resIcon.width + 0;
            numTxt.y = resbg.y + resbg.height/2 - numTxt.height/2 ;
            this._nodeContainer2.addChild(numTxt);
            numTxt.name = "numTxt"+index;
            if(index > 1)
            {
                // numTxt.setPosition(resIcon.x + resIcon.width,resIcon.y+15);
                resIcon.setScale(0.7);
                resIcon.y = resbg.y +resbg.height/2 - resIcon.height * resIcon.scaleY/2;
                numTxt.x = resIcon.x + resIcon.width;
                numTxt.y = resbg.y + resbg.height/2 - 10 ;
                resbg.visible = false;
                numTxt.textColor = TextFieldConst.COLOR_WHITE;
            }
        }

        let mask = BaseBitmap.create("public_9v_bg10");
        mask.width = GameConfig.stageWidth;
        mask.height = 56
        mask.y = -15;
        this.addChildToContainer(mask);
        this.addChildToContainer(this._nodeContainer2);

        this.lastGoldNum=Api.playerVoApi.getPlayerGold();
       
        this.setBatchInfo(true);
         
        this.refreshTradeInfo(); 
        
        this.refreshBaseInfo();
        
    }
    protected makeRankBtn()
    {
        // let forpeople_bottom = BaseBitmap.create("forpeople_bottom");
        // forpeople_bottom.x = 5;
        // forpeople_bottom.y = 50;
        // this._nodeContainer2.addChild(forpeople_bottom);

        let rankBtn = ComponentManager.getButton("trade_tanlBtn","",this.rankBtnHandler,this);
        rankBtn.x = 5; //forpeople_bottom.x + forpeople_bottom.width/2 - rankBtn.width/2+8;
        rankBtn.y = 50;//forpeople_bottom.y + forpeople_bottom.height/2 - rankBtn.height/2;
        this._nodeContainer2.addChild(rankBtn);
        
    }
    protected setBatchInfo(isInit?:boolean)
    {
        let cid =   Number(Api.tradeVoApi.getCurrentCid());
        if(isInit || cid - this._preCid > 1)
        {
            // this._bg1.y = 0;
            // this._bg2.y = this._bgW;
            this._bg1.x = 1280;
            this._bg2.x = 0;
            this._curTopBg = this._bg1;
            this._nextTopBg = this._bg2;

            this._nodeContainer.x = 640 - 2560;
            this._tradeArrow.x = 0;
            this._shipImg.x = 0;

            let curIdx = (cid-1) % this.shipNumPerPage;

            let maxCid = Config.TradeCfg.getMaxTradeIndex();
            if(cid > maxCid)
            {
                cid = maxCid;
            } 
            this._lastNameCid = Math.floor((cid-curIdx)/this.shipNumPerPage)*this.shipNumPerPage ;
        }
    }
    
    protected refreshTradeInfo()
    {
        this.setBatchInfo();
        let cid =   Number(Api.tradeVoApi.getCurrentCid());
        // cid = this.test;
        
        // this.test ++;
        // if(this.test == 26){
        //     this.test = 25;
        // }

        let maxCid = Config.TradeCfg.getMaxTradeIndex();
        if(cid-1 == maxCid)
        {
           cid = maxCid;
        }
        let tradeCfg =  <Config.TradeItemCfg>Config.TradeCfg.getTradeCfgById(String(cid));

        if(tradeCfg == null)
        {
            return;
        }
       
        let numTxt2 = <BaseTextField>this._nodeContainer2.getChildByName("numTxt2");
        let numTxt3 = <BaseTextField>this._nodeContainer2.getChildByName("numTxt3");
        numTxt2.text = App.StringUtil.changeIntToText(tradeCfg.tradeInte);
        numTxt3.text = App.StringUtil.changeIntToText(tradeCfg.tradeGold);
        
        this._curTradeNameTxt.text = cid + " . " + tradeCfg.tradeName;
        this._lastTradeName =tradeCfg.tradeName;
        this._lastTradeGold =tradeCfg.tradeGold;
        this._lastTradeInte = tradeCfg.tradeInte;
        this._rewardNodeContainer.removeChildren();
        let rewards:string[] = Api.tradeVoApi.getCurrentRewards();
        if(rewards.length > 0)
        {
            let rewarsStr = rewards.join("|");
            let rewardArr = GameData.getRewardItemIcons(rewarsStr,true);
      
            let scaleV = 0.80;
            for (var index = 0; index < rewardArr.length; index++) {
                let icon = rewardArr[index];
                icon.setScale(scaleV);
                icon.x = 25 + (icon.width*scaleV+10) *index;
                icon.y = 122;
                this._rewardNodeContainer.addChild(icon);
            }
        }
        
        let isShowAni:boolean = true;
        let tmpId = (cid-2) % this.shipNumPerPage ;
        if(tmpId == -1){
            tmpId = 0;
        }
        let tmpIdpre = (cid-1) % this.shipNumPerPage ;
        if(this._preCid == 0 ||  cid - this._preCid > 1) //首次打开
        {
            isShowAni = false;
            this._preCid = cid;
            if(tmpIdpre == 0 && cid > 1)
            {
                this._curTopBg = this._bg2;
                this._nextTopBg = this._bg1;
            }
        }
        
        let cfg = this.shipCfg[tmpId];
        let cfgpre = this.shipCfg[tmpIdpre];



        /**
         * 需要移动
         */
        let deltaX = 0;
        let tarPosX = GameConfig.stageWidth/2;

        let initX = 0;


        if(tarPosX > cfgpre.portPosX % 640){
            deltaX = (tarPosX - cfgpre.portPosX % 640)
        }
        if(cfgpre.portPosX < 640){
            initX = deltaX + 640;
        } else {
            initX = deltaX;
        }

        switch(cfgpre.shipid){
            case 1:
                this._shipImg1.visible = true;
                this._shipImg2.visible = false;
                break;
            case 2:
                this._shipImg1.visible = false;
                this._shipImg2.visible = true;
                break;

        }
     
        


        if(!isShowAni)
        {
            

            egret.Tween.removeTweens(this._tradeArrow);
            this._tradeArrow.x = this._curTopBg.x + cfgpre.portPosX+147;
            this._tradeArrow.y = this._curTopBg.y + cfgpre.portPosY+10;
            egret.Tween.get(this._tradeArrow,{loop:true}).to({y:this._tradeArrow.y+30},1000).to({y:this._tradeArrow.y},1000);
        
            this._shipImg.y =  cfgpre.shipPosY;
            this._shipImg.x = this._curTopBg.x + cfgpre.shipPosX;
         
            this._nodeContainer.x += initX ;
            if(cfgpre.portPosX > cfg.portPosX){
                this._nodeContainer.x += 1280;
            }
            
            this.refreshNameTxt(true);
            // this.refreshnameBg(tmpId);
            this._preCid = cid;
            return;
        }

        let isAtNextBg = false;

        if(cfgpre.portPosX > cfg.portPosX){
            isAtNextBg = true;
            let tmpBg = this._curTopBg;
            this._curTopBg = this._nextTopBg;
            this._nextTopBg = tmpBg;


            deltaX = cfg.portPosX + 1280 - cfgpre.portPosX; 
        } else {
            deltaX = cfg.portPosX - cfgpre.portPosX; 
        }

        this._preCid = cid;
        


        
        let tmpthis = this;
        let moveT = 1000;
        let moveT2 = moveT;
      

         
        // this._shipImg.texture = ResourceManager.getRes("trade_ship"+ cfg.shipid);

        switch(cfgpre.shipid){
            case 1:
                this._shipImg1.visible = false;
                this._shipImg2.visible = false;
                this._shipImgAnim1.visible = true;
                this._shipImgAnim2.visible = false;
               
                break;
            case 2:
                this._shipImg1.visible = false;
                this._shipImg2.visible = false;
                this._shipImgAnim1.visible = false;
                this._shipImgAnim2.visible = true;
            
                break;

        }

        this._shipMoving = true;
        let shipMoveX = this._curTopBg.x  + cfgpre.shipPosX;



        egret.Tween.get(this._shipImg,{loop:false}).to({x:  shipMoveX,y:cfgpre.shipPosY},moveT2).call( ()=>{
            tmpthis._shipMoving = false;
            switch(cfgpre.shipid){
                case 1:
                    this._shipImg1.visible = true;
                    this._shipImg2.visible = false;
                    this._shipImgAnim1.visible = false;
                    this._shipImgAnim2.visible = false;
                  
                    break;
                case 2:
                    this._shipImg1.visible = false;
                    this._shipImg2.visible = true;
                    this._shipImgAnim1.visible = false;
                    this._shipImgAnim2.visible = false;
                
                    break;

            }
        },this);
        let nodeMoveX = this._nodeContainer.x+deltaX;
        egret.Tween.get(this._nodeContainer,{loop:false}).to({x:nodeMoveX},moveT).call(()=>{
            
            let isMoveBg = false;
            if(this._curTopBg.x < this._nextTopBg.x && cfgpre.portPosX < 1280 - 640){
                isMoveBg = true;
            }


            if(isMoveBg)// && cid < 198)
            {
                
                if(tmpthis._bg1.x > tmpthis._bg2.x)
                {
                    tmpthis._bg1.x -= tmpthis._bgW*2;

                }else{
                    tmpthis._bg2.x -= tmpthis._bgW*2;

                }
                tmpthis.refreshNameTxt();
            }
                tmpthis._nodeContainer.swapChildren(tmpthis._curTopBg,tmpthis._nextTopBg)
                egret.Tween.removeTweens(tmpthis._tradeArrow);
                tmpthis._tradeArrow.x = tmpthis._curTopBg.x + cfgpre.portPosX+147;
                tmpthis._tradeArrow.y = tmpthis._curTopBg.y + cfgpre.portPosY+10;
                egret.Tween.get(tmpthis._tradeArrow,{loop:true}).to({y:tmpthis._tradeArrow.y+30},1000).to({y:tmpthis._tradeArrow.y},1000);
                
        },this);








    


        /*
        let deltaX = 0;
        let tarPosX = GameConfig.stageWidth/2 ;

        // if((this._curTopBg.x + 1280 - cfg.shipPosX) % GameConfig.stageWidth > tarPosX ){
        //     // deltaX = tarPosX - (this._curTopBg.x + cfg.shipPosX) % GameConfig.stageWidth ;
        //     deltaX = (this._curTopBg.x + 1280 - cfg.shipPosX) % GameConfig.stageWidth - tarPosX 
        // }





        


        // if( this._curTopBg.x + cfg.shipPosX > tarPosX)
        // {
        //     deltaX = cfg.shipPosY + this._curTopBg.y - tarPosX ;
        // }
        this._shipImg.texture = ResourceManager.getRes("trade_ship"+ cfg.shipid);
        if(!isShowAni)
        {
            egret.Tween.removeTweens(this._tradeArrow);
            this._tradeArrow.x = this._curTopBg.x + cfg.portPosX+104;
            this._tradeArrow.y = this._curTopBg.y + cfg.portPosY+30;
            egret.Tween.get(this._tradeArrow,{loop:true}).to({y:this._tradeArrow.y+30},1000).to({y:this._tradeArrow.y},1000);
        
            this._shipImg.y =  cfg.shipPosY;
            this._shipImg.x = this._curTopBg.x + cfg.shipPosX;
            this._shipImg.visible = true;
            this._nodeContainer.x += deltaX ;
            
            this.refreshNameTxt(true);
            // this.refreshnameBg(tmpId);
            this._preCid = cid;
            return;
        }
        let isAtNextBg = false;
        deltaX = cfgpre.shipPosX -cfg.shipPosX;
        if(deltaX <0)
        {
            deltaX += this._bgW;
            isAtNextBg = true;
        }
        let tmpPosX =  this._nodeContainer.x + deltaX ;
        this._shipImg.x = cfgpre.shipPosX;
        if (tmpPosX > 0)
            tmpPosX = 0;
        
        let isMoveBg = false;
        let tmpPort:BaseBitmap = undefined;

        this._preCid = cid;
        if(this._curTopBg.x < this._nextTopBg.x)
        {
            if(this._curTopBg.x + this._bgW + tmpPosX <= this.container.x-15)
            {
                isMoveBg = true;
                tmpPort = <BaseBitmap>this._curTopBg.getChildByName("portImg"+tmpId);
            }
        }else{
            if(this._nextTopBg.x + this._bgW + tmpPosX <= this.container.x-15)
            {
                isMoveBg = true;
                tmpPort = <BaseBitmap>this._nextTopBg.getChildByName("portImg"+tmpId);
            }
        }
        
        if(!isMoveBg){
            // this.refreshnameBg(tmpId,isAtNextBg);
            egret.Tween.removeTweens(this._tradeArrow);
            if(isAtNextBg)
            {
                this._tradeArrow.x = this._nextTopBg.x + cfg.portPosX+104;
                this._tradeArrow.y = this._nextTopBg.y + cfg.portPosY+30;
            }else{
                this._tradeArrow.x = this._curTopBg.x + cfg.portPosX+104;
                this._tradeArrow.y = this._curTopBg.y + cfg.portPosY+30;
            }
            this._nodeContainer.setChildIndex(this._tradeArrow,3);
            egret.Tween.get(this._tradeArrow,{loop:true}).to({y:this._tradeArrow.y+30},1000).to({y:this._tradeArrow.y},1000);
        
        }
        
        let tmpthis = this;
        let moveT = 10000*Math.abs(deltaX)/this._bgW;
        // let moveT2 = 5000*Math.abs(deltaY)/this._bgH;
        let moveT2 = moveT;
      
         * 现有问题:
         * 1.建筑背景选中状态不对
         * 2.一键贸易，次数较大时滑动有问题
         
        this._shipImg.texture = ResourceManager.getRes("trade_ship"+ cfg.shipid);
        this._shipMoving = true;
        egret.Tween.get(this._shipImg,{loop:false}).to({x:this._shipImg.x+deltaX,y:cfg.shipPosY},moveT2).call( ()=>{
             tmpthis._shipMoving = false;
        },this);
        egret.Tween.get(this._nodeContainer,{loop:false}).to({x:-tmpPosX},moveT).call(()=>{
            
            if(isMoveBg)// && cid < 198)
            {
                if(tmpthis._bg1.y < tmpthis._bg2.y)
                {
                    tmpthis._bg1.y += tmpthis._bgW*2;
                    tmpthis._curTopBg = tmpthis._bg2;
                    tmpthis._nextTopBg =  tmpthis._bg1;
                }else{
                    tmpthis._bg2.y += tmpthis._bgW*2;
                    tmpthis._curTopBg = tmpthis._bg1;
                    tmpthis._nextTopBg =  tmpthis._bg2;
                }
                tmpthis._nodeContainer.swapChildren(tmpthis._curTopBg,tmpthis._nextTopBg)
                egret.Tween.removeTweens(tmpthis._tradeArrow);
                tmpthis._tradeArrow.x = tmpthis._curTopBg.x + cfg.portPosX+104;
                tmpthis._tradeArrow.y = tmpthis._curTopBg.y + cfg.portPosY+30;
                egret.Tween.get(tmpthis._tradeArrow,{loop:true}).to({y:tmpthis._tradeArrow.y+30},1000).to({y:tmpthis._tradeArrow.y},1000);
                
                tmpthis.refreshNameTxt();
                // tmpthis.refreshnameBg(tmpId);
            }
            
        },this);
        */
    }

    protected refreshnameBg(tmpIdx:number,isAtNextBg?:boolean)
    {
        let bg_gray = "trade_namebg_gray";
        let bg_red = "trade_namebg_red";
        let cid =   Number(Api.tradeVoApi.getCurrentCid());
        for (var index = 1; index <= this.shipNumPerPage; index++) {
            let namebg = <BaseBitmap>this._curTopBg.getChildByName("namebg"+index);
            let  namebg2 = <BaseBitmap>this._nextTopBg.getChildByName("namebg"+index);
            if(!isAtNextBg)
            {
                if(this._curTopBg.y < this._nextTopBg.y)
                {
                    namebg2.texture = ResourceManager.getRes(bg_gray);
                }else{
                    namebg2.texture = ResourceManager.getRes(bg_red);
                }
                
                if(index > tmpIdx )
                {
                    namebg.texture = ResourceManager.getRes(bg_gray);
                }else{
                    namebg.texture = ResourceManager.getRes(bg_red);
                }
            }else{
                namebg.texture = ResourceManager.getRes(bg_red);
                if(index > tmpIdx )
                {
                    namebg2.texture = ResourceManager.getRes(bg_gray);
                }else{
                    namebg2.texture = ResourceManager.getRes(bg_red);
                }
            }
        }
    }

    protected refreshNameTxt(isFrist?:boolean)
    {
        let deltaValue = this.shipNumPerPage;
        
       for (var index = 1; index <= this.shipNumPerPage; index++) {
            let txt2 = <BaseTextField>this._nextTopBg.getChildByName("nameTxt"+index);
            let namebg2 =  <BaseBitmap>this._nextTopBg.getChildByName("namebg"+index);
            let portImg2 =  <BaseBitmap>this._nextTopBg.getChildByName("portImg"+index);

            if(isFrist)
            {
                let portImg1 =  <BaseBitmap>this._curTopBg.getChildByName("portImg"+index);
                let namebg1 =  <BaseBitmap>this._curTopBg.getChildByName("namebg"+index);
                let txt1 = <BaseTextField>this._curTopBg.getChildByName("nameTxt"+index);
                this.dealTradeName(txt1,namebg1,portImg1,this._lastNameCid+index);
                this.dealTradeName(txt2,namebg2,portImg2,this._lastNameCid+index + deltaValue);
            }else{
                this.dealTradeName(txt2,namebg2,portImg2,this._lastNameCid+index);
            }
        }
        if(isFrist){
            this._lastNameCid += this.shipNumPerPage*2;
        }else{
            this._lastNameCid += this.shipNumPerPage;
        }
    }
    protected dealTradeName(txt:BaseTextField,namebg:BaseBitmap,portImg:BaseBitmap,tmpId:number|string)
    {
        let maxCid = Config.TradeCfg.getMaxTradeIndex();
        /**
         * 超出范围，隐藏处理
         */
        if(tmpId > maxCid)
        {
            txt.visible = false;
            namebg.visible = false;
            portImg.visible = false;
        }
        txt.text = LanguageManager.getlocal("tradeName" + tmpId);
        txt.anchorOffsetX = txt.width/2;
        txt.anchorOffsetY = txt.height/2;

        namebg.width = txt.width + 20;
        namebg.anchorOffsetX = namebg.width/2;
        namebg.anchorOffsetY = namebg.height/2;
        namebg.x = txt.x;
        namebg.y = txt.y;
        
    }
    protected refreshBaseInfo()
    {
        let numTxt0 = <BaseTextField>this._nodeContainer2.getChildByName("numTxt0");
        let numTxt1 = <BaseTextField>this._nodeContainer2.getChildByName("numTxt1");
        numTxt0.text = App.StringUtil.changeIntToText(Api.playerVoApi.getInte());
        numTxt1.text = Api.playerVoApi.getPlayerGoldStr();
    }
    protected indexInterfaceCallBack(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret == 0)
        {
            if(rdata.data.trade._flag)
            {
                this._flag = rdata.data.trade._flag
            }
           //解锁一键商贸
            let isBatch = Api.tradeVoApi.isBatchEnable();
            let tipTxt = this._nodeContainer2.getChildByName("tipTxt");
            if(tipTxt){
                tipTxt.visible = !isBatch;
            }
            this._batchBtn.visible = isBatch;
        } 
    }
    
    protected refreshTradeInfoAfterFight()
    {
        let cid =   Number(Api.tradeVoApi.getCurrentCid());
         let maxCid = Config.TradeCfg.getMaxTradeIndex();
        if(cid <= maxCid ||(cid > maxCid && cid - this._preCid > 1))
        {
            this.refreshTradeInfo();
        } 
        
    }
    protected refreshAfterTrade(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret == 0)
        {   
            this.refreshBaseInfo();
            if(event.type== NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_BATCHFIGHT) ||Api.tradeVoApi.getCurrentTradeCfg())
            {
                NetManager.request(NetRequestConst.REQUEST_TRADE_INDEX,{});
            }
            var data:any ={};
            data.consumeGold = rdata.data.fightusegold;
            data.rdata =rdata;
          
            
            //一键商贸
            if(event.type== NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_BATCHFIGHT))
            {
                let lastTradeNum:number = Number(Api.tradeVoApi.getCurrentCid())-1;
                var str = LanguageManager.getlocal("tradeName"+lastTradeNum);
                data.tradeName = str;
                ViewController.getInstance().openView(ViewConst.COMMON.TRADEINFOPOPUPVIEW,data);
            }
            //商贸
            else
            {   
                data.rewards = rdata.rewards;//this._lastRewards;
                data.tradeName = this._lastTradeName;
                data.tradeGold = this._lastTradeGold;
                data.tradeInte = this._lastTradeInte;
                ViewController.getInstance().openView(ViewConst.COMMON.TRADEFIGHTVIEW,data);
            }
        }
    }

    public getRuleInfo()
    {
        return "tradeViewDesc";
    }
    
    protected rankBtnHandler()
    {
        ViewController.getInstance().openView(ViewConst.COMMON.TRADERANKLISTVIEW);
    }
    protected batchHandler()
    {
        if(this._shipMoving)
        {
            return;
        }
        if(Api.tradeVoApi.isBatchEnable() == false)
        {
            return;
        }
        let tradeCfg = Api.tradeVoApi.getCurrentTradeCfg();
        if(tradeCfg == null)
        // if(Config.TradeCfg.getMaxTradeIndex()+1 == Number(Api.tradeVoApi.getCurrentCid()))
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("tradeMaxIdxTip"));
            return;
        }
        if(Api.playerVoApi.getPlayerGold() <=0)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("tradeGoldTip1"));
            return
        }
        if(Api.tradeVoApi.getAttNum(Number(Api.tradeVoApi.getCurrentCid()))<= 0)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("tradeGoldTip2"));
            return
        }
        ViewController.getInstance().openView(ViewConst.POPUP.TRADEONEKEYPOPUPVIEW,{callback:this.callbackHandler,handler:this});
    }
    private callbackHandler(itemNum:number)
	{   
        let currId:number =Number(Api.tradeVoApi.getCurrentCid());
		let carNum = currId+ itemNum;
        NetManager.request(NetRequestConst.REQUEST_TRADE_BATCHFIGHT,{cid:carNum});
	}
    protected tradeBtnHandler()
    {
        if(this._shipMoving)
        {
            return;
        }
        if(Api.playerVoApi.getPlayerGold() <=0)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("tradeGoldTip1"));
            return
        }
        let tradeCfg = Api.tradeVoApi.getCurrentTradeCfg();
        if(tradeCfg == null)
        // if(Config.TradeCfg.getMaxTradeIndex()+1 == Number(Api.tradeVoApi.getCurrentCid()))
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("tradeMaxIdxTip"));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_TRADE_FIGHT,{});

    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([

            // "trade_bg","forpeople_bottom","trade_tanlBtn","trade_tanlBtn_down",
            // "trade_ship1","trade_ship2","trade_ship3","trade_pb_bottombg",
            // "trade_port1","trade_port2","trade_port3","trade_port4","trade_port5","servant_infoPro2",
            // "trade_arrow","trade_bottombg","trade_bottomnumbg", "trade_namebg_gray","trade_namebg_red",
            // "trade_bg2",
            "trade_arrow",
            "trade_namebg",
            "trade_zhi",
            "trade_tanlBtn",
            "trade_biaoti",
            "recharge2_fnt",
            "trade_pb_bottombg",
            "trade_carri1",
            "trade_carri2"

            // "trade_bg","forpeople_bottom","trade_tanlBtn","trade_tanlBtn_down",
            // "trade_ship1","trade_ship2","trade_ship3","trade_pb_bottombg",
            // "trade_port1","trade_port2","trade_port3","trade_port4","trade_port5","servant_infoPro2",
            // "trade_arrow","trade_bottombg","trade_bottomnumbg", "trade_namebg_gray","trade_namebg_red",
            // "trade_zhi","trade_biaoti","recharge2_fnt",

		]);
	}
    public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_INDEX),this.indexInterfaceCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_FIGHT),this.refreshAfterTrade,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TRADE_BATCHFIGHT),this.refreshAfterTrade,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_TRADE_AFTER_FIGHT,this.refreshTradeInfoAfterFight,this);
        
        this._curTradeNameTxt = null;
        this._nodeContainer = null;
        this._nodeContainer2 = null;
        this._rewardNodeContainer = null;
    
        this._bg1 = null;
        this._bg2 = null;
        this._curTopBg = null;
        this._nextTopBg = null;
        this._shipImg = null;
        this._shipImg1 = null;
        this._shipImg2 = null;
        this._preCid = 0;
        this._lastNameCid = 0;
        this.lastGoldNum =0;
        this._lastTradeName =null;
        this._lastTradeGold = null;
        this._lastTradeInte = null;
        this._tradeArrow = null;
        this._shipMoving = false;

        super.dispose();
    }
}