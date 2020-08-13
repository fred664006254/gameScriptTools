/**
 * 出站阵容
 * date 2020.7.6
 * author ycg
 * @class SixSection1BattleFormationView
 */
class SixSection1BattleFormationView extends CommonView{
    private _chooseNum:BaseTextField = null;

    public constructor(){
        super();
    }

    protected getTitlePic():string
	{	
		return "newcrossatkrace_servanttitle";
	}

    protected getRuleInfo():string
	{
		return "sixSection1BattleFormationRuleInfo";
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		"newcrossatkrace_check","newcrossatkrace_gone","dailytask_topbg","commonview_bigframe",
		"arena_bottom_bg","servant_namebg","mainlanddetailtitlebg2-1"

		]);
	}

    public initView():void{
        let topBg = BaseBitmap.create("dailytask_topbg");
		topBg.y = -50;
		this.addChildToContainer(topBg);

		let desc = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleFormationDesc", [""+Api.sixsection1VoApi.getServantLimit()]), 20,TextFieldConst.COLOR_WHITE);
		desc.width = 600;
		desc.lineSpacing = 4;
		desc.setPosition(20,0);
		this.addChildToContainer(desc);
        
		let frame = BaseBitmap.create("commonview_bigframe");
		frame.width = GameConfig.stageWidth;
		frame.height = GameConfig.stageHeigth-130;
		frame.y = 120;
        this.addChildToContainer(frame);

        let addValues = Api.sixsection1VoApi.getBaseBuff();
		let value1 = Math.floor(addValues[0]* 1000+0.5)/10;
		let atkInfo = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleFormationAdd1", [""+value1]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this.addChildToContainer(atkInfo);
		atkInfo.setPosition(GameConfig.stageWidth/2 - 40 - atkInfo.width, frame.y - atkInfo.height - 15);

		let value2 = Math.floor(addValues[1]* 1000+0.5)/10;
		let criInfo = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleFormationAdd2", [""+value2]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		this.addChildToContainer(criInfo);
		criInfo.setPosition(GameConfig.stageWidth/2 + 40, atkInfo.y);

		let addBuffBtn = ComponentManager.getButton("sixsection1_addbuffdetailbtn", "", this.addBuffBtnClick, this);
		this.addChildToContainer(addBuffBtn);
		// addBuffBtn.setScale(0.8);
		addBuffBtn.setPosition(criInfo.x + criInfo.width + 7, criInfo.y + criInfo.height/2 - addBuffBtn.height * addBuffBtn.scaleY/2);

		// info.setPosition(GameConfig.stageWidth/2 - (addBuffBtn.width * addBuffBtn.scaleX + info.width)/2, desc.y + desc.height + 20 + i * (addBuffBtn.height * addBuffBtn.scaleY + 5))
		// addBuffBtn.setPosition(info.x + info.width, info.y + info.height/2 - addBuffBtn.height * addBuffBtn.scaleY/2);
        
        
        // let addBuffBtn = ComponentManager.getButton("sixsection1_addbuffdetailbtn", "", this.addBuffBtnClick, this);
        // addBuffBtn.setPosition(GameConfig.stageWidth/2 - addBuffBtn.width/2, frame.y - addBuffBtn.height - 10);
        // this.addChildToContainer(addBuffBtn);

		let choosebg = BaseBitmap.create("mainlanddetailtitlebg2-1");
		choosebg.width = 306;
		choosebg.setPosition(GameConfig.stageWidth/2-choosebg.width/2, 130 + 10);
		this.addChildToContainer(choosebg);

		let line1 = BaseBitmap.create("public_line3");
		line1.width = 600;
		line1.x = GameConfig.stageWidth/2 - line1.width/2;
		line1.y = choosebg.y+choosebg.height/2 -line1.height/2;
		this.addChildToContainer(line1);

		// let useServant = Api.sixsection1VoApi.getUseServant();
        // let useNum = Object.keys(useServant).length;
		let choosenum = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1BattleFormationServantnum",[ ""+Api.sixsection1VoApi.getServantLimit()]), 22,TextFieldConst.COLOR_LIGHT_YELLOW);
		choosenum.width = choosebg.width;
		choosenum.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,choosenum,choosebg);
		this.addChildToContainer(choosenum);
		this._chooseNum = choosenum;

		let rect:egret.Rectangle = egret.Rectangle.create();
        rect.setTo(0,0,GameConfig.stageWidth - 55,(GameConfig.stageHeigth - 416));
        
        let sids = Api.sixsection1VoApi.getSortServantList();
        let scrollList = ComponentManager.getScrollList(SixSection1BattleFormationScrollItem, sids, rect);
        scrollList.x = 27;
        scrollList.y = choosebg.y+choosebg.height+10;
		this.addChildToContainer(scrollList);

		let downbg = BaseBitmap.create("arena_bottom_bg");
		downbg.height = 140;
		downbg.y = GameConfig.stageHeigth-downbg.height;
		this.addChild(downbg);

		let dispathBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"sysConfirm",this.enterRackHandler,this,null,0,null, TextFieldConst.COLOR_BLACK);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,dispathBtn,downbg);
		this.addChild(dispathBtn);
    }	

    private addBuffBtnClick():void{
        ViewController.getInstance().openView(ViewConst.COMMON.SIXSECTION1BATTLEADDVIEW);
    }

	private enterRackHandler():void
	{
		this.hide();
	}

    public dispose():void{

        super.dispose();
    }
}