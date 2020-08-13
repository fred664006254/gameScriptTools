class GrowGoldScrollItem extends ScrollListItem{

	public constructor() {
		super();
	}

    protected initItem(index:number,data:Config.GrowgoldTaskItemCfg)
    {
        let bg = BaseBitmap.create("public_popupscrollitembg");
        bg.scaleX = 483/510;
        this.addChild(bg);

        let bottom2:BaseBitmap = BaseBitmap.create("shopview_itemtitle");  
        bottom2.x = bg.x;
		bottom2.y = 5;
		this.addChild(bottom2);  

        let taskstr = LanguageManager.getlocal("growGold_leve_needlv",[LanguageManager.getlocal("officialTitle"+data.needLv)]);
		let taskTxt = ComponentManager.getTextField(taskstr, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
		taskTxt.x = bottom2.x+10;
		taskTxt.y = bottom2.y+bottom2.height/2-taskTxt.height/2; 
		this.addChild(taskTxt); 
        bottom2.width = taskTxt.width+55;


        let str = data.getReward;
		let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(str,true);
        let line = Math.ceil((iconList.length-1)/4);

        let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = 453;
        rewardBg.height = 100;
		rewardBg.x = bg.x +15;
		rewardBg.y = 45;
		this.addChild(rewardBg);

        for (let i: number = 0; i < iconList.length; i++) {
            let icon: BaseDisplayObjectContainer = iconList[i]; 
            icon.setScale(0.73);
            icon.setPosition(25 + i * (icon.width*icon.scaleX + 9), rewardBg.y+8+ Math.floor(i/5)*79);
            this.addChild(icon); 
        }

        let nameBg:BaseBitmap = BaseBitmap.create("public_titlebg");
		nameBg.width = 240;
		nameBg.x = 5;
		nameBg.y = rewardBg.y+rewardBg.height+16;
		this.addChild(nameBg);

        bg.height = nameBg.y + 53;

        let needstr = LanguageManager.getlocal("growGold_leve_need",[Api.playerVoApi.getPlayerOffice(),LanguageManager.getlocal("officialTitle"+data.needLv)]);
		let nameTF = ComponentManager.getTextField(needstr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameTF.x = nameBg.x + 15;
		nameTF.y = nameBg.y + nameBg.height/2 - nameTF.height/2+1;
		this.addChild(nameTF);

        nameBg.width = nameTF.width+55;

        if (Api.shopVoApi.ifBuyGrowGold())
        {   
            if (Api.shopVoApi.isGotGrowGoldReward(data.id))
            {
                let collectFlag = BaseBitmap.create("collectflag")
                collectFlag.setScale(0.7);
                collectFlag.setPosition(345 ,rewardBg.y+rewardBg.height-20);
                this.addChild(collectFlag);
            }
            else
            {
                let btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"taskCollect",()=>{

                    NetManager.request(NetRequestConst.REQUEST_SHOP_GETGROWGOLD,{rkey:data.id});
                },this);
                btn.setPosition(322 ,rewardBg.y+rewardBg.height+7);
                this.addChild(btn);

                if ( Api.playerVoApi.getPlayerLevel() < data.needLv )
                {
                    btn.setEnable(false);
                }
            }
        }
        else
        {
            let needstr = LanguageManager.getlocal("growGold_notbuy");
            let notbuytext = ComponentManager.getTextField(needstr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WARN_RED2);
            notbuytext.setPosition(460-notbuytext.width,rewardBg.y+rewardBg.height+20);
            this.addChild(notbuytext);
        }

       
    }
}