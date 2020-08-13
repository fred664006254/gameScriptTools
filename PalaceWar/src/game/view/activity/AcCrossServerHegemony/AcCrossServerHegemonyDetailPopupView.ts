/**
 * 帮会对战信息
 * @class AcCrossServerHegemonyDetailPopupView
 */

class AcCrossServerHegemonyDetailPopupView  extends PopupView
{
    private _aid:string = "";
	private _code:string = "";

    private _infoData:any = null;
    private _myAid:string ="";
    private _myName:string = "";
	private _nodeContainer:BaseDisplayObjectContainer;
    // private _acRankInfoVo:AcRankInfoVo = null;
    // private _allirank:AcRankInfoVo = null;
    private _scrollView:ScrollList;
    private _scrollNode:BaseDisplayObjectContainer = null;
    private _curMatchId:string = null;
    public constructor() {
		super();
	}
    private get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
    }

    private get vo() : AcCrossServerHegemonyVo{
        return <AcCrossServerHegemonyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
    }

    protected get uiType():string
	{
		return "2";
	}
    
    protected getShowHeight():number{
        return 790;
    }

	public initView():void
	{	
        let line = BaseBitmap.create("commonview_line");
        line.width = 544;
        this.addChildToContainer(line);
        line.setPosition(this.viewBg.width/2 - line.width/2, this.viewBg.y);

        let newRedBg = BaseBitmap.create("accshegemony_battleredbg");
        newRedBg.name = "newRedBg";
        newRedBg.x = this.viewBg.width/2 - newRedBg.width/2;
        newRedBg.y = this.viewBg.y - 3;
        this.addChildToContainer(newRedBg);
            
        let mainData = Api.crossServerHegemonyVoApi.getMainSelectData();
        this._infoData = this.param.data.data;
        // console.log(mainData,this._infoData);
        // this._nodeContainer = new BaseDisplayObjectContainer();
        // this._nodeContainer.height = 800;
        // this.addChildToContainer(this._nodeContainer);

        let alliNameText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyDetailAlliName",[this._infoData.name]),20,TextFieldConst.COLOR_WARN_YELLOW);
        alliNameText.x = 60;
        alliNameText.y = 20;
        this.addChildToContainer(alliNameText);

        let qufuText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyDetailQufu",[Api.mergeServerVoApi.getAfterMergeSeverName(null,true,Number(mainData.zid))]),20,TextFieldConst.COLOR_WARN_YELLOW);
        qufuText.x = 60;
        qufuText.y = alliNameText.y + alliNameText.height + 5;
        this.addChildToContainer(qufuText);

        let powerNum = this._infoData.power;
        let powerText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyDetailPower",[String(powerNum)]),20,TextFieldConst.COLOR_WARN_YELLOW);
        powerText.x = 280;
        powerText.y = qufuText.y;
        this.addChildToContainer(powerText);


        let rankText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyDetailRank",[String(this._infoData.rank)]),20,TextFieldConst.COLOR_WARN_YELLOW);
        rankText.x = 60;
        rankText.y = qufuText.y + qufuText.height + 5;
        this.addChildToContainer(rankText);


        let winNumText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyDetailWinNum",[String(mainData.win)]),20,TextFieldConst.COLOR_WARN_YELLOW);
        winNumText.x = 280;
        winNumText.y = rankText.y;
        this.addChildToContainer(winNumText);

      
        let list = [];
        let info = this._infoData.info;
        this._myAid = this._infoData.aid;
        this._myName = this._infoData.name;

        let endflag = this._infoData.endflag;
        this._scrollNode = new BaseDisplayObjectContainer();
        this._scrollNode.width = 544;
        let curY = 0;
        for(let key in info){
            //备战日
            if(Number(key) == 1){
                // h = 92
                let bg = BaseBitmap.create("accshegemony_battlew_xzbg");
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
                let bg = BaseBitmap.create("accshegemony_battlew_xzbg");
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

            if(Number(key) > 24){
                if(String(endflag) == "1" && (!curInfo.tinfo || !curInfo.tinfo.id)){
                    break;
                }
            }

            let matchNode = this.createMatchItem(key, curInfo);
            matchNode.x = this._scrollNode.width/2 - matchNode.width/2;
            matchNode.y = curY;

            this._scrollNode.addChild(matchNode);

            curY += matchNode.height + 8;
        }

        let alphaBg = BaseBitmap.create("public_alphabg");
        alphaBg.width = this._scrollNode.width;
        alphaBg.height = this._scrollNode.height;
        this._scrollNode.addChild(alphaBg);
        let listRect = new egret.Rectangle(0,0,544,600); //690
        let scrollList = ComponentManager.getScrollView(this._scrollNode,listRect);
		scrollList.x = this.viewBg.width/2 - scrollList.width/2;
		scrollList.y = 110;
		this.addChildToContainer(scrollList);


    }

    private createMatchItem(matchId:string,curInfo:any):BaseDisplayObjectContainer{

        let sinfo = curInfo.sinfo;//我方
        let tinfo = curInfo.tinfo;//对方

        let status = this.vo.checkStatusByMatchId(Number(matchId));
        //1-->离开战还有半小时以上  2-->离开战半小时以内  3--> 比赛中  4-->比赛结束


        let matchNode = new BaseDisplayObjectContainer();

        let bgRes = "accshegemony_battlewbg";
        let iconRes = "";
        let matchNameColor = TextFieldConst.COLOR_BROWN;
        let nameColor = TextFieldConst.COLOR_BROWN;
        if(status == 4){
            if(curInfo.win){
                // bgRes = "accshegemony_battlewbg1";
                iconRes = "accshegemony_battlewinicon";
            } else {
                // bgRes = "accshegemony_battlewbg2";
                iconRes = "accshegemony_battlelosticon";
                // matchNameColor = 0x434343;
                // nameColor = 0x434343;
            }
            // matchNameColor = 0xffc5b4;
            nameColor = 0xc0cbeb;
        } 
        else {
            nameColor = 0xc0cbeb;
        }

        let bg = BaseBitmap.create(bgRes);
        matchNode.width = bg.width;
        matchNode.height = bg.height;
        matchNode.addChild(bg);

        let icon = BaseBitmap.create(iconRes);
        icon.x = bg.x - 6;
        icon.y = bg.y - 10;
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
        matchNameText.x = bg.width/2 - matchNameText.width/2;
        matchNameText.y = bg.y + 13;
        matchNode.addChild(matchNameText);

        // let matchTitle = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleWinScore",[String(this.cfg.fightScoreWin)]),26,TextFieldConst.COLOR_WARN_YELLOW_NEW);
        // matchTitle.x = GameConfig.stageWidth/2 - matchTitle.width/2;
        // matchTitle.y = 30 - matchTitle.height/2;
        // matchNode.addChild(matchTitle);

        let matchShowBtn = ComponentManager.getButton("accshegemony_battleopenbtn",null,this.matchShowBtnListener,this,[matchId]);
        if(status == 4){
            matchNode.addChild(matchShowBtn);
            matchShowBtn.x = 465;
            matchShowBtn.y = 2;
        }

        let mymainData = Api.crossServerHegemonyVoApi.getMainSelectData();
        let myquStr = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,Number(mymainData.zid));
        let mynameSerStr = LanguageManager.getlocal("acCrossServerHegemonyDetailNameServer", [this._myName, myquStr]);
        let myName = ComponentManager.getTextField(mynameSerStr,22,nameColor);
        myName.x = 140-myName.width/2;
        myName.y = 100 - myName.height/2;
        matchNode.addChild(myName);

        // let myMemberNum = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleMemberNum",[sinfo.num?sinfo.num:"0"]),22,nameColor);
        // myMemberNum.x = 64;
        // myMemberNum.y = myName.y + myName.height + 3;
        // matchNode.addChild(myMemberNum);

        // let myMemberPower = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleMemberPower",[sinfo.dsp?sinfo.dsp:"0"]),22,nameColor);
        // myMemberPower.x = 64;
        // myMemberPower.y = myMemberNum.y + myMemberNum.height + 3;
        // matchNode.addChild(myMemberPower); 

        // let myServant = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleMyServant"),22,nameColor);
        // myServant.x = 64;
        // myServant.y = myMemberPower.y + myMemberPower.height + 3;
        // matchNode.addChild(myServant); 

        // let servantNameStr = null;
        // if(sinfo.servant){
        //     let servantItemCfg:Config.ServantItemCfg = Config.ServantCfg.getServantItemById(sinfo.servant);
        //     servantNameStr = servantItemCfg.name;
        // }
        // if(sinfo.servant2){
        //     let servantItemCfg:Config.ServantItemCfg = Config.ServantCfg.getServantItemById(sinfo.servant2);
        //     servantNameStr += "\n"+servantItemCfg.name;
        // }
        // if(servantNameStr == null){
        //     servantNameStr = LanguageManager.getlocal("acCrossServerHegemonyBattleMyServantNo");
        // }

        // let myServantName = ComponentManager.getTextField(servantNameStr,22,nameColor);
        // myServantName.x = myServant.x + myServant.width;
        // myServantName.y = myMemberPower.y + myMemberPower.height + 3;
        // matchNode.addChild(myServantName); 

        if(status != 4){
            if(tinfo.name){
                let quStr = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,Number(tinfo.zid));
                let nameSerStr = LanguageManager.getlocal("acCrossServerHegemonyDetailNameServer", [tinfo.name, quStr]);
                let otherName = ComponentManager.getTextField(nameSerStr,22,TextFieldConst.COLOR_WARN_YELLOW);
                otherName.x = 400 - otherName.width/2;
                otherName.y = 100 - otherName.height/2;
                matchNode.addChild(otherName);
            } else {
                if(Number(matchId) > 24){
                    let otherName = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleOMatchName" + matchId),22,TextFieldConst.COLOR_WARN_YELLOW);
                    otherName.x = 400 - otherName.width/2;
                    otherName.y = 100 - otherName.height/2;
                    matchNode.addChild(otherName);  
                }
                else
                {
                    let nameSerStr = LanguageManager.getlocal("countryWarRewardType9");
                    let otherName = ComponentManager.getTextField(nameSerStr,22, TextFieldConst.COLOR_QUALITY_GRAY);
                    otherName.x = 400  - otherName.width/2;
                    otherName.y = 100 - otherName.height/2;
                    matchNode.addChild(otherName);
                }
            }
            let vs = ComponentManager.getCustomMovieClip("servantpkxunhuan", 10, 70);
            vs.width = 249;
            vs.height = 229;
            matchNode.addChild(vs);
            vs.setScale(0.4);
            vs.playWithTime(0);
            vs.setPosition(bg.x + bg.width/2 - vs.width*vs.scaleX/2, bg.y + bg.height/2 - 20);
        } else {
            if(tinfo.name){
                let quStr = Api.mergeServerVoApi.getAfterMergeSeverName(null,true,Number(tinfo.zid));
                let nameSerStr = LanguageManager.getlocal("acCrossServerHegemonyDetailNameServer", [tinfo.name, quStr]);
                let otherName = ComponentManager.getTextField(nameSerStr,22, 0xffc5b4);
                otherName.x = 400  - otherName.width/2;
                otherName.y = 100 - otherName.height/2;
                matchNode.addChild(otherName);

                // let otherMemberNum = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleMemberNum",[tinfo.num?tinfo.num:"0"]),22,nameColor);
                // otherMemberNum.x = 383;
                // otherMemberNum.y = otherName.y + otherName.height + 3;
                // matchNode.addChild(otherMemberNum);

                // let otherMemberPower = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyBattleMemberPower",[tinfo.dsp?tinfo.dsp:"0"]),22,nameColor);
                // otherMemberPower.x = 383;
                // otherMemberPower.y = otherMemberNum.y + otherMemberNum.height + 3;
                // matchNode.addChild(otherMemberPower);
            } 
            else
            {
                let nameSerStr = LanguageManager.getlocal("countryWarRewardType9");
                let otherName = ComponentManager.getTextField(nameSerStr,22, TextFieldConst.COLOR_QUALITY_GRAY);
                otherName.x = 400  - otherName.width/2;
                otherName.y = 100 - otherName.height/2;
                matchNode.addChild(otherName);
            }
            let vs = BaseBitmap.create("servantpkxunhuan6");
            vs.setScale(0.4);
            vs.setPosition(bg.x + bg.width/2 - vs.width*vs.scaleX/2, bg.y + bg.height/2 - 20);
            matchNode.addChild(vs);
            if (!curInfo.win){
                App.DisplayUtil.changeToGray(vs);
            }
        }
        return matchNode;
    }
    private matchShowBtnListener(matchId:string){
        this._curMatchId = matchId;
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERHEGEMONYBATTLESHOWVIEW,{
            activeId:this.vo.aidAndCode,
            allianceid:this._myAid,
            rid : this._curMatchId,
        })
         //NetManager.request(NetRequestConst.REQUEST_ACHEGEMONY_GETWARDETAIL,{activeId:this.vo.aidAndCode,rid:this._curMatchId,allianceid:this._myAid});


    }
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            // "popupview_bg3",
            // "popupview_bg5",
            "accshegemony_battleredbg",
            // "accshegemony_battlewbg0",
            // "accshegemony_battlewbg1",
            // "accshegemony_battlewbg2",
            "accshegemony_battlelosticon",
            "accshegemony_battlewinicon",
            "accshegemony_battlebztxt",
            "accshegemony_battlelight",
            "accshegemony_battleopenbtn",
            "accshegemony_battlexztxt",
            "accshegemony_battlexzbg",
            "accshegemony_battlew_xzbg",
            "accshegemony_battlewbg"

		]);
	}
    public dispose()
    {
        this._aid = "";
        this._code = "";
        this._nodeContainer =null;

        this._scrollView = null;
     



        this._scrollView = null;
        this._scrollNode = null;
        this._infoData = null;
        this._myAid ="";
        this._myName = "";
        this._curMatchId = null;
        super.dispose()
    }
}