/**
 * 排行榜
 * author yanyuling
 * date 2017/10/25
 * @class RankView
 */

class RankSingleView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
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
    private SendTypeList = [];
    private _topBg:BaseBitmap;
    private _headNode1:BaseDisplayObjectContainer;
    private _headNode2:BaseDisplayObjectContainer;
    private _headNode3:BaseDisplayObjectContainer;

    private _nameBg1:BaseBitmap;
    private _nameTxt1:BaseTextField;
    private _nameBg2:BaseBitmap;
    private _nameTxt2:BaseTextField;
    private _nameBg3:BaseBitmap;
    private _nameTxt3:BaseTextField;



    public constructor() {
        super();
	}

	public initView():void
	{
        
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_VISIT),this.worshipCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_INDEX),this.refreshRankList,this);
        // NetManager.request(NetRequestConst.REQUEST_RANK_INDEX,{});
        Api.mainTaskVoApi.checkShowGuide("RankSingleView");
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let border = BaseBitmap.create("commonview_border1");
		border.width = GameConfig.stageWidth;
		border.height = GameConfig.stageHeigth - 69 - 85;
		border.x = 0;
		border.y = 71;
		this.addChildToContainer(border);

        // 膜拜背景
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
        //最底部背景
        // let bottomBg2 = BaseBitmap.create("adult_lowbg");
        // bottomBg2.x = GameConfig.stageWidth /2 - bottomBg2.width/2;
        // bottomBg2.y = GameConfig.stageHeigth - bottomBg2.height -this.container.y - 21;
		// this._nodeContainer.addChild(bottomBg2);




        // let topBg:BaseBitmap = BaseBitmap.create("servant_bottombg");
        // topBg.width = GameConfig.stageWidth+18;
        // topBg.x = -9
        // topBg.y = -35;
		// topBg.height = bottomBg2.y  - topBg.y+20;
		// this._nodeContainer.addChildAt(topBg,0);

        let tabName = ["rankTab1","rankTab2","rankTab3"];
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = 15;
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
            red.visible = !Api.otherInfoVoApi.isRankVisited(index)
            this._nodeContainer.addChild(red);
            this._redList.push(red);
        }

        let topBg = BaseBitmap.create("dailytask_topbg");
        topBg.x = GameConfig.stageWidth/2 - topBg.width/2;
        topBg.y = 74;
        this._topBg = topBg;
        this._nodeContainer.addChild(topBg);
        
        //添加前三名




        let outBg = BaseBitmap.create("public_9v_bg14");
        outBg.height = bottomBg.y - 89 - topBg.height;
        outBg.width = 620;
        outBg.x = GameConfig.stageWidth/2 - outBg.width/2;
        outBg.y = topBg.y + topBg.height;//bottomBg.y - innerBg.height - 13;
        this._nodeContainer.addChild(outBg);

        //排行榜内部
        let innerBg = BaseBitmap.create("public_9v_bg12");
        innerBg.height = outBg.height - 20;
        innerBg.width = 590;
        innerBg.x = GameConfig.stageWidth/2 - innerBg.width/2;
        innerBg.y = outBg.y + outBg.height/2 - innerBg.height/2;//topBg.y + topBg.height;//bottomBg.y - innerBg.height - 13;
        this._nodeContainer.addChild(innerBg);

        let topLine = BaseBitmap.create("commonview_border3");
        topLine.width = topBg.width-10;
        topLine.x = GameConfig.stageWidth/2 - topLine.width/2;
        topLine.y = topBg.y + topBg.height - 5;
        this._nodeContainer.addChild(topLine);

        //标头
        let titleBg = BaseBitmap.create("public_ts_bg01");
        titleBg.width = innerBg.width - 20;
        titleBg.x = this.viewBg.width/2 - titleBg.width/2;
        titleBg.y = innerBg.y + 15;
		this._nodeContainer.addChild(titleBg);

        this._listPosY = titleBg.y+titleBg.height+5;
        this._scroRect = new egret.Rectangle(innerBg.x, titleBg.height + 10, innerBg.width - 10,innerBg.height - 60);//innerBg.height -titleBg.height - 90);


        //许愿文字
        let worshipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN_NEW)
        worshipTxt.text = LanguageManager.getlocal("rankworship_tip");
        worshipTxt.x = bottomBg.x + 30;
        worshipTxt.y = bottomBg.y + 195*3/4 - worshipTxt.height/2;//bottomBg.y + bottomBg.height/2 - worshipTxt.height/2;
        this._nodeContainer.addChild(worshipTxt);

        let worshipBtn = ComponentManager.getButton( ButtonConst.BTN_NORMAL_YELLOW,"rankworship",this.worshipBtnHandler,this);
        worshipBtn.x = bottomBg.x + bottomBg.width - worshipBtn.width - 30;
        worshipBtn.y = bottomBg.y + 195*3/4 - worshipBtn.height/2;//bottomBg.y + bottomBg.height/2 - worshipBtn.height/2;
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
        //底部个人排行信息
        let  title_rankTxt  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
        title_rankTxt.text = LanguageManager.getlocal("rankorder");
        title_rankTxt.x =  worshipTxt.x +10; 
        title_rankTxt.y =   titleBg.y  + titleBg.height/2 -title_rankTxt.height / 2 ;//titleBg.y  + titleBg.height/2 -title_rankTxt.height+15 ;
        this._nodeContainer.addChild(title_rankTxt);
        this._title_rankTxt = title_rankTxt;

        let title_nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
        title_nameTxt.text = LanguageManager.getlocal("ranknickName");
        // title_nameTxt.x = title_rankTxt.x + 110;
        title_nameTxt.x = title_rankTxt.x + 154 - title_nameTxt.width/2;
        title_nameTxt.y = title_rankTxt.y
        this._nodeContainer.addChild(title_nameTxt);
        this._title_nameTxt = title_nameTxt;

        let title_officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
        title_officerTxt.text = LanguageManager.getlocal("rankofficer");
        // title_officerTxt.x = title_nameTxt.x + 200;
        title_officerTxt.x = title_rankTxt.x + 332 - title_officerTxt.width/2;
        title_officerTxt.y = title_rankTxt.y;
        this._nodeContainer.addChild(title_officerTxt);
        this._title_officerTxt = title_officerTxt;

        let title_powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
        title_powerTxt.text = LanguageManager.getlocal("rankpower");
        // title_powerTxt.x = title_officerTxt.x + 150;
        title_powerTxt.x = title_rankTxt.x + 482 - title_powerTxt.width/2 - 5;
        title_powerTxt.y = title_rankTxt.y;
        this._nodeContainer.addChild(title_powerTxt);
        this._title_powerTxt = title_powerTxt;

        //底部个人排行信息
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
        nameTxt.text = LanguageManager.getlocal("ranknickName2",[Api.playerVoApi.getPlayerName()]);
        nameTxt.x =  worshipTxt.x ; 
        nameTxt.y =   bottomBg.y  + 15;
        this._nodeContainer.addChild(nameTxt);
       
        let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
        rankTxt.x = nameTxt.x + 300;
        rankTxt.y = nameTxt.y
        this._nodeContainer.addChild(rankTxt);
        this._rankTxt = rankTxt

        let officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
        officerTxt.text = LanguageManager.getlocal("rankofficer2",[Api.playerVoApi.getPlayerOffice()]) ;
        officerTxt.x = nameTxt.x;
        officerTxt.y = nameTxt.y + 35;
        this._nodeContainer.addChild(officerTxt);

        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
        powerTxt.x = rankTxt.x;
        powerTxt.y = officerTxt.y;
        this._nodeContainer.addChild(powerTxt);
        this._powerTxt = powerTxt
        this.tabBtnClickHandler({index:0});
    }

    protected refreshTopTitle()
    {
        if(this._curTabIdx == 0)
        {
            this._title_officerTxt.text = LanguageManager.getlocal("rankofficer");
            this._title_powerTxt.text =  LanguageManager.getlocal("rankpower");
            this._powerTxt.text = LanguageManager.getlocal("rankpower2",[String(Api.playerVoApi.getPlayerPower())]);
            this._rankTxt.text = LanguageManager.getlocal("rankorder2",[String(Api.rankVoApi.getprank())]) ;

            this._title_nameTxt.x =  this._title_rankTxt.x + 154 - this._title_nameTxt.width/2;
            this._title_officerTxt.x =  this._title_rankTxt.x + 332 - this._title_officerTxt.width/2;
            this._title_powerTxt.x = this._title_rankTxt.x + 482 - this._title_powerTxt.width/2

        }else  if(this._curTabIdx == 1)
        {
            let cid = Api.rankVoApi.getcid()
            let bcid:number = Api.challengeVoApi.getBigChannelIdByCid(cid);
            let cTxt = String(bcid) +"."+ LanguageManager.getlocal("challengeTitle"+ bcid);
            this._powerTxt.text = LanguageManager.getlocal("rankchallenge",[cTxt]);
            this._rankTxt.text = LanguageManager.getlocal("rankorder2",[String(Api.rankVoApi.getcRank())]) ;

            this._title_officerTxt.text = LanguageManager.getlocal("rank_challenge");
            this._title_powerTxt.text =  "";
            this._title_nameTxt.x =  this._title_rankTxt.x + 140+44 - this._title_nameTxt.width/2;
            this._title_officerTxt.x =  this._title_nameTxt.x + 270 + 22 - this._title_officerTxt.width/2;
        }else if(this._curTabIdx == 2)
        {
            this._powerTxt.text = LanguageManager.getlocal("rankimacy",[String(Api.rankVoApi.getimacy())]);
            this._rankTxt.text = LanguageManager.getlocal("rankorder2",[String(Api.rankVoApi.getirank())]) ;

            this._title_officerTxt.text = LanguageManager.getlocal("rank_imacy");
            this._title_powerTxt.text =  "";
            this._title_nameTxt.x =  this._title_rankTxt.x + 140 + 44 - this._title_nameTxt.width/2;
            this._title_officerTxt.x =  this._title_nameTxt.x + 270 +33 - this._title_officerTxt.width/2 ;
        }
    }
    protected worshipCallback(event:egret.Event)
    {   
        for (let index = 0; index < this._redList.length; index++) {
            this._redList[index].visible = !Api.otherInfoVoApi.isRankVisited(index)
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
        //test-------
        // egret.Tween.get(this._worshipFlag,{loop:false}).to({scaleX:1,scaleY:1},400).wait(600).call(function(){
        //     ViewController.getInstance().openView(ViewConst.BASE.RANKWORSHIPVIEW,null);
		// });
        
        NetManager.request(NetRequestConst.REQUEST_RANK_VISIT,{dtype:this._curTabIdx+1});
    }
    protected tabBtnClickHandler(params:any)
    {
        this._curTabIdx = params.index
        if(this.SendTypeList[""+(this._curTabIdx+1)]){
            this.refreshRankList();
        }else{
            this.SendTypeList[""+(this._curTabIdx+1)] = 1;
            NetManager.request(NetRequestConst.REQUEST_RANK_INDEX,{dtype:this._curTabIdx+1});
        }
        
    }
    protected refreshRankList()
    {
        this.refreshTopTitle();
        if (Api.otherInfoVoApi.isRankVisited(this._curTabIdx))
        {
            this._worshipFlag.visible = true;
            this._worshipBtn.visible = false;
        }else
        {
            this._worshipFlag.visible = false;
            this._worshipBtn.visible = true;    
        }
        // let data = event.data;
        // egret.log(">>>>>>>>");
        //刷新列表
        let list = Api.rankVoApi.getRankListByTabIdx(this._curTabIdx);
        if (! this._scrollList)
        {
            this._scrollList  = ComponentManager.getScrollList(RankScrollItem,list,this._scroRect);
            this._scrollList.x = GameConfig.stageWidth/2 - this._scrollList.width/2;
            this._scrollList.y =this._listPosY
            this._nodeContainer.addChild(this._scrollList);
        }
        else
        { 
             this._scrollList.refreshData(list);
        }
        this.refreshTop(list)

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
    //创建和刷新头三名头像
    private refreshTop(listData:any[]){
        if(listData && listData[0]){
            let curData = listData[0];

            let curLv = Number(curData.level);
            let posX = -10;
            if (curData.title != "")
            {
                curLv = Number(curData.title);
                posX = -30;
            }
            if(!this._headNode1){
                let headNode1 = new BaseDisplayObjectContainer();
                this._headNode1 = headNode1;
                let headBg1 = BaseBitmap.create("rank_titlebg1");
                headBg1.name = "headBg";
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
                headNode1.x = this._topBg.x + this._topBg.width/2 - headNode1.width/2;
                headNode1.y = this._topBg.y + this._topBg.height/2 - headNode1.height/2-10;
                this._nodeContainer.addChild(headNode1);

                let droContainer1 = new BaseDisplayObjectContainer();
                headNode1.addChild(droContainer1);
                droContainer1.name = "droContainer";

                let mask1 = BaseBitmap.create("rank_maskb");
                mask1.name = "mask";
                headNode1.addChild(mask1);
                let body1 = Api.playerVoApi.getPlayerPortrait(curLv,Number(curData.pic));
                body1.name = "body";
                body1.setScale(0.65);
                body1.x = posX;
                body1.y = -10;
                //body1.mask = mask1;
                droContainer1.addChild(body1);
                droContainer1.mask = mask1

                let nameBg = BaseBitmap.create("public_servant_namebg2");
                nameBg.x = headNode1.x + headNode1.width/2 - nameBg.width/2;
                nameBg.y = this._topBg.y + this._topBg.height - nameBg.height - 1;
                this._nodeContainer.addChild(nameBg);
                this._nameBg1 = nameBg;

                let nameTxt = ComponentManager.getTextField(curData.name,18,TextFieldConst.COLOR_WHITE);
                nameTxt.x = nameBg.x + nameBg.width/2 - nameTxt.width/2;
                nameTxt.y = nameBg.y + nameBg.height/2 - nameTxt.height/2;
                this._nodeContainer.addChild(nameTxt);
                this._nameTxt1 = nameTxt;
            } else {
                this._nameTxt1.text = curData.name;
                this._nameTxt1.x = this._nameBg1.x + this._nameBg1.width/2 - this._nameTxt1.width/2;
                this._nameTxt1.y = this._nameBg1.y + this._nameBg1.height/2 - this._nameTxt1.height/2;
                let droContainer = <BaseDisplayObjectContainer>this._headNode1.getChildByName("droContainer");
                let body = droContainer.getChildByName("body");
                droContainer.removeChild(body);
                let mask = this._headNode1.getChildByName("mask");

                let curBody = Api.playerVoApi.getPlayerPortrait(curLv,Number(curData.pic));
                curBody.name = "body";
                curBody.setScale(0.65);
                curBody.x = posX;
                curBody.y = -10;
                //curBody.mask = mask;
                droContainer.addChild(curBody);

                let headBg:BaseBitmap = <BaseBitmap>this._headNode1.getChildByName("headBg");
                headBg.removeTouch();
                headBg.addTouch(this.headNodeTouch,this,[curData]);
            }
            this._headNode1.visible = true;
        } else {
            if(this._headNode1){
                this._headNode1.visible = false;
            }
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
         
            if(!this._headNode2){
                let headNode2 = new BaseDisplayObjectContainer();
                this._headNode2 = headNode2;
                let headBg2 = BaseBitmap.create("rank_titlebg2");
                headBg2.name = "headBg";
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
                headNode2.x = this._topBg.x + this._topBg.width/4 - headNode2.width/2 - 30;
                headNode2.y = this._topBg.y + this._topBg.height/2 - headNode2.height/2-10;

                let droContainer2 = new BaseDisplayObjectContainer();
                headNode2.addChild(droContainer2);
                droContainer2.name = "droContainer";

                let mask2 = BaseBitmap.create("rank_masks");
                mask2.name = "mask";
                headNode2.addChild(mask2);

                let body2 = Api.playerVoApi.getPlayerPortrait(curLv,Number(curData.pic));
                body2.name = "body";
                body2.setScale(0.6* 0.81);
                body2.x = posX;
                body2.y = -8;
                //body2.mask = mask2;
                droContainer2.addChild(body2);
                droContainer2.mask = mask2
                this._nodeContainer.addChild(headNode2);

                let nameBg = BaseBitmap.create("public_servant_namebg2");
                nameBg.x = headNode2.x + headNode2.width/2 - nameBg.width/2;
                nameBg.y = this._topBg.y + this._topBg.height - nameBg.height - 1;
                this._nodeContainer.addChild(nameBg);
                this._nameBg2 = nameBg;

                let nameTxt = ComponentManager.getTextField(curData.name,18,TextFieldConst.COLOR_WHITE);
                nameTxt.x = nameBg.x + nameBg.width/2 - nameTxt.width/2;
                nameTxt.y = nameBg.y + nameBg.height/2 - nameTxt.height/2;
                this._nodeContainer.addChild(nameTxt);
                this._nameTxt2 = nameTxt;
            } else {
                this._nameTxt2.text = curData.name;
                this._nameTxt2.x = this._nameBg2.x + this._nameBg2.width/2 - this._nameTxt2.width/2;
                this._nameTxt2.y = this._nameBg2.y + this._nameBg2.height/2 - this._nameTxt2.height/2;
                let droContainer = <BaseDisplayObjectContainer>this._headNode2.getChildByName("droContainer");
                let body = droContainer.getChildByName("body");
                droContainer.removeChild(body);
                let mask = this._headNode2.getChildByName("mask");

                let curBody = Api.playerVoApi.getPlayerPortrait(curLv,Number(curData.pic));
                curBody.name = "body";
                curBody.setScale(0.6* 0.81);
                curBody.x = posX;
                curBody.y = -8;
                //curBody.mask = mask;
                droContainer.addChild(curBody); 
                let headBg:BaseBitmap = <BaseBitmap>this._headNode2.getChildByName("headBg");
                headBg.removeTouch();
                headBg.addTouch(this.headNodeTouch,this,[curData]);
            }
            this._headNode2.visible = true;
        } else {
            if(this._headNode2){
                this._headNode2.visible = false;
            }
            
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
    
            if(!this._headNode3){
                let headNode3 = new BaseDisplayObjectContainer();
                this._headNode3 = headNode3;
                let headBg3 = BaseBitmap.create("rank_titlebg3");
                headBg3.name = "headBg";
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
                headNode3.x = this._topBg.x + this._topBg.width*3/4 - headNode3.width/2 + 30;
                headNode3.y = this._topBg.y + this._topBg.height/2 - headNode3.height/2-10;

                let droContainer3 = new BaseDisplayObjectContainer();
                headNode3.addChild(droContainer3);
                droContainer3.name = "droContainer";

                let mask3 = BaseBitmap.create("rank_masks");
                mask3.name = "mask";
                headNode3.addChild(mask3);
                let body3 = Api.playerVoApi.getPlayerPortrait(curLv,Number(curData.pic));
                body3.name = "body";
                body3.setScale(0.6 * 0.81);
                body3.x = posX;
                body3.y = -8;
                //body3.mask = mask3;
                droContainer3.addChild(body3);
                droContainer3.mask = mask3;


                this._nodeContainer.addChild(headNode3);

                let nameBg = BaseBitmap.create("public_servant_namebg2");
                nameBg.x = headNode3.x + headNode3.width/2 - nameBg.width/2;
                nameBg.y = this._topBg.y + this._topBg.height - nameBg.height - 1;
                this._nodeContainer.addChild(nameBg);
                this._nameBg3 = nameBg;

                let nameTxt = ComponentManager.getTextField(curData.name,18,TextFieldConst.COLOR_WHITE);
                nameTxt.x = nameBg.x + nameBg.width/2 - nameTxt.width/2;
                nameTxt.y = nameBg.y + nameBg.height/2 - nameTxt.height/2;
                this._nodeContainer.addChild(nameTxt);
                this._nameTxt3 = nameTxt;
            } else {
                this._nameTxt3.text = curData.name;
                this._nameTxt3.x = this._nameBg3.x + this._nameBg3.width/2 - this._nameTxt3.width/2;
                this._nameTxt3.y = this._nameBg3.y + this._nameBg3.height/2 - this._nameTxt3.height/2;
                let droContainer = <BaseDisplayObjectContainer>this._headNode3.getChildByName("droContainer");
                let body = droContainer.getChildByName("body");
                droContainer.removeChild(body);
                let mask = this._headNode3.getChildByName("mask");
                

                let curBody = Api.playerVoApi.getPlayerPortrait(curLv,Number(curData.pic));
                curBody.name = "body";
                curBody.setScale(0.6* 0.81);
                curBody.x = posX;
                curBody.y = -8;
                //curBody.mask = mask;
                droContainer.addChild(curBody); 
                let headBg:BaseBitmap = <BaseBitmap>this._headNode3.getChildByName("headBg");
                headBg.removeTouch();
                headBg.addTouch(this.headNodeTouch,this,[curData]);
            }
            this._headNode3.visible = true;
        } else {
            if(this._headNode3){
                this._headNode3.visible = false;
            }
        }
    }

    protected receiveData(data: { ret: boolean, data: any }): void
    {
        let rData = data.data;
        if(rData.ret == 0)
        {
			let cmd = rData.cmd;
			if(cmd == NetRequestConst.REQUEST_RANK_INDEX){
			}
        }
    }
    // public hide()
    // {
    //     App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RANKVIEW_CLOSE_ANI,{ani:true,index:1});
    //     super.hide();
    // }
    protected getRequestData():{requestType:string,requestData:any} 
	{
        this.SendTypeList[""+(this._curTabIdx+1)] = 1;
		return {requestType:NetRequestConst.REQUEST_RANK_INDEX,requestData:{dtype:this._curTabIdx+1}};
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
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_VISIT),this.worshipCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_INDEX),this.refreshRankList,this);
        Api.mainTaskVoApi.hideGuide();
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
        this.SendTypeList = [];
        this._topBg = null;

   
        this._headNode1 = null;
        this._headNode2 = null;
        this._headNode3 = null;

        this._nameBg1 = null;
        this._nameTxt1 = null;
        this._nameBg2 = null;
        this._nameTxt2 = null;

        this._nameBg3 = null;
        this._nameTxt3 = null;

        super.dispose();
    }
}