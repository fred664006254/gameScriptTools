/**
 * 排行榜 跨服
 * author yanyuling
 * date 2017/10/25
 * @class RankCrossView
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

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        this._powerNodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._powerNodeContainer);
        this._alliNodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._alliNodeContainer);

        //最底部背景
        let bottomBg2 = BaseBitmap.create("wifeview_bottombg");
        bottomBg2.x = 0;
        bottomBg2.y = GameConfig.stageHeigth - bottomBg2.height -this.container.y;
		this._nodeContainer.addChild(bottomBg2);

        let topBg:BaseBitmap = BaseBitmap.create("servant_bottombg");
        topBg.width = GameConfig.stageWidth+18;
        topBg.x = -9
        topBg.y = -20;
		topBg.height = bottomBg2.y  - topBg.y+10;
		this._nodeContainer.addChildAt(topBg,0);

         let tabbg = BaseBitmap.create("commonview_tabbar_bg2");	
		this._nodeContainer.addChild(tabbg);
        let tabName = ["rankTab4","rankTab5"];
        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB2,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = 15;
        tabbarGroup.y = topBg.y;
        tabbarGroup.setSpace(0);
        this._nodeContainer.addChild(tabbarGroup);
        tabbg.y =topBg.y+5;

        let tabX = tabbarGroup.x;
        for (let index = 0; index < tabName.length; index++) {
            let red:BaseBitmap = BaseBitmap.create("public_dot2");
            if(index == 0)
                red.x = tabX+122-5;
            if(index == 1)
                red.x = tabX+280-13;
            red.y = tabbarGroup.y+10;
            red.visible = !Api.otherInfoVoApi.isRankVisited(index+3);
            this._nodeContainer.addChild(red);
            this._redList.push(red);
        }

        let innerBg = BaseBitmap.create("public_9_bg36");
        innerBg.height = topBg.height - 95;
        innerBg.width = 620;
        innerBg.x = GameConfig.stageWidth/2 - innerBg.width/2;
        innerBg.y = topBg.y + 80;
        this._nodeContainer.addChild(innerBg);

        // let innerBg2 = BaseBitmap.create("public_9_bg44");
        // innerBg2.height = topBg.height - 95;
        // innerBg2.width = 606+18;
        // innerBg2.x = GameConfig.stageWidth/2 - innerBg.width/2;
        // innerBg2.y = topBg.y + 80;
        // this._alliNodeContainer.addChild(innerBg2);


        let titleBg = BaseBitmap.create("public_9_bg33");
        titleBg.width = innerBg.width;
        titleBg.height = 50;
        titleBg.x = innerBg.x;
        titleBg.y = innerBg.y;
		this._powerNodeContainer.addChild(titleBg);

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
        worshipTxt.text = LanguageManager.getlocal("rankview_crossPowerWorshipTip1");
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
        let  title_rankTxt  = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_rankTxt.text = LanguageManager.getlocal("rankorder");
        title_rankTxt.x =  worshipTxt.x +10; 
        title_rankTxt.y =   titleBg.y  + titleBg.height/2 -title_rankTxt.height+15 ;
        this._powerNodeContainer.addChild(title_rankTxt);
        this._title_rankTxt = title_rankTxt;

        let title_nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_nameTxt.text = LanguageManager.getlocal("ranknickName");
        title_nameTxt.x = title_rankTxt.x + 110;
        title_nameTxt.y = title_rankTxt.y
        this._powerNodeContainer.addChild(title_nameTxt);
        this._title_nameTxt = title_nameTxt;

        let title_zoneTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_zoneTxt.text = LanguageManager.getlocal("rankServer");
        title_zoneTxt.x = title_nameTxt.x + 200;
        title_zoneTxt.y = title_rankTxt.y;
        this._powerNodeContainer.addChild(title_zoneTxt);
        this._title_officerTxt = title_zoneTxt;

        let title_powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        title_powerTxt.text = LanguageManager.getlocal("rankpower");
        title_powerTxt.x = title_zoneTxt.x + 150;
        title_powerTxt.y = title_rankTxt.y;
        this._powerNodeContainer.addChild(title_powerTxt);
        this._title_powerTxt = title_powerTxt;

        let isInRank = true;
        //底部个人排行信息
        if(Api.rankVoApi.getapnum() < 1000){
            let nameTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
            nameTxt.text = LanguageManager.getlocal("ranknickName2",[Api.playerVoApi.getPlayerName()]);
            nameTxt.x =  worshipTxt.x ; 
            nameTxt.y =   bottomBg2.y  + 20;
            this._powerNodeContainer.addChild(nameTxt);
        
            let rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
            rankTxt.x = nameTxt.x + 300;
            rankTxt.y = nameTxt.y
            this._powerNodeContainer.addChild(rankTxt);
            this._rankTxt = rankTxt;

            let officerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
            let sidname = Api.mergeServerVoApi.getAfterMergeSeverName();
            officerTxt.text = LanguageManager.getlocal("crossranserver",[""+sidname]); 
            officerTxt.x = nameTxt.x;
            officerTxt.y = nameTxt.y + 35;
            this._powerNodeContainer.addChild(officerTxt);

            let powerTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
            powerTxt.x = rankTxt.x;
            powerTxt.y = officerTxt.y;
            this._powerNodeContainer.addChild(powerTxt);
            this._powerTxt = powerTxt;
        }

        //跨服帮会的信息
        if(Api.rankVoApi.getanum() < 1000){
            let allianceTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
            allianceTxt.text = LanguageManager.getlocal("acRank_myAlliancenick") + Api.playerVoApi.getPlayerAllianceName() ;
            allianceTxt.x =  worshipTxt.x ; 
            allianceTxt.y =   bottomBg2.y  + 20;
            this._alliNodeContainer.addChild(allianceTxt);

            let zoneTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
            let sidname = Api.mergeServerVoApi.getAfterMergeSeverName();
            zoneTxt.text = LanguageManager.getlocal("crossranserver",["" + sidname]); 
            zoneTxt.x = worshipTxt.x;
            zoneTxt.y = allianceTxt.y + 35;
            this._alliNodeContainer.addChild(zoneTxt);

            let zoneRankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
            zoneRankTxt.text = LanguageManager.getlocal("rankorder2", ["" + Api.rankVoApi.getanum()]) ;
            zoneRankTxt.x = allianceTxt.x + 300;
            zoneRankTxt.y = allianceTxt.y
            this._alliNodeContainer.addChild(zoneRankTxt);
        }
        
        let tipTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW)
        this._tipTxt = tipTxt;
        this._tipTxt.text = LanguageManager.getlocal("rankview_crossPowerTip1");
        tipTxt.x = bottomBg2.x + bottomBg2.width/2  ; 
        tipTxt.y = bottomBg2.y  + bottomBg2.height/2 - tipTxt.height/2 ;
        this._tipTxt.text = "";
        this._nodeContainer.addChild(tipTxt);

         this.tabBtnClickHandler({index:0});
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
            this._redList[index].visible = !Api.otherInfoVoApi.isRankVisited(index+3)
        }
        let data = event.data;
        if(data.ret==true && data.data.data.lucky)
		{
			App.CommonUtil.showGodbless("rank");
		}
        this._worshipBtn.visible = false;   
        this._worshipFlag.setScale(1.3);
        this._worshipFlag.visible = true;
        
        egret.Tween.get(this._worshipFlag,{loop:false}).to({scaleX:0.7,scaleY:0.7},400).wait(600).call(function(){
            ViewController.getInstance().openView(ViewConst.BASE.RANKWORSHIPVIEW,data);
		});
    }
    protected worshipBtnHandler()
    {
        let taruid = "";
        let tarzid = "";
        if (this._curTabIdx == 0){
            let list = Api.rankVoApi.getCrossPowerList();
            let maxV = Math.min(list.length,Api.rankVoApi.getapnum())
            let ranIdx = App.MathUtil.getRandom(0,maxV);
            if (!list[ranIdx])
            {
                return;
            }
            taruid = list[ranIdx].uid;
            tarzid = list[ranIdx].zid;
        }else if (this._curTabIdx == 1){
            let list = Api.rankVoApi.getCrossAllianceRankList();
            let maxV = Math.min(list.length,Api.rankVoApi.getanum())
            let ranIdx = App.MathUtil.getRandom(0,maxV);
            if (!list[ranIdx])
            {
                return;
            }
            taruid = list[ranIdx].creator;
            tarzid = list[ranIdx].zid;
        }
        NetManager.request(NetRequestConst.REQUEST_RANKG_VISIT,{dtype:this._curTabIdx+1,ruid:taruid,rzid:tarzid});
    }
    protected tabBtnClickHandler(params:any)
    {
        this._curTabIdx = params.index
        this.refreshRankList();
    }
    protected refreshRankList()
    {
        if (Api.otherInfoVoApi.isRankVisited(this._curTabIdx+3)){
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
                let newRect = new egret.Rectangle(this._scroRect.x,this._scroRect.y,this._scroRect.width,this._scroRect.height+40);
                this._crossScrollList  = ComponentManager.getScrollList(RankCrossScrollItem,list,newRect);
                this._crossScrollList.y = this._listPosY - 45;
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

    public hide()
    {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RANKVIEW_CLOSE_ANI,{ani:true,index:2});
        super.hide();
    }
   protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rankbg_1","rankbg_2","rankbg_3","rankbg_4","rank_display_namebg","rank_line",
            "rank_select_mask","servant_bottombg","wifeview_bottombg","rank_visited",
            "dinner_rankbg","rankinglist_rankn1","rankinglist_rankn2","rankinglist_rankn3",
            "commonview_tabbar_bg2",
        ]);
	}

	public dispose():void
	{
        Api.mainTaskVoApi.hideGuide();
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_VISIT),this.worshipCallback,this);

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