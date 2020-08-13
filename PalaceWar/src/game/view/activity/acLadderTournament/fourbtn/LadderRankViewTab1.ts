class LadderRankViewTab1 extends CommonViewTab
{  

    //滑动列表
    private _scrollList:ScrollList = null; 
    private _previousBtn:BaseButton = null;
    private _backBtn:BaseButton = null;
    private _type:number = 0;

    private _scoreText:BaseTextField= null;
    private _rankText:BaseTextField= null;

    private _timeText:BaseTextField = null;

    public constructor() 
	{
		super();
		this.initView();
	}

    protected initView():void
    {   
        let view = this;  
        

        let listbg = BaseBitmap.create("public_9_bg24");
        listbg.width = 624;
        listbg.height = GameConfig.stageHeigth - 268;
        listbg.setPosition(8,0);
        this.addChild(listbg);

        let topBg = BaseBitmap.create("ladder_rank_title_bg");
		// topBg.width = 620;
		// topBg.height = 135;
        topBg.x = 10;
        topBg.y = 2;
        view.addChild(topBg)
        
        let descTF = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_rank_desc"), 20, TextFieldConst.COLOR_WHITE);
		descTF.width = 580;
		descTF.lineSpacing = 3;
		descTF.setPosition(30, 20);
        this.addChild(descTF);

         this._type = 1;
        if (Api.laddertournamentVoApi.getNowturn()>1)
        {   
           
            let beforeRankBtn = ComponentManager.getButton("ladder_beforerank_btn",null,this.beforeRankHandle,this);
            beforeRankBtn.setPosition(topBg.x+topBg.width-35-beforeRankBtn.width,topBg.y+topBg.height-4-beforeRankBtn.height);
            this.addChild(beforeRankBtn);
            this._previousBtn = beforeRankBtn;

            this._backBtn = ComponentManager.getButton("ladder_back_btn",null,this.backkHandle,this);
            this._backBtn.setPosition(topBg.x+topBg.width-35-beforeRankBtn.width,topBg.y+topBg.height-4-beforeRankBtn.height);
            this.addChild(this._backBtn);
            this._backBtn.visible = false;
        }


        
        
        let titleBg = BaseBitmap.create("ladder_itemtitlebg");
        titleBg.width = 598;
        titleBg.height = 40;
        titleBg.setPosition(21,topBg.y+topBg.height+8);
        this.addChild(titleBg);

        let titleText1 = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText1.setPosition(85-titleText1.width/2, titleBg.y+titleBg.height/2-titleText1.height/2);
        this.addChild(titleText1);

        let titleText2 = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title2"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText2.setPosition(193-titleText2.width/2, titleText1.y);
        this.addChild(titleText2);
        
        let titleText3 = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_rank_title3"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText3.setPosition(335-titleText3.width/2, titleText1.y);
        this.addChild(titleText3);

        let titleText4 = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText4.setPosition(455-titleText4.width/2, titleText1.y);
        this.addChild(titleText4);

        let titleText5 = ComponentManager.getTextField(LanguageManager.getlocal("acPunish_score"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleText5.setPosition(555-titleText5.width/2, titleText1.y);
        this.addChild(titleText5);

        let tmpRect =  new egret.Rectangle(0,0,606,listbg.height-topBg.y-topBg.height-64);
		let scrollList = ComponentManager.getScrollList(LadderRankViewTab1Item,[],tmpRect);
        view._scrollList = scrollList;     
		scrollList.setPosition(17,titleBg.y+titleBg.height+8)
        view.addChild(scrollList); 
        scrollList.bounces = false;
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));

        let bottomBg = BaseBitmap.create("emparena_bottom");
        bottomBg.height = 120;
        bottomBg.y = listbg.y+listbg.height+7;
        this.addChild(bottomBg);

        let myinfo:any = Api.laddertournamentVoApi.getMyRankArray();

        let bottomText1 = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_name",[Api.playerVoApi.getPlayerName()]) , 20, TextFieldConst.COLOR_WHITE);
		bottomText1.setPosition(65, bottomBg.y+30);
        this.addChild(bottomText1);

        let bottomText2 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_WHITE);
        bottomText2.text = LanguageManager.getlocal("acLadder_Score",[String(Api.laddertournamentVoApi.getMyPoint())]);
		bottomText2.setPosition(bottomText1.x, bottomBg.y+73);
        this.addChild(bottomText2);

        let bottomText3 = ComponentManager.getTextField("server", 20, TextFieldConst.COLOR_WHITE);
		bottomText3.setPosition(bottomText1.x+320, bottomText1.y);
        bottomText3.text = LanguageManager.getlocal("acLadder_server",[String(Api.mergeServerVoApi.getTrueZid())]);
        this.addChild(bottomText3);

        
        let bottomText4 = ComponentManager.getTextField("rank", 20, TextFieldConst.COLOR_WHITE);
		bottomText4.setPosition(bottomText3.x, bottomText2.y);
        this.addChild(bottomText4);

        this._scoreText = bottomText2;
        this._rankText = bottomText4;


        this._timeText = ComponentManager.getTextField("rank", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._timeText.width = 480;
        this._timeText.textAlign = egret.HorizontalAlign.CENTER;
        this._timeText.setPosition(descTF.x,100);
        this.addChild(this._timeText);

        this.resetInfo();
    }

    private beforeRankHandle():void
    {   
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK),this.getrankCallBack,this); 
        this._type =2;
        let beforeTurn = Api.laddertournamentVoApi.getNowturn()-1;
        NetManager.request(NetRequestConst.REQUEST_LT_GETRANK,{activeId:Api.laddertournamentVoApi.aidAndCode,turn:beforeTurn});
    }

    private backkHandle():void
    {   
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK),this.getrankCallBack,this); 
        this._type = 1;
        let beforeTurn = Api.laddertournamentVoApi.getNowturn();
        NetManager.request(NetRequestConst.REQUEST_LT_GETRANK,{activeId:Api.laddertournamentVoApi.aidAndCode,turn:beforeTurn});
    }

    private getrankCallBack(evt : egret.Event):void
    {   
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK),this.getrankCallBack,this); 
        let rData = evt.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }

        if (!this._scrollList)
        {
            return;
        }

        if (this._type == 1)
        {
            if(rData.rankArr)
            {   
                Api.laddertournamentVoApi.setRankArrya(rData.rankArr);
            }
            if(rData.myrankArr)
            {   
                Api.laddertournamentVoApi.setMyRankArrya(rData.myrankArr);
            }
        }
        else
        {
            if(rData.rankArr)
            {   
                Api.laddertournamentVoApi.setPreRankArrya(rData.rankArr);
            }
            if(rData.myrankArr)
            {   
                Api.laddertournamentVoApi.setPreMyRankArrya(rData.myrankArr);
            }
        }
        this.resetInfo();
    }

    private resetInfo():void
    {   
        if (!this._scrollList)
        {
            return;
        }
        if (this._type == 1)
        {   
            if (this._backBtn && this._previousBtn)
            {
                this._backBtn.visible = false;
                this._previousBtn.visible = true;
            }
            
            this._scrollList.refreshData(Api.laddertournamentVoApi.getRankArray());
            
            let myinfo:any = Api.laddertournamentVoApi.getMyRankArray();
            let ranknum:number = myinfo.myrank;
            let rankstr:string;
            let pointStr :string;
            if (ranknum && myinfo.value!=null)
            {
                rankstr = String(ranknum);
                pointStr = String(myinfo.value);
            }
            else
            {
                pointStr = rankstr = LanguageManager.getlocal("acLadder_notJoin");
            }
            this._scoreText.text = LanguageManager.getlocal("acLadderScore",[pointStr]);
            this._rankText.text = LanguageManager.getlocal("acLadder_rank",[rankstr]);
            this.tick();
        }
        else
        {   
            if (this._backBtn && this._previousBtn)
            {
                this._backBtn.visible = true;
                this._previousBtn.visible = false;
            }
            this._scrollList.refreshData(Api.laddertournamentVoApi.getPreRankArray());

            let preInfo:any = Api.laddertournamentVoApi.getPreMyRankArray();
            let point = preInfo.value;
            if (!point)
            {
                point = 0;
            }
            this._scoreText.text = LanguageManager.getlocal("acLadderScore",[String(point)]);
            
            let ranknum:number = preInfo.myrank;
            let rankstr:string;
             let pointStr :string;
            if (ranknum && preInfo.value!=null)
            {
                rankstr = String(ranknum);
                pointStr = String(preInfo.value);
            }
            else
            {
                pointStr = rankstr = LanguageManager.getlocal("acLadder_notJoin");
            }
            this._scoreText.text = LanguageManager.getlocal("acLadderScore",[pointStr]);
            this._rankText.text = LanguageManager.getlocal("acLadder_rank",[rankstr]);

            let time = Api.laddertournamentVoApi.getLastTurnTime();
            this._timeText.text = LanguageManager.getlocal("acLadder_rank_pretime",[App.DateUtil.getFormatBySecond(time[0],6),App.DateUtil.getFormatBySecond(time[1],6)]);

        }
        
    }

    public tick()
    {
        if (this._type == 1)
        {   

            if (Api.laddertournamentVoApi.acVo.checkIsInEndShowTime()) {
                this._timeText.text = LanguageManager.getlocal("acPunishEnd");
            }
            else if (Api.laddertournamentVoApi.checkIsTruce()) 
            {
                this._timeText.text = LanguageManager.getlocal("acLadder_TimeCountDownEnd1");
            }
            else {
                let lessTime = Api.laddertournamentVoApi.getNowturnLessTime();
                this._timeText.text = LanguageManager.getlocal("acLadder_rank_time",[App.DateUtil.getFormatBySecond(lessTime,17)]);
            }
        }
    }
    
    public dispose():void
    {
        
        this._previousBtn = null;
        this._backBtn = null;
        this._type = 0;
        this._scoreText = null;
        this._rankText = null;
        this._timeText =null;
        this._scrollList = null;

        super.dispose();
    }
}
