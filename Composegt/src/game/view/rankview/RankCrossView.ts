/**
 * 排行榜
 * author yanyuling
 * date 2017/10/25
 * @class RankView
 */

class RankCrossView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _powerNodeContainer:BaseDisplayObjectContainer;
    private _alliNodeContainer:BaseDisplayObjectContainer;

    private _crossScrollList:ScrollList;
    private _scrollList:ScrollList;
    private _curTabIdx=0;
    protected _listPosY=0;
    protected _scroRect:egret.Rectangle;

    protected _title_rankTxt:BaseTextField;
    protected _title_nameTxt:BaseTextField;
    protected _title_officerTxt:BaseTextField;
    protected _title_powerTxt:BaseTextField;
    protected _rankTxt:BaseTextField;
    protected _powerTxt:BaseTextField;
    private _worshipBtn:BaseButton;
    private _worshipFlag:BaseBitmap;
    private _redList = [];
    private _tipTxt:BaseTextField;

    public constructor() {
        super();
	}

	public initView():void
	{

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_VISIT),this.worshipCallback,this);
        Api.mainTaskVoApi.checkShowGuide("RankCrossView");
        // NetManager.request(NetRequestConst.REQUEST_RANK_INDEX,{});

        let innerbg = BaseBitmap.create("public_9v_bg02");
        innerbg.width = GameConfig.stageWidth;
        innerbg.height = GameConfig.stageHeigth - this.container.y;
        innerbg.x = GameConfig.stageWidth/2 - innerbg.width/2;
        innerbg.y = -10;
        this.addChildToContainer(innerbg);

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
	    this._powerNodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._powerNodeContainer);
        this._alliNodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._alliNodeContainer);

        let allibg:BaseBitmap = BaseBitmap.create("public_9v_bg14");
        allibg.width = GameConfig.stageWidth;
        allibg.height = 740 - (1136 - GameConfig.stageHeigth );//GameConfig.stageHeigth - 69 - 99;
        allibg.x = 0;
		allibg.y = 75;
        this._alliNodeContainer.addChild(allibg);
        
        let alliInnerBg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
        alliInnerBg.width = 590;
        alliInnerBg.height = 720 - (1136 - GameConfig.stageHeigth );
        alliInnerBg.x = GameConfig.stageWidth / 2 - alliInnerBg.width/2;
		alliInnerBg.y = allibg.y + 10;
        this._alliNodeContainer.addChild(alliInnerBg);


        let border = BaseBitmap.create("commonview_border1");
		border.width = GameConfig.stageWidth;
		border.height = GameConfig.stageHeigth - 69 - 85;
		border.x = 0;
		border.y = 71;
		this.addChildToContainer(border);

        //最底部背景
        let bottomBg = BaseBitmap.create("public_listbg3");
        bottomBg.width = 600;
        bottomBg.height = 195;

        bottomBg.x = GameConfig.stageWidth /2 - bottomBg.width/2;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height -this.container.y - 25;
		this._nodeContainer.addChild(bottomBg);

        let bottomLine = BaseBitmap.create("public_line4");
        bottomLine.width = 567;
        bottomLine.x = bottomBg.x + bottomBg.width / 2 - bottomLine.width / 2;
        bottomLine.y = bottomBg.y + bottomBg.height/2 - bottomLine.height / 2;
        this._nodeContainer.addChild(bottomLine);


        let bottomB = BaseBitmap.create("commonview_bottom");

		bottomB.x = 0;
		bottomB.y = border.y + border.height - bottomB.height;

		this.addChildToContainer(bottomB);


        // commonview_border2
        let border2 = BaseBitmap.create("commonview_border2");
        border2.width = GameConfig.stageWidth;
        border2.x = GameConfig.stageWidth/2 - border2.width/2;
        border2.y = bottomB.y - 225;
        this.addChildToContainer(border2);

		let leftItem = BaseBitmap.create("commonview_item1");
		leftItem.scaleX = -1;
		leftItem.x = leftItem.width;
		leftItem.y = border2.y + 40;
		this.addChildToContainer(leftItem);

		let rightItem = BaseBitmap.create("commonview_item1");
		rightItem.x = border.x + border.width - rightItem.width;
		rightItem.y = border2.y + 40;
        this.addChildToContainer(rightItem);

        let tabName = ["rankTab4","rankTab5"];
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = 25;
        tabbarGroup.y = -35 + 24
        this._nodeContainer.addChild(tabbarGroup);

        let tabX = tabbarGroup.x;
        for (let index = 0; index < tabName.length; index++) {
            let red:BaseBitmap = BaseBitmap.create("public_dot2");
            if(index == 0) 
                red.x = tabX+120;
            if(index == 1)
                red.x = tabX+120 + 149;
            if(index == 2)
                red.x = tabX+120 + 149 + 149;
            red.y = tabbarGroup.y + 5;
            red.visible = !!!Api.otherInfoVoApi.isRankVisited(index+3)
            this._nodeContainer.addChild(red);
            this._redList.push(red);
        }


        // 膜拜背景
        // let bottomBg = BaseBitmap.create("public_tc_bg03");
        // bottomBg.width = 620;
        // bottomBg.height = 96;
        // bottomBg.x = this.viewBg.width/2 - bottomBg.width/2;
        // bottomBg.y = bottomBg2.y - bottomBg.height - 5;//innerBg.y+innerBg.height -bottomBg.height-10 ;
		// this._nodeContainer.addChild(bottomBg);

        //         let allibg:BaseBitmap = BaseBitmap.create("public_9v_bg14");
        // allibg.width = GameConfig.stageWidth;
        // allibg.height = 740 - (1136 - GameConfig.stageHeigth );//GameConfig.stageHeigth - 69 - 99;
        // allibg.x = 0;
		// allibg.y = 75;
        // this._alliNodeContainer.addChild(allibg);
        
        // let alliInnerBg:BaseBitmap = BaseBitmap.create("public_9v_bg12");
        // alliInnerBg.width = 590;
        // alliInnerBg.height = 720 - (1136 - GameConfig.stageHeigth );
        // alliInnerBg.x = GameConfig.stageWidth / 2 - alliInnerBg.width/2;
		// alliInnerBg.y = allibg.y + 10;
        // this._alliNodeContainer.addChild(alliInnerBg);

        let topBg = BaseBitmap.create("dailytask_topbg");
        topBg.x = GameConfig.stageWidth/2 - topBg.width/2;
        topBg.y = 74;
        this._powerNodeContainer.addChild(topBg);

        //public_servant_namebg2
        let listData = Api.rankVoApi.getCrossPowerList();
        if(listData && listData[0]){
            let curData = listData[0];

            let curLv = Number(curData.level);
            let posX = -10;
            if (curData.title != "")
            {
                curLv = Number(curData.title);
                posX = -30;
            }
   

            let headNode1 = new BaseDisplayObjectContainer();
            let headBg1 = BaseBitmap.create("rank_titlebg1");
            headNode1.width = headBg1.width;
            headNode1.height = headBg1.height;
            headNode1.addChild(headBg1);
            headBg1.addTouch(this.headNodeTouch,this,[curData]);

            let anim1 = ComponentManager.getCustomMovieClip("rank_title1anim",10,100);
            anim1.x = headNode1.width/2 - 250/2;
            anim1.y = headNode1.height/2 - 250/2;
            anim1.blendMode = egret.BlendMode.ADD;
            anim1.playWithTime(-1);
            headNode1.addChild(anim1);
            headNode1.x = topBg.x + topBg.width/2 - headNode1.width/2;
            headNode1.y = topBg.y + topBg.height/2 - headNode1.height/2-10;
            this._powerNodeContainer.addChild(headNode1);

            let droContainer = new BaseDisplayObjectContainer();
            headNode1.addChild(droContainer);

            let mask1 = BaseBitmap.create("rank_maskb");
            headNode1.addChild(mask1);
            let body1 = Api.playerVoApi.getPlayerPortrait(curLv,Number(curData.pic));
            body1.setScale(0.65);
            body1.x = posX;
            body1.y = -10;
            //body1.mask = mask1;
            droContainer.addChild(body1);
            droContainer.mask = mask1;

            let nameBg = BaseBitmap.create("public_servant_namebg2");
            nameBg.x = headNode1.x + headNode1.width/2 - nameBg.width/2;
            nameBg.y = topBg.y + topBg.height - nameBg.height - 1;
            this._powerNodeContainer.addChild(nameBg);

            let nameTxt = ComponentManager.getTextField(curData.name,18,TextFieldConst.COLOR_WHITE);
            nameTxt.x = nameBg.x + nameBg.width/2 - nameTxt.width/2;
            nameTxt.y = nameBg.y + nameBg.height/2 - nameTxt.height/2;
            this._powerNodeContainer.addChild(nameTxt);
        }

        if(listData && listData[1]){
            let curData = listData[1];

            let curLv = Number(curData.level);
             let posX = 0;
            if (curData.title != "")
            {
                curLv = Number(curData.title);
                posX = -15;
            }
         

            let headNode2 = new BaseDisplayObjectContainer();
            let headBg2 = BaseBitmap.create("rank_titlebg2");
            headNode2.width = headBg2.width;
            headNode2.height = headBg2.height;
            headNode2.addChild(headBg2);
            headBg2.addTouch(this.headNodeTouch,this,[curData]);


            let anim2 = ComponentManager.getCustomMovieClip("rank_title2anim",10,100);
            anim2.x = headNode2.width/2 - 200/2;
            anim2.y = headNode2.height/2 - 200/2;
            anim2.blendMode = egret.BlendMode.ADD;
            anim2.playWithTime(-1);
            headNode2.addChild(anim2);
            headNode2.x = topBg.x + topBg.width/4 - headNode2.width/2 - 30;
            headNode2.y = topBg.y + topBg.height/2 - headNode2.height/2-10;

            let droContainer = new BaseDisplayObjectContainer();
            headNode2.addChild(droContainer);

            let mask2 = BaseBitmap.create("rank_masks");
            headNode2.addChild(mask2);

            let body2 = Api.playerVoApi.getPlayerPortrait(curLv,Number(curData.pic));
            body2.setScale(0.6* 0.81);
            body2.x = posX ;
            body2.y = -8;
            //body2.mask = mask2;
            droContainer.addChild(body2);
            droContainer.mask = mask2;



            this._powerNodeContainer.addChild(headNode2);

            let nameBg = BaseBitmap.create("public_servant_namebg2");
            nameBg.x = headNode2.x + headNode2.width/2 - nameBg.width/2;
            nameBg.y = topBg.y + topBg.height - nameBg.height - 1;
            this._powerNodeContainer.addChild(nameBg);

            let nameTxt = ComponentManager.getTextField(curData.name,18,TextFieldConst.COLOR_WHITE);
            nameTxt.x = nameBg.x + nameBg.width/2 - nameTxt.width/2;
            nameTxt.y = nameBg.y + nameBg.height/2 - nameTxt.height/2;
            this._powerNodeContainer.addChild(nameTxt);


        }

        if(listData && listData[2]){
            let curData = listData[2];

            let curLv = Number(curData.level);
            let posX = 0;
            if (curData.title != "")
            {
                curLv = Number(curData.title);
                posX = -15;
            }
    

            let headNode3 = new BaseDisplayObjectContainer();
            let headBg3 = BaseBitmap.create("rank_titlebg3");
            headNode3.width = headBg3.width;
            headNode3.height = headBg3.height;
            headNode3.addChild(headBg3);
            headBg3.addTouch(this.headNodeTouch,this,[curData]);

            let anim3 = ComponentManager.getCustomMovieClip("rank_title3anim",10,100);
            anim3.x = headNode3.width/2 - 200/2;
            anim3.y = headNode3.height/2 - 200/2;
            anim3.blendMode = egret.BlendMode.ADD;
            anim3.playWithTime(-1);
            headNode3.addChild(anim3);
            headNode3.x = topBg.x + topBg.width*3/4 - headNode3.width/2 + 30;
            headNode3.y = topBg.y + topBg.height/2 - headNode3.height/2-10;

            let droContainer = new BaseDisplayObjectContainer();
            headNode3.addChild(droContainer);

            let mask3 = BaseBitmap.create("rank_masks");
            headNode3.addChild(mask3);
            let body3 = Api.playerVoApi.getPlayerPortrait(curLv,Number(curData.pic));
            body3.setScale(0.6 * 0.81);
            body3.x = posX ;
            body3.y = -8;
            //body3.mask = mask3;
            droContainer.addChild(body3);
            droContainer.mask = mask3

            this._powerNodeContainer.addChild(headNode3);

            let nameBg = BaseBitmap.create("public_servant_namebg2");
            nameBg.x = headNode3.x + headNode3.width/2 - nameBg.width/2;
            nameBg.y = topBg.y + topBg.height - nameBg.height - 1;
            this._powerNodeContainer.addChild(nameBg);

            let nameTxt = ComponentManager.getTextField(curData.name,18,TextFieldConst.COLOR_WHITE);
            nameTxt.x = nameBg.x + nameBg.width/2 - nameTxt.width/2;
            nameTxt.y = nameBg.y + nameBg.height/2 - nameTxt.height/2;
            this._powerNodeContainer.addChild(nameTxt);
        }



        let outBg = BaseBitmap.create("public_9v_bg14");
        outBg.height = bottomBg.y - 89 - topBg.height;
        outBg.width = 620;
        outBg.x = GameConfig.stageWidth/2 - outBg.width/2;
        outBg.y = topBg.y + topBg.height;//bottomBg.y - innerBg.height - 13;
        this._powerNodeContainer.addChild(outBg);
        //排行榜内部
        let innerBg = BaseBitmap.create("public_9v_bg12");
        innerBg.height = outBg.height - 20;
        innerBg.width = 590;
        innerBg.x = GameConfig.stageWidth/2 - innerBg.width/2;
        innerBg.y = outBg.y + outBg.height/2 - innerBg.height/2;//topBg.y + topBg.height;//bottomBg.y - innerBg.height - 13;
        this._powerNodeContainer.addChild(innerBg);

        let topLine = BaseBitmap.create("commonview_border3");
        topLine.width = topBg.width-10;
        topLine.x = GameConfig.stageWidth/2 - topLine.width/2;
        topLine.y = topBg.y + topBg.height - 5;
        this._powerNodeContainer.addChild(topLine);


        //标头
        let titleBg = BaseBitmap.create("public_ts_bg01");
        titleBg.width = innerBg.width - 20;
        titleBg.x = this.viewBg.width/2 - titleBg.width/2;
        titleBg.y = innerBg.y + 15;
		this._powerNodeContainer.addChild(titleBg);

        this._listPosY = titleBg.y+titleBg.height+5;
        this._scroRect = new egret.Rectangle(0, titleBg.height + 10, innerBg.width-10,innerBg.height - 60);//innerBg.height -titleBg.height - 90);


        //许愿文字
        let worshipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW)
        worshipTxt.text = LanguageManager.getlocal("rankview_crossPowerWorshipTip1");
        worshipTxt.x = bottomBg.x + 30;
        worshipTxt.y = bottomBg.y + 195*3/4 - worshipTxt.height/2; //bottomBg.y + bottomBg.height - 20 - worshipTxt.height;
        this._nodeContainer.addChild(worshipTxt);

        let worshipBtn = ComponentManager.getButton( ButtonConst.BTN_NORMAL_YELLOW,"rankworship",this.worshipBtnHandler,this);
        worshipBtn.x = bottomBg.x + bottomBg.width - worshipBtn.width - 30;
        worshipBtn.y = bottomBg.y + 195*3/4 - worshipBtn.height/2; //bottomBg.y + bottomBg.height - 20 - worshipBtn.height;
        worshipBtn.visible = false;
        this._nodeContainer.addChild(worshipBtn);
        this._worshipBtn = worshipBtn
        
        this._worshipFlag = BaseBitmap.create("public_mobai");
        this._worshipFlag.anchorOffsetX = this._worshipFlag.width/2;
        this._worshipFlag.anchorOffsetY = this._worshipFlag.height/2;
        // this._worshipFlag.setScale(0.7);
        this._worshipFlag.x = worshipBtn.x+90;
        this._worshipFlag.y = worshipBtn.y+30;
        this._worshipFlag.visible = false;
        this._nodeContainer.addChild(this._worshipFlag);


        //标题信息
        let  title_rankTxt  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
        title_rankTxt.text = LanguageManager.getlocal("rankorder");
        title_rankTxt.x =  worshipTxt.x +10; 
        title_rankTxt.y =   titleBg.y  + titleBg.height/2 -title_rankTxt.height / 2 ;
        this._powerNodeContainer.addChild(title_rankTxt);
        this._title_rankTxt = title_rankTxt;

        let title_nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
        title_nameTxt.text = LanguageManager.getlocal("ranknickName");
        title_nameTxt.x = title_rankTxt.x + 154 - title_nameTxt.width/2;
        title_nameTxt.y = title_rankTxt.y
        this._powerNodeContainer.addChild(title_nameTxt);
        this._title_nameTxt = title_nameTxt;

        let title_officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
        title_officerTxt.text = LanguageManager.getlocal("rankServer");
        title_officerTxt.x = title_rankTxt.x + 332 - title_officerTxt.width/2;
        title_officerTxt.y = title_rankTxt.y;
        this._powerNodeContainer.addChild(title_officerTxt);
        this._title_officerTxt = title_officerTxt;

        let title_powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
        title_powerTxt.text = LanguageManager.getlocal("rankpower");
        title_powerTxt.x = title_rankTxt.x + 482 - title_powerTxt.width/2 - 5;
        title_powerTxt.y = title_rankTxt.y;
        this._powerNodeContainer.addChild(title_powerTxt);
        this._title_powerTxt = title_powerTxt;

         //底部个人排行信息
        if(Api.rankVoApi.getapnum() < 1000){
            let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN_NEW)
            nameTxt.text = LanguageManager.getlocal("ranknickName2",[Api.playerVoApi.getPlayerName()]);
            nameTxt.x =  worshipTxt.x ; 
            nameTxt.y =   bottomBg.y  + 15;
            this._powerNodeContainer.addChild(nameTxt);
        
            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN_NEW)
            rankTxt.x = nameTxt.x + 300;
            rankTxt.y = nameTxt.y
            this._powerNodeContainer.addChild(rankTxt);
            this._rankTxt = rankTxt;

            let officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN_NEW)
            let sidname = Api.mergeServerVoApi.getAfterMergeSeverName();
            officerTxt.text = LanguageManager.getlocal("rankServer") +": " + sidname ; 
            officerTxt.x = nameTxt.x;
            officerTxt.y = nameTxt.y + 35;
            this._powerNodeContainer.addChild(officerTxt);

            let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN_NEW)
            powerTxt.x = rankTxt.x;
            powerTxt.y = officerTxt.y;
            this._powerNodeContainer.addChild(powerTxt);
            this._powerTxt = powerTxt;
        }

        //跨服帮会的信息
        if(Api.rankVoApi.getanum() < 1000){
            let allianceTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN_NEW)
            allianceTxt.text = LanguageManager.getlocal("acRank_myAlliancenick",[Api.playerVoApi.getPlayerAllianceName()]) ;
            allianceTxt.x =  worshipTxt.x ; 
            allianceTxt.y =   bottomBg.y  + 15;
            allianceTxt.name = "allianceTxt";
            this._alliNodeContainer.addChild(allianceTxt);

            let zoneTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN_NEW)
            let sidname = Api.mergeServerVoApi.getAfterMergeSeverName();
            zoneTxt.text = LanguageManager.getlocal("rankServer") +": " + sidname ; 
            zoneTxt.x = worshipTxt.x;
            zoneTxt.y = allianceTxt.y + 35;
            zoneTxt.name = "zoneTxt";
            this._alliNodeContainer.addChild(zoneTxt);

            let zoneRankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN_NEW)
            zoneRankTxt.text = LanguageManager.getlocal("rankorder2", ["" + Api.rankVoApi.getanum()]) ;
            zoneRankTxt.x = allianceTxt.x + 300;
            zoneRankTxt.y = allianceTxt.y
            this._alliNodeContainer.addChild(zoneRankTxt);
        }
        
        let tipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN_NEW)
        this._tipTxt = tipTxt;
        this._tipTxt.text = LanguageManager.getlocal("rankview_crossPowerTip1");
        tipTxt.x = bottomBg.x + bottomBg.width/2  ; 
        tipTxt.y = bottomBg.y  + 195 / 4 -  tipTxt.height / 2;
        this._tipTxt.text = "";
        this._nodeContainer.addChild(tipTxt);
        this.tabBtnClickHandler({index:0});
    }
    private headNodeTouch(event:egret.TouchEvent,uiData:any){
        switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
                
				break;
            case egret.TouchEvent.TOUCH_CANCEL:
               
                break;
			case egret.TouchEvent.TOUCH_END:
            
                if(uiData.zid){
                    NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{ruid:uiData.uid,rzid:uiData.zid});
                }else{
                    NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:uiData.uid});
                }
                break;
        }


    }
    protected refreshTopTitle()
    {
        if(this._curTabIdx == 0 && this._powerTxt)
        {
            this._powerTxt.text = LanguageManager.getlocal("rankpower2",[String(Api.playerVoApi.getPlayerPower())]);
            this._rankTxt.text = LanguageManager.getlocal("rankorder2",[String(Api.rankVoApi.getapnum())]) ;
        }
    }

    protected worshipCallback(event:egret.Event)
    {   
        let ret = event.data.data.ret;
        if(ret != 0)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("rankview_crossWorshipFailed"));
            return;
        }
        for (let index = 0; index < this._redList.length; index++) {
            this._redList[index].visible = !!!Api.otherInfoVoApi.isRankVisited(index+3)
        }
        let data = event.data;

        if(data.ret==true && data.data.data.lucky)
		{
			App.CommonUtil.showGodbless("rank");
		}
        this._worshipBtn.visible = false;   
        this._worshipFlag.setScale(1.3);
        this._worshipFlag.visible = true;
        egret.Tween.get(this._worshipFlag,{loop:false}).to({scaleX:1,scaleY:1},400).wait(600).call(function(){
            ViewController.getInstance().openView(ViewConst.BASE.RANKWORSHIPVIEW,data);
		});
    }
    protected worshipBtnHandler()
    {
        let taruid = "";
        let tarzid = "";
        if (this._curTabIdx == 0){
            let list = Api.rankVoApi.getCrossPowerList();
            let maxV = Math.min(list.length-1,Api.rankVoApi.getapnum()-1)
            let ranIdx = App.MathUtil.getRandom(0,maxV);
            taruid = list[ranIdx].uid;
            tarzid = list[ranIdx].zid;
        }else if (this._curTabIdx == 1){
            let list = Api.rankVoApi.getCrossAllianceRankList();
            let maxV = Math.min(list.length-1,Api.rankVoApi.getanum()-1)
            let ranIdx = App.MathUtil.getRandom(0,maxV);
            taruid = list[ranIdx].creator;
            tarzid = list[ranIdx].zid;
        }
        NetManager.request(NetRequestConst.REQUEST_RANKG_VISIT,{dtype:this._curTabIdx+1,ruid:taruid,rzid:tarzid});
    }

    protected refreshRankList()
    {
        if (!!Api.otherInfoVoApi.isRankVisited(this._curTabIdx+3)){
            this._worshipFlag.visible = true;
            this._worshipBtn.visible = false;
        }else{
            this._worshipFlag.visible = false;
            this._worshipBtn.visible = true;    
        }

        //刷新列表
        if(this._curTabIdx == 0){
            if(Api.rankVoApi.getapnum() > 1000){
                this._tipTxt.text = LanguageManager.getlocal("rankview_crossPowerTip1");
                this._tipTxt.anchorOffsetX =  this._tipTxt.width/2;
            }else{
                this._tipTxt.text = "";
            }
            this._powerNodeContainer.visible = true;
            this._alliNodeContainer.visible = false;
            this.refreshTopTitle();
            let list = Api.rankVoApi.getCrossPowerList();
            if (! this._scrollList) {
                this._scrollList  = ComponentManager.getScrollList(RankScrollItem,list,this._scroRect);
                this._scrollList.x = GameConfig.stageWidth/2 - this._scrollList.width/2;
                this._scrollList.y =this._listPosY;
                this._powerNodeContainer.addChild(this._scrollList);
            } else { 
                this._scrollList.refreshData(list);
            }
        }else if (this._curTabIdx == 1){
            if(Api.rankVoApi.getanum() > 1000){
                this._tipTxt.text = LanguageManager.getlocal("rankview_crossPowerTip2");
                this._tipTxt.anchorOffsetX =  this._tipTxt.width/2;
            }else{
                this._tipTxt.text = "";
            }
            this._powerNodeContainer.visible = false;
            this._alliNodeContainer.visible = true;
            let list = Api.rankVoApi.getCrossAllianceRankList();
            if(!list )
            {
                list = [];
            }
            if (! this._crossScrollList){
                let newRect = new egret.Rectangle(0,0,555,720 - (1136 - GameConfig.stageHeigth) - 20);
                this._crossScrollList  = ComponentManager.getScrollList(RankCrossScrollItem,list,newRect);
                this._crossScrollList.x = GameConfig.stageWidth/2 - this._crossScrollList.width/2;
                this._crossScrollList.y = 91;//this._listPosY - 30;
                this._alliNodeContainer.addChild(this._crossScrollList);
            }else{ 
                this._crossScrollList.refreshData(list);
            }
        }
    }
   
    protected receiveData(data: { ret: boolean, data: any }): void
    {
        let rData = data.data;
        if(rData.ret == 0)
        {
			let cmd = rData.cmd;
			if(cmd == NetRequestConst.REQUEST_RANKG_INDEX){
			}
        }
    }

    protected getRequestData():{requestType:string,requestData:any} 
	{
		return {requestType:NetRequestConst.REQUEST_RANKG_INDEX,requestData:{}};
	}
    
    protected tabBtnClickHandler(params:any)
    {
        this._curTabIdx = params.index
        this.refreshRankList();
    }
   
   protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rank_1","rank_2","rank_3","rank_display_namebg","rank_line",
            "rank_select_mask","servant_bottombg","wifeview_bottombg","public_mobai",
            "rank_biao","adult_lowbg",
            "commonview_border1",
            "commonview_bottom",
            "commonview_border2",
            "commonview_item1",

            "commonview_border3",
            "dailytask_topbg",
            "rank_guang1",
            "rank_guang2",
            "rank_guang3",
            "rank_maskb",
            "rank_masks",
            "rank_titlebg1",
            "rank_titlebg2",
            "rank_titlebg3"
        ]);
	}

	public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_VISIT),this.worshipCallback,this);
        Api.mainTaskVoApi.hideGuide();
        this._powerNodeContainer  = null;
        this._alliNodeContainer = null;
        this._curTabIdx = 0;
        this._nodeContainer = null;
        this._scrollList = null;
        this._title_nameTxt = null;
        this._title_officerTxt = null;
        this._title_powerTxt = null;
        this._title_rankTxt = null;
        this._rankTxt = null;
        this._powerTxt = null;
        this._redList = [];
        this._crossScrollList = null;
        this._tipTxt = null;

        super.dispose();
    }
}