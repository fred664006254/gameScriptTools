/**
 * 群雄跨服 门客数量 buff
 * author shaolaing
 * date 2020/6/18
 * @class NewAtkracecrossBuffView
 */

class NewAtkracecrossBuffView  extends PopupView
{
    public constructor() {
		super();
	}

     protected getBgName():string
    {
         return "newcrossatkrace_buffbg";   
    }

    protected getResourceList():string[]
	{
		let resArr:string[]=["newcrossatkrace_buffbg","newcrossatkrace_bufftitle","commonview_smalltitlebg"];
		
		return super.getResourceList().concat(resArr);
	}

    protected getTitleStr():string
	{
        return null;
    } 

    private get vo():AcNewCrossServerAtkRaceVo
	{
		let crossVo = <AcNewCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace",this.param.data.code);
		return crossVo;
	}


    public initView():void
    {   

        let titlepic = BaseBitmap.create("newcrossatkrace_bufftitle");
        titlepic.setPosition(this.viewBg.width/2-titlepic.width/2,-17);
        this.addChildToContainer(titlepic);

        let desc = ComponentManager.getTextField(LanguageManager.getlocal(`newatkracecrossBuff_desc`),20,TextFieldConst.COLOR_BROWN);
		desc.lineSpacing = 4;
        desc.width = 400;
        desc.textAlign = egret.HorizontalAlign.CENTER;
        desc.setPosition(this.viewBg.width/2-desc.width/2,80);
        this.addChildToContainer(desc);

        let numbg = BaseBitmap.create("commonview_smalltitlebg");
        numbg.width = 360;
        numbg.setPosition(this.viewBg.width/2-numbg.width/2,desc.y+desc.height+16);
        this.addChildToContainer(numbg);


        let servantNum = Api.servantVoApi.getServantCount();
        let lv60plus:number = Api.servantVoApi.getServantCountLevel60Plus();
        let numstr = LanguageManager.getlocal("newatkracecrossBuff_servantNum",[String(servantNum)]);
        let numtext = ComponentManager.getTextField(numstr,20,TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,numtext,numbg);
        this.addChildToContainer(numtext);

        let v1 = Api.servantVoApi.getServantCount()-30;
        let values = this.vo.cfg.getBaseBuff();
        let v2 = Math.floor(values[0]* 100+0.5);
        let v3 = Math.floor(values[1]* 100+0.5);
        let v4 = 0.1 * 100;

        let value1 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecrossBuff1",[String(v1)]),20,TextFieldConst.COLOR_BROWN3);
        value1.setPosition(this.viewBg.width/2-value1.width/2,numtext.y+45);
        this.addChildToContainer(value1);

        let value2 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecrossBuff2",[String(v2)]),20,TextFieldConst.COLOR_BROWN3);
        value2.setPosition(this.viewBg.width/2-value2.width/2,value1.y+35);
        this.addChildToContainer(value2);

        let value3 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecrossBuff3",[String(v3)]),20,TextFieldConst.COLOR_BROWN3);
        value3.setPosition(this.viewBg.width/2-value3.width/2,value2.y+35);
        this.addChildToContainer(value3);

        //  let value4 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecrossBuff4",[String(v4)]),20,TextFieldConst.COLOR_BROWN3);
        // value4.setPosition(this.viewBg.width/2-value4.width/2,value3.y+35);
        // this.addChildToContainer(value4);

        let sureBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW,"activityPopSureTip",this.hide,this);
        sureBtn.setPosition(GameConfig.stageWidth/2 - sureBtn.width/2, GameConfig.stageHeigth/2+200);
        this.addChild(sureBtn);
    }
}