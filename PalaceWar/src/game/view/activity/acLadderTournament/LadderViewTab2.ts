class LadderViewTab2 extends BaseDisplayObjectContainer
{  
    private _btnlist:LadderTeamIcon[] = [];
    private _downsearchBtn:BaseButton = null;
    private _clip:CustomMovieClip = null;
    private _upTipNode:BaseDisplayObjectContainer = null;
    private _upSearchNode:BaseDisplayObjectContainer = null;
    private _totalPower:BaseTextField = null;

    private _todayTimes:BaseTextField = null;
    private _itemIcon:BaseBitmap = null;
    private _buyTimes:BaseTextField = null;

    private _aid:string = null;
    private _code:string = null;

    private _myRankScoreText:BaseTextField = null;

    public constructor(){
        super();
    }

    private get cfg() : Config.AcCfg.LadderTournamentCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
    }

    private get vo() : AcLadderTournamentVo{
        return <AcLadderTournamentVo>Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
    }

    private get acTivityId() : string{
        return `${this._aid}-${this._code}`;
    }

    public init(aid:string,code:string):void
    {   
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_SELECTSERVANT),this.resetPower,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_FIGHT),this.resetTopInfo,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETASK),this.resetTopInfo,this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_LADDERTOURNAMENT,this.modelRefresh,this);

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK),this.resetRank,this);

        this._aid = aid;
        this._code = code;
        //下部
        let downBtn = ComponentManager.getButton("ladder_search_opponent",null,this.enterGroundHandle,this,null,1);
        downBtn.setPosition(GameConfig.stageWidth/2 - downBtn.width/2,GameConfig.stageHeigth-375-80);
        this.addChild(downBtn);
        this._downsearchBtn = downBtn;

        App.DisplayUtil.changeToGray(downBtn);

        let clip = ComponentManager.getCustomMovieClip("ladder_ef_xzds",10,120);
        // clip.setScale(1.1);
		clip.setPosition(downBtn.x-20,downBtn.y-53);
		this.addChild(clip);
		clip.playWithTime(0);
        clip.blendMode = egret.BlendMode.ADD;
        this._clip = clip;
        this._clip.visible = false;

        let powerBg = BaseBitmap.create("ladder_power_bg1");
        // powerBg.width = 308;
        powerBg.setPosition(GameConfig.stageWidth/2 - powerBg.width/2,downBtn.y+downBtn.height-10);
        this.addChild(powerBg);

        let power = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_TotalPower")+Api.playerVoApi.getPlayerPower(),20,TextFieldConst.COLOR_BROWN);
        power.setPosition(GameConfig.stageWidth/2 - power.width/2,powerBg.y+powerBg.height/2-power.height/2+5);
        this.addChild(power);
        this._totalPower = power;

         let powerBg2 = BaseBitmap.create("ladder_power_bg2");
        powerBg2.setPosition(GameConfig.stageWidth/2 - powerBg2.width/2,powerBg.y+powerBg.height-5);
        this.addChild(powerBg2);

        let toptext1 = ComponentManager.getTextField("1", 16, TextFieldConst.COLOR_LIGHT_YELLOW);
        toptext1.width = powerBg2.width;
        toptext1.textAlign = egret.HorizontalAlign.CENTER;
        toptext1.lineSpacing = 4;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,toptext1,powerBg2);
        this.addChild(toptext1);

        this._myRankScoreText = toptext1;

        this.resetRank();

        // 中部
        let posTab = [
            {x:135+50,y:542-50},
            {x:0,y:424-20},
            {x:-45,y:548+20-20},
            {x:51,y:598+20},
            {x:225,y:632+20}
        ];
        let offsetY = (GameConfig.stageHeigth-1136)/2;
        let boos =  ComponentManager.getCustomMovieClip("ladder_general1_stand_",5,150);
        boos.setScale(1.2);
        boos.setPosition(posTab[0].x,posTab[0].y-290+offsetY+80);
        boos.playWithTime();
        this.addChild(boos);
        for (let i = 0; i<4; i++)
        {
            let onebtn = new LadderTeamIcon();
            onebtn.init(i+1,this.teamIconClick,this,Api.laddertournamentVoApi.isTeamFullByType(i));
            onebtn.setPosition(posTab[i+1].x,posTab[i+1].y-290+offsetY);
            this.addChild(onebtn);
            onebtn.setBuff(Api.laddertournamentVoApi.getBuffTimes(i+1)>0);

            this._btnlist.push(onebtn);
        }
        this.removeChild(this._btnlist[1]);
        this.addChild(this._btnlist[1]);

       

        //上部
        if (Api.laddertournamentVoApi.isTeamFull())
        {
            this.initTop2();
        }
        else
        {
            this.initTop1();
        }

    }

    public resetRank():void
    {
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
        this._myRankScoreText.text = LanguageManager.getlocal("acLadder_soreAndRank",[pointStr,rankstr]);
    }

    //不满 - tip
    private initTop1():void
    {
        this._upTipNode = new BaseDisplayObjectContainer();
        this.addChild(this._upTipNode);

        let tipbg = BaseBitmap.create("ladder_word_bg");
        tipbg.setPosition(GameConfig.stageWidth-43-tipbg.width,60);
        this._upTipNode.addChild(tipbg);

        let tip = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_team_dispatch_tip"),20,TextFieldConst.COLOR_BROWN);
        tip.width = 106;
        tip.lineSpacing = 5;
        tip.textAlign = egret.HorizontalAlign.CENTER;
        tip.setPosition(tipbg.x + tipbg.width/2 - tip.width/2,tipbg.y+21);
        this._upTipNode.addChild(tip);
        
    }
    //满编 - button
    private initTop2():void
    {
        if (this._upTipNode)
        {
            this._upTipNode.dispose();
            this._upTipNode = null;
        }

        this._upSearchNode = new BaseDisplayObjectContainer();
        this.addChild(this._upSearchNode);


        let searchBtn = ComponentManager.getButton("ladder_search",null,this.enterGroundHandle,this,null,1);
        searchBtn.setPosition(375,50);
        this._upSearchNode.addChild(searchBtn);


        let infobg = BaseBitmap.create("ladderview_timebarbg");
        infobg.width = searchBtn.width;
        infobg.setPosition(searchBtn.x,searchBtn.y+searchBtn.height+3);
        this._upSearchNode.addChild(infobg);

        let todaytimes = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_today_times",[String(0),String(5)]),20);
        todaytimes.setPosition(searchBtn.x+searchBtn.width/2 - todaytimes.width/2,searchBtn.y+searchBtn.height+8);
        this._upSearchNode.addChild(todaytimes);
        this._todayTimes = todaytimes;

        let itemvo = GameData.formatRewardItem(this.cfg.needItem)[0];

        let icon = BaseLoadBitmap.create("itemicon_small2281");
        icon.width = 50;
        icon.height = 45; 
        icon.setPosition(searchBtn.x+50,infobg.y+infobg.height/2-icon.height/2);
        this._upSearchNode.addChild(icon);
        this._itemIcon = icon;
        
        let needitem = ComponentManager.getTextField(LanguageManager.getlocal("AcMazeViewTaskPlan",[String(0),String(5)]),20);
        needitem.setPosition(icon.x+icon.width+2,icon.y+icon.height/2-needitem.height/2);
        this._upSearchNode.addChild(needitem);
        this._buyTimes = needitem;

        App.DisplayUtil.changeToNormal(this._downsearchBtn);
        this._clip.visible = true;

        this.resetTopInfo();
    }

    private resetTopInfo():void
    {   

        if ( !this._upSearchNode )
        {
            return;
        }

        let fightNum = Api.laddertournamentVoApi.getFightTimes();
        let totalNum = this.cfg.freeNum;
        let freeNum = totalNum>fightNum ? totalNum-fightNum : 0;
        this._todayTimes.text = LanguageManager.getlocal("acLadder_today_times",[String(freeNum),String(totalNum)])
        if (freeNum>0)
        {
            this._todayTimes.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            this._todayTimes.visible = true;
            this._buyTimes.visible = false;
            this._itemIcon.visible = false;
        }
        else
        {
            this._todayTimes.textColor = TextFieldConst.COLOR_WARN_RED;
            this._todayTimes.visible = false;
            this._buyTimes.visible = true;
            this._itemIcon.visible = true;
        }

        let itemvo = GameData.formatRewardItem(this.cfg.needItem)[0];
        let hasNum = Api.itemVoApi.getItemNumInfoVoById(itemvo.id);
        let needNum = itemvo.num;

        this._buyTimes.text = LanguageManager.getlocal("AcMazeViewTaskPlan",[String(hasNum),String(needNum)])
        if (hasNum>=needNum)
        {
            this._buyTimes.textColor = TextFieldConst.COLOR_WHITE;
        }
        else
        {
            this._buyTimes.textColor = TextFieldConst.COLOR_WHITE;
        }
    }

    private modelRefresh():void
    {
        for (let i = 0; i<this._btnlist.length; i++)
        {
            this._btnlist[i].setBuff(Api.laddertournamentVoApi.getBuffTimes(i+1)>0);
        }
    }

    private enterGroundHandle():void
    {   
        if (!Api.laddertournamentVoApi.isTeamFull())
        {   
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_teams_less"));
            return ;
        }

        if (Api.laddertournamentVoApi.checkIsTruce())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_truceTip"));
            return ;
        }

        ViewController.getInstance().openView(ViewConst.COMMON.LADDEROPPONENTVIEW,{aid:this._aid,code:this._code});
    }

    public resetPower():void
    {   
        if (Api.laddertournamentVoApi.isTeamFull() && !this._upSearchNode)
        {
            this.initTop2();
        }
        this._totalPower.text = LanguageManager.getlocal("allianceRankTotalPower")+Api.playerVoApi.getPlayerPower();
        this._totalPower.x = GameConfig.stageWidth/2 - this._totalPower.width/2;
        for (let i = 0; i<this._btnlist.length; i++)
        {
            this._btnlist[i].setTeamFull(Api.laddertournamentVoApi.isTeamFullByType(i));
        }
    }

    private teamIconClick(idx:number):void
    {
        ViewController.getInstance().openView(ViewConst.POPUP.LADDERCHOOSETEAMPOPUPVIEW,{type:idx,aid:this._aid,code:this._code});
    }

    public dispose() 
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_SELECTSERVANT),this.resetPower,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_FIGHT),this.resetTopInfo,this);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_LADDERTOURNAMENT,this.modelRefresh,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETASK),this.resetTopInfo,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_LT_GETRANK),this.resetRank,this);

        this._btnlist.length = 0;
        this._downsearchBtn = null;
        this._upTipNode = null;
        this._upSearchNode = null;
        this._totalPower = null;
        this._todayTimes = null;
        this._itemIcon = null;
        this._buyTimes = null;
        this._aid = null;
        this._code = null;
        this._clip = null;
        this._myRankScoreText = null;
        

        super.dispose();
    }
}