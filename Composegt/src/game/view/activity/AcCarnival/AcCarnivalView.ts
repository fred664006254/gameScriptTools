/**
 * 狂欢节活动 主view
 * author jiangliuyang
 * date 2018/4/11
 * @class AcCarnivalView
 */
class AcCarnivalView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    //panel列表
    private _carnivalItemList=[];  
    private _topBg: BaseBitmap; 
    private _top:BaseBitmap;
    private _cdTxt:BaseTextField;

    //充值提示1
    private _chargeHintTxt1: BaseTextField;
    private _chargeHintTxt2: BaseTextField;


    private _activityDurTxt:BaseTextField
    // private _rechargeTxt:BaseTextField
    private _tmpVo;
    private _redImgList = [];
    public constructor() {
		super();
	}

	public initView():void
	{

        //添加消费监听

        // App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY,this.checkRedpoints,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACCARNIVAL_CHANGE_CHARGE,this.checkRedpoints,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACCARNIVAL_CHANGE_COST,this.checkRedpoints,this);
        
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCHARGE),this.checkRedpoints,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST),this.checkRedpoints,this);

        //主界面图片
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        
        //title背景图
        this._topBg = BaseBitmap.create("accarnivalview_charge_topbg");
        this._topBg.width = GameConfig.stageWidth+18;
        this._topBg.y = -13;
		this._nodeContainer.addChild(this._topBg);

        this._top = BaseBitmap.create("accarnivalview_charge_top");
        this._top.anchorOffsetY = this._top.height/2;
        this._top.y = 30;
        this._top.x = 20;
        this._nodeContainer.addChild(this._top);



        //时间等文本
        this._activityDurTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._activityDurTxt.x = 30;
        this._activityDurTxt.y = 80.5;//this._topBg.y + this._topBg.height/2 - 10 ;
        this._nodeContainer.addChild(this._activityDurTxt);
        
        this._cdTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        this._cdTxt.x = this._activityDurTxt.x;
        this._cdTxt.y = 110.5;//this._activityDurTxt.y + 40 ;
        this._nodeContainer.addChild(this._cdTxt);


        this._chargeHintTxt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._chargeHintTxt1.text = LanguageManager.getlocal("payrule1");
        this._chargeHintTxt1.x = this._activityDurTxt.x;
        this._chargeHintTxt1.y = 155.5;
        this._nodeContainer.addChild(this._chargeHintTxt1);

        this._chargeHintTxt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON);
        this._chargeHintTxt2.text = LanguageManager.getlocal("payrule2");
        this._chargeHintTxt2.x = this._activityDurTxt.x;
        this._chargeHintTxt2.y = 180.5;
        this._nodeContainer.addChild(this._chargeHintTxt2);

        //最底部背景
        let bottomBg = BaseBitmap.create("servant_bottombg");
        bottomBg.width = GameConfig.stageWidth+16;
        bottomBg.height = GameConfig.stageHeigth - this._topBg.height - this._topBg.y -this.container.y+5;
        bottomBg.x = -8;
        bottomBg.y = this._topBg.height + this._topBg.y;
		this._nodeContainer.addChild(bottomBg);

        let bottomBg2 = BaseBitmap.create("public_9v_bg04");
        bottomBg2.height = bottomBg.height - 110;
        bottomBg2.width = bottomBg.width - 40;
        bottomBg2.x = bottomBg.x+20;
        bottomBg2.y = bottomBg.y + 85;
		this._nodeContainer.addChild(bottomBg2);
        let tabName = [];
        let tmpRect =  new egret.Rectangle(0,0,bottomBg2.width,bottomBg2.height-10);
        // let tmpRect =  new egret.Rectangle(0,0,GameConfig.stageWidth,bottomBg2.height);
        let tabY = bottomBg.y + 24;
        let tabX = 15;

        //每日消费面板
        
        let chargeVo = Api.acVoApi.getActivityVoByAidAndCode("carnivalCharge");
        //检查是否有每日消费面板
        if (chargeVo)
        {
            //红点
            let redPoint = BaseBitmap.create("public_dot2");
            redPoint.name = "carnivalCharge_"+ chargeVo.code;
            redPoint.y = tabY;
            redPoint.x = tabX+125;
            //红点list
            this._redImgList.push(redPoint);
            this._nodeContainer.addChild(redPoint);

            tabName.push("acCarnivalViewTabCharge");
            //创建tab页的panel
            let carnivalItem = new AcCarnivalItem();
            carnivalItem.name = redPoint.name;
            carnivalItem.typeCode = "carnivalCharge";
            carnivalItem.topImgName = "accarnivalview_charge_top";
            carnivalItem.topBgImgName = "accarnivalview_charge_topbg";
            carnivalItem.x = 21;
            carnivalItem.y = bottomBg2.y + 5;
            carnivalItem.init("carnivalCharge", chargeVo.code, tmpRect);
            this._nodeContainer.addChild(carnivalItem);
            this._carnivalItemList.push(carnivalItem);
        }
        //判断消费是否有配置
        let costVo = Api.acVoApi.getActivityVoByAidAndCode("carnivalCost");
        if (costVo)
        {
            let redPoint = BaseBitmap.create("public_dot2");
            redPoint.name = "carnivalCost_" + costVo.code;
            this._redImgList.push(redPoint);
            redPoint.y = tabY;
            redPoint.x = tabX+280;
            this._nodeContainer.addChild(redPoint);

            tabName.push("acCarnivalViewTabCost")
            let carnivalItem = new AcCarnivalItem();
            carnivalItem.name = redPoint.name
            carnivalItem.typeCode = "carnivalCost";
            carnivalItem.topImgName = "accarnivalview_cost_top";
            carnivalItem.topBgImgName = "accarnivalview_cost_topbg";
            carnivalItem.init("carnivalCost",costVo.code,tmpRect);
            // rechargeItem.x = bottomBg2.x+5;
            carnivalItem.x = 21;
            carnivalItem.y =bottomBg2.y+5;
            carnivalItem.visible = false;
            this._nodeContainer.addChild(carnivalItem);
            this._carnivalItemList.push(carnivalItem);
        }
       let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = tabX;
        tabbarGroup.y = tabY;
        this._nodeContainer.addChild(tabbarGroup);
        for (var key in this._redImgList) {
            let red:BaseBitmap = this._redImgList[key];
            red.visible = false;
            if(key == "0")
                red.x = tabX+122;
            if(key == "1")
                red.x = tabX+280;
            // if(key == "2")
            //     red.x = tabX+437;
            this._nodeContainer.addChild(red);
        }


        this.tabBtnClickHandler({index:0});
        //检查红点
        this.checkRedpoints();
        
    }

    //tab标签按钮事件
    protected tabBtnClickHandler(params:any)
    {
       
        
        let idx = params.index;

        for (var index = 0; index < this._carnivalItemList.length; index++) {
            this._carnivalItemList[index].visible = false;
        }
        this._carnivalItemList[idx].visible = true;
        let nameStr = this._carnivalItemList[idx].name;
        let topImgNameStr = this._carnivalItemList[idx].topImgName;
        let topBgImgNameStr = this._carnivalItemList[idx].topBgImgName;
        let nameTab = App.StringUtil.splitString(nameStr,"_");
        

        this._topBg.texture = ResourceManager.getRes(topBgImgNameStr);


        this._top.texture = ResourceManager.getRes(topImgNameStr);
        this._top.anchorOffsetY = this._top.height/2;
        this._top.y = 30;
        

        if (this._carnivalItemList[idx].typeCode=="carnivalCharge")
        {
            this._chargeHintTxt1.visible = true;
            // this._chargeHintTxt2.visible = true;
            this._chargeHintTxt2.y = 180.5;
        } else {
            this._chargeHintTxt1.visible = false;
            this._chargeHintTxt2.y = 155.5;
            // this._chargeHintTxt2.visible = false;
        }

        let tmpVo = undefined;


       
        tmpVo = <AcBaseVo>Api.acVoApi.getActivityVoByAidAndCode(this._carnivalItemList[idx].typeCode);


       
        this._tmpVo = tmpVo;


       let timeStr = App.DateUtil.getOpenLocalTime(tmpVo.st,tmpVo.et,true);
        this._activityDurTxt.text = this._tmpVo.getAcLocalTime(true);
 
       this.tick();
       
    }

    public tick():boolean
	{
        
        let deltaT = this._tmpVo.et - GameData.serverTime;
		if (this._cdTxt && deltaT > 0){
            this._cdTxt.text = LanguageManager.getlocal("acrecharge_acCD",[App.DateUtil.getFormatBySecond(deltaT,1)]);
			return true;
        }else{
            this._cdTxt.text = LanguageManager.getlocal("acrecharge_acCD",[LanguageManager.getlocal("acRank_acCDEnd")]);
		}
        
		return false;
        
        
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "accarnivalview_charge_topbg",
            "accarnivalview_charge_top",
            "accarnivalview_cost_topbg",
            "accarnivalview_cost_top",
            "accarnivalview_tab_green",
            "accarnivalview_tab_red", 
            "activity_charge_word4",
            "activity_charge_word5",
            "servant_bottombg",
            "progress_type1_yellow","progress_type1_bg",
            "recharge_fnt",
            // "itemeffect",
         ]);
	}
    private checkRedpoints()
    {
        for (var index = 0; index < this._redImgList.length; index++) {
            var redImg:BaseBitmap = this._redImgList[index];
            let name = redImg.name ;//= "totalDayRecharge_1";
            let tmpStr = name.split("_");
            let tmpVo = Api.acVoApi.getActivityVoByAidAndCode(tmpStr[0],tmpStr[1]);
            if (tmpVo.isShowRedDot) {
                redImg.visible = true;
            }else{
                redImg.visible = false;
            }
        }
    }

	public dispose():void
	{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACCARNIVAL_CHANGE_CHARGE,this.checkRedpoints,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACCARNIVAL_CHANGE_COST,this.checkRedpoints,this);
        // App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.checkRedpoints,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCHARGE),this.checkRedpoints,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST),this.checkRedpoints,this);

        this._nodeContainer = null;
        this._carnivalItemList = [];
        this._topBg = null;
        this._top = null;
        this._cdTxt = null;
        this._activityDurTxt = null;
        // this._rechargeTxt = null;
        this._tmpVo = null;
        this._redImgList = [];
        
        super.dispose();
    }
}