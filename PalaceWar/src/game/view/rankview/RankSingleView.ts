/**
 * 排行榜 本服
 * author yanyuling
 * date 2017/10/25
 * @class RankSingleView
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
    private _tabbarGroup:TabBarGroup = null;
    private _mainTaskHandKey:string = null;
    private _mainTaskHandTabKey2:string = null;
    private _mainTaskHandTabKey3:string = null;
    public constructor() {
        super();
	}

	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_VISIT),this.worshipCallback,this);

        Api.mainTaskVoApi.checkShowGuide("RankSingleView");

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        //最底部背景
        let bottomBg2 = BaseBitmap.create("wifeview_bottombg");
        bottomBg2.x = 0;
        bottomBg2.y = GameConfig.stageHeigth - bottomBg2.height -this.container.y;
		this._nodeContainer.addChild(bottomBg2);

        let topBg:BaseBitmap = BaseBitmap.create("servant_bottombg");
        topBg.width = GameConfig.stageWidth+18;
        topBg.x = -9;
        topBg.y = -20;
		topBg.height = bottomBg2.y  - topBg.y+10;
		this._nodeContainer.addChildAt(topBg,0);

        let tabbg = BaseBitmap.create("commonview_tabbar_bg2");	
		this._nodeContainer.addChild(tabbg);
        let tabName = ["rankTab1","rankTab2","rankTab3"];
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB2,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.setSpace(0);
        tabbarGroup.x = 15;
        tabbarGroup.y = topBg.y ;
        this._nodeContainer.addChild(tabbarGroup);
        this._tabbarGroup = tabbarGroup;
        tabbg.y =topBg.y+5;

        let tabX = tabbarGroup.x;
        for (let index = 0; index < tabName.length; index++) {
            let red:BaseBitmap = BaseBitmap.create("public_dot2");
            if(index == 0)
                red.x = tabX+122-5;
            if(index == 1)
                red.x = tabX+280-13;
            if(index == 2)
                red.x = tabX+437-21;
            red.y = tabbarGroup.y+10;
            red.visible = !Api.otherInfoVoApi.isRankVisited(index)
            this._nodeContainer.addChild(red);
            this._redList.push(red);
        }

        let innerBg = BaseBitmap.create("public_9_bg36");
        innerBg.height = topBg.height - 95;
        innerBg.width = 620;
        innerBg.x = GameConfig.stageWidth/2 - innerBg.width/2;
        innerBg.y = topBg.y + 80;
        this._nodeContainer.addChild(innerBg);

        let titleBg = BaseBitmap.create("public_9_bg33");
        titleBg.width = innerBg.width;
        titleBg.height = 50;
        titleBg.x = innerBg.x;
        titleBg.y = innerBg.y;
		this._nodeContainer.addChild(titleBg);

        this._listPosY = titleBg.y+titleBg.height;
        this._scroRect = new egret.Rectangle(titleBg.x, 0, titleBg.width,innerBg.height -titleBg.height - 85);

        // 膜拜背景
        let bottomBg = BaseBitmap.create("public_9_bg34");
        bottomBg.width = innerBg.width;
        bottomBg.height = 74;
        bottomBg.x = innerBg.x;
        bottomBg.y = innerBg.y+innerBg.height -bottomBg.height-10 ;
		this._nodeContainer.addChild(bottomBg);

        let worshipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_ORANGE)
        worshipTxt.text = LanguageManager.getlocal("rankworship_tip");
        worshipTxt.x = bottomBg.x + 30;
        worshipTxt.y = bottomBg.y + bottomBg.height/2 - worshipTxt.height/2;
        this._nodeContainer.addChild(worshipTxt);

        let worshipBtn = ComponentManager.getButton( ButtonConst.BTN_SMALL_YELLOW,"rankworship",this.worshipBtnHandler,this);
        worshipBtn.x = bottomBg.x + bottomBg.width - worshipBtn.width - 30;
        worshipBtn.y = bottomBg.y + bottomBg.height/2 - worshipBtn.height/2;
        worshipBtn.visible = false;
        this._nodeContainer.addChild(worshipBtn);
        this._worshipBtn = worshipBtn
        
        this._worshipFlag = BaseBitmap.create("rank_visited");
        this._worshipFlag.anchorOffsetX = this._worshipFlag.width/2;
        this._worshipFlag.anchorOffsetY = this._worshipFlag.height/2;
        this._worshipFlag.setScale(0.7);
        this._worshipFlag.x = worshipBtn.x+60;
        this._worshipFlag.y = worshipBtn.y+20;
        this._worshipFlag.visible = false;
        this._nodeContainer.addChild(this._worshipFlag);
        //标题信息
        //底部个人排行信息
        let  title_rankTxt  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_rankTxt.text = LanguageManager.getlocal("rankorder");
        title_rankTxt.x =  worshipTxt.x +10; 
        title_rankTxt.y =   titleBg.y  + titleBg.height/2 -title_rankTxt.height+15 ;
        this._nodeContainer.addChild(title_rankTxt);
        this._title_rankTxt = title_rankTxt;

        let title_nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_nameTxt.text = LanguageManager.getlocal("ranknickName");
        title_nameTxt.x = title_rankTxt.x + 110;
        title_nameTxt.y = title_rankTxt.y
        this._nodeContainer.addChild(title_nameTxt);
        this._title_nameTxt = title_nameTxt;

        let title_officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_officerTxt.text = LanguageManager.getlocal("rankofficer");
        title_officerTxt.x = title_nameTxt.x + 200;
        title_officerTxt.y = title_rankTxt.y;
        this._nodeContainer.addChild(title_officerTxt);
        this._title_officerTxt = title_officerTxt;

        let title_powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_powerTxt.text = LanguageManager.getlocal("rankpower");
        title_powerTxt.x = title_officerTxt.x + 150;
        title_powerTxt.y = title_rankTxt.y;
        this._nodeContainer.addChild(title_powerTxt);
        this._title_powerTxt = title_powerTxt;

        //底部个人排行信息
        let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        nameTxt.text = LanguageManager.getlocal("ranknickName2",[Api.playerVoApi.getPlayerName()]);
        nameTxt.x =  worshipTxt.x ; 
        nameTxt.y =   bottomBg2.y  + 20;
        this._nodeContainer.addChild(nameTxt);
       
        let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        rankTxt.x = nameTxt.x + 300;
        rankTxt.y = nameTxt.y
        this._nodeContainer.addChild(rankTxt);
        this._rankTxt = rankTxt

        let officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        officerTxt.text = LanguageManager.getlocal("rankofficer2",[Api.playerVoApi.getPlayerOffice()]) ;
        officerTxt.x = nameTxt.x;
        officerTxt.y = nameTxt.y + 35;
        this._nodeContainer.addChild(officerTxt);

        let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        powerTxt.x = rankTxt.x;
        powerTxt.y = officerTxt.y;
        this._nodeContainer.addChild(powerTxt);
        this._powerTxt = powerTxt
        this.tabBtnClickHandler({index:0})

        egret.callLater(this.showRankMainTaskHand, this);
        
    }

    //主线非强制引导
    private showRankMainTaskHand():void{
        if (Api.otherInfoVoApi.isRankVisited(0)){
            if (Api.otherInfoVoApi.isRankVisited(1)){
                if (!Api.otherInfoVoApi.isRankVisited(2)){
                    let tab = this._tabbarGroup.getTabBar(2);
                    this._mainTaskHandTabKey3 = App.MainTaskHandUtil.addHandNode(
                        this.parent,
                        this._tabbarGroup.x + this._tabbarGroup.width - 75,
                        this._tabbarGroup.y + 100,
                        [tab],
                        114,
                        true,
                        function (){
                            return true;
                        },
                        this,
                    );
                }
                else{

                }
            }
            else{
                let tab = this._tabbarGroup.getTabBar(1);
                this._mainTaskHandTabKey2 = App.MainTaskHandUtil.addHandNode(
                    this.parent,
                    this._tabbarGroup.x + this._tabbarGroup.width/2,
                    this._tabbarGroup.y + 100,
                    [tab],
                    114,
                    true,
                    function (){
                        return true;
                    },
                    this,
                );
            }
        }
        else{
            this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
                this._worshipBtn,
                this._worshipBtn.width/2 - 10,
                10,
                [this._worshipBtn],
                114,
                true,
                function (){
                    return true;
                },
                this,
            );
        }
    }

    protected refreshTopTitle()
    {
        if(this._curTabIdx == 0)
        {
            this._title_officerTxt.text = LanguageManager.getlocal("rankofficer");
            this._title_powerTxt.text =  LanguageManager.getlocal("rankpower");
            this._powerTxt.text = LanguageManager.getlocal("rankpower2",[String(Api.playerVoApi.getPlayerPower())]);
            this._rankTxt.text = LanguageManager.getlocal("rankorder2",[String(Api.rankVoApi.getprank())]) ;

            this._title_nameTxt.x =  this._title_rankTxt.x + 110;
            this._title_officerTxt.x =  this._title_nameTxt.x + 200;
            this._title_powerTxt.x =  this._title_officerTxt.x + 150;

        }else  if(this._curTabIdx == 1)
        {
            let cid = Api.rankVoApi.getcid()
            let bcid:number = Api.challengeVoApi.getBigChannelIdByCid(cid);
            let cTxt = String(bcid) +"."+ LanguageManager.getlocal("challengeTitle"+ bcid);
            this._powerTxt.text = LanguageManager.getlocal("rankchallenge",[cTxt]);
            this._rankTxt.text = LanguageManager.getlocal("rankorder2",[String(Api.rankVoApi.getcRank())]) ;

            this._title_officerTxt.text = LanguageManager.getlocal("rank_challenge");
            this._title_powerTxt.text =  "";
            this._title_nameTxt.x =  this._title_rankTxt.x + 140;
            this._title_officerTxt.x =  this._title_nameTxt.x + 270;
        }else if(this._curTabIdx == 2)
        {
            this._powerTxt.text = LanguageManager.getlocal("rankimacy",[String(Api.rankVoApi.getimacy())]);
            this._rankTxt.text = LanguageManager.getlocal("rankorder2",[String(Api.rankVoApi.getirank())]) ;

            this._title_officerTxt.text = LanguageManager.getlocal("rank_imacy");
            this._title_powerTxt.text =  "";
            this._title_nameTxt.x =  this._title_rankTxt.x + 140;
            this._title_officerTxt.x =  this._title_nameTxt.x + 270;
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
        if(data.ret==false)
        {
            return;
        }
        this.showRankMainTaskHand();
        this._worshipBtn.visible = false;   
        this._worshipFlag.setScale(1.3);
        this._worshipFlag.visible = true;
        egret.Tween.get(this._worshipFlag,{loop:false}).to({scaleX:0.7,scaleY:0.7},400).wait(600).call(function(){
            ViewController.getInstance().openView(ViewConst.BASE.RANKWORSHIPVIEW,data);
		});
    }
    protected worshipBtnHandler()
    {
        NetManager.request(NetRequestConst.REQUEST_RANK_VISIT,{dtype:this._curTabIdx+1});
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;  
    }
    protected tabBtnClickHandler(params:any)
    {
        this._curTabIdx = params.index
        this.refreshRankList();
        if (this._curTabIdx == 1 && this._mainTaskHandTabKey2){
            App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandTabKey2);
            this._mainTaskHandTabKey2 = null;
            if (!this._mainTaskHandKey){
                this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
                    this._worshipBtn,
                    this._worshipBtn.width/2 - 10,
                    10,
                    [this._worshipBtn],
                    114,
                    true,
                    function (){
                        return true;
                    },
                    this,
                );
            }
        }
        else if (this._curTabIdx == 2 && this._mainTaskHandTabKey3){
            App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandTabKey3);
            this._mainTaskHandTabKey3 = null;
            if (!this._mainTaskHandKey){
                this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
                    this._worshipBtn,
                    this._worshipBtn.width/2 - 10,
                    10,
                    [this._worshipBtn],
                    114,
                    true,
                    function (){
                        return true;
                    },
                    this,
                );
            }
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
        //刷新列表
        let list = Api.rankVoApi.getRankListByTabIdx(this._curTabIdx);
        if (! this._scrollList)
        {
            this._scrollList  = ComponentManager.getScrollList(RankScrollItem,list,this._scroRect);
            this._scrollList.y =this._listPosY
            this._nodeContainer.addChild(this._scrollList);
        }
        else
        { 
             this._scrollList.refreshData(list);
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
    public hide()
    {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RANKVIEW_CLOSE_ANI,{ani:true,index:1});
        super.hide();
    }
    protected getRequestData():{requestType:string,requestData:any} 
	{
		return {requestType:NetRequestConst.REQUEST_RANK_INDEX,requestData:{}};
	}

   protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rankinglist_rankn1","rankinglist_rankn2","rankinglist_rankn3","rank_display_namebg","rank_line",
            "rank_select_mask","servant_bottombg","wifeview_bottombg","rank_visited","rankbg_1","rankbg_2","rankbg_3,rankbg_4",
            "commonview_tabbar_bg2"
        ]);
	}

	public dispose():void
	{
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_VISIT),this.worshipCallback,this);

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
        this._tabbarGroup = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
        this._mainTaskHandKey = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandTabKey2);
        this._mainTaskHandTabKey2 = null;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandTabKey3);
        this._mainTaskHandTabKey3 = null;

        super.dispose();
    }
}