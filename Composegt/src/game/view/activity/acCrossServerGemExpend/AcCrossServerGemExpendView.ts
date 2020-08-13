/**
 * 跨服元宝消耗
 * @author 赵占涛
 */
class AcCrossServerGemExpendView extends AcCommonView{
    // 倒计时
    private countdownTxt:BaseTextField;

	private _scrollList:ScrollList;
	private rankList: { "uid":number;"name": string;"pic": string;"zid": number;"gemexpend": number;} [];
	private myrank: number;
    private myscore: number;
    private zidGroup: any;

    public constructor()
    {
        super();
    }
    public static AID:string = null;
    public static CODE:string = null;

    private get cfg() : Config.AcCfg.CrossServerGemExpendCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServerGemExpendView.AID, AcCrossServerGemExpendView.CODE);
    }

    private get vo() : AcCrossServerGemExpendVo{
        return <AcCrossServerGemExpendVo>Api.acVoApi.getActivityVoByAidAndCode(AcCrossServerGemExpendView.AID, AcCrossServerGemExpendView.CODE);
    }

    private get acTivityId() : string{
        return `${AcCrossServerGemExpendView.AID}-${AcCrossServerGemExpendView.CODE}`;
    }

    protected initBg():void
	{   
        //背景
        let stageH = GameConfig.stageHeigth;
        let bigBg = BaseLoadBitmap.create('acGemExpendBg');
        bigBg.touchEnabled = true;
        this.addChild(bigBg);
        bigBg.y = stageH - 1136;
	} 

    public initView(){
        
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ARROW_UPLEVEL,this.upLevelRefresh,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ARROW_SHOOTING),this.getRewardHandler,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ARROW_GETBOSREWARD),this.getNumRewardHandler,this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ARROW_GETRANK),this.getRewardHandler,this);
		// App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshData,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY2S_GEMEXPENDRANK),this.refreshRankList,this);
        

        AcCrossServerGemExpendView.AID = this.aid;
		AcCrossServerGemExpendView.CODE = this.code;
        this.width = GameConfig.stageWidth;
       
		//活动规则背景图片
		let acruleTxtBg: BaseBitmap = BaseBitmap.create("acGemExpendDescBg");
		acruleTxtBg.y = 70;
		this.addChild(acruleTxtBg);
       
        let titleStr = BaseBitmap.create('acGemExpendTitleStr');
        titleStr.x = this.width/2 - titleStr.width/2;
        titleStr.y = 0;
        this.addChild(titleStr);


        //活动规则文本
        let acruleTxt : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("AcCrossServerGemExpendView" + this.code),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        acruleTxt.width = 600;
        acruleTxt.x = acruleTxtBg.x + acruleTxtBg.width/2 - acruleTxt.width/2;
        acruleTxt.y = acruleTxtBg.y + 15 + 55;
        this.addChild(acruleTxt);
        //剩余时间
        this.countdownTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.countdownTxt.text = LanguageManager.getlocal("acFanliReviewReward_acCD", [""]);
        this.countdownTxt.x = acruleTxt.x + acruleTxt.width - this.countdownTxt.width;
        this.countdownTxt.visible = this.vo.isInActivity();
        this.addChild(this.countdownTxt);
        this.countdownTxt.y = acruleTxtBg.y + 15 + 5;//acruleTxt.y + acruleTxt.height;

        let actimeTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_ACTIVITY_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		actimeTF.text  = this.acVo.getAcLocalTime(true);
        actimeTF.width = 580;
        actimeTF.lineSpacing = 5;
        actimeTF.x = acruleTxt.x;
        actimeTF.y = acruleTxtBg.y + 15 + 5;
        this.addChild(actimeTF);

        let ZidGroupTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        let serverStr = "";
        let maxNum = 4;
        for(var key in this.zidGroup)
        {
            if(maxNum <= 0){
                serverStr = serverStr + LanguageManager.getlocal("seeServersNumStr");
                break;
            }
            let serverId=this.zidGroup[key];
            let serverText = "";
             let qu = Api.mergeServerVoApi.getQuByZid(serverId);
            if(qu > 0){
                serverText = LanguageManager.getlocal("mergeServer",[String(qu),String(serverId)]);
            } else {
                serverText = LanguageManager.getlocal("ranserver2",[String(serverId)]);
            }
            if(serverStr!=""){
                serverStr = serverStr +",";
            }else{
                serverStr = serverStr +" ";
            }
            serverStr = serverStr + serverText;
            maxNum --;
        }
        ZidGroupTF.text  = LanguageManager.getlocal("acCrossServerWifeBattlePkzids",[serverStr]);
        ZidGroupTF.lineSpacing = 5;
        ZidGroupTF.x = acruleTxt.x;
        ZidGroupTF.y = acruleTxtBg.y + 15 + 30;
        this.addChild(ZidGroupTF);

        if(maxNum<=0){
            let talentstr = LanguageManager.getlocal("seeServerInfo");
            let talentTF = ComponentManager.getTextField(talentstr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
            talentTF.x = ZidGroupTF.x + ZidGroupTF.width ;
            talentTF.y = ZidGroupTF.y;
            this.addChild(talentTF);
            talentTF.addTouchTap(this.serverBtnListener,this,[this.zidGroup]);
        }
        

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 205 - 115);

        let rankdCfg = this.cfg.getRankList();
        let firstInfo = [];
        for (var i = 0; i < rankdCfg.length; i++) {  
            let rankItemCfg = rankdCfg[i];
            let rankItemVo = this.rankList[i];
            let usePic = "1";
            let useName = "";
            let zid = 0;
            let gemexpendNum = 0;
            if(rankItemVo)
            {
                usePic = rankItemVo.pic;
                useName = rankItemVo.name;
                zid = rankItemVo.zid;
                gemexpendNum = rankItemVo.gemexpend;
            }

            let rankItemData:{"rank":{},"gemexpend":number,"zid":number,"id":string,"rewardIcons":BaseDisplayObjectContainer[],"pic":string,"name":string} = {"rank":rankItemCfg.rank,"zid":zid,"gemexpend":gemexpendNum,"id":rankItemCfg.id,"rewardIcons":rankItemCfg.rewardIcons,"pic":usePic,"name":useName};
            firstInfo.push(rankItemData);
        }  
        
        this._scrollList = ComponentManager.getScrollList(AcCrossServerGemExpendScrollItem, firstInfo, rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.x =0;
		this._scrollList.y =205;


        let bottomRes = "acGemExpendDownBg";
        let bottomH = 120;
        
        // 底部背景
		let buttomBg:BaseBitmap=BaseBitmap.create(bottomRes);
		buttomBg.height=bottomH;
        buttomBg.x = this.width/2-buttomBg.width/2;
		buttomBg.y = GameConfig.stageHeigth-buttomBg.height;
		this.addChild(buttomBg);
        let rankStr = LanguageManager.getlocal("acRank_myrank1",[LanguageManager.getlocal("atkracedes4")]);
        if(this.myrank && this.myrank > 0){
            rankStr = LanguageManager.getlocal("acRank_myrank1",[""+this.myrank]);
        }
        let nameTTF = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameTTF.x = 13;
		nameTTF.y = buttomBg.y+30;
		this.addChild(nameTTF);
		
		let gemExpendTTF = ComponentManager.getTextField(LanguageManager.getlocal("acLimitedReward-1_Title")+"："+this.myscore,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		gemExpendTTF.x = 13;
		gemExpendTTF.y = nameTTF.y+nameTTF.height+8;
		this.addChild(gemExpendTTF);

        let descTTF = ComponentManager.getTextField(LanguageManager.getlocal("AcCrossServerGemDescStr"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		descTTF.x = GameConfig.stageWidth/2 - descTTF.width/2;
		descTTF.y = GameConfig.stageHeigth - descTTF.height - 3;
		this.addChild(descTTF);

        let rankBtn = ComponentManager.getButton("btn_big_yellow2","acCrossServerIntimacyRankListViewTitle",this.rankClick,this);
		rankBtn.setColor(0x6f2f00);
		rankBtn.x = 400;
		rankBtn.y = buttomBg.y+15;
		this.addChild(rankBtn);
        this.tick();

    }
    private serverBtnListener(event, zidGroup)
	{	
		console.log(zidGroup);

		ViewController.getInstance().openView(ViewConst.POPUP.SERVERSHOWPOPUPVIEW,{zidGroup:zidGroup});
	}

    private tick()
    {
        let deltaT = this.acVo.acCountDown;
		let cdStrK = "acFanliReviewReward_acCD";
		if (this.countdownTxt && deltaT ) {
			this.countdownTxt.text = LanguageManager.getlocal(cdStrK, [deltaT]);
            this.countdownTxt.x = GameConfig.stageWidth - this.countdownTxt.width - 15;
			return true;
		}
		return false;
    }

    protected getRequestData():{requestType:string,requestData:any} 
	{
		return {requestType:NetRequestConst.REQUEST_ACTIVITY2S_GEMEXPENDRANK,requestData:{activeId:this.aid+"-"+this.code}};
	}

    protected receiveData(data: { ret: boolean, data: any }): void
    {
        let rData = data.data;
        if(rData.ret == 0)
        {
			let cmd = rData.cmd;
			if(cmd == NetRequestConst.REQUEST_ACTIVITY2S_GEMEXPENDRANK){
                // console.log(rData.data.rank);
                // let i = 0;
                // for (var i = 0; i < rData.data.rank.length; i++) {  
                //     console.log(i,rData.data.rank[i]);  
                // }  
                this.rankList = [];
                for (var i = 0; i < rData.data.rank.length; i++) 
                {
                    let rankData = rData.data.rank[i];
                    // console.log(rData.data.rank);
                    let boxInfo:{ "uid":number;"name": string;"pic": string;"zid": number;"gemexpend": number;} = {"uid":rankData.uid,"name": rankData.name,"pic":rankData.pic,"zid": rankData.zid,"gemexpend": rankData.v};
                    this.rankList.push(boxInfo);
                }
                this.myrank = rData.data.merank;
                this.myscore = rData.data.mepoint;
                this.zidGroup = rData.data.servergroup;
                // console.log(this.rankList);
			}
        }
    }

    protected refreshRankList()
    {
       
    }

    private rankClick() {
        App.LogUtil.log("rankClick");
        ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERGEMWXPENDPOPUPVIEW,{"rankList":this.rankList,"myrank":this.myrank,"myscore":this.myscore});
    }

    protected getResourceList():string[]
	{
        let resList = null;
            resList = [
                "acGemExpendBg",
                "acGemExpendBigPicBg",
                "acGemExpendDescBg",
                "acGemExpendDownBg",
                "acGemExpendItemBg",
                "acGemExpendItemDescBg",
                "acGemExpendSmallPicBg",
                "acGemExpendTitleBg",
                "acGemExpendTitleStr",
                "btn_lookdetail"

            ];

		return super.getResourceList().concat(resList);
	}

	protected getTitleBgName():string
	{
        return "acGemExpendTitleBg";

	}

	protected getTitleStr():string
	{
		return  "";
	}

    protected getRuleParam(): string[]{
        let tmp = [];
        // tmp.push(this.cfg.freeArrow.toString());
        // tmp.push(this.cfg.arrowCost.toString());
        return tmp;
    } 
    public dispose():void
	{   
        this.countdownTxt = null;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETBUILDINGWORSHIPTASKREWARD),this.getRewardHandler,this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ARROW_GETBOSREWARD),this.getNumRewardHandler,this);
		// App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.refreshData,this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ARROW_UPLEVEL,this.upLevelRefresh,this);
        super.dispose();
    }
}