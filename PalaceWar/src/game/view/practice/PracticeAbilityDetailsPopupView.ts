
/**
 * 修身资质进度详情UI
 * author yanyuling
 * date 2018/04/16
 * @class PracticeAbilityDetailsPopupView
 */
class PracticeAbilityDetailsPopupView extends PopupView
{
	// 滑动列表
    protected _nodeContainer:BaseDisplayObjectContainer;
	
    public constructor() 
	{
		super();
	}
	public initView():void
	{	
        this._nodeContainer = new BaseDisplayObjectContainer();

        let startY = 10;
        let bg1= BaseBitmap.create("public_9_probiginnerbg");
        bg1.width = 520;
        bg1.height = 666;
        bg1.x = this.viewBg.x +this.viewBg.width/2 - bg1.width/2;
        bg1.y = this.viewBg.y +startY;
        this.addChildToContainer(bg1);

        let taskId = this.param.data.taskId;
        let taskvo:PracticeTaskVo = Api.practiceVoApi.getPracticeTaskInfo(taskId);
        let cfg:Config.PracticeItemCfg = Config.PracticeCfg.getPracticeListById(taskId);

        let keys = Object.keys(cfg.getConditionList());
        keys.sort((keyA:string,keyB:string)=>{
            return Number(keyA) - Number(keyB);
        });
        let conV = Api.practiceVoApi._getTaskVoStageV(taskvo);
        let len = keys.length ;
        let list = keys;
        let alOver = false;
        if( taskvo.stage == len && taskvo.f == 2)
        {
            alOver = true;
        }
        if(taskvo.stage > 1  && alOver == false)
        {
            let list1 = keys.slice(0,taskvo.stage-1);
            let list2 = keys.slice(taskvo.stage);
            list = [];
            list.push(String(taskvo.stage));
            list = list.concat(list2).concat(list1)
        }
       
        let startIdx = 1;
        for (let index = 0; index <len ; index++) {
			let key = list[index]; 
			let numKey = Number(key)
            let condit = cfg.getConditionList()[key];

            let idxbg = BaseBitmap.create("dinner_rankbg");
            idxbg.x = bg1.x + 20;
            idxbg.y = startY
            this._nodeContainer.addChild(idxbg);

            let idTxt = ComponentManager.getTextField(""+key,20);
            idTxt.x = idxbg.x + idxbg.width/2 - idTxt.width/2;
            idTxt.y = idxbg.y + idxbg.height/2 - idTxt.height/2;;
            this._nodeContainer.addChild(idTxt);
            startIdx ++;
            // startY += 30;

            let descTxt1 = ComponentManager.getTextField("",20);
            descTxt1.text = this.getDescTxtWithInfo(numKey,condit,cfg.servantId,cfg.wifeId);
            descTxt1.x = idxbg.x + idxbg.width + 15;
            descTxt1.y = startY;
            this._nodeContainer.addChild(descTxt1);
            startY += 30;

            let descValue = ComponentManager.getTextField("",20);
            descValue.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            descValue.x = descTxt1.x + descTxt1.width + 10;
            descValue.y = descTxt1.y;
            this._nodeContainer.addChild(descValue);

            let descTxt2 = ComponentManager.getTextField("",20,TextFieldConst.COLOR_WARN_GREEN);
            descTxt2.text = LanguageManager.getlocal("servantInfo_attrTxt"+cfg.type +"_1") + "+" + String(condit.effect);
            // this.getDescTxtWithInfo(index,condit,cfg.servantId,cfg.wifeId);
            descTxt2.x = descTxt1.x;
            descTxt2.y = startY;
            this._nodeContainer.addChild(descTxt2);
            startY +=45;

            let lineImg =  BaseBitmap.create("public_line1");
            lineImg.x = this.viewBg.x +this.viewBg.width/2 - lineImg.width/2;
            lineImg.y = startY;
            this._nodeContainer.addChild(lineImg);
            startY+=20;
            let showBtn = false;
            let flagPath = "";
            let curV = conV;
            if (taskvo.stage > numKey || (taskvo.stage == numKey && taskvo.f == 2))
            {
                flagPath = "practice_unlock_flag";
                curV = condit.needNum
            }else if (taskvo.stage == numKey )
            {
                if(taskvo.f == 2)
                {
                    flagPath = "practice_unlock_flag";
                }else if (curV >=  condit.needNum){
                    showBtn = true;
                    flagPath = "";
                }else{
                    flagPath = "achievement_state1";
                }
            }else {
                // flagPath = "achievement_state1";
                showBtn = false;
                flagPath = "";
            }
            
            descValue.text = "(" +curV+ "/" + condit.needNum + ")"
            if(flagPath != "")
            {
                let flagImg = BaseBitmap.create(flagPath);
                flagImg.x = bg1.x + bg1.width - flagImg.width - 10;
                flagImg.y = idxbg.y-7 ;
                this._nodeContainer.addChild(flagImg)
            }
            if(showBtn)
            {
                let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"practice_upgrateBtn",this.btnHandler,this);
                btn.x = bg1.x + bg1.width - btn.width - 10;
                btn.y = idxbg.y +10 ;
                btn.name = "btn";
                // btn.visible = false;
                this._nodeContainer.addChild(btn);
                if(PlatformManager.checkIsEnLang())
                {
                    btn.y = idxbg.y +10 + 13;
                }
            }
            descTxt1.height = 60;
            descTxt1.width = bg1.width;
            // startIdx++ ;
		}
        this._nodeContainer.height = startY+40;
        /**
         * 填充列表信息
         */
        let rect = new egret.Rectangle(0,0,this.viewBg.width,bg1.height-10);
        let scrollView = ComponentManager.getScrollView(this._nodeContainer,rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.x = 0;
        scrollView.y =  bg1.y+5;
        this.addChildToContainer(scrollView);
    }

    protected btnHandler()
    {
        NetManager.request(NetRequestConst.REQUEST_REQUEST_UNLOCK,{taskId:this.param.data.taskId});
        this.hide();
    }
    /**
     * 
     * ["conditionType"]=1,["needNum"]=1,["effect"]
     */
    protected getDescTxtWithInfo(stage:number,param:any,servantId:string,wifeId:string)
    {
        let resStr = "";
        let sname = "";
        let wname = "";
        if(servantId && servantId != "")
        {
            sname = LanguageManager.getlocal("servant_name"+servantId);
             if(stage == 1){
                resStr = LanguageManager.getlocal("practice_contionType1_1",[sname]);
             }else{
                resStr=LanguageManager.getlocal("practice_contionType"+param.conditionType,[sname])
             }
        }
        if(wifeId && wifeId != "")
        {
            let wifecfg = Config.WifeCfg.getWifeCfgById(wifeId);
            wname = wifecfg.name;//LanguageManager.getlocal("wifeName_"+wifeId);
            if(stage == 1){
                resStr = LanguageManager.getlocal("practice_contionType1_2",[wname]);
             }else{
                resStr=LanguageManager.getlocal("practice_contionType"+param.conditionType,[wname])
             }
        }

        return resStr;

    }
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"dinner_rankbg","practice_unlock_flag","achievement_state1","achievement_state2",
		]);
	}

	protected getParent():egret.DisplayObjectContainer
	{
		// return LayerManager.panelLayer;
        return PlayerBottomUI.getInstance().parent;
	}
	protected getShowHeight():number
	{
		return 758;
	}
    public dispose():void
	{
        this._nodeContainer = null;

		super.dispose();
	}
}