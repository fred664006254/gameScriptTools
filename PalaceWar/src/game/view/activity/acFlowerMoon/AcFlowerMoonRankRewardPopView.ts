/**
 * 花好月圆--排行奖励
 * author wxz
 * date 2020.8.4
 * @class AcFlowerMoonRankRewardPopView
 */
class AcFlowerMoonRankRewardPopView extends PopupView
{
    public _scrollList:ScrollList = null;
    public _scrollList2:ScrollList = null;
    private _tabbarGroup:TabBarGroup = null;
    private _seleteIndex = 0;    
    private _initPerson = false;
    private _initZone = false;
    private _rewardBg:BaseBitmap = null;
    private _bottombg:BaseBitmap = null;
    private _personCon:BaseDisplayObjectContainer = null;
    private _zoneCon:BaseDisplayObjectContainer = null;
    private _rankBtn:BaseButton = null;
    private _rewardBtn:BaseButton = null;
    private _getReward:BaseBitmap = null;

    private _rankData:any = null;
    private _rankZoneData:any = null;

    public constructor()
    {
        super();
    }
	protected getRequestData():{requestType:string,requestData:any}
	{
        return {requestType:NetRequestConst.REQUEST_ACFLOWERMOON_GETRANK, requestData:{activeId:this.vo.aidAndCode}};
    }
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (!data.ret)
        {
            return;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ACFLOWERMOON_GETRANK)
        {
            this._rankData = data.data.data;
        }
        if (data.data.cmd == NetRequestConst.REQUEST_ACFLOWERMOON_GETZRANK)
        {
            this._rankZoneData = data.data.data;
            this.showZoneView();
        }        
	}    
    public initView():void
    {
        this._seleteIndex = 0;
        this._initPerson = false;
        this._initZone = false;

        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshRed, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACFLOWERMOON_GETRANKREWARD, this.requestCallback, this);

        this._tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN2_SMALL_TAB,["acFlowerMoonRankRewardTab1-"+this.getTypeCode(),"acFlowerMoonRankRewardTab2-"+this.getTypeCode()],this.clickTabHandler,this);
        this._tabbarGroup.x = 50;
        this.addChildToContainer(this._tabbarGroup);
        this._tabbarGroup.setSpace(0);
        this._tabbarGroup.setColor(0xe1ba86,0x472c26);
        this._tabbarGroup.selectedIndex=this._seleteIndex;

        let rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 575;
        rewardBg.setPosition(45, 60);
        this.addChildToContainer(rewardBg);
        this._rewardBg = rewardBg;

        // 底部bg 
        let bottomBg = BaseBitmap.create("public_9_bg1");
        bottomBg.width = 530;
        bottomBg.height = 113;
        bottomBg.setPosition(rewardBg.x + rewardBg.width/2 - bottomBg.width/2, rewardBg.y + rewardBg.height + 10);
        this.addChildToContainer(bottomBg);
        this._bottombg = bottomBg;

        //rank btn
        let rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acFlowerMoonRankRewardBtn1", this.getTypeCode()), ()=>{
            if (!this.vo.isStart)
            {
                this.vo.showAcEndTip();
                return;
            }
            if(this._seleteIndex == 0)
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACFLOWERMOONRANKPERSONPOPVIEW, {aid: this.aid, code: this.code,rank:this._rankData});
            }else
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACFLOWERMOONRANKZONEPOPVIEW, {aid: this.aid, code: this.code,rank:this._rankZoneData});
            }
        }, this);
        rankBtn.setPosition(bottomBg.x + 40, bottomBg.y + bottomBg.height - rankBtn.height - 15);
        this.addChildToContainer(rankBtn);
        this._rankBtn = rankBtn;

        let rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acFlowerMoonRankRewardBtn2", this.getTypeCode()), ()=>{
            if (!this.vo.isStart)
            {
                this.vo.showAcEndTip();
                return;
            }
            if(this.vo.checkIsInEndShowTime())
            {
                NetManager.request(NetRequestConst.REQUEST_ACFLOWERMOON_GETRANKREWARD, { activeId: this.vo.aidAndCode, type: this._seleteIndex+1}); 
            }else
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acFlowerMoonRankRewardTip1-"+this.getTypeCode()));
            }
        }, this);
        rewardBtn.setPosition(bottomBg.x+bottomBg.width-rewardBtn.width- 50, rankBtn.y);
        this.addChildToContainer(rewardBtn);
        this._rewardBtn = rewardBtn;   

        this._getReward = BaseBitmap.create("collectflag");
        this._getReward.x = rewardBtn.x+rewardBtn.width/2-this._getReward.width/2;
        this._getReward.y = rewardBtn.y+rewardBtn.height/2-this._getReward.height/2;
        this.addChildToContainer(this._getReward);

        this.refreshView();
        this.refreshRed();
    }
	private clickTabHandler(data:any):void
	{
		var index = Number(data.index);
        if(index == this._seleteIndex)
        {
            return;
        }
		this._seleteIndex = index;
		this.refreshView();
	} 
    private refreshView():void
    {
        if(this._seleteIndex == 0)
        {
            this.showPersonView();
        }else
        {
            if(!this._initZone)
            {
                this.request(NetRequestConst.REQUEST_ACFLOWERMOON_GETZRANK, {activeId: this.vo.aidAndCode});
                return;
            }
            this.showZoneView();
        }
    }
    private showPersonView():void
    {
        this.freshBtnFlag();
        if(this._initPerson)
        {
            if(this._scrollList)
            {
                this._scrollList.visible = true;
            }
            if(this._scrollList2)
            {
                this._scrollList2.visible = false;
            }           
            if(this._personCon)
            {
                this._personCon.visible = true;
            } 
            if(this._zoneCon)
            {
                this._zoneCon.visible = false;
            }                   
            return;
        }

        this._initPerson = true;

        let dataList = this.cfg.getRankPersonItemCfg();
        let rect = new egret.Rectangle(0, 0, this._rewardBg.width, this._rewardBg.height-10);
        let scrollList = ComponentManager.getScrollList(AcFlowerMoonRankRewardItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(this._rewardBg.x, this._rewardBg.y + 5);
        this.addChildToContainer(scrollList);
        this._scrollList = scrollList;        

        let rankData:any = this._rankData;
        // 我的排名 
        let myRank:any = null;
        let score = 0;
        if( rankData && rankData.myrank)
        {
            myRank = rankData.myrank;
            if (myRank > 10000)
            {
                myRank = "10000+";
            }
            if (rankData.myscore){
                score = rankData.myscore;
            }
            else
            {
                score = this.vo.score;
            }
        }else
        {
            //未上榜
            myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acFlowerMoonRankNotInRank", this.getTypeCode()));
            score = this.vo.score;
        }

        this._personCon = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._personCon);

        let myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acFlowerMoonRankRewardTip2", this.getTypeCode()), [String(myRank)]),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(this._rankBtn.x+this._rankBtn.width/2-myRankTF.width/2, this._bottombg.y + 15);
        this._personCon.addChild(myRankTF);
    
        //积分
        let myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acFlowerMoonRankRewardTip3", this.getTypeCode()), [String(score)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(this._rewardBtn.x+this._rewardBtn.width/2-myScoreTF.width/2, myRankTF.y);
        this._personCon.addChild(myScoreTF);        
    }
    private showZoneView():void
    {
        this.freshBtnFlag();
        if(this._initZone)
        {
            if(this._scrollList)
            {
                this._scrollList.visible = false;
            }
            if(this._scrollList2)
            {
                this._scrollList2.visible = true;
            }           
            if(this._personCon)
            {
                this._personCon.visible = false;
            } 
            if(this._zoneCon)
            {
                this._zoneCon.visible = true;
            }                   
            return;
        }
        if(this._scrollList)
        {
            this._scrollList.visible = false;
        }
        if(this._personCon)
        {
            this._personCon.visible = false;
        } 
        this._initZone = true;

        let dataList = this.cfg.getRankZoneItemCfg();
        let rect = new egret.Rectangle(0, 0, this._rewardBg.width, this._rewardBg.height-10);
        let scrollList = ComponentManager.getScrollList(AcFlowerMoonRankRewardItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(this._rewardBg.x, this._rewardBg.y + 5);
        this.addChildToContainer(scrollList);
        this._scrollList2 = scrollList;        

        let rankData:any = this._rankZoneData;
        // 我的排名 
        let myRank:any = null;
        let score = 0;
        if( rankData && rankData.myzrank)
        {
            myRank = rankData.myzrank;
            if (myRank > 10000)
            {
                myRank = "10000+";
            }
            if (rankData.myzscore){
                score = rankData.myzscore;
            }
        }else
        {
            //未上榜
            myRank = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acFlowerMoonRankNotInRank", this.getTypeCode()));
        }

        this._zoneCon = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._zoneCon);

        let myRankTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acFlowerMoonRankRewardTip4", this.getTypeCode()), [String(myRank)]),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        myRankTF.setPosition(this._rankBtn.x+this._rankBtn.width/2-myRankTF.width/2, this._bottombg.y + 15);
        this._zoneCon.addChild(myRankTF);
    
        //积分
        let myScoreTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acFlowerMoonRankRewardTip5", this.getTypeCode()), [String(score)]),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        myScoreTF.setPosition(this._rewardBtn.x+this._rewardBtn.width/2-myScoreTF.width/2, myRankTF.y);
        this._zoneCon.addChild(myScoreTF);  
    }    

    private requestCallback(event:egret.Event){
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }

        let rewards = rData.rewards;
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);

        this.freshBtnFlag();
        this.refreshRed();
    }

    private freshBtnFlag():void
    {
        if(this._seleteIndex == 0)
        {
            this._rewardBtn.visible = !this.vo.isGetRankPReward();
            this._getReward.visible = this.vo.isGetRankPReward();
        }else
        {
            this._rewardBtn.visible = !this.vo.isGetRankZReward();
            this._getReward.visible = this.vo.isGetRankZReward();            
        }
    }
    public refreshRed():void{
        if (!this.vo){
            return;
        }
        if (this.vo.isShowPrankDot()){
            this._tabbarGroup.addRedPoint(0);
            this._tabbarGroup.setRedPos(0,this._tabbarGroup.getTabBar(0).width-28,0)
        }
        else{
            this._tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isShowZrankDot()){
            this._tabbarGroup.addRedPoint(1);
            this._tabbarGroup.setRedPos(1,this._tabbarGroup.getTabBar(1).width-28,0)
        }
        else{
            this._tabbarGroup.removeRedPoint(1);
        } 
    }
    protected getShowHeight():number{
        return 840;
    }
    private get cfg() : Config.AcCfg.FlowerMoonCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcFlowerMoonVo{
        return <AcFlowerMoonVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }
	protected getTitleStr():string
	{
		return "acFlowerMoonRankTitle-"+this.getTypeCode();
	}
    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }
    protected get uiType():string
	{
		return "2";
	}
    protected getResourceList():string[]{
        return super.getResourceList().concat([
            `ackite_ranktitlebg1-1`,"ackite_ranktitlebg2-1","ackite_ranktitlebg3-1",
            "ackite_ranktitlebg4-1"
        ]);
    }    
    public dispose():void{
        let view = this;
        view._scrollList = null;
        view._scrollList2 = null;
        view._bottombg = null;
        view._rewardBg = null;
        view._personCon = null;
        view._zoneCon = null;
        view._rankBtn = null;
        view._rewardBtn = null;
        view._getReward = null;

        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshRed, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACFLOWERMOON_GETRANKREWARD, this.requestCallback, this);

        super.dispose();
    }
}