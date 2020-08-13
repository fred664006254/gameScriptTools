class AcSpringOutingLuckUpPopupView  extends PopupView
{

    private _data = null;
    private _callback = null;
    private _target = null;
    public constructor() {
		super();
	}

    protected getTitleStr():string
	{
		if(LanguageManager.checkHasKey("acSpringOutingLuckUpPopupViewTitle-"+AcSpringOutingView.CODE)){
            return "acSpringOutingLuckUpPopupViewTitle-"+AcSpringOutingView.CODE;
        } else {
            return "acSpringOutingLuckUpPopupViewTitle-1";
        }
	}
    protected getShowHeight():number
	{
		return 510;
	}
    protected getBgExtraHeight():number
	{
		return 0;
	}
    protected isTouchMaskClose():boolean
    {
        return true;
    }
    public get vo ()
    {
       return <AcSpringOutingVo>Api.acVoApi.getActivityVoByAidAndCode(AcSpringOutingView.AID,AcSpringOutingView.CODE);
    }
    protected isShowOpenAni():boolean
	{
		return false;
	}
	protected initView():void
	{
        let d = this.param.data;
        this._data = d.data;
        this._callback = d.callback;
        this._target = d.target;

        let curId = this.vo.getCurBgId();
        if(curId == 0){
            curId = 1;
        }
        let bg = null;
        if(ResourceManager.hasRes("acspringouting_winbg_"+curId+"-"+AcSpringOutingView.CODE))
        {
            bg = BaseLoadBitmap.create("acspringouting_winbg_"+curId+"-"+AcSpringOutingView.CODE);
        } else {
            bg = BaseLoadBitmap.create("acspringouting_winbg_"+curId+"-1");
        }
        bg.width = 537;
        bg.height = 388;
        bg.x = this.viewBg.x + this.viewBg.width/ 2- bg.width/2;
        bg.y = 15;
        this.addChildToContainer(bg);


        let scaleNum = 0.4;
        let wifeBM = null;// BaseLoadBitmap.create("wife_skin_1071");
        if(AcSpringOutingView.CODE == "3"){
             wifeBM =  BaseLoadBitmap.create("wife_skin_2201");
        } else {
             wifeBM =  BaseLoadBitmap.create("wife_skin_1071");
        }
        // wifeBM =  BaseLoadBitmap.create("wife_skin_1071");
        wifeBM.width = 640;
        wifeBM.height = 840;
        wifeBM.setScale(scaleNum);
        wifeBM.x = this.viewBg.x + this.viewBg.width/2 - wifeBM.width * scaleNum/2;
        wifeBM.y = bg.y + bg.height - 3 - wifeBM.height * scaleNum;
        this.addChildToContainer(wifeBM);

        let txtBg = BaseBitmap.create("public_tc_hd01");
        txtBg.width = bg.width-6;
       

        this.addChildToContainer(txtBg);


        let txtkey = "";
        if(LanguageManager.checkHasKey("acSprintOutingLuckUpText_"+curId+"-"+AcSpringOutingView.CODE)){
           txtkey = LanguageManager.getlocal("acSprintOutingLuckUpText_"+curId+"-"+AcSpringOutingView.CODE);
        } else {
            txtkey = LanguageManager.getlocal("acSprintOutingLuckUpText_"+curId+"-1");
        }

        //脱衣后桃心
        let taoxinFullParticle = App.ParticleUtil.getParticle("taoxin");
        taoxinFullParticle.x = GameConfig.stageWidth/2 ;
        taoxinFullParticle.y = GameConfig.stageHeigth/2;

        taoxinFullParticle.start();
        taoxinFullParticle.scaleX = 0.8;
        taoxinFullParticle.scaleY = 0.8;
        this.addChild(taoxinFullParticle);

        //文字描述1
        let speadkDes = ComponentManager.getTextField(txtkey, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        
        speadkDes.width=490;
        speadkDes.lineSpacing = 5;
        

        txtBg.height = speadkDes.height + 30;
        txtBg.x = bg.x + bg.width/2 - txtBg.width/2;
        txtBg.y = bg.y + bg.height - 3 - txtBg.height;

        speadkDes.x= txtBg.x + txtBg.width/2 - speadkDes.width/2;
        speadkDes.y= txtBg.y + txtBg.height/2 - speadkDes.height/2;;
        
        this.addChildToContainer(speadkDes);
    }
    public hide()
    {
        if(this._callback && this._target){
            this._callback.apply(this._target,[this._data]);
        }
        super.hide();
    }

    // protected resetBgSize():void
    // {
    //     super.resetBgSize();
    //     this.viewBg.height=450;
    //     // this.viewBg.y=this.viewBg.y-100;
    //     // this.closeBtn.y =this.viewBg.y-50;
    //     // this.closeBtn.x =this.closeBtn.x-10;
    // }
   
    private touchHandler():void
    {     
      
        ViewController.getInstance().hideView(ViewConst.POPUP.ACSPRINGOUTINGLUCKUPPOPUPVIEW);
    }

     protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            
		]);
	}
   
        

    public dispose()
    {
        this._data = null;
        this._callback = null;
        this._target = null;
        super.dispose()
    }
}