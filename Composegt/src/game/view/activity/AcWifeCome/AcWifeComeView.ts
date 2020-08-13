// TypeScript file
/**
 * 网红来了活动
 */
class AcWifeComeView extends AcCommonView
{
    //活动model对应vo
    private _dataVo: any = null;

    //活动配置的cfg
    private _dataCfg: any = null;

    //是否已经领取
    private _isCollected: boolean = false;

    //容器
    private _nodeContainer: BaseDisplayObjectContainer = null;


    //活动时间title文字
    private _actTimeTitleText: BaseTextField = null;

    //活动时间文本
    private _actTimeText: BaseTextField = null;

    //绝版活动限时的文本
    private _actDescText: BaseTextField = null;

    //活动详情文本
    private _actDetailText: BaseTextField = null;

    //照片
    private _contentImg: BaseBitmap = null;


    //进度条
    private _progress: ProgressBar = null;

    //进度条文字
    private _progressText: BaseTextField = null;

    //已经领取标识
    private _collectFlag: BaseBitmap = null;

    //领取按钮
    private _collectBtn: BaseButton = null;

    //充值按钮
    private _chargeBtn: BaseButton = null;

    
    


    public constructor() 
    {
        super();
    }

    //init view 
    public initView(): void
    {
        //初始化数据
        if(this._dataVo == null)
        {
            this._dataVo = Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
        }

        if(this._dataCfg == null)
        {
            this._dataCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
        }
        //初始化已经领取标识
        this._isCollected = this._dataVo.get == 1 ? true : false;


        //初始化界面
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = GameConfig.stageHeigth - 104;
        this.addChildToContainer(this._nodeContainer);
        
        if(ResourceManager.hasRes("acwifecomeview_content"+this.code)){
            this._contentImg = BaseLoadBitmap.create("acwifecomeview_content"+this.code);
        } else {
            this._contentImg = BaseLoadBitmap.create("acwifecomeview_content1");
        }
        
        this._contentImg.width = 640;
        this._contentImg.height = 1136;
        this._contentImg.y = GameConfig.stageHeigth / 2 - this._contentImg.height/2;
        this._nodeContainer.addChild(this._contentImg);


        let wifeid = "";
        let dragonScale = 1;
        let dragonY = this._contentImg.y + 1000;
        let imgScale = 0.6;
        let imgY = this._contentImg.y + 390;
        let fY = this._contentImg.y + 1136 - 267 + 80;
        switch(this.code+""){
            case "1":
                wifeid = "213";
                break;
            case "2":
                wifeid = "220";
                break;
            case "3":
                wifeid = "211";
                fY = this._contentImg.y + 1136 - 267 + 40;
                break;
            case "4":
                wifeid = "222";
                dragonY = this._contentImg.y + 900;
                dragonScale = 0.85;
                break;
            default:
                wifeid = this._dataCfg.wifeId;
        }
        
        if(App.CommonUtil.check_dragon() && ResourceManager.hasRes("wife_full_"+wifeid +"_ske") && Api.wifeVoApi.isHaveBone("wife_full_"+wifeid +"_ske"))
        {
            let droWifeIcon=App.DragonBonesUtil.getLoadDragonBones("wife_full_"+wifeid);
            droWifeIcon.setScale(dragonScale)
            droWifeIcon.x = 320;
            droWifeIcon.y = dragonY;
            this._nodeContainer.addChild(droWifeIcon);
        }
        else
        {
            // wife 的 图片
          
            let wifeBM =  BaseLoadBitmap.create("wife_full_"+wifeid);
            wifeBM.width = 640;
            wifeBM.height = 840;
            wifeBM.setScale(imgScale);
            wifeBM.x = GameConfig.stageWidth / 2 - wifeBM.width * imgScale /2;
            wifeBM.y = imgY;
            this._nodeContainer.addChild(wifeBM);
        }  
        
        let bottom = null;
        if(ResourceManager.hasRes("acwifecomeview_bottom"+this.code)){
            bottom = BaseLoadBitmap.create("acwifecomeview_bottom"+this.code);
        } else {
            bottom = BaseLoadBitmap.create("acwifecomeview_bottom");
        } 
        bottom.width = 640;
        bottom.height = 267;
        bottom.x = 0;

        bottom.y = this._contentImg.y + this._contentImg.height - bottom.height;
        this._nodeContainer.addChild(bottom);

        let f = BaseBitmap.create(this.getDefaultRes("acwifecomeview_f"));
        f.x = bottom.x + bottom.width - f.width;
        f.y = fY;//bottom.y + bottom.height/2 - f.height/2-15;
        this._nodeContainer.addChild(f);

        if(this.code == "5"){
            let f2 = BaseBitmap.create("acwifecomeview_f5_2");
            f2.x = bottom.x ;
            f2.y = bottom.y + 125;
            this._nodeContainer.addChild(f2);
        }

        this._actTimeTitleText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._actTimeTitleText.text = LanguageManager.getlocal("acWifeComeTimeTitle");       
        this._actTimeTitleText.x = 30;
        this._actTimeTitleText.y = this._contentImg.y + 210;
        this._nodeContainer.addChild(this._actTimeTitleText);

        this._actTimeText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
        this._actTimeText.text = this._dataVo.acTimeAndHour;//"11月20日－11月22日(每日9-22点)";
        this._actTimeText.x = this._actTimeTitleText.x + this._actTimeTitleText.width + 5;
        this._actTimeText.y = this._actTimeTitleText.y;
        this._nodeContainer.addChild(this._actTimeText);

        // this._actDescText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        // this._actDescText.text = LanguageManager.getlocal("acWifeComeDesc");//"绝版活动限时来袭，快来与Misa缔结良缘";
        // this._actDescText.x= 10;
        // this._actDescText.y = this._contentImg.y + 205;
        // this._nodeContainer.addChild(this._actDescText);

        this._actDetailText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        this._actDetailText.text = LanguageManager.getlocal("acWifeComeDetail_"+this.code,[this._dataCfg.exchange,this._dataCfg.need]);//"活动期间，每充值1元会赠送给红颜1朵花，满99朵获得米莎公主";
        this._actDetailText.x = 30;
        this._actDetailText.lineSpacing = 4;
        this._actDetailText.y = this._contentImg.y + 237;
        this._actDetailText.width = 580;
        this._nodeContainer.addChild(this._actDetailText);



        //网红名字背景
        let nameBg:BaseBitmap = BaseBitmap.create("wifeview_namebg");
        this.addChildToContainer(nameBg);
        //网红名字
        let nameTF = ComponentManager.getTextField(LanguageManager.getlocal("acWifeComeName_"+this.code),TextFieldConst.FONTSIZE_TITLE_COMMON,TextFieldConst.COLOR_BLACK);
        if(PlatformManager.checkIsTextHorizontal()){
            nameBg.width = nameTF.width + 50;
            nameBg.x = this.viewBg.width/2 - nameBg.width /2;
            nameBg.y = this._contentImg.y + 750;
            nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2;
            nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2;
        } else {
            nameBg.x = 45;
            nameBg.y = this._contentImg.y + 400;
            nameTF.width = 27;
            nameTF.x = nameBg.x + 33;
            nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2 - 10;
        }
        this.addChildToContainer(nameTF);
    




        
        this._progress = ComponentManager.getProgressBar("progress_type1_yellow","progress_type1_bg",this._nodeContainer.width - 160);
        this._progress.y = this._contentImg.y + 900;
        this._progress.x = this.viewBg.width / 2 - this._progress.width/2;
        this._nodeContainer.addChild(this._progress);

        this._progressText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
        this._progressText.text = "0/0";
        
        this._progressText.textAlign = egret.HorizontalAlign.CENTER;
        this._progressText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._progressText.x = this._nodeContainer.width/2 - this._progressText.width/2;
        this._progressText.y = this._progress.y + this._progress.height/2 - this._progressText.height/2;
        this._nodeContainer.addChild(this._progressText);

        let closeBtn  = ComponentManager.getButton("commonview_closebtn1","",this.hide,this);
		closeBtn.x = this.viewBg.width - closeBtn.width - 2;
        closeBtn.y = this._contentImg.y + 130;
        this._nodeContainer.addChild(closeBtn);

        
        //花
        let flowerImg = BaseBitmap.create(this.getDefaultRes("acwifecomeview_flower")); 
        //  if(ResourceManager.hasRes("acwifecomeview_flower"+this.code)){
        //     flowerImg = BaseBitmap.create("acwifecomeview_flower"+this.code);
        // } else {
        //     flowerImg = BaseBitmap.create("acwifecomeview_flower");
        // }

        if(this.code == "3"){
            flowerImg.x = this._progress.x - 40;
            flowerImg.y = this._progress.y - 12;
        } else if(this.code == "7"){
            flowerImg.x = this._progress.x - 30;
            flowerImg.y = this._progress.y - 15;
        } else {
            flowerImg.x = this._progress.x - 30;
            flowerImg.y = this._progress.y - 12;

        }

       

        
        this._nodeContainer.addChild(flowerImg);
        //添加vo数据更改的消息监听
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ACWIFECOME_VOCHANGE,this.refreshDataStatus,this);

        //刷新数据状态
        this.refreshDataStatus();

    }


    //刷新按钮初始化状态
    private refreshDataStatus()
    {
       
        //刷新进度条上的文本进度显示
        this._progressText.text = (this._dataVo.v > this._dataCfg.need ? this._dataCfg.need : this._dataVo.v) + "/" + this._dataCfg.need;
        this._progressText.x = this._nodeContainer.width/2 - this._progressText.width/2;
        this._progress.setPercentage(this._dataVo.v/this._dataCfg.need);
        
        //实际数值和需要数值的差
        let val = this._dataVo.v - this._dataCfg.need;
        let showMark = 0;  //1->显示充值按钮  2->显示领取按钮  3->显示标识
        if (val < 0){
            //没有达成需求，显示去充值按钮
            showMark = 1;
        } else {
            //已经达成需求，显示 领取按钮 或者显示 已经领取标识
            if (this._dataVo.get == 0){
                //没领取 显示 领取按钮
                showMark = 2;
            } /*else if(this._dataVo.get == 1){
                //已经领取 显示 已经领取标识
                showMark = 3;
            }*/
        }
        //刷新按钮状态
        this.refreshBtnStatus(showMark);

    }
    //显示按钮
    //1->显示充值按钮  2->显示领取按钮  3->显示标识
    private refreshBtnStatus(showMar:number)
    {
        //创建按钮
        if(this._chargeBtn == null){
            this._chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"acCarnivalToChargeBtnText",this.goRechargeHandler,this);
            this._chargeBtn.x = this._nodeContainer.width / 2 - this._chargeBtn.width / 2;
            this._chargeBtn.y = this._progress.y + 40;
            this._nodeContainer.addChild(this._chargeBtn);
        }

        if(this._collectBtn == null){
            this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"ac_recharge_Btntxt2",this.collectBtnHandler ,this);
            this._collectBtn.x = this._nodeContainer.width / 2 - this._collectBtn.width / 2;
            this._collectBtn.y = this._progress.y + 40;
            this._nodeContainer.addChild(this._collectBtn);
        }

        if(this._collectFlag == null){
            this.createCollectFlag();
        }
        //1->显示充值按钮  2->显示领取按钮  3->显示标识
        switch(showMar){
            case 1:
                this._chargeBtn.visible = true;
                this._collectBtn.visible = false;
                this._collectFlag.visible = false;
                break;
            case 2:
                this._chargeBtn.visible = false;
                this._collectBtn.visible = true;
                this._collectFlag.visible = false;
                break;
            case 3:
                this._chargeBtn.visible = false;
                this._collectBtn.visible = true;
                this._collectBtn.setEnable(false);
                this._collectBtn.setColor(0x646262);
                // this.checkShowCollectAnim();
                break;
            default:
                break;

        }

    }
    //创建已领取标识
    private createCollectFlag()
    {
        this._collectFlag = BaseBitmap.create("collectflag")
        // this._collectFlag.setScale(0.7);
        this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
        
        this._collectFlag.x = this._nodeContainer.width / 2 ;
        this._collectFlag.y = this._progress.y + 65;
        
        this._nodeContainer.addChild(this._collectFlag);

    }
    //判断是否播放标识动画
    private checkShowCollectAnim()
    {
        //刚刚领取 播放动画
        if(!this._isCollected)
        {
            this._isCollected = true;
            this._collectFlag.setScale(1.5);
            this._collectFlag.visible = true;
            egret.Tween.get(this._collectFlag,{loop:false}).to({scaleX:1,scaleY:1},300);
        } else {
            this._collectFlag.visible = true;
        }
    }
    //点击领取按钮
    private collectBtnHandler()
    {
      

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD),this.collectBtnHandlerCallback,this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD,{activeId:"wifeCome-"+this._dataVo.code})
        
    }
    //领取请求返回
    private collectBtnHandlerCallback(event: egret.Event)
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD),this.collectBtnHandlerCallback,this);
        let ret = event.data.data.ret;
        // let data = {get:1,v:this._dataVo.v};
        // this._dataVo.testFunc(data);
        //领取失败
        if(ret != 0)
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("collect_error"));
            return;
        } else {
            this.checkRewardSuccess();
        }
    }
        //成功获取 隐藏按钮
    private checkRewardSuccess(){
        //创建按钮
        if(this._chargeBtn == null){
            this._chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"acCarnivalToChargeBtnText",this.goRechargeHandler,this);
            this._chargeBtn.x = this._nodeContainer.width / 2 - this._chargeBtn.width / 2;
            this._chargeBtn.y = this._progress.y + 40;
            this._nodeContainer.addChild(this._chargeBtn);
        }

        if(this._collectBtn == null){
            this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"ac_recharge_Btntxt2",this.collectBtnHandler ,this);
            this._collectBtn.x = this._nodeContainer.width / 2 - this._collectBtn.width / 2;
            this._collectBtn.y = this._progress.y + 40;
            this._nodeContainer.addChild(this._collectBtn);
        }

        if(this._collectFlag == null){
            this.createCollectFlag();
        }
       

        this._chargeBtn.visible = false;
        this._collectBtn.visible = false;
        this.checkShowCollectAnim();
  
    }
    //跳转充值界面
    private goRechargeHandler()
    {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }
    //不显示标题名字
	protected getTitleStr():string
	{
		return null;
	}
    protected getTitleBgName():string
    {
        return null;
    }
    // 不使用组件的关闭按钮
	protected getCloseBtnName():string
	{
		return null;
	}

    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes(resName+this.code)){
            return resName+this.code;
        } else {
            return resName+defaultCode;
        }
    }    
    //加载资源
    protected getResourceList(): string[]
    {

        return super.getResourceList().concat([
            "forpeople_top",
            // "acwifecomeview_content",
            "progress_type1_yellow","progress_type1_bg",
            "acwifecomeview_flower",
            "acwifecomeview_flower3","acwifecomeview_flower5","acwifecomeview_f5_2",
            "wifeview_namebg",
            "commonview_closebtn1",
            this.getDefaultRes("acwifecomeview_f"),
            this.getDefaultRes("acwifecomeview_flower"),
        ]);
        


    }
    public dispose(): void
    {
        
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ACWIFECOME_VOCHANGE,this.refreshDataStatus,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETWIFECOMEREWARD),this.collectBtnHandlerCallback,this);

        this._dataVo = null;
        this._dataCfg = null;
        this._isCollected = false;
        this._nodeContainer = null;

     
        this._actTimeTitleText = null;
        this._actTimeText = null;
        this._actDescText = null;
        this._actDetailText = null;
        this._contentImg = null;
        this._progress = null;
        this._progressText = null;
    
        this._collectFlag = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        
        
        super.dispose();
    }

}