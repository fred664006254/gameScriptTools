class LadderLogItem  extends ScrollListItem
{   
    private _pkLogs:any = null;
    private _uid:number = 0;
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any,itemparam:any)
    {   
        let playerInfo = data.pklogs[0][4];

        this._uid = playerInfo.uid;
        this._pkLogs = data;

        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 610;
        bg.height= 120;
        this.addChild(bg);  

        let replaybtn = ComponentManager.getButton("ladder_replay",null,this.replayHandle,this);
        replaybtn.setPosition(16,bg.height/2-replaybtn.height/2);
        this.addChild(replaybtn);  

        let line = BaseBitmap.create("public_line1");
        line.setPosition(155,45); 
        line.width = 280;
		this.addChild(line);

        let ptitle = null;
        if (playerInfo.ptitle && playerInfo.ptitle.ptitle && playerInfo.ptitle.ptitle != "")
        {
            ptitle= playerInfo.ptitle;
        }

        let headContainer = Api.playerVoApi.getPlayerCircleHead(playerInfo.pic,ptitle);
        headContainer.setPosition(73,bg.height/2-headContainer.height/2);
        this.addChild(headContainer);
        
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        headContainer.addTouchTap(()=>{
            NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{
                ruid:this._uid,
                rzid:Api.mergeServerVoApi.getTrueZid(this._uid)
            });
        },this);

        let zid =  Api.mergeServerVoApi.getTrueZid(this._uid);
        let nameStr = LanguageManager.getlocal("acLadder_log_title",[String(playerInfo.name),String(zid)]);
        let name = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_YELLOW2);
        name.setPosition(176,15);
        this.addChild(name);

        if (playerInfo.title && playerInfo.title.title &&  playerInfo.title.title != "")
        {   
            let officerImg = App.CommonUtil.getTitlePic(playerInfo.title);
            let deltaV = 0.7;
            officerImg.setScale(deltaV);
            officerImg.x = name.x+name.width; 
            officerImg.y = name.y + name.height/2 - officerImg.height*officerImg.scaleY/2;
            this.addChild(officerImg);
        }
        else
        {
            let officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
            officerTxt.text = LanguageManager.getlocal("officialTitle"+ playerInfo.level);
            officerTxt.x = name.x+name.width +20; 
            officerTxt.y = name.y;
            this.addChild(officerTxt);
        }

        let timestr = App.DateUtil.getFormatBySecond(data.st,19);
        let time = ComponentManager.getTextField(timestr,20,TextFieldConst.COLOR_BROWN);
        time.setPosition(180,60);
        time.lineSpacing =5;
        this.addChild(time);

       if (data.winuid != Api.playerVoApi.getPlayerID())
       {
            let fightNum = Api.laddertournamentVoApi.getFightTimes();
            let totalNum = Api.laddertournamentVoApi.cfg.freeNum;
            let freeNum = totalNum>fightNum ? totalNum-fightNum : 0;
            
            if (freeNum>0)
            {   
                let todaytimes = ComponentManager.getTextField("",18,TextFieldConst.COLOR_BROWN);
                this.addChild(todaytimes);
                todaytimes.text = LanguageManager.getlocal("acLadder_today_times2",[String(freeNum),String(totalNum)]);
                todaytimes.setPosition(530-todaytimes.width/2,30);
            }
            else
            {
                let icon = BaseLoadBitmap.create("itemicon_small2281");
                icon.width = 50;
                icon.height = 45; 
                icon.setPosition(480,14);
                this.addChild(icon);
                
                let itemvo = GameData.formatRewardItem(Api.laddertournamentVoApi.cfg.needItem)[0];
                let hasNum = Api.itemVoApi.getItemNumInfoVoById(itemvo.id);
                let needNum = itemvo.num;
                let needitem = ComponentManager.getTextField("0",20,TextFieldConst.COLOR_BROWN);
                needitem.text = LanguageManager.getlocal("AcMazeViewTaskPlan",[String(hasNum),String(needNum)]);
                needitem.setPosition(icon.x+icon.width+2,icon.y+icon.height/2-needitem.height/2);
                this.addChild(needitem);

                if (hasNum<needNum)
                {
                    needitem.textColor = TextFieldConst.COLOR_WARN_RED;
                }
            }

       }

        
        let againBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED,"acLadder_fight_agagin",this.againHandle,this);
        againBtn.setPosition(bg.width-15-againBtn.width,55);
        this.addChild(againBtn); 

        let scorestr:string;
        let scorecolor:number;
        if (data.winuid == Api.playerVoApi.getPlayerID())
        {
            againBtn.setEnable(false);
            scorestr = LanguageManager.getlocal("acLadder_log_win",[String(data.getPoint[0])]);
            scorecolor = TextFieldConst.COLOR_WARN_GREEN2;
        }
        else
        {
            scorestr = LanguageManager.getlocal("acLadder_log_lose",[String(data.getPoint[0])]);
            scorecolor = TextFieldConst.COLOR_QUALITY_RED;
        }
        let score = ComponentManager.getTextField(scorestr,20,scorecolor);
        score.setPosition(300,70);
        this.addChild(score);
    }

    private userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        if(String(data.ruid) == String(this._uid))
        {
            if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
            {
                data["crossZone"] = 1;
                data['zid'] = Api.mergeServerVoApi.getTrueZid(this._uid);
            }
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        }
    }

    private replayHandle():void
    {
        // Api.laddertournamentVoApi.setFightData(this._pkLogs);
        // ViewController.getInstance().openView(ViewConst.COMMON.LADDERFORMTIONVIEW);
        NetManager.request(NetRequestConst.REQUEST_LT_GETLOGDETAIL,
            {
                activeId:Api.laddertournamentVoApi.aidAndCode,
                idx:this._index+1,
            });
    }

    private againHandle():void
    {

        if (Api.laddertournamentVoApi.acVo.checkIsInEndShowTime()) {
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
			return;
        }
        
        if (Api.laddertournamentVoApi.checkIsTruce())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_truceTip"));
            return ;
        }

        let fightNum = Api.laddertournamentVoApi.getFightTimes();
        let totalNum = Api.laddertournamentVoApi.cfg.freeNum;
        if (fightNum >=totalNum)
        {
            let itemvo = GameData.formatRewardItem(Api.laddertournamentVoApi.cfg.needItem)[0];
            let hasNum = Api.itemVoApi.getItemNumInfoVoById(itemvo.id);
            let needNum = itemvo.num;
            if (hasNum<needNum)
            {   
                App.CommonUtil.showTip(LanguageManager.getlocal("acLadder_item_no_num"));
                return;
            }
        }
        
        


        NetManager.request(NetRequestConst.REQUEST_LT_FIGHT,
            {
                activeId:Api.laddertournamentVoApi.aidAndCode,
                fpos:this._index+1,
                rfuid:this._uid,
            });
    }

    public dispose()
    {   
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
        this._pkLogs = null;
        this._uid = 0;

        super.dispose();
    }
}