/**
 * 书院 各作为部分部分
 * author yanyuling
 * date 2017/11/23
 * @class BookroomInfoItem
 */
class BookroomInfoItem extends BaseDisplayObjectContainer
{
    private _posId:number = 0;
    private _desk:BaseBitmap;
    private _tipTxt:BaseTextField;
    private _cdTxt:BaseTextField;
    private _bRoomInfoVo:BookroomInfoVo
    private _tipNode:BaseDisplayObjectContainer;
    private yearState:number =0;
    private monthState:number =0;
    private bigType:number =0;
    private _data:any =null; 
    private _bigData:any = {};
    private _yfImage:BaseBitmap = null;
    private _itemCdTxt = null;
    private _numTxt = null;
    private _leftTime = 0;
    private _isMonthFresh:boolean = false;
    private _mainTaskHandKey1:string = null;
    public constructor()
	{
		super();
	}
	public init(posId:number,data:any = null):void
	{


        this._data = data;

        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.refreshUI,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH),this.refreshUI,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_ONEKEYSTUDY), this.refreshUI, this);
        

        this._tipNode = new BaseDisplayObjectContainer();
        this.addChild(this._tipNode);
        var bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if(Api.switchVoApi.checkOpenSeat()==false)
        {
            var bookstr = "bookroom_desk";
            var desk = BaseBitmap.create(bookstr);
            this._desk = desk; 
            this.addChild(desk); 
        } 

        if(data)
        {
            if(data&&data.year)
            {   
                bookstr = "bookroom_desk_1_b";
                if(data.year==1)
                {
                    bookstr = "bookroom_desk_1";
                } 
            }

            if(data&&data.month)
            {    
                if(data.month==1)
                {
                    bookstr = "bookroom_desk_2";
                } 
                if(data.month==2)
                {
                    bookstr = "bookroom_desk_2_b";
                } 
            }
            if(data)
            {
                if(data.month==0&&data.year==0)
                {
                    bookstr = "bookroom_desk";
                }
            }
        
            this._posId = posId;

            this._bigData.posId = posId;//data.posId;
            this._bigData.data = data;
            
            var desk = BaseBitmap.create(bookstr);
            this._desk = desk; 
            this.addChild(desk);

            if(data&&data.month)
            {
                var mfImage = BaseBitmap.create("bookroom_mf"); 
                mfImage.x =desk.x+desk.width/2-mfImage.width/2;
                mfImage.y =desk.y+65; 
                this.addChild(mfImage); 
                mfImage.name = "mfImage";
                var monthTxt =null;
                var monthTimeTxt:BaseTextField =null;
            
            
                if(data.month==2)
                {
                    mfImage.visible = false;
                    monthTxt= ComponentManager.getTextField("",18); 
                    monthTxt.text = LanguageManager.getlocal("bookroommonthtype1"); 
                    monthTxt.width = mfImage.width;
                    monthTxt.textAlign = TextFieldConst.ALIGH_CENTER;
                    monthTxt.x = mfImage.x;
                    monthTxt.y = mfImage.y+mfImage.height+2-40;
                    monthTxt.name = "monthTxt";
                    this.addChild(monthTxt);
                }
                //解锁状态
                if(data.month==1)
                {   
                    mfImage.visible =true;
                    monthTimeTxt = ComponentManager.getTextField("",18,TextFieldConst.COLOR_WARN_YELLOW2); 
                    if(data.lastet&&data.lastet<86400*7)
                    {
                        monthTimeTxt.text = App.DateUtil.getFormatBySecondIntoTime(data.lastet); 
                        monthTimeTxt.width = mfImage.width;
                        monthTimeTxt.textAlign = TextFieldConst.ALIGH_CENTER;
                        monthTimeTxt.x = mfImage.x;
                        monthTimeTxt.y = mfImage.y+mfImage.height+18;
                        monthTimeTxt.name = "monthTimeTxt";
                        this.addChild(monthTimeTxt);    
                    } 
                }  
            } 

            if(data.year)
            {
                this._yfImage = BaseBitmap.create("bookroom_yf"); 
                this._yfImage .x =desk.x+desk.width/2-this._yfImage .width/2;
                this._yfImage .y =desk.y+65; 
                this.addChild(this._yfImage);
                if(data.year==2)
                {
                    let yearTxt = ComponentManager.getTextField("",18); 
                    yearTxt.text = LanguageManager.getlocal("bookroomyeartype1"); 
                    yearTxt.width = this._yfImage.width;
                    yearTxt.textAlign = TextFieldConst.ALIGH_CENTER;
                    yearTxt.x = this._yfImage.x;
                    yearTxt.y = this._yfImage.y+this._yfImage.height+2-40;
                    this.addChild(yearTxt);

                    this._yfImage.visible =false;
                    
                    if(this._posId!=201)
                    {    
                        var num = data.needLevel; 
                        var offStr = LanguageManager.getlocal("officialTitle"+num);
                        yearTxt.text = LanguageManager.getlocal("bookroomyearunlock",[offStr]); 
                    } 
                } 
            }
            if(data.item){
                this._leftTime = data.lastet - GameData.serverTime;
                let str = '';
                if(this._leftTime > 0){
                    str = LanguageManager.getlocal(`bookRoom_useSeatTip4`,[App.DateUtil.getFormatBySecond(this._leftTime, 18)]);
                }
                else{
                    str = LanguageManager.getlocal(`bookRoom_useSeatTip5`);
                }
                let itemUseCDTxt = ComponentManager.getTextField(str, 18);
                itemUseCDTxt.textAlign = TextFieldConst.ALIGH_CENTER;
                itemUseCDTxt.lineSpacing = 5;
                this.addChild(itemUseCDTxt);  
                this._itemCdTxt = itemUseCDTxt;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, itemUseCDTxt, desk, [0,50]); 

                TickManager.addTick(this.tick,this);
                let numTxt = ComponentManager.getTextField(`（${Api.bookroomVoApi.geItemNum}/${Api.bookroomVoApi.itemMaxnum}）`, 18);
                this.addChild(numTxt);  
                this._numTxt = numTxt;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numTxt, desk, [0,30]); 
            }
        }
       
        //已经进入学习状态 屏蔽图片文字
        
        if(bRoomInfoVo)
        {   
             
            if(monthTimeTxt)
            {
                monthTimeTxt.visible = false;
            } 
        }
           
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

        this.isShowtip(data);

        //主线任务引导
        let taskId = Api.mainTaskVoApi.getCurMainTaskId();
        if (taskId){
            let taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
            if (taskCfg && taskCfg.questType == 502 && !Api.rookieVoApi.isGuiding && !Api.rookieVoApi.isInGuiding){
                let baseView = <BookroomView>ViewController.getInstance().getView("BookroomView");
                let indexData = baseView.getFirstEmptySeat();
                if (indexData.index > -1 && indexData.data && Number(indexData.data.posId) == posId){
                    this._mainTaskHandKey1 = App.MainTaskHandUtil.addHandNode(
                        this,
                        this._desk.x + this._desk.width/2 - 10,
                        this._desk.y,
                        [this],
                        502,
                        true,
                        function(){
                            return true;
                        },
                        this,
                        0.8
                    )
                }
            }
        }
    }

    public refreshMonthCard():void{
        let mfImage = <BaseBitmap>this.getChildByName("mfImage");
        let monthTxt1 = <BaseTextField>this.getChildByName("monthTxt");
        let monthTimeTxt = <BaseTextField>this.getChildByName("monthTimeTxt");
        if (this._data){
            if (this._data.month && this._data.month == 1 && this._data.lastet && this._data.lastet <= GameData.serverTime){
                if (mfImage){
                    mfImage.visible = false;
                }
                if (!monthTxt1){
                    let monthTxt= ComponentManager.getTextField("",18); 
                    monthTxt.text = LanguageManager.getlocal("bookroommonthtype1"); 
                    monthTxt.width = mfImage.width;
                    monthTxt.textAlign = TextFieldConst.ALIGH_CENTER;
                    monthTxt.x = mfImage.x;
                    monthTxt.y = mfImage.y+mfImage.height+2-40;
                    monthTxt.name = "monthTxt";
                    this.addChild(monthTxt);
                }
                else{
                    monthTxt1.visible = true;
                }
                if (monthTimeTxt){
                    monthTimeTxt.visible = false;
                }
                this.setImgType(this._data);
            }
        }
    }

    public setImgType(data)
    { 
        var bookstr:string = "bookroom_desk";
        if(data&&data.year)
        {   
            bookstr = "bookroom_desk_1_b";
            if(data.year==1)
            {
                bookstr = "bookroom_desk_1";
            } 
        }

        if(data&&data.month)
        {    
            if(data.month==1)
            {
                bookstr = "bookroom_desk_2";
                if (data.lastet && data.lastet <= GameData.serverTime){
                    bookstr = "bookroom_desk_2_b";
                }
            } 
            if(data.month==2)
            {
                bookstr = "bookroom_desk_2_b";
            } 
        }
        if(data)
        {
            if(data.month==0&&data.year==0)
            {
                bookstr = "bookroom_desk";
            }
        }
        if(this._desk)
        {
            this._desk.texture  = ResourceManager.getRes(bookstr);
        } 

     
    }
    private isShowtip(data:any):void
    {
        if(data!=null)
       {     
            // if(data.year==1||data.month==1)//解锁状态
            // {
            //     this._tipTxt.visible =true;
            //     this._tipNode.visible = true;
            // }  

            if(data.month==2||data.year==2)
            {
                this._tipTxt.visible =false;
                this._tipNode.visible = false;
            }    
        } 
    }

    protected refreshUI(event?:egret.Event)
    {
        // if(event.data.data.data&&event.data.data.data.monthPast==1)
        // {
        //     App.CommonUtil.showTip( LanguageManager.getlocal("bookMonthPastdes"));
        //     App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM); 
        //     return;
        // }
        if(event && event.data && event.data.ret && event.data.data.data.monthPast==1)
        {
            App.CommonUtil.showTip( LanguageManager.getlocal("bookMonthPastdes"));
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM); 
            return; 
        }

        if(event && event.data && event.data.ret && event.data.data.data.itemPast==1)
        {
            App.CommonUtil.showTip( LanguageManager.getlocal("bookMonthPastdes"));
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM); 
            return; 
        }

        if(event && event.data && event.data.ret && this._bRoomInfoVo )
        {
            this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
            let rData = event.data.data.data;
            let cmd = event.data.data.cmd
            let pos = rData.bookroompos;
            let poss = rData.bookroom_poss;  
            let batchFlag =  rData.batchFlag;
            let monthPast = rData.monthPast;
            if(batchFlag==1)
            {   
                //月卡到期
                App.CommonUtil.showTip( LanguageManager.getlocal("bookbatchdes"));
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM);
                return;    
            }
            if(monthPast)
            {
                App.CommonUtil.showTip( LanguageManager.getlocal("bookMonthPastdes"));
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM); 
            }
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
                if(pos == 0 && poss[this._posId] &&  poss[this._posId].pos )
                {
                    rate = poss[this._posId].pos;
                }else{
                    if(poss &&  poss.pos)
                    {
                        rate = poss.pos;
                    }
                }

                if (Api.otherInfoVoApi.isHasScene("204","cityScene"))
                {
                    let abilitycfg:any = Config.SceneCfg.getSceneCfgBySceneName("cityScene","204").personalityCfg;
                    rate = rate*(1+abilitycfg.buffValue);
                }
               
                
                let strList = [];
        
                let flyStr1 = LanguageManager.getlocal("bookRoomServant_completeFly1",[String(Math.floor(bookCfg.getBookExp*rate+0.5))]);
                let flyStr2 = LanguageManager.getlocal("bookRoomServant_completeFly2",[String(Math.floor(bookCfg.getSkillExp*rate+0.5))]);
                strList.push({tipMessage:flyStr1});
                strList.push({tipMessage:flyStr2}); 
                let pos2 = this.localToGlobal(this._desk.x +  this._desk.width/2,this._desk.y - 50);
                App.CommonUtil.playRewardFlyAction(strList,pos2);


                // var monthNum  = Api.bookroomVoApi.getMonthNum; 
                // if(monthNum!=2)
                // {   
                //     if(this._posId==101||this._posId==102)
                //     {
                //         this._desk.texture  = ResourceManager.getRes("bookroom_desk_1_b");
                //         this._tipTxt.visible =false;
                //         this._tipNode.visible =false;
                //     } 
                // }
                //非一键的时候刷新界面
                if(!rData.isbatch&&Api.switchVoApi.checkOpenSeat())
                {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM);
                } 
                else{
                    if (rData.isbatch){
                        egret.Tween.get(this).wait(1000).call(()=>{
                            App.LogUtil.log("一键事件")
                            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REST_BOOKROOM);
                        });
                    }
                }  

            } 
        }
        this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if(this._bRoomInfoVo )
        {
            // if(this._itemCdTxt){
            //     this._itemCdTxt.visible = false;
            //     this._numTxt.visible = false;
            // }
            this._tipTxt.visible = false;
            let servantInfoObj = Api.servantVoApi.getServantObj(this._bRoomInfoVo.servantid);
            let servantFullImg = BaseLoadBitmap.create(servantInfoObj.fullImgPath);
            let deltaScale = 0.5;
            servantFullImg.setScale(deltaScale);
            servantFullImg.width = 405;
		    servantFullImg.height = 467;
            let maskH = 400;
            servantFullImg.mask = new egret.Rectangle(0,0,servantFullImg.width,maskH);
            servantFullImg.x = this._desk.x + this._desk.width/2 - servantFullImg.width/2*deltaScale;
            servantFullImg.y =  - maskH*deltaScale+30;
            this.addChildAt(servantFullImg,0);
            servantFullImg.name = "servantFullImg";
            this._tipNode.visible = false;
            // this._tipTxt.visible = false;

            let cdBg = BaseBitmap.create("bookroom_cdbg");
            cdBg.x = this._desk.x + this._desk.width/2 - cdBg.width/2;
            cdBg.y = -40;
            cdBg.name = "cdBg";
            this.addChild(cdBg);

            this._cdTxt = ComponentManager.getTextField("",20);
            this._cdTxt.y = cdBg.y  + 10;
            this.addChild(this._cdTxt);

            if(this._bRoomInfoVo.et < GameData.serverTime)
            {
                this._cdTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                this._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
            }else
            {
			    let leftTimt =   this._bRoomInfoVo.et - GameData.serverTime;
                this._cdTxt.text =App.DateUtil.getFormatBySecond(leftTimt).toString()
                // this.tick()
                TickManager.removeTick(this.tick,this);
                TickManager.addTick(this.tick,this);
            }
            this._cdTxt.x = cdBg.x + cdBg.width /2 - this._cdTxt.width/2; 
            
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
            if(this._tipTxt)
            {
                 this._tipTxt.visible = true;
            }
           
            if(this._data)
            {   
                if(this._data.month==2||this._data.year==2)
                {
                    this._tipTxt.visible =false;
                    this._tipNode.visible = false;
                }   
                else if (this._data.month == 1 && this._data.lastet) {
                    if (this._data.lastet <= GameData.serverTime){
                        this._tipTxt.visible =false;
                        this._tipNode.visible = false;
                        this.refreshMonthCard();
                    }
                    else{
                        TickManager.removeTick(this.tick,this);
                        TickManager.addTick(this.tick,this);
                    }
                }
            } 
        }
    }

    public tick():boolean
	{  
        if(this._itemCdTxt){
            -- this._leftTime;
            this._itemCdTxt.textColor = TextFieldConst.COLOR_WHITE;
            if(this._leftTime > 0){
                this._itemCdTxt.text = LanguageManager.getlocal(`bookRoom_useSeatTip4`,[App.DateUtil.getFormatBySecond(this._leftTime, 18)]);
            }
            else{
                this._itemCdTxt.text = LanguageManager.getlocal(`bookRoom_useSeatTip5`);
            }
            this._itemCdTxt.x = (this.width - this._itemCdTxt.width) / 2;
        }
        this._bRoomInfoVo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
        if (this._bRoomInfoVo)
        {   
            if ( this._bRoomInfoVo.et > GameData.serverTime){
                let leftTimt =  this._bRoomInfoVo.et - GameData.serverTime;
                if ( this._cdTxt)
                {
                    this._cdTxt.textColor = TextFieldConst.COLOR_WHITE;
                    this._cdTxt.text =App.DateUtil.getFormatBySecond(leftTimt).toString()
                    let cdBg = this.getChildByName("cdBg");
                    this._cdTxt.x = cdBg.x + cdBg.width /2 - this._cdTxt.width/2;
                    cdBg = null;
                }
               
                return true;
            }else
            {   
                if (this._cdTxt)
                {
                    this._cdTxt.textColor = TextFieldConst.COLOR_QUALITY_GREEN;
                    this._cdTxt.text = LanguageManager.getlocal("bookRoomServant_studyComplete");
                }
                return false;
            }
        }
        else{
            if (this._data && this._data.month == 1 && this._data.lastet && this._data.lastet <= GameData.serverTime){
                if (!this._isMonthFresh){
                    this._isMonthFresh = true;
                    this.refreshUI();
                }
            }
        }
        

        return false;
	}

    protected bookRoomHandler()
    {  
        if(this._data)
        {    
            if(this._data.year==2||this._data.month==2)
            {
                if(this._data.year==2&&this._posId!=201)
                {       
                    var num =this._data.needLevel; 
                    if(num==0)
                    {
                        num = Api.bookroomVoApi.needVip();
                    }
                    var offStr = LanguageManager.getlocal("officialTitle"+num); 
                    App.CommonUtil.showTip( LanguageManager.getlocal("bookroomyearunlock",[offStr]));
                    return;        
                }

                let mesObj = {
                confirmCallback: this.buySeatHandler, 
                handler: this,  
                type: 1, 
                month:this._data.month,
                year:this._data.year,
                }; 
                ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMTIPPOPUPVIEW,mesObj);
                return;
            } 
            else if (this._data.month == 1 && this._data.lastet && this._data.lastet <= GameData.serverTime){
                let bookInfo = Api.bookroomVoApi.getSeatInfoByPosId(this._posId);
                if (!bookInfo){
                    let mesObj = {
                    confirmCallback: this.buySeatHandler, 
                    handler: this,  
                    type: 1, 
                    month:2,
                    year:this._data.year,
                    }; 
                    ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMTIPPOPUPVIEW,mesObj);
                    return;
                }
            }
        }

        // var monthNum  = Api.bookroomVoApi.getMonthNum; 
        // if(monthNum!=2)
        // {   
        //     if(this._posId==101||this._posId==102)
        //     {
        //         let mesObj = {
        //         confirmCallback: this.buySeatHandler, 
        //         handler: this,  
        //         type: 1, 
        //         month:this._data.month,
        //         year:this._data.year,
        //         }; 
        //         ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMTIPPOPUPVIEW,mesObj);
        //         return; 
        //     } 
        // } 
        if (this._bRoomInfoVo && this._bRoomInfoVo.et < GameData.serverTime)
        {
            NetManager.request(NetRequestConst.REQUEST_BOOKROOM_FINISH,{pos:this._posId,isbatch:0});
            return;
        }
        if(this._data.item && this._leftTime <= 0){
            App.CommonUtil.showTip(LanguageManager.getlocal(`bookRoom_useSeatTip5`));
            return;
        }
        if (!this._bRoomInfoVo )
        { 
            ViewController.getInstance().openView(ViewConst.POPUP.BOOKROOMSERVANTSELECTPOPUPVIEW,this._bigData);
        }
    }
    private buySeatHandler():void
    {   
        //  var monthNum  = Api.bookroomVoApi.getMonthNum; 
        //   if(monthNum!=2)
        //     {   
        //         if(this._posId==201||this._posId==202)
        //         {
        //             ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD); 
        //             return;
        //         }
        //     }

          if(this._data.month==2)
          {
             ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWMONTHCARD); 
          }
          if(this._data.year==2)
          {   
             ViewController.getInstance().openView(ViewConst.COMMON.WELFAREVIEWYEARCARD); 
          }
    }
    public dispose()
    {
        TickManager.removeTick(this.tick,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_STUDY),this.refreshUI,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_FINISH),this.refreshUI,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_BOOKROOM_ONEKEYSTUDY), this.refreshUI, this);

        this._posId = null;
        this._desk = null;
        this._tipTxt = null;
        this._cdTxt = null;
        this._bRoomInfoVo = null;
        this._data =null;
        this._yfImage = null;
        this._itemCdTxt = null;
        this._numTxt = null;
        this._leftTime = 0;
        this._isMonthFresh = false;
        App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey1);
        this._mainTaskHandKey1 = null;
        super.dispose();
    }
}