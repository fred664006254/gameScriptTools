class DinnerdetailPopupScollItem extends ScrollListItem
{

	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
        this.width = 509;
        this.height = 132;

        let bgBg:BaseBitmap = BaseBitmap.create("public_9_bg14");
		bgBg.width = this.width;
		bgBg.height = 131;
		this.addChild(bgBg);

        let line:BaseBitmap = BaseBitmap.create("public_line1");
        line.width = 400;
        line.setPosition(100,43);
        this.addChild(line);

        let posX:number = 120;
        if (data && data.name)
        {   
            let titleId = data.ptitle;
            let head:BaseDisplayObjectContainer = Api.playerVoApi.getPlayerCircleHead(data.pic,titleId);
            head.setPosition(16,bgBg.height/2 - head.height/2);
            this.addChild(head);

            head.addTouchTap(this.roleHeadClickHandler,this,[data.uid]);
            

            let guestName:BaseTextField = ComponentManager.getTextField(data.name,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
            guestName.setPosition(posX,15);
            this.addChild(guestName);

            let itemCfg:any = Config.DinnerCfg.getGoToFeastItemCfg(data.dtype);
            let point:number = itemCfg.getPoint;
            let itemName:string;
            let scoreStr:string;
            if (itemCfg.needGem)
            {
                itemName = itemCfg.needGem + LanguageManager.getlocal("gemName");
            }
            else
            {
                itemName = LanguageManager.getlocal("itemName_"+itemCfg.needItem);
            }
            if (point>0)
            {
                scoreStr = LanguageManager.getlocal("dinnerCashGift1",[itemName,String(point)]);
            }
            else
            {
                scoreStr = LanguageManager.getlocal("dinnerCashGift2",[itemName,String(point)]);
            }

            let alliance:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
            alliance.setPosition(posX,60);
            this.addChild(alliance);
            if (data.allianceId == Api.playerVoApi.getPlayerAllianceId())
            {
                alliance.textColor = TextFieldConst.COLOR_WARN_GREEN2;
            }
            if (data.allianceName)
            {
                alliance.text = LanguageManager.getlocal("emperorWarCheerBhui",[data.allianceName]);
            }
            else
            {
                alliance.text = LanguageManager.getlocal("emperorWarCheerBhui",[LanguageManager.getlocal("nothing")]);
            }

            let guestScre:BaseTextField = ComponentManager.getTextField(scoreStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
            guestScre.setPosition(posX,alliance.y+alliance.height+10);
            this.addChild(guestScre);
           
        }
        else if (data.special)
        {
            //花钱
            let emptySeat:BaseBitmap = BaseBitmap.create("dinner_seat_special"+data.dtype);
            emptySeat.setPosition(16,bgBg.height/2 - emptySeat.height/2);
            this.addChild(emptySeat);

            let guestName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerFinishName"+data.dtype),
            TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
            guestName.setPosition(posX,15);
            this.addChild(guestName);

           let itemCfg:any = Config.DinnerCfg.getGoToFeastItemCfg(data.dtype);
            let point:number = itemCfg.getPoint;
            let itemName:string;
            let scoreStr:string;
            if (itemCfg.needGem)
            {
                itemName = itemCfg.needGem + LanguageManager.getlocal("gemName");
            }
            else
            {
                itemName = LanguageManager.getlocal("itemName_"+itemCfg.needItem);
            }
            if (point>0)
            {
                scoreStr = LanguageManager.getlocal("dinnerCashGift1",[itemName,String(point)]);
            }
            else
            {
                scoreStr = LanguageManager.getlocal("dinnerCashGift2",[itemName,String(point)]);
            }

            let alliance:BaseTextField = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
            alliance.setPosition(posX,60);
            this.addChild(alliance);
            if (data.allianceId == Api.playerVoApi.getPlayerAllianceId())
            {
                alliance.textColor = TextFieldConst.COLOR_WARN_GREEN2;
            }
            if (data.allianceName)
            {
                alliance.text = LanguageManager.getlocal("emperorWarCheerBhui",[data.allianceName]);
            }
            else
            {
                alliance.text = LanguageManager.getlocal("emperorWarCheerBhui",[LanguageManager.getlocal("nothing")]);
            }

            let guestScre:BaseTextField = ComponentManager.getTextField(scoreStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
            guestScre.setPosition(posX,alliance.y+alliance.height+10);
            this.addChild(guestScre);
        }
        else
        {   
            //空位
            let emptySeat:BaseBitmap = BaseBitmap.create("dinner_seat_empty");
            emptySeat.setPosition(16,bgBg.height/2 - emptySeat.height/2);
            this.addChild(emptySeat);

            let guestName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerGuest"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
            guestName.setPosition(posX,15);
            this.addChild(guestName);

            let guestScre:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("dinnerGuestScore",[String(Config.DinnerCfg.getAddScore())]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
            guestScre.setPosition(posX,60);
            this.addChild(guestScre);
            
        }
    }


    private roleHeadClickHandler(evc,uid)
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT,{ruid:uid});
    }

    private userShotCallback(event:egret.Event)
    {
        let data = event.data.data.data;
        if(event.data.ret)
	    {
            ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
        }
        
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT),this.userShotCallback,this)
    }
}