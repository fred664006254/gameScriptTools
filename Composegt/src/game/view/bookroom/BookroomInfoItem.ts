/**
 * 书院 各作为部分部分
 * author yanyuling
 * date 2017/11/23
 * @class BookroomInfoItem
 */
class BookroomInfoItem extends BaseDisplayObjectContainer
{
    private _index:number = 0;
    private _posId:number = 0;
    private _desk:BaseBitmap;
    private _tipTxt:BaseTextField;
    private _cdTxt:BaseTextField;
    private _bRoomInfoVo:BookroomInfoVo
    private _tipNode:BaseDisplayObjectContainer;
    private _strenthenBtn:BaseButton = undefined;
    private _strenExpTxt:BaseBitmapText|BaseTextField;
    private _strenAni:CustomMovieClip;
    private _cardType:number = 0;
    public constructor()
	{
		super();
	}
	public init(index:number,posId:number,cardType:number=0):void
	{
        this._cardType = cardType;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.refreshUI,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH),this.refreshUI,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_INTENSIVESTUDY),this.strenthenReqCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY_BATCH),this.refreshUI,this);

        this._tipNode = new BaseDisplayObjectContainer();
        this.addChild(this._tipNode);
        this._index = index;
        this._posId = posId;
        let res = "bookroom_desk";
        if(cardType != 0){
            res = "bookroom_desk2";
        }
        let desk = BaseBitmap.create(res);
        
        this._desk = desk;
        this.addChild(desk);

        let bookroom_tipbg = BaseBitmap.create("bookroom_tipbg");
        bookroom_tipbg.x = desk.x + desk.width /2 - bookroom_tipbg.width/2;
        bookroom_tipbg.y = desk.y - 40;
        this._tipNode.addChild(bookroom_tipbg);
        bookroom_tipbg.name = "bookroom_tipbg";

        let tipTxt = ComponentManager.getTextField("",20);
        tipTxt.text = LanguageManager.getlocal("bookRoomClickTip");
        tipTxt.x = bookroom_tipbg.x + bookroom_tipbg.width /2 - tipTxt.width/2;
        tipTxt.y = bookroom_tipbg.y  +bookroom_tipbg.height/2 - tipTxt.height/2-5;
        this._tipNode.addChild(tipTxt);
        this._tipTxt = tipTxt;

        this.addTouchTap(this.bookRoomHandler,this);
        this.refreshUI();
        if(this._bRoomInfoVo &&this._bRoomInfoVo.level > 0){
            this.dealStrenExp();
            this.showStrenthenAni();
        }
    }
    public setPosId(posId:number){
        this._posId = posId;
    }
    public getPosId():number{
        return this._posId;
    }
    public getCardType():number{
        return this._cardType;
    }

    public setIndex(index:number){
        this._index = index;
    }
    public getIndex():number{
        return this._index;
    }

    //重新设置桌子的月卡年卡类型
    public setCardType(cardType:number){
        this._cardType = cardType;
        this.refreshDeskByCardType();
    }
    //根据桌子的月卡年卡类型 更改桌子颜色
    private refreshDeskByCardType()
    {
        let res = "bookroom_desk";
        if(this._cardType != 0){
            res = "bookroom_desk2";
        }
        this._desk.texture = ResourceManager.getRes(res);
    }
    protected dealStrenExp()
    {
        if(this._bRoomInfoVo && this._bRoomInfoVo.level > 0){
            if(!this._strenExpTxt){
                let lvbg = BaseBitmap.create("bookroom_stren_expbg");
                lvbg.x = this._desk.x + this._desk.width /2 - lvbg.width/2;
                lvbg.y = this._desk.y;
                this.addChild(lvbg);
                lvbg.name = "lvbg";
                
                this._strenExpTxt = ComponentManager.getBitmapText("","recharge2_fnt");
                this._strenExpTxt.scaleX = this._strenExpTxt.scaleY = 0.9;
                this._strenExpTxt.x = lvbg.x +lvbg.width - 90;
                this._strenExpTxt.y = lvbg.y + 6 ;
                this.addChild(this._strenExpTxt);
            }else{
                this.getChildByName("lvbg").visible = true;
            }
            let bookroomCfg =  GameConfig.config.bookroomCfg;
            let betterStudy = bookroomCfg.betterStudy;
            let level =  this._bRoomInfoVo.level;
            let uptxt1 =  betterStudy[level-1].upLevel * 100 +"";
            this._strenExpTxt.text = uptxt1;
            this._strenExpTxt.anchorOffsetX = this._strenExpTxt.width*0.9;
        }else{
            if(this._strenExpTxt){
                this._strenExpTxt.text = "";
                this.getChildByName("lvbg").visible = false;
            }
        }
    }

    protected showStrenthenAni()
    {
        if( this._bRoomInfoVo && this._bRoomInfoVo.level> 0){
            let lv = this._bRoomInfoVo.level;
            if(this._strenAni && this._strenAni.name != ""+lv ){
                this.removeChild(this._strenAni);
                this._strenAni = null;
            }
            this._strenAni = ComponentManager.getCustomMovieClip("bookroom_stren"+lv,8,85);
            this._strenAni.x = 0;
            this._strenAni.y = -120;
            this.addChildAt(this._strenAni,2);
            this._strenAni.playWithTime(0);
        }else{
             if(this._strenAni ){
                this.removeChild(this._strenAni);
                this._strenAni = null;
            }
        }
    }
    protected strenthenHandler()
    {
        if( PlatformManager.checkIsWxCfg() &&  Api.playerVoApi.getPlayerVipLevel() < 4){
            App.CommonUtil.showTip(LanguageManager.getlocal("bookroom_strenthen_vip4Tip"));
            return;
        }
        let level = this._bRoomInfoVo.level;
        let bookroomCfg =  GameConfig.config.bookroomCfg;
        let count = bookroomCfg.count
        if(level >= count){
            App.CommonUtil.showTip(LanguageManager.getlocal("bookRoom_strenghenTipTxt1"));
            return;
        }
        if ( !this._bRoomInfoVo || this._bRoomInfoVo.et < GameData.serverTime){
            return ;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMSTRENTHENPOPUPVIEW,{pos:this._posId,cardType:this._cardType});
    }

    protected makeStrenthenBtn()
    {
        if(!this._strenthenBtn && Api.switchVoApi.checkOpenBookRoomStrenthen()){
            let bookroom_tipbg =  this._tipNode.getChildByName("bookroom_tipbg");
            let bookroom_strenthen = ComponentManager.getButton("bookroom_strenthenBtn","",this.strenthenHandler,this);
            bookroom_strenthen.x = bookroom_tipbg.x + bookroom_tipbg.width - bookroom_strenthen.width/2 - 30;
            bookroom_strenthen.y = bookroom_tipbg.y + bookroom_tipbg.height/2 - bookroom_strenthen.height/2-10;
            bookroom_strenthen.name = "bookroom_strenthen";
            let idx = this.numChildren;
            this.addChildAt(bookroom_strenthen,idx);
            this._strenthenBtn = bookroom_strenthen;
            // this._strenthenBtn.visible = false;
        }
        if( this._strenthenBtn){
            if(this._bRoomInfoVo){
                if(this._bRoomInfoVo.et > GameData.serverTime && this._bRoomInfoVo.level < GameConfig.config.bookroomCfg.count){
                    this._strenthenBtn.visible = true;
                }else{
                    this._strenthenBtn.visible = false;
                }
            }
        }
    }

    protected strenthenReqCallback(event:egret.Event)
	{
         this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if(!this._bRoomInfoVo || this._bRoomInfoVo.level == 0){
            return ;
        }
		let ret = event.data.data.ret;
		if(ret == 0){
            this.dealStrenExp();
            this.showStrenthenAni();
            this.makeStrenthenBtn();
        }
    }

    protected refreshUI(event?:egret.Event)
    {
        if(event && this._bRoomInfoVo )
        {
            this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
            let rData = event.data.data.data;
            let cmd = event.data.data.cmd
            let pos = rData.bookroompos;
            let poss = rData.bookroom_poss;  
            //批量完成，
            if(pos == 0 && this._bRoomInfoVo)
            {
                return;
            }
            if(pos > 0 && pos != this._posId)
            {
                return;
            }
            let bookCfg = GameConfig.config.bookroomCfg;
            /**
             * 完成学习飘文字
             */

            if (cmd == "bookroom.finish"  && ! this._bRoomInfoVo)
            {
                let rate = 1;
                let addStr = "";
                let lv = 0;
                if(pos == 0  )
                {
                    if(!poss[this._posId]){
                        return;
                    }
                    rate = poss[this._posId].luckrate;
                    lv = poss[this._posId].level;
                }else{
                    if(pos != this._posId){
                        return;
                    }
                    if(poss &&  poss.pos)
                    {
                        rate = poss.pos.luckrate;
                        lv = poss.pos.level;
                    }
                }
                let upLevel = 1
                if (lv && lv > 0){
                    let bookroomCfg =  GameConfig.config.bookroomCfg;
                    let betterStudy = bookroomCfg.betterStudy;
                    upLevel = betterStudy[lv-1].upLevel ; 
                }

                if(!rate || rate == 0){
                    rate = 1;
                }
                let strList = [];
                // for (var index = 0; index < rate; index++) {
                    let flyStr1 = LanguageManager.getlocal("bookRoomServant_completeFly1",[String(bookCfg.getBookExp*rate*upLevel)]);
                    let flyStr2 = LanguageManager.getlocal("bookRoomServant_completeFly2",[String(bookCfg.getSkillExp*rate*upLevel)]);
                    strList.push({tipMessage:flyStr1});
                    strList.push({tipMessage:flyStr2});
                // }
              
                //  strList = [{tipMessage:flyStr1},{tipMessage:flyStr2}];
                let pos2 = this.localToGlobal(this._desk.x +  this._desk.width/2,this._desk.y - 50);
                App.CommonUtil.playRewardFlyAction(strList,pos2);
                // App.CommonUtil.showTip( LanguageManager.getlocal("bookRoomServant_completeFly",[String(bookCfg.getBookExp),String(bookCfg.getSkillExp)]) );

                // let eData:any=event.data?event.data.data:null;
                // if(eData&&eData.lucky)
				// {
                //     App.CommonUtil.showGodbless("bookRoom");
                // }
            }
        }
        
        this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if(this._bRoomInfoVo )
        {
            this._tipTxt.visible = false;
            let servantInfoObj = Api.servantVoApi.getServantObj(this._bRoomInfoVo.servantid);

            let servantFullImg:BaseLoadBitmap = <BaseLoadBitmap>this.getChildByName("servantFullImg");
            if(!servantFullImg){
                servantFullImg = BaseLoadBitmap.create(servantInfoObj.fullImgPath);
                let deltaScale = 0.5;
                servantFullImg.setScale(deltaScale);
                servantFullImg.width = 640;
                servantFullImg.height = 482;
                let maskH = 400;
                servantFullImg.mask = new egret.Rectangle(0,0,servantFullImg.width,maskH);
                servantFullImg.x = this._desk.x + this._desk.width/2 - servantFullImg.width/2*deltaScale;
                servantFullImg.y =  - maskH*deltaScale+30;
                this.addChildAt(servantFullImg,0);
                servantFullImg.name = "servantFullImg";
            }
            

            // let servantFullImg = BaseLoadBitmap.create(servantInfoObj.fullImgPath);
            
            this._tipNode.visible = false;
            // this._tipTxt.visible = false;

            let cdBg = this.getChildByName("cdBg");
            if(!cdBg){
                cdBg = BaseBitmap.create("bookroom_cdbg");
                this.addChild(cdBg);
            }
            // let cdBg = BaseBitmap.create("bookroom_cdbg");
            cdBg.width = 136;
            cdBg.height = 30;

            cdBg.x = this._desk.x + this._desk.width/2 - cdBg.width/2;
            cdBg.y = -40;
            cdBg.name = "cdBg";

           
            if(this._strenthenBtn){
                this.swapChildren(this._strenthenBtn,cdBg);
            }
            if(!this._cdTxt){
                this._cdTxt = ComponentManager.getTextField("",20);
                this.addChild(this._cdTxt);
            }
            
            this._cdTxt.y = cdBg.y  + 10;
            
            this.makeStrenthenBtn();
            if(this._bRoomInfoVo.et < GameData.serverTime)
            {
                this._cdTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                this._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
                if(this._strenthenBtn){
                    this._strenthenBtn.visible = false;
                }
            }else
            {
			    let leftTimt =   this._bRoomInfoVo.et - GameData.serverTime;
                this._cdTxt.text =App.DateUtil.getFormatBySecond(leftTimt).toString()
                // this.tick()
                TickManager.removeTick(this.tick,this);
                TickManager.addTick(this.tick,this);
                // if(this._strenthenBtn){
                //     this._strenthenBtn.visible = true;
                // }
            }
            this._cdTxt.x = cdBg.x + cdBg.width /2 - this._cdTxt.width/2;
            this._cdTxt.y = cdBg.y + cdBg.height /2 - this._cdTxt.height/2;
        }else
        {
            let servantFullImg = this.getChildByName("servantFullImg");
            let cdBg = this.getChildByName("cdBg");
            if(cdBg){
                this.removeChild(cdBg);
            }
            if (servantFullImg){
                this.removeChild(servantFullImg);
            }
            this._tipNode.visible = true;
            egret.Tween.get(this._tipNode,{loop:true}).to({y:-10},1000).to({y:0},1000);
            if (this._cdTxt){
                this.removeChild(this._cdTxt);
                this._cdTxt = null;
            }
            if(this._strenthenBtn){
                this._strenthenBtn.visible = false;
            }

            this._tipTxt.visible = true;
            this.dealStrenExp();
            this.showStrenthenAni();
        }
        
    }

    public tick():boolean
	{   
         this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if (this._bRoomInfoVo && this._bRoomInfoVo.et)
        {
            if ( this._bRoomInfoVo.et > GameData.serverTime&&this._cdTxt){
                let leftTimt =  this._bRoomInfoVo.et - GameData.serverTime;
                this._cdTxt.textColor = TextFieldConst.COLOR_WHITE;
                this._cdTxt.text =App.DateUtil.getFormatBySecond(leftTimt).toString()
                //  LanguageManager.getlocal("affair_cdTip",[]) ;
                let cdBg = this.getChildByName("cdBg");
                this._cdTxt.x = cdBg.x + cdBg.width /2 - this._cdTxt.width/2;
                this._cdTxt.y = cdBg.y + cdBg.height /2 - this._cdTxt.height/2;
                cdBg = null;
                if(this._strenthenBtn){
                    if(this._bRoomInfoVo.level >= GameConfig.config.bookroomCfg.count){
                        this._strenthenBtn.visible = false;
                    }else{
                        this._strenthenBtn.visible = true;
                    }
                }
                return true;
            }else
            {
                if(this._cdTxt)
                {   
                    this._cdTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                    this._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
                }
               
                if(this._strenthenBtn){
                    this._strenthenBtn.visible = false;
                }
                this.dealStrenExp();
                this.showStrenthenAni();
                return false;
            }
        }else{
            if(this._strenthenBtn){
                this._strenthenBtn.visible = false;
            }
        }
        return false;
	}
    //位置是否是空的
    public get isEmpty():boolean
    {
        if (this._bRoomInfoVo )
        {
            return false;
        } 
        return true;
    }
    protected bookRoomHandler()
    {
        if (this._bRoomInfoVo && this._bRoomInfoVo.et < GameData.serverTime)
        {
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH,{pos:this._posId,isbatch:0});
        }
         if (!this._bRoomInfoVo ){
            ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMSERVANTSELECTPOPUPVIEW,{posId:this._posId, cardType:this._cardType});
        }
    }

    public dispose()
    {
        TickManager.removeTick(this.tick,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.refreshUI,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH),this.refreshUI,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_INTENSIVESTUDY),this.strenthenReqCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY_BATCH),this.refreshUI,this);

        this._index = null;
        this._posId = null;
        this._desk = null;
        this._tipTxt = null;
        this._cdTxt = null;
        this._bRoomInfoVo = null;
        this._strenthenBtn = null;
        this._strenExpTxt = null;
        this._strenAni = null;
        this._cardType = 0;
        this._tipNode = null;
        super.dispose();
    }
}