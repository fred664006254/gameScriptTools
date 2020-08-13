class BookroomStrenthenPopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

    private _cost:number = 0;
	public initView():void
	{
		let bg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		bg.width = 530;
		bg.height = 320;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);

        let bookroomCfg =  GameConfig.config.bookroomCfg;
        let count = bookroomCfg.count;
        let betterStudy = bookroomCfg.betterStudy;


		let messageStr:string = this.param.data.msg;
        let bRoomInfoVos = {};
        //单个
        if(this.param.data.pos)
        {
            let svo  = Api.bookroomVoApi.getSeatInfoByPosId(this.param.data.pos);
            let betterStudy = bookroomCfg.betterStudy;
            let level =  svo.level;
            let uptxt1 = "100%";
            let uptxt2 = betterStudy[0].upLevel * 100 + "%";
            if(level > 0){
                uptxt1 = betterStudy[level-1].upLevel * 100 + "%";
                uptxt2 = betterStudy[level].upLevel * 100 + "%";
            }
            let cost = betterStudy[level]["gemCost"];
            let message = LanguageManager.getlocal("bookRoom_strenghenStudyTxt",[""+cost,uptxt1,uptxt2]);
            this._cost = cost;
            let msgTF:BaseTextField = ComponentManager.getTextField(message,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
            msgTF.width = 480;
            msgTF.textAlign = TextFieldConst.ALIGH_CENTER;
            msgTF.x = this.viewBg.x + this.viewBg.width/2 - msgTF.width/2;
            msgTF.y = bg.y + bg.height/2 - msgTF.height/2;
            msgTF.lineSpacing = 5;
            this.addChildToContainer(msgTF);
        }else{
            bRoomInfoVos = Api.bookroomVoApi.getSeatInfos();
            let message = "";//LanguageManager.getlocal("bookRoom_strenghenStudyTxt2",[""]);
            let totalCost = 0;
             let startY = 100;
            for (var key in bRoomInfoVos) {
                var svo = bRoomInfoVos[key];
                let level = svo.level;
                if(level >= count || svo.et < GameData.serverTime){
                    continue;
                }
                let uptxt1 = "100%";
                let uptxt2 = betterStudy[0].upLevel * 100 + "%";
                if(level > 0){
                    uptxt1 = betterStudy[level-1].upLevel * 100 + "%";
                    uptxt2 = betterStudy[level].upLevel * 100 + "%";
                }
                totalCost += betterStudy[level]["gemCost"];
                let sname = LanguageManager.getlocal("servant_name" + svo.servantid);
                let snameTxt = ComponentManager.getTextField(sname,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
                snameTxt.x = this.viewBg.x +160;
                snameTxt.y =  startY;
                this.addChildToContainer(snameTxt);

                let changeStr = LanguageManager.getlocal("bookRoom_strenghenStudyTxt3",[uptxt1,uptxt2]);
                let changeTxt = ComponentManager.getTextField(changeStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
                changeTxt.x = snameTxt.x +100;
                changeTxt.y =  startY;
                this.addChildToContainer(changeTxt);
                startY += 30;
            }
            this._cost = totalCost; 
            let newH = startY - bg.y + 15;
            if(newH > bg.height){
                bg.height = newH;
            }
            let topMsg =   ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
            topMsg.text = LanguageManager.getlocal("bookRoom_strenghenStudyTxt2",[""+totalCost])
            topMsg.width = 480;
            topMsg.textAlign = TextFieldConst.ALIGH_CENTER;
            topMsg.x = this.viewBg.x + this.viewBg.width/2 - topMsg.width/2;
            topMsg.y = 40;
            topMsg.lineSpacing = 5;
            this.addChildToContainer(topMsg);
		}

		let conBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"confirmBtn",this.clickConHandler,this);
		conBtn.x = bg.x + bg.width/2 - conBtn.width/2;
		conBtn.y = bg.y + bg.height + 20;
		this.addChildToContainer(conBtn);
	
        let cancelBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_BLUE,"cancelBtn",this.hide,this);	
        cancelBtn.x = 80;
        cancelBtn.y = bg.y + bg.height + 20;
        this.addChildToContainer(cancelBtn);
        conBtn.x = 330;
		
	}

    protected strenthenReqCallback(event:egret.Event)
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_INTENSIVESTUDY),this.strenthenReqCallback,this);
		let ret = event.data.data.ret;
		if(ret == 0){
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_strenghen_success"));
        }else{
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_strenghen_fail"));
        }
        this.hide();
    }
	protected clickConHandler(data:any):void
	{
        if(this._cost > Api.playerVoApi.getPlayerGem()){
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_strenghen_gemTip"));
            return;
        }
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_INTENSIVESTUDY),this.strenthenReqCallback,this);
        let _pos = this.param.data.pos;
        let cardType = this.param.data.cardType;
        if(_pos){
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_INTENSIVESTUDY,{pos:_pos,ismonthcard:cardType});
        }else{
            let ismonthcard = 0;
            if(Api.shopVoApi.ifBuyMonthCard() ){
                ismonthcard ++;
            }
            if(Api.shopVoApi.ifBuyYearCard() ){
                ismonthcard ++;
            }
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_INTENSIVESTUDY,{onekey:1,ismonthcard:ismonthcard});
        }
	}

    protected getTitleStr(){
        return "bookRoom_strenghenTitle1";
    }
	protected getCloseBtnName():string
	{
		return  null;
	}

	public dispose():void
	{
		super.dispose();
	}
}