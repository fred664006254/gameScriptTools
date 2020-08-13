/**
 * 称号 等级详情
 * author zsl
 * date 2018/08/24
 * @class SkinRankPopupView
 */

class TitleLevelDetailPopupView  extends PopupView
{   
    private _myContiner:BaseDisplayObjectContainer = null;
    private _lv:number = 1;
    private _titleInfo : TitleInfoVo = null;

    public constructor() {
		super();
	}

    public initView():void
    {
        let titleInfo:TitleInfoVo = this.param.data.info;
        this._lv = titleInfo.lv;
        this._titleInfo = titleInfo;

        let headBg : BaseLoadBitmap = BaseLoadBitmap.create("skin_head_bg");
        headBg.x = this.viewBg.width/2 - 69;
        headBg.y = 10;
		this.addChildToContainer(headBg);

        let playerHead:BaseDisplayObjectContainer | BaseBitmap;
        let nameBg : BaseBitmap = BaseBitmap.create("public_9_downbg");
        if (titleInfo.type == 4 && titleInfo.isTitle == 4)
        {
            playerHead  = BaseLoadBitmap.create(titleInfo.icon);
            playerHead.x = this.viewBg.width/2 - 50;
            playerHead.y = 30;
            this.addChildToContainer(playerHead);
             nameBg.y = playerHead.y + 112;
        }
        else if(titleInfo.isTitle == 5)
        {
            playerHead = Api.playerVoApi.getPlayerCircleHead(titleInfo.id);
            playerHead.x = this.viewBg.width/2 - playerHead.width/2;
            playerHead.y = 30;
            this.addChildToContainer(playerHead);
            nameBg.y = playerHead.y + playerHead.height + 12;
        }
        else if(titleInfo.isTitle == 6){
            playerHead = BaseLoadBitmap.create(titleInfo.icon);
            playerHead.x = this.viewBg.width/2 - 50;
            playerHead.y = 30;
            this.addChildToContainer(playerHead);
            nameBg.y = playerHead.y + 112;
        }
        else
        {   
            let lv = this._lv;
            if (Api.switchVoApi.checkOpenChangeTitle()){
                let cfg = Config.TitleCfg.getTitleCfgById(titleInfo.id);
				if (cfg.isTitle == 2){
					let pTitle = Api.playerVoApi.getPlayerPtitle();
					if (pTitle.ptitle && pTitle.ptitle == String(titleInfo.id)){
						lv = pTitle.plv;
					}
				}
				else if (cfg.isTitle == 1 || cfg.isTitle == 4){
					let titleData = Api.playerVoApi.getTitleInfo();
					if (titleData.title && titleData.title == String(titleInfo.id)){
						lv = titleData.tlv;
					}
				}
			}
            playerHead = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),{ptitle:titleInfo.id, plv:lv});
            playerHead.x = this.viewBg.width/2 - playerHead.width/2;
            playerHead.y = 30;
            this.addChildToContainer(playerHead);
            nameBg.y = playerHead.y + playerHead.height + 12;
        }
       

        
       
		this.addChildToContainer(nameBg);

        let nameText:BaseTextField = ComponentManager.getTextField(titleInfo.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_QUALITY_GRAY);
		nameText.setPosition(this.viewBg.width/2 - nameText.width/2,nameBg.y+12);
        this.addChildToContainer(nameText);

        nameBg.x = nameText.x - 20;
        nameBg.width = nameText.width + 40;
        nameBg.height = nameText.height + 24;

        let typeBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		typeBg.width = 528;
		typeBg.height = 370;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, nameBg.y + nameBg.height + 12);
		this.addChildToContainer(typeBg);

        let itemTopBg:BaseBitmap = BaseBitmap.create("public_9_bg37");
		itemTopBg.width = typeBg.width;
		itemTopBg.height = 35;
		itemTopBg.setPosition(typeBg.x,typeBg.y);
		this.addChildToContainer(itemTopBg);

        let curLvText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("skincurLv"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		curLvText.setPosition(40+typeBg.x, typeBg.y+ 8);
		this.addChildToContainer(curLvText);

        let nextLvText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("skinnextLv"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		nextLvText.setPosition(typeBg.x+typeBg.width - nextLvText.width - 34, curLvText.y);
		this.addChildToContainer(nextLvText);

        let descText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("skinLvupTiptxt2"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		descText.width = 480;
        descText.lineSpacing = 6;
        descText.setPosition(this.viewBg.width/2-descText.width/2, typeBg.y+ typeBg.height + 20);
		this.addChildToContainer(descText);

        let gotItBtn:BaseButton = ComponentManager.getButton( ButtonConst.BTN_BIG_YELLOW, "skinLvupOkBtn", this.hide, this);
        gotItBtn.setPosition(this.viewBg.width/2-gotItBtn.width/2, descText.y + 20 + descText.height);
        this.addChildToContainer(gotItBtn);

        let rect2:egret.Rectangle = egret.Rectangle.create();
		rect2.setTo(0,0,528,330);
		this._myContiner = new BaseDisplayObjectContainer();
		let scrollView:ScrollView = ComponentManager.getScrollView(this._myContiner,rect2);
		scrollView.setPosition(typeBg.x, typeBg.y+40);
		this.addChildToContainer(scrollView);

        this.setScrollItem(1);

        if (titleInfo.effect1)
        {
            for (let i:number = 2; i<=5; i++)
            {
                this.setScrollItem(i,1,titleInfo.lvUpEffect1,titleInfo.effect1);
            }
        }
        if (titleInfo.effect2)
        {
            for (let i:number = 2; i<=5; i++)
            {
                this.setScrollItem(i,2,titleInfo.lvUpEffect2,titleInfo.effect2);
            }
        }
        if (titleInfo.atkEffect)
        {
            for (let i:number = 8; i<=8; i++)
            {
                this.setScrollItem(i,2,titleInfo.atkEffect,titleInfo.atkEffect);
            }
        }

        //头像框等级切换
        if (Api.switchVoApi.checkOpenChangeTitle() && titleInfo.type == 4 && (titleInfo.isTitle == 2 || titleInfo.isTitle == 1 || titleInfo.isTitle == 4)){
            let titleCfg = Config.TitleCfg.getTitleCfgById(titleInfo.id);
            if (titleCfg && titleCfg.isChangePic()){
                let changeBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_BLUE, "titleChangeBtnName", this.changeTitleBtnClick, this, [{id:titleInfo.id}])
                this.addChildToContainer(changeBtn);
                changeBtn.setPosition(this.viewBg.width / 4 - changeBtn.width / 2, gotItBtn.y);
                gotItBtn.x = this.viewBg.width * 3 / 4 - gotItBtn.width / 2;
            }
        }
    }

    private setScrollItem(index:number,type?:number,value?:number,valueO?:number):void
    {
        let scrollContiner:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        scrollContiner.y = this._myContiner.height;
        this._myContiner.addChild(scrollContiner);

        let containerBg:BaseBitmap=BaseBitmap.create("public_alphabg");
        containerBg.width=528;
        containerBg.height = 50;
        scrollContiner.addChild(containerBg);

        let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("skinLvuptxt"+index),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GRAY);
		nameText.setPosition(40, 18);
		scrollContiner.addChild(nameText);

        let value1:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL);
		value1.setPosition(188, nameText.y);
		scrollContiner.addChild(value1);

        let value2:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_GREEN);
		value2.setPosition(415, nameText.y);
		scrollContiner.addChild(value2);

        let arrow:BaseLoadBitmap = BaseLoadBitmap.create("servant_arrow");
        arrow.setPosition(322,18);
        scrollContiner.addChild(arrow);

        if (index == 1)
        {
            value1.text = String(this._lv);
            value2.text = String(this._lv+1);

            value1.x = 220;
            value2.x = 445;
            if(this._titleInfo.lvLimit){
                if(this._lv >= this._titleInfo.lvLimit){
                    value2.text = LanguageManager.getlocal('skinnextMax');
                    value2.x = 390;
                }
            }
        }
        else
        {   
            let line:BaseBitmap = BaseBitmap.create("public_line1");
            line.setPosition(containerBg.width/2-line.width/2,0);
            scrollContiner.addChild(line);
            if (type == 1)
            {
                value1.text = "+"+(value*(this._lv-1)+valueO);
                value2.text = "+"+(value*this._lv+valueO);
                if(this._titleInfo.lvLimit){
                    if(this._lv >= this._titleInfo.lvLimit){
                        value2.text = LanguageManager.getlocal('skinnextMax');
                        value2.x = 390;
                    }
                }
            }
            else 
            {
                value1.text = "+"+Math.round((value*(this._lv-1)+valueO)*100)+"%";
                value2.text = "+"+Math.round((value*this._lv+valueO)*100)+"%";
                if(this._titleInfo.lvLimit){
                    if(this._lv >= this._titleInfo.lvLimit){
                        value2.text = LanguageManager.getlocal('skinnextMax');
                        value2.x = 390;
                    }
                }
            }
        }
    }

    //头像切换
    private changeTitleBtnClick(data:any){
        App.LogUtil.log("changeTitleBtnClick data.id: "+data.id);
        ViewController.getInstance().openView(ViewConst.POPUP.TITLECHANGEPOPUPVIEW, {id: data.id});   
    }

    protected getBgExtraHeight():number
	{
		return 25;
	}

    protected getTitleStr():string
	{
		return "detail";
	}

    public dispose():void
	{	
        this._myContiner = null;

        super.dispose();
    }
}