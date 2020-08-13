/**
 * 练武场 玩家形象
 * author yanyuling
 * date 2017/11/29
 * @class StudyatkDetailRoleInfoItem
 */
class StudyatkDetailRoleInfoItem extends BaseDisplayObjectContainer
{
    private _posIdx:string;
    private _fuid:number;
    private _detailData:any;
    private _uiData:any;
    private _pro_et:number = 0;
    private _pkBtn:BaseButton;
    private _joinBtn:BaseBitmap;
    private _inproTxt:BaseTextField;
    private _joinMv:CustomMovieClip;
    private _oldInfo:any[] = [];
    private _getTxt:BaseTextField;
    private _allianceTxt:BaseTextField;
    private _pkTxtNode:BaseDisplayObjectContainer;
    private _idleTxt:BaseTextField;
    private _tiptxtBg:BaseBitmap;
    private _armorNode:BaseDisplayObjectContainer;
    private _shieldBtn:BaseButton;


    private _studyatk_upbg:BaseBitmap = null;
    private _studyatk_uparrow:BaseBitmap = null;
    private _upBF:BaseBitmapText|BaseTextField = null;
	public constructor()
	{
		super();
	}

	public init(data:any,posIdx:string,detailData:any):void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_JOIN),this.joinBtnHandlerCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GOAWAY),this.pkBtnHandlerCallBack,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_USEARMOR),this.shieldHandlerCallBack,this);

        this._posIdx = posIdx;
        this._fuid = detailData.uid;
        this._detailData = detailData;
        
        let lighMask = BaseBitmap.create("studyatk_frame_light");
        let tmpS = 2.0;
        lighMask.name = "lighMask";
        lighMask.setScale(tmpS);
        lighMask.x = -lighMask.width/2*tmpS;
        lighMask.y = -lighMask.height*tmpS;
        this.addChild(lighMask);
        lighMask.addTouchTap(this.joinBtnHandler,this);

        if( !data  )
        {
            this.initIdle();
        }else
        {
            this.initRoleImgStatus(data,detailData);
        }
      
    }

    protected initRoleImgStatus(data:any,detailData:any)
    {
        if( this._joinBtn)
        {
             this._joinBtn.visible = false;
        }
        this._detailData = detailData;
        this._uiData = data;
        if(! this._uiData)
        {
            return;
        }
        let roleImg = <BaseDisplayObjectContainer>this.getChildByName("roleImg");
        if(roleImg){
            this.removeChild(roleImg);
            roleImg = null;
        }
            
        let curLv = data.level;
        if(data.title != ""){
            curLv = data.title;
        }    
		roleImg =  Api.playerVoApi.getPlayerPortrait(curLv,data.pic);
        BaseLoadBitmap.create("palace_role_empty");
        roleImg.name = "roleImg";
        let deltaV = 0.40;
        if (this._posIdx !="2")
            deltaV = 0.35;
        roleImg.setScale(deltaV);
        roleImg.x = -roleImg.width/2 *deltaV;
        if(roleImg.width > 700){
            roleImg.x += 166  *deltaV;
        }
        
        roleImg.y = -roleImg.height *deltaV-10;
		this.addChildAt(roleImg,0);
        if(!this._joinMv)
        {
            this._joinMv =  ComponentManager.getCustomMovieClip("studyatk_frame",8,100);
            this._joinMv.setScale(2);
            this._joinMv.x = -98;
            this._joinMv.y = -388;
            if(this._posIdx == "2")
            {
                this._joinMv.y -= 20;
            }
            this.addChild(this._joinMv);
            this._joinMv.playWithTime(0);
            this._joinMv.addTouchTap(this.joinBtnHandler,this);
        }

        let txtBg = <BaseBitmap>this.getChildByName("txtBg");
        if(!txtBg){
            // txtBg = BaseBitmap.create("atkrace_name_bg"); 
            txtBg = BaseBitmap.create("wifeview_wenzibg2");
            // txtBg.width = 190;
            txtBg.height = 115;
            txtBg.name = "txtBg";
            txtBg.x = -txtBg.width/2;
            txtBg.y = 20 -txtBg.height;
            this.addChild(txtBg);
        }

        if(Api.switchVoApi.checkOpenStudyatkExp()&&txtBg&&this._uiData.stkRate&&this._uiData.stkRate > 0)
        {
            if(this._studyatk_upbg == null)
            {
                this._studyatk_upbg =  BaseBitmap.create("studyatk_upbg");
                this._studyatk_upbg.x = txtBg.x + txtBg.width/2 - this._studyatk_upbg.width/2;
                this._studyatk_upbg.y = txtBg.y - this._studyatk_upbg.height - 2;
                this.addChild(this._studyatk_upbg);
            
                this._studyatk_uparrow =  BaseBitmap.create("studyatk_uparrow");
                this._studyatk_uparrow.x = this._studyatk_upbg.x + this._studyatk_upbg.width/2 +20;
                this._studyatk_uparrow.y = this._studyatk_upbg.y + this._studyatk_upbg.height/2 - this._studyatk_uparrow.height/2 ;
                this.addChild(this._studyatk_uparrow);

                let addV = this._uiData.stkRate;
                let addvStr = (100 + addV*100).toFixed(0) + "%";
                this._upBF = ComponentManager.getBitmapText(addvStr,"studyatk_upfnt");
                this._upBF.x = this._studyatk_uparrow.x - this._upBF.width - 5;
                this._upBF.y = this._studyatk_upbg.y + this._studyatk_upbg.height/2 - this._upBF.height/2 ;
                this.addChild(this._upBF);
            }
            else
            {
                this._studyatk_upbg.setPosition(txtBg.x + txtBg.width/2 - this._studyatk_upbg.width/2, txtBg.y - this._studyatk_upbg.height - 2);
                this._studyatk_uparrow.setPosition(this._studyatk_upbg.x + this._studyatk_upbg.width/2 +20,this._studyatk_upbg.y + this._studyatk_upbg.height/2 - this._studyatk_uparrow.height/2);
                let addV = this._uiData.stkRate;
                let addvStr = (100 + addV*100).toFixed(0) + "%";
                this._upBF.text = addvStr;
                this._upBF.setPosition(this._studyatk_uparrow.x - this._upBF.width - 5,this._studyatk_upbg.y + this._studyatk_upbg.height/2 - this._upBF.height/2);

            }
            
        }

        let nameTxt = <BaseTextField>this.getChildByName("nameTxt");
        if(!nameTxt){
            nameTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_LIGHT_YELLOW);
            nameTxt.x = txtBg.x +30;
            nameTxt.y = txtBg.y+10 ;
            nameTxt.name = "nameTxt";
            this.addChild(nameTxt);
        }
        nameTxt.text = data.name;

        let officerTxt = <BaseTextField>this.getChildByName("officerTxt");
        if(!officerTxt)
        {
            officerTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WHITE);
            officerTxt.name = "officerTxt";
            
            officerTxt.x = txtBg.x +30;
            officerTxt.y = nameTxt.y + 25;
            this.addChild(officerTxt);
        }
        let str1 = LanguageManager.getlocal("officialTitle"+data.level);
        officerTxt.text = str1;

        if(!this._allianceTxt)
        {
            this._allianceTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WHITE);
            this._allianceTxt.x = officerTxt.x;
            this._allianceTxt.y = officerTxt.y + 25;
            this.addChild(this._allianceTxt);
        }

        if(!this._getTxt)
        {
            this._getTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WHITE);
            this._getTxt.x = officerTxt.x;
            this._getTxt.y = this._allianceTxt.y + 25;
            this.addChild(this._getTxt);
        }

         let allianceName = data.mygname;
        if(allianceName  == "")
        {
            allianceName = LanguageManager.getlocal("allianceRankNoAlliance");
        }
        this._allianceTxt.text = LanguageManager.getlocal("acBattleGroundAlliName-1",[allianceName]);

        

        let getV =  this._detailData.skillrate * Math.floor((GameData.serverTime - this._uiData.join_st )/60);
        if(Api.switchVoApi.checkOpenStudyatkExp()&&this._uiData&&this._uiData.stkRate&&this._uiData.stkRate > 0)
        {
            getV = Math.floor(getV * (1+Number(this._uiData.stkRate)));
        }
        this._getTxt.text = LanguageManager.getlocal("study_table_get",[String(getV)]);
            
        let isShowArmor  = this.isUnderArmor()
        if( !this.isInHome()&& isShowArmor == false) //  
        {
            let myuid = Api.playerVoApi.getPlayerID()
            /**
             * 可以驱离
             */
            let roleImg = this.getChildByName("roleImg");
            this.makePkBtn();
            if ( Api.playerVoApi.getPlayerMinLevelId() >= this._uiData.minlevelid)
            {   
                this._pro_et = this._uiData.pro_et;
                if(!this._pkTxtNode)
                {
                    this._pkTxtNode = new BaseDisplayObjectContainer();
                    this.addChild(this._pkTxtNode); 

                    let tiptxtBg = BaseBitmap.create("atkrace_name_bg");
                    tiptxtBg.width = 170;
                    tiptxtBg.height = 40;
                    tiptxtBg.x = txtBg.x;
                    tiptxtBg.y = this._pkBtn.y -tiptxtBg.height/2 + 50;
                    this._pkTxtNode.addChild(tiptxtBg);

                    this._idleTxt = ComponentManager.getTextField("",20,0xff0000);
                    this._idleTxt.y = tiptxtBg.y + tiptxtBg.height/2;
                    this._pkTxtNode.addChild(this._idleTxt);
                
                }

                //保护期间
                if (this._uiData.pro_et > GameData.serverTime)
                {   
                    if(!this._inproTxt)
                    {
                        this._inproTxt = ComponentManager.getTextField("",20);
                        this._inproTxt.textColor = 0x66A0F9;
                        this._inproTxt.x = officerTxt.x + officerTxt.width + 10;
                        this._inproTxt.y = officerTxt.y;
                        this.addChild(this._inproTxt);
                    }
                    this._inproTxt.text = LanguageManager.getlocal("studyatk_inprotection");
                    this._pkTxtNode.visible = true;
                    let cdStr = App.DateUtil.getFormatBySecond(this._uiData.pro_et - GameData.serverTime,3);
                    this._idleTxt.text = LanguageManager.getlocal("studyatk_pkBtncdTxt",[cdStr]);
                    this._idleTxt.anchorOffsetX = this._idleTxt.width/2;
                    this._idleTxt.anchorOffsetY = this._idleTxt.height/2;
                    TickManager.removeTick(this.tick,this);
                    TickManager.addTick(this.tick,this);
                    this._pkTxtNode.visible = true;
                }else if(this.getNextPkTime(this._uiData.name) > 0 )
                {   //距离上次驱离时间过短
                    this._pro_et = this.getNextPkTime(this._uiData.name) 
                    let cdStr = App.DateUtil.getFormatBySecond(this._pro_et - GameData.serverTime,3);
                    this._idleTxt.text =  LanguageManager.getlocal("studyatk_pkBtncdTxt",[cdStr]);
                    this._idleTxt.anchorOffsetX = this._idleTxt.width/2;
                    this._idleTxt.anchorOffsetY = this._idleTxt.height/2;
                    TickManager.removeTick(this.tick,this);
                    TickManager.addTick(this.tick,this);
                    this._pkTxtNode.visible = true;
                }
                else
                {
                    this._pkTxtNode.visible = false;
                    this._pkBtn.visible = true;
                }
            }else
            {
                this._pro_et = this._uiData.pro_et;
                TickManager.removeTick(this.tick,this);
                TickManager.addTick(this.tick,this);
            }
        }
       
        if(isShowArmor)
        {
            this._pro_et = this._uiData.pro_et;
            TickManager.removeTick(this.tick,this);
            TickManager.addTick(this.tick,this);
            //特效 
            this.addArmorAni();
        }else{
           this.checkIsShowArmorBtn();
           this.addArmorAni(true); //清除护盾
        } 
        
    }
    
    
    protected initIdle()
    {   
        if(this._joinBtn  )
        {
            this._joinBtn.visible = true;
            return
        }

        let joinBtn =  BaseBitmap.create("studyatk_arrow");
        joinBtn.addTouchTap(this.joinBtnHandler,this);
        joinBtn.x =  - joinBtn.width/2;
        let tarY = -270;
        if(this._posIdx == "2")
        {
            tarY = -234;
        }
        joinBtn.y = tarY;
        egret.Tween.get(joinBtn,{loop:true}).to({y:tarY -50 },1000).wait(200).to({y:tarY },1000);
        this.addChild(joinBtn);
        this._joinBtn = joinBtn; 
    }
    protected joinBtnHandlerCallback(event:egret.Event)
    {
        let rData = event.data.data;
        if(rData.ret == 0)
        {
            let joincode = rData.data.joincode
            if (joincode != 1)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_joincode"+joincode));
                // return;
            }
            else{
                App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_join_success_tip"));
            }
                let getatkdetail = rData.data.getatkdetail
                let minfo = getatkdetail.minfo;

                if(minfo[this._posIdx] && !this._uiData)
                {
                    this.initRoleImgStatus(minfo[this._posIdx],getatkdetail);
                }else
                {
                    this._detailData = getatkdetail;
                }
            // }
        }
    }

       protected shieldHandlerCallBack(event:egret.Event)
    {
        let rData = event.data.data;
        if(rData.ret == 0)
        {
            if(this._shieldBtn)
            {
                this._shieldBtn.visible = false;
                this.addArmorAni();
            }
        }else{
            //错误信息在 StudyatkDetailView 中处理，
        }
    }
    
   
    public getNextPkTime(uname:string)
    {
        let atkinfo = this._detailData.atkinfo
        for (var key in atkinfo) {
            if(atkinfo[key].dtype == 3)
            {              
                let time = atkinfo[key].st + GameConfig.config.studyatkbaseCfg.interval;
                if(atkinfo[key].name1 == Api.playerVoApi.getPlayerName() && atkinfo[key].name2 && atkinfo[key].name2 == uname && time >= GameData.serverTime)
                {
                    return time;
                }
            }
        }
        return 0;
    }

    protected joinBtnHandler()
    {
        if (this.getChildByName("roleImg"))
        {
            return;
        }

        if(this._fuid == Api.playerVoApi.getPlayerID())
        {
             App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_join_failed4"));
            return;//自己是房主
        }
        if(this.isInHome())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_join_Tip1"));
            return;
        }
        
        // if(Api.studyatkVoApi.getNextJoinTime() > 0)
        // {
        //     App.CommonUtil.showTip("暂时不可加入");
        //     return;
        // }
        //被驱离10分钟内不可再次加入
      
        

        NetManager.request(NetRequestConst.REQUEST_STUDYATK_JOIN,{fuid:this._fuid,pos:this._posIdx});
    }
    protected isInHome()
    {
         for (var key in this._detailData.minfo) {
            let element = this._detailData.minfo[key];
            if(element.uid == Api.playerVoApi.getPlayerID())
            {
                 return true;
            }
        }
        return false
    }
    protected pkBtnHandlerCallBack(event:egret.Event)
    {
        let rData = event.data.data;
        if(rData.ret == 0 )
        {
            let goawaycode = rData.data.goawaycode;
            let pos = rData.data.pos

            let getatkdetail = rData.data.getatkdetail
            let minfo = getatkdetail.minfo;
            this._detailData = getatkdetail;

            let tipStr = null;
            if(goawaycode == 1)
            {
                // App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_win"));
                tipStr = LanguageManager.getlocal("studyatk_pk_win");
                this.initRoleImgStatus(minfo[this._posIdx],getatkdetail);
            }else if(goawaycode == -1)
            {
                if(pos == this._posIdx && minfo[pos])
                {
                    this.initRoleImgStatus(minfo[pos],getatkdetail);
                }
                // App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_goawaycode-1"));
                tipStr = LanguageManager.getlocal("studyatk_pk_goawaycode-1");
            }else{
                /**
                 * 演武数据发生变化是刷新 20180316
                 */
                if( pos == this._posIdx && minfo[pos])
                {
                    this.initRoleImgStatus(minfo[pos],getatkdetail);
                }
                App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_goawaycode"+goawaycode));
           
                return;
            }
            //战斗
            if (pos == this._posIdx && this._oldInfo.length > 0) {
                this.showBattle(goawaycode,tipStr);
            }
        }
        // else if (rData.ret == -3 ){
        //     App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_NotEnable"));
        // }
    }
    private showResultTip(str:string):void
    {
        console.log("showResultTip",str);
        App.CommonUtil.showTip(str);
    }

    private showBattle(code:number,str:string):void
    {
        //等级 名称 经验 头像
        ViewController.getInstance().openView(ViewConst.COMMON.STUDYBATTLEVIEW,{f:this.showResultTip,o:this,str:str,info:this._oldInfo,wcode:code});
    }

	protected pkBtnHandler(event:egret.Event)
    {
        if(this.isInHome())
        {
            App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_NotEnable2"));
            return;
        }
        //保护期间
        if (this._uiData.pro_et > GameData.serverTime)
        {
             App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_inprotection"));
             return;
        }
        
         //挑战失败，10分钟内不可再次挑战
        let minfo = this._detailData.minfo;
        this._oldInfo.length = 0;
        if (minfo && minfo[this._posIdx]) {
           let enemyInfo = minfo[this._posIdx];
            this._oldInfo[0] = {minlevelid:Api.playerVoApi.getPlayerMinLevelId() ,level:Api.playerVoApi.getPlayerLevel(),name:Api.playerVoApi.getPlayerName(),pic:Api.playerVoApi.getPlayePicId(),exp:Api.playerVoApi.getPlayerExp(),title:Api.playerVoApi.getTitleid()};
            this._oldInfo[1] = {minlevelid:enemyInfo.minlevelid ,level:enemyInfo.level,name:enemyInfo.name,pic:enemyInfo.pic, exp:enemyInfo.exp, title:enemyInfo.title};
        }


        NetManager.request(NetRequestConst.REQUEST_STUDYATK_GOAWAY,{pos:this._posIdx,fuid:this._fuid,puid:this._uiData.uid});
    }
    protected idleBtnHandler(event:egret.Event)
    {
        App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_pk_inprotection"));
    }
     public tick():boolean
    {
        let getV =  this._detailData.skillrate * Math.floor((GameData.serverTime - this._uiData.join_st )/60);
        if(Api.switchVoApi.checkOpenStudyatkExp()&&this._uiData&&this._uiData.stkRate&&this._uiData.stkRate > 0)
        {
            getV = Math.floor(getV * (1+Number(this._uiData.stkRate)));
        }

        this._getTxt.text = LanguageManager.getlocal("study_table_get",[String(getV)]);
        
        
        if(this._uiData.pro_et <= GameData.serverTime)
        {
            this.addArmorAni(true);
            this.checkIsShowArmorBtn();
        }
        if (this._pro_et >= GameData.serverTime && !this.isInHome())
        {
            if(this._inproTxt)
                this._inproTxt.visible = true;

            if(this._pkTxtNode )
            {   
                if(!this.isUnderArmor()){
                    this._pkTxtNode.visible = true;
                    let cdStr = App.DateUtil.getFormatBySecond(this._pro_et - GameData.serverTime,3);
                    this._idleTxt.text = LanguageManager.getlocal("studyatk_pkBtncdTxt",[cdStr]);
                    this._idleTxt.anchorOffsetX = this._idleTxt.width/2;
                    this._idleTxt.anchorOffsetY = this._idleTxt.height/2;
                }else{
                    this._pkTxtNode.visible = false;
                    this._idleTxt.text = "";
                }
            }
            return true;
        }else
        {
            if(this._pkBtn && !this.isInHome() && !this.isUnderArmor() )
            // if(this._pkBtn )
            {
                this._pkBtn.visible = true;
            }
            if(this._pkTxtNode)
            {
                this._pkTxtNode.visible = false;
            }
            if(this._inproTxt)
            {
                this._inproTxt.visible = false;
            }
        }
        return false;
    }
    protected checkIsShowArmorBtn(isShow:boolean = true)
    {
        if( Api.playerVoApi.getPlayerID() == this._uiData.uid)
        {
            if(!this._shieldBtn){
                let roleImg = this.getChildByName("roleImg");
                this._shieldBtn = ComponentManager.getButton("studyatk_armorBtn","",this.shieldClickHandler,this);
                BaseBitmap.create("studyatk_armor1");
                this._shieldBtn.x =  - this._shieldBtn.width/2;
                this._shieldBtn.y = roleImg.y - 70;
                this.addChildAt(this._shieldBtn,1000); 
            }
            this._shieldBtn.visible = true;
        }else{
            this.makePkBtn();
        }
    }

     protected shieldClickHandler()
    {
        let itemId = "1601";
        let ownNum = Api.itemVoApi.getItemNumInfoVoById(itemId);
        if(ownNum == 0)
        {
            /**
             * 道具不足
             */
            App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_NoItemTip"));
            return;
        }
        //  && data.pro_et > GameData.serverTime
        if (this._pro_et > GameData.serverTime)
        {
            App.CommonUtil.showTip("studyatk_armorInProtection");
            return;
        }
        let lastTime = this._detailData.create_time + GameConfig.config.studyatkbaseCfg.lastTime - GameData.serverTime
        if(lastTime < 60*60)
        {
            let tipMsg = LanguageManager.getlocal("studyatk_armorUseTip2");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title:"itemUseConstPopupViewTitle",
                msg:tipMsg,
                callback:this.doUseArmorReq,
                handler:this,
                needCancel:true
            });
            return;
        }  
        let message: string = LanguageManager.getlocal("studyatk_armorUseTip");
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, { confirmCallback: this.doUseArmorReq, handler: this, icon: "itemicon1553", iconBg: "itembg_1", num: ownNum, msg: message, id : 1601, useNum:1});
   
    }
    
     //添加护盾效果
    protected addArmorAni(isRemove:boolean = false)
    {
        if(isRemove)
        {
            if(this._armorNode)
            {
                this._armorNode.removeChildren();
                this.removeChild(this._armorNode);
                this._armorNode = null;
            }
            return;
        }
        if(this._armorNode)
        {
            return;
        }
        let txtBg = <BaseBitmap>this.getChildByName("txtBg");
        let tarIdx = this.getChildIndex(txtBg)-1;
        this._armorNode = new BaseDisplayObjectContainer();
        this._armorNode.y = -50;
        this.addChildAt(this._armorNode,tarIdx); 

        let smokeClip =  ComponentManager.getCustomMovieClip("studyatkArmor_smoke",8,90);
        smokeClip.setScale(1.2);
        smokeClip.x = -155;
        smokeClip.y = -90;
        this._armorNode.addChild(smokeClip);
        smokeClip.blendMode = egret.BlendMode.ADD;
        smokeClip.playWithTime(0);

        let armorImg = BaseBitmap.create("studyatkArmor");
        armorImg.anchorOffsetX = armorImg.width/2;
        armorImg.blendMode = egret.BlendMode.ADD;
        armorImg.y = -armorImg.height+70;
        if(this._posIdx == "2")
        {
             this._armorNode.y = -60;
             this._armorNode.setScale(0.95);
        }else
        {
            this._armorNode.setScale(0.85);
        }
        this._armorNode.addChild(armorImg);
        egret.Tween.get(armorImg,{loop:true}).to({alpha:0.3},1500).to({alpha:1.0},1500);

        let xuaneClip =  ComponentManager.getCustomMovieClip("studyatkArmor_xuan",10,60);
        xuaneClip.setScale(1.2);
        xuaneClip.scaleX = -1;
        xuaneClip.x = 170;
        xuaneClip.y = -220+50;
        this._armorNode.addChild(xuaneClip);
        xuaneClip.blendMode = egret.BlendMode.ADD;
        xuaneClip.playWithTime(0);

        let xuaneClip2 =  ComponentManager.getCustomMovieClip("studyatkArmor_xuan",10,60);
        xuaneClip2.anchorOffsetX = 178;
        xuaneClip2.anchorOffsetY = 92;
        xuaneClip2.blendMode = egret.BlendMode.ADD;
        xuaneClip2.y = -170;
        this._armorNode.addChild(xuaneClip2);
        xuaneClip2.playWithTime(0);
        egret.Tween.get(xuaneClip2,{loop:true}).to({scaleX:1.15,scaleY:1.15},1500).to({scaleX:1.0,scaleY:1.0},1500);
        
    }


     protected makePkBtn()
    {
        let isShowArmor  = this.isUnderArmor()
        if( !this.isInHome()&& isShowArmor == false) //  
        {
            if(!this._pkBtn &&( Api.playerVoApi.getPlayerMinLevelId() >= this._uiData.minlevelid))
            {
                let roleImg = this.getChildByName("roleImg");
                this._pkBtn =  ComponentManager.getButton("studyatk_pkBtn","",this.pkBtnHandler,this);
                this._pkBtn.x =  - this._pkBtn.width/2;
                this._pkBtn.y = roleImg.y - 70;
                this._pkBtn.name = "pkBtn";
                this._pkBtn.visible = false;
                this.addChild(this._pkBtn);  
            }
        }
    }

     protected isUnderArmor()
    {
        if(this._uiData.usearmor && this._uiData.usearmor == 1 && this._uiData.pro_et > GameData.serverTime)
        {
            return  true;
        }
        return false;
    }

     protected doUseArmorReq()
    {
        NetManager.request(NetRequestConst.REQUEST_STUDYATK_USEARMOR,{fuid:this._fuid});
    }

	public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_JOIN),this.joinBtnHandlerCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GOAWAY),this.pkBtnHandlerCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_USEARMOR),this.shieldHandlerCallBack,this);

        TickManager.removeTick(this.tick,this);
        this._posIdx=null;
        this._fuid=null;
        this._detailData=null;
        this._uiData=null;
        this._pro_et=null;
        this._pkTxtNode=null;
        this._pkBtn=null;
        this._joinBtn=null;
        this._inproTxt=null;
        this._joinMv = null;
        this._oldInfo.length = 0;
        this._getTxt = null;
        this._shieldBtn = null;
        this._tiptxtBg = null;
        this._armorNode = null;
        this._studyatk_upbg = null;
        this._studyatk_uparrow = null;
        this._upBF = null;
        
		super.dispose();
	}
}