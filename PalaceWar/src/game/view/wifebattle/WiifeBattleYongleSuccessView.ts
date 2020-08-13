/**
 * 永乐大典使用成功，门客弹出UI
 * author qianjun
 */

class WiifeBattleYongleSuccessView  extends BaseView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	public constructor() {
		super();
	}
	
	public initView():void
	{
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);

        let bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = 290;
        bottomBg.y = (GameConfig.stageHeigth - bottomBg.height) / 2;
        this._nodeContainer.addChild(bottomBg);

        let closeBtn  = ComponentManager.getButton("popupview_closebtn1","",this.hide,this);
		closeBtn.x = this.viewBg.width - closeBtn.width - 15;
        closeBtn.y = bottomBg.y - closeBtn.height/2;
        this._nodeContainer.addChild(closeBtn);
        // let closeBtn = 
        let titleFlag = BaseBitmap.create("wifebattleyonglestudytxt");
        titleFlag.x = bottomBg.x + bottomBg.width/2 - titleFlag.width/2;
        titleFlag.y =  bottomBg.y-titleFlag.height/2 - 10;
        this._nodeContainer.addChild(titleFlag);

        let sbg = BaseBitmap.create("studyatk_servant_bg");
        sbg.x = (GameConfig.stageWidth  - sbg.width) / 2;
        sbg.y = bottomBg.y + (bottomBg.height  - sbg.height) / 2;;
        this._nodeContainer.addChild(sbg);

        let circleImg =  BaseBitmap.create("studyatk_booklv_circle"); 
        circleImg.anchorOffsetX = circleImg.width/2;
        circleImg.anchorOffsetY = circleImg.height/2;
        circleImg.setScale(0.5);
        circleImg.x = sbg.x + sbg.width/2;
        circleImg.y = sbg.y + sbg.height/2;
        
        let light1 =  BaseBitmap.create("studyatk_booklv_light1"); 
        light1.anchorOffsetX = light1.width/2;
        light1.anchorOffsetY = light1.height/2;
        light1.x = sbg.x + sbg.width/2;
        light1.y = sbg.y + sbg.height/2;
        light1.setScale(1.18);
        this._nodeContainer.addChild(light1);

        let light2 =  BaseBitmap.create("studyatk_booklv_light2"); 
        light2.anchorOffsetX = light2.width/2;
        light2.anchorOffsetY = light2.height/2;
        light2.x = light1.x;
        light2.y = light1.y;
        light2.setScale(light1.scaleX);
        this._nodeContainer.addChild(light2);

        this._nodeContainer.addChild(circleImg);

        egret.Tween.get(circleImg,{loop:true}).to({scaleX:1.25,scaleY:1.25},1000).to({scaleX:2.0,scaleY:2.0,alpha:0},1000).set({scaleX:0.5,scaleY:0.5,alpha:1});
        egret.Tween.get(light1,{loop:true}).to({rotation:360},15000);
        egret.Tween.get(light2,{loop:true}).to({rotation:-360},15000);

        let serInfo = null;
        let servantId = this.param.data.sid;
        let resPath = "servant_full_"+ servantId;

        let simg = BaseLoadBitmap.create(resPath);
        let mask = egret.Rectangle.create();

        simg.width = 405;
        simg.height = 467;
        mask.setTo(0,0,405,400);
        
        simg.mask = mask; 
        simg.anchorOffsetX = simg.width/2;
        simg.anchorOffsetY = simg.height/2;
        simg.setScale(0.4);
        simg.x = sbg.x + sbg.width/2;
        simg.y = sbg.y + sbg.height/2-10;
        this._nodeContainer.addChild(simg);

        let bookBg = BaseBitmap.create("bookroom_cdbg");
        bookBg.scaleY = 1.7;
        bookBg.x = sbg.x + sbg.width/2 - bookBg.width/2;
        bookBg.y = sbg.y + sbg.height-95;
        this._nodeContainer.addChild(bookBg);

        let tipTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_GREEN);
        tipTxt.text = this.param.data.text;
        tipTxt.x = bookBg.x + bookBg.width/2 - tipTxt.width/2;
        tipTxt.y = bookBg.y + bookBg.height*bookBg.scaleY/2 - tipTxt.height/2;
        this._nodeContainer.addChild(tipTxt);
    }

    protected clickHandler()
    {
        super.hide()
    }

    protected getTitleStr()
    {
        return null;
    }

     protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "studyatk_servant_bg","bookroom_cdbg","popupview_closebtn1",
            "studyatk_booklv_circle","studyatk_booklv_light1","studyatk_booklv_light2",`wifebattleyonglestudytxt`,
        ]);
	}

	public dispose():void
	{
		this._nodeContainer = null;
		super.dispose();
	}
}
