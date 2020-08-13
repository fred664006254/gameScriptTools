/**
 * 练武场
 * author yanyuling
 * date 2017/11/28
 * @class StudyatkDetailView
 */

class StudyatkDetailView  extends CommonView
{
	private _nodeContainer:BaseDisplayObjectContainer;
    private _cdTxt:BaseTextField;
    private _cdEndSec:number;
    private _atkData:any = undefined;
    private _detailData:any = undefined;
    private _logBg:BaseBitmap;
    private _lastLogPosY:number =0;
    private _logTmpNode:BaseDisplayObjectContainer;
    private _studyAddTxt:BaseTextField;
    private _getTxt:BaseTextField;
    private _logNum:number = 0;
    private _willGetRate:number=0;
    private _isOver = false;
	public constructor() {
		super();
	}

	public initView():void
	{
        //
        // this._atkData = this.param.data;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GOAWAY),this.pkBtnHandlerCallBack,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GETATKDETAIL),this.refreshUiAfrerEnter,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_JOIN),this.pkBtnHandlerCallBack,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_INDEX),this.finishCallback,this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_STUDYATK_FINISH,this.finishCloseCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_USEARMOR),this.shieldHandlerCallBack,this);

        let tmpFuid = this.param.data.uid;
        NetManager.request(NetRequestConst.REQUEST_STUDYATK_GETATKDETAIL,{fuid:tmpFuid});
        
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.y = -15;
        this.addChildToContainer(this._nodeContainer);

        let bg = BaseLoadBitmap.create("studyatk_bg2");
        bg.y =  GameConfig.stageHeigth - this._nodeContainer.y - this.container.y -1136;// - 60;
        this._nodeContainer.addChild(bg);

        let maskBmp = BaseBitmap.create("public_9v_bg10");
		maskBmp.width=GameConfig.stageWidth;
		maskBmp.height= 80;
        maskBmp.y = -10;
        this._nodeContainer.addChild(maskBmp);

        let logBg = BaseBitmap.create("public_bottombg1");

		logBg.height= 169;
        logBg.y = GameConfig.stageHeigth - this.container.y - logBg.height - this._nodeContainer.y ;
        // this._nodeContainer.addChild(logBg);
        this._logBg = logBg;
        
    }

     protected refreshUiAfrerEnter(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret == 0)
        {
            this._detailData = rdata.data.getatkdetail;

            let studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg
            this._cdEndSec = this._detailData.create_time + studyAtkBaseCfg.lastTime;
        
            let rate = this._detailData.skillrate
            // if (Api.playerVoApi.getPlayerID() == this._detailData.uid)
            {
                let addExp = GameConfig.config.studyatkbaseCfg.addExp;
                if(Api.switchVoApi.checkOpenStudyatkExp() && this._detailData.mystkRate && this._detailData.mystkRate > 0)
                {
                    addExp += this._detailData.mystkRate;
                }
                this._willGetRate = rate* (1+addExp);
            }
            let willgetV =  this._willGetRate * Math.floor((GameData.serverTime - this._detailData.create_time )/60);
            // let willGet = Math.floor(rate);
            // this._willGetRate = rate;

            let studyAddTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
            this._studyAddTxt = studyAddTxt;
            this._studyAddTxt.text = LanguageManager.getlocal("study_table_willGet",[String(Math.floor(rate))]);
            studyAddTxt.x = 10;
            studyAddTxt.y = 10;
            this._nodeContainer.addChild(studyAddTxt);

            this._cdTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
            let leftTimt =  this._cdEndSec - GameData.serverTime;
            this._cdTxt.text = LanguageManager.getlocal("study_table_lastt",[App.DateUtil.getFormatBySecond(leftTimt,3)]);
            this._cdTxt.x = studyAddTxt.x;
            this._cdTxt.y = studyAddTxt.y + 30;
            this._nodeContainer.addChild(this._cdTxt);

            let posCfg = {
               ["1"]:{
                    x:120,
                    y:GameConfig.stageHeigth-560,
               },
               ["2"]:{
                    x:320,
                    y:GameConfig.stageHeigth-520,
               },
               ["3"]:{
                    x:520,
                    y:GameConfig.stageHeigth-560 ,
               },
            }
           
           let minfo = this._detailData.minfo
           for (var index = 1; index <=3; index++) {
        //    for (var key in minfo) {
                let key = String(index);
                let role = new StudyatkDetailRoleInfoItem();
                role.init(minfo[key],key,this._detailData);
                role.x = posCfg[key].x;
                role.y = posCfg[key].y;
                this._nodeContainer.addChild(role);
           }
           //房主形象
            let curLv = this._detailData.level;
            if(this._detailData.title != ""){
                curLv = this._detailData.title;
            }
            let roleImg = Api.playerVoApi.getPlayerPortrait(curLv,this._detailData.pic);
            let deltaS = 1.0
            roleImg.setScale(deltaS);
            roleImg.x = -10;
            roleImg.y = this._logBg.y - roleImg.height/2*deltaS +45;
            this._nodeContainer.addChild(roleImg);

            let masterBg = BaseBitmap.create("atkrace_arrest_bg_di");
            masterBg.width = 250;
            masterBg.height = 95;
            masterBg.x = 0;
            masterBg.y = this._logBg.y - masterBg.height;
            this._nodeContainer.addChild(masterBg);
            
            let studyatk_upbg =  BaseBitmap.create("studyatk_upbg");
            studyatk_upbg.x = masterBg.x + masterBg.width/2 - studyatk_upbg.width/2;
            studyatk_upbg.y = masterBg.y - studyatk_upbg.height - 2;
            this._nodeContainer.addChild(studyatk_upbg);
            
            let studyatk_uparrow =  BaseBitmap.create("studyatk_uparrow");
            studyatk_uparrow.x = studyatk_upbg.x + studyatk_upbg.width/2 +20;
            studyatk_uparrow.y = studyatk_upbg.y + studyatk_upbg.height/2 - studyatk_uparrow.height/2 ;
            this._nodeContainer.addChild(studyatk_uparrow);

            let addV = GameConfig.config.studyatkbaseCfg.addExp;
            if(Api.switchVoApi.checkOpenStudyatkExp() && this._detailData.mystkRate && this._detailData.mystkRate > 0)
            {
                addV += this._detailData.mystkRate;
            }
            
            let addvStr = (100 + addV*100).toFixed(0) + "%";
            let upBF = ComponentManager.getBitmapText(addvStr,"studyatk_upfnt");
            upBF.x = studyatk_uparrow.x - upBF.width - 5;
            upBF.y = studyatk_upbg.y + studyatk_upbg.height/2 - upBF.height/2 ;
            this._nodeContainer.addChild(upBF);

            //英文版教头标识位置不同
            if(PlatformManager.checkIsTextHorizontal()){
                let master  = BaseBitmap.create("studyatk_master");
                master.x = masterBg.x;
                master.y =  masterBg.y + masterBg.height/2 - master.height/2 - 36 - 30;
                // if(PlatformManager.checkIsThSp())
                // {
                //     master.x += 35;
                //     master.y -= 20;
                // }
                this._nodeContainer.addChild(master);

                let nameTxt = ComponentManager.getTextField(this._detailData.name,20,TextFieldConst.COLOR_LIGHT_YELLOW);
                nameTxt.x = masterBg.x + 40 - 25;
                nameTxt.y = masterBg.y + 8;
                this._nodeContainer.addChild(nameTxt);

                let officerTxt = ComponentManager.getTextField("",20);
                officerTxt.text = LanguageManager.getlocal("officialTitle"+this._detailData.level);
                officerTxt.x = nameTxt.x + nameTxt.width + 20;
                officerTxt.y = nameTxt.y ;
                this._nodeContainer.addChild(officerTxt);

                let getTxt = ComponentManager.getTextField("",20);
                this._getTxt = getTxt;
                this._getTxt.text = LanguageManager.getlocal("study_table_get",[String(Math.floor(willgetV))]);
                getTxt.x = nameTxt.x;
                getTxt.y = officerTxt.y + 25;
                this._nodeContainer.addChild(getTxt);

                let allianceTxt = ComponentManager.getTextField("",20);
                let allianceName = this._detailData.mygname;
                if(allianceName  == "")
                {
                    allianceName = LanguageManager.getlocal("allianceRankNoAlliance");
                }
                allianceTxt.text = LanguageManager.getlocal("acBattleGroundAlliName-1",[allianceName]);
                allianceTxt.x = nameTxt.x;
                allianceTxt.y = getTxt.y + 25;
                this._nodeContainer.addChild(allianceTxt);

            } else {
                let master  = BaseBitmap.create("studyatk_master");
                master.x = masterBg.x + 7;
                master.y =  masterBg.y + masterBg.height/2 - master.height/2;
                this._nodeContainer.addChild(master);

                let nameTxt = ComponentManager.getTextField(this._detailData.name,20,TextFieldConst.COLOR_LIGHT_YELLOW);
                nameTxt.x = masterBg.x + 40;
                nameTxt.y = masterBg.y + 8;
                this._nodeContainer.addChild(nameTxt);

                let officerTxt = ComponentManager.getTextField("",20);
                officerTxt.text = LanguageManager.getlocal("officialTitle"+this._detailData.level);
                officerTxt.x = nameTxt.x + nameTxt.width + 20;
                officerTxt.y = nameTxt.y ;
                this._nodeContainer.addChild(officerTxt);

                let getTxt = ComponentManager.getTextField("",20);
                this._getTxt = getTxt;
                this._getTxt.text = LanguageManager.getlocal("study_table_get",[String(Math.floor(willgetV))]);
                getTxt.x = nameTxt.x ;
                getTxt.y = officerTxt.y + 25;
                this._nodeContainer.addChild(getTxt);

                let allianceTxt = ComponentManager.getTextField("",20);
                 let allianceName = this._detailData.mygname;
                if(allianceName  == "")
                {
                    allianceName = LanguageManager.getlocal("allianceRankNoAlliance");
                }
                allianceTxt.text = LanguageManager.getlocal("acBattleGroundAlliName-1",[allianceName]);
                allianceTxt.x = nameTxt.x;
                allianceTxt.y = getTxt.y + 25;
                this._nodeContainer.addChild(allianceTxt);
            }



           //房间log
            this._nodeContainer.addChild(this._logBg);
            let atkinfo = this._detailData.atkinfo;
            let rect = new egret.Rectangle(0,0,this._logBg.width,this._logBg.height-20);
            let tmpNode = new BaseDisplayObjectContainer();
            this._logTmpNode = tmpNode;
            this._lastLogPosY = 5;
            let scrollList = ComponentManager.getScrollView(tmpNode,rect);
            scrollList.x = this._logBg.x;
            scrollList.y = this._logBg.y+15;
            this._nodeContainer.addChild(scrollList);

            for (var index = 0; index < atkinfo.length; index++) {
                let tmpLog = atkinfo[index];
                this.updateLog(tmpLog);
            }
        }else  
        {   
            this.hide();
            ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKVIEW);
        }
    }
    protected updateLog(tmpLog:any)
    {
        this._logNum ++;
        let logTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WHITE);
        let tStr = App.DateUtil.getFormatBySecond(tmpLog.st-App.DateUtil.getWeeTs(tmpLog.st),1);
        if( tmpLog.dtype == 3)
        {
            let tmpName = Api.playerVoApi.getPlayerName();
            if(tmpLog.ret == 1)
            {
                logTxt.text = LanguageManager.getlocal("studyatk_logtxt4",[tmpLog.name2]);
            }else{
                logTxt.text = LanguageManager.getlocal("studyatk_logtxt3",[tmpLog.name2]);
            }
        }else if(tmpLog.dtype == 4)
        {
            logTxt.text = LanguageManager.getlocal("studyatk_logtxt5");
        }else
        {
            logTxt.text = LanguageManager.getlocal("studyatk_logtxt"+tmpLog.dtype);
        }
        logTxt.multiline = true;
        logTxt.lineSpacing = 5;
        logTxt.width = 300;

        let nameTxt = ComponentManager.getTextField("【"+tmpLog.name1 +"】",20,TextFieldConst.COLOR_WHITE);
        nameTxt.x = 30;
        nameTxt.y = this._lastLogPosY;
        this._logTmpNode.addChild(nameTxt);

        logTxt.x = 180;
        logTxt.y = nameTxt.y;

        let timeTxt =  ComponentManager.getTextField(tStr,20,TextFieldConst.COLOR_WHITE);
        timeTxt.x = 510;
        timeTxt.y = logTxt.y;
        this._logTmpNode.addChild(timeTxt);

        this._lastLogPosY += logTxt.height + 5;
        this._logTmpNode.addChild(logTxt);
        this._logTmpNode.height = this._lastLogPosY + 30;
    }
    protected pkBtnHandlerCallBack(event:egret.Event)
    {
        let rData = event.data.data;
        if(rData.ret == 0 )
        {
            if (rData.cmd == NetRequestConst.REQUEST_STUDYATK_JOIN)
            {
                let joincode = rData.data.joincode
                if(joincode == -2)
                {
                    let self = this;
                    egret.setTimeout(()=>{
                        self.hide();
                    },this,1000);
                }
            }
            let atkinfo = rData.data.getatkdetail.atkinfo;
            let infoLen = atkinfo.length;
            if (infoLen == this._logNum)
            {
                return;
            }            
            
            for (var index = this._logNum; index < infoLen; index++) {
                this.updateLog(atkinfo[index]);
            }
            
        }else{

        }
    }
    protected finishCallback(event:egret.Event)
    {
        let rdata = event.data.data;
        if(rdata.ret == 0)
        {
            let finishinfo = rdata.data.finishinfo
            if(finishinfo )
            {
                let studyRet = finishinfo.ret;
                if( studyRet == 1)
                {
                     ViewController.getInstance().openView(ViewConst.BASE.STUDYATKSUCCESSVIEW,finishinfo);
                }else if(studyRet == -1){
                    ViewController.getInstance().openView(ViewConst.POPUP.STUDYATKFAILEDPOPUPVIEW,finishinfo);
                }
            }
        }
    }


     protected shieldHandlerCallBack(event:egret.Event)
    {
        let rData = event.data.data;
        if(rData.ret != 0)
        {
            let errcode = rData.data.errcode;
            if(errcode)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("studyatk_armor_errcode_"+errcode));
                if(errcode == 5) //没有道具，只提示信息即可
                {
                   return;
                }
                 NetManager.request(NetRequestConst.REQUEST_STUDYATK_INDEX,{});
            }
        }
    }

    protected finishCloseCallback()
    {
        if(this.isInHome())
        {
            ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKVIEW,{});
            this.hide();
        }
    }
    protected isInHome()
    {
        /**
         * 房主，
         */

        if (Api.playerVoApi.getPlayerID() == this._detailData.uid)
        {
            return true;
        }
         for (var key in this._detailData.minfo) {
            let element = this._detailData.minfo[key];
            if(element.uid == Api.playerVoApi.getPlayerID())
            {
                 return true;
            }
        }
        return false;
    }
    public tick():boolean
	{   
        let leftTimt =  this._cdEndSec - GameData.serverTime;
        if(leftTimt < 0){
            leftTimt = 0; 
        }
        if (leftTimt >= 0)
        {

            if(!this._detailData){
                return;
            }   

            // let studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg;
            if(this._cdTxt){
                this._cdTxt.text = LanguageManager.getlocal("study_table_lastt",[App.DateUtil.getFormatBySecond(leftTimt,3)]);
            }
            
            if(this._getTxt){
                let willgetV =   this._willGetRate *Math.floor((GameData.serverTime - this._detailData.create_time )/60);
                this._getTxt.text = LanguageManager.getlocal("study_table_get",[String(Math.floor(willgetV))]);
            }


            
            if(leftTimt == 0 && this.isInHome()  && !this._isOver)
            {
                this._isOver = true;
                // 是否需要关闭此界面？
                NetManager.request(NetRequestConst.REQUEST_STUDYATK_INDEX,{});
            }

            if(leftTimt == 0 && !this.isInHome()){
                this.hide();
            }
            


            
            return true;
        }
        return false;
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"studyatk_table","studyatk_master","studyatk_frame_light",
            "studyatk_frame","studyatk_arrow","atkrace_name_bg",
            "prisonview_1","wifeview_wenzibg2",
            "studyatk_armorBtn",
            "studyatkArmor_smoke",
            "studyatkArmor_xuan",
            "studyatkArmor","studyatk_upfnt","studyatk_upbg","studyatk_uparrow",
            "atkrace_arrest_bg_di"
		]);
	}

    public dispose()
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GETATKDETAIL),this.refreshUiAfrerEnter,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_GOAWAY),this.pkBtnHandlerCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_JOIN),this.pkBtnHandlerCallBack,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_STUDYATK_INDEX),this.finishCallback,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_STUDYATK_FINISH,this.finishCloseCallback,this);

        this._nodeContainer = null ;
        this._cdTxt = null ;
        this._cdEndSec = null ;
        this._atkData = null ;
        this._detailData = null ;
        this._logBg = null ;
        this._lastLogPosY = null ;
        this._logTmpNode = null ;
        this._studyAddTxt = null;
        this._getTxt = null;
        this._logNum = 0;
        this._willGetRate = 0;
        this._isOver = false;
        super.dispose();
    }
}
