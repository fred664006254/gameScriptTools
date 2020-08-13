/**
 * author:jiangly
 * desc:群雄逐鹿
*/
class AcCrossServerHegemonyBattleView extends CommonView
{
    //恭喜大人所在联盟成功晋级
    private _tipTxt:BaseTextField = null;
    //当前排名
    private _curRank:BaseTextField = null;
    //当前胜场
    private _curWinNum:BaseTextField = null;

    private _scrollNode:BaseDisplayObjectContainer = null;
    
    private _infoData:any = null;
    private _myAid:string ="";
    private _myName:string = "";
    private _curMatchId:string = null;
    private _bottomTip:BaseTextField = null;
    private _collectBtn:BaseButton = null;
    private _scrollList:ScrollView = null;

    private _posObj = {
        
    }
    // private _oldScore:number = 0;
	public constructor() 
	{
		super();
	}
	
	private get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }
	    /**
	 * 获取活动配置
	 */
	protected getRequestData():{requestType:string,requestData:any}
	{

		if(this.param.data.aid && this.param.data.code)
		{
			return {requestType:NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLIANCEINFO,requestData:{allianceid:this.vo.allianceid,activeId:this.param.data.aid + "-" + this.param.data.code}};
		}
        return null;
		
	}
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (!data.ret){
            return ;
        }
        App.LogUtil.log("AcCrossServerHegemonyBattleView "+data.ret);
		let d = data.data.data;
        let achegemonyinfo = d.achegemonyinfo;
		// console.log(d);
		// if(rankData){
		// 	Api.crossServerHegemonyVoApi.setFlagRankData(rankData);
		// }
        this.vo.myWinNum = Number(achegemonyinfo.win);
        this._infoData = achegemonyinfo;
        //rand
        if( this._scrollNode){
            this.refreshUI();
        }
	}
    private refreshCurStatus():void
    {
        let curStatus = this.vo.getCurStatus();
        let type = "1";
        switch(curStatus){
            case 1:
                type = "1";
                break;
            case 2:
                type = "1";
                break;
            case 10:
                type = "3";
                break;
            case 11:
                type = "4";
                break;
            case 12:
                type = "5";
                break;
            case 13:
                type = "6";
                break;
            case 14:
                type = "7";
                break;
            case 15:
                type = "8";
                break;
            case 16:
                type = "10";
                if (this._infoData.rand && this._infoData.rand == "5"){
                    type = "9";
                }
                break;
        }   
        if( curStatus >= 10 && curStatus < 16 && this._infoData.endflag == "1"){
            type = "10";
            if (this._infoData.rand && this._infoData.rand == "5"){
                type = "9";
            }
        }
        let tipStr = LanguageManager.getlocal("acCrossServerHegemonyBattleTip"+type);
        this._tipTxt.text = tipStr;
        this._tipTxt.x = GameConfig.stageWidth/2 - this._tipTxt.width/2;
    }

    protected get uiType():string
	{
		return "2";
    }
    
    protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}

	public initView():void
	{	
        // this._infoData = this.param.data.data;

        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSERVANT,this.refreshUIData,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_CANCELSERVANT,this.refreshUIData,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM,this.refreshUIData,this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLILIST,this.getWarJoinCallback,this);
       
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETWINSCORE,this.refreshBottom,this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETWARDETAIL,this.matchShowCallback,this);
        let titleBg = BaseBitmap.create("accshegemony_battleredbg1");
        titleBg.x = GameConfig.stageWidth/2 - titleBg.width/2;
        titleBg.y = 0;
        this.addChildToContainer(titleBg);
        this.setBigFameY(-11);
        this._tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleTip1"),22,TextFieldConst.COLOR_WARN_YELLOW);
        this._tipTxt.x = GameConfig.stageWidth/2 -   this._tipTxt.width/2;
        this._tipTxt.y = titleBg.y + 15;   
        this.addChildToContainer(this._tipTxt);

        this._curRank = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleRankTxt",[String(this._infoData.rank)]),20,TextFieldConst.COLOR_WARN_YELLOW);
        this._curRank.x = 140;
        this._curRank.y = titleBg.y + titleBg.height - 15 - this._curRank.height;   
        this.addChildToContainer(this._curRank);

        this._curWinNum = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleWinNumTxt",[String(this._infoData.win)]),20,TextFieldConst.COLOR_WARN_YELLOW);
        this._curWinNum.x = 370
        this._curWinNum.y = this._curRank.y;
        this.addChildToContainer(this._curWinNum);

        // let border = BaseBitmap.create("commonview_border1");
        // border.width = GameConfig.stageWidth;
        // border.height = GameConfig.stageHeigth - 69;
        // border.y = -15;
        // this.addChildToContainer(border);
       

        // let list = [];
        let info = this._infoData.info;
        this._myAid = this._infoData.aid;
        this._myName = this._infoData.name;


        this._scrollNode = new BaseDisplayObjectContainer();
        this._scrollNode.width = GameConfig.stageWidth - 20;

       

        this.refreshUI();

        // let alphaBg = BaseBitmap.create("public_alphabg");
        // alphaBg.width = this._scrollNode.width;
        // alphaBg.height = this._scrollNode.height;
        // this._scrollNode.addChild(alphaBg);
        let listRect = new egret.Rectangle(0,0,620,860 - (1136 - GameConfig.stageHeigth));
        let scrollList = ComponentManager.getScrollView(this._scrollNode,listRect);
		scrollList.x = GameConfig.stageWidth/2 - scrollList.width/2;
		scrollList.y = titleBg.y + titleBg.height + 2;
		this.addChildToContainer(scrollList);
        this._scrollList = scrollList;
        
        let bottomBg = BaseBitmap.create("accshegemony_battlebottom");
        bottomBg.x = GameConfig.stageWidth/2 - bottomBg.width/2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height - 99;
        this.addChildToContainer(bottomBg);

        let collectBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"acCrossServerHegemonyBattleCollectBtn",this.collectBtnListener,this,null,null,null,TextFieldConst.COLOR_BLACK);
        collectBtn.x = GameConfig.stageWidth - 15 - collectBtn.width;
        collectBtn.y = bottomBg.y + bottomBg.height/2 - collectBtn.height/2 + 15;
        this.addChildToContainer(collectBtn);
        this._collectBtn = collectBtn;

        let bottomTip = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleBottomTip",[String(this.vo.getFightScoreNum())]),22,TextFieldConst.COLOR_WARN_YELLOW);
        bottomTip.x = 40;
        bottomTip.y = bottomBg.y + bottomBg.height/2 - bottomTip.height/2 + 15;
        bottomTip.lineSpacing = 4;
        this.addChildToContainer(bottomTip);
        this._bottomTip = bottomTip;

        // let bottom = BaseBitmap.create("commonview_bottom");
        // bottom.x = 0;
        // bottom.y = GameConfig.stageHeigth - bottom.height-84;//border.y + border.height - bottom.height;
        // this.addChildToContainer(bottom);
        // this._oldScore = this.vo.getFightScoreNum();
		this.refreshCurStatus();
        this.refreshBottom();
        this.scrollToCurMatch();
	}

    private refreshBottom(event?:egret.Event){

        if(event && event.data && event.data.ret){
            let data = event.data.data.data;
            let addscore = data.addscore;
            if(addscore > 0){
                App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyFightPulsScore",[String(addscore)]));
            }
        }
        

        this._bottomTip.text = LanguageManager.getlocal("acCrossServerHegemonyBattleBottomTip",[String(this.vo.getFightScoreNum())]);
        if(this.vo.checkFightScoreRed()){
            // this._collectBtn
            App.CommonUtil.addIconToBDOC(this._collectBtn,null,null);
            this._collectBtn.setEnable(true);
          
        } else {
            App.CommonUtil.removeIconFromBDOC(this._collectBtn);
            this._collectBtn.setEnable(false);
        }
    }
    private refreshUIData(event?:egret.Event){
		// console.log("refreshUI---->");
        // return {requestType:NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLIANCEINFO,requestData:{allianceid:this.vo.allianceid,activeId:this.param.data.aid + "-" + this.param.data.code}};

        // { requestType: NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLILIST, requestData: {activeId:this.param.data.aid+"-"+this.param.data.code, allianceid:this.param.data.alliId, rid:this.param.data.matchId} }
        if (event && event.data){
            if (!event.data.ret){
                return;
            }
        }
		this.request(NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLIANCEINFO,{allianceid:this.vo.allianceid,activeId:this.param.data.aid + "-" + this.param.data.code});
	}
    private scrollToCurMatch(){
        // this._posObj["matchId_"+key] = curY;
        let status = this.vo.getCurStatus();
        App.LogUtil.log("scrollToCurMatch "+status);
        if (this._posObj && Object.keys(this._posObj).length > 0){
            if(status < 16){
                let curMatchId = this.vo.getNextMatchId();
                if(curMatchId > 29){
                    curMatchId = 29;
                }

                this._scrollList.setScrollTop(Number(this._posObj["matchId_"+curMatchId]));
            }
        }
    }
    private refreshUI(){
        let info = this._infoData.info;
        let curY = 0;
        this._scrollNode.removeChildren();
        for(let key in info){
            //备战日
            App.LogUtil.log("refreshUI "+key);
            if(Number(key) == 1){
                // h = 92
                let bg = BaseBitmap.create("accshegemony_battle_xzbg");
                // bg.height = 92;
                bg.x = this._scrollNode.width/2 - bg.width/2;
                bg.y = curY;
                this._scrollNode.addChild(bg);
                curY += bg.height + 5;
                let txt = BaseBitmap.create("accshegemony_battlebztxt");
                txt.x = bg.x + bg.width/2 - txt.width/2;
                txt.y = bg.y + bg.height/2 - txt.height/2 + 13;
                this._scrollNode.addChild(txt);

                let timeStrArr = this.vo.getRestTimeStrByType(Number(key));
                let time = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleReadyTime", [timeStrArr[0], timeStrArr[1]]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
                time.setPosition(bg.x + bg.width/2 - time.width/2, bg.y + 13);
                this._scrollNode.addChild(time);

            }

            //休战日
            if(Number(key) == 25){
                // h = 92
                let bg = BaseBitmap.create("accshegemony_battle_xzbg");
                // bg.height = 92;
                bg.x = this._scrollNode.width/2 - bg.width/2;
                bg.y = curY;
                this._scrollNode.addChild(bg);
                curY += bg.height + 5;
                let txt = BaseBitmap.create("accshegemony_battlexztxt");
                txt.x = bg.x + bg.width/2 - txt.width/2;
                txt.y = bg.y + bg.height/2 - txt.height/2 + 13;
                this._scrollNode.addChild(txt);

                let timeStrArr = this.vo.getRestTimeStrByType(Number(key));
                let time = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleRestTime", [timeStrArr[0], timeStrArr[1]]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
                time.setPosition(bg.x + bg.width/2 - time.width/2, bg.y + 13);
                this._scrollNode.addChild(time);
            }
            
            let curInfo = info[key];
            let matchNode = this.createMatchItem(key, curInfo);
            matchNode.x = this._scrollNode.width/2 - matchNode.width/2;
            matchNode.y = curY;
            this._posObj["matchId_"+key] = curY;
            this._scrollNode.addChild(matchNode);

            curY += matchNode.height + 10;
        }
    }
    private createMatchItem(matchId:string,curInfo:any):BaseDisplayObjectContainer{

        let sinfo = curInfo.sinfo;//我方
        let tinfo = curInfo.tinfo;//对方

        let status = this.vo.checkStatusByMatchId(Number(matchId));
        //1-->离开战还有半小时以上  2-->离开战半小时以内  3--> 比赛中  4-->比赛结束

        let rankData = Api.crossServerHegemonyVoApi.getRank();
 
        let canShowBtn = true;
        let isLose = false;
        let canShowBattleBtn = false;
        if(Number(matchId) > 24){
            // for(let i = 0;i < rankData.length; i ++){
            //     // if(String(rankData[i].aid) == String(this.vo.allianceid) && rankData[i].endflag == "1"){
            //     //     // canShowBtn = false;
            //     //     isLose = true;
            //     //     break;
            //     // }
                
            // }
            // if (curInfo.win <= -1){
            //     // canShowBtn = false;
            // }
            for(let i = 0;i < rankData.length; i ++){
                if(String(rankData[i].aid) == String(this.vo.allianceid)){
                    if(rankData[i].endflag == "1"){
                        //修改时间2020/4/14  修改为被淘汰也能看战斗回放
                        
                        canShowBtn = false;
                        isLose = true;
                        if(tinfo && tinfo.name){
                            canShowBattleBtn = true;
                        } else {
                            canShowBattleBtn = false;
                        }
                    } 
                    //得到冠军
                    if(rankData[i]["rand"] && Number(rankData[i]["rand"]) >= 5){
                        canShowBattleBtn = true;
                        canShowBtn = false;
                        isLose = false;
                    }

                    break;
                }
            }

            let curStatus = this.vo.getCurStatus();
            if(curStatus < 10 ){
                canShowBtn = false;
            }

        }


        let matchNode = new BaseDisplayObjectContainer();

        let bgRes = "accshegemony_battlebg";
        let iconRes = "";
        let matchNameColor = TextFieldConst.COLOR_BROWN;
        let nameColor = 0xc0cbeb;
        if(status == 4){
            if(curInfo.win){
                // bgRes = "accshegemony_battlebg1";
                iconRes = "accshegemony_battlewinicon";
            } else {
                // bgRes = "accshegemony_battlebg2";
                iconRes = "accshegemony_battlelosticon";
                // matchNameColor = 0x434343;
                // nameColor = 0x434343;
                nameColor = 0xc0cbeb;

            }
        } else {
            nameColor = 0xc0cbeb;
        }
        // if(isLose && !tinfo.name){
        //     matchNameColor = TextFieldConst.COLOR_BROWN;
        //     nameColor = 0xc0cbeb;
        // }

        let bg = BaseBitmap.create(bgRes);
        matchNode.width = bg.width;
        matchNode.height = bg.height;
        matchNode.addChild(bg);
        bg.x = matchNode.width/2 - bg.width/2;

        let icon = BaseBitmap.create(iconRes);
        icon.x = bg.x + 15;
        icon.y = bg.y + 2;
        matchNode.addChild(icon);


        let matchNameStr = "";
        let isTaotai = false ; 
        if(Number(matchId) <= 24){
            //晋级赛
            matchNameStr = LanguageManager.getlocal("acCrossServerHegemonyBattleMatchName1",[matchId,this.vo.getTimeStrByMatchId(Number(matchId))]);
            
        } else {
            //淘汰赛
            matchNameStr = LanguageManager.getlocal("acCrossServerHegemonyBattleMatchName"+matchId,[this.vo.getTimeStrByMatchId(Number(matchId))]);
            isTaotai = true;
        }
        //95  64
        let matchNameText = ComponentManager.getTextField(matchNameStr, 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        matchNameText.x = bg.x + bg.width/2 - matchNameText.width/2;
        matchNameText.y = bg.y + 10;
        matchNode.addChild(matchNameText);

        let matchTitle = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleWinScore",[String(this.cfg.fightScoreWin)]),26,TextFieldConst.COLOR_WARN_YELLOW);
        matchTitle.x = bg.x + 20;
        matchTitle.y = bg.y + bg.height - 44;
        matchNode.addChild(matchTitle);
        App.LogUtil.log("createMatchItem matchId "+matchId+"  status "+status);
        let matchShowBtn = ComponentManager.getButton("accshegemony_battleopenbtn",null,this.matchShowBtnListener,this,[matchId]);
        if(status == 4){
            matchNode.addChild(matchShowBtn);
            matchShowBtn.x = GameConfig.stageWidth - 47 - matchShowBtn.width;
            matchShowBtn.y = bg.y;
        }
        let changeServantStr = "acCrossServerHegemonyBattleChangeBtn";
        if(!sinfo.servant){
            changeServantStr = "acCrossServerHegemonyBattleChangeBtn2";
        }
        if(status == 2 || status == 3){
            changeServantStr = "acCrossServerHegemonyBattleChangeBtn3";
        }

        // if(Number(matchId) == 12){
        //     console.log(status);
        // }
        let changeServantBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,changeServantStr,this.changeServantBtnListener,this,[matchId],null,null,TextFieldConst.COLOR_BLACK);
        
        App.LogUtil.log("changeser btn "+status + " canshowBtn "+canShowBtn);
        if(status == 1 || status == 2 || status == 3){
            changeServantBtn.visible = true;
        } else {
            changeServantBtn.visible = false;
        }
        if(!canShowBtn){
            changeServantBtn.visible = false;
            matchShowBtn.visible = false;
        }
        if(canShowBattleBtn){
            matchShowBtn.visible = true;
        }
        
        changeServantBtn.x = GameConfig.stageWidth - 45 - changeServantBtn.width;
        changeServantBtn.y = bg.y + bg.height - changeServantBtn.height - 8;
        matchNode.addChild(changeServantBtn);

        let myquStr = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,Number(this._infoData.zid));
        let nameSerStr = LanguageManager.getlocal("acCrossServerHegemonyDetailNameServer", [this._myName, myquStr]);
        let myName = ComponentManager.getTextField(nameSerStr,22, nameColor);
        myName.x = 58;
        myName.y = 80 - myName.height/2;
        if (sinfo.servant2){
            myName.y = 80 - myName.height/2 - 7;
        }
        matchNode.addChild(myName);

        let myMemberNum = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleMemberNum",[sinfo.num?sinfo.num:"0"]),22,nameColor);
        myMemberNum.x = 58;
        myMemberNum.y = myName.y + myName.height + 3;
        matchNode.addChild(myMemberNum);

        let myMemberPower = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleMemberPower",[App.StringUtil.changeIntToText(Number(sinfo.dsp?sinfo.dsp:"0"))]),22,nameColor);
        myMemberPower.x = myMemberNum.x;
        myMemberPower.y = myMemberNum.y + myMemberNum.height + 3;
        matchNode.addChild(myMemberPower); 

        let myServant = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleMyServant"),22,nameColor);
        myServant.x = myMemberNum.x;
        myServant.y = myMemberPower.y + myMemberPower.height + 3;
        matchNode.addChild(myServant); 

        let servantNameStr = null;
        if(sinfo.servant){
            let servantItemCfg:Config.ServantItemCfg = Config.ServantCfg.getServantItemById(sinfo.servant);
            servantNameStr = servantItemCfg.name;
        }
        // if(sinfo.servant2){
        //     let servantItemCfg:Config.ServantItemCfg = Config.ServantCfg.getServantItemById(sinfo.servant2);
        //     servantNameStr += "\n"+servantItemCfg.name;
        // }
        if(servantNameStr == null){
            servantNameStr = LanguageManager.getlocal("acCrossServerHegemonyBattleMyServantNo");
        }

        let myServantName = ComponentManager.getTextField(servantNameStr,22,nameColor);
        myServantName.x = myServant.x + myServant.width;
        myServantName.y = myMemberPower.y + myMemberPower.height + 3;
        matchNode.addChild(myServantName); 

        if(sinfo.servant2){
            let servantItemCfg:Config.ServantItemCfg = Config.ServantCfg.getServantItemById(sinfo.servant2);
            let fubingServantName = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleMyFubing", [servantItemCfg.name]),22,nameColor);
            fubingServantName.x = myServant.x;
            fubingServantName.y = myServant.y + myServant.height + 3;
            matchNode.addChild(fubingServantName);
        }

        if(status != 4){
            if(tinfo.name){
                let quStr = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,Number(tinfo.zid));
                let nameSerStr = LanguageManager.getlocal("acCrossServerHegemonyDetailNameServer", [tinfo.name, quStr]);
                let otherName = ComponentManager.getTextField(nameSerStr,22,TextFieldConst.COLOR_WARN_YELLOW);
                otherName.x = 455 - otherName.width/2;
                otherName.y = 123 - otherName.height/2;
                matchNode.addChild(otherName);
            } 
            else {
                if(Number(matchId) > 24){
                    if(isLose){
                        // bg.setRes("accshegemony_battlebg0");
                        icon.visible = false;
                        let otherName = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleOMatchNameLose"),22,TextFieldConst.COLOR_WARN_YELLOW);
                        otherName.x = 455 - otherName.width/2;
                        otherName.y = 123 - otherName.height/2;
                        matchNode.addChild(otherName);  
                    }
                    else if (this.vo.checkStatusByMatchId(Number(matchId)-1)==4)
                    {
                        let nameSerStr = LanguageManager.getlocal("countryWarRewardType9");
                        let otherName = ComponentManager.getTextField(nameSerStr,22, TextFieldConst.COLOR_QUALITY_GRAY);
                        otherName.x = 455 - otherName.width/2;
                            otherName.y = 123 - otherName.height/2;
                        matchNode.addChild(otherName);
                    } 
                    else {
                        let otherName = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleOMatchName" + matchId),22,TextFieldConst.COLOR_WARN_YELLOW);
                        otherName.x = 455 - otherName.width/2;
                        otherName.y = 123 - otherName.height/2;
                        matchNode.addChild(otherName);  
                    }

                }
                else
                {
                    let nameSerStr = LanguageManager.getlocal("countryWarRewardType9");
                    let otherName = ComponentManager.getTextField(nameSerStr,22, TextFieldConst.COLOR_QUALITY_GRAY);
                     otherName.x = 455 - otherName.width/2;
                        otherName.y = 123 - otherName.height/2;
                    matchNode.addChild(otherName);
                }
            }
            let vs = ComponentManager.getCustomMovieClip("servantpkxunhuan", 10, 70);
            vs.width = 249;
            vs.height = 229;
            matchNode.addChild(vs);
            vs.setScale(0.6);
            vs.playWithTime(0);
            vs.setPosition(bg.x + bg.width/2 - vs.width*vs.scaleX/2, bg.y + bg.height/2 - vs.height * vs.scaleY /2 - 10);
        } 
        else {
            if(tinfo.name){
                let quStr = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,Number(tinfo.zid));
                let nameSerStr = LanguageManager.getlocal("acCrossServerHegemonyDetailNameServer", [tinfo.name, quStr]);
                let otherName = ComponentManager.getTextField(nameSerStr,22, 0xffc5b4);
                otherName.x = 455 - otherName.width/2;
                otherName.y = 90 - otherName.height/2;
                matchNode.addChild(otherName);

                let otherMemberNum = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleMemberNum",[tinfo.num?tinfo.num:"0"]),22,0xffc5b4);
                otherMemberNum.x = 350;
                otherMemberNum.y = otherName.y + otherName.height + 3;
                matchNode.addChild(otherMemberNum);

                let otherMemberPower = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleMemberPower",[App.StringUtil.changeIntToText(Number(tinfo.dsp?tinfo.dsp:"0"))]),22,0xffc5b4);
                otherMemberPower.x = 350;
                otherMemberPower.y = otherMemberNum.y + otherMemberNum.height + 3;
                matchNode.addChild(otherMemberPower);


            } else {
                if(Number(matchId) > 24){
                    if(isLose){
                        // bg.setRes("accshegemony_battlebg0");
                        icon.visible = false;
                        let otherName = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleOMatchNameLose"),22,TextFieldConst.COLOR_WARN_YELLOW);
                        otherName.x = 455 - otherName.width/2;
                        otherName.y = 123 - otherName.height/2;
                        matchNode.addChild(otherName);  
                    }
                    else //if (this.vo.checkStatusByMatchId(Number(matchId))==4)
                    {
                        let nameSerStr = LanguageManager.getlocal("countryWarRewardType9");
                        let otherName = ComponentManager.getTextField(nameSerStr,22, TextFieldConst.COLOR_QUALITY_GRAY);
                        otherName.x = 455 - otherName.width/2;
                            otherName.y = 123 - otherName.height/2;
                        matchNode.addChild(otherName);
                    }  
                    // else {
                    //     let otherName = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleOMatchName" + matchId),22,TextFieldConst.COLOR_WARN_YELLOW);
                    //     otherName.x = 455 - otherName.width/2;
                    //     otherName.y = 123 - otherName.height/2;
                    //     matchNode.addChild(otherName);  
                    // }

                }
                  else
                {
                    let nameSerStr = LanguageManager.getlocal("countryWarRewardType9");
                    let otherName = ComponentManager.getTextField(nameSerStr,22, TextFieldConst.COLOR_QUALITY_GRAY);
                     otherName.x = 455 - otherName.width/2;
                        otherName.y = 123 - otherName.height/2;
                    matchNode.addChild(otherName);
                }
            }
            let vs = BaseBitmap.create("servantpkxunhuan6");
            vs.setScale(0.6);
            vs.setPosition(bg.x + bg.width/2 - vs.width*vs.scaleX/2, bg.y + bg.height/2 - vs.height * vs.scaleY /2 - 10);
            matchNode.addChild(vs);
            if (!curInfo.win){
                App.DisplayUtil.changeToGray(vs);
            }
        }
        return matchNode;
    }

    private matchShowBtnListener(matchId:string){
        App.LogUtil.log("matchShowBtnListener "+matchId);
        this._curMatchId = matchId;
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYBATTLESHOWVIEW,{
            activeId:this.vo.aidAndCode,
            allianceid:this._myAid,
            rid : this._curMatchId,
            // test: true,
        })
         //NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_GETWARDETAIL,{activeId:this.vo.aidAndCode,rid:this._curMatchId,allianceid:this._myAid});

    }
    private matchShowCallback(event?:egret.Event)
    {
        // console.log("matchshow--->",event);
    }
    private changeServantBtnListener(matchId:string)
    {
        // console.log("matchId--->",matchId);
        this._curMatchId = matchId;
        // NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLILIST,{activeId:this.vo.aidAndCode, allianceid:this._myAid, rid:matchId});     
        this.openWarJoinPopupView();
    }  
    private openWarJoinPopupView()
    {
        if(!this.vo.isCanJoin()){
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyNoCanJoin"));
            return;
        }
        let status = this.vo.checkStatusByMatchId(Number(this._curMatchId));
        //1-->离开战还有半小时以上  2-->离开战半小时以内  3--> 比赛中  4-->比赛结束
        if(status == 1 || status == 2 || status == 3){
            if(status == 2){
                App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyBattleWarnTip1",[this.vo.getCdStrByMatchId(Number(this._curMatchId))]));
            }
            if(status == 3){
                App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyBattleWarnTip2"));
            }
            
            ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYWARJOINPOPUPVIEW,{
                aid : this.param.data.aid,
                code : this.param.data.code,
                matchId : this._curMatchId,
                alliId : this._myAid
            });
        }

    }
    // private getWarJoinCallback(event?:egret.Event)
    // {
    //     console.log(event);
    //     if(event.data && event.data.data && event.data.data.data)
    //     {
    //         let achegemonyinfo = event.data.data.data.achegemonyinfo;
    //         if(achegemonyinfo){
    //             ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYWARJOINPOPUPVIEW,{
    //                 aid : this.param.data.aid,
    //                 code : this.param.data.code,
    //                 info : achegemonyinfo,
    //                 matchId : this._curMatchId
    //             });
    //             this._curMatchId = null;
    //         }

    //     }

    // } 
    private collectBtnListener()
    {
        if(this.vo.getFightScoreNum() > 0){
            
            NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_GETWINSCORE,{activeId:this.vo.aidAndCode});  
        } else {
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerHegemonyNoGetFight"));
        }
           
    }
 
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            //main

		    // "accshegemony_battlebg0",
            // "accshegemony_battlebg1",
            // "accshegemony_battlebg2",
            "accshegemony_battlebottom",
            "accshegemony_battlebztxt",
            "accshegemony_battlelight",
            "accshegemony_battlelosticon",
            "accshegemony_battlembg",
            "accshegemony_battlembg1",
            "accshegemony_battlembg2",
            "accshegemony_battleopenbtn",
       
            "accshegemony_battleredbg1",
            // "accshegemony_battlewbg0",
            // "accshegemony_battlewbg1",
            // "accshegemony_battlewbg2",
            "accshegemony_battlewinicon",
            "accshegemony_battlexzbg",
            "accshegemony_battlexztxt",
            "accshegemony_battlebg",
            "accshegemony_battle_xzbg",
		]);
	}
	// 背景图名称

	public tick():void
	{	

	}
	protected getTitleStr():string
	{
        let type = "1";
        let status = this.vo.getCurStatus();
        switch(status){
            case 1:
                type = "1";
                break;
            case 2:
                type = "2";
                break;
            case 10:
                type = "3";
                break;
            case 11:
                type = "4";
                break;
            case 12:
                type = "5";
                break;
            case 13:
                type = "6";
                break;
            case 14:
                type = "7";
                break;
            case 15:
                type = "8";
                break;
            case 16:
                type = "8";
                break;
        }

		return "acCrossServerHegemonyBattleTitle" + type;
	}

	public dispose():void
	{
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETACHEALLILIST,this.getWarJoinCallback,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSERVANT,this.refreshUIData,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_CANCELSERVANT,this.refreshUIData,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_SELECTSTRATAGEM,this.refreshUIData,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETWARDETAIL,this.matchShowCallback,this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETWINSCORE,this.refreshBottom,this);

            //恭喜大人所在联盟成功晋级
        this._tipTxt = null;
    //当前排名
        this._curRank = null;
    //当前胜场
        this._curWinNum = null;

        this._scrollNode = null;
    
        this._infoData = null;
        this._myAid ="";
        this._myName = "";
        this._curMatchId = null;
        this._bottomTip = null;
        this._collectBtn = null;
       
        this._scrollList = null;
   
        super.dispose();
	}
}