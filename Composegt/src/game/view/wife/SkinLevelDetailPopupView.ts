/**
 * 称号 等级详情
 * author zsl
 * date 2018/08/24
 * @class SkinLevelDetailPopupView
 */

class SkinLevelDetailPopupView  extends PopupView
{   
    private _myContiner:BaseDisplayObjectContainer = null;
    private _lv:number = 1;
    private _skinId:string = null;
    private _wifeId:string = null;
    private _skinInfoVo: WifeskinInfoVo = null;
    private _skinCfg:Config.WifeSkinItemCfg = null;

    public constructor() {
		super();
	}

    public initView():void
    {
        // let titleInfo:TitleInfoVo = this.param.data.info;
        // this._lv = titleInfo.lv;
        // this._titleInfo = titleInfo;
        this._wifeId = this.param.data.wifeId;
        this._skinId = this.param.data.skinId;
        this._skinCfg = Config.WifeskinCfg.getWifeCfgById(this._skinId);
        this._skinInfoVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(this._wifeId);
        this._lv = 1;
        if(this._skinInfoVo){
            this._lv = this._skinInfoVo.getLvBySkinId(this._skinId);
        }
        
		// let bg = BaseBitmap.create("commonview_woodbg");
		// bg.width = 546;
		// bg.height = 220;
		// bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		// bg.y = -5;//this.tabbarGroup.y + 10;//55;
		// this.addChildToContainer(bg);

		// let outBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		// outBg.width = 538;
		// outBg.height = 650; //521 + 84 + 30;
		// outBg.setPosition(this.viewBg.width/2  - outBg.width/2, this.viewBg.y + 10);
		// this.addChildToContainer(outBg);

		// let innerBg= BaseBitmap.create("public_tc_bg03");
        // innerBg.width = outBg.width - 20;
        // innerBg.height = outBg.height - 20;
        // innerBg.x = outBg.x + outBg.width/2 - innerBg.width/2;
        // innerBg.y = outBg.y + 10;
        // this.addChildToContainer(innerBg);

        // let playerHead:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),titleInfo.id);
        // let playerHead:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId(),this._skinInfoVo.id);
		// playerHead.x = this.viewBg.width/2 - playerHead.width/2;
        // playerHead.y = 30;
		// this.addChildToContainer(playerHead);

		let tBg = BaseBitmap.create("popupview_bg3");
        tBg.height = 220;
		tBg.x = this.viewBg.width/2 - tBg.width/2;
		tBg.y = -5;
		this.addChildToContainer(tBg);


		// let iconBg:BaseBitmap = BaseBitmap.create("wifestatus_headbg");
        // // iconBg.setScale(1.2);
        // iconBg.x = this.viewBg.width/2 - iconBg.width * iconBg.scaleX/2;
        // iconBg.y = 10
		// // nameBg.width = this.width;
		// iconBg.name = "bg2";
		// this.addChildToContainer(iconBg);

		// let iconStr = ""
		// if(this._skinCfg)
		// {
		// 	iconStr = this._skinCfg.icon
		// }
		// else{
		// 	let cfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
		// 	iconStr = cfg.icon;
		// }
		// let icon = BaseLoadBitmap.create(iconStr);
		// icon.width=205;
		// icon.height=192;
        // icon.setScale(0.52);
        // icon.x = iconBg.x + iconBg.width/2 - icon.width * icon.scaleX/2;
        // icon.y = iconBg.y + iconBg.height/2 - icon.height * icon.scaleY/2;
		
        // let iconMask = BaseBitmap.create("wifeview_iconmask");
        // iconMask.setScale(iconBg.scaleX);
		// iconMask.x = iconBg.x;
		// iconMask.y = iconBg.y;
		// this.addChildToContainer(iconMask);
		// icon.mask = iconMask;


		// this.addChildToContainer(icon);
    
        let iconStr = ""
		if(this._skinCfg)
		{
			iconStr = this._skinCfg.icon
		}
		else{
			let cfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
			iconStr = cfg.icon;
		}


        let icon = this.getWifestatusIcon(iconStr,this._skinCfg.name);
        icon.x = this.viewBg.width/2 - icon.width/2; //innerBg.x + 80 - 50;
        icon.y = 5;
        this.addChildToContainer(icon);

        // let nameText:BaseTextField = ComponentManager.getTextField(this._skinCfg.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		// nameText.setPosition(this.viewBg.width/2 - nameText.width/2, iconBg.y + iconBg.height + 8);
        // this.addChildToContainer(nameText);

		// let titleBg:BaseBitmap = BaseBitmap.create("rank_biao");
		// titleBg.width = outBg.width - 50;
		// titleBg.x = this.viewBg.width/2 - titleBg.width/2;
		// titleBg.y = nameText.y + nameText.height + 8;
		// this.addChildToContainer(titleBg);

		let line = BaseBitmap.create("commonview_border3");
		line.width = tBg.width;
		line.x = tBg.x;
		
		this.addChildToContainer(line);

		let titleBg = BaseBitmap.create("popupview_bg4");
		titleBg.x = this.viewBg.width/2 - titleBg.width/2;
		titleBg.y = tBg.y + tBg.height - titleBg.height + 21;
		this.addChildToContainer(titleBg);

        line.y = titleBg.y;
  
        let curLvText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("skincurLv"),22,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		curLvText.setPosition(100+titleBg.x, titleBg.y+ 25);
		this.addChildToContainer(curLvText);

        let nextLvText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("skinnextLv"),22,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		nextLvText.setPosition(titleBg.x+titleBg.width - nextLvText.width - 80, curLvText.y);
		this.addChildToContainer(nextLvText);


        let topBottom = BaseBitmap.create("public_9v_bg12");
        topBottom.width = 530;
        topBottom.height = 366
        topBottom.x = this.viewBg.width/2 - topBottom.width/2;
        topBottom.y = titleBg.y + titleBg.height -9;
        this.addChildToContainer(topBottom);

        let rect2:egret.Rectangle = egret.Rectangle.create();
		rect2.setTo(0,0,528,345);
		this._myContiner = new BaseDisplayObjectContainer();
        this._myContiner.width = 528;
		let scrollView:ScrollView = ComponentManager.getScrollView(this._myContiner,rect2);
		scrollView.setPosition(this.viewBg.width/2 - scrollView.width/2, titleBg.y+titleBg.height);
		this.addChildToContainer(scrollView);

        let bottom = BaseBitmap.create("public_9v_bg12");
        bottom.width = 530;
        bottom.height = 152
        bottom.x = this.viewBg.width/2 - bottom.width/2;
        bottom.y = scrollView.y + scrollView.height + 15 ;
        this.addChildToContainer(bottom);

        let descText1:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("skinLvupTiptxt1"),18 ,TextFieldConst.COLOR_BROWN);
		descText1.width = 480;
        descText1.lineSpacing = 5;
        descText1.x = this.viewBg.width/2-descText1.width/2;
        descText1.y = bottom.y + 20;
		this.addChildToContainer(descText1);

        let descText2:BaseTextField = ComponentManager.getTextField("",18 ,TextFieldConst.COLOR_BROWN);
		descText2.width = 480;
        descText2.lineSpacing = 5;
        descText2.x = this.viewBg.width/2-descText2.width/2;
        descText2.y = descText1.y +descText1.height+ 5;
		this.addChildToContainer(descText2);  

        if(this._lv >= this._skinCfg.lvLimit){
            descText2.text = LanguageManager.getlocal("skinnextMax");
        } else {
            descText2.text = LanguageManager.getlocal("skinLvupTiptxt2",[this._skinCfg.wifeName,this._skinCfg.name]);
        }

      

        let gotItBtn:BaseButton = ComponentManager.getButton( ButtonConst.BTN_NORMAL_YELLOW, "skinLvupOkBtn", this.hide, this);
        gotItBtn.x = this.viewBg.width/2-gotItBtn.width/2;
        gotItBtn.y = descText2.y + 20 + descText2.height;
        this.addChildToContainer(gotItBtn);



        this.setScrollItem(1,1);
        let curIndex = 2;
        if ((this._skinCfg.atkAdd && this._skinCfg.atkAdd[0]==1) || (this._skinCfg.atkLvUpAdd && this._skinCfg.atkLvUpAdd[0]==1))
        {
            this.setScrollItem(curIndex,2,1,(this._skinCfg.atkLvUpAdd && this._skinCfg.atkLvUpAdd[0]==1)?this._skinCfg.atkLvUpAdd[1]:0,(this._skinCfg.atkAdd && this._skinCfg.atkAdd[0]==1)?this._skinCfg.atkAdd[1]:0);
            curIndex ++;
        }
        if ((this._skinCfg.inteAdd && this._skinCfg.inteAdd[0]==1)|| (this._skinCfg.inteLvUpAdd && this._skinCfg.inteLvUpAdd[0] == 1))
        {
            this.setScrollItem(curIndex,3,1,(this._skinCfg.inteLvUpAdd && this._skinCfg.inteLvUpAdd[0] == 1)?this._skinCfg.inteLvUpAdd[1]:0,(this._skinCfg.inteAdd && this._skinCfg.inteAdd[0]==1)?this._skinCfg.inteAdd[1]:0);
            curIndex ++;
        }
        if ((this._skinCfg.politicsAdd && this._skinCfg.politicsAdd[0]==1)|| (this._skinCfg.politicsLvUpAdd && this._skinCfg.politicsLvUpAdd[0] == 1))
        {
            this.setScrollItem(curIndex,4,1,(this._skinCfg.politicsLvUpAdd && this._skinCfg.politicsLvUpAdd[0] == 1)?this._skinCfg.politicsLvUpAdd[1]:0,(this._skinCfg.politicsAdd && this._skinCfg.politicsAdd[0]==1)?this._skinCfg.politicsAdd[1]:0);
            curIndex ++;
        }        
        if ((this._skinCfg.charmAdd && this._skinCfg.charmAdd[0]==1)|| (this._skinCfg.charmLvUpAdd && this._skinCfg.charmLvUpAdd[0] == 1))
        {
            this.setScrollItem(curIndex,5,1,(this._skinCfg.charmLvUpAdd && this._skinCfg.charmLvUpAdd[0] == 1)?this._skinCfg.charmLvUpAdd[1]:0,(this._skinCfg.charmAdd && this._skinCfg.charmAdd[0]==1)?this._skinCfg.charmAdd[1]:0);
            curIndex ++;
        }
               

        if ((this._skinCfg.atkAdd && this._skinCfg.atkAdd[0]==2) || (this._skinCfg.atkLvUpAdd && this._skinCfg.atkLvUpAdd[0]==2))
        {
            this.setScrollItem(curIndex,2,2,(this._skinCfg.atkLvUpAdd && this._skinCfg.atkLvUpAdd[0]==2)?this._skinCfg.atkLvUpAdd[1]:0,(this._skinCfg.atkAdd && this._skinCfg.atkAdd[0]==2)?this._skinCfg.atkAdd[1]:0);
            curIndex ++;
        }
        if ((this._skinCfg.inteAdd && this._skinCfg.inteAdd[0]==2)|| (this._skinCfg.inteLvUpAdd && this._skinCfg.inteLvUpAdd[0] == 2))
        {
            this.setScrollItem(curIndex,3,2,(this._skinCfg.inteLvUpAdd && this._skinCfg.inteLvUpAdd[0] == 2)?this._skinCfg.inteLvUpAdd[1]:0,(this._skinCfg.inteAdd && this._skinCfg.inteAdd[0]==2)?this._skinCfg.inteAdd[1]:0);
            curIndex ++;
        }
        if ((this._skinCfg.politicsAdd && this._skinCfg.politicsAdd[0]==2)|| (this._skinCfg.politicsLvUpAdd && this._skinCfg.politicsLvUpAdd[0] == 2))
        {
            this.setScrollItem(curIndex,4,2,(this._skinCfg.politicsLvUpAdd && this._skinCfg.politicsLvUpAdd[0] == 2)?this._skinCfg.politicsLvUpAdd[1]:0,(this._skinCfg.politicsAdd && this._skinCfg.politicsAdd[0]==2)?this._skinCfg.politicsAdd[1]:0);
            curIndex ++;
        }        
        if ((this._skinCfg.charmAdd && this._skinCfg.charmAdd[0]==2)|| (this._skinCfg.charmLvUpAdd && this._skinCfg.charmLvUpAdd[0] == 2))
        {
            this.setScrollItem(curIndex,5,2,(this._skinCfg.charmLvUpAdd && this._skinCfg.charmLvUpAdd[0] == 2)?this._skinCfg.charmLvUpAdd[1]:0,(this._skinCfg.charmAdd && this._skinCfg.charmAdd[0]==2)?this._skinCfg.charmAdd[1]:0);
            curIndex ++;
        }


        if (this._skinCfg.wifeIntimacy && this._skinCfg.wifeLvUpIntimacy )
        {
            this.setScrollItem(curIndex,6,1,this._skinCfg.wifeLvUpIntimacy,this._skinCfg.wifeIntimacy);
            curIndex ++;
        }
        if (this._skinCfg.wifeGlamour && this._skinCfg.wifeLvUpGlamour)
        {
            this.setScrollItem(curIndex,7,1,this._skinCfg.wifeLvUpGlamour,this._skinCfg.wifeGlamour);
            curIndex ++;
        }   


    }
	private getWifestatusIcon(iconStr:string,nameText:string):BaseDisplayObjectContainer
	{
		let iconContainer = new BaseDisplayObjectContainer();
		let iconBg:BaseBitmap = BaseBitmap.create("wifestatus_headbg");

		iconBg.name = "bg2";
		iconContainer.addChild(iconBg);

			
        // let iconStr = Api.wifeVoApi.getWifeIcon(wifeId);

		let icon = BaseLoadBitmap.create(iconStr);

		icon.setPosition(10,8)

			
        icon.setScale(0.52);

		
		iconContainer.cacheAsBitmap = true;
		
		iconContainer.addChild(icon);

		// iconContainer.addTouchTap(this.clickItemHandler,this,[wifeId]);

		let nameBg = BaseBitmap.create("wifestatus_namebg");
		nameBg.setPosition(iconContainer.width/2 - nameBg.width/2,105)
		iconContainer.addChild(nameBg);
		nameBg.visible = false;

		// let wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
		let nameTF = ComponentManager.getTextField(nameText,18,TextFieldConst.COLOR_WARN_YELLOW_NEW);
		nameTF.x = nameBg.x + nameBg.width/2 - nameTF.width/2 ;
		nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2 + 3;
		iconContainer.addChild(nameTF); 

		return iconContainer;
	}
    private setScrollItem(index:number,valueType:number,type?:number,value?:number,valueO?:number):void
    {
        let scrollContiner:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
        scrollContiner.width = 528;
        scrollContiner.y = this._myContiner.height;
        this._myContiner.addChild(scrollContiner);

        let containerBg:BaseBitmap=BaseBitmap.create("public_alphabg");
        containerBg.width=528;
        containerBg.height = 45;
        scrollContiner.addChild(containerBg);

        // if(index % 2 == 0){
        //     let bg = BaseBitmap.create("public_tc_bg05");

        //     bg.width = 510;
        //     bg.height = 40;
        //     bg.x = 0;
        //     scrollContiner.addChild(bg);
        // }

        if(index != 1){
            let bg = BaseBitmap.create("public_line4");
            bg.width = 510;
            bg.x = 528/2 - bg.width/2;
            bg.y = -5;
            scrollContiner.addChild(bg);

        }



        let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("skinLvuptxt"+valueType),20,TextFieldConst.COLOR_BROWN);
		nameText.setPosition(60, containerBg.height/ 2 - nameText.height/2);
		scrollContiner.addChild(nameText);

        let value1:BaseTextField = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
		value1.setPosition(180, nameText.y);
		scrollContiner.addChild(value1);

        let value2:BaseTextField = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_GREEN);
		value2.setPosition(350, nameText.y);
		scrollContiner.addChild(value2);


        if (index == 1)
        {
            nameText.visible = false;
            value1.text = LanguageManager.getlocal("skinLvuptxt"+valueType,[String(this._lv)]);
            value2.text = LanguageManager.getlocal("skinLvuptxt"+valueType,[String(this._lv+1)]);

            value1.x = nameText.x;
            
            if(this._skinCfg.lvLimit){
                if(this._lv >= this._skinCfg.lvLimit){
                    value2.text = LanguageManager.getlocal('skinnextMax');
                    value2.setColor(0x7e7e7e);
                    value2.x = 350;
                }
            }
        }
        else
        {   
            if (type == 1)
            {
                value1.text = "+"+(value*(this._lv-1)+valueO);
                value2.text = "+"+(value*this._lv+valueO);
                if(this._skinCfg.lvLimit){
                    if(this._lv >= this._skinCfg.lvLimit){
                        value2.text = LanguageManager.getlocal('skinnextMax');
                        value2.setColor(0x7e7e7e);
                        value2.x = 350;
                    }
                }
            }
            else 
            {
                value1.text = "+"+Math.round((value*(this._lv-1)+valueO)*100)+"%";
                value2.text = "+"+Math.round((value*this._lv+valueO)*100)+"%";
                if(this._skinCfg.lvLimit){
                    if(this._lv >= this._skinCfg.lvLimit){
                        value2.text = LanguageManager.getlocal('skinnextMax');
                        value2.setColor(0x7e7e7e);
                        value2.x = 350;
                    }
                }
            }
        }
    }

    protected getBgExtraHeight():number
	{
		return 25;
	}

    protected getTitleStr():string
	{
		return "detail";
	}
	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
           
            "wifeview_iconmask",
			"rank_biao",
			"commonview_woodbg",
			"popupview_bg4",
			"commonview_border3",
			"popupview_bg3",
            "wifestatus_headbg",
            "wifestatus_namebg"
        ]);
	}
    public dispose():void
	{	
        this._myContiner = null;
        this._lv = 1;
        this._skinId = null;
        this._wifeId = null;
        this._skinInfoVo = null;
        this._skinCfg = null;
        super.dispose();
    }
}