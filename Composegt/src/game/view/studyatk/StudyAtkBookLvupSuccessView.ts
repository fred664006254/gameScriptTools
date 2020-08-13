/**
 * 练武场书籍升级，门客弹出UI
 * author yanyuling
 * date 2017/12/02
 * @class StudyAtkBookLvupSuccessView
 */

class StudyAtkBookLvupSuccessView  extends BaseView
{
	private _nodeContainer:BaseDisplayObjectContainer;
	public constructor() {
		super();
	}
	
	public initView():void
	{
        let bookId = this.param.data[0];
        let servantIdList = this.param.data[1];
        let bookCfg = GameConfig.config.abilityCfg[bookId];
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        
        // this.addTouchTap(this.clickHandler,this)

        let bottomBg = BaseBitmap.create("public_9_wordbg");
        bottomBg.height = GameConfig.stageHeigth - 200;
        bottomBg.y = GameConfig.stageHeigth - bottomBg.height-2;
        this._nodeContainer.addChild(bottomBg);

        let closeBtn  = ComponentManager.getButton("commonview_closebtn1","",this.hide,this);
		closeBtn.x = this.viewBg.width - closeBtn.width ;
        closeBtn.y = bottomBg.y - closeBtn.height/2 - 25;
        this._nodeContainer.addChild(closeBtn);
        // let closeBtn = 
        let titleFlag = BaseBitmap.create("studyatk_servant_title");
        titleFlag.x = bottomBg.x + bottomBg.width/2 - titleFlag.width/2;
        titleFlag.y =  bottomBg.y-titleFlag.height/2 - 15;
        this._nodeContainer.addChild(titleFlag);
        
        // studyatk_booklv
        // let upgradeClip = ComponentManager.getCustomMovieClip("studyatk_booklv",13,100);
		// upgradeClip.anchorOffsetX = 180;
        // upgradeClip.anchorOffsetY = 90;
        // upgradeClip.setScale(1.2);
		// upgradeClip.x = bottomBg.x + bottomBg.width/2 ;
		// upgradeClip.y = bottomBg.y;
		// this._nodeContainer.addChild(upgradeClip);
		// upgradeClip.playWithTime(1);

        let tipTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WHITE);
        tipTxt.text = LanguageManager.getlocal("studyatkBook_upgradeTip2" ,[String(Object.keys(servantIdList).length)]);
        tipTxt.x = bottomBg.x + bottomBg.width/2 - tipTxt.width/2;
        tipTxt.y = bottomBg.y + 45;
        this._nodeContainer.addChild(tipTxt);

        let scrollH = bottomBg.height - 100;
        let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,scrollH);
        let tmpNode = new BaseDisplayObjectContainer();
        let StartY = 20;
        let StartX= -10;

        let index = 0;
        //wifeview_wenzibg2
        for (var servantId in servantIdList) {
            let sbg = BaseBitmap.create("studyatk_servant_bg");
            sbg.y = StartY;
            sbg.width = 368;
            sbg.height = 368;
            if(index%2 == 0)
            {
                sbg.x = StartX;
            }else{
                sbg.x = GameConfig.stageWidth - StartX - sbg.width;
                StartY += 340;
            }
            tmpNode.addChild(sbg);

            let circleImg =  BaseBitmap.create("studyatk_booklv_circle"); 
            circleImg.anchorOffsetX = circleImg.width/2;
            circleImg.anchorOffsetY = circleImg.height/2;
            // circleImg.setScale(0.5);
            circleImg.x = sbg.x + sbg.width/2;
            circleImg.y = sbg.y + sbg.height/2;
            
            
            let light1 =  BaseBitmap.create("studyatk_booklv_light1"); 
            light1.anchorOffsetX = light1.width/2;
            light1.anchorOffsetY = light1.height/2;
            light1.x = sbg.x + sbg.width/2;
            light1.y = sbg.y + sbg.height/2;
            light1.setScale(2.18);
            tmpNode.addChild(light1);

            let light2 =  BaseBitmap.create("studyatk_booklv_light2"); 
            light2.anchorOffsetX = light2.width/2;
            light2.anchorOffsetY = light2.height/2;
            light2.x = light1.x;
            light2.y = light1.y;
            light2.setScale(light1.scaleX);
            tmpNode.addChild(light2);

            tmpNode.addChild(circleImg);

            egret.Tween.get(circleImg,{loop:true}).to({scaleX:1.25,scaleY:1.25},1000).to({scaleX:2.0,scaleY:2.0,alpha:0},1000).set({scaleX:0.5,scaleY:0.5,alpha:1});
            egret.Tween.get(light1,{loop:true}).to({rotation:360},15000);
            egret.Tween.get(light2,{loop:true}).to({rotation:-360},15000);

            let fulImg = Api.servantVoApi.getFullImgPathWithId(servantId);
            let simg = BaseLoadBitmap.create(fulImg);
            let mask = egret.Rectangle.create();
            simg.width = 640;
            simg.height = 482;
            mask.setTo(0,0,640,400);
            // simg.width = 368;
            // simg.height = 424;
            // mask.setTo(0,0,368,368);

            simg.mask = mask; 
            simg.anchorOffsetX = simg.width/2;
            simg.anchorOffsetY = simg.height/2;
            simg.setScale(0.7);
            simg.x = sbg.x + sbg.width/2 ;
            simg.y = sbg.y + sbg.height/2-10;
            tmpNode.addChild(simg);

            let bookBg = BaseBitmap.create("wifeview_wenzibg2");
            // bookBg.scaleY = 1.5;
            bookBg.height = 60;
            bookBg.x = sbg.x + sbg.width/2 - bookBg.width/2;
            bookBg.y = sbg.y + sbg.height-95;
            tmpNode.addChild(bookBg);
             
            let bookNameTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_GREEN2);
            bookNameTxt.text = LanguageManager.getlocal("servant_attrNameTxt"+bookId ) + "+1"  ;
            bookNameTxt.x = bookBg.x + bookBg.width/2 - bookNameTxt.width/2;
            bookNameTxt.y = bookBg.y + 5;
            tmpNode.addChild(bookNameTxt);

            let attrV = servantIdList[servantId];
            let addAttrTxt = ComponentManager.getTextField("",bookNameTxt.size,bookNameTxt.textColor);
            addAttrTxt.text = LanguageManager.getlocal("servantInfo_speciality"+bookCfg.type ) + "+" +attrV ;
            addAttrTxt.x = bookBg.x + bookBg.width/2 - addAttrTxt.width/2;
            addAttrTxt.y = bookNameTxt.y +  bookNameTxt.height +2;
            tmpNode.addChild(addAttrTxt);
            index ++;
        }

        let scrollView = ComponentManager.getScrollView(tmpNode,rect);
        scrollView.y = bottomBg.y + 80;
        scrollView.bounces = false;
        scrollView.horizontalScrollPolicy = "off"; 
        // scrollView.touchEnabled = false;
        this._nodeContainer.addChild(scrollView);
    }

    protected clickHandler()
    {
        super.hide()
    }
    protected getTitleStr():string
	{
		return null;
	}
    // protected getCloseBtnName():string
	// {
	// 	return "commonview_closebtn1";
	// }
     protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "studyatk_servant_bg","wifeview_wenzibg2","popupview_closebtn1","studyatk_servant_title",
            "studyatk_booklv_circle","studyatk_booklv_light1","studyatk_booklv_light2"
        ]);
	}

	public dispose():void
	{
		this._nodeContainer = null;
		super.dispose();
	}
}
