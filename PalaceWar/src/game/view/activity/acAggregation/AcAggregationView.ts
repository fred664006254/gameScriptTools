/**
 * 帮会集结
 * @author weixiaozhe  2020.5.12
 */
class AcAggregationView extends AcCommonView {

    public static AID: string = null;
    public static CODE: string = null;
    private _detailBtn:BaseButton=null;
    private _topTxtBg:BaseBitmap=null;
    private _timeTxt: BaseTextField = null;
    private _botTxt1: BaseTextField = null;
    private _botTxt2: BaseTextField = null;
    private _botTxt3: BaseTextField = null;
    public _scrollList:ScrollList = null;
    private _creatorRwd:any=null;

    protected initBg(): void 
    {
        let bgName: string = this.getBgName();
        if (bgName) 
        {
            this.viewBg = BaseLoadBitmap.create(bgName);
            this.viewBg.width = 640;
            this.viewBg.height = 1136;
            this.viewBg.setPosition(0, GameConfig.stageHeigth - this.viewBg.height);
            this.addChild(this.viewBg);
        }
        let titleImg = BaseBitmap.create("acaggregation_title");
        this.addChild(titleImg);
        let topTxtBg = BaseBitmap.create("acaggregation_top");
        topTxtBg.width = GameConfig.stageWidth;
        topTxtBg.x = GameConfig.stageWidth / 2 - topTxtBg.width / 2;
        topTxtBg.y = 85;
        this.addChild(topTxtBg);
        this._topTxtBg = topTxtBg;
    }  
    //规则
    protected getRuleInfo(): string {
        return "acAggregationRuleInfo";
    }    
	protected getRuleBtnName():string
	{	
		return "btn_rule2";
	}    
    private get TypeCode():string
    {
        if(this.code == "2")
        {
            return "1";
        }
        return this.code;
    }  
    protected getTitleStr(): string {
        return null;
    }
    protected getTitleBgName(): string {
        return null;
    }  
    private joinAlliance():void
    {
        this.refreshView();
        this.refreshBotTxt();
    }
    private getRwdCallback(event:egret.Event):void
    {
        let rData = event.data.data.data;
        if(!rData)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if(this.vo.checkIsInEndShowTime())
        {
            this.vo.extraTimeAllianceMn = rData.allianceMn;
        }
        if(rData.numLimit)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("acAggregationGetFailTips"));
            return;
        }
        if(rData.rewards)
        {
            let rewardVoList = GameData.formatRewardItem(rData.rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
        }
    }
	protected getRequestData():{requestType:string,requestData:any}
	{
		if(this.vo && this.vo.aidAndCode)
		{
			return {requestType:NetRequestConst.REQUEST_AGGREGATION_GETINFO,requestData:{activeId:this.vo.aidAndCode}};
		}
	}    

	protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}    
    
    public initView() 
    {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ALLIANCE, this.joinAlliance, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_AGGREGATION_GETRWD, this.getRwdCallback, this);

        // this.showStartDialog();       

        //剩余时间
        let timeTxt = ComponentManager.getTextField(this.vo.acCountDown, 20,TextFieldConst.COLOR_LIGHT_YELLOW);
        timeTxt.x = this._topTxtBg.x + 25;
        timeTxt.y = this._topTxtBg.y + this._topTxtBg.height/2 - timeTxt.height/2 - 5;
        this.addChild(timeTxt);
        this._timeTxt = timeTxt;

        //活动时间   
        let dateText = ComponentManager.getTextField(this.vo.acTimeAndHour, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        dateText.x = timeTxt.x;
        dateText.y = timeTxt.y - dateText.height - 10;
        this.addChild(dateText);        

        //活动规则文本
        let descTxt  = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationInfo"), 20);
        descTxt.x = dateText.x;
        descTxt.y = timeTxt.y + timeTxt.height + 10;
        this.addChild(descTxt);

        let botbg = BaseBitmap.create("arena_bottom");
        botbg.height = 130;
        botbg.x = GameConfig.stageWidth/2 - botbg.width/2;
        botbg.y = GameConfig.stageHeigth - botbg.height;
        this.addChild(botbg);

        //加入帮会
        let detailBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "acAggregationBtnTxt", ()=>
        {
            if ((!this.vo.isStart) || this.vo.checkIsInEndShowTime())
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            } 
            if(Api.playerVoApi.getPlayerLevel() >= Config.AlliancebaseCfg.unlock)
            {
                ViewController.getInstance().openView(ViewConst.COMMON.ALLIANCECREATEVIEW);
            }else
            {
                App.CommonUtil.showTip(Api.allianceVoApi.getLockedString());
            }
        }, this,null,);
        this.setLayoutPosition(LayoutConst.righttop,detailBtn,botbg,[20,20]);
        this.addChild(detailBtn);
        this._detailBtn = detailBtn;

        this._botTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationBotTxt1"), 20,TextFieldConst.COLOR_WARN_YELLOW);
        this.addChild(this._botTxt1);
        this.setLayoutPosition(LayoutConst.lefttop,this._botTxt1,botbg,[25,25]);
        this._botTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationBotTxt2",[Api.playerVoApi.getPlayerOfficeByLevel(Config.AlliancebaseCfg.unlock)]), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChild(this._botTxt2);
        this._botTxt2.x = this._botTxt1.x + this._botTxt1.width/2 - this._botTxt2.width/2;
        this._botTxt2.y = this._botTxt1.y + this._botTxt1.height + 10;

        this._botTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationBotTxt3",[this.vo.getAllianceName()]), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChild(this._botTxt3);
        this._botTxt3.x = this._botTxt1.x;
        this._botTxt3.y = this._botTxt1.y;

        let botTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("acAggregationBotTxt4"), 18);
        this.addChild(botTxt4);
        botTxt4.x = GameConfig.stageWidth/2 - botTxt4.width/2;
        botTxt4.y = GameConfig.stageHeigth - botTxt4.height - 13;

        this.refreshBotTxt();

        let datas = this.vo.getSortTaskCfg();
        let len = datas.length;

        let h = botbg.y - this._topTxtBg.y - this._topTxtBg.height;
        let rect =  new egret.Rectangle(0, 0, 624, h);
        let arr = [];
        for(let i = 0; i < datas.length; i++)
        {
            datas[i].isCreatorRwd = (this._creatorRwd && this._creatorRwd[datas[i].id]) ? this._creatorRwd[datas[i].id] : 0;
            arr.push(datas[i]);
        }
        let scrollList = ComponentManager.getScrollList(AcAggregationTaskItem,arr,rect,{aid:this.aid, code:this.code});
        scrollList.setPosition((GameConfig.stageWidth-rect.width)/2, this._topTxtBg.y+this._topTxtBg.height);
        this.addChild(scrollList);
        this._scrollList = scrollList;

		// this.setBigFameY(this._topTxtBg.y+this._topTxtBg.height);
        // this.setBigFameHeight(botbg.y - this._topTxtBg.y - this._topTxtBg.height)
		// this.setBigFameCorner(2);
    }
    private avgendCallback()
    {

    }

    private refreshBotTxt():void
    {
        let id = Api.playerVoApi.getPlayerAllianceId();
        this._detailBtn.visible = id == 0;
        this._botTxt1.visible = id == 0;
        this._botTxt2.visible = id == 0;
        this._botTxt3.visible = id != 0;
        if(this._botTxt3.visible)
        {
            this._botTxt3.text = LanguageManager.getlocal("acAggregationBotTxt3",[this.vo.getAllianceName()]);
        }
    }

    //请求回调
    protected receiveData(data: { ret: boolean, data: any }): void 
    {
        if (!data.ret) 
        {
            App.CommonUtil.showTip(data.data.ret);
        }
        if (data.ret && data.data.cmd == NetRequestConst.REQUEST_AGGREGATION_GETINFO) 
        {
            this._creatorRwd = data.data.data.creatorRwd;
            // if(this.vo.checkIsInEndShowTime())
            // {
            //     this.vo.extraTimeAllianceMn = data.data.data.allianceMn;
            // }            
        }
    }

    private getDefaultResList(resArr: string[]): string[] 
    {
        let arr = [];
        for (let i = 0; i < resArr.length; i++) {
            const element = resArr[i];
            let defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    }
    protected getResourceList(): string[] {
        let codeRes = this.getDefaultResList([
        ])
        let baseList = [
            "acaggregation_cicle",
            "acaggregation_cicle2",
            "acaggregation_bot",
            "acaggregation_title",
            "acaggregation_top",
            "arena_bottom",
            "acaggregation_itemtxt1",
            "acaggregation_itemtxt2",
        ];
        let codeList = null;
        if (this.code == "1") {
            codeList = [
            ]
        }
        return super.getResourceList().concat(baseList).concat(codeList).concat(codeRes);
    }

    private refreshView():void
    {
        if (!this.vo)
        {
            return;
        }
        let datas = this.vo.getSortTaskCfg();
        this._scrollList.refreshData(datas, {aid:this.aid, code:this.code});  
    }

    private tick() 
    {
        this._timeTxt.setString(this.vo.acCountDown);
        if(this.vo.checkIsAtEndShowTime())
        {
            this.request(NetRequestConst.REQUEST_AGGREGATION_GETINFO, {activeId:this.vo.aidAndCode});
        }
    }
    private get cfg(): Config.AcCfg.ChessCfg 
    {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcAggregationVo {
        return <AcAggregationVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes(resName+"-"+this.code)){
            return resName+"-"+this.code;
        } else {
            return resName+"-"+defaultCode;
        }
    }
    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }     
    private showStartDialog():void
    {
        let localkey:string = this.vo.aidAndCode + Api.playerVoApi.getPlayerID()+"dialog";
        let lastTime:number = 0;
        let timeStr:string = LocalStorageManager.get(localkey);
        if (timeStr && timeStr!="")
        {
            lastTime = Number(timeStr);
        }
        if (lastTime == this.vo.et)
        {	
            return;
        }
        LocalStorageManager.set(localkey, String(this.vo.et));
        let view = this;
        let keyStr = "startDialog_"+this.TypeCode;
        let startCfg = view.cfg[keyStr];
        let bgName = "story_bg6";
        ViewController.getInstance().openView(ViewConst.POPUP.ACYIYIBUSHEAVGVIEW,
        {
            aid : view.aid,
            code : ""+view.TypeCode,
            AVGDialog : startCfg,
            visitId : "1",
            talkKey: "acChessStartTalk_",
            bgName: bgName,
        });
    }      
    public dispose(): void {
        super.dispose();
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);   
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ALLIANCE, this.joinAlliance, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_AGGREGATION_GETRWD, this.getRwdCallback, this);  
    }
}