/**
  * 洗澡详情
  * @author jiangliuyang
  * date 2019/4/1
  * @class WifeBathSceneConfirmPopupView
  */
class WifeBathSceneConfirmPopupView extends PopupView {


    private _baseLoveCallback:Function;
    private _sceneLoveCallback:Function;
    private _handler: any;

    private _wifeInfoVo:WifeInfoVo;

	public constructor() {
		super();
	}
 
	/**
	 * 重写 初始化viewbg
	 * 
	 */
    protected initBg():void
    {
        this.viewBg = BaseLoadBitmap.create("wifebathsceneconfirm_bg");
        this.viewBg.width = 640;
        this.viewBg.height = 630;
		this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2,GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
		this.addChild(this.viewBg);
    }
	protected resetBgSize():void
    {
		// this.closeBtn.setPosition(this.viewBg.x + this.viewBg.width - this.closeBtn.width + 10,this.viewBg.y + 50);
		// this.titleTF.y = this.viewBg.y + 30;

        this.closeBtn.x = GameConfig.stageWidth - this.closeBtn.width -50;
		this.closeBtn.y = this.viewBg.y+30+88;


    }
	public initView()
	{
        let data = this.param.data;
        let useNum = data.useNum;   //  使用元宝数
        let num = data.num;         //玩家元宝数
        let wifename = data.wifename;
        this._wifeInfoVo = data.wifeInfoVo;
         let sceneId:string = null;
        for(let key in this._wifeInfoVo.scene)
        {
            sceneId = key   
        }
  
        this._baseLoveCallback = data.baseLoveCallback;
        this._sceneLoveCallback = data.sceneLoveCallback;
        this._handler = data.handler;

        let baseBtn: BaseButton = ComponentManager.getButton("wifebathsceneconfirm_btn",null,this.baseLoveBtnHandler,this);
        baseBtn.x = 5;
        baseBtn.y = this.viewBg.y + 385;

        let baseText = ComponentManager.getTextField(LanguageManager.getlocal("wifeBathSceneConfirmBaseLoveBtn"),40,TextFieldConst.COLOR_BLACK)
        baseText.textAlign = egret.HorizontalAlign.CENTER;
        baseText.x = baseBtn.x + baseBtn.width/2 - baseText.width/2;
        baseText.y = baseBtn.y + baseBtn.height/2 - baseText.height/2+35;
        this.addChildToContainer(baseBtn);
        this.addChildToContainer(baseText);

        let baseBtnBg = BaseBitmap.create("wifebathsceneconfirm_btnbg");
        baseBtnBg.x = baseBtn.x + baseBtn.width/2 - baseBtnBg.width/2;
        baseBtnBg.y = baseBtn.y + baseBtn.height -7;
        this.addChildToContainer(baseBtnBg);


        let sceneBtn: BaseButton = ComponentManager.getButton("wifebathsceneconfirm_btn",null,this.sceneLoveBtnHandler,this);
        sceneBtn.x = GameConfig.stageWidth - 5 - sceneBtn.width;
        sceneBtn.y = this.viewBg.y + 385;

        let sceneText = ComponentManager.getTextField(LanguageManager.getlocal("wifeBathSceneConfirmSceneLoveBtn"+sceneId),40,TextFieldConst.COLOR_BLACK)
        sceneText.x = sceneBtn.x + sceneBtn.width/2 - sceneText.width/2;
        sceneText.y = sceneBtn.y + sceneBtn.height/2 - sceneText.height/2+35;
        this.addChildToContainer(sceneBtn);
        this.addChildToContainer(sceneText);

        let sceneBtnBg = BaseBitmap.create("wifebathsceneconfirm_btnbg");
        sceneBtnBg.x = sceneBtn.x + sceneBtn.width/2 - sceneBtnBg.width/2;
        sceneBtnBg.y = sceneBtn.y + sceneBtn.height-7;
        this.addChildToContainer(sceneBtnBg);

		let costText1 = ComponentManager.getTextField(LanguageManager.getlocal("wifeBathSceneConfirmCostText1",[String(useNum),wifename]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		costText1.x = this.viewBg.width/2 - costText1.width/2;
		costText1.y = this.viewBg.y + this.viewBg.height + 50;
		this.addChildToContainer(costText1);

		let costText2 = ComponentManager.getTextField(LanguageManager.getlocal("wifeBathSceneConfirmCostText2",[String(num)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		costText2.x = this.viewBg.width/2 - costText2.width/2;
		costText2.y = costText1.y + costText1.height + 6;
		this.addChildToContainer(costText2);




        let detailBtn = ComponentManager.getButton("btn_rule",null,this.detailBtnHandler,this);
        detailBtn.x = sceneBtnBg.x + sceneBtnBg.width - detailBtn.width-60;
        detailBtn.y = sceneBtnBg.y - detailBtn.height + 15;
        this.addChildToContainer(detailBtn);

        let mark2 = BaseBitmap.create("wifebathsceneconfirm_mark2");
        mark2.x = baseBtnBg.x + baseBtnBg.width/2 - mark2.width/2;
        mark2.y = baseBtnBg.y + mark2.height/2 - 163;
        this.addChildToContainer(mark2);

        let mark3 = BaseBitmap.create("wifebathsceneconfirm_mark3");
        mark3.x = sceneBtnBg.x + sceneBtnBg.width/2 - mark3.width/2;
        mark3.y = sceneBtnBg.y + mark3.height/2 - 163;
        this.addChildToContainer(mark3);


        let mark1 = BaseBitmap.create("wifebathsceneconfirm_mark1");
        mark1.x = 0;
        mark1.y = baseBtnBg.y - mark1.y;
        this.addChildToContainer(mark1);
	}

    private detailBtnHandler():void
    {
        let sceneId:string = null;
        for(let key in this._wifeInfoVo.scene)
        {
            sceneId = key   
        }
        ViewController.getInstance().openView(ViewConst.POPUP.WIFEBATHSCENEDETAILPOPUPVIEW,{sceneId:sceneId,wifename:this._wifeInfoVo.name});

    }
    private baseLoveBtnHandler():void
    {
        if(this.checkNeedGem()){
            if(this._baseLoveCallback && this._handler)
            {
                this._baseLoveCallback.apply(this._handler);
            }
        }
        this.hide();
    }
    private sceneLoveBtnHandler():void
    {
        if(this.checkNeedGem()){
            if(this._sceneLoveCallback && this._handler)
            {
                let sceneId:string = null;
                for(let key in this._wifeInfoVo.scene)
                {
                    sceneId = key   
                }
                this._sceneLoveCallback.apply(this._handler,[sceneId]);
            }
        }
        this.hide();
    }
	
    private checkNeedGem():boolean
    {
        if(this.param.data.useNum && this.param.data.useNum > this.param.data.num)
		{
            App.CommonUtil.showTip(LanguageManager.getlocal("gemNotEnough"))
            return false;
		}
        return true;
    }

	// protected getShowHeight():number
	// {
	// 	return 700;
	// }
	// 关闭按钮图标名称
    protected getCloseBtnName():string
	{
		return "btn_win_closebtn";
	}	
	// 背景图名称
	protected getBgName():string
	{
		
		return null;
	}
	protected getTitleStr():string
	{
		return null;
	}
  	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "wifebathsceneconfirm_btn",
            "wifebathsceneconfirm_btnbg",
            "wifebathsceneconfirm_mark1",
            "wifebathsceneconfirm_mark2",
            "wifebathsceneconfirm_mark3"
		]);
	}
	public dispose()
	{
        this._baseLoveCallback = null;
        this._sceneLoveCallback = null;
        this._handler = null;
        this._wifeInfoVo = null;
		super.dispose();
	}
	
}