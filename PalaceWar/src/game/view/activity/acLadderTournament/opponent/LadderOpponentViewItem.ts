class LadderOpponentViewItem  extends ScrollListItem
{   
    private _data:any = null;

    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any,itemparam:any)
    {   
        this._data = data;

        this.height = 270;
        let bgpic = "ladder_opponent_bg3";
        if (index == 0)
        {
            bgpic = "ladder_opponent_bg1";
        }
        else if (index == 1)
        {
            bgpic = "ladder_opponent_bg2";
        }

        let bg:BaseBitmap = BaseBitmap.create(bgpic);
        bg.setPosition(0,25);
        this.addChild(bg);

        let titlebg:BaseBitmap = BaseBitmap.create("ladder_opponent_titlebg");
        this.addChild(titlebg);

        let titlestr = LanguageManager.getlocal("acLadder_opponent_title",[data.name,String(data.zid)]);
        let titleText = ComponentManager.getTextField(titlestr,22,TextFieldConst.COLOR_WHITE);
        if (titleText.width+120>titlebg.width)
        {
            titlebg.width = titleText.width+120;
        }
        titlebg.setPosition(GameConfig.stageWidth/2-titlebg.width/2,0);
        titleText.setPosition(GameConfig.stageWidth/2-titleText.width/2,titlebg.height/2-titleText.height/2);
        this.addChild(titleText);

        let scorebg1 = BaseBitmap.create("ladder_opponent_score2");
        scorebg1.setPosition(400,60);
        this.addChild(scorebg1);

        let scorebg2 = BaseBitmap.create("ladder_opponent_score2");
        scorebg2.setPosition(400,100);
        this.addChild(scorebg2);

        let scorebg3 = BaseBitmap.create("ladder_opponent_score1");
        scorebg3.setPosition(263,scorebg1.y+scorebg1.height/2-scorebg3.height/2);
        this.addChild(scorebg3);

        let scorebg4 = BaseBitmap.create("ladder_opponent_score1");
        scorebg4.setPosition(263,scorebg2.y+scorebg2.height/2-scorebg4.height/2);
        this.addChild(scorebg4);

        let scoreText1 = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_opponent_score"), 22, TextFieldConst.COLOR_WHITE);
		scoreText1.setPosition(scorebg3.x+scorebg3.width/2-scoreText1.width/2, scorebg3.y+scorebg3.height/2-scoreText1.height/2);
        this.addChild(scoreText1);

        let scoreText2 = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_opponent_power"), 22, TextFieldConst.COLOR_WHITE);
		scoreText2.setPosition(scorebg4.x+scorebg4.width/2-scoreText2.width/2, scorebg4.y+scorebg4.height/2-scoreText2.height/2);
        this.addChild(scoreText2);

        let scoreText3 = ComponentManager.getTextField(String(data.value), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText3.setPosition(scorebg1.x+scorebg1.width/2-scoreText3.width/2, scorebg1.y+scorebg1.height/2-scoreText3.height/2);
        this.addChild(scoreText3);

        let scoreText4 = ComponentManager.getTextField(String(data.power), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText4.setPosition(scorebg2.x+scorebg2.width/2-scoreText4.width/2, scorebg2.y+scorebg2.height/2-scoreText4.height/2);
        this.addChild(scoreText4);

        let cangetsore = Api.laddertournamentVoApi.getCanGetScore(data.value,Api.laddertournamentVoApi.getMyPoint());
        let getSocreStr = LanguageManager.getlocal("acLadder_opponent_getscore",[String(cangetsore)]);
        let scoreText5 = ComponentManager.getTextField(getSocreStr, 22, TextFieldConst.COLOR_WHITE);
		scoreText5.setPosition(280,150);
        this.addChild(scoreText5);

        let titleId = data.level;
        if (data.title && data.title.clothes && data.title.clothes!="")
        {
            titleId  = data.title.clothes;
        }
        let player = Api.playerVoApi.getPlayerPortrait(titleId,data.pic);
        player.y = 25;

        if (player.width>460)
        {
            player.x = -180;
        }
        
        player.setScale(0.9);
        this.addChild(player);
        let rect = new egret.Rectangle();
        rect.setTo(0,0,player.width,230);
        player.mask = rect;

        let downbg = BaseBitmap.create("ladder_opponent_bottom");
        downbg.setPosition(0,220);
        this.addChild(downbg);

        let changeBtn = ComponentManager.getButton("ladder_challeng_btn",null,this.challengeHandle,this);
        changeBtn.setPosition(502,138);
        changeBtn.setScale(0.85);
        this.addChild(changeBtn);

        let clip = ComponentManager.getCustomMovieClip("ladder_ef_search",10,100);
        clip.setPosition(changeBtn.x-85+changeBtn.width*changeBtn.scaleX/2,changeBtn.y-85+changeBtn.height*changeBtn.scaleY/2-20);
        clip.setScale(0.85)
		this.addChild(clip);
		clip.playWithTime(0);
		clip.blendMode = egret.BlendMode.ADD;

        let infobg = BaseBitmap.create("ladder_opponent_timesbg");
        infobg.setPosition(GameConfig.stageWidth-infobg.width-15,228);
        this.addChild(infobg);

        let fightNum = Api.laddertournamentVoApi.getFightTimes();
        let totalNum = Api.laddertournamentVoApi.cfg.freeNum;
        let freeNum = totalNum>fightNum ? totalNum-fightNum : 0;

        if (freeNum>0)
        {   
            let todaytimes = ComponentManager.getTextField("",18,TextFieldConst.COLOR_WHITE);
            this.addChild(todaytimes);
            todaytimes.text = LanguageManager.getlocal("acLadder_today_times2",[String(freeNum),String(totalNum)]);
            
            if (todaytimes.width+20>infobg.width)
            {
                infobg.width = todaytimes.width+22;
                infobg.x = GameConfig.stageWidth-infobg.width-15;
            }
            todaytimes.setPosition(infobg.x+infobg.width/2-todaytimes.width/2,infobg.y+infobg.height/2-todaytimes.height/2);
        }
        else
        {
            let icon = BaseLoadBitmap.create("itemicon_small2281");
            icon.width = 50*0.8;
            icon.height = 45*0.8; 
            icon.setPosition(infobg.x+20,infobg.y+infobg.height/2-icon.height/2);
            this.addChild(icon);
            
            let itemvo = GameData.formatRewardItem(Api.laddertournamentVoApi.cfg.needItem)[0];
            let hasNum = Api.itemVoApi.getItemNumInfoVoById(itemvo.id);
            let needNum = itemvo.num;
            let needitem = ComponentManager.getTextField("0",20,TextFieldConst.COLOR_WHITE);
            needitem.text = LanguageManager.getlocal("AcMazeViewTaskPlan",[String(hasNum),String(needNum)]);
            needitem.setPosition(icon.x+icon.width+2,icon.y+icon.height/2-needitem.height/2);
            this.addChild(needitem);

            // if (hasNum<needNum)
            // {
            //     needitem.textColor = TextFieldConst.COLOR_WARN_RED;
            // }
        }
    } 


    private challengeHandle():void
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

        Api.laddertournamentVoApi.opponentInfo = this._data;
        NetManager.request(NetRequestConst.REQUEST_LT_FIGHT,{activeId:Api.laddertournamentVoApi.aidAndCode,fpos:this._index+1});
        //test code
        // ViewController.getInstance().openView(ViewConst.COMMON.LADDEROPPONENAPPEARTVIEW);
    }

    public dispose():void{

        this._data = null;

        super.dispose();
    }
}
