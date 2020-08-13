/**
* 侦查敌情
* date 2020.
* author ycg
* @name SixSection1LookEnemyView
*/
class SixSection1LookEnemyView extends CommonView{

    public constructor() {
        super();
    }

    protected getBgName():string{
        return "";
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return "";
    }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return ""
    }

    protected getProbablyInfo():string{
        return ""
    }

    protected getCloseBtnName():string
	{	
		if (this.uiType == "2")
		{
			return ButtonConst.POPUP_CLOSE_BTN_2;
		}
		return ButtonConst.POPUP_CLOSE_BTN_1;
	}

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            
        ).concat(list);
    }

    public initView():void{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        let data = this.param.data.data;
        let bg = BaseBitmap.create("sixsection1_looksuccessbg");
        bg.setPosition(GameConfig.stageWidth/2 - bg.width/2, GameConfig.stageHeigth/2 - bg.height/2);
        this.addChildToContainer(bg);

        let successTxt = BaseBitmap.create("sixsection1_looksuccesstxt");
        successTxt.x = GameConfig.stageWidth/2 - successTxt.width/2;
        successTxt.y = bg.y - 20;
        this.addChildToContainer(successTxt);

        this.closeBtn.setPosition(bg.x + bg.width - 60, bg.y);
        let hudieClip = ComponentManager.getCustomMovieClip("popupviewhudie",10);
        hudieClip.x = this.closeBtn.x-45;
        hudieClip.y = this.closeBtn.y-45;
        hudieClip.blendMode = egret.BlendMode.ADD;
        this.addChildToContainer(hudieClip);
        hudieClip.playWithTime();
        
        //title
        let title = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTitle"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        title.setPosition(successTxt.x + successTxt.width/2 - title.width/2, successTxt.y + successTxt.height + 15);
        this.addChildToContainer(title);

        //门客
        let servantList = data.sids;
        let scale = 0.5;
        for (let i=0; i < 5; i++){
            let cardBgImg = "servant_cardbg_0";
            let iconImg = null;
            let cfg = null;
            if (servantList[i]){
                cfg = Config.ServantCfg.getServantItemById(servantList[i]);
                cardBgImg = "servant_cardbg_"+data.clvs[i];
                iconImg = cfg.halfIcon;
                if (data.equips && data.equips[i]){
                    let skinCfg = Config.ServantskinCfg.getServantSkinItemById(data.equips[i]);
                    iconImg = skinCfg.icon;
                } 
            }
            let iconBgBt: BaseBitmap = BaseLoadBitmap.create(cardBgImg);
            iconBgBt.width = 194;
            iconBgBt.height = 192;
            iconBgBt.setScale(scale);
            iconBgBt.setPosition(bg.x + 50 + i * (iconBgBt.width * scale + 5), title.y + title.height + 20);
            this.addChildToContainer(iconBgBt);
            if (iconImg){
                let iconBt: BaseBitmap = BaseLoadBitmap.create(iconImg);
                iconBt.width = 180;
                iconBt.height = 177;
                iconBt.setScale(scale);
                iconBt.setPosition(iconBgBt.x + iconBgBt.width / 2 * scale - iconBt.width / 2 * scale, iconBgBt.y + iconBgBt.height / 2 * scale - iconBt.height / 2 * scale);
                this.addChildToContainer(iconBt);
            }
        }

        //总资质
        // let talent = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTalent", [""+data.totAbility]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // talent.setPosition(bg.x + 150, bg.y + 260);
        // this.addChildToContainer(talent);

        // //总属性
        // let totalAttr = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldSeatLookEnemyTotalAttr", [""+data.totAttr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        // totalAttr.setPosition(bg.x + bg.width/2 + 50, talent.y);
        // this.addChildToContainer(totalAttr);

        //确定
        let enterBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW , "confirmBtn", this.hide, this);
        enterBtn.setPosition(GameConfig.stageWidth/2 - enterBtn.width/2, bg.y + bg.height - 8);
        this.addChildToContainer(enterBtn);
    }

    public dispose():void{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        super.dispose();
    }
}