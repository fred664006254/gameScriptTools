/**
 * 门客资质升级
 * author yanyuling
 * date 2017/11/18
 * @class ServantInfoAmuletLvPopupView
 */

class ServantInfoAmuletLvPopupView  extends PopupView
{
    
	private _nodeContainer:BaseDisplayObjectContainer;
    private _amuletId:string;
	public constructor() {
		super();
	}

	public initView():void
	{
        this._amuletId = this.param.data.amuId;
        let amuBasecfg = Config.AmuletaruaCfg.getAmuletAuraItemById( this._amuletId);

        this._nodeContainer = new BaseDisplayObjectContainer();
		this.addChildToContainer(this._nodeContainer);

		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 550;
		bg.height = 650;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this._nodeContainer.addChild(bg); 
        
		let bg2:BaseBitmap = BaseBitmap.create("public_tc_bg03");
		bg2.width = bg.width - 20;
		bg2.height = bg.height - 20;
		bg2.x = this.viewBg.x + this.viewBg.width/2 - bg2.width/2;
		bg2.y = bg.y + 10;
		this._nodeContainer.addChild(bg2);  

           //标头
        let titleBg = BaseBitmap.create("rank_biao");
        titleBg.width = bg2.width - 20;
        titleBg.x = this.viewBg.width/2 - titleBg.width/2;
        titleBg.y = bg2.y + 10;
		this._nodeContainer.addChild(titleBg);


        let lvTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        lvTxt.text = LanguageManager.getlocal("servant_amulet_popTxt1");
        lvTxt.x = titleBg.x + 50 ;
        lvTxt.y = titleBg.y + titleBg.height/2 - lvTxt.height/2 +3;
        this._nodeContainer.addChild(lvTxt);

        let effectTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        effectTxt.text = LanguageManager.getlocal("servant_amulet_popTxt2");
        effectTxt.x = titleBg.x + 200 ;
        effectTxt.y = lvTxt.y ;
        this._nodeContainer.addChild(effectTxt);


        let addvalueTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW)
        addvalueTxt.text = LanguageManager.getlocal("servant_amulet_popTxt3");
        addvalueTxt.x = titleBg.x + 350 ;
        addvalueTxt.y = lvTxt.y ;
        this._nodeContainer.addChild(addvalueTxt);
        
       	let amucfg = Config.AmuletCfg.getAmucfgIndex( this._amuletId);
		
		let attStr = "";
		let amuletEffect = amucfg.amuletEffect;
		if(amuletEffect.att.length == 4){
			attStr = LanguageManager.getlocal("wifeSkillAllAttAdd");
		}else{
			for (var index1 = 0; index1 < amuletEffect.att.length; index1++) {
				var element = amuletEffect.att[index1];
				if(index1 == 0){
					attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
				}else{
					attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
				}
			}
			attStr = attStr + LanguageManager.getlocal("wifeSkillAttAdd");
		}

        let scrollNode = new BaseDisplayObjectContainer();
        let attrLvList = amuBasecfg.attrLvList ;
        let startY = 10;
        for (var index = 0; index < attrLvList.length; index++) {
             if(index % 2 == 0){
                let inbg = BaseBitmap.create("public_tc_bg05");
                inbg.width = 510;
                inbg.height = 40;
                inbg.x = bg2.width/2 - inbg.width/2;;
                inbg.y = startY ;
                scrollNode.addChild(inbg);
            }
            
            let txt1 = ComponentManager.getTextField( ""+(index + 1),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
            txt1.x = 80 - txt1.width/2;
            txt1.y = startY + 23 - txt1.height/2;
            scrollNode.addChild(txt1);

            let txt2 = ComponentManager.getTextField( ""+(index + 1),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
            txt2.text = attStr + "<font color= 0x13851e>" +(attrLvList[index].attEffect * 100).toFixed(1) + "%" +"</font>";
            txt2.x = 240 - txt2.width/2;
            txt2.y = txt1.y;
            scrollNode.addChild(txt2);

            let txt3 = ComponentManager.getTextField( ""+(index + 1),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN_NEW)
            txt3.text = attrLvList[index].update;
            txt3.x = 410 - txt3.width/2;
            txt3.y =  txt1.y;
            scrollNode.addChild(txt3);
            startY += 40;
        }
        scrollNode.height = startY;
        let rect = new egret.Rectangle(0,0,bg2.width,bg2.height - 80);
        let scrollview = ComponentManager.getScrollView(scrollNode,rect);
        scrollview.horizontalScrollPolicy = "off";
        scrollview.x = bg2.x;
        scrollview.y = titleBg.y + titleBg.height + 10;
        this._nodeContainer.addChild(scrollview);
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rank_biao",
        ]);
	}

    public dispose()
    {
        this._nodeContainer = null;
        this._amuletId = null;

        super.dispose();
    }
}